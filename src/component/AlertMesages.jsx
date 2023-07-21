import React from "react";
import { Toaster } from "react-hot-toast";

export default function AlertMesages() {
    return (
        < div >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div >
    )
}
