<script setup lang="ts">
import { useAppStore } from '@/store'
import { storeToRefs } from 'pinia'
import SunIcon from '../icons/SunIcon.vue'
import MoonIcon from '../icons/MoonIcon.vue'

const store = useAppStore()
const { userState } = storeToRefs(store)

store.reloadColors() // reload colors on start

function setDarkMode() {
  store.setDarkMode(userState.value.darkMode)
}
</script>

<template>
  <label class="swap swap-rotate px-4">
    <input
      type="checkbox"
      class="theme-controller"
      value="night"
      v-model="userState.darkMode"
      @change="setDarkMode"
    />
    <SunIcon class="w-4 h-4 swap-off" />
    <MoonIcon class="w-4 h-4 swap-on" />
  </label>
</template>

<style scoped></style>
