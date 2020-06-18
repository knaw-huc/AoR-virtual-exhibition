var svgThemes = document.querySelectorAll(".svgTheme");
  for (i = 0; i < svgThemes.length; i++) {
    var selectedTheme = svgThemes[i];

    svgThemes[i].addEventListener('mouseover', highlightTheme, selectedTheme);
}

function highlightTheme(theNr) {


  var dendd = theNr.originalTarget.id.replace("svgT", "");

  var svgThemes = document.querySelectorAll(".aorHomeThem");
    for (i = 0; i < svgThemes.length; i++) {
      svgThemes[i].classList.remove("aorThemeHighlight");
  }

  document.getElementById('thm'+dendd).classList.add("aorThemeHighlight");
}
