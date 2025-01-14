<template>
  <default-layout>
    <div class="container">
      <h1>
        <template v-if="generalStore.error?.response">
          {{ generalStore.error?.response?.status }} -
          {{ generalStore.error?.response?.statusText }}
        </template>
        <template v-else> 503 - Service Unavailable</template>
      </h1>
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useGeneralStore } from '@/stores/generalStore'

const generalStore = useGeneralStore()

defineProps({
  errorCode: {
    type: Number,
  },
  errorText: {
    type: String,
  },
})
</script>

<style lang="scss" scoped></style>
