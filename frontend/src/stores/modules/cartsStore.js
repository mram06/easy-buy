// import { useLocales } from '@/modulesHelpers/i18n'
// const { locale } = useLocales()
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const apiUploads = import.meta.env.VITE_API_UPLOADS

import axios from '../helpers/axios'
import { useGeneralStore } from '../generalStore'
import { getAuthorization } from '../helpers/helpers'
import { useUsersStore } from './usersStore'

export const useCartsStore = defineStore('carts', () => {
  const isLoading = ref(false)
  const errors = ref([])
  function setLoading(value) {
    isLoading.value = value
  }

  const cartItems = ref([])
  const itemsCount = ref(0)
  const totalCartSum = ref([])

  async function loadCartItems() {
    setLoading(true)
    const usersStore = useUsersStore()

    await axios
      .get(`/carts/ua/${usersStore.user?.id}`, getAuthorization())
      .then((response) => {
        response.data.items?.forEach((product) => {
          product.imgSrc = apiUploads + product.imgSrc
        })
        cartItems.value = response.data.items
        totalCartSum.value = response.data.totalCartSum
        itemsCount.value = response.data.totalCount
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }

  async function addToCart(id) {
    setLoading(true)
    await axios
      .post(`/carts/add/${id}`, {}, getAuthorization())
      .then(() => {
        loadCartItems()
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function decreaseCount(id) {
    setLoading(true)
    await axios
      .post(`/carts/decrease/${id}`, {}, getAuthorization())
      .then(() => {
        loadCartItems()
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }

  return {
    errors,
    isLoading,
    setLoading,
    addToCart,
    decreaseCount,
    loadCartItems,
    cartItems,
    itemsCount,
    totalCartSum,
  }
})
