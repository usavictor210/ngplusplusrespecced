// Time studies
function checkIfTTNaN() {
  if (isNaN(player.timestudy.theorem)) {
    player.timestudy.theorem = 0;
    player.timestudy.amcost = new Decimal("1e20000");
    player.timestudy.ipcost = new Decimal(1);
    player.timestudy.epcost = new Decimal(1);
  }
}

function buyWithAntimatter() {
  checkIfTTNaN();
  if (player.money.gte(player.timestudy.amcost)) {
    player.money = player.money.minus(player.timestudy.amcost);
    player.timestudy.amcost = player.timestudy.amcost.times(
      new Decimal("1e20000")
    );
    player.timestudy.theorem += 1;
    updateTheoremButtons();
    updateTimeStudyButtons();
    return true;
  } else return false;
}

function buyWithIP() {
  checkIfTTNaN();
  if (player.infinityPoints.gte(player.timestudy.ipcost)) {
    player.infinityPoints = player.infinityPoints.minus(
      player.timestudy.ipcost
    );
    player.timestudy.ipcost = player.timestudy.ipcost.times(1e100);
    player.timestudy.theorem += 1;
    updateTheoremButtons();
    updateTimeStudyButtons();
    return true;
  } else return false;
}

function buyWithEP() {
  checkIfTTNaN();
  if (player.eternityPoints.gte(player.timestudy.epcost)) {
    if (player.timeDimension1.bought < 1) {
      buyTimeDimension(1);
      $.notify("One 1st Time Dimension was bought.", "error"); // because notifications were just stupid
      return false;
    }
    player.eternityPoints = player.eternityPoints.minus(
      player.timestudy.epcost
    );
    player.timestudy.epcost = player.timestudy.epcost.times(2);
    player.timestudy.theorem += 1;
    updateTheoremButtons();
    updateTimeStudyButtons();
    updateEternityUpgrades();
    return true;
  } else return false;
}

function maxTheorems() {
  checkIfTTNaN();
  var AMowned = player.timestudy.amcost.e / 20000 - 1;
  if (player.money.gte(player.timestudy.amcost)) {
    player.timestudy.amcost.e = Math.floor(player.money.e / 20000 + 1) * 20000;
    player.timestudy.theorem += Math.floor(player.money.e / 20000) - AMowned;
    player.money = player.money.minus(
      Decimal.fromMantissaExponent(
        1,
        Math.floor(player.money.e / 20000) * 20000
      )
    );
  }
  var IPowned = player.timestudy.ipcost.e / 100;
  if (player.infinityPoints.gte(player.timestudy.ipcost)) {
    player.timestudy.ipcost.e =
      Math.floor(player.infinityPoints.e / 100 + 1) * 100;
    player.timestudy.theorem +=
      Math.floor(player.infinityPoints.e / 100 + 1) - IPowned;
    player.infinityPoints = player.infinityPoints.minus(
      Decimal.fromMantissaExponent(
        1,
        Math.floor(player.infinityPoints.e / 100) * 100
      )
    );
  }
  // this code is not really needed and I don't know math well enough to make it work
  /*var EPowned = Math.floor(player.timestudy.epcost.log2())
  if (player.eternityPoints.gte(player.timestudy.epcost)) {
    player.timestudy.epcost = new Decimal(1).times(new Decimal(2).pow(Math.floor(player.eternityPoints.log2() + 1)))
    player.timestudy.theorem += Math.floor(player.eternityPoints.log2() + 1) - EPowned
  }*/
  // If for some reason we can't buy a TT with EP, we definitely can't buy any more with TT.
  if (buyWithEP()) {
    var canBuyNumber = Math.floor(player.eternityPoints.log2()) - 1;
    var nextCost = Decimal.pow(2, canBuyNumber).times(2);
    var costUpTo = nextCost.minus(player.timestudy.epcost);
    if (nextCost.gt(player.timestudy.epcost)) {
      player.timestudy.theorem += Math.floor(
        canBuyNumber + 1 - player.timestudy.epcost.log(2)
      );
      player.timestudy.epcost = nextCost;
    }
  }
  buyWithEP();
  updateTheoremButtons();
  updateTimeStudyButtons();
  updateEternityUpgrades();
}

function updatePenalty() {
  // "In the grim darkness of the far endgame"'s reward
  document.getElementById(
    "131penalty"
  ).innerHTML = player.achievements.includes("r143")
    ? "You can get 50% more replicanti galaxies."
    : "Automatic replicanti galaxies are disabled, but you can get 50% more.";
  document.getElementById(
    "132penalty"
  ).innerHTML = player.achievements.includes("r143")
    ? "Replicanti galaxies are 50% stronger."
    : "Replicanti galaxies are 40% stronger.";
  document.getElementById(
    "133penalty"
  ).innerHTML = player.achievements.includes("r143")
    ? "Replicanti galaxies are 50% stronger."
    : "Replicanti interval is 10x slower if replicanti is less than " + shortenMoney(Number.MAX_VALUE) + ", but RGs are 50% stronger.";
}
function updateTheoremButtons() {
  if (player.dilation.upgrades.includes(17)) {
    document.getElementById("theoremmax").style.display = "none";
    document.getElementById("theoremam").style.display = "none";
    document.getElementById("theoremip").style.display = "none";
    document.getElementById("theoremep").style.display = "none";
    document.getElementById("timetheorems").style.bottom = "0";
    document.getElementById("layout1").style.bottom = "-3px";
    document.getElementById("layout2").style.bottom = "-3px";
    document.getElementById("layout3").style.bottom = "-3px";
    document.getElementById("studytreeloadsavetext").style.bottom = "-3px";
    document.getElementById("theorembuybackground").style.bottom = "-80px";
  } else {
    document.getElementById("theoremmax").style.display = "";
    document.getElementById("theoremam").style.display = "";
    document.getElementById("theoremip").style.display = "";
    document.getElementById("theoremep").style.display = "";
    document.getElementById("timetheorems").style.bottom = "80px";
    document.getElementById("layout1").style.bottom = "77px";
    document.getElementById("layout2").style.bottom = "77px";
    document.getElementById("layout3").style.bottom = "77px";
    document.getElementById("studytreeloadsavetext").style.bottom = "77px";
    document.getElementById("theorembuybackground").style.bottom = "0";
    document.getElementById("theoremam").className = player.money.gte(
      player.timestudy.amcost
    )
      ? "timetheorembtn"
      : "timetheorembtnlocked";
    document.getElementById("theoremip").className = player.infinityPoints.gte(
      player.timestudy.ipcost
    )
      ? "timetheorembtn"
      : "timetheorembtnlocked";
    document.getElementById("theoremep").className = player.eternityPoints.gte(
      player.timestudy.epcost
    )
      ? "timetheorembtn"
      : "timetheorembtnlocked";
    document.getElementById("theoremep").innerHTML =
      "Buy Time Theorems <br>Cost: " +
      shortenDimensions(player.timestudy.epcost) +
      " EP";
    document.getElementById("theoremip").innerHTML =
      "Buy Time Theorems <br>Cost: " +
      shortenCosts(player.timestudy.ipcost) +
      " IP";
    document.getElementById("theoremam").innerHTML =
      "Buy Time Theorems <br>Cost: " +
      shortenCosts(player.timestudy.amcost) +
      " AM";
  }
  document.getElementById(
    "theoremmax"
  ).innerHTML = player.achievements.includes("r155")
    ? "Auto buy theorems: O" + (player.timestudy.autobuyer ? "N" : "FF")
    : "Buy max Theorems";
  document.getElementById("timetheorems").innerHTML =
    "You have <span style='display:inline' class=\"TheoremAmount\">" +
    (player.timestudy.theorem > 99999
      ? shortenMoney(player.timestudy.theorem)
      : formatInfOrEter(Math.floor(player.timestudy.theorem))) +
    "</span> Time Theorem" +
    (player.timestudy.theorem == 1 ? "." : "s.");
}

function toggleAutoTT() {
  // taken from aarex, but...
  if (
    player.achievements.includes("r155") &&
    player.timestudy.autobuyer != undefined
  ) {
    player.timestudy.autobuyer = !player.timestudy.autobuyer;
  } else if (player.timestudy.autobuyer == undefined)
    player.timestudy.autobuyer = false;
  else maxTheorems();
}

function autoTTCycle() {
  if (player.timestudy.autobuyer == undefined)
    player.timestudy.autobuyer = false;
  if (
    player.achievements.includes("r155") &&
    player.timestudy.autobuyer &&
    !player.dilation.upgrades.includes(17)
  )
    maxTheorems();
}

function buyTimeStudy(name, cost, check) {
  //checks for if you can buy studies, can be changed for 201 eventually
  if (shiftDown && check === undefined) studiesUntil(name);
  else if (
    player.timestudy.theorem >= cost &&
    canBuyStudy(name) &&
    !player.timestudy.studies.includes(name)
  ) {
    player.timestudy.studies.push(name);
    player.timestudy.theorem -= cost;
    if (name == 71 || name == 81 || name == 91 || name == 101) {
      document.getElementById("" + name).className =
        "timestudybought normaldimstudy";
    } else if (name == 72 || name == 82 || name == 92 || name == 102) {
      document.getElementById("" + name).className =
        "timestudybought infdimstudy";
    } else if (name == 73 || name == 83 || name == 93 || name == 103) {
      document.getElementById("" + name).className =
        "timestudybought timedimstudy";
    } else if (name == 121 || name == 131 || name == 141) {
      document.getElementById("" + name).className =
        "timestudybought activestudy";
    } else if (name == 122 || name == 132 || name == 142) {
      document.getElementById("" + name).className =
        "timestudybought passivestudy";
    } else if (name == 123 || name == 133 || name == 143) {
      document.getElementById("" + name).className =
        "timestudybought idlestudy";
    } else if (
      name == 221 ||
      name == 224 ||
      name == 225 ||
      name == 228 ||
      name == 231 ||
      name == 234
    ) {
      document.getElementById(name).className = "timestudybought darkstudy";
    } else if (
      name == 222 ||
      name == 223 ||
      name == 226 ||
      name == 227 ||
      name == 232 ||
      name == 233
    ) {
      document.getElementById(name).className = "timestudybought lightstudy";
    } else if (eternalStudy.includes(name)) {
      document.getElementById(name).className = "timestudybought diltimestudy";
    } else document.getElementById("" + name).className = "timestudybought";
    if (name == 131 && !player.achievements.includes("r143")) {
      if (player.replicanti.galaxybuyer)
        document.getElementById("replicantiresettoggle").textContent =
          "Auto galaxy ON (disabled)";
      else
        document.getElementById("replicantiresettoggle").textContent =
          "Auto galaxy OFF (disabled)";
    }
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
    if (name == 272) resetInfMult(); // make it retroactive
  }
}

function buyDilationStudy(name, cost) {
  if (
    player.timestudy.theorem >= cost &&
    canBuyDilationStudy(name) &&
    !player.dilation.studies.includes(name)
  ) {
    if (name === 1) {
      showEternityTab("dilation");
      document.getElementById("dilstudy1").innerHTML =
        "Unlock time dilation<span>Cost: 5000 Time Theorems";
    }
    if (name === 6) {
      // take player to meta dimensions and give achievement
      giveAchievement("I'm so meta");
      showTab("dimensions");
      showDimTab("metadimensions");
      document.getElementById("mdtabbtn").style.display = "inline-block";
      document.getElementById("mddilupg").style.display = "";
    }
    player.dilation.studies.push(name);
    player.timestudy.theorem -= cost;
    document.getElementById("dilstudy" + name).className = "dilationupgbought";
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
}

function hasRow(row) {
  for (var i = 0; i < player.timestudy.studies.length; i++) {
    if (Math.floor(player.timestudy.studies[i] / 10) == row) return true;
  }
}

function canBuyStudy(name) {
  var row = Math.floor(name / 10);
  var col = name % 10;

  if (name == 33) {
    if (player.timestudy.studies.includes(21)) return true;
    else return false;
  }
  if (name == 62) {
    if (
      player.eternityChalls.eterc5 !== undefined &&
      player.timestudy.studies.includes(42)
    )
      return true;
    else return false;
  }

  if ((name == 71 || name == 72) && player.eternityChallUnlocked == 12) {
    return false;
  }

  if ((name == 72 || name == 73) && player.eternityChallUnlocked == 11) {
    return false;
  }

  if (name == 181) {
    if (
      player.eternityChalls.eterc1 !== undefined &&
      player.eternityChalls.eterc2 !== undefined &&
      player.eternityChalls.eterc3 !== undefined &&
      player.timestudy.studies.includes(171)
    )
      return true;
    else return false;
  }
  if (name == 201)
    if (
      player.timestudy.studies.includes(192) &&
      !player.dilation.upgrades.includes(10)
    )
      return true;
    else return false;
  if (name == 211 || name == 212)
    if (player.timestudy.studies.includes(191)) return true;
    else return false;
  if (name == 213 || name == 214)
    if (player.timestudy.studies.includes(193)) return true;
    else return false;
  if (name == 281)
    if (player.timestudy.studies.includes(271)) return true;
    else return false;
  if (name == 285)
    if (player.timestudy.studies.includes(272)) return true;
    else return false;
  if (name == 282)
    if (
      !player.timestudy.studies.includes(283) &&
      !player.timestudy.studies.includes(284) &&
      (player.timestudy.studies.includes(271) ||
        player.timestudy.studies.includes(272))
    )
      return true;
    else return false;
  if (name == 283)
    if (
      player.timestudy.studies.includes(282) ||
      player.timestudy.studies.includes(284)
    )
      return true;
    else return false;
  if (name == 284)
    if (
      !player.timestudy.studies.includes(282) &&
      !player.timestudy.studies.includes(283) &&
      (player.timestudy.studies.includes(271) ||
        player.timestudy.studies.includes(272))
    )
      return true;
    else return false;
  switch (row) {
    case 1:
      if (player.timeDimension1.bought >= 1) return true;
      else return false;
      break;

    case 2:
    case 5:
    case 6:
    case 11:
    case 15:
    case 16:
    case 17:
    case 24:
      if (hasRow(row - 1)) return true;
      else return false;
      break;

    case 3:
    case 4:
    case 8:
    case 9:
    case 10:
    case 13:
    case 14:
      if (player.timestudy.studies.includes((row - 1) * 10 + col)) return true;
      else return false;
      break;

    case 12:
      if (hasRow(row - 1) && !hasRow(row)) return true;
      else return false;
      break;

    case 7:
      if (player.dilation.upgrades.includes(10)) {
        if (player.timestudy.studies.includes(61)) return true;
        else return false;
      } else if (!player.timestudy.studies.includes(201)) {
        if (player.timestudy.studies.includes(61) && !hasRow(row)) return true;
        else return false;
      } else {
        if (
          player.timestudy.studies.filter(function(x) {
            return Math.floor(x / 10) == 7;
          }).length < 2
        )
          return true;
        else return false;
      }
      break;

    case 19:
      if (
        player.eternityChalls.eterc10 !== undefined &&
        player.timestudy.studies.includes(181)
      )
        return true;
      else return false;
      break;

    case 22:
      if (
        (player.timestudy.studies.includes(210 + Math.round(col / 2)) &&
          (name % 2 == 0
            ? !player.timestudy.studies.includes(name - 1)
            : !player.timestudy.studies.includes(name + 1))) ||
        player.timestudy.studies.includes(292)
      )
        return true;
      else return false;
      break;

    case 23:
      if (
        ((player.timestudy.studies.includes(220 + Math.floor(col * 2)) ||
          player.timestudy.studies.includes(220 + Math.floor(col * 2 - 1))) &&
          !player.timestudy.studies.includes(
            name % 2 == 0 ? name - 1 : name + 1
          )) ||
        player.timestudy.studies.includes(292)
      )
        return true;
      else return false;
      break;

    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
      if (
        hasRow(row - 1) &&
        !hasRow(row) &&
        player.dilation.studies.includes(1)
      )
        return true;
      else return false;
      break;
  }
}

function canBuyDilationStudy(name) {
  if (
    name == 1 && // buying Time Dilation for 5000 TT
    ECTimesCompleted("eterc11") >= 5 &&
    ECTimesCompleted("eterc12") >= 5 &&
    player.timestudy.amcost.log10() / 20000 +
      player.timestudy.ipcost.log10() / 100 +
      player.timestudy.epcost.log2() >=
      13000
  )
    return true;
  if (
    player.dilation.studies.includes(name - 1) &&
    player.timestudy.theorem >= [5000, 1e6, 1e7, 1e8, 1e9, 1e24][+name - 1]
  )
    return true;
  else return false;
}

var all = [
  // literally all the time studies
  11,
  21,
  22,
  33,
  31,
  32,
  41,
  42,
  51,
  61,
  62,
  71,
  72,
  73,
  81,
  82,
  83,
  91,
  92,
  93,
  101,
  102,
  103,
  111,
  121,
  122,
  123,
  131,
  132,
  133,
  141,
  142,
  143,
  151,
  161,
  162,
  171,
  181,
  191,
  192,
  193,
  201,
  211,
  212,
  213,
  214,
  221,
  222,
  223,
  224,
  225,
  226,
  227,
  228,
  231,
  232,
  233,
  234
];
var studyCosts = [
  // literally all the time studies's costs
  1,
  3,
  2,
  2,
  3,
  2,
  4,
  6,
  3,
  3,
  3,
  4,
  6,
  5,
  4,
  6,
  5,
  4,
  5,
  7,
  4,
  6,
  6,
  12,
  9,
  9,
  9,
  5,
  5,
  5,
  4,
  4,
  4,
  8,
  7,
  7,
  15,
  200,
  400,
  730,
  300,
  900,
  120,
  150,
  200,
  120,
  900,
  900,
  900,
  900,
  900,
  900,
  900,
  900,
  500,
  500,
  500,
  500
];
var eternalStudy = [
  241,
  242,
  251,
  252,
  261,
  262,
  271,
  272,
  281,
  282,
  283,
  284,
  285,
  291,
  292,
  293
];
var eternalStudyCosts = [
  1e12,
  1e18,
  1e24,
  1e30,
  1e40,
  1e50,
  1e60,
  1e75,
  1e80,
  1e85,
  1e90,
  1e85,
  1e80,
  1e100,
  1e100,
  1e115
];
//these two lines below are adding the entries of eternal studies and existing studies together since i need to refer to eternal studies as they are for some functions.
studyCosts = studyCosts.concat(eternalStudyCosts);
all = all.concat(eternalStudy);
function updateTimeStudyButtons() {
  for (var i = 0; i < all.length; i++) {
    if (!player.timestudy.studies.includes(all[i])) {
      if (canBuyStudy(all[i]) && studyCosts[i] <= player.timestudy.theorem) {
        if (all[i] == 71 || all[i] == 81 || all[i] == 91 || all[i] == 101) {
          document.getElementById(all[i]).className =
            "timestudy normaldimstudy";
        } else if (
          all[i] == 72 ||
          all[i] == 82 ||
          all[i] == 92 ||
          all[i] == 102
        ) {
          document.getElementById(all[i]).className = "timestudy infdimstudy";
        } else if (
          all[i] == 73 ||
          all[i] == 83 ||
          all[i] == 93 ||
          all[i] == 103
        ) {
          document.getElementById(all[i]).className = "timestudy timedimstudy";
        } else if (all[i] == 121 || all[i] == 131 || all[i] == 141) {
          document.getElementById(all[i]).className = "timestudy activestudy";
        } else if (all[i] == 122 || all[i] == 132 || all[i] == 142) {
          document.getElementById(all[i]).className = "timestudy passivestudy";
        } else if (all[i] == 123 || all[i] == 133 || all[i] == 143) {
          document.getElementById(all[i]).className = "timestudy idlestudy";
        } else if (
          all[i] == 221 ||
          all[i] == 224 ||
          all[i] == 225 ||
          all[i] == 228 ||
          all[i] == 231 ||
          all[i] == 234
        ) {
          document.getElementById(all[i]).className = "timestudy darkstudy";
        } else if (
          all[i] == 222 ||
          all[i] == 223 ||
          all[i] == 226 ||
          all[i] == 227 ||
          all[i] == 232 ||
          all[i] == 233
        ) {
          document.getElementById(all[i]).className = "timestudy lightstudy";
        } else if (eternalStudy.includes(all[i])) {
          document.getElementById(all[i]).className = "timestudy diltimestudy";
        } else document.getElementById(all[i]).className = "timestudy";
      } else {
        if (all[i] == 71 || all[i] == 81 || all[i] == 91 || all[i] == 101) {
          document.getElementById(all[i]).className =
            "timestudylocked normaldimstudylocked";
        } else if (
          all[i] == 72 ||
          all[i] == 82 ||
          all[i] == 92 ||
          all[i] == 102
        ) {
          document.getElementById(all[i]).className =
            "timestudylocked infdimstudylocked";
        } else if (
          all[i] == 73 ||
          all[i] == 83 ||
          all[i] == 93 ||
          all[i] == 103
        ) {
          document.getElementById(all[i]).className =
            "timestudylocked timedimstudylocked";
        } else if (all[i] == 121 || all[i] == 131 || all[i] == 141) {
          document.getElementById(all[i]).className =
            "timestudylocked activestudylocked";
        } else if (all[i] == 122 || all[i] == 132 || all[i] == 142) {
          document.getElementById(all[i]).className =
            "timestudylocked passivestudylocked";
        } else if (all[i] == 123 || all[i] == 133 || all[i] == 143) {
          document.getElementById(all[i]).className =
            "timestudylocked idlestudylocked";
        } else if (eternalStudy.includes(all[i])) {
          document.getElementById(all[i]).className =
            "timestudylocked diltimestudylocked";
        } else document.getElementById(all[i]).className = "timestudylocked";
      }
    }
  }

  for (i = 1; i <= 6; i++) {
    if (player.dilation.studies.includes(i))
      document.getElementById("dilstudy" + i).className = "dilationupgbought";
    else if (canBuyDilationStudy(i))
      document.getElementById("dilstudy" + i).className = "dilationupg";
    else document.getElementById("dilstudy" + i).className = "timestudylocked";
  }
}

function studiesUntil(id) {
  var col = id % 10;
  var row = Math.floor(id / 10);
  var path = [0, 0];
  for (var i = 1; i < 4; i++) {
    if (player.timestudy.studies.includes(70 + i)) path[0] = i;
    if (player.timestudy.studies.includes(120 + i)) path[1] = i;
  }
  if ((row > 10 && path[0] === 0) || (row > 14 && path[1] === 0)) {
    return;
  }
  for (var i = 1; i < row; i++) {
    var chosenPath = path[i > 11 ? 1 : 0];
    if (row > 6 && row < 11) var secondPath = col;
    if ((i > 6 && i < 11) || (i > 11 && i < 15))
      buyTimeStudy(
        i * 10 + (chosenPath === 0 ? col : chosenPath),
        studyCosts[all.indexOf(i * 10 + (chosenPath === 0 ? col : chosenPath))],
        0
      );
    if (i > 6 && i < 11 && player.timestudy.studies.includes(201))
      buyTimeStudy(
        i * 10 + secondPath,
        studyCosts[all.indexOf(i * 10 + secondPath)],
        0
      );
    else
      for (var j = 1; all.includes(i * 10 + j); j++)
        buyTimeStudy(i * 10 + j, studyCosts[all.indexOf(i * 10 + j)], 0);
  }
  buyTimeStudy(id, studyCosts[all.indexOf(id)], 0);
}

function respecTimeStudies() {
  for (var i = 0; i < all.length; i++) {
    if (player.timestudy.studies.includes(all[i])) {
      player.timestudy.theorem += studyCosts[i];
    }
  }
  if (player.timestudy.studies.length === 0)
    giveAchievement("You do know how these work, right?");
  player.timestudy.studies = [];
  switch (
    player.eternityChallUnlocked // return TT to player after you respec a challenge
  ) {
    case 1:
      player.timestudy.theorem += 30;
      break;

    case 2:
      player.timestudy.theorem += 35;
      break;

    case 3:
      player.timestudy.theorem += 40;
      break;

    case 4:
      player.timestudy.theorem += 70;
      break;

    case 5:
      player.timestudy.theorem += 130;
      break;

    case 6:
      player.timestudy.theorem += 85;
      break;

    case 7:
      player.timestudy.theorem += 115;
      break;

    case 8:
      player.timestudy.theorem += 115;
      break;

    case 9:
      player.timestudy.theorem += 415;
      break;

    case 10:
      player.timestudy.theorem += 550;
      break;

    case 11:
      player.timestudy.theorem += 1;
      break;

    case 12:
      player.timestudy.theorem += 1;
      break;
  }
  player.eternityChallUnlocked = 0;
  updateTimeStudyButtons();
  updateTheoremButtons();
  drawStudyTree();
  if (player.replicanti.galaxybuyer)
    // TS131's original reward is not in effect
    document.getElementById("replicantiresettoggle").textContent =
      "Auto galaxy ON";
  else
    document.getElementById("replicantiresettoggle").textContent =
      "Auto galaxy OFF";
}

function exportStudyTree() {
  let output = document.getElementById("treeExportOutput");
  let parent = output.parentElement;

  parent.style.display = "";
  output.value = player.timestudy.studies + "|" + player.eternityChallUnlocked;

  output.onblur = function() {
    parent.style.display = "none";
  };

  output.focus();
  output.select();

  try {
    if (document.execCommand("copy")) {
      $.notify("exported to clipboard", "info");
      output.blur();
    }
  } catch (ex) {
    // well, we tried.
  }
}

function importStudyTree(input) {
  if (typeof input !== "string") var input = prompt();
  if (
    sha512_256(input) ==
    "08b819f253b684773e876df530f95dcb85d2fb052046fa16ec321c65f3330608"
  )
    giveAchievement("You followed the instructions");
  if (input === "") return false;
  var studiesToBuy = input.split("|")[0].split(",");
  for (i = 0; i < studiesToBuy.length; i++) {
    document.getElementById(studiesToBuy[i]).click();
  }
  if (parseInt(input.split("|")[1]) !== 0) {
    justImported = true;
    document
      .getElementById("ec" + parseInt(input.split("|")[1]) + "unl")
      .click();
    setTimeout(function() {
      justImported = false;
    }, 100);
  }
}

function studyTreeSaveButton(num) {
  if (shiftDown) {
    localStorage.setItem(
      "studyTree" + num,
      player.timestudy.studies + "|" + player.eternityChallUnlocked
    );
    $.notify("Study tree " + num + " saved", "info");
  } else if (
    localStorage.getItem("studyTree" + num) !== null &&
    localStorage.getItem("studyTree" + num) !== "|0"
  ) {
    importStudyTree(localStorage.getItem("studyTree" + num));
    $.notify("Study tree " + num + " loaded", "info");
  }
}

function getTimeStudiesDescription() {
  // update all the time study descriptions. to be honest, i could just get all the TS formulas and put it into one function and then grab those forumlas from that function to this function.
  let desc1 = Math.floor(player.resets / 2000) == 1 ? " galaxy later" : " galaxies later"; //TS224 
  let desc2 = Math.floor(player.replicanti.galaxies / 40) == 1 ? " galaxy later" : " galaxies later"; //TS271 
  let desc3 = Math.floor(player.dilation.freeGalaxies / 80) == 1 ? " galaxy later" : " galaxies later"; //TS272
  let desc4 = Math.floor(Math.pow(player.resets, 0.3) ** 0.12) != 1 ? "s" : ""; // for TS261
  let desc5 = player.achievements.includes("r103") ? "307.8" : "308"
  let r132 = player.achievements.includes("r132") ? Decimal.floor(player.galaxies/4) : 0
  let desc102a = player.achievements.includes("r132") ? r132 : 0
  let desc102b = player.achievements.includes("r132") ? "and normal galaxies " : ""
  let desc103a = player.achievements.includes("r132") ? r132 : 0
  let desc103b = player.achievements.includes("r132") ? "and normal galaxy " : ""
  document.getElementById("11desc").textContent =
    "Currently: " +
    shortenMoney(
      Decimal.fromMantissaExponent(
        10 -
          player.tickspeed
            .dividedBy(1000)
            .pow(0.005)
            .times(0.95)
            .plus(
              player.tickspeed
                .dividedBy(1000)
                .pow(0.0003)
                .times(0.05)
            ).mantissa,
        Math.abs(
          player.tickspeed
            .dividedBy(1000)
            .pow(0.005)
            .times(0.95)
            .plus(
              player.tickspeed
                .dividedBy(1000)
                .pow(0.0003)
                .times(0.05)
            ).e
        )
      )
        .min("1e2500")
        .max(1)
    ) +
    "x";
  let TS32 = Math.max(player.resets, 1);
  if (player.timestudy.studies.includes(271))
    TS32 = TS32 * (1e3 * (player.meta.resets + 1));
  document.getElementById("32desc").textContent ="Currently: " + shortenDimensions(TS32) +
    "x";
  document.getElementById("51desc").textContent =
    "You gain " + shortenCosts(1e15) + "x more IP";
  document.getElementById("71desc").textContent =
    "Currently: " +
    shortenMoney(
      calcTotalSacrificeBoost()
        .pow(0.25)
        .max(1)
        .min("1e210000")
    ) +
    "x";
  document.getElementById("72desc").textContent =
    "Currently: " +
    shortenMoney(
      calcTotalSacrificeBoost()
        .pow(0.04)
        .max(1)
        .min("1e30000")
    ) +
    "x";
  document.getElementById("73desc").textContent =
    "Currently: " +
    shortenMoney(
      calcTotalSacrificeBoost()
        .pow(0.005)
        .max(1)
        .min("1e1300")
    ) +
    "x";
  document.getElementById("82desc").textContent =
    "Currently: " +
    shortenMoney(
      Decimal.pow(1.000011, Math.pow(player.resets, 2)).min("1e80000")
    ) +
    "x";
  document.getElementById("83desc").textContent =
    "Currently: " +
    shortenMoney(
      Decimal.pow(1.0004, player.totalTickGained)
    ) +
    "x";
  document.getElementById("91desc").textContent =
    "Currently: " +
    shortenMoney(Decimal.pow(10, Math.min(player.thisEternity, 18000) / 60)) +
    "x";
  document.getElementById("92desc").textContent =
    "Currently: " +
    shortenMoney(Decimal.pow(2, 600 / Math.max(player.bestEternity, 20))) +
    "x";
  document.getElementById("93desc").textContent =
    "Currently: " +
    shortenMoney(Decimal.pow(player.totalTickGained, 0.25)) +
    "x";
  document.getElementById("102startdesc").textContent = "Replicanti galaxies " + desc102b + "power up replicanti multiplier."
  document.getElementById("102desc").textContent =
    "Currently: " +
    shortenMoney(
      Decimal.pow(5, Decimal.max((new Decimal (player.replicanti.galaxies).add(r132)), 1))
    ) +
    "x";
  document.getElementById("103startdesc").textContent = "Time Dimensions are stronger based on your replicanti galaxy " + desc103b + "amount." 
  document.getElementById("103desc").textContent =
    "Currently: " +
    shortenMoney(
      Decimal.max(Decimal.max((new Decimal (player.replicanti.galaxies).add(r132)), 1))
    ) +
    "x";
  document.getElementById("111desc").textContent = "(/" + desc5 + " -> /285)"
  document.getElementById("121desc").textContent =
    "Currently: " +
    (
      (253 -
        averageEp
          .dividedBy(player.epmult)
          .dividedBy(10)
          .min(248)
          .max(3)) /
      5
    ).toFixed(1) +
    "x";
  document.getElementById("123desc").textContent =
    "Currently: " +
    Math.sqrt((1.39 * player.thisEternity) / 10).toFixed(1) +
    "x";
  document.getElementById("141desc").textContent =
    "Currently: " +
    shortenMoney(
      new Decimal(1e45)
        .dividedBy(
          Decimal.pow(
            15,
            Math.log(player.thisInfinityTime) *
              Math.pow(player.thisInfinityTime, 0.125)
          )
        )
        .max(1)
    ) +
    "x";
  document.getElementById("142desc").textContent =
    "You gain " + shortenCosts(1e25) + "x more IP";
  document.getElementById("143desc").textContent =
    "Currently: " +
    shortenMoney(
      Decimal.pow(
        15,
        Math.log(player.thisInfinityTime) *
          Math.pow(player.thisInfinityTime, 0.125)
      )
    ) +
    "x";
  document.getElementById("151desc").textContent =
    "Give a " + shortenCosts(1e4) + "x multiplier to all Time Dimensions";
  document.getElementById("161desc").textContent =
    "Give a " +
    shortenCosts(new Decimal("1e616")) +
    "x multiplier to all Antimatter Dimensions";
  document.getElementById("162desc").textContent =
    "Give a " + shortenCosts(1e11) + "x multiplier to all Infinity Dimensions";
  document.getElementById("192desc").textContent =
    "You can get beyond " +
    shortenMoney(Number.MAX_VALUE) +
    " replicantis, but the interval increases with your amount";
  document.getElementById("193desc").textContent =
    "Currently: " +
    shortenMoney(Decimal.pow(1.03, player.eternities).min("1e13000")) +
    "x";
  document.getElementById("212desc").textContent =
    "Currently: " +
    ((Math.pow(player.timeShards.max(2).log2(), 0.005) - 1) * 100).toFixed(2) +
    "%";
  document.getElementById("214desc").textContent =
    "Currently: " +
    shortenMoney(
      calcTotalSacrificeBoost()
        .pow(8)
        .min("1e46000")
        .times(calcTotalSacrificeBoost().pow(1.1))
        .div(calcTotalSacrificeBoost())
        .max(1)
        .min(new Decimal("1e125000"))
    ) +
    "x";
  document.getElementById("221desc").textContent =
    "Currently: " + shortenMoney(Decimal.pow(1.0025, player.resets)) + "x";
  document.getElementById("224desc").textContent = //ts224
    "Currently: " + Math.floor(player.resets / 2000) + desc1;
  document.getElementById("225desc").textContent = //ts225
    "Currently: +" + Math.floor(player.replicanti.amount.e / 1000) + " RGs";
  document.getElementById("226desc").textContent = //ts226
    "Currently: +" + Math.floor(player.replicanti.gal / 15) + " RGs";
  document.getElementById("227desc").textContent = //ts227
    "Currently: " +
    shortenMoney(Math.max(Math.pow(calcTotalSacrificeBoost().log10(), 10), 1)) +
    "x";
  document.getElementById("231desc").textContent = //ts231
    "Currently: " + Decimal.pow(player.resets, 0.3).toFixed(2) + "x per boost";
  document.getElementById("232desc").textContent = //ts232
    "Currently: " +
    (Math.pow(1 + player.galaxies / 1000, 0.2) * 100 - 100).toFixed(1) +
    "%";
  document.getElementById("241desc").textContent =
    "Currently: " +
    shortenMoney(Decimal.pow(player.dilation.tachyonParticles, (10 + (player.dilation.tachyonParticles).log10())).max(1)) +
    "x";
  document.getElementById("242desc").textContent =
    "Currently: +" +
    shortenMoney(Math.pow(player.replicanti.galaxies / 200, 0.25)) +
    "x";
  document.getElementById("251desc").textContent =
    "Currently: " + Math.floor(player.replicanti.galaxies / 40) + desc2;
  document.getElementById("252desc").textContent =
    "Currently: " + Math.floor(player.dilation.freeGalaxies / 100) + desc3;
  document.getElementById("261desc").textContent =
    "Currently: -" +
    Math.floor(Math.pow(player.resets, 0.3) ** 0.12) +
    " dimension" +
    desc4;
  document.getElementById("262desc").textContent =
    "Currently: " +
    shortenMoney(
      Decimal.pow(
        calcTotalSacrificeBoost().log10(),
        25 + calcTotalSacrificeBoost().log(1000) ** 0.75 / 10000
      ).max(1)
    ) +
    "x";
  document.getElementById("271desc").textContent =
    "Currently: " + shortenMoney(1e3 * (player.meta.resets + 1)) + "x";
  document.getElementById("283desc").textContent =
    "Currently: " +
    shortenMoney(player.dilation.unstable.shards.pow(0.05).max(1)) +
    "x";
  document.getElementById("unknownCost").textContent = shortenCosts(
    // the unknown time theorem isn't even coded yet, this is a placeholder
    new Decimal(10).pow(Math.random() * 20 + 300)
  );
}
function getECStudyDescription() {
  //exactly what it says it does
  if (player.etercreq !== 1)
    document.getElementById("ec1unl").innerHTML =
      "Eternity Challenge 1<span>Requirement: " +
      (ECTimesCompleted("eterc1") + 1) * 200 +
      " Eternities<span>Cost: 30 Time Theorems";
  else
    document.getElementById("ec1unl").innerHTML =
      "Eternity Challenge 1<span>Cost: 30 Time Theorems";
  if (player.etercreq !== 2)
    document.getElementById("ec2unl").innerHTML =
      "Eternity Challenge 2<span>Requirement: " +
      (1300 + ECTimesCompleted("eterc2") * 150) +
      " free tickspeed upgrades<span>Cost: 35 Time Theorems";
  else
    document.getElementById("ec2unl").innerHTML =
      "Eternity Challenge 2<span>Cost: 35 Time Theorems";
  if (player.etercreq !== 3)
    document.getElementById("ec3unl").innerHTML =
      "Eternity Challenge 3<span>Requirement: " +
      (17300 + ECTimesCompleted("eterc3") * 1250) +
      " 8th dimensions<span>Cost: 40 Time Theorems";
  else
    document.getElementById("ec3unl").innerHTML =
      "Eternity Challenge 3<span>Cost: 40 Time Theorems";
  if (player.etercreq !== 4)
    document.getElementById("ec4unl").innerHTML =
      "Eternity Challenge 4<span>Requirement: " +
      (1e8 + ECTimesCompleted("eterc4") * 5e7)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      " infinities<span>Cost: 70 Time Theorems";
  else
    document.getElementById("ec4unl").innerHTML =
      "Eternity Challenge 4<span>Cost: 70 Time Theorems";
  if (player.etercreq !== 5)
    document.getElementById("ec5unl").innerHTML =
      "Eternity Challenge 5<span>Requirement: " +
      (160 + ECTimesCompleted("eterc5") * 14) +
      " normal galaxies<span>Cost: 130 Time Theorems";
  else
    document.getElementById("ec5unl").innerHTML =
      "Eternity Challenge 5<span>Cost: 130 Time Theorems";
  if (player.etercreq !== 6)
    document.getElementById("ec6unl").innerHTML =
      "Eternity Challenge 6<span>Requirement: " +
      (40 + ECTimesCompleted("eterc6") * 5) +
      " replicanti galaxies<span>Cost: 85 Time Theorems";
  else
    document.getElementById("ec6unl").innerHTML =
      "Eternity Challenge 6<span>Cost: 85 Time Theorems";
  if (player.etercreq !== 7)
    document.getElementById("ec7unl").innerHTML =
      "Eternity Challenge 7<span>Requirement: " +
      shortenCosts(
        new Decimal("1e500000").times(
          new Decimal("1e300000").pow(ECTimesCompleted("eterc7"))
        )
      ) +
      " antimatter <span>Cost: 115 Time Theorems";
  else
    document.getElementById("ec7unl").innerHTML =
      "Eternity Challenge 7<span>Cost: 115 Time Theorems";
  if (player.etercreq !== 8)
    document.getElementById("ec8unl").innerHTML =
      "Eternity Challenge 8<span>Requirement: " +
      shortenCosts(
        new Decimal("1e4000").times(
          new Decimal("1e1000").pow(ECTimesCompleted("eterc8"))
        )
      ) +
      " IP <span>Cost: 115 Time Theorems";
  else
    document.getElementById("ec8unl").innerHTML =
      "Eternity Challenge 8<span>Cost: 115 Time Theorems";
  if (player.etercreq !== 9)
    document.getElementById("ec9unl").innerHTML =
      "Eternity Challenge 9<span>Requirement: " +
      shortenCosts(
        new Decimal("1e17500").times(
          new Decimal("1e2000").pow(ECTimesCompleted("eterc9"))
        )
      ) +
      " infinity power<span>Cost: 415 Time Theorems";
  else
    document.getElementById("ec9unl").innerHTML =
      "Eternity Challenge 9<span>Cost: 415 Time Theorems";
  if (player.etercreq !== 10)
    document.getElementById("ec10unl").innerHTML =
      "Eternity Challenge 10<span>Requirement: " +
      shortenCosts(
        new Decimal("1e100").times(
          new Decimal("1e20").pow(ECTimesCompleted("eterc10"))
        )
      ) +
      " EP<span>Cost: 550 Time Theorems";
  else
    document.getElementById("ec10unl").innerHTML =
      "Eternity Challenge 10<span>Cost: 550 Time Theorems";

  document.getElementById("ec11unl").innerHTML =
    "Eternity Challenge 11<span>Requirement: Use only the Normal Dimension path.<span>Cost: 1 Time Theorem";
  document.getElementById("ec12unl").innerHTML =
    "Eternity Challenge 12<span>Requirement: Use only the Time Dimension path.<span>Cost: 1 Time Theorem";

  if (player.dilation.studies.includes(1))
    document.getElementById("dilstudy1").innerHTML =
      "Unlock time dilation<span>Cost: 5000 Time Theorems";
  else
    document.getElementById("dilstudy1").innerHTML =
      "Unlock time dilation<span>Requirement: 5 EC11 and EC12 completions, and 13000 total theorems<span>Cost: 5000 Time Theorems";
}

//////////////////////////////////// ETERNITY CHALLENGES \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function canUnlockEC(idx, cost, study, study2) {
  study2 = study2 !== undefined ? study2 : 0;
  if (player.eternityChallUnlocked !== 0) return false;
  if (
    !player.timestudy.studies.includes(study) &&
    (player.study2 == 0 || !player.timestudy.studies.includes(study2))
  )
    return false;
  if (player.timestudy.theorem < cost) return false;
  if (player.etercreq == idx && idx !== 11 && idx !== 12) return true;

  switch (idx) {
    case 1:
      if (player.eternities >= 200 + ECTimesCompleted("eterc1") * 200)
        return true;
      break;

    case 2:
      if (player.totalTickGained >= 1300 + ECTimesCompleted("eterc2") * 150)
        return true;
      break;

    case 3:
      if (player.eightAmount.gte(17300 + ECTimesCompleted("eterc3") * 1250))
        return true;
      break;

    case 4:
      if (1e8 + ECTimesCompleted("eterc4") * 5e7 <= getInfinitied())
        return true;
      break;

    case 5:
      if (160 + ECTimesCompleted("eterc5") * 14 <= player.galaxies) return true;
      break;

    case 6:
      if (40 + ECTimesCompleted("eterc6") * 5 <= player.replicanti.galaxies)
        return true;
      break;

    case 7:
      if (
        player.money.gte(
          new Decimal("1e500000").times(
            new Decimal("1e300000").pow(ECTimesCompleted("eterc7"))
          )
        )
      )
        return true;
      break;

    case 8:
      if (
        player.infinityPoints.gte(
          new Decimal("1e4000").times(
            new Decimal("1e1000").pow(ECTimesCompleted("eterc8"))
          )
        )
      )
        return true;
      break;

    case 9:
      if (
        player.infinityPower.gte(
          new Decimal("1e17500").times(
            new Decimal("1e2000").pow(ECTimesCompleted("eterc9"))
          )
        )
      )
        return true;
      break;

    case 10:
      if (
        player.eternityPoints.gte(
          new Decimal("1e100").times(
            new Decimal("1e20").pow(ECTimesCompleted("eterc10"))
          )
        )
      )
        return true;
      break;

    case 11:
      if (
        player.timestudy.studies.includes(71) &&
        !player.timestudy.studies.includes(72) &&
        !player.timestudy.studies.includes(73)
      )
        return true;
      break;

    case 12:
      if (
        player.timestudy.studies.includes(73) &&
        !player.timestudy.studies.includes(71) &&
        !player.timestudy.studies.includes(72)
      )
        return true;
      break;
  }
}

function updateECUnlockButtons() {
  if (canUnlockEC(1, 30, 171)) {
    document.getElementById("ec1unl").className = "eternitychallengestudy";
  } else {
    document.getElementById("ec1unl").className =
      "eternitychallengestudylocked";
  }

  if (canUnlockEC(2, 35, 171)) {
    document.getElementById("ec2unl").className = "eternitychallengestudy";
  } else {
    document.getElementById("ec2unl").className =
      "eternitychallengestudylocked";
  }

  if (canUnlockEC(3, 40, 171)) {
    document.getElementById("ec3unl").className = "eternitychallengestudy";
  } else {
    document.getElementById("ec3unl").className =
      "eternitychallengestudylocked";
  }

  if (canUnlockEC(4, 70, 143)) {
    document.getElementById("ec4unl").className = "eternitychallengestudy";
  } else {
    document.getElementById("ec4unl").className =
      "eternitychallengestudylocked";
  }

  if (canUnlockEC(5, 130, 42)) {
    document.getElementById("ec5unl").className = "eternitychallengestudy";
  } else {
    document.getElementById("ec5unl").className =
      "eternitychallengestudylocked";
  }

  if (canUnlockEC(6, 85, 121)) {
    document.getElementById("ec6unl").className = "eternitychallengestudy";
  } else {
    document.getElementById("ec6unl").className =
      "eternitychallengestudylocked";
  }

  if (canUnlockEC(7, 115, 111)) {
    document.getElementById("ec7unl").className = "eternitychallengestudy";
  } else {
    document.getElementById("ec7unl").className =
      "eternitychallengestudylocked";
  }

  if (canUnlockEC(8, 115, 123)) {
    document.getElementById("ec8unl").className = "eternitychallengestudy";
  } else {
    document.getElementById("ec8unl").className =
      "eternitychallengestudylocked";
  }

  if (canUnlockEC(9, 415, 151)) {
    document.getElementById("ec9unl").className = "eternitychallengestudy";
  } else {
    document.getElementById("ec9unl").className =
      "eternitychallengestudylocked";
  }

  if (canUnlockEC(10, 550, 181)) {
    document.getElementById("ec10unl").className = "eternitychallengestudy";
  } else {
    document.getElementById("ec10unl").className =
      "eternitychallengestudylocked";
  }

  if (canUnlockEC(11, 1, 231, 232)) {
    document.getElementById("ec11unl").className = "eternitychallengestudy";
  } else {
    document.getElementById("ec11unl").className =
      "eternitychallengestudylocked";
  }

  if (canUnlockEC(12, 1, 233, 234)) {
    document.getElementById("ec12unl").className = "eternitychallengestudy";
  } else {
    document.getElementById("ec12unl").className =
      "eternitychallengestudylocked";
  }

  if (player.eternityChallUnlocked !== 0)
    document.getElementById(
      "ec" + player.eternityChallUnlocked + "unl"
    ).className = "eternitychallengestudybought";
}

// when you buy the eternity challenges, the game will subtract accordingly. this can be more efficient, come on...
document.getElementById("ec1unl").onclick = function() {
  if (canUnlockEC(1, 30, 171)) {
    unlockEChall(1);
    player.timestudy.theorem -= 30;
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
};

document.getElementById("ec2unl").onclick = function() {
  if (canUnlockEC(2, 35, 171)) {
    unlockEChall(2);
    player.timestudy.theorem -= 35;
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
};

document.getElementById("ec3unl").onclick = function() {
  if (canUnlockEC(3, 40, 171)) {
    unlockEChall(3);
    player.timestudy.theorem -= 40;
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
};

document.getElementById("ec4unl").onclick = function() {
  if (canUnlockEC(4, 70, 143)) {
    unlockEChall(4);
    player.timestudy.theorem -= 70;
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
};

document.getElementById("ec5unl").onclick = function() {
  if (canUnlockEC(5, 130, 42)) {
    unlockEChall(5);
    player.timestudy.theorem -= 130;
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
};

document.getElementById("ec6unl").onclick = function() {
  if (canUnlockEC(6, 85, 121)) {
    unlockEChall(6);
    player.timestudy.theorem -= 85;
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
};

document.getElementById("ec7unl").onclick = function() {
  if (canUnlockEC(7, 115, 111)) {
    unlockEChall(7);
    player.timestudy.theorem -= 115;
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
};

document.getElementById("ec8unl").onclick = function() {
  if (canUnlockEC(8, 115, 123)) {
    unlockEChall(8);
    player.timestudy.theorem -= 115;
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
};

document.getElementById("ec9unl").onclick = function() {
  if (canUnlockEC(9, 415, 151)) {
    unlockEChall(9);
    player.timestudy.theorem -= 415;
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
};

document.getElementById("ec10unl").onclick = function() {
  if (canUnlockEC(10, 550, 181)) {
    unlockEChall(10);
    player.timestudy.theorem -= 550;
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
};

document.getElementById("ec11unl").onclick = function() {
  if (canUnlockEC(11, 1, 231, 232)) {
    unlockEChall(11);
    player.timestudy.theorem -= 1;
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
};

document.getElementById("ec12unl").onclick = function() {
  if (canUnlockEC(12, 1, 233, 234)) {
    unlockEChall(12);
    player.timestudy.theorem -= 1;
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
  }
};
