import React from "react";
import { useStore } from "../context/useStore";
import { FaTrashCan } from "react-icons/fa6";
// import items_api from "../api/items_api";
import { IoFastFoodOutline } from "react-icons/io5";
import moment from "moment";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import "../style/style.css";
const ManageItem = () => {
  const { items
    // , setItems, rowItemsCollection
  } = useStore();
  const handleDelete = async (item) => {
    console.log(item.id);
    // eslint-disable-next-line no-restricted-globals
    var result = confirm("Want to delete?");
    if (!result) return;
    try {
      const itemDeleted = doc(db, "rowItems", item.id);
      await deleteDoc(itemDeleted);
    } catch (error) {
      console.log(error);
    }
    // if(item.itemAmount !== 0){
    //   return alert("There are many pieces yet, you can't delete the item !")
    // }
    // try {
    //   await items_api.delete(`/rowItems/${id}`, id);
    //   const itemsList = items.filter((item) => item.id !== id);
    //   setItems(itemsList);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div className="addItem w-full flex justify-center items-start min-h-[100vh] max-h-[100vh]">
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
            <button
              onClick={() => handleDelete(item)}
              className="w-8 h-8 flex justify-center rounded-md items-center mt-5 text-white hover:bg-slate-50 bg-red-500 hover:border-2 hover:border-violet-400 hover:text-violet-400"
            >
              <FaTrashCan />
            </button>
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
