<template>
  <default-layout>
    <div class="admin">
      <div class="container">
        <div class="admin__row">
          <side-bar />
          <router-view />
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script setup>
import SideBar from '@/components/adminPanel/SideBar.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<style lang="scss" scoped>
.admin {
  &__row {
    display: flex;
    gap: 24px;
    & > div {
      flex: 1 1 auto;
    }
  }
}
.container {
}
</style>
