<template>
  <router-link :to="{ name: 'productAbout', params: { id: good.id } }">
    <div class="item">
      <div class="item__body">
        <div class="item__img"><img :src="good.imgSrc" /></div>
        <div class="item__title">{{ good.title }}</div>
        <div class="item__row">
          <div class="item__prices">
            <template v-if="good.oldPrice">
              <div class="item__prices-oldprice">{{ good.oldPrice }} ₴</div>
              <div class="item__prices-price red">{{ good.price }} ₴</div>
            </template>
            <template v-else>
              <div class="item__prices-price">{{ good.price }} ₴</div>
            </template>
          </div>
          <button class="item__btn"></button>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  good: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.item {
  &__body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-height: 355px;
    height: 355px;

    padding: 16px;

    border-radius: 12px;
    background: rgb(255, 255, 255);
  }

  &__img {
    width: 100%;
    height: 100%;
    max-width: 204px;
    max-height: 204px;
    overflow: hidden;

    display: flex;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__title {
    height: 57px;

    margin: 4px 0 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }

  &__prices {
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 42px;

    &-oldprice {
      text-decoration: line-through;
      font-size: 12px;
      font-weight: 600;
    }

    &-price {
      margin-top: auto;
      font-size: 20px;
      font-weight: 600;

      &.red {
        color: rgb(255, 72, 72);
      }
    }
  }

  &__btn {
    margin-top: auto;
    width: 32px;
    height: 32px;

    border-radius: 12px;
    background:
      url('@/assets/icons/cart.svg') 50% no-repeat,
      rgb(255, 72, 72);
  }
}
</style>
