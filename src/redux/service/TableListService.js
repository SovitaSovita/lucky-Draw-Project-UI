import { API, API_HEADER } from "../Constants"

export const get_list = async () => {
    try {
        const response = await API_HEADER.get(`/api/v1/info/getting-customer-information`)
        return response
    }
    catch(e){
        console.log(e)
    }
}
export const add_list = async (newRow, options) => {
    try {
        const response = await API_HEADER.post(`/api/v1/user`, newRow, options)
        return response
    }
    catch(e){
        console.log(e)
    }
}
export const update_list = async (newRow, oldRow) => {
    try {
        const response = await API_HEADER.put(`/api/v1/update-user/${oldRow.id}`, newRow)
        return response
    }
    catch(e){
        console.log(e)
    }
}
export const delete_list = async (orderNo) => {
    try {
        const response = await API_HEADER.delete(`/api/v1/info/delete-customer-imformation/${orderNo}`)
        return response
    }
    catch(e){
        console.log(e)
    }
}