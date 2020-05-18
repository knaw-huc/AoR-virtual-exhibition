
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
