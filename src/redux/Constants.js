import axios from "axios"

export const BASE_URL = `http://localhost:8080`

export const API_HEADER = axios.create({
    baseURL : BASE_URL,
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb3ZpdGFzb3ZpdGFAZ21haWwuY29tIiwiZXhwIjoxNjgwOTY3MDUwLCJpYXQiOjE2ODA5NDkwNTB9.MGlw_a741KxJCcpaxe_yTWHZ8xmkjBAWqrbf8SpWoGLkcqxEsjmtZ7bRzl_JSlD5jah0cHUsM8H-GliFRmk8AQ',
    },
})
export const API = axios.create({
    baseURL : BASE_URL,
})