import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listData: [],
    winnerList: [],
    fakeWinner: {},
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
        },
        setFake : (state, action) => {
            state.fakeWinner = action.payload
        }
    },
})

export const {setListData, setWinner, setFake} = ListSlice.actions
export default ListSlice.reducer