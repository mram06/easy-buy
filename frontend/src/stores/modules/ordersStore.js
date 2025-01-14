// import { useLocales } from '@/modulesHelpers/i18n'
// const { locale } = useLocales()
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import axios from '../helpers/axios'
import { useGeneralStore } from '../generalStore'
import { getAuthorization } from '../helpers/helpers'
import { useRouter } from 'vue-router'

export const useOrdersStore = defineStore('orders', () => {
  const isLoading = ref(false)
  const errors = ref([])

  const orderId = ref(null)
  const router = useRouter()

  function setLoading(value) {
    isLoading.value = value
  }
  async function makeOrder(data) {
    setLoading(true)
    await axios
      .post('/orders', data, getAuthorization())
      .then((response) => {
        orderId.value = response.data.result
        router.push({ name: 'order' })
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
    makeOrder,
    orderId,
  }
})
