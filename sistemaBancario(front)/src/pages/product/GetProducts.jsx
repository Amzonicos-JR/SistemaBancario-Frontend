import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const GetProducts = () => {
  const [products, setProducts] = useState([{}]);

  const getProducts = async () => {
    try {
      const { data } = await axios("http://localhost:3000/product/get");
      console.log(data);
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || "Error getting products");
    }
  };

  const deleteProduct = async (id) => {
    try {
      let confirmDelete = confirm(`Are you sure to delete this product?`);
      if (confirmDelete) {
        const { data } = await axios.delete(
          `http://localhost:3000/product/delete/${id}`
        );
        getProducts();
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error to deleted product");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container">
        <h1> Get Products</h1>
        <Link to={"add"}>
          <button className="btn btn-danger">+Add</button>
        </Link>
        <div className="d-flex flex-wrap">
          {products.map(
            ({ _id, name, description, price, stock, total }, i) => (
              <>
                  <div
                    key={i}
                    className="card border-info mb-3 d-inline-flex p-3 m-3"
                    style={{ maxWidth: "18rem" }}
                  >
                    <div className="card-header">{name}</div>
                    <div className="card-body">
                      <h5 className="card-title">Description: {description}</h5>
                      <h5 className="card-title">Price: ${price}</h5>
                      <h5 className="card-title">Stock: {stock}</h5>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Total: {total}</h5>
                    </div>
                    <div className="card-body">
                      <Link to={`update/${_id}`}>
                        <button className="btn btn-warning">Actualizar</button>
                      </Link>
                      <Link onClick={() => deleteProduct(_id)}>
                        <button className="btn btn-danger">Eliminar</button>
                      </Link>
                    </div>
                  </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};
