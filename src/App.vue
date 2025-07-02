<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from './components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <Suspense>
      <RouterView />
    </Suspense>
  </AppLayout>
</template>

<style scoped></style>
