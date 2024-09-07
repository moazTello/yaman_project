import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { auth } from "../config/firebase";
const Layout = () => {
  return (
    <div>
      {auth?.currentUser?.email && 
        <Navbar />
      }
      <Outlet />
    </div>
  );
};

export default Layout;
