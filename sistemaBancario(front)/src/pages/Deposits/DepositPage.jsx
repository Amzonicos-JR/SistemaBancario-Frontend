import React from 'react'
import { Link, Outlet } from "react-router-dom";

export const DepositPage = () => {

    return (
        <>
            <h1 className='className="container d-flex justify-content-center align-items-center h-100"'>
                Deposit Page  
            </h1>
            <Outlet></Outlet>
        </>
    )
}