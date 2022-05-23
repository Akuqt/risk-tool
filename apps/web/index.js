/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "static")));

app.get("/*", function (_req, res) {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.listen(3000, () => {
  console.log("Frontend at: http://localhost:3000/");
});
