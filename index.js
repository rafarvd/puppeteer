const express = require("express");
const puppeteer = require("puppeteer");
const { scrape } = require("./scrape");
const { captureScreenshot } = require("./screenshot");

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/screen", captureScreenshot);
app.get("/scrape", scrape);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
