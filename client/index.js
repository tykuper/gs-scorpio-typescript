import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

// import "./custom.scss";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>
  </Provider>,
  document.getElementById("app")
);
