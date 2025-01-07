<template>
  <aside class="sidebar">
    <div class="sidebar__body">
      <router-link :to="{ name: 'categoriesManage' }"
        ><font-awesome-icon :icon="['fas', 'bars']" /> Категорії
      </router-link>
      <router-link :to="{ name: 'subcategoriesManage' }"
        ><font-awesome-icon :icon="['fas', 'list']" /> Підкатегорії
      </router-link>
      <router-link :to="{ name: 'featuresManage' }">
        <font-awesome-icon :icon="['fas', 'wand-magic-sparkles']" /> Характеристики
      </router-link>
      <router-link :to="{ name: 'productsManage' }">
        <font-awesome-icon :icon="['fas', 'barcode']" /> Товари
      </router-link>
      <router-link to="/fdfdff">
        <font-awesome-icon :icon="['fas', 'user']" /> Користувачі
      </router-link>
    </div>
  </aside>
</template>

<script setup></script>

<style lang="scss" scoped>
.sidebar {
  &__body {
    width: 236px;
    border-right: 2px solid rgb(217, 217, 217);
    a {
      padding: 8px 4px;
      &:not(:last-child) {
        border-bottom: 2px solid rgb(217, 217, 217);
      }
      &:hover {
        background: rgb(217, 217, 217);
      }
    }
    .router-link-active,
    .router-link-exact-active {
      font-weight: bold;
      background: rgb(217, 217, 217);
    }
  }
}
</style>
