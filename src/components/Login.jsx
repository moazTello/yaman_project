import React, { useState } from "react";
import { useStore } from "../context/useStore";
import { useNavigate } from "react-router-dom";
import {
  auth,
  // , googleProvider
} from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  // , signInWithPopup, signOut
} from "firebase/auth";
const Login = () => {
  const navigate = useNavigate();
  const { setLogedin } = useStore();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    // if (userName === "Yaman_Tello" && password === "Yaman_Tello") {
    //   setLogedin(true);
    //   navigate("/yaman_project/items");
    // }
    if (userName && password) {
      try {
        await createUserWithEmailAndPassword(auth, userName, password);
        setLogedin(true);
        navigate("/yaman_project/items");
        console.log(auth?.currentUser?.email);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };
  //   const handleLoginGoogle = async () => {
  //       try {
  //         await signInWithPopup(auth, googleProvider);
  //         setLogedin(true);
  //         navigate("/yaman_project/items");
  //       } catch (error) {
  //         console.log(error);
  //       }
  //   };
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center">
      <p className="w-full pl-20 mt-20 font-bold text-2xl">
        Welcome to Yaman Cashier app
      </p>
      <div className="w-[90%] border-amber-400 mt-10 p-10 border-2 rounded-lg">
        <p className="text-2xl font-bold">Login</p>
        <p className="mt-5">Username</p>
        <input
          className="border-2 mt-2 rounded-md w-full bg-slate-800 pl-3 min-h-[40px]"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <p className="mt-5">Password</p>
        <input
          type="password"
          className="border-2 mt-2 rounded-md w-full bg-slate-800 pl-3 min-h-[40px]"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          onClick={handleLogin}
          className="min-h-[40px] mt-10 w-full text-white bg-amber-400 hover:border-2 hover:border-amber-400 hover:bg-slate-50 hover:text-amber-400 text-xl hover:font-bold rounded-lg"
        >
          Login
        </button>
        {/* <button
          onClick={handleLoginGoogle}
          className="min-h-[40px] mt-10 w-full text-white bg-amber-400 hover:border-2 hover:border-amber-400 hover:bg-slate-50 hover:text-amber-400 text-xl hover:font-bold rounded-lg"
        >
          Login with Google
        </button> */}
      </div>
    </div>
  );
};

export default Login;
