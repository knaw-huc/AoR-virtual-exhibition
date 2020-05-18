/**
 * Simple Node.js script to turn a specific page on a Google Sheet
 * into a JSON object for the main purpose of HTML Templating.
 *
 * @author jonobr1 / http://jonobr1.com
 *
 */

var https = require('https');
var path = require('path');
var fs = require('fs');

var format = 'csv';         // Format you'd like to parse. `tsv` or `csv`
var id = '1_0NrQL1LMToaYBfMXuTICHLAQicRLTZR-5IkRyB9ndc'; // The Google Sheet ID found in the URL of your Google Sheet.
var sheetId = 0;            // The Page ID of the Sheet you'd like to export. Found as `gid` in the URL.

https.get('https://docs.google.com/spreadsheets/d/' + id + '/export?format=' + format + '&id=' + id + '&gid=' + sheetId, function(resp) {

  var body = '';

  resp
    .on('data', function(data) {

      body += ab2str(data);

    })
    .on('end', function() {

      var json = [];
      var rows = body.split(/\r\n/i);

      for (var i = 0; i < rows.length; i++) {
        json.push(rows[i].split(/\t/i));
      }

      fs.writeFileSync(path.resolve(__dirname, './sheet.json'), JSON.stringify(json));
      console.log('Generated sheet.json');

    });

});

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}
