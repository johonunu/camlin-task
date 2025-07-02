<script setup lang="ts">
import AppFooter from './AppFooter.vue'
import AppNavbar from './AppNavbar.vue'
</script>

<template>
  <div class="flex flex-col justify-between h-screen">
    <AppNavbar title="Camlin Task" />
    <div class="p-8 grow overflow-y-auto">
      <div class="flex gap-12 flex-col md:flex-row">
        <slot></slot>
      </div>
    </div>
    <AppFooter>All rights reserved &copy; 2025</AppFooter>
  </div>
</template>

<style scoped></style>
