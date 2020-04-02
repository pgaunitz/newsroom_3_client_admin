import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";
import "semantic-ui-css/semantic.min.css";

// axios.defaults.baseURL = "https://newsroom3api.herokuapp.com/api/v1";
axios.defaults.baseURL = "http://localhost:3000/api/v1";

const store = configureStore();
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

if (window.Cypress) {
  window.store = store
}