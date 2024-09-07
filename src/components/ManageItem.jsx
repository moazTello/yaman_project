import React, { useState } from "react";
import { useStore } from "../context/useStore";
import { FaTrashCan } from "react-icons/fa6";
import { IoFastFoodOutline, IoCloseSharp } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import "../style/style.css";
const ManageItem = () => {
  const { getItemsList } = useStore();
  const [updateBox, setUpdateBox] = useState(null);
  const [updateItemAmount, setUpdateItemAmount] = useState(null);
  const [updateItemPrice, setUpdateItemPrice] = useState(null);

  const {
    items,
    // , setItems, rowItemsCollection
  } = useStore();

  const handleDelete = async (item) => {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm("Want to delete?");
    if (!result) return;
    if (item.itemAmount !== 0) {
      return alert("The Item Amount is not empty yet, you can't delete it !");
    }
    try {
      const itemDeleted = doc(db, "rowItems", item.id);
      await deleteDoc(itemDeleted);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleUpdate = async (item) => {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm("Make sure from the price & amount");
    if (!result) return;
    try {
      const itemUpdated = doc(db, "rowItems", item.id);
      if (updateItemAmount === null || updateItemAmount === 0) {
        // eslint-disable-next-line no-restricted-globals
        var resultPrice = confirm(
          "You are about change just the price, Does it real ?"
        );
        if (!resultPrice) return;
        await updateDoc(itemUpdated, {
          itemPrice: updateItemPrice,
        });
        await getItemsList();
        alert(`${item.itemName} Price Updated successfully`);
        setUpdateItemAmount(null);
        setUpdateItemPrice(null);
        setUpdateBox(null);
      } else if (updateItemPrice === null || updateItemPrice === 0) {
        // eslint-disable-next-line no-restricted-globals
        var resultAmount = confirm(
          "You are about leave the old Price, Does it suitable ?"
        );
        if (!resultAmount) return;
        await updateDoc(itemUpdated, {
          itemAmount: updateItemAmount + item.itemAmount,
          chargeDate: new Date(),
        });
        await getItemsList();
        alert(`${item.itemName} Charged successfully`);
        setUpdateItemAmount(null);
        setUpdateItemPrice(null);
        setUpdateBox(null);
      } else {
        await updateDoc(itemUpdated, {
          itemAmount: updateItemAmount + item.itemAmount,
          itemPrice: updateItemPrice,
          chargeDate: new Date(),
        });
        await getItemsList();
        alert(`${item.itemName} Charged successfully`);
        setUpdateItemAmount(null);
        setUpdateItemPrice(null);
        setUpdateBox(null);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <div className="addItem w-full flex justify-center items-start min-h-[100vh] max-h-[100vh] relative">
      <div className="items_shadow w-full min-h-[100vh] max-h-[100vh] p-10 overflow-y-scroll">
        {items?.map((item) => (
          <div
            key={item.id}
            className="min-w-80 text-white hover:font-bold hover:bg-slate-50 hover:text-violet-400 float-left m-5 p-10 min-h-32 flex flex-col justify-center items-center border-2 border-violet-400 rounded-md"
          >
            <p className="mb-5 text-2xl"> {item.itemName} </p>
            <div className="w-full flex items-center justify-between">
              <p>Amount : </p>
              <p>{item.itemAmount}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p>Create : </p>
              <p>
                {item.createdAt
                  ? moment(item.createdAt).format("YYYY-MM-DD")
                  : "-"}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p>End : </p>
              <p>
                {item.endedAt ? moment(item.endedAt).format("YYYY-MM-DD") : "-"}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p>Charge : </p>
              <p>
                {item.chargedAt
                  ? moment(item.chargedAt).format("YYYY-MM-DD")
                  : "-"}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p>Available : </p>
              <p>{item.itemAvailable ? "T" : "F"}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p>Price : </p>
              <p>{item.itemPrice}$</p>
            </div>
            <div className="w-full flex justify-evenly items-center">
              <button
                onClick={() => handleDelete(item)}
                className="w-8 h-8 flex justify-center rounded-md items-center mt-5 text-white hover:bg-slate-50 bg-red-500 hover:border-2 hover:border-violet-400 hover:text-violet-400"
              >
                <FaTrashCan />
              </button>
              <button
                onClick={() => setUpdateBox(item.id)}
                className="w-8 h-8 flex justify-center rounded-md items-center mt-5 text-white hover:bg-slate-50 bg-green-500 hover:border-2 hover:border-violet-400 hover:text-violet-400"
              >
                <FaTruck />
              </button>
            </div>
            <div
              style={{ display: updateBox === item.id ? "flex" : "none" }}
              className="w-full bg_opacity min-h-full flex justify-center items-center absolute top-0 left-0 z-10"
            >
              <div className="w-[70%] flex flex-col p-10 rounded-lg border-2 border-violet-500">
                <div className="w-full flex justify-between">
                  <p className="font-bold text-2xl text-white mr-auto">
                    Charge {item.itemName}
                  </p>
                  <button
                    onClick={() => setUpdateBox(null)}
                    className="text-white hover:text-red-500"
                  >
                    <IoCloseSharp size={30} />
                  </button>
                </div>
                <input
                  type="number"
                  className="w-96 bg-gray-800 bg-opacity-50 border-2 rounded-lg min-h-[40px] my-5 border-slate-200 px-3"
                  placeholder="Item Amount"
                  onChange={(e) => setUpdateItemAmount(Number(e.target.value))}
                />
                <input
                  type="number"
                  className="w-96 bg-gray-800 bg-opacity-50 border-2 rounded-lg min-h-[40px] my-5 border-slate-200 px-3"
                  placeholder="Item Price"
                  onChange={(e) => setUpdateItemPrice(Number(e.target.value))}
                />
                <button
                  onClick={() => handleUpdate(item)}
                  className="w-96 text-xl border-2 border-white hover:border-red-500 rounded-lg my-5 hover:bg-red-500 bg-opacity-50 hover:text-white min-h-[40px] "
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
        <Link
          to="/yaman_project/addItem"
          className="min-w-44 min-h-32 m-5 flex justify-center items-center float-left"
        >
          <p className="w-16 h-16 text-slate-50 hover:text-violet-400 hover:bg-slate-50 hover:border-violet-400 border-2 border-slate-50 rounded-full flex justify-center items-center text-2xl">
            <span className="text-sm mr-1"> + </span> <IoFastFoodOutline />
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ManageItem;
