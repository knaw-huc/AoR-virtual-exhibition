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
