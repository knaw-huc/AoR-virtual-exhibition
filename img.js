
const fs = require('fs');
const sharp = require('sharp');
// https://sharp.pixelplumbing.com/api-resize

const inputFolder  = './src/orig_artworks/';
const outputFolder = './src/images/artworks/';

  fs.readdir(inputFolder, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      }

      files.forEach(function (file) {

        sharp(inputFolder+file)
          .resize(400,500,{
            fit: 'cover'
          })
          .toFile(outputFolder+'thumb_'+file, function(err) {
          });

      });
  });
