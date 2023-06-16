import React, { useState, useContext } from "react";
import "../DashboardPage/DashBoardStyle.css";
import { Outlet, Link} from "react-router-dom";

export const DashboardPage = () => {
  return (
    <>
      <h1>DashBoard</h1>
      <Link to={"product"}> Products </Link>
      <Outlet></Outlet>
    </>
  );
};
