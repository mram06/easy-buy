import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

const apiBase = import.meta.env.VITE_API_BASE

export const useGeneralStore = defineStore('general', () => {
  const isLoading = ref(false)
  const error = ref(null)
  const router = useRouter()

  function setError(value) {
    error.value = value
    router.push({ name: 'error' })
  }

  return { isLoading, error, setError }
})
