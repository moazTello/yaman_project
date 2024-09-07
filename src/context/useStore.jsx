import { createContext, useContext, useEffect, useState } from "react";
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
  const [backgroundImage, setBackgroundImage] = useState(
    JSON.parse(localStorage.getItem("background_image")) || false
  );
  const [boxesView, setBoxesView] = useState(
    JSON.parse(localStorage.getItem("boxesView")) || false
  );
  const [navbarVisible, setNavbarVisible] = useState(
    JSON.parse(localStorage.getItem("navbarVisible")) || true
  );

  const toggleBoxesView = () => {
    setBoxesView((old) => !old);
    localStorage.setItem(
      "boxesView",
      !JSON.parse(localStorage.getItem("boxesView"))
    );
  };
  const toggleBackgroundImage = () => {
    setBackgroundImage((old) => !old);
    localStorage.setItem(
      "background_image",
      !JSON.parse(localStorage.getItem("background_image"))
    );
  };
  const toggleNavbar = () => {
    setNavbarVisible((old) => !old);
    localStorage.setItem(
      "navbarVisible",
      !JSON.parse(localStorage.getItem("navbarVisible"))
    );
  };
  const [logedin, setLogedin] = useState(
    JSON.parse(localStorage.getItem("logedin")) || false
  );
  const [soldItems, setSoldItem] = useState([]);
  const rowItemsCollection = collection(db, "rowItems");
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
  useEffect(() => {
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
        getItemsList,
        toggleBoxesView,
        boxesView,
        backgroundImage,
        toggleBackgroundImage,
        navbarVisible,
        toggleNavbar,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
