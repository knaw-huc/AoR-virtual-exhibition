
// Folioparts  ///

document.onreadystatechange = () => {
if (document.readyState === 'complete') {

  connectSquares([60.941,50.816],[63.798,53.121],[81.264,51.113], [83.678,53.617]); connectSquares([64.828, 53.618],[67.241, 55.380],[82.759, 57.421], [85.977, 59.369]); connectSquares([58.966, 56.215],[61.609, 58.256],[83.218, 63.265], [85.977, 65.492]); connectSquares([79.770, 68.089],[81.839, 70.315],[86.207, 71.707], [88.506, 74.583]);






  //create highlightSquar
  function highlightSquar(p1a,p1b) {
    var p1a = convertPercent2px(p1a[0], p1a[1]);
    var p1b = convertPercent2px(p1b[0], p1b[1]);
    var w = p1b[0]-p1a[0];
    var h = p1b[1]-p1a[1];
    var style1 = ' class="aorHighLightStroke" />';
    var rect = '<rect x="'+p1a[0]+'" y="'+p1a[1]+'" width="'+w+'" height="'+h+'" ';
    document.getElementById('imgGr').innerHTML +=rect+style1;
    style1 = ' class="maskFill" />';
    document.getElementById('m1').innerHTML +=rect+style1;

  }


  function plotLine(pa,pb) {
    var paX = convertPercent2px(pa[0], pa[1])[0];
    var paY = convertPercent2px(pa[0], pa[1])[1];
    var pbX = convertPercent2px(pb[0], pb[1])[0];
    var pbY = convertPercent2px(pb[0], pb[1])[1];
    var line = '<line x1="'+paX+'" y1="'+paY+'" x2="'+pbX+'" y2="'+pbY+'" class="aorHighLightStroke" />';
    document.getElementById('imgGr').innerHTML +=line;

  }


  function connectSquares(p1a,p1b,p2a,p2b) {
    highlightSquar(p1a,p1b);
    highlightSquar(p2a,p2b);

    var paX,paY,pbX,pbY;
    paX = p1b[0];
    paY = p1a[1]+ ((p1b[1] - p1a[1])/2);
    pbX = p2a[0];
    pbY = p2a[1]+ ((p2b[1] - p2a[1])/2);
    plotLine([paX,paY],[pbX,pbY])

  }


  function convertPercent2px(x,y) {
    var out;
    var size = getImageDimension('imgg');
    var x2 = (x/100)*size.w;
    var y2 = (y/100)*size.h;
    out = [x2,y2];
    return out;
  }


}
};


function getImageDimension(elemId) {
  var element = document.getElementById(elemId);
  var positionInfo = element.getBoundingClientRect();
  var height = positionInfo.height;
  var width = positionInfo.width;
  console.log('w'+width);

  return {"h":height, "w":width};
}







// TABS //
// use .hcTabLabel for labels
// use .hcTabContent for the content divs.

// use a unique id with both pre codes
var preListVal = "tab-list-";
var preContentVal = "tab-content-";

//go through al buttons
var handleTabLabel = document.querySelectorAll(".hcTabLabel");
  for (i = 0; i < handleTabLabel.length; i++) {
    var selectedTab = handleTabLabel[i];
    if (i==0) {
      var firstTabId = selectedTab.getAttribute('id');
    }
    handleTabLabel[i].addEventListener('click', handleTabs, selectedTab);


}


//handle the name of the tab
function handleTabs(selectedTab) {
  // hide all
  hideTabContent();

  var elementId = selectedTab.srcElement.id;
  var tabCore = elementId.replace(preListVal, "");
  makeTabVisable(tabCore);
}

// make one tab visable by core ID
function makeTabVisable(contentId) {
  document.getElementById(preContentVal+contentId).style.display= 'flex';
}

// hide all tabs
function hideTabContent() {
  var handleTabVis = document.querySelectorAll(".hcTabContent");
    for (i = 0; i < handleTabVis.length; i++) {
      handleTabVis[i].style.display= 'none';
  }
}

// show the first tab
function firstTabVisable() {
  hideTabContent();
  var firstTabCore = firstTabId.replace(preListVal, "");
  makeTabVisable(firstTabCore);
}

firstTabVisable();
