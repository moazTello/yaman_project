import React from "react";
import { useStore } from "../context/useStore";
import Amount from "./Amount";
import "../style/style.css";

const Items = () => {
  const { items, soldItems, setSoldItem, setPrice, price } = useStore();
  const clickHandler = (item) => {
    const newList = [...soldItems, item];
    setSoldItem(newList);
    const newprice = price + item.price;
    setPrice(newprice);
  };

  return (
    <>
      <div className="items w-full mb-20 flex justify-center items-start min-h-[654px] max-h-[654px]">
        <div className="items_shadow w-full min-h-[654px] p-10">
          {items?.map((item, index) => (
            <button
              key={index}
              onClick={() => clickHandler(item)}
              className="min-w-44 float-left m-5 hover:bg-slate-100 hover:text-amber-400 hover:text-lg hover:font-bold text-white min-h-32 flex flex-col justify-center items-center border-2 border-amber-400 rounded-md"
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
