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
