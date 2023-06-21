import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const AddProduct = () => {
    const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post('http://localhost:3000/product/add', form)
      if(data.message){
        alert(data.message)
        navigate('/home/product')
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error in saved to product");
    }
  };

  return (
    <>
      <form className="container">
        <h2>Agregar Product</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            onChange={handleChange}
            id="inputName"
            name="name"
            type="text"
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            onChange={handleChange}
            id="inputDescription"
            name="description"
            type="text"
            className="form-control"
            placeholder="Description"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            onChange={handleChange}
            id="inputPrice"
            name="price"
            type="number"
            className="form-control"
            placeholder="Price"
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            onChange={handleChange}
            id="inputStock"
            name="stock"
            type="number"
            className="form-control"
            placeholder="Stock"
          />
        </div>

        <button
          onClick={(e) => addProduct(e)}
          type="button"
          className="btn btn-primary btn-lg btn-block"
        >
          Agregar
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
