import axios from "axios"

export const BASE_URL = `http://localhost:8080`

export const API_HEADER = axios.create({
    baseURL : BASE_URL,
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb3ZpdGEyOCIsImV4cCI6MTY5MDMzNjgyNSwiaWF0IjoxNjg5NzMyMDI1fQ.m-b-QowboM_7x11y7vDTrj85EsxD0ME14-VgmNkyWh2HI9X0aIXafU1miOIORj_juBE3uyRqNKQr9ykxRIw2Vg',
    },
})
export const API = axios.create({
    baseURL : BASE_URL,
})