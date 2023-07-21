import axios from "axios"
import { toast } from "react-hot-toast"

export const BASE_URL = `http://localhost:8080`

export const API_HEADER = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb3ZpdGEyOCIsImV4cCI6MTY5MDUwNDE0MCwiaWF0IjoxNjg5ODk5MzQwfQ.qGZG1FV3aTQotSvFBhekePXw4qP0tUlYmm5ufo3_Nl7DncN13r8y8NmMEQY9O7i0LzK5GvIPM8NWoiFBsrbVqA',
    },
})
export const API = axios.create({
    baseURL: BASE_URL,
})

export const notifySuccess = (e) => {
    toast.success(e);
}