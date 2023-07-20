import axios from "axios"
import { toast } from "react-hot-toast"

export const BASE_URL = `http://localhost:8080`

export const API_HEADER = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb3ZpdGEyOCIsImV4cCI6MTY5MDM5NjgxNSwiaWF0IjoxNjg5NzkyMDE1fQ.UGxE7nK63NgwIv5p4JMvMXaQ8MiLtrSjgOmCaXRHquPPYvGTfMGhjO_8MF8nAckvE63Q3tIwkctJI55Uwgazrw',
    },
})
export const API = axios.create({
    baseURL: BASE_URL,
})

export const notifySuccess = (e) => {
    toast.success(e);
}