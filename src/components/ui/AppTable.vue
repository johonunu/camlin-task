<script setup lang="ts">
import { useAppStore } from '@/store'
import type { TableColumn } from '@/models'
import AppFilterInput from './AppFilterInput.vue'
import ArrowIcon from '../icons/ArrowIcon.vue'
import { storeToRefs } from 'pinia'

defineProps<{
  columns: TableColumn[]
}>()

const store = useAppStore()
const { userState, colors, loading, error, selected } = storeToRefs(store)
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table overflow-hidden">
      <thead>
        <tr>
          <th></th>
          <th
            class="cursor-pointer select-none hover:text-primary transition-colors"
            :class="{ 'text-primary': userState.sort.field === column.name }"
            v-for="column in columns"
            :key="column.name"
            @click="store.setSort(column.name)"
          >
            <span class="mr-2">{{ column.label }}</span>
            <ArrowIcon
              class="w-4 h-4 transition-all opacity-0"
              :class="{
                'rotate-180': userState.sort.direction === 'asc',
                'opacity-100': userState.sort.field === column.name,
              }"
            />
          </th>
        </tr>
        <tr>
          <th></th>
          <th v-for="column in columns" :key="column.name">
            <AppFilterInput
              v-model:="userState.filters[column.name]"
              @input="store.setFilters(userState.filters)"
            />
          </th>
        </tr>
      </thead>
      <TransitionGroup name="row-transition" tag="tbody">
        <tr v-if="error">
          <td>
            <div></div>
          </td>
          <td :colspan="columns.length - 1">
            <div>
              There was an error loading the data.
              <span class="font-bold text-error">{{ error }}</span>
            </div>
          </td>
        </tr>
        <tr v-else-if="store.filteredData.length === 0 && !loading">
          <td>
            <div></div>
          </td>
          <td :colspan="columns.length - 1">
            <div>No results found.</div>
          </td>
        </tr>
        <tr
          v-else
          v-for="row in store.filteredData"
          :key="row.assetId"
          class="hover:bg-base-200 transition-colors cursor-pointer"
          @mouseover="selected = row.assetId"
          @mouseleave="selected = null"
        >
          <td>
            <span
              class="w-3 h-3 block rounded-full"
              :style="{ background: colors[row.assetId] }"
            ></span>
          </td>
          <td v-for="column in columns" :key="column.name">
            <div>{{ row[column.name as keyof typeof row] }}</div>
          </td>
        </tr>
      </TransitionGroup>
    </table>
  </div>
</template>

<style scoped>
table tr td {
  padding: 0px;
}

table tr td div {
  padding: 10px;
}

/* Animate rows */
.row-transition-enter-active td div,
.row-transition-leave-active td div {
  transition: all 0.6s ease;
}

.row-transition-enter-from td div,
.row-transition-leave-to td div {
  opacity: 0;
  padding: 0px 10px;
}

.row-transition-move {
  transition: transform 0.6s ease;
}
</style>
