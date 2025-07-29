// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Router from "./routes"; // ✅ Automatically resolves index.js(x)
import ContextProvider from "./context"; // ✅ Global context provider
import "./index.css"; // ✅ Global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <Router />
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);
