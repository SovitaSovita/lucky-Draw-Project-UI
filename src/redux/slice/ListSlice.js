import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listData: [],
    winnerList: []
}

export const ListSlice = createSlice({
    name : 'customerList',
    initialState,
    reducers : {
        setListData : (state, action) => {
        // console.log("action.payload", action.payload)
           state.listData = action.payload
        },
        setWinner : (state, action) => {
        // console.log("action.payload", action.payload)
           state.winnerList = action.payload
        }
    }
})

export const {setListData, setWinner} = ListSlice.actions
export default ListSlice.reducer