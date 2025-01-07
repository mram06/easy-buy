import { ref } from 'vue'
import { defineStore } from 'pinia'

const apiUploads = import.meta.env.VITE_API_UPLOADS

import axios from '../helpers/axios'
import { useGeneralStore } from '../generalStore'
import { getAuthorization } from '../helpers/helpers'
import { useLocales } from '@/modulesHelpers/i18n'

export const useProductsStore = defineStore('products', () => {
  const isLoading = ref(false)
  const errors = ref([])
  function setLoading(value) {
    isLoading.value = value
  }
  const locale = useLocales().locale.value

  const currentProduct = ref([])
  const currentModifiedProduct = ref([])

  const productsList = ref([])
  const brandsList = ref([])
  const maxProductsPrice = ref(null)
  const totalCount = ref(null)
  const currentCategory = ref(null)
  const currentSubcategory = ref(null)

  async function loadProductById(id) {
    setLoading(true)
    await axios
      .get(`/products/id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        currentProduct.value = response.data.result
        currentProduct.value.imgSrc = apiUploads + currentProduct.value.imgSrc
        currentModifiedProduct.value = JSON.parse(JSON.stringify(currentProduct.value))
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }

  async function loadProductsList(query) {
    setLoading(true)
    await axios
      .get(`/products/${locale}`, { params: query })
      .then((response) => {
        response.data.productsList.forEach((product) => {
          product.imgSrc = apiUploads + product.imgSrc
        })
        productsList.value = response.data.productsList
        brandsList.value = response.data.brands
        maxProductsPrice.value = parseInt(response.data.maxProductsPrice)
        totalCount.value = parseInt(response.data.totalCount)
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function loadProductsListByCategoryId(id, query) {
    setLoading(true)
    await axios
      .get(`/products/${locale}/${id}`, { params: query })
      .then((response) => {
        response.data.productsList.forEach((product) => {
          product.imgSrc = apiUploads + product.imgSrc
        })
        productsList.value = response.data.productsList
        brandsList.value = response.data.brands
        maxProductsPrice.value = parseInt(response.data.maxProductsPrice)
        totalCount.value = parseInt(response.data.totalCount)
        currentCategory.value = response.data.currentCategory
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function loadProductsListBySubcategoryId(id, query) {
    setLoading(true)
    await axios
      .get(`/products/${locale}/subcategory/${id}`, { params: query })
      .then((response) => {
        response.data.productsList.forEach((product) => {
          product.imgSrc = apiUploads + product.imgSrc
        })
        productsList.value = response.data.productsList
        brandsList.value = response.data.brands
        maxProductsPrice.value = parseInt(response.data.maxProductsPrice)
        totalCount.value = parseInt(response.data.totalCount)
        currentSubcategory.value = response.data.currentSubcategory
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function loadProductWithLocaleById(id) {
    setLoading(true)
    await axios
      .get(`/products/${locale}/id/${id}`)
      .then((response) => {
        currentProduct.value = response.data.result
        currentProduct.value.imgSrc = apiUploads + currentProduct.value.imgSrc
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }

  const modifiedList = ref([])
  async function loadFullProductsList() {
    setLoading(true)
    await axios
      .get('/products')
      .then((response) => {
        modifiedList.value = JSON.parse(JSON.stringify(response.data.result))
        response.data.result.forEach((product) => {
          product.imgSrc = apiUploads + product.imgSrc
        })
        productsList.value = response.data.result
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function loadNoveltyList() {
    setLoading(true)
    await axios
      .get(`/products/${locale}/novelty`)
      .then((response) => {
        response.data.result?.forEach((product) => {
          product.imgSrc = apiUploads + product.imgSrc
        })
        console.log(response)

        productsList.value = response.data.result
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
    setLoading(false)
  }
  async function addProduct(data) {
    setLoading(true)
    await axios
      .post('/products/add', data, {
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
      .finally(() => {})
    loadFullProductsList()
  }
  async function setSubcategory(productObj) {
    setLoading(true)
    await axios
      .put(
        '/products/set-subcategory',
        { id: productObj.id, subcategory_id: productObj.subcategory_id },
        getAuthorization(),
      )
      .then(() => {
        loadFullProductsList()
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
      .finally(() => {
        loadFullProductsList()
        setLoading(false)
      })
  }
  async function deleteProduct(id) {
    setLoading(true)
    await axios
      .delete(`/products/delete/${id}`, getAuthorization())
      .then(() => {
        loadFullProductsList()
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
      .finally(() => {
        loadFullProductsList()
        setLoading(false)
      })
  }
  async function updateProduct(data, id) {
    setLoading(true)
    await axios
      .put('/products/update', data, {
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
        setLoading(false)
      })
    loadProductById(id)
  }

  return {
    errors,
    isLoading,
    setLoading,
    currentProduct,
    currentModifiedProduct,
    maxProductsPrice,
    totalCount,
    currentCategory,
    currentSubcategory,
    brandsList,
    productsList,
    modifiedList,
    loadProductsList,
    loadFullProductsList,
    loadProductsListByCategoryId,
    loadProductsListBySubcategoryId,
    loadProductWithLocaleById,
    loadNoveltyList,
    loadProductById,
    addProduct,
    setSubcategory,
    deleteProduct,
    updateProduct,
  }
})
