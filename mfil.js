
var writeFile = require('write-file');
var fs = require('fs');


var folioJson = require('./content/data/folioParts.json');
var folioJson2 = require('./content/data/folios.json');
var folioJson3 = require('./content/data/images.json');

for (var i = 0; i < folioJson.length; i++) {
  var fileName = folioJson[i].fpid;
  fs.writeFile('src/svg-layers-all/'+fileName+'.html', '', function (err) {
    if (err) throw err;
  });
}

for (var i = 0; i < folioJson2.length; i++) {
  var fileName = folioJson2[i].folioid;
  fs.writeFile('src/svg-layers-all/'+fileName+'.html', '', function (err) {
    if (err) throw err;
  });
}

for (var i = 0; i < folioJson3.length; i++) {
  var fileName = folioJson3[i].img_file_name;
  fs.writeFile('src/svg-layers-all/'+fileName+'.html', '', function (err) {
    if (err) throw err;
  });
}
