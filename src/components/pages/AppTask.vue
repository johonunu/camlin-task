<script setup lang="ts">
import AppLineChart from '../ui/AppLineChart.vue'
import AppTable from '../ui/AppTable.vue'
import { useAppStore } from '@/store'

const store = useAppStore()
await store.loadData()
</script>

<template>
  <div class="md:w-2/3 w-full">
    <AppTable
      :columns="[
        { name: 'name', label: 'Name' },
        { name: 'region', label: 'Region' },
        { name: 'health', label: 'Health' },
      ]"
    />
  </div>
  <div class="md:w-1/3 w-full">
    <AppLineChart />
  </div>
</template>

<style scoped></style>
