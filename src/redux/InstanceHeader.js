import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8080'
})

instance.interceptors.request.use(
    config => {
        var token = localStorage.getItem("token");
        if (token) {
            config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb3ZpdGEyOCIsImV4cCI6MTY5MDUwNDE0MCwiaWF0IjoxNjg5ODk5MzQwfQ.qGZG1FV3aTQotSvFBhekePXw4qP0tUlYmm5ufo3_Nl7DncN13r8y8NmMEQY9O7i0LzK5GvIPM8NWoiFBsrbVqA'
            config.headers['Content-Type'] = 'application/json';
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)