<template>
  <div class="category">
    <router-link
      :to="{
        name: 'category',
        params: {
          category: categoryObj.title_en.toLowerCase().split(' ').join('-'),
          id: categoryObj.id,
        },
      }"
    >
      <div class="category__body">
        <div class="category__img"><img :src="categoryObj.imgSrc" /></div>
        <div class="category__title">{{ categoryObj.title }}</div>
        <div class="subcategories">
          <div class="subcategories__body">
            <div
              v-for="subcategory in categoryObj.subcategories"
              :key="subcategory.id"
              class="subcategories__item"
            >
              <router-link
                :to="{
                  name: 'subcategory',
                  params: {
                    subcategory: subcategory.title_en.toLowerCase().split(' ').join('-'),
                    id: subcategory.id,
                  },
                }"
              >
                {{ subcategory.title }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  categoryObj: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.category {
  display: grid;
  &__body {
    border-radius: 12px;
    background: rgb(255, 255, 255);
    height: 100%;

    padding: 12.5px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  &__img {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 220px;
    height: 220px;
    img {
      width: 100%;
    }
  }

  &__title {
    &:hover {
      color: red;
    }
  }
}
.subcategories {
  &__body {
  }

  &__item {
    a:hover {
      color: #FF4848;
    }
  }
}
</style>
