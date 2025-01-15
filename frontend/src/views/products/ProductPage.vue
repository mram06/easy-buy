<template>
  <default-layout>
    <div class="breadcrumbs">
      <div class="container">
        <ul class="breadcrumbs__body">
          <router-link to="/"><li></li></router-link>
          <router-link :to="{ name: 'catalogue' }">
            {{ $t('pages.catalogue.breadCrumbs') }}
          </router-link>
          <li>{{ productObj.title }}</li>
        </ul>
      </div>
    </div>

    <div class="tabs">
      <div class="container">
        <div class="tabs__row">
          <router-link :to="{ name: 'productAbout' }">Про товар <span /></router-link>
          <router-link :to="{ name: 'productFeatures' }">Характеристики <span /></router-link>
        </div>
      </div>
    </div>

    <div class="container">
      <router-view :product-obj="productObj" :features-list="featuresList" />
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useFeaturesStore } from '@/stores/modules/featuresStore'
import { useProductsStore } from '@/stores/modules/productsStore'
import { computed } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const productsStore = useProductsStore()
const productObj = computed(() => productsStore.currentProduct)

const featuresStore = useFeaturesStore()
const featuresList = computed(() => featuresStore.featuresList)

const route = useRoute()
onMounted(() => {
  productsStore.loadProductWithLocaleById(route.params.id)
  featuresStore.loadFeaturesWithLocaleByProductId(route.params.id)
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  &__body {
    padding: 8px 16px 8px 16px;
    border-radius: 12px;
    background: rgb(255, 255, 255);

    display: flex;
    align-items: center;
    flex-wrap: wrap;
    row-gap: 16px;
    & li:first-child {
      width: 24px;
      height: 24px;
      background: url('@/assets/icons/home.svg');
    }
    :not(:first-child)::before {
      padding: 0 4px;
      content: '/';
    }
  }
}
.tabs {
  &__row {
    margin: 24px 0 0 0;
    display: flex;
    gap: 16px;
    a {
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      background: white;
      padding: 8px 16px;
      &.router-link-active.router-link-exact-active {
        span {
          display: block;
          background-color: #ff4848;
          height: 4px;
          width: 100%;

          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
    }
  }
}
</style>
