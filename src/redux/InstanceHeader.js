import axios from "axios";
import { BASE_URL } from "./Constants";

export const instance = axios.create({
    baseURL: BASE_URL
})

instance.interceptors.request.use(
    config => {
        var token = localStorage.getItem("token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
            config.headers['Content-Type'] = 'application/json';
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)