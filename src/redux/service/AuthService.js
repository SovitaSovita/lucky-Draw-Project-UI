import { API } from "../Constants"


export const loginService = async(user) => {
    try{
        const response = await API.post(`/api/v1/auth/login`,user);
        localStorage.setItem("Token", response.data.payload.token);
        return response;
    }catch(e){
        return e;
    }
}