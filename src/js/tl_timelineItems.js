// SINGLE POINT
function tlItem_singlePoint(timelineObj) {
  var output;
  output = '<circle cx="'+pointConverter(timelineObj.startDate1)+'" cy="'+tlY+'" r="3" fill="rgb(42, 42, 42)" />';
  return output;
}


// RANGE
function tlItem_range(timelineObj, rowNr) {
  var output, unCerSt, cerSt, unCerEnd, cerEnd;
  var showCertain = true;
  var typeData = getItemTypeProps(timelineObj.type); // get type data

// get the no date available options
  if (timelineObj.startDate2 == '') {// geen onzeker start
    unCerSt = timelineObj.startDate1;
    cerSt = timelineObj.startDate1;
  }else {
    unCerSt = timelineObj.startDate1;
    cerSt = timelineObj.startDate2;
  }

  if (timelineObj.endDate2 == '') {// geen onzeker eind
    unCerEnd = timelineObj.endDate1;
    cerEnd = timelineObj.endDate1;
  }else {
    unCerEnd = timelineObj.endDate2;
    cerEnd = timelineObj.endDate1;
  }

  if ((timelineObj.endDate1 == '') && (timelineObj.endDate2 == '')) {
    unCerSt = timelineObj.startDate1;
    unCerEnd = timelineObj.startDate2;
    showCertain = false;

  }


  var textX = unCerSt+((unCerEnd - unCerSt)/2);



  //uncertain
  output = '<g id="'+removeSpaces(timelineObj.title)+'" class="rangeItem '+timelineObj.type+'">'
  output += '<line x1="'+pointConverter(unCerSt)+'" y1="'+setTlItemRow(rowNr)+'" x2="'+pointConverter(unCerEnd-0.5)+'" y2="'+setTlItemRow(rowNr)+'" ';
  output += 'style="stroke:'+typeData.barFill+'; stroke-width:'+tlItemHeight+';opacity:0.7" stroke-linecap="butt" />'; // opacity:0.5; //'+typeData.barFill+'

  // certain
  if (showCertain) {
    output += '<line x1="'+pointConverter(cerSt)+'" y1="'+setTlItemRow(rowNr)+'" x2="'+pointConverter(cerEnd)+'" y2="'+setTlItemRow(rowNr)+'" ';
    output += 'style="stroke:'+typeData.barFill+'; stroke-width:'+tlItemHeight+'; opacity:1;" />';// opacity:1
  }

  // text
  output += '<text x="'+pointConverter(textX)+'" y="'+setTlItemRow(rowNr)+'" dominant-baseline="middle" text-anchor="middle">'+timelineObj.title+'</text></g>'; //dominant-baseline="middle" text-anchor="middle"

  return output;
}


// find the ptoperties of a type
function getItemTypeProps(type) {
  var out;
  for (var i = 0; i < itemTypes.length; i++){
    if (itemTypes[i].typeName == type){
      out =itemTypes[i]
    }
  }

  return out;
}

function removeSpaces(inp) {
  var output;
  output = inp.replace(/ /g, "_");
  output = output.replace(/\(/g, "");
  output = output.replace(/\)/g, "");
  return output

}
