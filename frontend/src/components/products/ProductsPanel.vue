<template>
  <div class="products__container">
    <template v-if="productsStore.isLoading">
      <product-item-skeleton v-for="i in 5" :key="i" />
    </template>
    <template v-else-if="productsStore.productsList?.length">
      <product-item v-for="good in goodsList" :key="good.id" :good="good" />
    </template>
    <template v-else> <div>За запитом нічого не знайдено</div> </template>
    <pagination-component :total-count="productsStore.totalCount" />
  </div>
</template>

<script setup>
import { useProductsStore } from '@/stores/modules/productsStore'
import ProductItem from './ProductItem/ProductItem.vue'
import ProductItemSkeleton from './ProductItem/ProductItemSkeleton.vue'
import PaginationComponent from './PaginationComponent.vue'

const productsStore = useProductsStore()

defineProps({
  goodsList: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.products__container {
  display: grid;
  grid-template-columns: repeat(5, minMax(200px, 1fr));
  grid-template-rows: 355px;

  gap: 24px;
  flex: 1 1;
}
</style>
