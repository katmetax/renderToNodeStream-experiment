import React, { StrictMode } from "react";
import { hydrate } from "react-dom";
import App from "./client/App";
import reportWebVitals from "./reportWebVitals";

hydrate(
  <StrictMode>
    <App data={window.__INITIAL__DATA__.rickAndMortyData} />
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
