
const express = require('express');
const app = express();
const path = require('path');
const WebSocket = require('ws'); // Move the WebSocket import here
const util = require('util');



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Define routes and middleware
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'whatsapp.html'));
});
const wss = new WebSocket.Server({ port: 8080 }); // Set the desired port

wss.on('connection', (ws) => {
  // Handle incoming message from client
  ws.on('message', (message) => {
    console.log('Received:', message);
  });

  
});


// Define routes and middleware
app.get('/open-whatsapp1', async (req, res) => {

  try {

    const text = req.query.text; // Access the text1 query parameter sent from the client
   const msg=req.query.text1;
   const lowerlimit = parseInt(req.query.text2);
const upperlimit = parseInt(req.query.text3);


    const numbersArray = text.split(',').map(number => number.trim());
    const totalNumbers = numbersArray.length;
   //console.log(totalNumbers);
    const dataToSend = { totalNumbers }; // Wrap the text in an object or array
    console.log(dataToSend);

    // Send the data to the connected clients via WebSocket
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(dataToSend));
    });
      // Send the array to the client
    
    const { Builder, By, Key, until } = require('selenium-webdriver');


    // Create a new instance of the WebDriver
    const driver = await new Builder().forBrowser('chrome').build();
        
       
       

          
          
      
    const baseUrl = 'https://web.whatsapp.com';

    
    for (const phoneNumber of numbersArray) {
      const url = baseUrl + '/send?phone=' + phoneNumber;
      await driver.get(url);
      const buttonWait = driver.wait(until.elementLocated(By.xpath("//*[@id=\"app\"]/div/span[2]/div/span/div/div/div/div/div/div[2]/div/button"), 200000));
      const headerWait = driver.wait(until.elementLocated(By.xpath("//*[@id=\"main\"]/header/div[2]/div/div/span"), 200000));
    
      try {
        let element = await Promise.race([buttonWait, headerWait]);
      // await element.click();
        let value = await element.getText();
    
        if (value === "OK") {
          console.log("Button clicked");
          
        } else {
          
          const localImagePath = 'C:\\Users\\HP\\Downloads\\download.jpg';

          await driver.manage().setTimeouts({ implicit: 5000 });
          const attach= driver.findElement(By.xpath("//div[@title='Attach']"));
          await attach.click();
          await sleep(1000);
          driver.findElement(By.xpath("//input[@accept='image/*,video/mp4,video/3gpp,video/quicktime']")).sendKeys(localImagePath);

          await sleep(2000);

          const cf= driver.findElement(By.xpath("//span[@data-icon = 'send']"));
          await cf.click();

          await sleep(2000);

          await cf.click();

         await driver.sendKeys(Keys.RETURN);
         await sleep(2000);



	  //Enter Text
	  driver.findElement(By.xpath("//div[@class='_3Uu1_']//div[@data-testid='conversation-compose-box-input']")).sendKeys(localImagePath);

    await sleep(1000);
    const buttonElement = await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[5]/div/footer/div[1]/div/span[2]/div/div[2]/div[2]/button/span'));
  
    await buttonElement.click();
    await sleep(1000);
    const inc=phoneNumber;
    const dataToSendq = { inc }; // Wrap the text in an object or array
    console.log(dataToSendq);

    // Send the data to the connected clients via WebSocket
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(dataToSendq));
    });
    const randomNumber = Math.floor(Math.random() * (upperlimit - lowerlimit + 1)) + lowerlimit;
    const timee=(randomNumber*1000);
    console.log(timee);
    
    await sleep(timee);
  

          
        
        
      
        }
      } catch (NoSuchElementException) {
        // Handle exception if both conditions fail
        console.log("Neither button nor header found");
      }
      
    
      // Additional code for interacting with the WhatsApp window for each number
    
    }
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

app.get('/open-whatsapp3', async (req, res) => {    // Send the array to the client
    
  
  try {

 const tableDataString = decodeURIComponent(req.query.text);
    const tableData1 = JSON.parse(tableDataString);
       
    
    
    const { Builder, By, Key, until } = require('selenium-webdriver');


    // Create a new instance of the WebDriver
    const driver = await new Builder().forBrowser('chrome').build();
        
       
       

          
          
      
    const baseUrl = 'https://web.whatsapp.com'+tableData1;

    
   
      await driver.get(baseUrl);
      const { tableData } = req.body;
      console.log('Received table data:');
      console.log(tableData);
    
    
      // Additional code for interacting with the WhatsApp window for each number
    
    }
    // Do any other actions you want with WhatsApp web

   catch (error) {
    console.error(error);
    // Send an error response
    res.status(500).send('Error opening WhatsApp web');
  }
 
  // Process the table data on the server-side
  // ...

  // Send a response back to the client if needed
  res.send('Table data received on the server-side.');
});



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
