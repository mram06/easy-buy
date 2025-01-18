<template>
  <default-layout>
    <h1>{{ $t('pages.orderComplete.title') }}</h1>
    <h2>{{ $t('pages.orderComplete.reference') }} # {{ ordersStore.orderId }}</h2>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useOrdersStore } from '@/stores/modules/ordersStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const ordersStore = useOrdersStore()

const router = useRouter()
onMounted(() => {
  if (!ordersStore.orderId) router.push({ name: 'home' })
})
</script>

<style lang="scss" scoped>
h1,
h2 {
  text-align: center;
}
</style>
