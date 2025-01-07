<template>
  <default-layout>
    <div class="breadcrumbs">
      <div class="container">
        <div class="breadcrumbs__row">
          <ul class="breadcrumbs__body">
            <router-link to="/"><li></li></router-link>
            <router-link :to="{ name: 'catalogue' }">{{
              $t('pages.products.breadCrumbs')
            }}</router-link>
            <li>
              {{ productsStore.currentCategory?.title || productsStore.currentSubcategory?.title }}
            </li>
          </ul>
          <div class="sort">
            <div class="sort__body">
              <div>{{ $t('pages.products.sort.title') }}</div>
              <select v-model="sort" @change="updateQuery">
                <option :value="null">{{ $t('pages.products.sort.relevance') }}</option>
                <option value="descending">{{ $t('pages.products.sort.descending') }}</option>
                <option value="ascending">{{ $t('pages.products.sort.ascending') }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar-products">
      <div class="container">
        <div class="sidebar-products__body">
          <div class="sidebar-products__row">
            <filter-panel />
            <products-panel :goods-list="productsStore.productsList" />
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import FilterPanel from '@/components/filterPanel/FilterPanel.vue'
import ProductsPanel from '@/components/products/ProductsPanel.vue'

import { onMounted, ref, watch } from 'vue'
import { useProductsStore } from '@/stores/modules/productsStore'
import { useRoute, useRouter } from 'vue-router'
import { useCategoriesStore } from '@/stores/modules/categoriesStore'

const route = useRoute()

const productsStore = useProductsStore()

onMounted(() => {
  if (route.params.id && route.params.category) {
    productsStore.loadProductsListByCategoryId(route.params.id, route.query)
    watch(
      () => route.query,
      (newQuery) => {
        productsStore.loadProductsListByCategoryId(route.params.id, newQuery)
      },
    )
  } else if (route.params.id && route.params.subcategory) {
    productsStore.loadProductsListBySubcategoryId(route.params.id, route.query)
    watch(
      () => route.query,
      (newQuery) => {
        productsStore.loadProductsListBySubcategoryId(route.params.id, newQuery)
      },
    )
  } else {
    productsStore.loadProductsList(route.query)
    watch(
      () => route.query,
      (newQuery) => {
        productsStore.loadProductsList(newQuery)
      },
    )
  }
})

const router = useRouter()
const sort = ref(null)
// Функція для оновлення query у маршруті
function updateQuery() {
  router.push({
    path: route.path, // Зберігаємо поточний шлях
    query: {
      ...route.query, // Зберігаємо існуючі query
      sort: sort.value || undefined, // Додаємо/оновлюємо sort
    },
  })
  console.log(route.query)
}

// Автоматичне оновлення sort з query під час завантаження
watch(
  () => route.query.sort,
  (newSort) => {
    sort.value = newSort || null
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.breadcrumbs {
  &__body {
    display: flex;
    align-items: center;
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
  &__row {
    padding: 8px 16px 8px 16px;

    background: rgb(255, 255, 255);
    border-radius: 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.sort {
  &__body {
    display: flex;
    align-items: center;
    select {
      font-size: 16px;
    }
  }
}
.sidebar-products {
  &__body {
  }

  &__row {
    margin: 24px 0 0 0;
    display: flex;
    gap: 24px;
  }
}
</style>
