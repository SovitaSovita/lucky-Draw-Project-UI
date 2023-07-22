import { Navigate } from "react-router-dom"
import React from "react"


const Protected = ({children}) => {
    if(localStorage.getItem("token")){
        return children;
    }else{
        return <Navigate to='/login' replace />
    }
}
export default Protected