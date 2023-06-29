import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const BuyProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate()

  const buy = async () => {
    try{
      alert("Has comprando exitosamente este producto")
      navigate("/home/product")
    }catch(err){
      console.error(err)
      throw new Error("Error to buy product")
    }
  }

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/product/getProduct/${id}`
      );
      if (data) {
        setProduct(data.product);
        console.log(data.product);
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error to got product");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <h1> Buy Product</h1>
      <h1 className="container">
        <Link to={"/home/product"}>
          <button className="btn btn-info">Regresar</button>
        </Link>
      </h1>
      <div className="container">
        <div className="card abs-center" style={{ width: "80vw" }}>
          <div className="card-body">
            <h5 className="card-title">Name: {product.name}</h5>
            <h5 className="card-title">Description: {product.description}</h5>
            <h5 className="card-title">Price: ${product.price}</h5>
            <h5 className="card-text">Stock: {product.stock}</h5>
          </div>
        </div>
      </div>
      <h1 className="container">
          <button onClick={() => buy()} className="btn btn-warning">Comprar</button>
      </h1>
    </>
  );
};
