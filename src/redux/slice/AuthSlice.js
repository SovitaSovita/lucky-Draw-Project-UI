import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

export const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        loginAuth : (state, action) => {
            // console.log(action.payload)
        }
    }
})

export const {loginAuth} = loginSlice.actions
export default loginSlice.reducer