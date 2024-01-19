/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import * as fs from 'node:fs';

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: 'input',
      name: 'URL',
      message: 'Please submit a URL to generate a QR code'
    }
])
  .then((answer) => {
  // Use user feedback for... whatever!!
    let url = answer.URL;
    let qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream('url_qr.png'));
    fs.writeFile('INPUT.txt', url, (err) => {
      if (err) throw err;
      console.log('File saved!');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(error);
    } else {
      // Something else went wrong
      console.log(error);
    }
  });