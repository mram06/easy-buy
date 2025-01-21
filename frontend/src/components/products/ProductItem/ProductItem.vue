<template>
  <div @click="toItem" class="item">
    <div class="item__body">
      <div class="item__img"><img :src="good.imgSrc" /></div>
      <div class="item__title">{{ good.title }}</div>
      <div class="item__row">
        <div class="item__prices">
          <template v-if="good.oldPrice">
            <div class="item__prices-oldprice">{{ getPriceWithSpace(good.oldPrice) }} ₴</div>
            <div class="item__prices-price red">{{ getPriceWithSpace(good.price) }} ₴</div>
          </template>
          <template v-else>
            <div class="item__prices-price">{{ getPriceWithSpace(good.price) }} ₴</div>
          </template>
        </div>
        <button @click.stop @click="addToCart(good.id)" class="item__btn"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGeneralStore } from '@/stores/generalStore'
import { useAuthStore } from '@/stores/modules/authStore'
import { useCartsStore } from '@/stores/modules/cartsStore'
import { useUsersStore } from '@/stores/modules/usersStore'
import { useRouter } from 'vue-router'

const props = defineProps({
  good: {
    type: Object,
    required: true,
  },
})

const cartsStore = useCartsStore()
const { getPriceWithSpace } = useGeneralStore()

const router = useRouter()

function toItem() {
  router.push({ name: 'productAbout', params: { id: props.good.id } })
}

const usersStore = useUsersStore()
const authStore = useAuthStore()
function addToCart(id) {
  if (usersStore.user) {
    cartsStore.addToCart(id)
  } else authStore.openAuthPopup()
}
</script>

<style lang="scss" scoped>
.item {
  &__body {
    cursor: pointer;
    display: flex;
    flex-direction: column;

    justify-content: flex-start;
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
    align-self: center;

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
