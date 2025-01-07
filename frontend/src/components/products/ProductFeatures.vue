<template>
  <div class="features">
    <div class="features__body">
      <div class="features__table">
        <div v-for="feature in featuresList" :key="feature.title" class="features__table-row">
          <div>{{ feature.title }}</div>
          <div>{{ feature.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  featuresList: {
    type: Array,
    default: () => [],
  },
})
</script>

<style lang="scss" scoped>
.features {
  &__body {
    margin: 24px 0 0 0;
  }

  &__table {
    background-color: white;
    border-radius: 12px;
    &-row {
      padding: 8px 16px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      &:nth-child(even) {
        background: rgb(217, 217, 217);
      }
    }
  }
}
</style>
