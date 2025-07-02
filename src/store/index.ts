const USER_STATE: string = 'userState'

import { type UserState, type Transformer, SortDirection } from '@/models'
import { useDateFormat } from '@vueuse/core'
import type { ChartData } from 'chart.js'
import { defineStore } from 'pinia'
import { computed, nextTick, reactive, ref } from 'vue'

// user state default data, load from localstorage if exists
const getUserState = (): UserState => {
  const userState = localStorage.getItem(USER_STATE)

  return userState
    ? JSON.parse(userState)
    : {
        filters: {},
        sort: {
          field: null,
          direction: SortDirection.Asc,
        },
        chartSelected: [],
        darkMode: false,
      }
}

export const useAppStore = defineStore('app', () => {
  const loading = ref(false)
  const error = ref<unknown | null>(null)
  const transformers = ref<Transformer[]>([])
  const selected = ref<number | null>(null)
  const userState = reactive(getUserState())

  // use theme colors
  const colors = ref([
    getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
    getComputedStyle(document.documentElement).getPropertyValue('--color-secondary'),
    getComputedStyle(document.documentElement).getPropertyValue('--color-info'),
    getComputedStyle(document.documentElement).getPropertyValue('--color-success'),
    getComputedStyle(document.documentElement).getPropertyValue('--color-error'),
    getComputedStyle(document.documentElement).getPropertyValue('--color-warning'),
  ])

  const baseColor = ref(
    getComputedStyle(document.documentElement).getPropertyValue('--color-base-300'),
  )

  // return currently selected transformer
  const selectedTransformer = computed<Transformer | null>(() => {
    return selected.value
      ? (transformers.value.find((t) => t.assetId === selected.value) ?? null)
      : null
  })

  // return filtered and sorted transformers
  const filteredData = computed<Transformer[]>(() => {
    const filtered = transformers.value.filter((t: Transformer) =>
      Object.entries(userState.filters).every(([key, value]) => {
        if (!value) return true
        const fieldValue = String(t[key as keyof typeof t]).toLowerCase()
        return fieldValue.includes(String(value).toLowerCase())
      }),
    )

    if (userState.sort.field) {
      filtered.sort((a, b) => {
        const field = userState.sort.field as keyof Transformer
        const aStr = String(a[field]).toLowerCase()
        const bStr = String(b[field]).toLowerCase()
        if (aStr < bStr) return userState.sort.direction === SortDirection.Asc ? -1 : 1
        if (aStr > bStr) return userState.sort.direction === SortDirection.Asc ? 1 : -1
        return 0
      })
    }

    return filtered
  })

  // return data for chart component, labels are timestamps, data is voltage values
  const chartData = computed<ChartData<'line'>>(() => {
    if (!transformers.value.length) return { labels: [], datasets: [] }
    const firstItem = transformers.value[0]
    if (!firstItem || !firstItem.lastTenVoltgageReadings) return { labels: [], datasets: [] }
    const labels = firstItem.lastTenVoltgageReadings.map(
      (v) => useDateFormat(v.timestamp, 'MMMM D, YYYY').value,
    )

    return {
      labels,
      datasets: transformers.value
        .filter((t) => userState.chartSelected.includes(t.assetId))
        .map((item, i) => ({
          label: item.name,
          data: item.lastTenVoltgageReadings.map((v) => Number(v.voltage)),
          order: selected.value ? (item.assetId === selected.value ? -999 : i) : i,
          borderColor: selected.value
            ? item.assetId === selected.value
              ? colors.value[item.assetId]
              : baseColor.value
            : colors.value[item.assetId],
          backgroundColor: selected.value
            ? item.assetId === selected.value
              ? colors.value[item.assetId]
              : baseColor.value
            : colors.value[item.assetId],
        })),
    }
  })

  // load data from sample json data file
  async function loadData(): Promise<void> {
    loading.value = true
    error.value = null
    transformers.value = []

    try {
      const res = await fetch('/sampledata.json')
      const data: Transformer[] = await res.json()
      transformers.value = data

      // if no data in local storage, select all transformers by default
      if (!localStorage.getItem(USER_STATE)) {
        userState.chartSelected = data.map((t) => t.assetId)
      }
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  function selectCharts(charts: number[]): void {
    userState.chartSelected = charts
    updateUserData()
  }

  // set sort for transformers
  function setSort(field: string | null): void {
    if (userState.sort.field === field) {
      if (userState.sort.direction === SortDirection.Desc) {
        userState.sort.direction = SortDirection.Asc
        userState.sort.field = null
      } else {
        userState.sort.direction =
          userState.sort.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc
      }
    } else {
      userState.sort.field = field
      userState.sort.direction = SortDirection.Asc
    }
    updateUserData()
  }

  // set filters for transformers
  function setFilters(filters: Record<string, string>): void {
    userState.filters = filters
    updateUserData()
  }

  // set dark mode
  function setDarkMode(darkMode: boolean): void {
    userState.darkMode = darkMode
    reloadColors()
    updateUserData()
  }

  // save user state to local storage
  function updateUserData(): void {
    localStorage.setItem(USER_STATE, JSON.stringify(userState))
  }

  // reload colors and base color from css vars
  function reloadColors(): void {
    nextTick().then(() => {
      colors.value = [
        getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
        getComputedStyle(document.documentElement).getPropertyValue('--color-secondary'),
        getComputedStyle(document.documentElement).getPropertyValue('--color-info'),
        getComputedStyle(document.documentElement).getPropertyValue('--color-success'),
        getComputedStyle(document.documentElement).getPropertyValue('--color-error'),
        getComputedStyle(document.documentElement).getPropertyValue('--color-warning'),
      ]
      baseColor.value = getComputedStyle(document.documentElement).getPropertyValue(
        '--color-base-300',
      )
    })
  }

  return {
    loading,
    error,
    colors,
    baseColor,
    transformers,
    selected,
    userState,
    selectedTransformer,
    filteredData,
    chartData,
    loadData,
    selectCharts,
    setSort,
    setFilters,
    setDarkMode,
    reloadColors,
    updateUserData,
  }
})
