<script setup lang="ts">
import { useAppStore } from '@/store'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  type ChartOptions,
} from 'chart.js'
import { ref } from 'vue'
import CogIcon from '../icons/CogIcon.vue'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
}

const store = useAppStore()
const selected = ref(store.userState.chartSelected)
const transformers = ref(store.transformers)

// toggle chart line selection
function toggleTransformers(): void {
  if (store.userState.chartSelected.length < transformers.value.length) {
    selected.value = transformers.value.map((t) => t.assetId)
  } else {
    selected.value = []
  }
  store.selectCharts(selected.value)
}
</script>

<template>
  <div class="card bg-base-200 w-full shadow-sm border-base-300">
    <div class="card-body">
      <div class="flex justify-between">
        <h2 class="card-title">Line chart</h2>
        <button
          class="btn btn-xs btn-soft"
          popovertarget="popover-charts"
          style="anchor-name: --anchor-1"
        >
          <CogIcon class="w-4 h-4" />
        </button>
        <ul
          class="dropdown menu dropdown-end w-52 rounded-box bg-base-100 shadow-sm"
          popover
          id="popover-charts"
          style="position-anchor: --anchor-1"
        >
          <li class="menu-title">Transformers</li>
          <li>
            <label
              v-for="(transformer, i) in store.transformers"
              :key="i"
              class="flex gap-1 cursor-pointer"
              :for="'transformer' + i"
            >
              <input
                type="checkbox"
                class="checkbox checkbox-xs checkbox-primary"
                :id="'transformer' + i"
                :value="transformer.assetId"
                v-model="selected"
                @change="store.selectCharts(selected)"
              />
              <span class="text-xs">{{ transformer.name }}</span>
            </label>
          </li>
          <li></li>
          <li>
            <button
              class="btn btn-xs btn-primary btn-soft"
              type="button"
              @click="toggleTransformers"
            >
              Toggle all
            </button>
          </li>
        </ul>
      </div>
      <div class="w-full h-60">
        <Line :data="store.chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
