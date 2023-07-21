import { configureStore } from "@reduxjs/toolkit";
import loginAuth from "../slice/AuthSlice";
import ListSlice from "../slice/ListSlice";
import LoadingSlice from "../slice/LoadingSlice";

export const store = configureStore({
    reducer : {
        auth : loginAuth,
        allList : ListSlice,
        loading:LoadingSlice,

    }
})