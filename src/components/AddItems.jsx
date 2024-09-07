import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import { useStore } from "../context/useStore";
import "../style/style.css";
import { Link, useNavigate } from "react-router-dom";
const AddItems = () => {
  const navigate = useNavigate();
  const { rowItemsCollection, backgroundImage } = useStore();
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);
  const addItem = async () => {
    try {
      await addDoc(rowItemsCollection, {
        itemName: itemName,
        itemAvailable: itemAmount > 0 ? true : false,
        itemAmount: itemAmount,
        itemPrice: itemPrice,
        createdDate: new Date(),
        enddDate: 0,
        chargeDate: new Date(),
      });
      alert("Item added successfuly !");
      navigate("/yaman_project/manageItems");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <div
      className={`${
        backgroundImage ? "addItemSwain" : "tableBackground"
      }  w-full flex justify-center items-start min-h-[100vh] max-h-[100vh]`}
    >
      <div className="items_shadow flex flex-col w-full min-h-[100vh] max-h-[100vh] p-10 overflow-y-scroll">
        <p className="w-full text-2xl text-white font-bold my-5 ">
          Add New Item
        </p>
        <input
          className="w-96 bg-gray-800 bg-opacity-50 border-2 rounded-lg min-h-[40px] my-5 border-slate-200 px-3"
          placeholder="Item Name"
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          className="w-96 bg-gray-800 bg-opacity-50 border-2 rounded-lg min-h-[40px] my-5 border-slate-200 px-3"
          placeholder="Item Amount"
          onChange={(e) => setItemAmount(Number(e.target.value))}
        />
        <input
          type="number"
          className="w-96 bg-gray-800 bg-opacity-50 border-2 rounded-lg min-h-[40px] my-5 border-slate-200 px-3"
          placeholder="Item Price"
          onChange={(e) => setItemPrice(Number(e.target.value))}
        />
        <button
          onClick={addItem}
          className="w-96 text-xl border-2 border-white hover:border-red-500 rounded-lg my-5 hover:bg-red-500 bg-opacity-50 hover:text-white min-h-[40px] "
        >
          Add
        </button>
        <Link
          to="/yaman_project/manageItems"
          className="w-96 flex justify-center items-center text-xl border-2 border-white hover:border-zinc-800 rounded-lg my-5 hover:bg-zinc-800 bg-opacity-50 hover:text-white min-h-[40px] "
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default AddItems;
// telloyaman@gmail.com
