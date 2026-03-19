import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Checkout from "./Checkout.jsx";
// import App from "./products.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// <StrictMode>
// <BrowserRouter> <App />
//   {/* {/* <Routes> */}
//     {/* <Route element={<Layout />}> */}
//     {/* <Route path="/App" element={<App />} />
//     <Route path="/Checkout" element={<Checkout />} /> */}
//     {/* </Route> */}
//   {/* </Routes> */} */}
// </BrowserRouter>
{
  /* </StrictMode>, */
}
