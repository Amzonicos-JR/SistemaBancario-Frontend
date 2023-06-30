import React from "react";
import { Link } from "react-router-dom";

export const DeleteProduct = () =>{
    return (
        <>
            <h1>Delete Product</h1>
            <Link to={"/home/product"}><button>Cancelar</button></Link>
        </>
    )
}