import axios from 'axios'
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_FLASK_URL,

    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
export default apiClient