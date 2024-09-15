import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { query, getDocs, collection, orderBy } from "firebase/firestore";
import toast from "react-hot-toast";
export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const UseStoreProvider = ({ children }) => {
  const [price, setPrice] = useState(0);
  const [purchaseList, setPurchaseList] = useState([]);
  const [items, setItems] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [BoxOfficeList, setBoxOfficeList] = useState([]);
  const [BenefitsList, setBenefitsList] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(
    JSON.parse(localStorage.getItem("background_image")) || false
  );
  const [boxesView, setBoxesView] = useState(
    JSON.parse(localStorage.getItem("boxesView")) || false
  );
  const [navbarVisible, setNavbarVisible] = useState(
    JSON.parse(localStorage.getItem("navbarVisible")) || true
  );
  const [tableColor, setTableColor] = useState(
    JSON.parse(localStorage.getItem("tableColor")) || false
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
  const toggleTableColor = () => {
    setTableColor((old) => !old);
    localStorage.setItem(
      "tableColor",
      !JSON.parse(localStorage.getItem("tableColor"))
    );
  };
  const [logedin, setLogedin] = useState(
    JSON.parse(localStorage.getItem("logedin")) || false
  );
  const [soldItems, setSoldItem] = useState([]);
  const rowItemsCollection = collection(db, "rowItems");
  const BoxCollection = collection(db, "Box");
  const BenefitCollection = collection(db, "Benefits");
  const BenefitCollection_get = query(
    collection(db, "Benefits"),
    orderBy("numberBenefit", "desc")
  );
  const invoicesCollection = collection(db, "invoices");
  const invoicesCollection_get = query(
    collection(db, "invoices"),
    orderBy("numberInvoice", "desc")
  );

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
          info.endedAt = info?.endedDate
            ? (info?.endedDate?.seconds +
                info?.endedDate?.nanoseconds * 10 ** -9) *
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
      toast.error(error.message);
    }
  };
  const getBoxOffice = async () => {
    try {
      const response = await getDocs(BoxCollection);
      const data = response?.docs?.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (data) {
        const dataDTO = data?.map((info) => {
          info.chargedAt = info?.chargeDate
            ? (info?.chargeDate?.seconds +
                info?.chargeDate?.nanoseconds * 10 ** -9) *
              1000
            : null;
          return info;
        });
        setBoxOfficeList(dataDTO);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getInvoicesList = async () => {
    try {
      const response = await getDocs(
        invoicesCollection_get,
        orderBy("numberInvoice")
      );
      const data = response?.docs?.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (data) {
        const dataDTO = data?.map((info) => {
          info.createdAt = info?.invoiceDate
            ? (info?.invoiceDate?.seconds +
                info?.invoiceDate?.nanoseconds * 10 ** -9) *
              1000
            : null;
          return info;
        });
        setInvoices(dataDTO);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getBenefitsList = async () => {
    try {
      const response = await getDocs(
        BenefitCollection_get,
        orderBy("numberBenefit")
      );
      const data = response?.docs?.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (data) {
        const dataDTO = data?.map((info) => {
          info.createdAt = info?.benefitDate
            ? (info?.benefitDate?.seconds +
                info?.benefitDate?.nanoseconds * 10 ** -9) *
              1000
            : null;
          return info;
        });
        setBenefitsList(dataDTO);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    logedin && getItemsList();
    logedin && getInvoicesList();
    logedin && getBoxOffice();
    logedin && getBenefitsList();
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
        toggleTableColor,
        tableColor,
        invoicesCollection,
        invoices,
        getInvoicesList,
        BoxCollection,
        getBoxOffice,
        BoxOfficeList,
        BenefitCollection,
        BenefitsList,
        getBenefitsList,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
