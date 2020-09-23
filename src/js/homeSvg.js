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
