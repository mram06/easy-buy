<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <button
          @click="onToggleMenu"
          :class="[
            'header__burger',
            {
              open: isMenuOpened,
            },
          ]"
        >
          <span />
          <span />
          <span />
        </button>
        <div :class="['header__menu', { open: isMenuOpened }]">
          <button @click="toCatalogue" class="header__menu-catalogue-btn">
            {{ $t('header.catalogue') }}
          </button>
          <div class="header__menu-language">
            <div
              @click="((selectedLocale = 'ua'), changeLocale())"
              :class="{ selected: selectedLocale === 'ua' }"
            >
              UA
            </div>
            <div>|</div>
            <div
              @click="((selectedLocale = 'en'), changeLocale())"
              :class="{ selected: selectedLocale === 'en' }"
            >
              EN
            </div>
          </div>
          <div @click="toProfile" class="header__menu-account">
            <img src="@/assets/icons/account_black.svg" />
          </div>
        </div>
        <router-link to="/"
          ><div class="header__logo">
            <img src="@/assets/logo.png" /> <span>Easy Buy</span>
          </div></router-link
        >
        <div class="header__middle">
          <button @click="toCatalogue" class="header__catalogue-btn">
            {{ $t('header.catalogue') }}
          </button>
          <div class="header__search">
            <input
              v-model="search"
              type="search"
              :placeholder="$t('header.search')"
              class="header__search-input"
            />
            <button @click="onSearch"></button>
          </div>
        </div>
        <div class="header__tools">
          <div class="header__tools-language">
            <select @change="changeLocale" v-model="selectedLocale">
              <option value="ua">UA</option>
              <option value="en">EN</option>
            </select>
          </div>
          <div @click="toProfile" class="header__tools-account">
            <img src="@/assets/icons/account.svg" />
            <div :class="['profile-dropdown', { open: profileDropdownOpened }]">
              <router-link :to="{ name: 'profile' }">{{ $t('header.profile') }}</router-link>
              <router-link>{{ $t('header.orders') }}</router-link>
              <div @click="authStore.logout">{{ $t('header.logout') }}</div>
            </div>
          </div>
          <div @click="toCart" class="header__tools-cart">
            <img src="@/assets/icons/cart.svg" />
            <span v-if="cartsStore.itemsCount">{{ cartsStore.itemsCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
  <auth-popup v-if="authOpened" @auth-close="authStore.authPopupOpened = false" />
  <cart-popup v-if="cartOpened" @cart-close="cartOpened = false" />
</template>

<script setup>
import AuthPopup from '../auth/AuthPopup.vue'
import CartPopup from '@/components/cart/CartPopup.vue'
import { useAuthStore } from '@/stores/modules/authStore'
import { useUsersStore } from '@/stores/modules/usersStore'
import { useCartsStore } from '@/stores/modules/cartsStore'

import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const usersStore = useUsersStore()

const authOpened = computed(() => authStore.authPopupOpened)
const cartOpened = ref(false)

const profileDropdownOpened = ref(false)

function toProfile() {
  if (!usersStore.user) {
    authStore.authPopupOpened = true
  } else profileDropdownOpened.value = !profileDropdownOpened.value
}
function toCart() {
  if (!usersStore.user) authStore.authPopupOpened = true
  else {
    cartOpened.value = true
  }
}

const search = ref(null)
const router = useRouter()

function toCatalogue() {
  router.push({ name: 'catalogue' })
}
function onSearch() {
  if (search.value) {
    router.push({ name: 'products', query: { search: search.value } })
  }
}

import { useLocales } from '@/modulesHelpers/i18n'
const { setLocale, locale } = useLocales()

const selectedLocale = ref(localStorage.getItem('lastLocale') || 'ua')
function changeLocale() {
  setLocale(selectedLocale.value)
  window.location.reload()
}

onMounted(() => {
  authStore.loginWithCredential()
})

const cartsStore = useCartsStore()

const isMenuOpened = ref(false)
function onToggleMenu() {
  isMenuOpened.value = !isMenuOpened.value
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  padding: 0 32px;
  background: rgb(49, 49, 49);
  @media only screen and (max-width: 990px) {
    padding: 0 10px;
  }
  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;

    height: 72px;

    font-size: 20px;
    font-weight: 600;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgb(255, 255, 255);
    font-size: 32px;
    font-weight: bold;
    img {
      height: 38px;
    }

    span {
      text-wrap: nowrap;
      @media only screen and (max-width: 450px) {
        display: none;
      }
    }
  }

  &__middle {
    display: flex;
    gap: 24px;
    align-items: center;
    flex: 1 1 auto;

    max-width: 1016px;
  }

  &__catalogue-btn,
  &__menu-catalogue-btn {
    width: 236px;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    font-size: 20px;
    color: rgb(255, 255, 255);

    border-radius: 12px;
    border: 1px solid rgb(255, 255, 255);
    background: rgb(49, 49, 49);
    &::before {
      width: 20px;
      height: 20px;
      display: inline-block;
      content: url('@/assets/icons/catalogue.svg');
    }
  }
  &__catalogue-btn {
    @media only screen and (max-width: 770px) {
      display: none;
    }
  }

  &__search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    flex: 1 1 auto;

    padding: 0 8px;

    height: 40px;

    border: 1px solid rgb(255, 255, 255);
    border-radius: 12px;
    &-input {
      font-size: 16px;
      color: rgb(255, 255, 255);

      width: 100%;
      background: none;
      &::placeholder {
        color: rgb(177, 177, 177);
      }
    }
    button {
      width: 24px;
      height: 24px;
      background: url('@/assets/icons/search.svg') no-repeat;
    }
  }

  &__tools {
    display: flex;
    align-items: center;
    gap: 32px;
    &-language {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        width: 58px;

        background: none;
        border-radius: 12px;
        padding: 8px 12px;

        font-size: 20px;
        color: rgb(255, 255, 255);
        cursor: pointer;

        option {
          cursor: pointer;
          color: black;
          padding: 50px;
        }
      }
      &::after {
        content: url('@/assets/icons/dropdown_arrow_white.svg');
        position: absolute;
        right: 0;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        pointer-events: none;
        transition: transform 0.3s ease;
      }
      @media only screen and (max-width: 990px) {
        display: none;
      }
    }

    &-account {
      cursor: pointer;
      position: relative;
      @media only screen and (max-width: 990px) {
        display: none;
      }
    }

    &-cart {
      cursor: pointer;
      position: relative;
      span {
        position: absolute;
        top: -5px;
        left: -5px;
        font-size: 10px;
        color: white;
        padding: 5px;
        height: 16px;
        display: flex;
        align-items: center;

        background-color: #ff4848;
        border-radius: 50%;
      }
    }
  }

  &__burger {
    display: none;
    overflow: hidden;
    position: relative;
    background: none;
    width: 38px;
    height: 38px;
    span {
      position: absolute;
      left: 0;
      right: 0;

      display: block;
      width: 100%;
      height: 2px;
      background-color: white;
      &:nth-child(1) {
        transform: translateY(-10px);
      }
      &:nth-child(3) {
        transform: translateY(10px);
      }
      transition: transform 0.3s ease;
    }
    &.open span {
      &:nth-child(1) {
        transform: translateY(0);
        transform: rotate(45deg);
      }
      &:nth-child(2) {
        transform: translateX(-100%);
      }
      &:nth-child(3) {
        transform: translateY(0);
        transform: rotate(-45deg);
      }
    }
    @media only screen and (max-width: 990px) {
      display: block;
    }
  }
  &__menu {
    padding: 10px;
    display: none;
    position: absolute;
    left: -300px;
    top: 72px;
    width: 300px;
    height: 100vh;

    background-color: white;
    transition: transform 0.3s ease;
    &.open {
      transform: translateX(100%);
    }
    &-language {
      margin: 16px 0 0 0;
      font-weight: 400;
      display: flex;

      div {
        padding: 8px;
      }
      div.selected {
        font-weight: 500;
      }
    }
    &-account {
      display: inline-block;
      padding: 8px;
    }
    @media only screen and (max-width: 990px) {
      display: block;
    }
  }
}
.profile-dropdown {
  display: none;

  border-radius: 12px;
  background-color: white;
  position: absolute;
  right: 0;
  top: 32px;
  font-weight: normal;
  border: 1px solid black;
  a,
  div {
    padding: 8px 16px;
    font-size: 16px;
    &:hover {
      background: rgba(#ff4848, 0.07);
    }
  }
  &.open {
    display: block;
  }
}
</style>
