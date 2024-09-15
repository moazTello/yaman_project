import React from "react";
import { useStore } from "../context/useStore";
import Amount from "./Amount";
import "../style/style.css";
import { FaPaintBrush } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
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
    tableColor,
    toggleTableColor,
  } = useStore();
  const clickHandler = (item) => {
    if (item.itemAmount === 0) {
      return toast.error(`No more ${item.itemName}`);
    }
    const existingItem = soldItems.find((soldItem) => soldItem.item === item);
    if (existingItem) {
      if (existingItem?.item?.itemAmount === existingItem?.localAmount) {
        return toast.error(`No more ${item.itemName}`);
      }
      const updatedList = soldItems.map((soldItem) =>
        soldItem.item === item
          ? { ...soldItem, localAmount: soldItem.localAmount + 1 }
          : soldItem
      );
      setSoldItem(updatedList);
    } else {
      const newList = [...soldItems, { item: item, localAmount: 1 }];
      setSoldItem(newList);
    }

    const newPrice = price + item.itemPrice;
    setPrice(newPrice);
  };

  return (
    <>
      <div
        className={`${
          backgroundImage ? "items" : "tableBackground"
        }  w-full flex justify-center items-start md:min-h-[80vh]`}
      >
        <div className="items_shadow w-full md:min-h-[80vh] p-2 md:p-10">
          <div className="w-full flex items-center justify-end mb-3">
            <button
              onClick={toggleBoxesView}
              className="min-w-20 min-h-20 m-2 flex justify-center items-center"
            >
              <p className="w-16 h-16 text-slate-50 hover:text-amber-400 text-sm bg-stone-900 hover:border-amber-400 border-2 border-slate-50 rounded-lg flex justify-center items-center">
                {boxesView ? "Boxes" : "Table"}
              </p>
            </button>
          </div>
          {boxesView && (
            <div className="overflow-x-auto max-h-[50vh] md:max-h-[50vh] rounded-lg">
              <table className="table">
                <thead>
                  <tr
                    className={`${
                      tableColor
                        ? "bg-stone-900 text-white"
                        : "text-stone-900 bg-slate-100"
                    } `}
                  >
                    <th>
                      <button onClick={toggleTableColor}>
                        <FaPaintBrush size={16} />
                      </button>
                    </th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th className="hidden md:block">Available</th>
                    <th>Price</th>
                    <th>Purchase</th>
                  </tr>
                </thead>
                <tbody>
                  {!items.length && (
                    <tr
                      className={`${
                        tableColor
                          ? "table_row w-full hover:bg-stone-900"
                          : "w-full hover:bg-stone-900 bg-slate-200 text-stone-900"
                      } `}
                    >
                      <td colSpan="10">
                        <div
                          className="flex justify-center my-3 w-full"
                          role="status"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-stone-200 animate-spin dark:text-stone-600 fill-amber-400"
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
                          ? "table_row text-stone-200 w-full hover:bg-stone-900"
                          : "w-full hover:bg-slate-300 bg-slate-200 text-stone-900"
                      } `}
                    >
                      <th>{index + 1}</th>
                      <td>{item.itemName} </td>
                      <td>{item.itemAmount}</td>
                      <td className="hidden md:block">
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
                      <td>{item.itemPrice} IQD </td>
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
                className="w-16 h-16 text-stone-200 animate-spin dark:text-stone-600 fill-amber-400"
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
                className="min-w-20 md:min-w-44 px-2 md:px-0 float-left m-2 md:m-5 hover:bg-stone-800 hover:text-amber-400 md:hover:text-lg md:hover:font-bold text-white min-h-32 flex flex-col justify-center items-center border-2 border-amber-400 rounded-md"
              >
                <p>{item.itemName}</p>
                <p>{item.itemAmount}</p>
                <p>{item.itemPrice} IQD </p>
              </button>
            ))}
        </div>
      </div>
      <Amount />
    </>
  );
};

export default Items;
