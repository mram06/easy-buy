<template>
  <default-layout>
    <div class="checkout">
      <div class="container">
        <div class="checkout__body">
          <h2>{{ $t('pages.checkout.title') }}</h2>
          <div class="checkout__row">
            <div class="checkout__items">
              <cart-panel :cart-items="cartItems" />
              <div class="delivery">
                <div class="delivery__title">{{ $t('pages.checkout.delivery.title') }}</div>
                <div class="delivery__options">
                  <label>
                    <input v-model="deliveryType" value="pickup" type="radio" />
                    {{ $t('pages.checkout.delivery.pickup') }}
                  </label>
                  <label>
                    <input v-model="deliveryType" value="courier" type="radio" />
                    {{ $t('pages.checkout.delivery.courier') }} (50 ₴)
                  </label>
                  <label>
                    <input v-model="deliveryType" value="novapost" type="radio" />
                    {{ $t('pages.checkout.delivery.novapost') }}
                  </label>
                </div>
              </div>
              <div class="payment">
                <div class="payment__title">{{ $t('pages.checkout.payment.title') }}</div>
                <div class="payment__options">
                  <label>
                    <input v-model="paymentType" value="cash" type="radio" />
                    {{ $t('pages.checkout.payment.cash') }}
                  </label>
                  <label>
                    <input v-model="paymentType" value="card-pickup" type="radio" />
                    {{ $t('pages.checkout.payment.cardPickup') }}
                  </label>
                  <label>
                    <input v-model="paymentType" value="card" type="radio" />
                    {{ $t('pages.checkout.payment.card') }}
                  </label>
                </div>
              </div>
            </div>
            <div class="summary">
              <div class="summary__body">
                <h2 class="summary__title">{{ $t('pages.checkout.total.title') }}</h2>
                <div class="summary__items-count">
                  <span
                    >{{ cartsStore.itemsCount }} {{ $t('pages.checkout.total.itemsWithSum') }}</span
                  >
                  <div>{{ cartsStore.totalCartSum }} ₴</div>
                </div>
                <div class="summary__delivery">
                  <span>{{ $t('pages.checkout.total.deliveryCost') }}</span>
                  <div>{{ deliveryCost }}</div>
                </div>
                <div class="summary__total-price">
                  <span>{{ $t('pages.checkout.total.summary') }}</span>
                  <div>{{ totalSum }} ₴</div>
                </div>
                <button @click="onOrder" class="summary__btn primary">
                  {{ $t('pages.checkout.total.btn') }}
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

import { useLocales } from '@/modulesHelpers/i18n'
const { t } = useLocales()

const deliveryCost = computed(() => {
  if (deliveryType.value === 'pickup') return t('pages.checkout.total.free')
  if (deliveryType.value === 'courier') return '50 ₴'
  if (deliveryType.value === 'novapost') return t('pages.checkout.total.byPostPrices')

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
  max-height: 400px;
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
    @media only screen and (max-width: 750px) {
      grid-template-columns: 1fr;
    }
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
