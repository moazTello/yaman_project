import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useStore } from "../context/useStore";
import "../style/style.css";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
// import SwainIcon from "../assets/swain_profile.jpg";
import moment from "moment";
const BoxOffice = () => {
  const navigate = useNavigate();
  const { backgroundImage, getBoxOffice, BoxOfficeList, BenefitsList } =
    useStore();
  const [moneyAmount, setMoneyAmount] = useState(0);
  const [loading, setLoding] = useState(false);
  const [benDate, setBenDate] = useState(
    BenefitsList.length > 0
      ? moment(BenefitsList[0]?.createdAt).format("MMMM")
      : ""
  );
  const addMoney = async () => {
    if (moneyAmount === 0) {
      return alert("Fill the Amount of Money Please!");
    }
    setLoding(true);
    try {
      const boxUpdated = doc(db, "Box", BoxOfficeList[0]?.id);
      await updateDoc(boxUpdated, {
        totalMoney: BoxOfficeList[0]?.totalMoney + moneyAmount,
        chargeDate: new Date(),
      });
      await getBoxOffice();
      alert("Box Charged successfuly !");
      setMoneyAmount(0);
      setLoding(false);
      navigate("/yaman_project/manageItems");
    } catch (error) {
      console.log(error);
      alert(error);
      setLoding(false);
    }
  };
  let total = 0;
  BenefitsList.map((ben) => (total += ben.benefitAmount));
  const handleBenDate = (e) => {
    e.preventDefault();
    const benMonth = BenefitsList.find(
      (ben) =>
        moment(ben?.createdAt).format("YYYY-MMMM") ===
        moment(e.target.value).format("YYYY-MMMM")
    );
    benMonth ? setBenDate(benMonth) : alert("No benefits found for that month");
  };
  useEffect(() => {
    setBenDate(BenefitsList[0]);
  }, [BenefitsList]);
  return (
    <div
      className={`${
        backgroundImage ? "addItemDarius" : "tableBackground"
      }  w-full flex justify-center items-start min-h-[120vh] max-h-[120vh]`}
    >
      {JSON.parse(localStorage?.getItem("auth")).email ===
        "telloyaman@gmail.com" && (
        <div className="items_shadow flex flex-col w-full min-h-[120vh] max-h-[120vh] p-5 md:p-10 overflow-y-scroll">
          <p className="w-full text-2xl text-white font-bold my-5 ">
            Box Office
          </p>
          <p className="mt-2 mb-1 text-zinc-50">Charge Box</p>
          <input
            type="number"
            className="w-72 md:w-96 bg-stone-800 bg-opacity-50 border-2 rounded-lg min-h-[40px] mb-5 border-slate-200 px-3"
            onChange={(e) => setMoneyAmount(Number(e.target.value))}
          />
          <button
            onClick={addMoney}
            className="w-72 md:w-96 text-xl border-2 justify-center items-center border-white hover:border-red-500 rounded-lg my-5 hover:bg-red-500 bg-opacity-50 hover:text-white min-h-[40px] "
          >
            {loading ? (
              <div className="flex justify-center my-3" role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-stone-200 animate-spin dark:text-stone-600 fill-slate-100"
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
              "Charge"
            )}
          </button>
          <Link
            to="/yaman_project/manageItems"
            className="w-72 md:w-96 flex justify-center items-center text-xl border-2 border-white hover:border-zinc-800 rounded-lg my-5 hover:bg-zinc-800 bg-opacity-50 hover:text-white min-h-[40px] "
          >
            Go Back
          </Link>

          <div className="w-full flex justify-center mt-10 ">
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Money Amount</div>
                <div className="stat-value">
                  {BoxOfficeList[0]?.totalMoney}{" "}
                  <span className="text-white ml-1 text-sm">IDQ</span>
                </div>
                <div className="stat-desc">CHAGRE IT ABOVE 👆🏻</div>
                <div className="stat-desc">
                  {moment(BoxOfficeList[0]?.chargedAt).format("YYYY-MM-DD")}
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                {BenefitsList.length > 0 && (
                  <div className="stat-title">
                    Benefit for {moment(benDate?.createdAt).format("YYYY-MMMM")}
                    <input
                      className="bg-none max-w-5 ml-10 bg-stone-900"
                      type="date"
                      onChange={(e) => handleBenDate(e)}
                    />
                  </div>
                )}
                <div className="stat-value">
                  {benDate?.benefitAmount}
                  <span className="text-white ml-1 text-sm">IDQ</span>
                </div>
                <div className="stat-desc">Total Benefits Yet {total} IQD</div>
              </div>

              {/* <div className="stat">
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
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    ></path>
                  </svg>
                </div>
              <div className="stat-figure avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={SwainIcon} alt="" />
                </div>
              </div>
              <div className="stat-title">Sellers</div>
              <div className="stat-value">1</div>
              <div className="stat-desc">telloyaman@gmail.com</div>
            </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxOffice;
// telloyaman@gmail.com
