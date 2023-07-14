import { configureStore } from "@reduxjs/toolkit";
import loginAuth from "../slice/AuthSlice";

export const store = configureStore({
    reducer : {
        auth : loginAuth
    }
})