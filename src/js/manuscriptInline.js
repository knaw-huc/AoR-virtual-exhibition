
// Folioparts  ///








// TABS //
// use .hcTabLabel for labels
// use .hcTabContent for the content divs.

// use a unique id with both pre codes
var preListVal = "tab-list-";
var preContentVal = "tab-content-";
var firstTabId = '';

//go through al buttons
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

  console.log(selectedTab.target.id);
  if (selectedTab.target.id == 'tab-list-2') {
    document.getElementById('f2').style.display= 'block';
    document.getElementById('vlf48_30_v').setAttribute('viewBox', '500 1050 850 800');
  } else {
    document.getElementById('f2').style.display= 'none';
    document.getElementById('vlf48_30_v').setAttribute('viewBox', '0 0 1899 2353');
  }



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
  if (firstTabId != '') {
    var firstTabCore = firstTabId.replace(preListVal, "");
    makeTabVisable(firstTabCore);
  }
}

firstTabVisable();
