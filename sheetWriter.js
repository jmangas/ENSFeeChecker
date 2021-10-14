const { GoogleSpreadsheet } = require('google-spreadsheet');

(async () => {

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

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  console.log(sheet.title);
  console.log(sheet.rowCount);
  let fee = '$115.11USD'
  fee = fee.replace('$', '')
  fee = fee.replace('USD', '')
  fee = fee.replace('.', ',')
  const moreRows = await sheet.addRows([
    { FECHA: new Date(), PRECIO: fee },  
  ]);


})()