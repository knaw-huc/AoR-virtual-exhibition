function showReadMore() {

  var hidddenHide = document.querySelector(".msHide");
  var hiddden = hidddenHide.querySelectorAll(".aoRow");

  for (i = 0; i < hiddden.length; i++) {
    hiddden[i].style.display = 'flex';
  }
  document.getElementById("rm1").style.display = 'block';
}
