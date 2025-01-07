<template>
  <default-layout>
    <Teleport to="body">
      <div :class="{ overlay: asideOpened }"></div>
    </Teleport>
    <div class="hero">
      <div class="container">
        <div class="hero__row">
          <div class="hero__body">
            <aside
              @mouseover="asideOpened = true"
              @mouseleave="asideOpened = false"
              :class="['hero__categories', { open: asideOpened }]"
            >
              <div
                v-for="category in categories"
                :key="category.title"
                @click="
                  router.push({
                    name: category.name,
                    params: { category: category.params, id: category.id },
                  })
                "
                class="category"
              >
                <div class="category__label"><img :src="category.labelSrc" /></div>
                <div class="category__title">{{ category.title }}</div>
              </div>
              <div class="menu">menu</div>
            </aside>
          </div>
          <div class="hero__main">
            <div class="hero__banner"></div>
            <section class="goods">
              <div class="goods__body">
                <h2 class="goods__title">Новинки</h2>
                <products-panel :goods-list="productsList" />
              </div>
            </section>
            <section class="goods">
              <div class="goods__body">
                <h2 class="goods__title">Краща ціна</h2>
                <products-panel :goods-list="products" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import categories from '@/constants/categories'
import ProductsPanel from '@/components/products/ProductsPanel.vue'
import { useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import products from '@/constants/products'
import { useProductsStore } from '@/stores/modules/productsStore'

const router = useRouter()

const asideOpened = ref(false)

watch(
  () => asideOpened.value,
  (newValue) => {
    console.log(newValue)
  },
)

const productsStore = useProductsStore()
const productsList = computed(() => productsStore.productsList)
onMounted(() => {
  productsStore.loadNoveltyList()
})
</script>

<style lang="scss" scoped>
.hero {
  &__row {
    display: flex;
    gap: 24px;
  }
  &__main {
    flex: 1 1;
  }
  &__body {
  }

  &__categories {
    background-color: #f0f0f0;

    z-index: 11;
    position: relative;
    // padding: 16px;
    // border-radius: 12px;
    // background: rgb(255, 255, 255);
    flex: 1 0 auto;
    &.open .menu {
      display: block;

      z-index: 10;
      position: absolute;
      top: 0;
      left: 100%;
      width: 100vw;
      height: 100%;

      background-color: #f0f0f0;
    }
  }

  &__banner {
    height: 480px;
    border-radius: 12px;
    background: rgb(217, 217, 217);
  }
}
.category {
  cursor: pointer;
  padding: 8px 4px;

  display: flex;
  align-items: center;
  gap: 4px;
  &__label {
  }

  &__title {
  }
  &:hover {
    background: rgb(217, 217, 217);
  }
}
.menu {
  display: none;
}
.goods {
  &__body {
    margin: 48px 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__title {
  }
}
</style>
