function matterDisplay(name) {
  if (
    name == "challenge12" ||
    player.currentChallenge == "postc1" ||
    player.currentChallenge == "postc6"
  )
    document.getElementById("matter").style.display = "block";
  else document.getElementById("matter").style.display = "none";
}

function quickResetDisplay(name) {
  if (
    name == "challenge12" ||
    name == "challenge9" ||
    name == "challenge5" ||
    player.currentChallenge == "postc1" ||
    player.currentChallenge == "postc4" ||
    player.currentChallenge == "postc5" ||
    player.currentChallenge == "postc6" ||
    player.currentChallenge == "postc8"
  ) {
    document.getElementById("quickReset").style.display = "inline-block";
  } else document.getElementById("quickReset").style.display = "none";
}
