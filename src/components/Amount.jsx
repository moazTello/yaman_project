import React, { useState } from "react";
import { useStore } from "../context/useStore";
import { FaPaintBrush } from "react-icons/fa";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
const Amount = () => {
  const {
    price,
    soldItems,
    setSoldItem,
    setPrice,
    toggleTableColor,
    tableColor,
    getItemsList,
    invoicesCollection,
    invoices,
    getInvoicesList,
    getBoxOffice,
    BoxOfficeList,
    BenefitCollection,
    BenefitsList,
    getBenefitsList,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const handleClear = () => {
    setSoldItem([]);
    setPrice(0);
  };
  const sellItems = async () => {
    if (soldItems.length === 0) {
      return toast.error("No Item to Sell !");
    }
    setLoading(true);
    // eslint-disable-next-line no-restricted-globals
    var result = confirm("Make sure from the items & amount");
    if (!result) return;
    try {
      soldItems.map(async (item) => {
        const itemUpdated = doc(db, "rowItems", item?.item?.id);
        item?.item?.itemAmount - item.localAmount === 0
          ? await updateDoc(itemUpdated, {
              itemAmount: item?.item?.itemAmount - item.localAmount,
              endedDate: new Date(),
            })
          : await updateDoc(itemUpdated, {
              itemAmount: item?.item?.itemAmount - item.localAmount,
            });
      });

      await addDoc(invoicesCollection, {
        invoiceSeller: JSON.parse(localStorage?.getItem("auth")).email,
        numberInvoice: invoices?.length + 1,
        invoicePrice: price,
        invoiceDate: new Date(),
        invoiceItems: soldItems,
      });
      const boxUpdated = doc(db, "Box", BoxOfficeList[0]?.id);
      await updateDoc(boxUpdated, {
        totalMoney: BoxOfficeList[0]?.totalMoney + price,
      });
      await getBoxOffice();
      await getItemsList();
      await getInvoicesList();
      let Benefit = 0;
      let telegramItems = [];
      soldItems?.map((soldItem) => {
        telegramItems += `${
          soldItem?.item?.itemAmount - soldItem.localAmount === 0
            ? "🚚"
            : "      "
        }   Name : ${soldItem.item.itemName} , Amount : ${
          soldItem.localAmount
        } , Benefit Price : ${soldItem.item.itemPrice} IQD , Row Price : ${
          soldItem.item.itemPriceBenefitless
        } IQD \n${
          soldItem?.item?.itemAmount - soldItem.localAmount === 0
            ? `          ❌${soldItem?.item?.itemName} is empty now \n`
            : ""
        } `;
        Benefit +=
          soldItem.localAmount *
          (soldItem.item.itemPrice - soldItem.item.itemPriceBenefitless);
        return telegramItems;
      });
      const benefitUpdated = BenefitsList[0]?.id
        ? doc(db, "Benefits", BenefitsList[0]?.id)
        : "";

      const Ben = BenefitsList[0]?.benefitAmount
        ? BenefitsList[0].benefitAmount + Benefit
        : Benefit;

      if (
        !(
          new Date().getMonth() + 1 ===
          parseInt(moment(BenefitsList[0]?.createdAt).format("MM"), 10)
        )
      ) {
        await addDoc(BenefitCollection, {
          numberBenefit: BenefitsList?.length ? BenefitsList.length + 1 : 1,
          benefitDate: new Date(),
          benefitAmount: Benefit,
        });
      } else {
        if (BenefitsList.length > 0) {
          updateDoc(benefitUpdated, {
            benefitAmount: Ben,
          });
        } else {
          await addDoc(BenefitCollection, {
            numberBenefit: BenefitsList?.length ? BenefitsList.length + 1 : 1,
            benefitDate: new Date(),
            benefitAmount: Benefit,
          });
        }
      }
      await getBenefitsList();
      await axios.post(process.env.REACT_APP_TELEGRAM_BOT, {
        chat_id: process.env.REACT_APP_TELEGRAM_MOAZ_CHAT_ID,
        text: `Seller : ${
          JSON.parse(localStorage?.getItem("auth")).email
        } \nInvoice Number : ${invoices?.length + 1} \nPrice : ${price.toFixed(
          3
        )} IQD \nSold Items : \n {\n ${telegramItems} }\nInvoice Benefit : ${Benefit} IQD`,
      });
      await axios.post(process.env.REACT_APP_TELEGRAM_BOT, {
        chat_id: process.env.REACT_APP_TELEGRAM_YAMAN_CHAT_ID,
        text: `Seller : ${
          JSON.parse(localStorage?.getItem("auth")).email
        } \nInvoice Number : ${invoices?.length + 1} \nPrice : ${price.toFixed(
          3
        )} IQD \nSold Items : \n {\n ${telegramItems} }\nInvoice Benefit : ${Benefit} IQD`,
      });

      toast.success(`Items Sold successfully`);
      setSoldItem([]);
      setPrice(0);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full min-h-20 flex flex-col items-center bg-stone-900 md:flex-row py-5">
      <p className="text-slate-100 text-lg ml-5 mt-3 md:mt-0 font-medium">
        Total : {price.toFixed(3)} IQD
      </p>
      {!loading && soldItems.length > 0 && (
        // <div className="flex md:ml-12 overflow-scroll max-w-[100%] mt-3 md:mt-0 md:max-w-[60%] border-2 rounded-md border-slate-100 py-5">
        //   {soldItems?.map((item, index) => (
        //     <p key={index} className="text-slate-100 mx-5 min-w-28">
        //       {item.itemName} : {item.itemPrice} $
        //     </p>
        //   ))}
        // </div>
        <div className="overflow-auto mx-auto rounded-lg w-[95%] mt-5 md:mt-0 md:w-[65%] max-h-52">
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
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {soldItems?.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    tableColor
                      ? "table_row w-full hover:bg-stone-900"
                      : "w-full hover:bg-slate-300 bg-slate-200 text-stone-900"
                  } `}
                >
                  <th>{index + 1}</th>
                  <td>{item.item.itemName} </td>
                  <td>{item.localAmount}</td>
                  <td>{item.item.itemPrice}$</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={handleClear}
        disabled={loading}
        className="w-20 min-h-10 bg-slate-100 text-stone-700 rounded-md md:ml-auto my-3 md:my-0 mr-3 hover:text-slate-100 hover:bg-amber-400 hover:border-2 hover:border-slate-100"
      >
        {loading ? (
          <div className="flex justify-center" role="status">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-stone-200 animate-spin dark:text-stone-600 fill-slate-100"
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
          "Reset"
        )}
      </button>
      <button
        onClick={sellItems}
        disabled={loading}
        className="w-20 min-h-10 bg-slate-100 text-stone-700 rounded-md mr-3 my-3 md:my-0 hover:text-slate-100 hover:bg-amber-400 hover:border-2 hover:border-slate-100"
      >
        {loading ? (
          <div className="flex justify-center" role="status">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-stone-200 animate-spin dark:text-stone-600 fill-slate-100"
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
          "Sell"
        )}
      </button>
    </div>
  );
};

export default Amount;
