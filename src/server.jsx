import express from "express";
import path from "path";
import React from "react";
import { StaticRouter as Router } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

import App from "./client/App";
import fetchData from "./lib/fetchData";

const app = express();
const port = process.env.PORT || 3003;

app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use(express.static("./dist"));

app.get("/", async (_req, res) => {
  const rickAndMortyData = await fetchData();

  const componentStream = ReactDOMServer.renderToNodeStream(
    <App data={rickAndMortyData} renderType="renderToNodeStream" />
  );

  const htmlStart = `
  <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>RenderToNodeStream</title>
        <link rel="preconnect" href="https://rickandmortyapi.com">
        <link rel="dns-prefetch" href="https://rickandmortyapi.com">
        <link rel="stylesheet preload" href="/static/styles.css" as="style">
      </head>
    <body>
    <div id="root">`;

  res.write(htmlStart);

  // res.flush();

  componentStream.pipe(res, { end: false });

  const htmlEnd = `</div>
  <script>window.__INITIAL__DATA__ = ${JSON.stringify({
    rickAndMortyData,
  })}</script>
    <script rel="preload" src="/static/app.js" as="script"></script>
  </body>
  </html>`;

  componentStream.on("end", () => {
    res.write(htmlEnd);

    res.end();
  });
});

app.get("/render-to-string", async (req, res) => {
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
      <meta charset="UTF-8">
      <title>RenderToString</title>
      <link rel="preconnect" href="https://rickandmortyapi.com">
      <link rel="dns-prefetch" href="https://rickandmortyapi.com">
      <link rel="stylesheet preload" href="/static/styles.css" as="style">
    </head>
    <body>
      <div id="root">${component}</div>
      <script>window.__INITIAL__DATA__ = ${JSON.stringify({
        rickAndMortyData,
      })}</script>
      <script rel="preload" src="/static/app.js" as="script"></script>
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

app.get("*", (_req, res) => {
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
