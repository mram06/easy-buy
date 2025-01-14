<template>
  <default-layout>
    <h1>Дякуємо за замовлення!</h1>
    <h2>Номер замовлення # {{ ordersStore.orderId }}</h2>
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
