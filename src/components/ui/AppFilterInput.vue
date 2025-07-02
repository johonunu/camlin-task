<script setup lang="ts">
import CloseIcon from '../icons/CloseIcon.vue'
import SearchIcon from '../icons/SearchIcon.vue'

const model = defineModel<string>({ default: '' })
const emits = defineEmits<{
  input: [value: string]
}>()

function clearInput(): void {
  model.value = ''
  emits('input', model.value)
}
</script>

<template>
  <label class="input input-sm">
    <SearchIcon class="w-4 h-4" />
    <input
      type="text"
      class="grow"
      placeholder="Search"
      v-model="model"
      @input="emits('input', model)"
    />
    <CloseIcon @click="clearInput" class="w-4 h-4 cursor-pointer" v-if="model?.trim().length > 0" />
  </label>
</template>

<style scoped></style>
