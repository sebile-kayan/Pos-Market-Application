import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux"; //redux toolkiti import ettik.
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //tüm projeyi provider yani redux ile sarmaladık.
  <Provider store={store}>
    <App />
  </Provider>
);
