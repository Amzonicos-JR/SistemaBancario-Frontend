import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/product/getProduct/${id}`
      );
      if(data){
        setProduct(data.product)
        console.log(data.product)
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error to got product");
    }
  };

  const updateProduct = async () => {
    let form = {
      name: document.getElementById("inputName").value,
      description: document.getElementById("inputDescription").value,
      price: document.getElementById("inputPrice").value,
      stock: document.getElementById("inputStock").value
    }

    try {
      const { data } = await axios.put(
        `http://localhost:3000/product/update/${id}`,
        form
      );
      if (data) {
        alert(data.message);
        navigate("/home/product");
      }
    } catch (err) {
      console.error(err);
      throw new Errror("Error to updated product");
    }
  };

  useEffect(() =>{
    getProduct()
  }, [])

  return (
    <>
      <form className="container">
        <h2>Agregar Product</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            id="inputName"
            name="name"
            type="text"
            className="form-control"
            placeholder="Name"
            defaultValue={product.name}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            id="inputDescription"
            name="description"
            type="text"
            className="form-control"
            placeholder="Description"
            defaultValue={product.description}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            id="inputPrice"
            name="price"
            type="number"
            className="form-control"
            placeholder="Price"
            value="123"
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            id="inputStock"
            name="stock"
            type="number"
            className="form-control"
            placeholder="Stock"
            defaultValue={product.stock}
          />
        </div>

        <button
          onClick={(e) => updateProduct(e)}
          type="button"
          className="btn btn-primary btn-lg btn-block"
        >
          Actualizar
        </button>

        <Link to={"/home/product"}>
          <button type="button" className="btn btn-primary btn-lg btn-block">
            Cancelar
          </button>
        </Link>
      </form>
    </>
  );
};
