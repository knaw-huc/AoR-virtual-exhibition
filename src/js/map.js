  hidesvgG();

function highLightMap(className) {
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
  var handleTabLabel = document.querySelectorAll(".mapG");
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
