import { createContext, useContext, useEffect, useState } from "react";
// import items_api from "../api/items_api";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const UseStoreProvider = ({ children }) => {
  const [price, setPrice] = useState(0);
  const [purchaseList, setPurchaseList] = useState([]);
  const [items, setItems] = useState([
    // {
    //   name: "Snickers",
    //   price: 6,
    // },
    // {
    //   name: "Milk Man",
    //   price: 15,
    // },
    // {
    //   name: "Milka",
    //   price: 3,
    // },
    // {
    //   name: "Gover",
    //   price: 2.5,
    // },
    // {
    //   name: "Donesta",
    //   price: 4.5,
    // },
    // {
    //   name: "Cola",
    //   price: 2,
    // },
    // {
    //   name: "Master",
    //   price: 1.5,
    // },
    // {
    //   name: "Gomme",
    //   price: 0.5,
    // },
  ]);
  const [logedin, setLogedin] = useState(JSON.parse(localStorage.getItem("logedin")) || false);
  // useEffect(() => {
  //   const fetchItems = async() => {
  //     try{
  //       const response = await items_api.get("/rowItems");
  //       setItems(response.data);
  //       console.log(response);
  //     }catch(error){
  //       console.log(error);
  //     }
  //   }
  //   fetchItems();
  // }, [setItems]);
  const [soldItems, setSoldItem] = useState([]);
  const rowItemsCollection = collection(db, "rowItems");
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const response = await getDocs(rowItemsCollection);
        const data = response?.docs?.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (data) {
          const dataDTO = data?.map((info) => {
            info.createdAt = info?.createdDate
              ? (info?.createdDate?.seconds +
                  info?.createdDate?.nanoseconds * 10 ** -9) *
                1000
              : null;
            info.endededAt = info?.enddDate
              ? (info?.enddDate?.seconds +
                  info?.endDate?.nanoseconds * 10 ** -9) *
                1000
              : null;
            info.chargedAt = info?.chargeDate
              ? (info?.chargeDate?.seconds +
                  info?.chargeDate?.nanoseconds * 10 ** -9) *
                1000
              : null;
            return info;
          });
          setItems(dataDTO);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    logedin && getItemsList();
    // eslint-disable-next-line
  }, [logedin]);
  return (
    <StoreContext.Provider
      value={{
        price,
        setPrice,
        purchaseList,
        setPurchaseList,
        items,
        setItems,
        soldItems,
        setSoldItem,
        logedin,
        setLogedin,
        rowItemsCollection,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
