import React from "react";
import { Link } from "react-router-dom";

export const AddProduct = () =>{
    return (
        <>
            <h1>Agregar un producto</h1>
            <Link to={"/home/product"}><button>Cancelar</button></Link>
        </>
    )
}