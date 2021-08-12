import axios from "axios"
import redux from "../store/actions"

export const API_URL = process.env.REACT_APP_API

const api = axios.create({
    // baseURL: API_URL,
    baseURL: 'https://sistema.trackcash.com.br/api/',
    headers: {
        'Content-Type': 'application/json charset=utf-8',
    }
})

api.interceptors.request.use(async config => {
    const userToken = redux.user.get()?.token
    config.headers.token = userToken
    return config
})

api.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        // console.log(error)
        return { error: error.message }
    }
)
export default api