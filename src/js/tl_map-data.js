var timelineDataArr = [];
// get the original data
var originalTimelineData = timelineDataAor.timelineItems;


function mapTimelineData() {

  var mappingValues = [
    { "newfield": "startDate1",       "oldfield": "date-s1"},
    { "newfield": "startDate2",       "oldfield": "date-s2"},
    { "newfield": "endDate1",         "oldfield": "date-e1"},
    { "newfield": "endDate2",         "oldfield": "date-e2"},
    { "newfield": "type",             "oldfield": "type"},
    { "newfield": "title",            "oldfield": "shelfmark"},
    { "newfield": "label1",           "oldfield": "title"},
    { "newfield": "label2",           "oldfield": "origin"}
  ]

  // go through originalTimelineData and map above values to the original data
  for (var i = 0; i < originalTimelineData.length; i++) {
    timelineDataArr.push({})

    // use mappingValues array to map the filed
    var pushVar ='{';
    for (var j = 0; j < mappingValues.length; j++) {

      timelineDataArr[i][mappingValues[j].newfield] =  originalTimelineData[i][mappingValues[j].oldfield];
    }
  }
}
