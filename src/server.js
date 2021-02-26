import express from "express";
import path from "path";
import React from "react";
import { StaticRouter as Router } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

import App from "./client/App";
import fetchData from "./lib/fetchData";

const app = express();
const port = 3002;

app.use("/static", express.static(path.resolve(__dirname, "static")));

app.get("/", async (req, res) => {
  const rickAndMortyData = await fetchData();

  const componentStream = ReactDOMServer.renderToNodeStream(
    <App data={rickAndMortyData} renderType="renderToNodeStream" />
  );

  const htmlStart = `
  <!doctype html>
    <html>
    <head>
    <title>RenderToNodeStream</title>
    <link rel="stylesheet" href="/static/styles.css">
    </head>
    <body>
    <div id="root">`;

  res.write(htmlStart);

  componentStream.pipe(res, { end: false });

  const htmlEnd = `</div>
  <script>window.__INITIAL__DATA__ = ${JSON.stringify({
    rickAndMortyData,
  })}</script>
    <script src="/static/app.js"></script>
  </body>
  </html>`;

  componentStream.on("end", () => {
    res.write(htmlEnd);

    res.end();
  });
});

app.get("/render-to-string*", async (req, res) => {
  const rickAndMortyData = await fetchData();

  const context = {};

  const component = ReactDOMServer.renderToString(
    <Router location={req.url} context={context}>
      <App data={rickAndMortyData} renderType="renderToString" />
    </Router>
  );

  const html = `
  <!doctype html>
    <html>
    <head>
      <title>RenderToString</title>
      <link rel="stylesheet" href="/static/styles.css">
    </head>
    <body>
      <div id="root">${component}</div>
      <script>window.__INITIAL__DATA__ = ${JSON.stringify({
        rickAndMortyData,
      })}</script>
      <script src="/static/app.js"></script>
    </body>
    </html>
  `;

  if (context.url) {
    res.writeHead(301, { Location: context.url });
    res.end();
  } else {
    res.send(html);
  }
});

app.get("*", (req, res) => {
  res.status(404).send(`
    <html>
      <head>
      </head>
      <body>
        <h1>404 - Not Found</h1>
      </body>
    </html>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
