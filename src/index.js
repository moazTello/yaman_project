import { createRoot } from "react-dom/client";
import { UseStoreProvider } from "./context/useStore.jsx";
import React from "react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UseStoreProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </UseStoreProvider>
  </React.StrictMode>
);
