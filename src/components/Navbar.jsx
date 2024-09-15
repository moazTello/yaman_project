import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/useStore";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { IoMdPhotos } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
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
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full min-h-20 bg-slate-100 flex justify-start items-center z-50">
      {/* <p className="text-xl font-bold mx-10">YAMAN CASHIER</p>
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
      </button> */}
      <div className="navbar md:px-10">
        <div className="flex">
          <Link className="btn btn-ghost text-xl text-stone-700">YAMAN</Link>
        </div>
        <div className="flex flex-1">
          <ul className="menu menu-horizontal px-1 flex w-[100%] items-center">
            <li className="hidden md:flex">
              <Link
                className="border-b-2 border-slate-100 hover:border-b-2 text-lg mx-1 text-stone-500 hover:border-amber-400 hover:text-amber-400"
                to="/yaman_project/items"
              >
                Sells
              </Link>
            </li>
            <li className="hidden md:flex">
              <Link
                className="border-b-2 border-slate-100 hover:border-b-2 text-lg mx-1 text-stone-500 hover:border-violet-400 hover:text-violet-400"
                to="/yaman_project/manageItems"
              >
                Items
              </Link>
            </li>

            {JSON.parse(localStorage?.getItem("auth")).email ===
              "telloyaman@gmail.com" && (
              <>
                {" "}
                <li className="hidden md:flex">
                  <Link
                    className="border-b-2 border-slate-100 hover:border-b-2 text-lg mx-1 text-stone-500 hover:border-violet-400 hover:text-violet-400"
                    to="/yaman_project/invoices"
                  >
                    Invoices
                  </Link>
                </li>
                <li className="hidden md:flex">
                  <Link
                    className="border-b-2 border-slate-100 hover:border-b-2 text-lg mx-1 text-stone-500 hover:border-violet-400 hover:text-violet-400"
                    to="/yaman_project/boxoffice"
                  >
                    Box
                  </Link>
                </li>
              </>
            )}
            <li className="flex md:hidden">
              <details>
                <summary className="text-stone-500">Control</summary>
                <ul className="bg-base-100 rounded-lg p-2 z-20">
                  <li className="flex md:hidden">
                    <Link
                      className="hover:border-violet-400 hover:text-violet-400"
                      to="/yaman_project/manageItems"
                    >
                      Items
                    </Link>
                  </li>
                  <li className="flex md:hidden">
                    <Link
                      className="hover:text-amber-400"
                      to="/yaman_project/items"
                    >
                      Sells
                    </Link>
                  </li>
                  {JSON.parse(localStorage?.getItem("auth")).email ===
                    "telloyaman@gmail.com" && (
                    <>
                      <li className="flex md:hidden">
                        <Link
                          className="border-slate-100 hover:text-violet-400"
                          to="/yaman_project/invoices"
                        >
                          Invoices
                        </Link>
                      </li>
                      <li className="flex md:hidden">
                        <Link
                          className="border-slate-100 hover:text-violet-400"
                          to="/yaman_project/boxoffice"
                        >
                          Box
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </details>
            </li>
            <li className="ml-auto">
              <button className="hover:text-amber-400" onClick={toggleNavbar}>
                <FaEyeSlash className="w-5 h-5 md:w-7 md:h-7" />
              </button>
            </li>
            <li>
              <button
                className="hover:text-amber-400"
                onClick={toggleBackgroundImage}
              >
                <IoMdPhotos className="w-5 h-5 md:w-7 md:h-7" />
              </button>
            </li>
            <li>
              <button className="hover:text-amber-400" onClick={logout}>
                <HiOutlineLogout className="w-5 h-5 md:w-7 md:h-7" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
