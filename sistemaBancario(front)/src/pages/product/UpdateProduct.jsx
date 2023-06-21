import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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
    try {
      const { data } = await axios.put(
        `http://localhost:3000/product/update/${id}`,
        form
      );
      if (data.message) {
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            id="inputPrice"
            name="price"
            type="number"
            className="form-control"
            placeholder="Price"
            defaultValue={product.price}
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
