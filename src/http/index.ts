import axios from 'axios'
import { AuthResponse } from "../models/AuthResponse";
export const API_URL = 'http://localhost:8080/api'

const authToken=localStorage.getItem('token')

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
   
})

api.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
    console.log(config.headers)
    return config
})

api.interceptors.response.use((config) => {
    const authTokens=localStorage.getItem('token')
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401&&error.config&&!error.config_isRetry) {
        originalRequest._isRetry=true
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            return api.request(originalRequest)
        } catch (error) {
            console.log('User is not authorized')
        }
    }
    throw error
})
export default api;