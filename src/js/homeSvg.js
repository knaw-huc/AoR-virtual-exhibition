var svgThemes = document.querySelectorAll(".svgTheme");
  for (i = 0; i < svgThemes.length; i++) {
    var selectedTheme = svgThemes[i];

    svgThemes[i].addEventListener('mouseover', highlightTheme, selectedTheme);
    svgThemes[i].addEventListener('click', clickTheme, selectedTheme);
}

function highlightTheme(theNr) {

  var dendd = theNr.originalTarget.id.replace("svgT", "");

  var svgThemes = document.querySelectorAll(".aorHomeThem");
    for (i = 0; i < svgThemes.length; i++) {
      svgThemes[i].classList.remove("aorThemeHighlight");
  }

  document.getElementById('thm'+dendd).classList.add("aorThemeHighlight");
}


function clickTheme(theNr) {
    var dendd = theNr.originalTarget.id.replace("svgT", "");
    var dendd2 = document.getElementById('thm'+dendd).getElementsByTagName('a')[0].href;
    location.href = dendd2;

  console.log(dendd2);
}
