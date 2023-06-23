// server.js
const express = require("express");
const { Builder } = require("selenium-webdriver");
require("chromedriver");

const app = express();

app.get("/open-whatsapp", async (req, res) => {
  const driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://web.whatsapp.com");

  setTimeout(async () => {
    await driver.quit();
  }, 5000); // Wait for 5 seconds before quitting the driver

  res.send("WhatsApp opened!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
