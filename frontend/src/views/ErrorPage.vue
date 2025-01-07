<template>
  <default-layout>
    <div class="container">
      <h1>
        <template v-if="generalStore.error?.response">
          {{ generalStore.error?.response?.status }} -
          {{ useGeneralStore.error?.response?.statusText }}
        </template>
        <template v-else> 503 - Service Unavailable</template>
      </h1>
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useGeneralStore } from '@/stores/generalStore'
import { onUnmounted } from 'vue'
const generalStore = useGeneralStore()
</script>

<style lang="scss" scoped></style>
