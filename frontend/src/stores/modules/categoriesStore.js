import { ref } from 'vue'
import { defineStore } from 'pinia'

const apiUploads = import.meta.env.VITE_API_UPLOADS
import axios from '../helpers/axios'
import { useGeneralStore } from '../generalStore'
import { getAuthorization } from '../helpers/helpers'
import { useLocales } from '@/modulesHelpers/i18n'

export const useCategoriesStore = defineStore('categories', () => {
  const isLoading = ref(false)
  function setLoading(value) {
    isLoading.value = value
  }
  const locale = useLocales().locale.value

  const categoriesList = ref([])

  async function loadCategoriesList() {
    setLoading(true)
    await axios
      .get('/categories')
      .then((response) => {
        response.data.categoriesList.forEach((category) => {
          category.imgSrc = apiUploads + category.imgSrc
        })
        categoriesList.value = response.data.categoriesList
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function loadCategoriesListWithSubcategories() {
    setLoading(true)
    await axios
      .get(`/categories/with-subcategories/${locale}`)
      .then((response) => {
        response.data.categoriesList.forEach((category) => {
          category.imgSrc = apiUploads + category.imgSrc
        })
        categoriesList.value = response.data.categoriesList
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function loadCategoriesListShortly() {
    setLoading(true)
    await axios
      .get('/categories/shortly', getAuthorization())
      .then((response) => {
        categoriesList.value = response.data.result
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function addCategory(data) {
    setLoading(true)
    await axios
      .post('/categories/add', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {})
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
      .finally(() => {
        loadCategoriesList()
        setLoading(false)
      })
  }
  async function deleteCategory(id) {
    setLoading(true)
    await axios
      .delete(`/categories/delete/${id}`, getAuthorization())
      .then(() => {
        loadCategoriesList()
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
      .finally(() => {
        setLoading(false)
        loadCategoriesList()
      })
  }

  return {
    isLoading,
    setLoading,
    categoriesList,

    loadCategoriesList,
    loadCategoriesListShortly,
    loadCategoriesListWithSubcategories,
    addCategory,
    deleteCategory,
  }
})
