<template>
  <aside class="filter">
    <div class="filter__body">
      <h3>{{ $t('pages.products.filter.title') }}</h3>
      <div class="filter__category price">
        <div class="filter__category-title">{{ $t('pages.products.filter.price') }}</div>
        <price-range />
      </div>
      <div :class="['filter__category', { open: openedFeatures.includes(-1) }]">
        <div class="filter__category-title">{{ $t('pages.products.filter.brand') }}</div>
        <div class="filter__category-options">
          <label v-for="brand in productsStore.brandsList" :key="brand">
            <input v-model="selectedBrands" type="checkbox" :value="brand.brand" />
            {{ brand.brand }}
          </label>
        </div>
        <div
          @click="toggleOpen(-1)"
          v-if="productsStore.brandsList.length > 5"
          class="filter__category-showmore"
        >
          <span>{{ !openedFeatures.includes(-1) ? 'Показати всі' : 'Приховати' }}</span>
        </div>
      </div>
      <div
        v-for="(feature, i) in featuresList"
        :key="feature.id"
        :class="['filter__category', { open: openedFeatures.includes(i) }]"
      >
        <div class="filter__category-title">{{ feature.title }}</div>
        <div class="filter__category-options">
          <label v-for="value in feature.values" :key="value.id">
            <input v-model="selectedFeatures" :value="value.title" type="checkbox" />
            {{ value.title }}
          </label>
        </div>
        <div
          @click="toggleOpen(i)"
          v-if="feature.values?.length > 5"
          class="filter__category-showmore"
        >
          <span>{{ !openedFeatures.includes(i) ? 'Показати всі' : 'Приховати' }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PriceRange from './PriceRange.vue'
import { useProductsStore } from '@/stores/modules/productsStore'
import { useFeaturesStore } from '@/stores/modules/featuresStore'

const openedFeatures = ref([])
function toggleOpen(i) {
  if (openedFeatures.value.includes(i)) {
    openedFeatures.value = openedFeatures.value.filter((index) => index !== i)
  } else {
    openedFeatures.value.push(i)
  }
}

const productsStore = useProductsStore()

const router = useRouter()
const route = useRoute()
const selectedBrands = ref([])

watch(selectedBrands, (newBrands) => {
  const query = { ...route.query, brands: newBrands.join(',') }
  router.push({ path: route.path, query })
})

const featuresStore = useFeaturesStore()
const featuresList = computed(() => featuresStore.featuresList)

const selectedFeatures = ref([])

if (route.params.id && route.params.subcategory) {
  onMounted(() => {
    featuresStore.loadFeaturesWithLocaleBySubcategoryId(route.params.id)
  })
  onUnmounted(() => {
    featuresStore.featuresList = []
    console.log('unmounted')
  })
  watch(selectedFeatures, (newFeatures) => {
    const query = { ...route.query, features: newFeatures.join('/') }
    router.push({ path: route.path, query })
  })
}
</script>

<style lang="scss" scoped>
.filter {
  @media only screen and (max-width: 700px) {
    display: none;
  }
  &__body {
    max-width: 236px;
    border-radius: 12px;
    background: rgb(255, 255, 255);
    padding: 16px;

    display: flex;
    flex-direction: column;
  }

  &__category {
    border-bottom: 2px solid rgb(217, 217, 217);
    padding: 16px 0;

    &-title {
      font-weight: 500;
    }

    &-options {
      margin: 16px 0 0 0;

      label {
        &:not(:nth-child(1), :nth-child(2), :nth-child(3), :nth-child(4), :nth-child(5)) {
          display: none;
        }
        cursor: pointer;
        padding: 8px 0;
        display: flex;
        gap: 16px;
        &:hover {
          background: rgba(#ff4848, 0.07);
        }
      }
      input {
        width: 16px;
        height: 16px;

        appearance: none;
        -webkit-appearance: none;

        border: 1px solid rgb(217, 217, 217);
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        &:checked {
          background-color: #ff4848;
          border-color: #ff4848;
          &::before {
            content: '✔';
            font-size: 12px;
            color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
    &.open &-options {
      label {
        display: flex;
      }
    }
    &.open &-showmore {
      &::after {
        transform: rotate(180deg);
      }
    }
    &-showmore {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin: 20px 0 0 0;

      span {
        border-bottom: 1px solid black;
      }

      &::after {
        content: url('@/assets/icons/dropdown_arrow_black.svg');
        margin: 0 0 0 4px;
        display: inline-block;
      }
    }
  }
}
</style>
