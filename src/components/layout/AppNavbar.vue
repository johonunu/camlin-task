<script setup lang="ts">
import { useAppStore } from '@/store'
import AppDarkMode from '../ui/AppDarkMode.vue'
import { storeToRefs } from 'pinia'

defineProps({
  title: String,
})

const store = useAppStore()
const { loading } = storeToRefs(store)
</script>

<template>
  <div class="navbar bg-primary text-primary-content">
    <div class="flex-1">
      <router-link to="/"
        ><button class="btn btn-ghost btn-primary text-xl">
          {{ title }}
        </button></router-link
      >

      <ul class="menu menu-horizontal px-1">
        <li><router-link to="/">Task</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </div>
    <div>
      <AppDarkMode />
    </div>
  </div>
  <div class="relative h-1">
    <progress class="progress w-full h-1 absolute top-0" v-if="loading"></progress>
  </div>
</template>

<style scoped></style>
