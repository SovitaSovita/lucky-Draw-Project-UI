import { API } from "../Constants"

export const get_list = async () => {
    try {
        const response = await API.get(`/api/v1/user`)
        return response
    }
    catch(e){
        console.log(e)
    }
}
export const add_list = async (newRow, options) => {
    try {
        const response = await API.post(`/api/v1/user`, newRow, options)
        return response
    }
    catch(e){
        console.log(e)
    }
}
export const update_list = async (newRow, oldRow) => {
    try {
        const response = await API.put(`/api/v1/update-user/${oldRow.id}`, newRow)
        return response
    }
    catch(e){
        console.log(e)
    }
}
export const delete_list = async (selectedRow) => {
    try {
        const response = await API.delete(`/api/v1/removeUser/${selectedRow.id}`, { data: selectedRow })
        return response
    }
    catch(e){
        console.log(e)
    }
}