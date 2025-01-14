<template>
  <div @click="$emit('cartClose')" class="cart">
    <div @click.stop class="cart__body">
      <div @click="$emit('cartClose')" class="cart__close"></div>
      <div class="cart__title">Кошик</div>

      <template v-if="cartItems?.length">
        <cart-panel :cart-items="cartItems" />
      </template>

      <template v-else>
        <div class="cart__title" style="text-align: center">Кошик порожній :(</div>
      </template>
      <div class="cart__bottom">
        <button @click="$emit('cartClose')" class="cart__bottom-continue primary">
          Продовжити покупки
        </button>
        <div class="cart__summary">Разом: {{ getPriceWithSpace(cartsStore.totalCartSum) }} ₴</div>
        <button @click="$router.push({ name: 'checkout' })" class="cart__bottom-checkout primary">
          Оформити замовлення
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartsStore } from '@/stores/modules/cartsStore'
import { computed } from 'vue'

import CartPanel from './CartPanel.vue'
import { useGeneralStore } from '@/stores/generalStore'

const cartsStore = useCartsStore()
const cartItems = computed(() => cartsStore.cartItems)

const { getPriceWithSpace } = useGeneralStore()
</script>

<style lang="scss" scoped>
.cart {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(#000000, 0.2);
  &__body {
    position: relative;
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 32px;

    min-height: 496px;
    max-height: 90%;

    background-color: white;
    padding: 16px;
    border-radius: 12px;

    animation: scaleBlock 0.2s ease-in-out 1;
  }

  &__title {
    font-size: 24px;
    line-height: 120%;
  }
  &__close {
    top: 16px;
    right: 16px;

    position: absolute;
    cursor: pointer;
    width: 20px;
    height: 20px;
    background: url('@/assets/icons/cross.svg') no-repeat;
  }

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

  &__bottom {
    margin-top: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    button {
      border-radius: 12px;
    }
    &-continue {
      color: #ff4848;
      border: 1px solid #ff4848;
      background: none;
    }
  }

  &__summary {
    margin-left: auto;

    color: rgb(255, 72, 72);
    font-size: 20px;
    font-weight: 600;
  }
}

@keyframes scaleBlock {
  0% {
    transform: scale(0.5, 0.5);
    opacity: 0.2;
  }
  100% {
    transform: scale(1, 1);
    opacity: 1;
  }
}
</style>
