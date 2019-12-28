
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
