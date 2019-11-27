var tlItemsRowY = [{"row": 1, "endpoint": 0}];

//Create all timeline elements and put in main svg tag
function createTimelineSvg() {
  var svg;
  svg += createJustTimeline();
  svg += createTimelineMarkers();

  for (var i = 0; i < timelineDataArr.length; i++) {
    svg += createTimelineItems(timelineDataArr[i], i);
  }
  document.getElementById("theTimeline").innerHTML= svg;

  console.log(tlItemsRowY);
}





// create all points and ranges on the timeline
function createTimelineItems(timelineObj, count) {
  var output;
  if ((timelineObj.startDate2 == '') && (timelineObj.endDate1 == '')) {
    // POINT
    output = tlItem_singlePoint(timelineObj);
  } else {
    // RANGE
    var rowNr = getRowNumber(timelineObj.startDate1);
    output = tlItem_range(timelineObj, rowNr);

    var storeEnddate = timelineObj.endDate1;
    if (timelineObj.endDate2 != '') {
      storeEnddate = timelineObj.endDate2;
    }
    if ((timelineObj.endDate1 == '') && (timelineObj.endDate2 == '')) {
      storeEnddate = timelineObj.startDate2;
    }

    tlItemsRowY.push({"row": rowNr, "endpoint": storeEnddate });
  }
  return output;
}


//Handle the row place for the ranges (prevent overlapping)
function getRowNumber(startPoint) {
  var rowNr=0;
  var maxCount=0;

  for (var i = 0; i < tlItemsRowY.length; i++) {
    console.log(startPoint+' gr dan '+tlItemsRowY[i].endpoint);
    maxCount = i;
    if (startPoint >= (tlItemsRowY[i].endpoint-10) ) {

      rowNr = tlItemsRowY[i].row;
      tlItemsRowY[i].endpoint = 10000000000000000000000000;
      break;
    }
  }

  if (rowNr==0) {
    var max = tlItemsRowY.reduce(function (prev, current) { return (prev.row > current.row) ? prev : current });
    rowNr=max.row+1;
  }
  return rowNr;
}


// set the height position of hte items
function setTlItemRow(rowNr) {
  return tlY-(rowNr*(tlItemHeight+tlItemGutter));
}



// timeline, just the line
function createJustTimeline() {
  output = '<line x1="'+tlStartPoint+'" y1="'+tlY+'" x2="'+tlEndPoint+'" y2="'+tlY+'" style="stroke:'+tlColor+'; stroke-width:'+tlStrokeWidth+'" />';
  return output;
}





// Markers
function createTimelineMarkers() {
  var output;
  var yXtra = markerHeight/2;

  for (var i = 0; i < (tlMarkerAmount+1); i++) {
      x = tlStartPoint + (i*tlMarkerWidth);
      output += '<line x1="'+x+'" y1="'+(tlY-yXtra)+'" x2="'+x+'" y2="'+(tlY+yXtra)+'" style="stroke:'+tlColor+'; stroke-width:'+tlStrokeWidth+'" />';
      output += '<text x="'+x+'" y="'+(tlY+tlTxtDistance)+'" >'+(timelineStartDate+(i*timelineMarkerUnit))+'</text>';
  }
  return output;
}



// sort a property of an array
function arrayPropertySort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
