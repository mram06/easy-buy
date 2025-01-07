import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '../helpers/axios'

export const useUsersStore = defineStore('users', () => {
  const user = ref(null)

  return { user }
})
