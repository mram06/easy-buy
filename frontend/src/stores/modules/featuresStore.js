import { ref } from 'vue'
import { defineStore } from 'pinia'

import axios from '../helpers/axios'
import { useGeneralStore } from '../generalStore'
import { getAuthorization } from '../helpers/helpers'
import { useLocales } from '@/modulesHelpers/i18n'

export const useFeaturesStore = defineStore('features', () => {
  const isLoading = ref(false)
  const errors = ref([])
  function setLoading(value) {
    isLoading.value = value
  }
  const locale = useLocales().locale.value

  const featuresList = ref([])
  const featuresModifiedList = ref([])

  async function loadFeaturesByProductId(id) {
    setLoading(true)
    await axios
      .get(`/features/id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        featuresList.value = response.data.result
        featuresModifiedList.value = JSON.parse(JSON.stringify(response.data.result))
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function loadFeaturesWithLocaleByProductId(id) {
    setLoading(true)
    await axios
      .get(`/features/${locale}/id/${id}`)
      .then((response) => {
        featuresList.value = response.data.result
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function loadFeaturesBySubcategoryId(id) {
    setLoading(true)
    await axios
      .get(`/features/subcategory/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        featuresList.value = response.data.result
        featuresModifiedList.value = JSON.parse(JSON.stringify(response.data.result))
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function loadFeaturesWithLocaleByCategoryId(id) {
    setLoading(true)
    await axios
      .get(`/features/${locale}/category/${id}`)
      .then((response) => {
        featuresList.value = response.data.result
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function loadFeaturesWithLocaleBySubcategoryId(id) {
    setLoading(true)
    await axios
      .get(`/features/${locale}/subcategory/${id}`)
      .then((response) => {
        featuresList.value = response.data.result
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }

  async function addFeature(data) {
    setLoading(true)

    await axios
      .post('/features/add', data, getAuthorization())
      .then(() => {
        loadFeaturesBySubcategoryId(data.subcategory_id)
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function deleteFeature(featureId, subcategoryId) {
    setLoading(true)
    await axios
      .delete(`/features/delete/${featureId}`, getAuthorization())
      .then(() => {
        loadFeaturesBySubcategoryId(subcategoryId)
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function updateFeatures() {
    setLoading(true)
    await axios
      .put('/features', featuresModifiedList.value, getAuthorization())
      .then(() => {
        loadFeaturesByProductId(featuresList.value[0].product_id)
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
    featuresList,
    featuresModifiedList,
    loadFeaturesByProductId,
    loadFeaturesWithLocaleByProductId,
    loadFeaturesBySubcategoryId,
    loadFeaturesWithLocaleByCategoryId,
    loadFeaturesWithLocaleBySubcategoryId,
    addFeature,
    updateFeatures,
    deleteFeature,
  }
})
