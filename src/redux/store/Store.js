import { configureStore } from "@reduxjs/toolkit";
import loginAuth from "../slice/AuthSlice";
import ListSlice from "../slice/ListSlice";
import LoadingSlice from "../slice/LoadingSlice";
import PopupSlice from "../slice/PopupSlice";
import SwitchSlice from "../slice/SwitchSlice";

export const store = configureStore({
    reducer : {
        auth : loginAuth,
        allList : ListSlice,
        loading:LoadingSlice,
        popup:PopupSlice,
        switch: SwitchSlice,
    }
})