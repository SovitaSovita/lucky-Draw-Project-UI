import { configureStore } from "@reduxjs/toolkit";
import loginAuth from "../slice/AuthSlice";
import LoadingSlice from "../slice/LoadingSlice";
import PopupSlice from "../slice/PopupSlice";

export const store = configureStore({
    reducer : {
        auth : loginAuth,
        loading:LoadingSlice,
        popup:PopupSlice,
    }
})