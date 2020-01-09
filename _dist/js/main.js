
if (pageId == 'home') {
  //paper
  document.getElementById('_x31_paper').addEventListener("mouseover", function(){
      document.getElementById('th1').style.display = "block";
  });

  document.getElementById("_x31_paper").addEventListener("mouseout", function(){
      document.getElementById('th1').style.display = "none";
  });

  document.getElementById("_x31_paper").addEventListener("click", function(){
    document.location = '/theme1.html'
  });






  // pen
  document.getElementById('_x32_pen').addEventListener("mouseover", function(){
      document.getElementById('th2').style.display = "block";
  });

  document.getElementById("_x32_pen").addEventListener("mouseout", function(){
      document.getElementById('th2').style.display = "none";
  });
  document.getElementById("_x32_pen").addEventListener("click", function(){
    document.location = '/theme2.html'
  });







  //cup
  document.getElementById('_x33_cup').addEventListener("mouseover", function(){
      document.getElementById('th3').style.display = "block";
  });

  document.getElementById("_x33_cup").addEventListener("mouseout", function(){
      document.getElementById('th3').style.display = "none";
  });
  document.getElementById("_x33_cup").addEventListener("click", function(){
    document.location = '/theme3.html'
  });
}


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

var toggleVars = [];

function initToggle() {
  var allToggles = document.getElementsByClassName('aorToggle');
  for (var i = 0; i < allToggles.length; i++) {
    toggleVars.push({id: allToggles[i].id, state:false, guiDiv: allToggles[i].dataset.div});
  }
  //console.log(toggleVars);
}
initToggle();



function toggleVis(elem) {

    // set false or true
    for (var i = 0; i < toggleVars.length; i++){
      if (toggleVars[i].id == elem){
        if (toggleVars[i].state) {
          toggleVars[i].state = false;
        }else {
          toggleVars[i].state = true;
        }
      }
    }

    // set the states
    for (var i = 0; i < toggleVars.length; i++) {
      if (toggleVars[i].state) {
        document.getElementById(toggleVars[i].guiDiv).style.display = "flex";
      } else {
        document.getElementById(toggleVars[i].guiDiv).style.display = "none";
      }
    }




console.log(toggleVars);
}








// function myFunction(x) {
//   if (x.matches) { // If media query matches
//     document.body.style.backgroundColor = "yellow";
//   } else {
//     document.body.style.backgroundColor = "pink";
//   }
// }
//
// var x = window.matchMedia("(max-width: 700px)")
// //myFunction(x) // Call listener function at run time
// //x.addListener(myFunction) // Attach listener function on state changes
