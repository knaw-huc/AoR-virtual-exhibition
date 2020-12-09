console.log('go json');
var writeFile = require('write-file');
var fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


var siteJson = require('./content/data/sites.json');
var imagesJson = require('./content/data/images.json');
var themesJson = require('./content/data/themes.json');
var manuscriptJson = require('./content/data/metadata.json');
var manuscriptJsonOrg = require('./content/data/metadata.json');
var folioJson = require('./content/data/folios.json');
var folioPartsJson = require('./content/data/folioParts.json');
var folioPartsmulJson = require('./content/data/multiples.json');
var portaits = require('./content/data/extraInfo.json');






function replaceLink(desc) {

  var out = desc;
  const dom = new JSDOM(desc);
  var allLinks = dom.window.document.querySelector('a');
  if (allLinks !== null) {
    var link = allLinks.innerHTML;
    //console.log(link);

    var newContent = desc.replace("http://link.nl", link);
    out = newContent.replace('<a href=', ' <a target="_blank" href=');

  }
  return out;
}


var folioMultiList = [];

manuscriptJson.sort(dynamicSort("order"));


function combineJson(){
  var folioCount= -1;
  for (var mi = 0; mi < manuscriptJson.length; mi++) { // all manuscriptJson
    folioCount= -1;
    // add folio
    manuscriptJson[mi].folios = [];
    for (var fi = 0; fi < folioJson.length; fi++) {
      if (folioJson[fi].manuscript_id == manuscriptJson[mi].id) {
        manuscriptJson[mi].folios.push(folioJson[fi]);
        folioCount++;
        folioJson[fi].folioParts=[];

        //find folio parts
        for (var pi = 0; pi < folioPartsJson.length; pi++) {

          if (folioJson[fi].folioid == folioPartsJson[pi].folioid) {
            //add folioparts
            manuscriptJson[mi].folios[folioCount].folioParts.push(folioPartsJson[pi]);
          }//if
        }//parts
      }//if
    }//folios
  }// manuscript


  for (var i = 0; i < manuscriptJson.length; i++) {
    siteJson.push(manuscriptJson[i]);
  }

  // add sites to theme landingspage
  var theme = 1
  for (var j = 0; j < siteJson.length; j++) {
    if (siteJson[j].template_file == 'theme-landing') {
      siteJson[j].allPages = [];

      for (var k = 0; k < siteJson.length; k++) {
        if (siteJson[k].theme == theme) {
          siteJson[j].allPages.push(siteJson[k])
        }
      }
      theme +=1;
    }
  }

  siteJson.push({
    "title": "lastpage",
    "page_id": 0,
    "file_name": "last",
    "template_file": "image-svg",
    "navigation_file": "nav-manuscripts"
  })
  siteJson[0].manuscriptsList = manuscriptJson;
  siteJson[26].manuscriptsList = manuscriptJson; //manuscript page
  siteJson[7].portaitList = portaits; //portait page


  //create list for making folio components
  for (var fp = 0; fp < folioPartsJson.length; fp++) {
    if(typeof folioPartsJson[fp].multiviewid !== "undefined") {
      folioMultiList.push(folioPartsJson[fp].multiviewid)
    }else {
      folioMultiList.push(folioPartsJson[fp].folioid)
    }
  }

  folioMultiList = folioMultiList.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);


// folioPartsmulJson
// create multiple json file

  var manuscriptCompList = [];
  // every folio
  for (var fo = 0; fo < folioJson.length; fo++) {
    var manuscriptDat={};
    var folioData ={};
    folioData.parts = [];
    // every manuscript
    for (var ma = 0; ma < manuscriptJsonOrg.length; ma++) {
      //get manuscript data within folio
      if (manuscriptJsonOrg[ma].id == folioJson[fo].manuscript_id) {
        // manuscript data
        var manu = manuscriptJsonOrg[ma].id;
        var location = manuscriptJsonOrg[ma].location;
        var shelfmark = manuscriptJsonOrg[ma].shelfmark;
        var filename = manuscriptJsonOrg[ma].file_name;
      }
    }

    //find matching foliopart
    for (var p = 0; p < folioPartsJson.length; p++) {
      if (folioPartsJson[p].folioid == folioJson[fo].folioid) {
        // add manuscript data to part
        var partData = folioPartsJson[p];
        partData.manuscript_name = manu
        partData.manuscript_location = location;
        partData.manuscript_shelfmark = shelfmark;
        partData.manuscript_filename = filename;
        partData.foliofilename = folioJson[fo].foliofilename;
        var fileNoExtention = folioJson[fo].foliofilename.replace(".jpg", "");
        partData.foliofilename_exten = fileNoExtention;

        folioData.parts.push(partData);
      }
    }
    // if has no parts -> get folio data
    if (folioData.parts.length == 0) {
      var partData = {};
      partData.fpname = folioJson[fo].folionr+''+notUndefined(folioJson[fo].foliotype);
      partData.fpdescription = replaceLink(folioJson[fo].foliodescription);
      partData.foliofilename = folioJson[fo].foliofilename;
      var fileNoExtention = folioJson[fo].foliofilename.replace(".jpg", "");
      partData.foliofilename_exten = fileNoExtention;

      partData.manuscript_name = manu
      partData.manuscript_location = location;
      partData.manuscript_shelfmark = shelfmark;
      partData.manuscript_filename = filename;


      folioData.parts.push(partData);

    }

    folioData.folioname = folioJson[fo].folioid;
    folioData.imageSource = folioJson[fo].foliofilename;
    folioData.foliosource = folioJson[fo].foliosource
    manuscriptCompList.push(folioData);
  }




  // multipart lists

      // get uniqie muli id's
      var mulitiList = [];
      for (var i = 0; i < folioPartsmulJson.length; i++) {
        mulitiList.push(folioPartsmulJson[i].multipeimageid)
      }
      // ontdubbel
      mulitiList = mulitiList.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);

      // every muli item
      for (var ml = 0; ml < mulitiList.length; ml++) {
        var multiItem = {};
        multiItem.folioname = mulitiList[ml];
        multiItem.parts = [];
        // get all parts
        for (var ol = 0; ol < folioPartsmulJson.length; ol++) {
          if (mulitiList[ml] == folioPartsmulJson[ol].multipeimageid) {
            //if part / not afbee
            if (typeof folioPartsmulJson[ol].foliopartid !== "undefined") {
              //console.log(mulitiList[ml],folioPartsmulJson[ol].foliopartid);

              // get part data by id
              for (var fp = 0; fp < folioPartsJson.length; fp++) {
                if (folioPartsmulJson[ol].foliopartid == folioPartsJson[fp].fpid) {
                  //console.log(folioPartsJson[fp].folioid);
                  var folioPartData = folioPartsJson[fp];
                  folioPartData.manuscript = {};

                  // manuscript detail data, folio first
                  for (var fol = 0; fol < folioJson.length; fol++) {
                    if (folioJson[fol].folioid == folioPartsJson[fp].folioid) {
                      folioPartData.imageSource = folioJson[fol].foliofilename;
                      folioPartData.foliodescription = replaceLink(folioJson[fol].foliodescription);
                      folioPartData.foliosource = folioJson[fol].foliosource;

                      // then manuscript
                      for (var man = 0; man < manuscriptJsonOrg.length; man++) {
                        if (folioJson[fol].manuscript_id == manuscriptJsonOrg[man].id) {
                          folioPartData.manuscript_name = manuscriptJsonOrg[man].id;
                          folioPartData.manuscript_location = manuscriptJsonOrg[man].location;
                          folioPartData.manuscript_shelfmark = manuscriptJsonOrg[man].shelfmark;
                          folioPartData.manuscript_filename = manuscriptJsonOrg[man].file_name;

                        }
                      }
                      // manuscrip data
                    }
                  }

                  // add part data
                  multiItem.parts.push(folioPartData);

                }
              }
            } // if is folioParts

            // if only folio
            if (typeof folioPartsmulJson[ol].alleenfolioid !== "undefined") {
              //console.log(folioPartsmulJson[ol].alleenfolioid);
              var folioPartData = {};
              //folioPartData.manuscript = {};

              for (var fol2 = 0; fol2 < folioJson.length; fol2++) {
                if (folioJson[fol2].folioid == folioPartsmulJson[ol].alleenfolioid) {
                  folioPartData.imageSource = folioJson[fol2].foliofilename;
                  folioPartData.foliodescription = replaceLink(folioJson[fol2].foliodescription);
                  folioPartData.foliosource = folioJson[fol2].foliosource;

                  folioPartData.foliofilename = folioJson[fol2].foliofilename;
                  var fileNoExtention = folioPartData.foliofilename.replace(".jpg", "");
                  folioPartData.foliofilename_exten = fileNoExtention;
                  folioPartData.fpname = folioJson[fol2].folioid;
                  folioPartData.fpdescription = replaceLink(folioJson[fol2].foliodescription);
                  folioPartData.fpid = folioJson[fol2].folioid;

                  // then manuscript
                  for (var man2 = 0; man2 < manuscriptJsonOrg.length; man2++) {
                    if (folioJson[fol2].manuscript_id == manuscriptJsonOrg[man2].id) {
                      folioPartData.manuscript_name = manuscriptJsonOrg[man2].id;
                      folioPartData.manuscript_location = manuscriptJsonOrg[man2].location;
                      folioPartData.manuscript_shelfmark = manuscriptJsonOrg[man2].shelfmark;
                      folioPartData.manuscript_filename = manuscriptJsonOrg[man2].file_name;

                    }
                  }
                  // manuscrip data
                }
              }
              multiItem.parts.push(folioPartData);
            }


            // if only afbeelding
            if (typeof folioPartsmulJson[ol].afbeelding !== "undefined") {
              //console.log(folioPartsmulJson[ol].alleenfolioid);
              var folioPartData = {};

              for (var imi = 0; imi < imagesJson.length; imi++) {
                if (imagesJson[imi].img_file_name == folioPartsmulJson[ol].afbeelding) {
                  folioPartData.imageSource = imagesJson[imi].img_file_name;
                  folioPartData.foliodescription = imagesJson[imi].description;
                  folioPartData.foliosource = imagesJson[imi].resource;

                  folioPartData.foliofilename = imagesJson[imi].img_file_name;
                  var fileNoExtention = folioPartData.foliofilename.replace(".jpg", "");
                  folioPartData.foliofilename_exten = fileNoExtention;

                  folioPartData.fpname = imagesJson[imi].alttext;
                  folioPartData.fpdescription = imagesJson[imi].description;
                  folioPartData.fpid = imagesJson[imi].img_file_name;
                  folioPartData.fimagePath = 'images/content/';

                }
              }
              multiItem.parts.push(folioPartData);
            }


          }
        }
        manuscriptCompList.push(multiItem);
      }




//console.log(siteJson);
fs.writeFile('siteJson.json', JSON.stringify(siteJson), function (err) {
  if (err) throw err;
  console.log('Saved1!');
});
fs.writeFile('manuscriptJson.json', JSON.stringify(manuscriptJson), function (err) {
  if (err) throw err;
  console.log('Saved2!');
});
fs.writeFile('folioMultiList.json', JSON.stringify(manuscriptCompList), function (err) {
  if (err) throw err;
  console.log('Saved3!');
});
}// function
combineJson();


function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


function notUndefined(inn) {
  var out = inn;
  if(typeof lastname == "undefined") {
    out = '';
  }
  return out;
}
