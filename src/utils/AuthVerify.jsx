import React from 'react'
import {Navigate,Outlet } from "react-router-dom";
export default function AuthVerify() {
    if(localStorage.getItem('tokenMiniProject') != null){
        return <Outlet />;
    }else{
        return <Navigate replace to="/"/>;
    }
}