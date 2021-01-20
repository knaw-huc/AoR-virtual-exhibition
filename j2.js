console.log('JSON to the Batmobile!');
var writeFile = require('write-file');
var fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


//
var imagesJson = require('./content/data/images.json');
var folioJson = require('./content/data/folios.json');
var folioPartsJson = require('./content/data/folioParts.json');
var folioPartsmulJson = require('./content/data/multiples.json');

 var compList = [];


// run trought MULTIPLES list
for (var i = 0; i < folioPartsmulJson.length; i++) {
  var multiID = folioPartsmulJson[i].multipeimageid;
  var partsObj = {};

  // if folio
  if (typeof folioPartsmulJson[i].alleenfolioid !== "undefined") {
    partsObj = createPartObjectFolio(folioPartsmulJson[i].alleenfolioid);

    // if image
  } else if (typeof folioPartsmulJson[i].afbeelding !== "undefined") {
    partsObj = createPartObjectImage(folioPartsmulJson[i].afbeelding);

    //if part
  } else if (typeof folioPartsmulJson[i].foliopartid !== "undefined") {
    partsObj = createPartObjectFolioParts(folioPartsmulJson[i].foliopartid);
  }

  // if already in array
  if (excistInCompList(multiID, 'multipeimageid').excist) {
    compList[excistInCompList(multiID, 'multipeimageid').indx].parts.push(partsObj)
  } else {
    compList.push({multipeimageid:multiID,folioname: multiID, parts:[partsObj]});
  }
}



// run trought FOLIOS list
for (var i = 0; i < folioJson.length; i++) {
  var folioID = folioJson[i].folioid;
  var partsObj = createPartObjectFolio(folioJson[i].folioid);


  // if already in array
  if (excistInCompList(folioID, 'folioname').excist) {
    compList[excistInCompList(folioID, 'folioname').indx].parts.push(partsObj)
  } else {
    compList.push({multipeimageid:folioID,folioname: folioID, parts:[partsObj]});
  }
}






// run trought folioPARTS list
for (var i = 0; i < folioPartsJson.length; i++) {
  var partID = folioPartsJson[i].folioid;
  var partsObj = createPartObjectFolioParts(folioPartsJson[i].fpid);


  // if already in array
  if (excistInCompList(partID, 'folioname').excist) {
    compList[excistInCompList(partID, 'folioname').indx].parts.push(partsObj)
  } else {
    compList.push({multipeimageid:partID,folioname: partID, parts:[partsObj]});
  }
}




// get folio object
function getFolioData(fid) {
  var out = [];
  for (var i = 0; i < folioJson.length; i++){
    if (folioJson[i].folioid == fid){
      out =folioJson[i];
    }
  }
  return out;
}



// get image object
function getImageData(aid){
  var out = [];
  for (var i = 0; i < imagesJson.length; i++){
    if (imagesJson[i].img_file_name == aid){
      out =imagesJson[i];
    }
  }
  return out;
}


// get part object
function getPartData(pid){
  var out = [];
  for (var i = 0; i < folioPartsJson.length; i++){
    if (folioPartsJson[i].fpid == pid){
      out =folioPartsJson[i];
    }
  }
  return out;
}

// create parts[] object for folio
function createPartObjectFolio(id) {
  var folioData = getFolioData(id);
  partsObj = {
     "fpid": folioData.folioid,
     "fpname": folioData.folionr,
     "fpdescription": replaceLink(folioData.foliodescription),
     "foliofilename": folioData.foliofilename
     //"fimagePath": folioData.
  }
  return partsObj;
}


// create parts[] object for Images
function createPartObjectImage(id) {
  var afbData= getImageData(id);
  partsObj = {
     "fpid": afbData.img_file_name,
     "fpname": afbData.alttext,
     "fpdescription": afbData.description+'<br><a target="_blank" href="'+afbData.hyperlink+'">'+afbData.hyperlink+'</a>',
     "foliofilename": afbData.img_file_name,
     "fimagePath": 'images/content/'
  }
  return partsObj;
}

// create parts[] object for folioParts
function createPartObjectFolioParts(id) {
  var fPartData = getPartData(id);
  partsObj = {
     "fpid": fPartData.fpid,
     "fpname": fPartData.fpname,
     "fpdescription": fPartData.fpdescription,
     "foliofilename": getImgFileNameFromFolio(fPartData.folioid),
  }
  return partsObj;
}



// get the filename of the folio PART
function getImgFileNameFromFolio(folId) {
  return getFolioData(folId).foliofilename;
}



// check if multipeimageid already exist in Array
function excistInCompList(id, objectName) {
  var bl = false;
  var indexx;
  for (var i = 0; i < compList.length; i++){
    if (compList[i][objectName] == id){
      bl = true;
      indexx = i;
    }
  }
  return {excist:bl, indx:indexx}
}





// write the file
fs.writeFile('folioMultiList.json', JSON.stringify(compList), function (err) {
  if (err) throw err;
  console.log('new file');
});
























function replaceLink(desc) {
  var out = desc;
  const dom = new JSDOM(desc);
  var allLinks = dom.window.document.querySelector('a');
  if (allLinks !== null) {
    var link = allLinks.innerHTML;
    var newContent = desc.replace("http://link.nl", link);
    out = newContent.replace('<a href=', ' <a target="_blank" href=');
  }
  return out;
}




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
