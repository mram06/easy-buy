<template>
  <div class="about">
    <div class="about__body">
      <div class="about__row">
        <div class="about__img">
          <img :src="productObj.imgSrc" />
        </div>
        <div class="item">
          <div class="item__body">
            <div class="item__title">{{ productObj.title }}</div>
            <div class="item__price">
              {{ getPriceWithSpace(productObj.price) }} ₴
              <button @click="onBuy(productObj.id)" class="item__btn primary">
                {{ $t('pages.product.btn') }}
              </button>
            </div>
            <div class="item__stock"><span /> {{ $t('pages.product.inStock') }}</div>
          </div>
          <div class="description">
            <div class="description__body">
              <div class="description__title">{{ $t('pages.product.description') }}</div>
              <p class="description__text">{{ productObj.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  productObj: {
    type: Object,
    default: () => ({}),
  },
})
import { useGeneralStore } from '@/stores/generalStore'
import { useCartsStore } from '@/stores/modules/cartsStore'

const cartsStore = useCartsStore()
function onBuy(id) {
  console.log(id)
  cartsStore.addToCart(id)
}

const { getPriceWithSpace } = useGeneralStore()
</script>

<style lang="scss" scoped>
.about {
  &__body {
    margin: 24px 0 0 0;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    @media only screen and (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }

  &__img {
    border-radius: 12px;
    background: white;
    padding: 16px;
    height: 640px;
    @media only screen and (max-width: 700px) {
      height: 320px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.item {
  display: flex;
  flex-direction: column;
  gap: 24px;
  &__body {
    background-color: white;
    border-radius: 12px;
    background: rgb(255, 255, 255);
    padding: 16px;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    line-height: 120%;
  }

  &__price {
    margin: 48px 0 0 0;

    font-size: 24px;
    font-weight: 600;
    line-height: 120%;

    display: flex;
    align-items: center;
    gap: 24px;
  }

  &__btn {
    width: 156px;
  }
  &__stock {
    margin: 16px 0 0 0;
    border-radius: 28px;
    background: rgba(40, 155, 65, 0.2);

    display: inline-block;

    padding: 4px 8px;

    color: rgb(40, 155, 65);
    line-height: 120%;

    span {
      width: 8px;
      height: 8px;
      display: inline-block;
      background: rgb(40, 155, 65);
      transform: translateY(-25%);
      border-radius: 50%;
    }
  }
}
.description {
  flex: 1 1 auto;
  &__body {
    height: 100%;
    background-color: white;
    border-radius: 12px;
    background: rgb(255, 255, 255);
    padding: 16px;
  }
  &__title {
    font-weight: 600;
  }
  &__text {
    margin: 16px 0 0 0;
  }
}
</style>
