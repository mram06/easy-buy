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
              {{ productObj.price }} ₴ <button class="item__btn primary">Купити</button>
            </div>
            <div class="item__stock"><span /> Є в наявності</div>
          </div>
          <div class="description">
            <div class="description__body">
              <div class="description__title">Опис товару</div>
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
  }

  &__img {
    border-radius: 12px;
    background: white;
    padding: 16px;
    min-height: 640px;
    height: 100%;
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
