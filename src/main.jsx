// man order: framework library imports, external libraraies, own jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "@smastrom/react-rating/style.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
      <ToastContainer />
    </NextUIProvider>
  </React.StrictMode>
);
