var fs = require('fs');



console.log('extraInfo');
fs.readFile('./content/data/extraInfo.json', 'utf8', function(err, data){
    var extraInfo = rplc(data);
    fs.writeFileSync('./content/data/extraInfo.json', extraInfo);
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
