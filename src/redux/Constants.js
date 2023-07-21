import axios from "axios"
import { toast } from "react-hot-toast"

export const BASE_URL = `http://localhost:8080`

export const API_HEADER = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("Token")}`,
    },
})
export const API = axios.create({
    baseURL: BASE_URL,
})

export const notifySuccess = (e) => {
    toast.success(e);
}
export const notifyError = (e) => {
    toast.error(e);
}