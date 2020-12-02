
var urlParams = new URLSearchParams(window.location.search);
if(urlParams.get('open') == 'tr'){
  showReadMore();
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
