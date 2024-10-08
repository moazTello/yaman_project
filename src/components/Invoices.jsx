import React, { useEffect, useState } from "react";
import { useStore } from "../context/useStore";
import { FaPaintBrush } from "react-icons/fa";
import moment from "moment";
import "../style/style.css";
import { useNavigate } from "react-router-dom";
import SwainIcon from "../assets/swain_profile.jpg";
import * as XLSX from "xlsx";
const Invoices = () => {
  const navigate = useNavigate();
  const {
    boxesView,
    toggleBoxesView,
    backgroundImage,
    toggleTableColor,
    tableColor,
    items,
  } = useStore();
  const { invoices } = useStore();
  const [totalPriceEver, setTotalPriceEver] = useState(0);
  const [totalbudget, setTotalBudget] = useState(0);

  useEffect(() => {
    JSON.parse(localStorage?.getItem("auth")).email !==
      "telloyaman@gmail.com" && navigate("/yaman_project/items");
    let totalInvoice = 0;
    invoices.map((invoice) => {
      return (totalInvoice += invoice.invoicePrice);
    });
    setTotalPriceEver(totalInvoice);
    let budget = 0;
    items.map((item) => {
      return (budget += item.itemPrice * item.itemAmount);
    });
    setTotalBudget(budget);
    // eslint-disable-next-line
  }, []);

  const exportExcel = () => {
    const data = [
      [
        "ID",
        "Seller",
        "Invoice Number",
        "Sold At",
        "Sold Time",
        "Items Amount",
        "Price",
      ],
    ];
    if (invoices) {
      invoices.forEach((invoice, index) => {
        data.push([
          `${index + 1}`,
          `${invoice.invoiceSeller}`,
          `${invoice.numberInvoice}`,
          `${
            invoice.createdAt
              ? moment(invoice.createdAt).format("YYYY-MM-DD")
              : "-"
          }`,
          `${
            invoice.createdAt
              ? moment(invoice.createdAt).format("HH:mm:ss")
              : "-"
          }`,
          `${invoice.invoiceItems ? invoice.invoiceItems.length : 0}`,
          `${
            invoice.invoicePrice
              ? `${invoice.invoicePrice.toFixed(2)} IQD`
              : "-"
          }`,
        ]);
      });
      data.push([
        "",
        "",
        "",
        "",
        "",
        "total : ",
        `${totalPriceEver.toFixed(2)} IQD`,
      ]);
    }
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };

  return (
    <div
      className={`${
        backgroundImage ? "addItem" : "tableBackground"
      }  w-full flex justify-center items-start min-h-[100vh] max-h-[100vh] relative`}
    >
      {JSON.parse(localStorage?.getItem("auth")).email ===
        "telloyaman@gmail.com" && (
        <div className="items_shadow w-full min-h-[100vh] max-h-[100vh] p-2 md:p-10 overflow-y-scroll">
          <div className="w-full flex items-center justify-end mb-3">
            <button
              onClick={toggleBoxesView}
              className="min-w-20 min-h-20 m-2 flex justify-center items-center"
            >
              <p className="w-16 h-16 text-slate-50 hover:text-violet-400 hover:bg-slate-900 hover:border-violet-400 border-2 border-slate-50 rounded-lg bg-stone-900 flex justify-center items-center text-2xl">
                <span className="text-sm mr-1">
                  {boxesView ? "Boxes" : "Table"}
                </span>
              </p>
            </button>
            <button
              onClick={exportExcel}
              className="min-w-20 min-h-20 m-2 flex justify-center items-center"
            >
              <p className="w-16 h-16 text-slate-50 hover:text-violet-400 hover:bg-slate-900 hover:border-violet-400 border-2 border-slate-50 rounded-lg bg-stone-900 flex justify-center items-center text-2xl">
                <span className="text-sm mr-1">Excel</span>
              </p>
            </button>
          </div>
          {boxesView && (
            <div className="overflow-x-auto rounded-lg h-fit">
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
                    <th>Seller</th>
                    <th>Invoice Number</th>
                    <th>Sold At</th>
                    <th>Sold Time</th>
                    <th>Items Amount</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices?.map((invoice, index) => (
                    <tr
                      key={index}
                      className={`${
                        tableColor
                          ? "table_row w-full hover:bg-stone-900"
                          : "w-full hover:bg-slate-300 bg-slate-200 text-stone-900"
                      } `}
                    >
                      <th>{index + 1}</th>
                      <td>{invoice.invoiceSeller}</td>
                      <td>{invoice.numberInvoice} </td>
                      <td>
                        {" "}
                        {invoice.createdAt
                          ? moment(invoice.createdAt).format("YYYY-MM-DD")
                          : "-"}
                      </td>
                      <td>
                        {" "}
                        {invoice.createdAt
                          ? moment(invoice.createdAt).format("HH:MM:ss")
                          : "-"}
                      </td>
                      <td>{invoice.invoiceItems?.length}</td>
                      <td>{invoice?.invoicePrice?.toFixed(2)} IQD </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {invoices?.map((invoice) => (
            <div
              key={invoice.id}
              className={`${
                !boxesView &&
                "min-w-80 text-white hover:font-bold hover:bg-slate-50 hover:text-violet-400 float-left m-5 p-10 min-h-32 flex flex-col justify-center items-center border-2 border-violet-400 rounded-md"
              }`}
            >
              {!boxesView && (
                <>
                  <p className="mb-5 text-2xl"> {invoice.numberInvoice} </p>
                  <div className="w-full flex items-center justify-between">
                    <p>Amount : </p>
                    <p>{invoice.invoiceItems?.length}</p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <p>Sold At : </p>
                    <p>
                      {invoice.createdAt
                        ? moment(invoice.createdAt).format("YYYY-MM-DD")
                        : "-"}
                    </p>
                  </div>

                  <div className="w-full flex items-center justify-between">
                    <p>Price : </p>
                    <p>{invoice?.invoicePrice?.toFixed(2)} IQD</p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <p>Seller : </p>
                    <p>{invoice.invoiceSeller}</p>
                  </div>
                </>
              )}
            </div>
          ))}
          <div className="w-full flex justify-center mt-10">
            <div className="stats shadow flex flex-col md:flex-row bg-stone-900 text-white">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Items</div>
                <div className="stat-value">{items.length}</div>
                <div className="stat-desc">
                  Your Budget {totalbudget.toFixed(2)} IQD
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Invoices</div>
                <div className="stat-value">{invoices.length}</div>
                <div className="stat-desc">
                  Total {totalPriceEver.toFixed(2)} IQD
                </div>
              </div>

              <div className="stat">
                {/* <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    ></path>
                  </svg>
                </div> */}
                <div className="stat-figure avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={SwainIcon} alt="" />
                  </div>
                </div>
                <div className="stat-title">Sellers</div>
                <div className="stat-value">1</div>
                <div className="stat-desc">telloyaman@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
