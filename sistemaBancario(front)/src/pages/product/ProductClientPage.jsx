import React from "react";
import { Outlet } from "react-router-dom";

export const ProductClientPage = () => {
  return (
    <>
      <h1>Product for Client</h1>
      <Outlet></Outlet>
    </>
  );
};
