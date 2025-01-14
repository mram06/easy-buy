<template>
  <default-layout>
    <div class="checkout">
      <div class="container">
        <div class="checkout__body">
          <h2>Оформлення замовлення</h2>
          <div class="checkout__row">
            <div class="checkout__items">
              <cart-panel :cart-items="cartItems" />
              <div class="delivery">
                <div class="delivery__title">Доставка</div>
                <div class="delivery__options">
                  <label>
                    <input v-model="deliveryType" value="pickup" type="radio" />
                    Самовивіз
                  </label>
                  <label>
                    <input v-model="deliveryType" value="courier" type="radio" />
                    Доставка кур'єром (50 ₴)
                  </label>
                  <label>
                    <input v-model="deliveryType" value="novapost" type="radio" />
                    Нова пошта
                  </label>
                </div>
              </div>
              <div class="payment">
                <div class="payment__title">Оплата</div>
                <div class="payment__options">
                  <label>
                    <input v-model="paymentType" value="cash" type="radio" />
                    Готівкою
                  </label>
                  <label>
                    <input v-model="paymentType" value="card-pickup" type="radio" />
                    Карткою при отриманні
                  </label>
                  <label>
                    <input v-model="paymentType" value="card" type="radio" />
                    Карткою
                  </label>
                </div>
              </div>
            </div>
            <div class="summary">
              <div class="summary__body">
                <h2 class="summary__title">Разом</h2>
                <div class="summary__items-count">
                  <span>{{ cartsStore.itemsCount }} товарів на суму</span>
                  <div>{{ cartsStore.totalCartSum }} ₴</div>
                </div>
                <div class="summary__delivery">
                  <span>Вартість доставки</span>
                  <div>{{ deliveryCost }}</div>
                </div>
                <div class="summary__total-price">
                  <span>До сплати</span>
                  <div>{{ totalSum }} ₴</div>
                </div>
                <button @click="onOrder" class="summary__btn primary">
                  Замовлення підтверджую
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CartPanel from '@/components/cart/CartPanel.vue'

import { useCartsStore } from '@/stores/modules/cartsStore'
import { computed, ref } from 'vue'
import { useOrdersStore } from '@/stores/modules/ordersStore'

const cartsStore = useCartsStore()
const cartItems = computed(() => cartsStore.cartItems)

const deliveryType = ref(null)
const paymentType = ref(null)

const deliveryCost = computed(() => {
  if (deliveryType.value === 'pickup') return 'безкоштовно'
  if (deliveryType.value === 'courier') return '50 ₴'
  if (deliveryType.value === 'novapost') return 'за тарифами перевізника'

  return null
})

const totalSum = computed(() =>
  deliveryType.value === 'courier'
    ? parseInt(cartsStore.totalCartSum) + 50
    : cartsStore.totalCartSum,
)

const { makeOrder } = useOrdersStore()

function onOrder() {
  if (deliveryType.value && paymentType.value)
    makeOrder({
      deliveryType: deliveryType.value,
      paymentType: paymentType.value,
    })
}
</script>

<style lang="scss" scoped>
.cart__items {
  height: 400px;
}
.checkout {
  &__body {
    position: relative;
  }

  &__row {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 32px;

    margin: 16px 0 0 0;
  }
}
.summary {
  &__body {
    border-radius: 12px;
    background: rgb(255, 255, 255);
    padding: 16px;

    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__title {
  }
  &__items-count,
  &__delivery,
  &__total-price {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 14px;
      color: rgb(49, 49, 49);
    }
  }
  &__total-price {
    div {
      font-size: 24px;
      font-weight: 600;
    }
  }

  &__title {
  }

  &__items-count {
  }

  &__delivery {
  }

  &__total-price {
  }
}

.delivery,
.payment {
  &__options {
    margin: 16px 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    label {
      padding: 8px;
      background-color: white;
      border-radius: 12px;
    }
  }
}
.delivery {
  margin: 16px 0 0 0;

  &__title {
    font-size: 20px;
    font-weight: 600;
  }
  &__options {
  }
}

.payment {
  margin: 16px 0 0 0;
  &__title {
    font-size: 20px;
    font-weight: 600;
  }
  &__options {
  }
}
</style>
