
const express = require('express');
const app = express();
const path = require('path');

// Define routes and middleware
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'whatsapp.html'));
});
// Define routes and middleware
app.get('/open-whatsapp', async (req, res) => {
  try {
    const { Builder, By, Key, until } = require('selenium-webdriver');


    // Create a new instance of the WebDriver
    const driver = await new Builder().forBrowser('chrome').build();

    // Navigate to WhatsApp web
    await driver.get('https://web.whatsapp.com/');

    // Wait until the QR code is scanned and the chat list is visible
    await driver.wait(until.elementLocated(By.css('div._2aBzC')), 30000);

    // Do any other actions you want with WhatsApp web

    // Close the WebDriver
    await driver.quit();

    // Send a success response
    res.send('WhatsApp web opened successfully');
  } catch (error) {
    console.error(error);
    // Send an error response
    res.status(500).send('Error opening WhatsApp web');
  }
});
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
