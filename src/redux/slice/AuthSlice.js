import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLogin : true
}

export const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        loginAuth : (state, action) => {
            state.isLogin = action.payload
        }
    }
})

export const {loginAuth} = loginSlice.actions
export default loginSlice.reducer