import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import * as searchActions from "./redux/search";
import * as businessActions from "./redux/businesses";
import * as imageActions from "./redux/images";
import * as userActions from "./redux/users"
import * as mapsActions from './redux/maps';
import "./index.css";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
  window.searchActions = searchActions;
  window.businessActions = businessActions;
  window.imageActions = imageActions;
  window.userActions = userActions;
  window.mapsActions = mapsActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
