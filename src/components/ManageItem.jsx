import React, { useMemo, useState } from "react";
import { useStore } from "../context/useStore";
import { FaTrashCan } from "react-icons/fa6";
import { IoFastFoodOutline, IoCloseSharp } from "react-icons/io5";
import { FaTruck, FaPaintBrush } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router-dom";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import "../style/style.css";
const ManageItem = () => {
  const [loading, setLoading] = useState(false);
  const {
    getItemsList,
    boxesView,
    toggleBoxesView,
    backgroundImage,
    toggleTableColor,
    tableColor,
  } = useStore();
  const [updateBox, setUpdateBox] = useState(null);
  const [updateItemAmount, setUpdateItemAmount] = useState(0);
  const [updateItemPrice, setUpdateItemPrice] = useState(0);
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
      await getItemsList();
      alert("Item deleted successfuly!");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleUpdate = async (item) => {
    setLoading(true);
    // eslint-disable-next-line no-restricted-globals
    var result = confirm("Make sure from the price & amount");
    if (!result) return;
    try {
      const itemUpdated = doc(db, "rowItems", item.id);
      if (updateItemAmount === 0 && updateItemPrice !== 0) {
        // eslint-disable-next-line no-restricted-globals
        var resultPrice = confirm(
          "You are about change just the price, Does it real ?"
        );
        if (!resultPrice) return;
        await updateDoc(itemUpdated, {
          itemPrice: updateItemPrice,
        });
        setUpdateItemAmount(0);
        setUpdateItemPrice(0);
        await getItemsList();
        alert(`${item.itemName} Price Updated successfully`);
        setUpdateBox(null);
      } else if (updateItemPrice === 0 && updateItemAmount !== 0) {
        if (
          updateItemAmount < 0 &&
          JSON.parse(localStorage?.getItem("auth")).email !==
            "telloyaman@gmail.com"
        ) {
          setLoading(false);
          return alert("Not allowed nigative amount");
        }
        // eslint-disable-next-line no-restricted-globals
        var resultAmount = confirm(
          "You are about leave the old Price, Does it suitable ?"
        );
        if (!resultAmount) return;
        updateItemAmount > 0
          ? await updateDoc(itemUpdated, {
              itemAmount: updateItemAmount + item.itemAmount,
              chargeDate: new Date(),
            })
          : updateItemAmount < 0 &&
            (await updateDoc(itemUpdated, {
              itemAmount: updateItemAmount + item.itemAmount,
            }));
        setUpdateItemAmount(0);
        setUpdateItemPrice(0);
        await getItemsList();
        alert(`${item.itemName} Charged successfully`);
        setUpdateBox(null);
      } else if (updateItemPrice === 0 && updateItemAmount === 0) {
        setLoading(false);
        return alert("Please insert price or amount to complete the procces.");
      } else if (updateItemAmount > 0 && updateItemPrice > 0) {
        await updateDoc(itemUpdated, {
          itemAmount: updateItemAmount + item.itemAmount,
          itemPrice: updateItemPrice,
          chargeDate: new Date(),
        });
        setUpdateItemAmount(0);
        setUpdateItemPrice(0);
        await getItemsList();
        alert(`${item.itemName} Charged successfully`);
        setUpdateBox(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const inputs = useMemo(() => {
    return (
      <>
        <input
          type="number"
          className="w-96 bg-gray-800 bg-opacity-50 border-2 rounded-lg min-h-[40px] mt-10 mb-5 border-slate-200 px-3"
          placeholder="Item Amount"
          onChange={(e) => setUpdateItemAmount(Number(e.target.value))}
          value={updateItemAmount}
        />
        <input
          type="number"
          className="w-96 bg-gray-800 bg-opacity-50 border-2 rounded-lg min-h-[40px] my-5 border-slate-200 px-3"
          placeholder="Item Price"
          onChange={(e) => setUpdateItemPrice(Number(e.target.value))}
          value={updateItemPrice}
        />
      </>
    );
  }, [
    setUpdateItemPrice,
    setUpdateItemAmount,
    updateItemPrice,
    updateItemAmount,
  ]);
  return (
    <div
      className={`${
        backgroundImage ? "addItem" : "tableBackground"
      }  w-full flex justify-center items-start min-h-[100vh] max-h-[100vh] relative`}
    >
      <div className="items_shadow w-full min-h-[100vh] max-h-[100vh] p-10 overflow-y-scroll">
        <div className="w-full flex items-center justify-end mb-3">
          <button
            onClick={toggleBoxesView}
            className="min-w-20 min-h-20 m-2 flex justify-center items-center"
          >
            <p className="w-16 h-16 text-slate-50 hover:text-violet-400 hover:bg-slate-900 hover:border-violet-400 border-2 border-slate-50 rounded-lg bg-base-200 flex justify-center items-center text-2xl">
              <span className="text-sm mr-1">
                {boxesView ? "Boxes" : "Table"}
              </span>
            </p>
          </button>
          <Link
            to="/yaman_project/addItem"
            className="min-w-20 min-h-20 m-2 flex justify-center items-center"
          >
            <p className="w-16 h-16 text-slate-50 hover:text-violet-400 hover:bg-slate-900 hover:border-violet-400 border-2 border-slate-50 rounded-lg bg-base-200 flex justify-center items-center text-2xl">
              <span className="text-sm mr-1"> + </span> <IoFastFoodOutline />
            </p>
          </Link>
        </div>
        {boxesView && (
          <div className="overflow-x-auto rounded-lg h-fit">
            <table className="table">
              <thead>
                <tr
                  className={`${
                    tableColor
                      ? "bg-base-200 text-white"
                      : "text-base-200 bg-slate-100"
                  } `}
                >
                  <th>
                    <button onClick={toggleTableColor}>
                      <FaPaintBrush size={16} />
                    </button>
                  </th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Created At</th>
                  <th>Ended At</th>
                  <th>Charged At</th>
                  <th>Available</th>
                  <th>Price</th>
                  <th>Delete</th>
                  <th>Charge</th>
                </tr>
              </thead>
              <tbody>
                {!items.length && (
                  <tr
                    className={`${
                      tableColor
                        ? "table_row w-full hover:bg-base-200"
                        : "w-full hover:bg-base-200 bg-slate-200 text-base-200"
                    } `}
                  >
                    <td colSpan="10">
                      <div
                        className="flex justify-center my-3 w-full"
                        role="status"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-violet-400"
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
                    </td>
                  </tr>
                )}
                {items?.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      tableColor
                        ? "table_row w-full hover:bg-base-200"
                        : "w-full hover:bg-slate-300 bg-slate-200 text-base-200"
                    } `}
                  >
                    <th>{index + 1}</th>
                    <td>{item.itemName} </td>
                    <td>{item.itemAmount}</td>
                    <td>
                      {" "}
                      {item.createdAt
                        ? moment(item.createdAt).format("YYYY-MM-DD")
                        : "-"}
                    </td>
                    <td>
                      {" "}
                      {item.endedAt
                        ? moment(item.endedAt).format("YYYY-MM-DD")
                        : "-"}
                    </td>

                    <td>
                      {" "}
                      {item.chargedAt
                        ? moment(item.chargedAt).format("YYYY-MM-DD")
                        : "-"}
                    </td>

                    <td>
                      {item.itemAmount > 0 ? (
                        <FaCircleCheck
                          size={22}
                          className="text-green-500 ml-4"
                        />
                      ) : (
                        <IoIosCloseCircle
                          size={28}
                          className="text-red-500 ml-3"
                        />
                      )}
                    </td>
                    <td>{item.itemPrice}$</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item)}
                        className="w-8 h-8 flex justify-center rounded-md items-center text-white hover:bg-slate-50 bg-red-500 hover:border-2 hover:border-violet-400 hover:text-violet-400"
                      >
                        <FaTrashCan />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => setUpdateBox(item.id)}
                        className="w-8 h-8 flex justify-center rounded-md items-center text-white hover:bg-slate-50 bg-green-500 hover:border-2 hover:border-violet-400 hover:text-violet-400"
                      >
                        <FaTruck />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!boxesView && !items.length && (
          <div className="flex justify-center my-3 w-full" role="status">
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-violet-400"
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
        )}

        {items?.map((item) => (
          <div
            key={item.id}
            className={`${
              !boxesView &&
              "min-w-80 text-white hover:font-bold hover:bg-slate-50 hover:text-violet-400 float-left m-5 p-10 min-h-32 flex flex-col justify-center items-center border-2 border-violet-400 rounded-md"
            }`}
          >
            {!boxesView && (
              <>
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
                    {item.endedAt
                      ? moment(item.endedAt).format("YYYY-MM-DD")
                      : "-"}
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
                  <p>
                    {item.itemAmount > 0 ? (
                      <FaCircleCheck size={22} className="text-green-500" />
                    ) : (
                      <IoIosCloseCircle size={27} className="text-red-500" />
                    )}
                  </p>
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
              </>
            )}
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
                {inputs}
                {/* <input
                  type="number"
                  className="w-96 bg-gray-800 bg-opacity-50 border-2 rounded-lg min-h-[40px] mt-10 mb-5 border-slate-200 px-3"
                  placeholder="Item Amount"
                  onChange={(e) => setUpdateItemAmount(Number(e.target.value))}
                />
                <input
                  type="number"
                  className="w-96 bg-gray-800 bg-opacity-50 border-2 rounded-lg min-h-[40px] my-5 border-slate-200 px-3"
                  placeholder="Item Price"
                  onChange={(e) => setUpdateItemPrice(Number(e.target.value))}
                /> */}
                <button
                  onClick={() => handleUpdate(item)}
                  className="w-96 text-xl border-2 border-white hover:border-red-500 rounded-lg my-5 hover:bg-red-500 bg-opacity-50 hover:text-white min-h-[40px] "
                >
                  {loading ? (
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
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageItem;
