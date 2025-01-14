import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '../helpers/axios'
import { useUsersStore } from './usersStore'
import { useGeneralStore } from '../generalStore'
import { getAuthorization } from '../helpers/helpers'
import { useCartsStore } from './cartsStore'

export const useAuthStore = defineStore('auth', () => {
  const authResult = ref(null)
  const authError = ref(null)

  async function signup(userData) {
    await axios
      .post('/auth/signup', userData)
      .then((response) => {
        useUsersStore().user = response.data.registeredUser
        localStorage.setItem('jwt_token', response.data.token)
        authResult.value = response.data.result
      })
      .catch((error) => {
        const generalStore = useGeneralStore()
        generalStore.setError(error)
      })
  }
  async function login(userData) {
    authResult.value = null
    authError.value = null
    await axios
      .post('/auth/login', userData)
      .then((response) => {
        useUsersStore().user = response.data.foundUser
        localStorage.setItem('jwt_token', response.data.token)
        authResult.value = response.data.result

        useCartsStore().loadCartItems()
      })
      .catch((error) => {
        authError.value = error
      })
  }
  async function loginWithCredential() {
    if (localStorage.getItem('jwt_token'))
      await axios
        .post('/auth/login-with-credential', {}, getAuthorization())
        .then((response) => {
          useUsersStore().user = response.data.foundUser

          useCartsStore().loadCartItems()
        })
        .catch((error) => {
          console.log(error)

          if (error.response.statusText === 'Unauthorized') localStorage.removeItem('jwt_token')
        })
  }
  async function logout() {
    localStorage.removeItem('jwt_token')
    window.location.reload()
  }

  return { authResult, authError, signup, login, loginWithCredential, logout }
})
