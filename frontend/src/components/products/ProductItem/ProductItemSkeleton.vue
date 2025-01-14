<template>
  <div class="item">
    <div class="item__body">
      <div class="item__img"></div>
      <div class="item__title"></div>
      <div class="item__row">
        <div class="item__prices">
          <div class="item__prices-price"></div>
        </div>
        <button class="item__btn"></button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.item {
  &__body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-height: 355px;
    height: 100%;

    padding: 16px;

    border-radius: 12px;
    background: rgb(255, 255, 255);
  }

  &__img {
    width: 100%;
    overflow: hidden;
    max-height: 204px;
    width: 100%;
    height: 100%;

    animation: pulse-bg 1s infinite;
  }

  &__title {
    height: 57px;

    margin: 4px 0 0 0;
    overflow: hidden;
    animation: pulse-bg 1s infinite;
  }

  &__row {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }

  &__prices {
    animation: pulse-bg 1s infinite;
    height: 42px;
    width: 80px;

    &-oldprice {
    }

    &-price {
      &.red {
      }
    }
  }

  &__btn {
    margin-top: auto;
    width: 32px;
    height: 32px;

    border-radius: 12px;
    animation: pulse-bg 1s infinite;
  }
}

@keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #eaeaea;
  }
  100% {
    background-color: #eee;
  }
}
</style>
