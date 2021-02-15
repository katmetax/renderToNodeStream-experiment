import React from "react";
import ReactDOM from "react-dom";
import App from "./client/App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.hydrate(
  <React.StrictMode>
    <App data={window.__INITIAL__DATA__.rickAndMortyData} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
