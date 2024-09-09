import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/useStore";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { IoMdPhotos } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
const Navbar = () => {
  const navigate = useNavigate();
  const { setLogedin, toggleBackgroundImage, toggleNavbar } = useStore();
  const logout = async () => {
    try {
      await signOut(auth);
      setLogedin(false);
      navigate("/yaman_project");
      localStorage.setItem("auth", "");
      localStorage.setItem("logedin", false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <div className="w-full min-h-20 bg-slate-100 flex justify-start items-center">
      <p className="text-xl font-bold mx-10">YAMAN CASHIER</p>
      <Link
        className="mr-10 border-b-2 border-slate-100 hover:border-b-2 hover:border-amber-400 hover:text-amber-400"
        to="/yaman_project/items"
      >
        Sells
      </Link>
      <Link
        className="mr-10 border-b-2 border-slate-100 hover:border-b-2 hover:border-violet-400 hover:text-violet-400"
        to="/yaman_project/manageItems"
      >
        Items
      </Link>
      {JSON.parse(localStorage?.getItem("auth")).email ===
        "telloyaman@gmail.com" && (
        <Link
          className="mr-10 border-b-2 border-slate-100 hover:border-b-2 hover:border-violet-400 hover:text-violet-400"
          to="/yaman_project/invoices"
        >
          Invoices
        </Link>
      )}
      <button
        className="mr-10 ml-auto hover:text-amber-400"
        onClick={toggleNavbar}
      >
        <FaEyeSlash size={28} />
      </button>
      <button
        className="mr-10 hover:text-amber-400"
        onClick={toggleBackgroundImage}
      >
        <IoMdPhotos size={28} />
      </button>
      <button className="mr-10 hover:text-amber-400" onClick={logout}>
        <HiOutlineLogout size={30} />
      </button>
    </div>
  );
};

export default Navbar;
