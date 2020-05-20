var preListVal = "tab-list-";
var preContentVal = "tab-content-";
var firstTabId = '';

hideTabContent();
firstTabVisable();

var handleTabLabel = document.querySelectorAll(".hcTabLabel");
  for (i = 0; i < handleTabLabel.length; i++) {
    var selectedTab = handleTabLabel[i];
    if (i==0) {
      firstTabId = selectedTab.getAttribute('id');
    }
    handleTabLabel[i].addEventListener('click', handleTabs, selectedTab);


}


//handle the name of the tab
function handleTabs(selectedTab) {

  //console.log(selectedTab.target.id);


  var elementId = selectedTab.srcElement.id;
  var tabCore = elementId.replace(preListVal, "");
  var compId = document.getElementById(elementId).parentNode.id
  compId = compId.replace("f_", "");
  hideTabContent(compId);
  makeTabVisable(tabCore,compId);
}


function makeTabVisable(contentId,compId) {
  document.getElementById(preContentVal+contentId).style.display= 'flex';
  document.getElementById(preContentVal+'2'+contentId).style.display= 'flex';
}

// hide all tabs
function hideTabContent(compId) {
  var comp = ''
  var handleTabVis = [];

  if (typeof compId !== "undefined") {
    comp  = '#'+compId;
    handleTabVis = document.querySelectorAll(comp+" .hcTabContent");
  }
  else {
    handleTabVis = document.querySelectorAll(".hcTabContent");
  }


  //var handleTabVis = document.querySelectorAll(".hcTabContent");
  console.log(handleTabVis);
    for (i = 0; i < handleTabVis.length; i++) {
      handleTabVis[i].style.display= 'none';
  }
}



function firstTabVisable() {
  var handleTabVis = document.querySelectorAll(".aorFoliosCaption .hcTabContent:first-child, .aorFoliosManuscript .hcTabContent:first-child");

    for (i = 0; i < handleTabVis.length; i++) {
      //handleTabVis[i].style.display= 'none';
      handleTabVis[i].style.display= 'flex';
    }

}
