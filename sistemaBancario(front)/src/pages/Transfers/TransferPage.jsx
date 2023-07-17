import React from 'react'
import { Link, Outlet } from "react-router-dom";

export const TransferPage = () => {

    return (
        <>
            <h1 className='className="container d-flex justify-content-center align-items-center h-100"'>
                Transfers Page  
            </h1>
            <Outlet></Outlet>
        </>
    )
}