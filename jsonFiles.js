var fs = require('fs');



console.log('extraInfo');
fs.readFile('./content/data/extraInfo.json', 'utf8', function(err, data){
    var extraInfo = rplc(data);
    fs.writeFileSync('./content/data/extraInfo.json', extraInfo);
});

console.log('folioParts');
fs.readFile('./content/data/ffolioParts.json', 'utf8', function(err, data1){
    var folioParts = rplc(data1);
    fs.writeFileSync('./content/data/folioParts.json', folioParts);
});

console.log('folios');
fs.readFile('./content/data/folios.json', 'utf8', function(err, data2){
    var folios = rplc(data2);
    fs.writeFileSync('./content/data/folios.json', folios);
});

console.log('images');
fs.readFile('./content/data/images.json', 'utf8', function(err, data3){
    var images = rplc(data3);
    fs.writeFileSync(path.resolve('./content/data/images.json'), images);
});

console.log('metadata');
fs.readFile('./content/data/metadata.json', 'utf8', function(err, data4){
    var metadata = rplc(data4);
    fs.writeFileSync(path.resolve('./content/data/metadata.json'), metadata);
});

console.log('multiples');
fs.readFile('./content/data/multiples.json', 'utf8', function(err, data5){
    var multiples = rplc(data5);
    fs.writeFileSync(path.resolve('./content/data/multiples.json'), multiples);
});

console.log('siteJson');
fs.readFile('./content/data/siteJson.json', 'utf8', function(err, data6){
    var siteJson = rplc(data6);
    fs.writeFileSync(path.resolve('./content/data/siteJson.json'), siteJson);
});
//
console.log('themes1');
fs.readFile('./content/data/themes.json', 'utf8', function(err, data7){

    var themes = rplc(data7);

    fs.writeFileSync(path.resolve('./content/data/themes.json'), themes);

});





function rplc(innn) {
  console.log(innn);
  var out = innn;
  out = out.replace("WARNING! You must upgrade to the latest version of google-spreadsheet!", "");
  out = out.replace("Google's deprecation date for the v3 sheets API is March 3rd 2020", "");
  out = out.replace("Bad news - this version of this module will stop working on that date :(", "");
  out = out.replace("Good news - the new version of the module uses the newer v4 api :)", "");
  out = out.replace("However, there are breaking changes, so please see the docs site", "");
  out = out.replace("https://theoephraim.github.io/node-google-spreadsheet", "");

  return out;

}
