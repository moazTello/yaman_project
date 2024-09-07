import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useStore } from "../context/useStore";
const Layout = () => {
  const { logedin } = useStore();
  return (
    <div>
      {logedin && 
        <Navbar />
      }
      <Outlet />
    </div>
  );
};

export default Layout;
