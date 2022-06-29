import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { FavContextProvider } from "./store/fav-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FavContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavContextProvider>
  </React.StrictMode>
);

reportWebVitals();
