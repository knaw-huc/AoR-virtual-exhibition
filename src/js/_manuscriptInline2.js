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
  document.getElementById(preContentVal+'3'+contentId).style.display= 'flex';
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
  var handleTabVis = document.querySelectorAll(".aorFoliosCaption .hcTabContent:first-child, .aorFoliosManuscript .hcTabContent:first-child, .aorFoliosManuscript .hcTabContent:first-child, .hcTabContent:first-child");

    for (i = 0; i < handleTabVis.length; i++) {
      //handleTabVis[i].style.display= 'none';
      handleTabVis[i].style.display= 'flex';
    }

}

function zoomImg(imgId, zoom, margin){
  var allImages = document.querySelectorAll('#'+imgId+' img');
  var zoomVal= zoom*100;

  for (var i = 0; i < allImages.length; i++) {
    if (zoom > 1) {
      allImages[i].style.width = '100%';
      allImages[i].style.height = 'auto';
    }

    allImages[i].style.marginTop = 0 - margin+'px';
  }



}


function viewfc(id){
  console.log(id);
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
  console.log(element);
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
  //layer.style.opacity = 1;
  var staticW = zoomer.getAttribute('data-w');
  var staticH = zoomer.getAttribute('data-h');

  getMeta(images[0].src);
  //console.log(images[0].src);


  var rect = zoomer.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var x = rect.left + scrollLeft;
  var y = rect.top + scrollTop;


  var xPercent = ((e.pageX - x)/staticW)*100;
  var yPercent = ((e.pageY - y)/staticH)*100;



  var xDiv = (((layer.clientWidth/2)/100)*xPercent);
  var yDiv = (((layer.clientHeight-staticH)/100)*yPercent);


  layer.style.marginTop = 0-yDiv+'px';
  layer.style.marginLeft = 0-xDiv+'px';



}


function getMeta(url){
    var img = new Image();
    img.onload = function(){
        //console.log( this.width+' '+ this.height );
        return {w:this.width, h:this.height}
    };
    img.src = url;
}
