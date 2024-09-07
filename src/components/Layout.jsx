import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useStore } from "../context/useStore";
import { IoEye } from "react-icons/io5";
const Layout = () => {
  const { logedin, navbarVisible, toggleNavbar } = useStore();
  return (
    <div>
      {navbarVisible && logedin === true && <Navbar />}
      {!navbarVisible && logedin === true && (
        <div className="w-full flex justify-end">
          <button className="mr-10 hover:text-amber-400" onClick={toggleNavbar}>
            <IoEye size={28} />
          </button>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
