<template>
  <div class="categories">
    <div class="container">
      <div class="categories__container">
        <category-item
          v-for="category in categoriesStore.categoriesList"
          :key="category.id"
          :category-obj="category"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '@/stores/modules/categoriesStore'
import CategoryItem from './CategoryItem/CategoryItem.vue'
import { onMounted } from 'vue'

const categoriesStore = useCategoriesStore()
onMounted(() => {
  categoriesStore.loadCategoriesListWithSubcategories()
})
</script>

<style lang="scss" scoped>
.categories {
  &__container {
    margin: 24px 0 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
    @media only screen and (max-width: 990px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
