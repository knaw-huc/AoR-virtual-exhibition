var svgThemes = document.querySelectorAll(".svgTheme");
console.log(svgThemes);
  for (i = 0; i < svgThemes.length; i++) {
    var selectedTheme = svgThemes[i];

    svgThemes[i].addEventListener('mouseover', highlightTheme, selectedTheme);
    svgThemes[i].addEventListener('mouseout', removeMouseOver);
    svgThemes[i].addEventListener('click', clickTheme, selectedTheme);
}

function highlightTheme(theNr) {
  console.log(theNr);

  var dendd = theNr.target.id.replace("svgT", "");
  console.log('dendd',dendd);

  var svgThemes = document.querySelectorAll(".aorHomeThem");
    for (i = 0; i < svgThemes.length; i++) {
      svgThemes[i].classList.remove("aorThemeHighlight");

  }

  document.getElementById('thm'+dendd).classList.add("aorThemeHighlight");
  this.style.opacity = '0.2';
}


function clickTheme(theNr) {
    var dendd = theNr.target.id.replace("svgT", "");
    var dendd2 = document.getElementById('thm'+dendd).getElementsByTagName('a')[0].href;
    location.href = dendd2;

  //console.log(dendd2);
}


function removeMouseOver() {
  var svgThemes = document.querySelectorAll(".svgTheme");
    for (i = 0; i < svgThemes.length; i++) {
      svgThemes[i].style.opacity = '0';

  }
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
  console.log(contentId);
  document.getElementById(preContentVal+contentId).style.display= 'flex';
  document.getElementById(preContentVal+'2'+contentId).style.display= 'flex';

  var viewWindow = document.getElementById(preContentVal+'3'+contentId);

  viewWindow.style.display= 'flex';

  viewWindow.setAttribute('data-h', viewWindow.offsetHeight);
  viewWindow.setAttribute('data-w', viewWindow.offsetWidth);
}

// hide all tabs
function hideTabContent(compId) {
  var comp = ''
  var handleTabVis = [];

  if (typeof compId !== "undefined") {
    comp  = '#c_'+compId;
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
  var handleTabVis = document.querySelectorAll(".aorFoliosCaption .hcTabContent:first-child, .aorFoliosManuscript .hcTabContent:first-child, .aorFoliosManuscript .hcTabContent:first-child, .hcTabContent:first-child");

    for (i = 0; i < handleTabVis.length; i++) {
      //handleTabVis[i].style.display= 'none';
      handleTabVis[i].style.display= 'flex';
    }

}

function zoomImg(imgId){
  //console.log(document.getElementById(imgId));
  //var allImages = document.querySelectorAll('#'+imgId+' img');
  // var zoomVal= zoom*100;
  //
  // for (var i = 0; i < allImages.length; i++) {
  //   if (zoom > 1) {
  //     allImages[i].style.width = '100%';
  //     allImages[i].style.height = 'auto';
  //   }
  //
  //   allImages[i].style.marginTop = 0 - margin+'px';
  // }

}


function viewfc(id){
  //console.log(id);
  var content = document.getElementById(id).innerHTML;
  document.getElementById('aorImgFScontent').innerHTML = content;
  document.getElementById('aorImgFS').style.display = 'flex';

  var allImages = document.querySelectorAll('#aorImgFScontent img');



  for (var i = 0; i < allImages.length; i++) {

      allImages[i].style.width = 'auto';
      allImages[i].style.height = '95vh';
      allImages[i].style.marginTop ='0px';

  }
  allImages = document.querySelectorAll('#aorImgFScontent img');

  var element = allImages[0];
  //console.log(element);
  var positionInfo = element.getBoundingClientRect();
  var eWidth = positionInfo.offsetWidth;
  document.getElementById('aorImgFScontent').style.width = eWidth;

  // var zoomId = 'zoom-'+id;
  // console.log(zoomId);
  //
  // var myobj = document.getElementById('zoom-'+id);
  // myobj.remove();

}


function closeViewfc(){

  document.getElementById('aorImgFS').style.display= 'none';
}


function zoom(e){
  var zoomer = e.currentTarget;
  var images = zoomer.querySelectorAll('img');
  var layer = zoomer.querySelector('.zoomOverlay');
  //console.log(zoomer);

  var staticW = zoomer.getAttribute('data-w');
  var staticH = zoomer.getAttribute('data-h');


  var imgW = images[0].getAttribute('data-imgw');
  var imgH = images[0].getAttribute('data-imgh');


  var rect = zoomer.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var x = rect.left + scrollLeft;
  var y = rect.top + scrollTop;


  var xPercent = ((e.pageX - x)/staticW)*100;
  var yPercent = ((e.pageY - y)/staticH)*100;



  var xDiv = ( (imgW-staticW )/100)*xPercent;
  var yDiv = ( (imgH-staticH )/100)*yPercent;
  //console.log(yDiv,imgH,yPercent);


  layer.style.left = 0-( xDiv ) +'px';
  layer.style.top =  0-( yDiv ) +'px';



}


function getMeta(id){
    var elemSrc = document.getElementById(id);
    //console.log(elemSrc);
    var img = new Image();
    var out = {}
    img.onload = function(){
      viewerImages(id, this.width, this.height)
      elemSrc.setAttribute('data-imgh', this.height);
			elemSrc.setAttribute('data-imgw', this.width);
      elemSrc.setAttribute('height', this.height);
      elemSrc.setAttribute('width', this.width);
    };
    img.src = elemSrc.src;
    //return out
}

function viewerImages(id, w, h) {
  var elem = document.getElementById(id);
  if (w>h) {
    elem.style.width = '100%';
    elem.style.height = 'auto'
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
  console.log(id);
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  var elem = document.getElementById('aorPlayer');
  if (elem) {
    stopVideo( elem );
  }
}


var stopVideo = function ( element ) {
    var iframe = element.querySelector( 'iframe');
    var video = element.querySelector( 'video' );
    if ( iframe !== null ) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
    }
    if ( video !== null ) {
        video.pause();
    }
};

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

document.getElementById('ht_'+sectionId).classList.add("aorCurrPage");

  hidesvgG();


function mapShowManuscripts(i) {
  console.log(i);
  hidesvgG();
  //handleTabLabel[i].style.display = 'block';
  document.getElementById(i).style.display = 'block';
  //
}


function highLightMap(className) {
  console.log(className);
  var classN = className.replace(/ /g, "");
  classN = classN.replace(/,/g, "");
  classN = classN.replace(/\(/g, "");
  classN = classN.replace(/\)/g, "");
  var out = classN.replace(/\./g, "");

  console.log(out);
  hidesvgG();
  handleMapG(out);
}


function hidesvgG() {
  var handleTabLabel = document.querySelectorAll(".mapHideManuscripts");
    for (i = 0; i < handleTabLabel.length; i++) {
      handleTabLabel[i].style.display = 'none';
  }
}

function handleMapG(clsName) {
  var handleTabLabel = document.querySelectorAll("."+clsName);
    for (i = 0; i < handleTabLabel.length; i++) {
      handleTabLabel[i].style.display = 'block';
  }
}

function showReadMore() {

  var hidddenHide = document.querySelector(".msHide");
  var hiddden = hidddenHide.querySelectorAll(".aoRow");

  for (i = 0; i < hiddden.length; i++) {
    hiddden[i].style.display = 'flex';
  }
  document.getElementById("rm1").style.display = 'block';
  document.getElementById("rmb1").style.display = 'flex';
  document.getElementById("rmb2").style.display = 'block';
  document.getElementById("rmb3").style.display = 'block';
}
