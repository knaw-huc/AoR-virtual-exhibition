
// viewport
var elem = (document.compatMode === "CSS1Compat") ?
document.documentElement :
document.body;
var vpWidth = elem.clientWidth;
var vpHeight = elem.clientHeight;

var tlStartPoint = timelineMargin;
var tlEndPoint = vpWidth - timelineMargin;
var pageMiddle = vpHeight/2;
var tlY = pageMiddle;
var tlLenght = vpWidth - (timelineMargin*2);
var timeLenght = timelineEndDate - timelineStartDate;
var tlTimeUnit = tlLenght/timeLenght;
var tlMarkerWidth = tlTimeUnit*timelineMarkerUnit;
var tlMarkerAmount = tlLenght/tlMarkerWidth;




function pointConverter(dateVal) {
  var pointVal;

  dateMinStart = dateVal - timelineStartDate;
  pointVal = timelineMargin+(dateMinStart*tlTimeUnit);


  return pointVal;
}
