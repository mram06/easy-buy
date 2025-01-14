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
                @mouseover="currentCategoryId = category.id"
                class="category"
              >
                <div class="category__label">
                  <font-awesome-icon :icon="['fas', category.labelSrc]" />
                </div>
                <div class="category__title">{{ category.title }}</div>
              </div>
              <div class="menu">
                <div class="menu__body">
                  <div class="menu__category">
                    <div class="menu__category-img">
                      <img :src="categoryObj.imgSrc" />
                    </div>
                    <div
                      v-for="subcategory in categoryObj.subcategories"
                      :key="subcategory.id"
                      class="menu__subcategory-title"
                    >
                      {{ subcategory.title }}
                    </div>
                  </div>
                </div>
              </div>
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
import { useCategoriesStore } from '@/stores/modules/categoriesStore'

const router = useRouter()

const asideOpened = ref(false)
const currentCategoryId = ref(null)

// watch(
//   () => currentCategoryId.value,
//   (newValue) => {
//     console.log(newValue)
//   },
// )

const productsStore = useProductsStore()
const productsList = computed(() => productsStore.productsList)
const categoriesStore = useCategoriesStore()
const categoryObj = computed(
  () =>
    categoriesStore.categoriesList.filter(
      (category) => category.id == currentCategoryId.value,
    )[0] || {},
)
onMounted(() => {
  productsStore.loadNoveltyList()
  categoriesStore.loadCategoriesListWithSubcategories()
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
    @media only screen and (max-width: 990px) {
      display: none;
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  &__title {
  }
  &:hover {
    background: rgb(217, 217, 217);
  }
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
.menu {
  display: none;
  &__body {
    padding: 16px;
  }

  &__category {
    &-img {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &-title {
    }
  }

  &__subcategory-title {
  }
}
</style>
