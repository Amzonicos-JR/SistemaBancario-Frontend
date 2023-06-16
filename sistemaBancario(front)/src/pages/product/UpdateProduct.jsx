import React from "react";
import { Link } from "react-router-dom";

export const UpdateProduct = () =>{
    return (
        <>
            <h1> Update Product </h1>
            <Link to={"/home/product"}><button>Cancelar</button></Link>
        </>
    )
}