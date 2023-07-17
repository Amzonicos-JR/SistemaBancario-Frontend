import React from "react";
import { Link, Outlet } from "react-router-dom";
import { TableUser } from "../../components/User/TableUser";
import { TableProfile } from "../../components/Profile/TableProfile.jsx";

export const GetProfile = () => {
  return (
    <>
      <TableProfile/>
    </>
  );
};