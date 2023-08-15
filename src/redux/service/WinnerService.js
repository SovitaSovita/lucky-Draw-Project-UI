import { API_HEADER } from "../Constants"
import { instance } from "../InstanceHeader"

export const get_winner = async () => {
    try{
        const response = await instance.get(`/api/v1/info/getting-all-winner-information`)
        return response
    }
    catch (e) {
        console.log(e)
    }
}


export const reset_winner = async () => {
    try{
        const response = await API_HEADER.delete(`/api/v1/info/reset-winner`)
        return response
        
    }catch(e){
        console.log(e)
    }
}