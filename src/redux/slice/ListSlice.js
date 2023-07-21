import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listData: [],
}

export const ListSlice = createSlice({
    name : 'customerList',
    initialState,
    reducers : {
        setListData : (state, action) => {
            console.log("action.payload", action.payload)
           state.listData = action.payload
        }
    }
})

export const {setListData} = ListSlice.actions
export default ListSlice.reducer