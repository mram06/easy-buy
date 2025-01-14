<template>
  <div class="cart__items">
    <div v-for="item in cartItems" :key="item.id" class="item">
      <div class="item__body">
        <div class="item__row">
          <div class="item__img">
            <img :src="item.imgSrc" />
          </div>
          <div class="item__about">
            <div class="item__about-title">
              {{ item.title }}
            </div>
            <div class="item__bottom">
              <div class="item__counter">
                <button @click="cartsStore.decreaseCount(item.id)">-</button>
                <div>{{ item.quantity }}</div>
                <button @click="cartsStore.addToCart(item.id)">+</button>
              </div>
              <div class="item__price">{{ getPriceWithSpace(item.price) }} ₴</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGeneralStore } from '@/stores/generalStore'
import { useCartsStore } from '@/stores/modules/cartsStore'

defineProps({
  cartItems: {
    type: Array,
    default: () => [],
  },
})

const { getPriceWithSpace } = useGeneralStore()
const cartsStore = useCartsStore()
</script>

<style lang="scss" scoped>
.cart {
  &__items {
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
  }
}

.item {
  &__body {
    border: 1px solid rgb(217, 217, 217);
    border-radius: 12px;
    background: rgb(255, 255, 255);

    padding: 16px;
    animation: scaleBlock 0.2s ease-in-out 1;
  }

  &__row {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 24px;
  }

  &__img {
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    border-radius: 4px;
  }

  &__about {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-title {
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    button {
      color: red;
    }
  }

  &__counter {
    overflow: hidden;
    display: flex;

    border: 1px solid rgb(217, 217, 217);
    border-radius: 22px;
    button,
    div {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 27px;
      height: 27px;
      background: none;

      color: rgb(40, 155, 65);
    }
    div {
      border-left: 1px solid rgb(217, 217, 217);
      border-right: 1px solid rgb(217, 217, 217);
    }
  }

  &__price {
    color: rgb(255, 72, 72);
    font-size: 20px;
    font-weight: 600;
    line-height: 120%;
  }
}
</style>
