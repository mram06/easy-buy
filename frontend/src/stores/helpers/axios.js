import axios from 'axios'

const apiBase = import.meta.env.VITE_API_BASE

axios.defaults.baseURL = apiBase

export default axios
