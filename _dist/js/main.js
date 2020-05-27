
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

var handleTabLabel = document.querySelectorAll(".aorNoteA");
  for (i = 0; i < handleTabLabel.length; i++) {
    handleTabLabel[i].removeAttribute("href");

    var selectedTab = handleTabLabel[i];
    handleTabLabel[i].addEventListener('click', noteClick, selectedTab);
}

function noteClick(id) {
  var footnoteId = id.target.id
  footnoteId = footnoteId.replace("footnote-ref-", "footnote-");

  var noteContent = document.getElementById(footnoteId).innerHTML;
  document.getElementById('noteBlockContent').innerHTML= noteContent;
  document.getElementById("noteBlock").style.display = 'block';
}


function closeNote() {
  document.getElementById("noteBlock").style.display = 'none';
}

function modalLoad(id) {
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

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
