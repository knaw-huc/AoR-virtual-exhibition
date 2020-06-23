
const fs = require('fs');
const sharp = require('sharp');
// https://sharp.pixelplumbing.com/api-resize

// images
const inputFolder  = './orig_img/';
const outputFolder = './src/images/content/';

  fs.readdir(inputFolder, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      }

      files.forEach(function (file) {
        console.log(file);
        sharp(inputFolder+file)
          .resize({ width: 500 })
          .toFile(outputFolder+file, function(err) {
          });

      });
  });


  // content
  const inputFolder2  = './orig_img/manuscripts_highres/';
  const outputFolder2 = './src/images/manuscripts/';

    fs.readdir(inputFolder2, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach(function (file) {
          console.log(file);
          sharp(inputFolder2+file)
            .resize({ width: 1200 })
            .toFile(outputFolder2+file, function(err) {
            });

        });
    });
