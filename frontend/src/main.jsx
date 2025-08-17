// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Router from "./routes/index";
import ContextProvider from "./context";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <Router />
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);
