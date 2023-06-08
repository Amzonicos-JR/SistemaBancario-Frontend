import React, { useState, useContext } from "react";
import "../DashboardPage/DashBoardStyle.css";

export const DashboardPage = () => {

  return (
    <>
    <h1>DashBoard</h1>
      <Outlet></Outlet>
    </>
  );
};
