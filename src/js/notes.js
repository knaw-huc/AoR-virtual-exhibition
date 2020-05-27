var handleTabLabel = document.querySelectorAll(".aorNoteA");
  for (i = 0; i < handleTabLabel.length; i++) {
    handleTabLabel[i].removeAttribute("href");

    var selectedTab = handleTabLabel[i];
    handleTabLabel[i].addEventListener('click', noteClick, selectedTab);
}

function noteClick(id) {
  var footnoteId = id.target.id
  footnoteId = footnoteId.replace("footnote-ref-", "footnote-");

  var noteContent = document.getElementById(footnoteId).innerHTML;
  document.getElementById('noteBlockContent').innerHTML= noteContent;
  document.getElementById("noteBlock").style.display = 'block';
}


function closeNote() {
  document.getElementById("noteBlock").style.display = 'none';
}
