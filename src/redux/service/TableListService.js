import { API, API_HEADER } from "../Constants"
import { instance } from "../InstanceHeader"

export const get_list = async () => {
    try {
        const response = await API_HEADER.get(`/api/v1/info/getting-customer-information`)
        return response
    }
    catch (e) {
        console.log(e)
    }
}
export const add_list = async (newRow, options) => {
    try {
        const response = await API_HEADER.post(`/api/v1/info/customer-information`, newRow, options)
        return response
    }
    catch (e) {
        console.log(e)
    }
}
export const update_list = async (updateRow, oldRow) => {
    try {
        const response = await API_HEADER.put(`/api/v1/info/update-customer-imformation/${oldRow.No}`, updateRow)
        return response
    }
    catch (e) {
        console.log(e)
    }
}
export const delete_list = async (orderNo) => {
    try {
        const response = await API_HEADER.delete(`/api/v1/info/delete-customer-imformation/${orderNo}`)
        return response
    }
    catch (e) {
        console.log(e)
    }
}

export const upload_excel = async (formData) => {
    try {
        const response = await API_HEADER.post(`/api/v1/info/file-upload`, formData)
        return response
    }
    catch (e){
        console.log(e)
    }
}

export const insert_winner = async (formData) => {
    try {
        const response = await API_HEADER.post(`/api/v1/info/insert-winner-information`, formData)
        return response
    }
    catch (e){
        console.log(e)
    }
}

export const reset_customer = async () => {
    try {
        const response = await API_HEADER.delete(`/api/v1/info/reset-customer-imformation`)
        return response
    }
    catch (e){
        console.log(e)
    }
}