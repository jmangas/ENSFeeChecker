require ('colors');
const puppeteer = require('puppeteer');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const delay = ms => new Promise(res => setTimeout(res, ms));

var interval = setInterval(function(str1, str2) {
  console.log(str1 + " " + str2);
  checker();
  console.log("Delay init...".yellow);
}, 3600000/2, "Hello.", "");




var checker = function(){

  (async () => {
    console.log("Puppeteer inittiating...".green);
    //const browser = await puppeteer.launch()

const browser = await puppeteer.launch({
          headless: true,
          executablePath: '/usr/bin/chromium-browser',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

    const page = await browser.newPage()

    const navigationPromise = page.waitForNavigation()

    await page.goto('https://app.ens.domains/name/toniman.eth/register')

    await page.setViewport({width: 1639, height: 778})

    await navigationPromise

    await page.waitForSelector('.css-19lgokg > div > .css-abf4lz > .css-1gh09yk > .css-m68qyt')
    await page.click('.css-19lgokg > div > .css-abf4lz > .css-1gh09yk > .css-m68qyt')
    let fee = await page.$eval('.css-19lgokg > div > .css-abf4lz > .css-1gh09yk > .css-m68qyt', el => el.innerText);

    console.log("Fee: " + fee)
    await browser.close()

    console.log("Connect to googleSheets...".green);
    const creds = require('./api-project-1098581205522-a59e1ad6f476.json'); // the file saved above
    const doc = new GoogleSpreadsheet('1wB-86ZNGfWWcgh_SfWmj9q4dge4HUny2kRC0R7Ifaek');
    await doc.useServiceAccountAuth(creds);

    // or preferably, loading that info from env vars / config instead of the file
    /*await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    */

    fee = fee.replace('$', '')
    fee = fee.replace('USD', '')
    fee = fee.replace('.', ',')
    let dateformated = DateToGSValue(new Date())

    await doc.loadInfo(); // loads document properties and worksheets
    //console.log(doc.title);
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(new Date() + " - Writing in doc " + doc.title + ", sheet " + sheet.title + " Fee: " + fee);
    //console.log(sheet.rowCount);

    
    const moreRows = await sheet.addRows([
      {FECHA: dateformated, PRECIO: fee },
    ]);
    console.log("Bye Bye".yellow);

    console.log("Delay init...".yellow);

  })()
}

function DateToGSValue(date) {
  return 25569 + (date.getTime()-date.getTimezoneOffset()*60000)/86400000 ;
}
 
checker();





