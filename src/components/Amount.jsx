import React from "react";
import { useStore } from "../context/useStore";
const Amount = () => {
  const { price, soldItems, setSoldItem, setPrice } = useStore();
  const handleClear = () => {
    setSoldItem([]);
    setPrice(0);
  };
  return (
    <div className="w-full min-h-20 flex flex-col items-center bg-zinc-800 md:flex-row fixed bottom-0 py-5">
      <p className="text-slate-100 text-lg ml-5 mt-3 md:mt-0 font-medium">
        Total : {price} $
      </p>
      {soldItems.length > 0 && (
        <div className="flex md:ml-12 overflow-scroll max-w-[100%] mt-3 md:mt-0 md:max-w-[60%] border-2 rounded-md border-slate-100 py-5">
          {soldItems?.map((item, index) => (
            <p key={index} className="text-slate-100 mx-5 min-w-28">
              {item.itemName} : {item.itemPrice} $
            </p>
          ))}
        </div>
      )}
      <button
        onClick={handleClear}
        className="w-20 min-h-10 bg-slate-100 text-amber-400 rounded-md md:ml-auto my-3 md:my-0 mr-3 hover:text-slate-100 hover:bg-amber-400 hover:border-2 hover:border-slate-100"
      >
        Reset
      </button>
      <button className="w-20 min-h-10 bg-slate-100 text-amber-400 rounded-md mr-3 my-3 md:my-0 hover:text-slate-100 hover:bg-amber-400 hover:border-2 hover:border-slate-100">
        Print
      </button>
    </div>
  );
};

export default Amount;
