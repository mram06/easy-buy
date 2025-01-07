import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import axios from '../helpers/axios'
import { useGeneralStore } from '../generalStore'
import { getAuthorization } from '../helpers/helpers'

export const useSubcategoriesStore = defineStore('subcategories', () => {
  const isLoading = ref(false)
  function setLoading(value) {
    isLoading.value = value
  }

  const subcategoriesList = ref([])
  const modifiedList = ref([])

  async function loadSubcategoriesList() {
    setLoading(true)
    await axios
      .get('/subcategories')
      .then((response) => {
        subcategoriesList.value = response.data.result
        modifiedList.value = JSON.parse(JSON.stringify(response.data.result))
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
      .finally(() => setLoading(false))
  }
  async function addSubcategory(data) {
    setLoading(true)
    await axios
      .post('/subcategories/add', data, getAuthorization())
      .then((result) => {
        console.log(result)

        loadSubcategoriesList()
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
      .finally(() => setLoading(false))
    loadSubcategoriesList()
  }
  async function setCategory(subcategoryObject) {
    setLoading(true)
    await axios
      .post(
        '/subcategories/set-category',
        {
          category_id: subcategoryObject.category_id,
          subcategory_id: subcategoryObject.id,
        },
        getAuthorization(),
      )
      .then(() => {
        loadSubcategoriesList()
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
      .finally(() => setLoading(false))
    loadSubcategoriesList()
  }
  async function deleteSubcategory(id) {
    setLoading(true)
    await axios
      .delete(`/subcategories/delete/${id}`, getAuthorization())
      .then(() => {
        loadSubcategoriesList()
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
      .finally(() => {
        setLoading(false)
        loadSubcategoriesList()
      })
  }

  return {
    isLoading,
    setLoading,
    subcategoriesList,
    modifiedList,
    loadSubcategoriesList,
    addSubcategory,
    setCategory,
    deleteSubcategory,
  }
})
