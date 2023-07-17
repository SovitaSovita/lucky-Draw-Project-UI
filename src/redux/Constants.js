import axios from "axios"

export const BASE_URL = `http://localhost:8080`

export const API = axios.create({
    baseURL : `http://localhost:8080/api/v1/auth/login`,
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrbEBzc3lhZG1pbiIsImV4cCI6MTY5MDE2MTMzOSwiaWF0IjoxNjg5NTU2NTM5fQ.Goe1uHTmaPN2vLQ-B1MdzxqMYzOl2mSx8ucLN4xaxAx_O03GVL866R_z22z1jFVo5wQ-_ziDT2_DJ4MVADG5pQ',
    },
})