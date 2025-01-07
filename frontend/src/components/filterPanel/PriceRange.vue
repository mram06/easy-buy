<template>
  <div class="price__inputs">
    <input v-model="priceRange[0]" type="number" />
    <div>-</div>
    <input v-model="priceRange[1]" type="number" />
    <button @click="updatePriceQuery">OK</button>
  </div>
  <div class="slider">
    <div ref="progress" class="slider__progress"></div>
  </div>
  <div class="slider__range-input">
    <input
      @input="setProgress"
      v-model="priceRange[0]"
      type="range"
      min="0"
      :max="priceMax"
      class="slider__range-min"
    />
    <input
      @input="setProgress"
      v-model="priceRange[1]"
      type="range"
      min="0"
      :max="priceMax"
      class="slider__range-max"
    />
  </div>
</template>

<script setup>
import { useProductsStore } from '@/stores/modules/productsStore'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const productsStore = useProductsStore()

const priceMax = ref(50000)
const priceRange = ref([0, 10000])

let priceGap = 1000

const progress = ref(null)
const min = computed(() => parseInt(priceRange.value[0]))
const max = computed(() => parseInt(priceRange.value[1]))

function setProgress(e) {
  if (max.value - min.value < priceGap) {
    if (e.target.className === 'slider__range-min') {
      console.log('min')

      priceRange.value[0] = max.value - priceGap
    } else {
      priceRange.value[1] = min.value + priceGap
    }
  } else {
    progress.value.style.left = (min.value / priceMax.value) * 100 + '%'
    progress.value.style.right = 100 - (max.value / priceMax.value) * 100 + '%'
  }
}

onMounted(() => {
  progress.value.style.left = (min.value / priceMax.value) * 100 + '%'
  progress.value.style.right = 100 - (max.value / priceMax.value) * 100 + '%'
})

const router = useRouter()
const route = useRoute()

// Оновлення параметрів запиту при натисканні кнопки
function updatePriceQuery() {
  const query = {
    ...route.query,
    minPrice: priceRange.value[0] || undefined, // Видаляє параметр, якщо порожній
    maxPrice: priceRange.value[1] || undefined,
  }
  router.push({ path: route.path, query })
}

// Синхронізація з URL при завантаженні сторінки
watch(
  () => route.query,
  (query) => {
    priceRange.value[0] = query.minPrice || priceRange.value[0]
    priceRange.value[1] = query.maxPrice || priceRange.value[1]
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.price {
  &__inputs {
    margin: 16px 0 0 0;

    display: flex;
    align-items: center;
    gap: 4px;

    input {
      width: 100%;
      border-radius: 23px;
      padding: 8px 10px;
      background: rgb(240, 240, 240);
    }
    button {
      padding: 8px 10px;

      color: white;
      border-radius: 23px;
      background: rgb(255, 72, 72);
    }
  }
}
.slider {
  position: relative;
  margin: 21px 0 0 0;

  height: 2px;
  background: rgb(217, 217, 217);
  &__progress {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: rgb(255, 72, 72);
  }
  &__range-input {
    position: relative;
    input {
      position: absolute;
      top: -5px;
      height: 5px;
      width: 100%;
      background: none;
      -webkit-appearance: none;
      pointer-events: none;
      &::-webkit-slider-thumb {
        cursor: pointer;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        -webkit-appearance: none;
        pointer-events: auto;

        background: rgb(255, 72, 72);
      }
      &::-moz-range-thumb {
        height: 12px;
        width: 12px;
        border: none;
        border-radius: 50%;
        -moz-appearance: none;
        pointer-events: auto;

        background: rgb(255, 72, 72);
      }
    }
    &-min {
    }

    &-max {
    }
  }
}
</style>
