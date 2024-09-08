import React from "react";
import { useStore } from "../context/useStore";
import Amount from "./Amount";
import "../style/style.css";

const Items = () => {
  const {
    items,
    soldItems,
    setSoldItem,
    setPrice,
    price,
    toggleBoxesView,
    boxesView,
    backgroundImage,
  } = useStore();
  const clickHandler = (item) => {
    const newList = [...soldItems, item];
    setSoldItem(newList);
    const newprice = price + item.itemPrice;
    setPrice(newprice);
  };

  return (
    <>
      <div
        className={`${
          backgroundImage ? "items" : "tableBackground"
        }  w-full mb-20 flex justify-center items-start min-h-[100vh]`}
      >
        <div className="items_shadow w-full min-h-[100vh] p-10">
          <div className="w-full flex items-center justify-end mb-3">
            <button
              onClick={toggleBoxesView}
              className="min-w-20 min-h-20 m-2 flex justify-center items-center"
            >
              <p className="w-16 h-16 text-slate-50 hover:text-amber-400 hover:bg-slate-900 hover:border-amber-400 border-2 border-slate-50 rounded-lg bg-base-200 flex justify-center items-center text-2xl">
                <span className="text-sm mr-1">
                  {boxesView ? "Boxes" : "Table"}
                </span>
              </p>
            </button>
          </div>
          {boxesView && (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-base-200 text-white">
                    <th></th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Available</th>
                    <th>Price</th>
                    <th>Purchase</th>
                  </tr>
                </thead>
                <tbody>
                  {!items.length && (
                    <tr className="table_row w-full hover:bg-base-200">
                      <td colSpan="10">
                        <div
                          className="flex justify-center my-3 w-full"
                          role="status"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-amber-400"
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
                    <tr className="table_row hover:bg-base-200">
                      <th>{index + 1}</th>
                      <td>{item.itemName} </td>
                      <td>{item.itemAmount}</td>
                      <td>{item.itemAvailable ? "T" : "F"}</td>
                      <td>{item.itemPrice}$</td>
                      <td>
                        <button
                          onClick={() => clickHandler(item)}
                          className="w-8 h-8 flex justify-center rounded-md items-center text-white hover:bg-slate-900 bg-red-500 hover:border-2 hover:border-amber-400 hover:text-amber-400"
                        >
                          +
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
                className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-amber-400"
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
          {!boxesView &&
            items?.map((item, index) => (
              <button
                key={index}
                onClick={() => clickHandler(item)}
                className="min-w-44 float-left m-5 hover:bg-gray-800 hover:text-amber-400 hover:text-lg hover:font-bold text-white min-h-32 flex flex-col justify-center items-center border-2 border-amber-400 rounded-md"
              >
                <p>{item.itemName}</p>
                <p>{item.itemAmount}</p>
                <p>{item.itemPrice}$</p>
              </button>
            ))}
        </div>
      </div>
      <Amount />
    </>
  );
};

export default Items;
