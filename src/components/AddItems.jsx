import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import { useStore } from "../context/useStore";
import "../style/style.css";
import { Link, useNavigate } from "react-router-dom";
const AddItems = () => {
  const navigate = useNavigate();
  const { rowItemsCollection, backgroundImage, getItemsList } = useStore();
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);
  const [ loading, setLoding ] = useState(false);
  const addItem = async () => {
    setLoding(true);
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
      await getItemsList();
      alert("Item added successfuly !");
      setLoding(false);
      navigate("/yaman_project/manageItems");
    } catch (error) {
      console.log(error);
      alert(error);
      setLoding(false);
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
          className="w-96 text-xl border-2 justify-center items-center border-white hover:border-red-500 rounded-lg my-5 hover:bg-red-500 bg-opacity-50 hover:text-white min-h-[40px] "
        >
          {loading ? 
          <div className="flex justify-center my-3" role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-slate-100"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          : "Add"}
          
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
