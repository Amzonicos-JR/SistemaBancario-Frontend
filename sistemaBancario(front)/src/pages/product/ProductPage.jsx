import React from "react";
import { Outlet } from "react-router-dom";

export const ProductPage = () =>{
    return(
        <>
            <h1> Products </h1>
            <Outlet></Outlet>
        </>
    )
}