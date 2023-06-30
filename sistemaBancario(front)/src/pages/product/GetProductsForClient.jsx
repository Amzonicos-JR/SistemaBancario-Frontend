import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const GetProductsForClient = () => {
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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container">
        <h1> Get Products</h1>
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
                    <Link to={`/dash/product/buy/${_id}`}>
                      <button className="btn btn-warning">Buy</button>
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
