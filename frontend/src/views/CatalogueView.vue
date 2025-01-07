<template>
  <default-layout>
    <div class="breadcrumbs">
      <div class="container">
        <ul class="breadcrumbs__body">
          <router-link to="/"><li></li></router-link>
          <li>{{ $t('pages.catalogue.breadCrumbs') }}</li>
        </ul>
      </div>
    </div>

    <categories-panel />
  </default-layout>
</template>

<script setup>
import CategoriesPanel from '@/components/categories/CategoriesPanel.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<style lang="scss" scoped>
.breadcrumbs {
  &__body {
    padding: 8px 16px 8px 16px;
    border-radius: 12px;
    background: rgb(255, 255, 255);

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
}
</style>
