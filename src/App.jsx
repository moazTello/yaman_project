import "./App.css";
import Items from "./components/Items";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ManageItem from "./components/ManageItem";
import Login from "./components/Login";
import AddItems from "./components/AddItems";
import Invoices from "./components/Invoices";
import BoxOffice from "./components/BoxOffice";

function App() {
  return (
    <Routes>
      <Route path="/yaman_project" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/yaman_project/items" element={<Items />} />
        <Route path="/yaman_project/manageItems">
          <Route index element={<ManageItem />} />
        </Route>
        <Route path="/yaman_project/addItem" element={<AddItems />} />
        <Route path="/yaman_project/invoices" element={<Invoices />} />
        <Route path="/yaman_project/boxoffice" element={<BoxOffice />} />
      </Route>
    </Routes>
  );
}

export default App;

// npm install firebase
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBk4GTJK9MuiMD4ScuIi8AUyu8LxOzX7nU",
//   authDomain: "yaman-cashier.firebaseapp.com",
//   projectId: "yaman-cashier",
//   storageBucket: "yaman-cashier.appspot.com",
//   messagingSenderId: "694679645054",
//   appId: "1:694679645054:web:b33a4a6a2f87dd86e5212f",
//   measurementId: "G-85ZRELRX4D"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
