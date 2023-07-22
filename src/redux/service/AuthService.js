import { API, API_HEADER } from "../Constants"


export const loginService = async(user) => {
    try{
        const response = await API.post(`/api/v1/auth/login`,user);
        localStorage.setItem("token", response.data.payload.token);
        return response;
    }catch(e){
        return e;
    }
}


export const resetPassword = async(body) => {
    try{
        const response = await API_HEADER.put(`/api/v1/auth/change-password`,body)
        return response;
    }catch(e){
        return e; 
    }
}