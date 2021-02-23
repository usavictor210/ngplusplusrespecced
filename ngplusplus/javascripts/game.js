// ok, this code is absolutely very messy and we'll need to separate it into parts, and also simplify some parts of the code.
var gameLoopIntervalId;
var Marathon = 0;
var Marathon2 = 0;
var auto = false;
var autoS = true;
var shiftDown = false;
var controlDown = false;
var justImported = false;
var saved = 0;
var painTimer = 0;
var keySequence = 0;
var failureCount = 0;
var implosionCheck = 0;
var TIER_NAMES = [
  null,
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eight"
];
var DISPLAY_NAMES = [
  null,
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth"
];
var forceHardReset = false;
var player = {
  ngPlus: 0,
  money: new Decimal(10),
  tickSpeedCost: new Decimal(1000),
  tickspeed: new Decimal(1000),
  firstCost: new Decimal(10),
  secondCost: new Decimal(100),
  thirdCost: new Decimal(10000),
  fourthCost: new Decimal(1000000),
  fifthCost: new Decimal(1e9),
  sixthCost: new Decimal(1e13),
  seventhCost: new Decimal(1e18),
  eightCost: new Decimal(1e24),
  firstAmount: new Decimal(0),
  secondAmount: new Decimal(0),
  thirdAmount: new Decimal(0),
  fourthAmount: new Decimal(0),
  firstBought: 0,
  secondBought: 0,
  thirdBought: 0,
  fourthBought: 0,
  fifthAmount: new Decimal(0),
  sixthAmount: new Decimal(0),
  seventhAmount: new Decimal(0),
  eightAmount: new Decimal(0),
  fifthBought: 0,
  sixthBought: 0,
  seventhBought: 0,
  eightBought: 0,
  firstPow: new Decimal(1),
  secondPow: new Decimal(1),
  thirdPow: new Decimal(1),
  fourthPow: new Decimal(1),
  fifthPow: new Decimal(1),
  sixthPow: new Decimal(1),
  seventhPow: new Decimal(1),
  eightPow: new Decimal(1),
  sacrificed: new Decimal(0),
  achievements: [],
  infinityUpgrades: [],
  challenges: [],
  currentChallenge: "",
  infinityPoints: new Decimal(0),
  infinitied: new Decimal(0),
  infinitiedBank: new Decimal(0),
  totalTimePlayed: 0,
  bestInfinityTime: 9999999999,
  thisInfinityTime: 0,
  resets: 0,
  galaxies: 0,
  tickDecrease: 0.9,
  totalmoney: new Decimal(0),
  achPow: 1,
  newsArray: [],
  interval: null,
  lastUpdate: new Date().getTime(),
  autobuyers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  costMultipliers: [
    new Decimal(1e3),
    new Decimal(1e4),
    new Decimal(1e5),
    new Decimal(1e6),
    new Decimal(1e8),
    new Decimal(1e10),
    new Decimal(1e12),
    new Decimal(1e15)
  ],
  tickspeedMultiplier: new Decimal(10),
  chall2Pow: 1,
  chall3Pow: new Decimal(0.01),
  matter: new Decimal(0),
  chall11Pow: new Decimal(1),
  partInfinityPoint: 0,
  partInfinitied: 0,
  break: false,
  challengeTimes: [
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31
  ],
  infchallengeTimes: [
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31,
    600 * 60 * 24 * 31
  ],
  lastTenRuns: [
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1]
  ],
  lastTenEternities: [
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1],
    [600 * 60 * 24 * 31, 1]
  ],
  infMult: new Decimal(1),
  infMultCost: new Decimal(10),
  tickSpeedMultDecrease: 10,
  tickSpeedMultDecreaseCost: 3e6,
  dimensionMultDecrease: 10,
  dimensionMultDecreaseCost: 1e8,
  overXGalaxies: 10,
  version: 15.9,
  infDimensionsUnlocked: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  infinityPower: new Decimal(1),
  spreadingCancer: 0,
  postChallUnlocked: 0,
  postC4Tier: 0,
  postC3Reward: new Decimal(1),
  eternityPoints: new Decimal(0),
  eternities: new Decimal(0),
  thisEternity: 0,
  bestEternity: 9999999999,
  eternityUpgrades: [],
  epmult: new Decimal(1),
  epmultCost: new Decimal(500),
  infinityDimension1: {
    cost: new Decimal(1e8),
    amount: new Decimal(0),
    bought: 0,
    power: new Decimal(1),
    baseAmount: 0
  },
  infinityDimension2: {
    cost: new Decimal(1e9),
    amount: new Decimal(0),
    bought: 0,
    power: new Decimal(1),
    baseAmount: 0
  },
  infinityDimension3: {
    cost: new Decimal(1e10),
    amount: new Decimal(0),
    bought: 0,
    power: new Decimal(1),
    baseAmount: 0
  },
  infinityDimension4: {
    cost: new Decimal(1e20),
    amount: new Decimal(0),
    bought: 0,
    power: new Decimal(1),
    baseAmount: 0
  },
  infinityDimension5: {
    cost: new Decimal(1e140),
    amount: new Decimal(0),
    bought: 0,
    power: new Decimal(1),
    baseAmount: 0
  },
  infinityDimension6: {
    cost: new Decimal(1e200),
    amount: new Decimal(0),
    bought: 0,
    power: new Decimal(1),
    baseAmount: 0
  },
  infinityDimension7: {
    cost: new Decimal(1e250),
    amount: new Decimal(0),
    bought: 0,
    power: new Decimal(1),
    baseAmount: 0
  },
  infinityDimension8: {
    cost: new Decimal(1e280),
    amount: new Decimal(0),
    bought: 0,
    power: new Decimal(1),
    baseAmount: 0
  },
  infDimBuyers: [false, false, false, false, false, false, false, false],
  timeShards: new Decimal(0),
  tickThreshold: new Decimal(1),
  totalTickGained: 0,
  timeDimension1: {
    cost: new Decimal(1),
    amount: new Decimal(0),
    power: new Decimal(1),
    bought: 0
  },
  timeDimension2: {
    cost: new Decimal(5),
    amount: new Decimal(0),
    power: new Decimal(1),
    bought: 0
  },
  timeDimension3: {
    cost: new Decimal(100),
    amount: new Decimal(0),
    power: new Decimal(1),
    bought: 0
  },
  timeDimension4: {
    cost: new Decimal(1000),
    amount: new Decimal(0),
    power: new Decimal(1),
    bought: 0
  },
  timeDimension5: {
    cost: new Decimal("1e2350"),
    amount: new Decimal(0),
    power: new Decimal(1),
    bought: 0
  },
  timeDimension6: {
    cost: new Decimal("1e2650"),
    amount: new Decimal(0),
    power: new Decimal(1),
    bought: 0
  },
  timeDimension7: {
    cost: new Decimal("1e3000"),
    amount: new Decimal(0),
    power: new Decimal(1),
    bought: 0
  },
  timeDimension8: {
    cost: new Decimal("1e3350"),
    amount: new Decimal(0),
    power: new Decimal(1),
    bought: 0
  },
  offlineProd: 0,
  offlineProdCost: 1e7,
  challengeTarget: 0,
  autoSacrifice: 1,
  replicanti: {
    amount: new Decimal(0),
    unl: false,
    chance: 0.01,
    chanceCost: new Decimal(1e150),
    interval: 1000,
    intervalCost: new Decimal(1e140),
    gal: 0,
    galaxies: 0,
    galCost: new Decimal(1e170),
    auto: [false, false, false]
  },
  timestudy: {
    theorem: 0,
    amcost: new Decimal("1e20000"),
    ipcost: new Decimal(1),
    epcost: new Decimal(1),
    studies: [],
    autobuyer: false
  },
  eternityChalls: {},
  eternityChallGoal: new Decimal(Number.MAX_VALUE),
  currentEternityChall: "",
  eternityChallUnlocked: 0,
  etercreq: 0,
  autoIP: new Decimal(0),
  autoTime: 1e300,
  infMultBuyer: false,
  autoCrunchMode: "amount",
  autoEterMode: "amount",
  respec: false,
  eternityBuyer: {
    limit: new Decimal(0),
    isOn: false
  },
  eterc8ids: 50,
  eterc8repl: 40,
  dimlife: true,
  dead: true,
  dilation: {
    studies: [],
    active: false,
    tachyonParticles: new Decimal(0),
    dilatedTime: new Decimal(0),
    totalTachyonParticles: new Decimal(0),
    nextThreshold: new Decimal(1000),
    freeGalaxies: 0,
    upgrades: [],
    unstableShards: new Decimal(0),
    rebuyables: {
      1: 0,
      2: 0,
      3: 0,
      4: 0
    },
    unstable: {
      times: 0,
      shards: new Decimal(0),
      severity: 1,
      upgrades: [],
      sacrificedTP: new Decimal(0)
    },
    timeRift: {
      temporalPower: new Decimal(0),
      seconds: 0,
      upgrades: []
    },
    autobuy: false
  },
  meta: {
    antimatter: new Decimal(10),
    bestAntimatter: new Decimal(10),
    resets: 0,
    galaxy: 0,
    "1": {
      amount: new Decimal(0),
      bought: 0,
      tensBought: 0,
      cost: new Decimal(10)
    },
    "2": {
      amount: new Decimal(0),
      bought: 0,
      tensBought: 0,
      cost: new Decimal(100)
    },
    "3": {
      amount: new Decimal(0),
      bought: 0,
      tensBought: 0,
      cost: new Decimal(1e4)
    },
    "4": {
      amount: new Decimal(0),
      bought: 0,
      tensBought: 0,
      cost: new Decimal(1e6)
    },
    "5": {
      amount: new Decimal(0),
      bought: 0,
      tensBought: 0,
      cost: new Decimal(1e9)
    },
    "6": {
      amount: new Decimal(0),
      bought: 0,
      tensBought: 0,
      cost: new Decimal(1e13)
    },
    "7": {
      amount: new Decimal(0),
      bought: 0,
      tensBought: 0,
      cost: new Decimal(1e18)
    },
    "8": {
      amount: new Decimal(0),
      bought: 0,
      tensBought: 0,
      cost: new Decimal(1e24)
    },
    autoMaxAll: false
  },
  quantum: {
    times: 0,
    quarks: new Decimal(0),
    thisQuantum: 0,
    bestQuantum: 9999999999,
    producedGluons: 0,
    realGluons: 0,
    bosons: {
      "w+": 0,
      "w-": 0,
      z0: 0
    },
    neutronstar: {
      quarks: new Decimal(0),
      metaAntimatter: new Decimal(0),
      dilatedTime: new Decimal(0)
    },
    rebuyables: {
      1: 0,
      2: 0
    },
    investmentAmount: [
      null,
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(0)
    ],
    upgrades: [],
    lastTenQuantums: [
      [600 * 60 * 24 * 31, 1],
      [600 * 60 * 24 * 31, 1],
      [600 * 60 * 24 * 31, 1],
      [600 * 60 * 24 * 31, 1],
      [600 * 60 * 24 * 31, 1],
      [600 * 60 * 24 * 31, 1],
      [600 * 60 * 24 * 31, 1],
      [600 * 60 * 24 * 31, 1],
      [600 * 60 * 24 * 31, 1],
      [600 * 60 * 24 * 31, 1]
    ]
  },
  why: 0,
  options: {
    newsHidden: false,
    notation: "Mixed scientific",
    //Standard = normal prefixed numbers, Scientific = standard form, Engineering = powers of 3.
    scientific: false,
    challConf: false,
    sacrificeConfirmation: true,
    retryChallenge: false,
    bulkOn: true,
    cloud: true,
    hotkeys: true,
    theme: undefined,
    secretThemeKey: 0,
    eternityconfirm: true,
    dilationconfirm: true,
    quantumconfirm: true,
    commas: true,
    updateRate: 50,
    chart: {
      updateRate: 1000,
      duration: 10,
      warning: 0
    },
    animations: {
      floatingText: true,
      bigCrunch: true,
      eternity: true,
      tachyonParticles: true
    },
    ngPlusConfirm: 0
  }
};

var defaultStart = $.extend(true, {}, player);
var mult18 = new Decimal(1);

function setTheme(name) {
  document.querySelectorAll("link").forEach(function(e) {
    if (e.href.includes("theme")) e.remove();
  });

  if (name !== undefined && name.length < 3)
    giveAchievement("Shhh... It's a secret");
  if (name === undefined) {
    document.getElementById("theme").textContent = "Current theme: Normal";
  } else if (name === "S1") {
    document.getElementById("theme").textContent =
      "Current theme: " + player.options.secretThemeKey;
    Chart.defaults.global.defaultFontColor = "black";
    normalDimChart.data.datasets[0].borderColor = "#000";
  } else if (name === "S2") {
    document.getElementById("theme").textContent =
      "Current theme: " + player.options.secretThemeKey;
    Chart.defaults.global.defaultFontColor = "black";
    normalDimChart.data.datasets[0].borderColor = "#000";
  } else if (name === "S3") {
    document.getElementById("theme").textContent =
      "Current theme: " + player.options.secretThemeKey;
    Chart.defaults.global.defaultFontColor = "black";
    normalDimChart.data.datasets[0].borderColor = "#000";
  } else if (name === "S4") {
    document.getElementById("theme").textContent =
      "Current theme: " + player.options.secretThemeKey;
    Chart.defaults.global.defaultFontColor = "black";
    normalDimChart.data.datasets[0].borderColor = "#000";
  } else if (name === "S5") {
    document.getElementById("theme").textContent =
      "Current theme: " + player.options.secretThemeKey;
    Chart.defaults.global.defaultFontColor = "black";
    normalDimChart.data.datasets[0].borderColor = "#000";
  } else {
    document.getElementById("theme").textContent = "Current theme: " + name;
  }

  if (name === undefined) return;

  var head = document.head;
  var link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = "stylesheets/theme-" + name + ".css";

  head.appendChild(link);
}

document.getElementById("theme").onclick = function() {
  if (player.options.theme === undefined) {
    player.options.theme = "Metro";
  } else if (player.options.theme === "Metro") {
    player.options.theme = "Dark";
    Chart.defaults.global.defaultFontColor = "#888";
    normalDimChart.data.datasets[0].borderColor = "#888";
  } else if (player.options.theme === "Dark") {
    player.options.theme = "Dark Metro";
  } else if (player.options.theme === "Dark Metro") {
    player.options.theme = "Inverted";
    Chart.defaults.global.defaultFontColor = "black";
    normalDimChart.data.datasets[0].borderColor = "#000";
  } else if (player.options.theme === "Inverted") {
    player.options.theme = "Inverted Metro";
  } else {
    player.options.theme = undefined;
    Chart.defaults.global.defaultFontColor = "black";
    normalDimChart.data.datasets[0].borderColor = "#000";
  }

  setTheme(player.options.theme);
};

function showTab(tabName) {
  //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
  var tabs = document.getElementsByClassName("tab");
  var tab;
  for (var i = 0; i < tabs.length; i++) {
    tab = tabs.item(i);
    if (tab.id === tabName) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  }
  if (
    document.getElementById("timestudies").style.display != "none" &&
    document.getElementById("eternitystore").style.display != "none"
  )
    document.getElementById("TTbuttons").style.display = "block";
  else document.getElementById("TTbuttons").style.display = "none";
  resizeCanvas();
  closeToolTip();
}

function updateMoney() {
  var element = document.getElementById("coinAmount");
  element.textContent = formatValue(
    player.options.notation,
    player.money,
    2,
    1
  );
  var element2 = document.getElementById("matter");
  if (
    player.currentChallenge == "challenge12" ||
    player.currentChallenge == "postc1"
  )
    element2.textContent =
      "There is " +
      formatValue(player.options.notation, player.matter, 2, 1) +
      " matter.";
  if (player.currentChallenge == "postc6")
    element2.textContent =
      "There is " +
      formatValue(
        player.options.notation,
        Decimal.pow(player.matter, 20),
        2,
        1
      ) +
      " matter."; //TODO
}

function updateCoinPerSec() {
  var element = document.getElementById("coinsPerSec");
  if (
    player.currentChallenge == "challenge3" ||
    player.currentChallenge == "postc1"
  ) {
    element.textContent =
      "You are getting " +
      shortenDimensions(
        getDimensionProductionPerSecond(1).times(player.chall3Pow)
      ) +
      " antimatter per second.";
  } else if (player.currentChallenge == "challenge7") {
    element.textContent =
      "You are getting " +
      shortenDimensions(
        getDimensionProductionPerSecond(1).plus(
          getDimensionProductionPerSecond(2)
        )
      ) +
      " antimatter per second.";
  } else {
    element.textContent =
      "You are getting " +
      shortenDimensions(getDimensionProductionPerSecond(1)) +
      " antimatter per second.";
  }
}

function getInfinitied() {
  return Decimal.max(
    new Decimal(player.infinitied).add(player.infinitiedBank),
    0
  );
}

function getGalaxyCostScalingStart() {
  var n = 100 + eterChallReward(5);
  if (player.timestudy.studies.includes(223)) n += 7;
  if (player.timestudy.studies.includes(224))
    n += Math.floor(player.resets / 2000);
  if (player.timestudy.studies.includes(251))
    n += Math.floor(player.replicanti.galaxies / 40);
  return n;
}

function getRemoteGalaxyStart() {
  var n = 800;
  if (player.timestudy.studies.includes(252))
    n += Math.floor(player.dilation.freeGalaxies / 100);
  return n;
}

function getGalaxyRequirement() {
  let amount = 80 + player.galaxies * 60;
  if (player.timestudy.studies.includes(42)) amount = 80 + player.galaxies * 52;
  if (player.currentChallenge == "challenge4")
    amount = 99 + player.galaxies * 90;

  let galaxyCostScalingStart = getGalaxyCostScalingStart();
  if (player.currentEternityChall == "eterc5") {
    amount += Math.pow(player.galaxies, 2) + player.galaxies;
  } else if (player.galaxies >= galaxyCostScalingStart) {
    amount +=
      Math.pow(player.galaxies - (galaxyCostScalingStart - 1), 2) +
      player.galaxies -
      (galaxyCostScalingStart - 1);
  }
  let remoteScalingStart = getRemoteGalaxyStart();
  if (player.galaxies >= remoteScalingStart) {
    amount = Math.floor(
      amount * Math.pow(1.002, player.galaxies - (remoteScalingStart - 1))
    );
  }

  if (player.infinityUpgrades.includes("resetBoost")) amount -= 9;
  if (player.challenges.includes("postc5")) amount -= 1;

  return amount;
}

function getETA(cost) {
  var a = 100;
  if (player.money.gte(cost)) return 0;
  while (ETACalc(a).lt(cost)) {
    a *= 10;
    if (a > 1e20) return Infinity;
  }
  var b = a / 10;
  var q = ETACalc((a + b) / 2);
  while (q.gt(cost.times(1.0001)) || q.lt(cost.dividedBy(1.0001))) {
    console.log("q = " + q);
    console.log("a = " + a);
    console.log("b = " + b);
    if (q.lt(cost)) a = (a + b) / 2;
    else b = (a + b) / 2;
    q = ETACalc((a + b) / 2);
  }
  return (a + b) / 2;
}

function ETACalc(t) {
  var value = player.money.plus(getDimensionProductionPerSecond(1).times(t));
  var div = 1;
  for (let tier = 2; tier <= 8; ++tier) {
    var name = TIER_NAMES[tier - 1];
    div *= tier;
    value = value.plus(
      getDimensionProductionPerSecond(tier)
        .times(getDimensionProductionPerSecond(tier - 1))
        .times(Decimal.pow(t, tier))
        .dividedBy(Decimal.max(player[name + "Amount"].times(div).times(10), 1))
    );
  }
  return value;
}

var worstChallengeTime = 1;

function updateWorstChallengeTime() {
  worstChallengeTime = 1;
  for (var i = 0; i < 10; i++) {
    if (player.challengeTimes[i] > worstChallengeTime)
      worstChallengeTime = player.challengeTimes[i];
  }
}

function sacrificeConf() {
  player.options.sacrificeConfirmation = !player.options.sacrificeConfirmation;
}

let getTotalRGs = function() {
  let extraGals = player.replicanti.galaxies;
  if (player.timestudy.studies.includes(225))
    extraGals += Math.floor(player.replicanti.amount.e / 1000);
  if (player.timestudy.studies.includes(226))
    extraGals += Math.floor(player.replicanti.gal / 15);
  return extraGals;
};

function formatInfOrEter(x) {
  if (x < 1e12) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return shortenDimensions(x);
  }
}

function updateDimensions() {
  if (
    document.getElementById("antimatterdimensions").style.display == "block" &&
    document.getElementById("dimensions").style.display == "block"
  ) {
    for (let tier = 1; tier <= 8; ++tier) {
      var name = TIER_NAMES[tier];
      if (
        !canBuyDimension(tier) &&
        document.getElementById(name + "Row").style.display !== "table-row"
      ) {
        break;
      }
      document.getElementById(name + "D").childNodes[0].nodeValue =
        DISPLAY_NAMES[tier] +
        " Dimension x" +
        formatValue(
          player.options.notation,
          getDimensionFinalMultiplier(tier),
          1,
          1
        );
      document.getElementById(
        name + "Amount"
      ).textContent = getDimensionDescription(tier);
    }

    for (let tier = 1; tier <= 8; ++tier) {
      var name = TIER_NAMES[tier];
      if (!canBuyDimension(tier)) {
        break;
      }

      document.getElementById(name + "Row").style.display = "table-row";
      document.getElementById(name + "Row").style.visibility = "visible";
    }

    var shiftRequirement = getShiftRequirement(0);
    if (
      player.currentChallenge == "challenge4"
        ? shiftRequirement.tier < 6
        : shiftRequirement.tier < 8
    ) {
      document.getElementById("resetLabel").textContent =
        "Dimension Shift (" +
        player.resets +
        "): requires " +
        shiftRequirement.amount +
        " " +
        DISPLAY_NAMES[shiftRequirement.tier] +
        " Dimensions";
    } else
      document.getElementById("resetLabel").textContent =
        "Dimension Boost (" +
        formatInfOrEter(player.resets) +
        "): requires " +
        formatInfOrEter(shiftRequirement.amount) +
        " " +
        DISPLAY_NAMES[shiftRequirement.tier] +
        " Dimensions";

    if (
      player.currentChallenge == "challenge4"
        ? player.resets > 2
        : player.resets > 3
    ) {
      document.getElementById("softReset").textContent =
        "Reset your Dimensions for a Boost";
    } else {
      document.getElementById("softReset").textContent =
        "Reset your Dimensions for a new Dimension";
    }
    let extraGals = getTotalRGs();
    var galString = "";
    if (player.galaxies >= 800) galString += "Remote Antimatter Galaxies (";
    else if (
      player.galaxies >= getGalaxyCostScalingStart() ||
      player.currentEternityChall === "eterc5"
    )
      galString += "Distant Antimatter Galaxies (";
    else galString += "Antimatter Galaxies (";
    galString += formatInfOrEter(player.galaxies);
    if (extraGals > 0) galString += " + " + formatInfOrEter(extraGals);
    if (player.dilation.freeGalaxies > 0)
      galString += " + " + formatInfOrEter(player.dilation.freeGalaxies);
    galString += "): requires " + formatInfOrEter(getGalaxyRequirement());
    if (player.currentChallenge == "challenge4")
      galString += " Sixth Dimensions";
    else galString += " Eighth Dimensions";
    document.getElementById("secondResetLabel").textContent = galString;
  }

  updateMetaDimensions();

  if (canBuyTickSpeed() || player.currentEternityChall == "eterc9") {
    var infchall3 = "";
    var tickmult = getTickSpeedMultiplier();
    if (tickmult < 1e-9)
      document.getElementById("tickLabel").textContent =
        "Divide the tick interval by " +
        shortenDimensions(Decimal.recip(tickmult)) +
        infchall3 +
        ".";
    else {
      var places = 0;
      if (tickmult < 0.2)
        places = Math.floor(Math.log10(Math.round(1 / tickmult)));
      document.getElementById("tickLabel").textContent =
        "Reduce the tick interval by " +
        ((1 - tickmult) * 100).toFixed(places) +
        infchall3 +
        "%.";
    }

    document.getElementById("tickSpeed").style.visibility = "visible";
    document.getElementById("tickSpeedMax").style.visibility = "visible";
    document.getElementById("tickLabel").style.visibility = "visible";
    document.getElementById("tickSpeedAmount").style.visibility = "visible";
  } else {
    document.getElementById("tickSpeed").style.visibility = "hidden";
    document.getElementById("tickSpeedMax").style.visibility = "hidden";
    document.getElementById("tickLabel").style.visibility = "hidden";
    document.getElementById("tickSpeedAmount").style.visibility = "hidden";
  }

  if (player.bestInfinityTime == 9999999999) {
    document.getElementById("bestInfinity").textContent = "";
    document.getElementById("infinitied").textContent = "";
    document.getElementById("thisInfinity").textContent = "";
  } else {
    document.getElementById("bestInfinity").textContent =
      "Your fastest Infinity is in " +
      timeDisplay(player.bestInfinityTime) +
      ".";
    document.getElementById("thisInfinity").textContent =
      "You have spent " +
      timeDisplay(player.thisInfinityTime) +
      " in this Infinity.";
    if (player.infinityPoints.equals(1)) {
      document.getElementById("infinityPoints1").textContent =
        "You have 1 Infinity point.";
      document.getElementById("infinityPoints2").textContent =
        "You have 1 Infinity point.";
    } else {
      document.getElementById("infinityPoints1").innerHTML =
        'You have <span class="IPAmount1">' +
        shortenDimensions(player.infinityPoints) +
        "</span> Infinity points.";
      document.getElementById("infinityPoints2").innerHTML =
        'You have <span class="IPAmount2">' +
        shortenDimensions(player.infinityPoints) +
        "</span> Infinity points.";
    }
    if (new Decimal(player.infinitied).eq(1))
      document.getElementById("infinitied").textContent =
        "You have infinitied 1 time.";
    else
      document.getElementById("infinitied").textContent =
        "You have infinitied " + formatInfOrEter(player.infinitied) + " times.";
    if (player.eternities.gt(0))
      document.getElementById("infinitied").textContent =
        "You have infinitied " +
        formatInfOrEter(player.infinitied) +
        " times this eternity.";
  }

  if (
    document.getElementById("stats").style.display == "block" &&
    document.getElementById("statistics").style.display == "block"
  ) {
    document.getElementById("totalmoney").textContent =
      "You have made a total of " +
      shortenMoney(player.totalmoney) +
      " antimatter.";
    document.getElementById("totalresets").textContent =
      "You have performed " +
      formatInfOrEter(player.resets) +
      " dimension boosts/shifts.";
    document.getElementById("galaxies").textContent =
      "You have " + formatInfOrEter(player.galaxies) + " Antimatter Galaxies.";
    document.getElementById("totalTime").textContent =
      "You have played for " + timeDisplay(player.totalTimePlayed) + ".";

    if (player.eternities.eq(0)) {
      document.getElementById("eternitied").textContent = "";
      document.getElementById("besteternity").textContent = "";
      document.getElementById("thiseternity").textContent = "";
    } else {
      document.getElementById("eternitied").textContent =
        "You have Eternitied " + formatInfOrEter(player.eternities) + " times.";
      document.getElementById("besteternity").textContent =
        "You have spent " +
        timeDisplay(player.thisEternity) +
        " in this Eternity.";
      document.getElementById("thiseternity").textContent =
        "Your fastest Eternity is in " + timeDisplay(player.bestEternity) + ".";
    }
  }

  if (document.getElementById("infinity").style.display == "block") {
    if (document.getElementById("preinf").style.display == "block") {
      document.getElementById("infi11").innerHTML =
        "Antimatter Dimensions gain a multiplier based on time played.<br>Currently: " +
        timeMultUpg(1, 2) +
        "x<br>Cost: 1 IP";
      document.getElementById("infi12").innerHTML =
        "First and Eighth Dimensions gain a multiplier based on infinitied stat.<br>Currently: " +
        formatValue(player.options.notation, dimMults(), 1, 1) +
        "x<br>Cost: 1 IP";
      document.getElementById("infi13").innerHTML =
        "Third and Sixth Dimensions gain a multiplier based on infinitied stat.<br>Currently: " +
        formatValue(player.options.notation, dimMults(), 1, 1) +
        "x<br>Cost: 1 IP";
      document.getElementById("infi22").innerHTML =
        "Second and Seventh Dimensions gain a multiplier based on infinitied stat.<br>Currently: " +
        formatValue(player.options.notation, dimMults(), 1, 1) +
        "x<br>Cost: 1 IP";
      document.getElementById("infi23").innerHTML =
        "Fourth and Fifth Dimensions gain a multiplier based on infinitied stat.<br>Currently: " +
        formatValue(player.options.notation, dimMults(), 1, 1) +
        "x<br>Cost: 1 IP";
      document.getElementById("infi31").innerHTML =
        "Antimatter Dimensions gain a multiplier based on the time spent in this Infinity.<br>Currently: " +
        timeMultUpg(2, 2) +
        "x<br>Cost: 3 IP";
      document.getElementById("infi32").innerHTML =
        "The 1st Dimension is stronger based on your unspent Infinity Points.<br>Currently: " +
        formatValue(
          player.options.notation,
          player.infinityPoints
            .dividedBy(2)
            .pow(1.5)
            .plus(1),
          2,
          2
        ) +
        "x<br>Cost: 5 IP";
      document.getElementById("infi34").innerHTML =
        "You generate IP based on your fastest infinity time.<br>Currently: " +
        shortenDimensions(player.infMult) +
        " every " +
        timeDisplay(player.bestInfinityTime * 10) +
        "<br>Cost: 10 IP";
    } else if (document.getElementById("postinf").style.display == "block") {
      //TODO - SIMPLIFY ALL BREAK INFINITY FORMULAS INTO ONE FUNCTION
      document.getElementById("postinfi11").innerHTML =
        "Dimensions are more powerful based on total antimatter produced<br>Currently: " +
        shortenMoney(Math.pow(player.totalmoney.e + 1, 0.5)) +
        "x<br>Cost: " +
        shortenCosts(1e4) +
        " IP";
      document.getElementById("postinfi21").innerHTML =
        "Dimensions are more powerful based on current antimatter<br>Currently: " +
        shortenMoney(Math.pow(player.money.e + 1, 0.5)) +
        "x<br>Cost: " +
        shortenCosts(5e4) +
        " IP";
      document.getElementById("postinfi31").innerHTML =
        "Decrease the tickspeed cost multiplier increase<br>Currently: " +
        player.tickSpeedMultDecrease +
        "x -> " +
        (player.tickSpeedMultDecrease - 1) +
        "x each purchase after Infinity<br>Cost: " +
        shortenDimensions(player.tickSpeedMultDecreaseCost) +
        " IP";
      if (player.tickSpeedMultDecrease <= 2)
        document.getElementById("postinfi31").innerHTML =
          "Decrease the tickspeed cost multiplier increase<br>Currently: " +
          player.tickSpeedMultDecrease +
          "x each purchase after Infinity";
      document.getElementById("postinfi22").innerHTML =
        "Dimensions are more powerful based on achievements completed<br>Currently: " +
        shortenMoney(achievementMult) +
        "x<br>Cost: " +
        shortenCosts(1e6) +
        " IP";
      var postinfi12 = player.timestudy.studies.includes(31)
        ? Decimal.pow(new Decimal(getInfinitied().log(10)), 4).max(1)
        : new Decimal(getInfinitied().log(10)).max(1);
      document.getElementById("postinfi12").innerHTML =
        "Dimensions are more powerful based on your infinitied stat<br>Currently: " +
        shortenMoney(postinfi12) +
        "x<br>Cost: " +
        shortenCosts(1e5) +
        " IP";
      document.getElementById("postinfi41").innerHTML =
        "Galaxies are 50% stronger.<br>Cost: " + shortenCosts(5e11) + " IP";
      document.getElementById("postinfi32").innerHTML =
        "Dimensions are more powerful based on your slowest challenge record<br>Currently: " +
        shortenMoney(challengeMult) +
        "x<br>Cost: " +
        shortenCosts(1e7) +
        " IP";
      if (player.dimensionMultDecrease <= 3) {
        document.getElementById("postinfi42").innerHTML =
          "Decrease the dimension cost multiplier increase<br>Currently: " +
          player.dimensionMultDecrease.toFixed(1) +
          "x each per-10 purchase after Infinity";
      } else
        document.getElementById("postinfi42").innerHTML =
          "Decrease the dimension cost multiplier increase<br>Currently: " +
          player.dimensionMultDecrease +
          "x -> " +
          (player.dimensionMultDecrease - 1) +
          "x each per-10 purchase after Infinity<br>Cost: " +
          shortenCosts(player.dimensionMultDecreaseCost) +
          " IP";

      document.getElementById("postinfi13").innerHTML =
        "You passively generate infinitied stat based on your fastest infinity.<br>1 Infinity every " +
        timeDisplay(player.bestInfinityTime * 5) +
        " <br>Cost: " +
        shortenCosts(20e6) +
        " IP";
      document.getElementById("postinfi23").innerHTML =
        "Unlock the option to bulk buy Dimension Boosts <br>Cost: " +
        shortenCosts(5e9) +
        " IP";
      document.getElementById("postinfi33").innerHTML =
        "Autobuyers work twice as fast<br>Cost: " + shortenCosts(1e15) + " IP";

      document.getElementById("offlineProd").innerHTML =
        "Generate " +
        player.offlineProd +
        "% > " +
        Math.max(
          Math.max(5, player.offlineProd + 5),
          Math.min(50, player.offlineProd + 5)
        ) +
        "% of your best IP/min from last 10 infinities, works offline<br>Currently: " +
        shortenMoney(new Decimal(bestRunIppm).times(player.offlineProd / 100)) +
        " IP/min<br> Cost: " +
        shortenCosts(player.offlineProdCost) +
        " IP";
      if (player.offlineProd == 50)
        document.getElementById("offlineProd").innerHTML =
          "Generate " +
          player.offlineProd +
          "% of your best IP/min from last 10 infinities, works offline<br>Currently: " +
          shortenMoney(
            new Decimal(bestRunIppm).times(player.offlineProd / 100)
          ) +
          " IP/min";
    }
  }

  if (
    document.getElementById("eternityupgrades").style.display == "block" &&
    document.getElementById("eternitystore").style.display == "block"
  ) {
    document.getElementById("eter1").innerHTML =
      "Infinity Dimensions multiplier based on unspent EP (x+1)<br>Currently: " +
      shortenMoney(player.eternityPoints.plus(1)) +
      "x<br>Cost: 5 EP";
    var eter2 = player.achievements.includes("r145")
      ? "(x^log(x)^3.75)"
      : "((x/200)^log4(2x))";
    document.getElementById("eter2").innerHTML =
      "Infinity Dimensions multiplier based on eternities " +
      eter2 +
      "<br>Currently: " +
      shortenMoney(eterUpg2Mult()) +
      "x<br>Cost: 10 EP";
    document.getElementById("eter3").innerHTML =
      "Infinity Dimensions multiplier based on the sum of Infinity Challenge times<br>Currently: " +
      shortenMoney(
        Decimal.pow(
          2,
          300 /
            Math.max(
              infchallengeTimes,
              player.achievements.includes("r112") ? 6.1 : 7.5
            )
        )
      ) +
      "x<br>Cost: " +
      shortenCosts(50e3) +
      " EP";
    document.getElementById("eter4").innerHTML =
      "Your achievement bonus affects Time Dimensions" +
      "<br>Cost: " +
      shortenCosts(1e16) +
      " EP";
    document.getElementById("eter5").innerHTML =
      "Time Dimensions are more powerful based on your amount of unspent time theorems" +
      "<br>Cost: " +
      shortenCosts(1e40) +
      " EP";
    document.getElementById("eter6").innerHTML =
      "Time Dimensions are more powerful based on time played<br>Currently: " +
      new Decimal(player.totalTimePlayed / (10 * 21600))
        .max(1)
        .min(100)
        .toFixed(2) +
      "x<br>Cost: " +
      shortenCosts(1e50) +
      " EP";
    document.getElementById("eter7").innerHTML =
      "Dilated time gain is boosted by antimatter<br>Currently: " +
      (1 + Math.log10(Math.max(1, player.money.log(10))) / 30).toFixed(3) +
      "x<br>Cost: " +
      shortenCosts(new Decimal("1e1500")) +
      " EP";
    document.getElementById("eter8").innerHTML =
      "Dilated time gain is boosted by infinity points<br>Currently: " +
      (
        1 +
        Math.log10(Math.max(1, player.infinityPoints.add(1).log(16))) / 30
      ).toFixed(3) +
      "x<br>Cost: " +
      shortenCosts(new Decimal("1e2000")) +
      " EP";
    document.getElementById("eter9").innerHTML =
      "Dilated time gain is boosted by eternity points<br>Currently: " +
      (
        1 +
        Math.log10(Math.max(1, player.eternityPoints.add(1).log(8))) / 30
      ).toFixed(3) +
      "x<br>Cost: " +
      shortenCosts(new Decimal("1e2500")) +
      " EP";
  }

  if (document.getElementById("dilation").style.display == "block") {
    if (player.dilation.active) {
      let gain = getDilGain();
      let req = getDilReq();
      let finalGain = gain.minus(player.dilation.totalTachyonParticles);
      if (finalGain.lte(0)) {
        document.getElementById("enabledilation").innerHTML =
          "Disable dilation.<br>Reach " +
          shortenMoney(req) +
          " antimatter to gain more Tachyon Particles.";
      } else if (player.infinityPoints.lte(Number.MAX_VALUE)) {
        document.getElementById("enabledilation").textContent =
          "You need to get " +
          shortenMoney(Number.MAX_VALUE) +
          " IP in dilation to gain Tachyon Particles.";
      } else {
        document.getElementById(
          "enabledilation"
        ).textContent = `Disable dilation for ${shortenMoney(
          finalGain
        )} Tachyon Particles.`;
      }
    } else
      document.getElementById("enabledilation").textContent = "Dilate time.";
  }
}

function updateCosts() {
  document.getElementById("first").textContent =
    (player.quantum.times < 0 ? "Cost: " : "") + shortenCosts(player.firstCost);
  document.getElementById("second").textContent =
    (player.quantum.times < 0 ? "Cost: " : "") +
    shortenCosts(player.secondCost);
  document.getElementById("third").textContent =
    (player.quantum.times < 0 ? "Cost: " : "") + shortenCosts(player.thirdCost);
  document.getElementById("fourth").textContent =
    (player.quantum.times < 0 ? "Cost: " : "") +
    shortenCosts(player.fourthCost);
  document.getElementById("fifth").textContent =
    (player.quantum.times < 0 ? "Cost: " : "") + shortenCosts(player.fifthCost);
  document.getElementById("sixth").textContent =
    (player.quantum.times < 0 ? "Cost: " : "") + shortenCosts(player.sixthCost);
  document.getElementById("seventh").textContent =
    (player.quantum.times < 0 ? "Cost: " : "") +
    shortenCosts(player.seventhCost);
  document.getElementById("eight").textContent =
    (player.quantum.times < 0 ? "Cost: " : "") + shortenCosts(player.eightCost);

  document.getElementById("firstMax").textContent =
    (player.quantum.times < 0 ? "Until 10, Cost: " : "") +
    shortenCosts(player.firstCost.times(10 - dimBought(1)));
  document.getElementById("secondMax").textContent =
    (player.quantum.times < 0 ? "Until 10, Cost: " : "") +
    shortenCosts(player.secondCost.times(10 - dimBought(2)));
  document.getElementById("thirdMax").textContent =
    (player.quantum.times < 0 ? "Until 10, Cost: " : "") +
    shortenCosts(player.thirdCost.times(10 - dimBought(3)));
  document.getElementById("fourthMax").textContent =
    (player.quantum.times < 0 ? "Until 10, Cost: " : "") +
    shortenCosts(player.fourthCost.times(10 - dimBought(4)));
  document.getElementById("fifthMax").textContent =
    (player.quantum.times < 0 ? "Until 10, Cost: " : "") +
    shortenCosts(player.fifthCost.times(10 - dimBought(5)));
  document.getElementById("sixthMax").textContent =
    (player.quantum.times < 0 ? "Until 10, Cost: " : "") +
    shortenCosts(player.sixthCost.times(10 - dimBought(6)));
  document.getElementById("seventhMax").textContent =
    (player.quantum.times < 0 ? "Until 10, Cost: " : "") +
    shortenCosts(player.seventhCost.times(10 - dimBought(7)));
  document.getElementById("eightMax").textContent =
    (player.quantum.times < 0 ? "Until 10, Cost: " : "") +
    shortenCosts(player.eightCost.times(10 - dimBought(8)));

  document.getElementById("tickSpeed").textContent = canBuyTickSpeed()
    ? "Cost: " + shortenCosts(player.tickSpeedCost)
    : "Disabled";
  // see how much simple this is? I wonder why this wasn't done for the normal dimensions...
  for (var i = 1; i <= 8; i++) {
    document.getElementById("infMax" + i).textContent =
      "Cost: " + shortenCosts(player["infinityDimension" + i].cost) + " IP";
  }

  for (var i = 1; i <= 8; i++) {
    document.getElementById("timeMax" + i).textContent =
      "Cost: " + shortenDimensions(player["timeDimension" + i].cost) + " EP";
  }

  for (var i = 1; i <= 8; i++) {
    document.getElementById("meta" + i).textContent =
      "Cost: " + shortenCosts(player.meta[i].cost);
    document.getElementById("metaMax" + i).textContent =
      "Until 10, Cost: " + shortenCosts(getMetaMaxCost(i));
  }
}

function floatText(id, text, leftOffset = 150) {
  if (!player.options.animations.floatingText) return;
  var el = $("#" + id);
  el.append(
    "<div class='floatingText' style='left: " +
      leftOffset +
      "px'>" +
      text +
      "</div>"
  );
  setTimeout(function() {
    el.children()[0].remove();
  }, 1000);
}

function isEterChall(elem) {
  return !elem.id.includes("eter");
}

function updateChallenges() {
  try {
    var buttons = Array.from(
      document.getElementsByClassName("onchallengebtn")
    ).filter(isEterChall);
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].className = "challengesbtn";
      buttons[i].textContent = "Start";
    }

    var buttonss = Array.from(
      document.getElementsByClassName("completedchallengesbtn")
    ).filter(isEterChall);
    for (var i = 0; i < buttonss.length; i++) {
      buttonss[i].className = "challengesbtn";
      buttonss[i].textContent = "Start";
    }

    for (var i = 0; i < player.challenges.length; i++) {
      document.getElementById(player.challenges[i]).className =
        "completedchallengesbtn";
      document.getElementById(player.challenges[i]).textContent = "Completed";
    }

    if (player.currentChallenge != "") {
      document.getElementById(player.currentChallenge).className =
        "onchallengebtn";
      document.getElementById(player.currentChallenge).textContent = "Running";
    }

    if (
      player.money.gte(new Decimal("1e2000")) ||
      Object.keys(player.eternityChalls).length > 0 ||
      player.eternityChallUnlocked !== 0
    )
      document.getElementById("challTabButtons").style.display = "table";
    for (var i = 1; i < 9; i++) {
      if (player.postChallUnlocked >= i)
        document.getElementById("postc" + i + "div").style.display =
          "inline-block";
      else document.getElementById("postc" + i + "div").style.display = "none";
    }
  } catch (err) {
    console.log(err);
    updateChallenges();
  }
}

function updateEternityChallenges() {
  for (var property in player.eternityChalls) {
    document.getElementById(property + "div").style.display = "inline-block";
    if (player.eternityChalls[property] < 5) {
      document.getElementById(property).textContent = "Locked";
      document.getElementById(property).className = "lockedchallengesbtn";
    } else {
      document.getElementById(property).textContent = "Completed";
      document.getElementById(property).className = "completedchallengesbtn";
    }
  }

  if (player.eternityChallUnlocked !== 0) {
    document.getElementById(
      "eterc" + player.eternityChallUnlocked
    ).textContent = "Start";
    document.getElementById("eterc" + player.eternityChallUnlocked).className =
      "challengesbtn";
    document.getElementById("eterctabbtn").style.display = "block";
  } else {
    for (i = 1; i < 13; i++) {
      if (player.eternityChalls["eterc" + i] !== 5) {
        document.getElementById("eterc" + i).textContent = "Locked";
        document.getElementById("eterc" + i).className = "lockedchallengesbtn";
      }
    }
  }

  if (
    player.eternityChallUnlocked == 0 &&
    player.eternityChalls.eterc1 === undefined
  ) {
    document.getElementById("eterctabbtn").style.display = "none";
    for (i = 1; i < 13; i++) {
      document.getElementById("eterc" + i + "div").style.display = "none";
    }
  }

  if (player.eternityChalls.eterc1 !== undefined)
    document.getElementById("eterctabbtn").style.display = "block";
  if (player.etercreq !== 0)
    document.getElementById("eterc" + player.etercreq + "div").style.display =
      "block";

  if (player.currentEternityChall !== "") {
    document.getElementById(player.currentEternityChall).textContent =
      "Running";
    document.getElementById(player.currentEternityChall).className =
      "onchallengebtn";
  }
}

function toggleChallengeRetry() {
  player.options.retryChallenge = !player.options.retryChallenge;
  let retry = player.options.retryChallenge ? "N" : "FF";
  document.getElementById("retry").textContent =
    "Automatically retry challenges: O" + retry;
}

document.getElementById("news").onclick = function() {
  if (
    document.getElementById("news").textContent ===
    "Click this to unlock a secret achievement."
  ) {
    giveAchievement("Real news");
  }
};

document.getElementById("secretstudy").onclick = function() {
  document.getElementById("secretstudy").style.opacity = "1";
  document.getElementById("secretstudy").style.cursor = "default";
  giveAchievement("Go study in real life instead");
  setTimeout(drawStudyTree, 2000);
};

document.getElementById("The first one's always free").onclick = function() {
  giveAchievement("The first one's always free");
};

document.getElementById("maxall").onclick = function() {
  if (!player.break && player.money.gt(Number.MAX_VALUE)) return false;
  buyMaxTickSpeed();

  for (var tier = 1; tier < 9; tier++) {
    var name = TIER_NAMES[tier];
    var cost = player[name + "Cost"].times(10 - dimBought(tier));
    var multBefore = player[name + "Pow"];
    if (
      tier >= 3 &&
      (player.currentChallenge == "challenge10" ||
        player.currentChallenge == "postc1")
    ) {
      if (!canBuyDimension(tier)) continue;
      if (player[TIER_NAMES[tier - 2] + "Amount"].lt(cost)) continue;
      if (canBuyDimension(tier)) {
        if (
          cost.lt(player[TIER_NAMES[tier - 2] + "Amount"]) &&
          dimBought(tier) != 0
        ) {
          player[TIER_NAMES[tier - 2] + "Amount"] = player[
            TIER_NAMES[tier - 2] + "Amount"
          ].minus(cost);
          player[name + "Amount"] = Decimal.round(
            player[name + "Amount"].plus(10 - dimBought(tier))
          );
          player[name + "Bought"] += 10 - dimBought(tier);
          player[name + "Pow"] = player[name + "Pow"].times(
            getDimensionPowerMultiplier(tier)
          );
          player[name + "Cost"] = player[name + "Cost"].times(
            getDimensionCostMultiplier(tier)
          );
        }
        while (
          player[TIER_NAMES[tier - 2] + "Amount"].gt(
            player[name + "Cost"].times(10)
          )
        ) {
          player[TIER_NAMES[tier - 2] + "Amount"] = player[
            TIER_NAMES[tier - 2] + "Amount"
          ].minus(player[name + "Cost"].times(10));
          player[name + "Cost"] = player[name + "Cost"].times(
            getDimensionCostMultiplier(tier)
          );
          player[name + "Amount"] = Decimal.round(
            player[name + "Amount"].plus(10)
          );
          player[name + "Bought"] += 10;
          player[name + "Pow"] = player[name + "Pow"].times(
            getDimensionPowerMultiplier(tier)
          );
          if (player[name + "Cost"].gte(Number.MAX_VALUE))
            player.costMultipliers[tier - 1] = player.costMultipliers[
              tier - 1
            ].times(player.dimensionMultDecrease);
        }

        onBuyDimension(tier);
      }
    } else {
      if (!canBuyDimension(tier)) continue;
      if (cost.lt(player.money) && dimBought(tier) != 0) {
        player.money = player.money.minus(cost);
        player[name + "Amount"] = Decimal.round(
          player[name + "Amount"].plus(10 - dimBought(tier))
        );
        player[name + "Bought"] += 10 - dimBought(tier);
        player[name + "Pow"] = player[name + "Pow"].times(
          getDimensionPowerMultiplier(tier)
        );
        player[name + "Cost"] = player[name + "Cost"].times(
          getDimensionCostMultiplier(tier)
        );
      }
      if (player.money.lt(player[name + "Cost"].times(10))) continue;

      if (
        player.dimensionMultDecrease > 3 ||
        player.currentChallenge == "postc5" ||
        player.currentChallenge == "challenge5"
      ) {
        while (
          (player.money.gte(player[name + "Cost"].times(10)) &&
            player.money.lte(Number.MAX_VALUE)) ||
          (player.money.gte(player[name + "Cost"].times(10)) &&
            player.currentChallenge != "challenge5")
        ) {
          player.money = player.money.minus(player[name + "Cost"].times(10));
          if (
            player.currentChallenge != "challenge5" &&
            player.currentChallenge != "postc5"
          )
            player[name + "Cost"] = player[name + "Cost"].times(
              getDimensionCostMultiplier(tier)
            );
          else if (player.currentChallenge == "postc5")
            multiplyPC5Costs(player[name + "Cost"], tier);
          else multiplySameCosts(player[name + "Cost"]);
          player[name + "Amount"] = Decimal.round(
            player[name + "Amount"].plus(10)
          );
          player[name + "Bought"] += 10;
          player[name + "Pow"] = player[name + "Pow"].times(
            getDimensionPowerMultiplier(tier)
          );
          if (player[name + "Cost"].gte(Number.MAX_VALUE))
            player.costMultipliers[tier - 1] = player.costMultipliers[
              tier - 1
            ].times(player.dimensionMultDecrease);
          if (player.currentChallenge == "challenge8")
            clearDimensions(tier - 1);
        }
      } else {
        if (player[name + "Cost"].lt(Number.MAX_VALUE)) {
          while (
            player.money.gte(player[name + "Cost"].times(10)) &&
            player[name + "Cost"].lte(Number.MAX_VALUE)
          ) {
            player.money = player.money.minus(player[name + "Cost"].times(10));
            if (
              player.currentChallenge != "challenge5" &&
              player.currentChallenge != "postc5"
            )
              player[name + "Cost"] = player[name + "Cost"].times(
                getDimensionCostMultiplier(tier)
              );
            else if (player.currentChallenge == "postc5")
              multiplyPC5Costs(player[name + "Cost"], tier);
            else multiplySameCosts(player[name + "Cost"]);
            player[name + "Amount"] = Decimal.round(
              player[name + "Amount"].plus(10)
            );
            player[name + "Bought"] += 10;
            player[name + "Pow"] = player[name + "Pow"].times(
              getDimensionPowerMultiplier(tier)
            );
            if (player[name + "Cost"].gte(Number.MAX_VALUE))
              player.costMultipliers[tier - 1] = player.costMultipliers[
                tier - 1
              ].times(player.dimensionMultDecrease);
            if (player.currentChallenge == "challenge8")
              clearDimensions(tier - 1);
          }
        }

        if (player[name + "Cost"].gte(Number.MAX_VALUE)) {
          var a = Math.log10(Math.sqrt(player.dimensionMultDecrease));
          var b = player.costMultipliers[tier - 1]
            .dividedBy(Math.sqrt(player.dimensionMultDecrease))
            .log10();
          var c = player[name + "Cost"].dividedBy(player.money).log10();
          var discriminant = Math.pow(b, 2) - c * a * 4;
          if (discriminant < 0) continue;
          var buying =
            Math.floor((Math.sqrt(Math.pow(b, 2) - c * a * 4) - b) / (2 * a)) +
            1;
          if (buying <= 0) return false;
          player[name + "Amount"] = Decimal.round(
            player[name + "Amount"].plus(10 * buying)
          );
          preInfBuy = Math.floor(
            1 + (308 - initCost[tier].log10()) / costMults[tier].log10()
          );
          postInfBuy = player[name + "Bought"] / 10 + buying - preInfBuy - 1;
          postInfInitCost = initCost[tier].times(
            Decimal.pow(costMults[tier], preInfBuy)
          );
          player[name + "Bought"] += 10 * buying;
          player[name + "Pow"] = player[name + "Pow"].times(
            Decimal.pow(getDimensionPowerMultiplier(tier), buying)
          );

          newCost = postInfInitCost
            .times(Decimal.pow(costMults[tier], postInfBuy))
            .times(
              Decimal.pow(
                player.dimensionMultDecrease,
                (postInfBuy * (postInfBuy + 1)) / 2
              )
            );
          newMult = costMults[tier].times(
            Decimal.pow(player.dimensionMultDecrease, postInfBuy + 1)
          );
          //if (buying > 0 )player[name + "Cost"] = player.costMultipliers[tier-1].times(Decimal.pow(player.dimensionMultDecrease, (buying * buying - buying)/2)).times(player[name + "Cost"])

          player[name + "Cost"] = newCost;
          player.costMultipliers[tier - 1] = newMult;
          if (player.money.gte(player[name + "Cost"]))
            player.money = player.money.minus(player[name + "Cost"]);
          player[name + "Cost"] = player[name + "Cost"].times(
            player.costMultipliers[tier - 1]
          );
          player.costMultipliers[tier - 1] = player.costMultipliers[
            tier - 1
          ].times(player.dimensionMultDecrease);
        }
      }
    }
    if (
      (player.currentChallenge == "challenge12" ||
        player.currentChallenge == "postc1" ||
        player.currentChallenge == "postc6") &&
      player.matter.equals(0)
    )
      player.matter = new Decimal(1);
    if (
      player.currentChallenge == "challenge2" ||
      player.currentChallenge == "postc1"
    )
      player.chall2Pow = 0;
    if (player.currentChallenge == "postc1") clearDimensions(tier - 1);
    player.postC4Tier = tier;
    onBuyDimension(tier);
    floatText(
      name + "D",
      "x" + shortenMoney(player[name + "Pow"].dividedBy(multBefore))
    );
  }
};

document.getElementById("challengeconfirmation").onclick = function() {
  player.options.challConf = !player.options.challConf;
  let x = player.options.challConf ? "N" : "FF";
  document.getElementById("challengeconfirmation").textContent =
    "Challenge confirmation: O" + x;
};

function buyInfinityUpgrade(name, cost) {
  if (
    player.infinityPoints.gte(cost) &&
    !player.infinityUpgrades.includes(name)
  ) {
    player.infinityUpgrades.push(name);
    player.infinityPoints = player.infinityPoints.minus(cost);
    return true;
  } else return false;
}

document.getElementById("infiMult").onclick = function() {
  if (
    player.infinityUpgrades.includes("skipResetGalaxy") &&
    player.infinityUpgrades.includes("passiveGen") &&
    player.infinityUpgrades.includes("galaxyBoost") &&
    player.infinityUpgrades.includes("resetBoost") &&
    player.infinityPoints.gte(player.infMultCost)
  ) {
    player.infinityPoints = player.infinityPoints.minus(player.infMultCost);
    player.infMult = player.infMult.times(getInfMult());
    player.autoIP = player.autoIP.times(getInfMult());
    player.infMultCost = player.infMultCost.times(10);
    updateInfMult();
    if (
      player.autobuyers[11].priority !== undefined &&
      player.autobuyers[11].priority !== null &&
      player.autoCrunchMode == "amount"
    )
      player.autobuyers[11].priority = player.autobuyers[11].priority.times(2);
    if (player.autoCrunchMode == "amount")
      document.getElementById("priority12").value = formatValue(
        "Scientific",
        player.autobuyers[11].priority,
        2,
        0
      );
  }
};

function updateEternityUpgrades() {
  document.getElementById("eter1").className = player.eternityUpgrades.includes(
    1
  )
    ? "eternityupbtnbought"
    : player.eternityPoints.gte(5)
    ? "eternityupbtn"
    : "eternityupbtnlocked";
  document.getElementById("eter2").className = player.eternityUpgrades.includes(
    2
  )
    ? "eternityupbtnbought"
    : player.eternityPoints.gte(10)
    ? "eternityupbtn"
    : "eternityupbtnlocked";
  document.getElementById("eter3").className = player.eternityUpgrades.includes(
    3
  )
    ? "eternityupbtnbought"
    : player.eternityPoints.gte(50e3)
    ? "eternityupbtn"
    : "eternityupbtnlocked";
  document.getElementById("eter4").className = player.eternityUpgrades.includes(
    4
  )
    ? "eternityupbtnbought"
    : player.eternityPoints.gte(1e16)
    ? "eternityupbtn"
    : "eternityupbtnlocked";
  document.getElementById("eter5").className = player.eternityUpgrades.includes(
    5
  )
    ? "eternityupbtnbought"
    : player.eternityPoints.gte(1e40)
    ? "eternityupbtn"
    : "eternityupbtnlocked";
  document.getElementById("eter6").className = player.eternityUpgrades.includes(
    6
  )
    ? "eternityupbtnbought"
    : player.eternityPoints.gte(1e50)
    ? "eternityupbtn"
    : "eternityupbtnlocked";
  document.getElementById("eter7").className = player.eternityUpgrades.includes(
    7
  )
    ? "eternityupbtnbought"
    : player.eternityPoints.gte(new Decimal("1e1500"))
    ? "eternityupbtn"
    : "eternityupbtnlocked";
  document.getElementById("eter8").className = player.eternityUpgrades.includes(
    8
  )
    ? "eternityupbtnbought"
    : player.eternityPoints.gte(new Decimal("1e2000"))
    ? "eternityupbtn"
    : "eternityupbtnlocked";
  document.getElementById("eter9").className = player.eternityUpgrades.includes(
    9
  )
    ? "eternityupbtnbought"
    : player.eternityPoints.gte(new Decimal("1e2500"))
    ? "eternityupbtn"
    : "eternityupbtnlocked";
}

function buyEternityUpgrade(name, cost) {
  if (
    player.eternityPoints.gte(cost) &&
    !player.eternityUpgrades.includes(name)
  ) {
    player.eternityUpgrades.push(name);
    player.eternityPoints = player.eternityPoints.minus(cost);
    updateEternityUpgrades();
  }
}

function playerInfinityUpgradesOnEternity() {
  if (player.eternities < 4) player.infinityUpgrades = [];
  else if (player.eternities < 20)
    player.infinityUpgrades = [
      "timeMult",
      "dimMult",
      "timeMult2",
      "skipReset1",
      "skipReset2",
      "unspentBonus",
      "27Mult",
      "18Mult",
      "36Mult",
      "resetMult",
      "skipReset3",
      "passiveGen",
      "45Mult",
      "resetBoost",
      "galaxyBoost",
      "skipResetGalaxy"
    ];
}

document.getElementById("infi11").onclick = function() {
  buyInfinityUpgrade("timeMult", 1);
};

document.getElementById("infi21").onclick = function() {
  buyInfinityUpgrade("dimMult", 1);
};

document.getElementById("infi12").onclick = function() {
  if (player.infinityUpgrades.includes("timeMult"))
    buyInfinityUpgrade("18Mult", 1);
};

document.getElementById("infi22").onclick = function() {
  if (player.infinityUpgrades.includes("dimMult"))
    buyInfinityUpgrade("27Mult", 1);
};

document.getElementById("infi13").onclick = function() {
  if (player.infinityUpgrades.includes("18Mult"))
    buyInfinityUpgrade("36Mult", 1);
};
document.getElementById("infi23").onclick = function() {
  if (player.infinityUpgrades.includes("27Mult"))
    buyInfinityUpgrade("45Mult", 1);
};

document.getElementById("infi14").onclick = function() {
  if (player.infinityUpgrades.includes("36Mult"))
    buyInfinityUpgrade("resetBoost", 1);
};

document.getElementById("infi24").onclick = function() {
  if (player.infinityUpgrades.includes("45Mult"))
    buyInfinityUpgrade("galaxyBoost", 2);
};

document.getElementById("infi31").onclick = function() {
  buyInfinityUpgrade("timeMult2", 3);
};

document.getElementById("infi32").onclick = function() {
  if (player.infinityUpgrades.includes("timeMult2"))
    buyInfinityUpgrade("unspentBonus", 5);
};

document.getElementById("infi33").onclick = function() {
  if (player.infinityUpgrades.includes("unspentBonus"))
    buyInfinityUpgrade("resetMult", 7);
};

document.getElementById("infi34").onclick = function() {
  if (player.infinityUpgrades.includes("resetMult"))
    buyInfinityUpgrade("passiveGen", 10);
};

document.getElementById("infi41").onclick = function() {
  buyInfinityUpgrade("skipReset1", 20);
};

document.getElementById("infi42").onclick = function() {
  if (player.infinityUpgrades.includes("skipReset1"))
    buyInfinityUpgrade("skipReset2", 40);
};

document.getElementById("infi43").onclick = function() {
  if (player.infinityUpgrades.includes("skipReset2"))
    buyInfinityUpgrade("skipReset3", 80);
};

document.getElementById("infi44").onclick = function() {
  if (player.infinityUpgrades.includes("skipReset3"))
    buyInfinityUpgrade("skipResetGalaxy", 500);
};

document.getElementById("postinfi11").onclick = function() {
  buyInfinityUpgrade("totalMult", 1e4);
};

document.getElementById("postinfi21").onclick = function() {
  buyInfinityUpgrade("currentMult", 5e4);
};

document.getElementById("postinfi31").onclick = function() {
  if (
    player.infinityPoints.gte(player.tickSpeedMultDecreaseCost) &&
    player.tickSpeedMultDecrease > 2
  ) {
    player.infinityPoints = player.infinityPoints.minus(
      player.tickSpeedMultDecreaseCost
    );
    player.tickSpeedMultDecreaseCost *= 5;
    player.tickSpeedMultDecrease--;
    if (player.tickSpeedMultDecrease === 2) {
      player.tickSpeedMultDecrease = 1.65;
    }
    document.getElementById("postinfi31").innerHTML =
      "Tickspeed cost multiplier increase <br>" +
      player.tickSpeedMultDecrease +
      "x -> " +
      (player.tickSpeedMultDecrease - 1) +
      "x<br>Cost: " +
      shortenCosts(player.tickSpeedMultDecreaseCost) +
      " IP";
    if (player.tickSpeedMultDecrease <= 2)
      document.getElementById("postinfi31").innerHTML =
        "Tickspeed cost multiplier increase <br>" +
        player.tickSpeedMultDecrease +
        "x";
  }
};

document.getElementById("postinfi41").onclick = function() {
  buyInfinityUpgrade("postGalaxy", 5e11);
};

document.getElementById("postinfi12").onclick = function() {
  buyInfinityUpgrade("infinitiedMult", 1e5);
};

document.getElementById("postinfi22").onclick = function() {
  buyInfinityUpgrade("achievementMult", 1e6);
};

document.getElementById("postinfi32").onclick = function() {
  buyInfinityUpgrade("challengeMult", 1e7);
};

document.getElementById("postinfi42").onclick = function() {
  if (
    player.infinityPoints.gte(player.dimensionMultDecreaseCost) &&
    player.dimensionMultDecrease > 3
  ) {
    player.infinityPoints = player.infinityPoints.minus(
      player.dimensionMultDecreaseCost
    );
    player.dimensionMultDecreaseCost *= 5000;
    player.dimensionMultDecrease--;
    if (player.dimensionMultDecrease === 3) {
      player.dimensionMultDecrease = 2;
    }
    document.getElementById("postinfi42").innerHTML =
      "Dimension cost multiplier increase <br>" +
      player.dimensionMultDecrease +
      "x -> " +
      (player.dimensionMultDecrease - 1) +
      "x<br>Cost: " +
      shortenCosts(player.dimensionMultDecreaseCost) +
      " IP";
    if (player.dimensionMultDecrease <= 3)
      document.getElementById("postinfi42").innerHTML =
        "Dimension cost multiplier increase <br>" +
        player.dimensionMultDecrease.toFixed(1) +
        "x";
  }
};

document.getElementById("offlineProd").onclick = function() {
  if (
    player.infinityPoints.gte(player.offlineProdCost) &&
    player.offlineProd < 50
  ) {
    player.infinityPoints = player.infinityPoints.minus(player.offlineProdCost);
    player.offlineProdCost *= 10;
    player.offlineProd += 5;
  }
};

function updateInfCosts() {
  updateInfMult();
  if (
    document.getElementById("replicantis").style.display == "block" &&
    document.getElementById("infinity").style.display == "block"
  ) {
    if (player.replicanti.chance < 1)
      document.getElementById("replicantichance").innerHTML =
        "Replicate chance: " +
        Math.round(player.replicanti.chance * 100) +
        "%<br>+" +
        1 +
        "% Costs: " +
        shortenCosts(player.replicanti.chanceCost) +
        " IP";
    else
      document.getElementById("replicantichance").textContent =
        "Replicate chance: " + Math.round(player.replicanti.chance * 100) + "%";
    let replGalOver = 0;
    if (player.timestudy.studies.includes(131))
      replGalOver += Math.floor(player.replicanti.gal / 2);
    if (player.timestudy.studies.includes(233)) {
      if (replGalOver !== 0)
        document.getElementById("replicantimax").innerHTML =
          "Max Replicanti galaxies: " +
          player.replicanti.gal +
          "+" +
          replGalOver +
          "<br>+1 Costs: " +
          shortenCosts(
            player.replicanti.galCost.dividedBy(
              player.replicanti.amount.pow(0.3)
            )
          ) +
          " IP";
      else
        document.getElementById("replicantimax").innerHTML =
          "Max Replicanti galaxies: " +
          player.replicanti.gal +
          "<br>+1 Costs: " +
          shortenCosts(
            player.replicanti.galCost.dividedBy(
              player.replicanti.amount.pow(0.3)
            )
          ) +
          " IP";
    } else {
      if (replGalOver !== 0)
        document.getElementById("replicantimax").innerHTML =
          "Max Replicanti galaxies: " +
          player.replicanti.gal +
          "+" +
          replGalOver +
          "<br>+1 Costs: " +
          shortenCosts(player.replicanti.galCost) +
          " IP";
      else
        document.getElementById("replicantimax").innerHTML =
          "Max Replicanti galaxies: " +
          player.replicanti.gal +
          "<br>+1 Costs: " +
          shortenCosts(player.replicanti.galCost) +
          " IP";
    }
    document.getElementById("replicantiunlock").innerHTML =
      "Unlock Replicantis<br>Cost: " + shortenCosts(1e140) + " IP";
    RGDisplayAmount();
    document.getElementById("replicantichance").className =
      player.infinityPoints.gte(player.replicanti.chanceCost) &&
      player.replicanti.chance < 1
        ? "storebtn"
        : "unavailablebtn";
    document.getElementById("replicantiinterval").className =
      player.infinityPoints.gte(player.replicanti.intervalCost) &&
      (player.replicanti.interval !== 50 ||
        player.timestudy.studies.includes(22)) &&
      player.replicanti.interval !== 1
        ? "storebtn"
        : "unavailablebtn";
    document.getElementById(
      "replicantimax"
    ).className = player.infinityPoints.gte(player.replicanti.galCost)
      ? "storebtn"
      : "unavailablebtn";
    document.getElementById("replicantireset").className =
      (player.replicanti.galaxies < player.replicanti.gal &&
        player.replicanti.amount.gte(Number.MAX_VALUE)) ||
      (player.replicanti.galaxies < Math.floor(player.replicanti.gal * 1.5) &&
        player.replicanti.amount.gte(Number.MAX_VALUE) &&
        player.timestudy.studies.includes(131))
        ? "storebtn"
        : "unavailablebtn";
    document.getElementById(
      "replicantiunlock"
    ).className = player.infinityPoints.gte(1e140)
      ? "storebtn"
      : "unavailablebtn";
  }

  if (
    document.getElementById("timestudies").style.display == "block" &&
    document.getElementById("eternitystore").style.display == "block"
  ) {
    getTimeStudiesDescription(); //moved to timestudies.js because of their relevance
    getECStudyDescription();
  }
  updatePenalty();
}

// Replicanti stuff

function unlockReplicantis() {
  if (player.infinityPoints.gte(1e140)) {
    document.getElementById("replicantidiv").style.display = "inline-block";
    document.getElementById("replicantiunlock").style.display = "none";
    player.replicanti.unl = true;
    player.replicanti.amount = new Decimal(1);
    player.infinityPoints = player.infinityPoints.minus(1e140);
  }
}

function upgradeReplicantiChance() {
  if (
    player.infinityPoints.gte(player.replicanti.chanceCost) &&
    player.replicanti.chance < 1 &&
    player.eterc8repl !== 0
  ) {
    player.infinityPoints = player.infinityPoints.minus(
      player.replicanti.chanceCost
    );
    player.replicanti.chanceCost = player.replicanti.chanceCost.times(1e15);
    player.replicanti.chance += 0.01;
    if (player.currentEternityChall == "eterc8") player.eterc8repl -= 1;
    document.getElementById("eterc8repl").textContent =
      "You have " + player.eterc8repl + " purchases left.";
  }
}

function upgradeReplicantiInterval() {
  if (
    player.infinityPoints.gte(player.replicanti.intervalCost) &&
    (player.replicanti.interval > 50 ||
      player.timestudy.studies.includes(22)) &&
    player.replicanti.interval !== 1 &&
    player.eterc8repl !== 0
  ) {
    player.infinityPoints = player.infinityPoints.minus(
      player.replicanti.intervalCost
    );
    player.replicanti.intervalCost = player.replicanti.intervalCost.times(1e10);
    player.replicanti.interval *= 0.9;
    if (
      !player.timestudy.studies.includes(22) &&
      player.replicanti.interval < 50
    )
      player.replicanti.interval = 50;
    if (player.timestudy.studies.includes(22) && player.replicanti.interval < 1)
      player.replicanti.interval = 1;
    var places = Math.floor(Math.log10(player.replicanti.interval / 1000)) * -1;
    if (player.currentEternityChall == "eterc8") player.eterc8repl -= 1;
    document.getElementById("eterc8repl").textContent =
      "You have " + player.eterc8repl + " purchases left.";
  }
}

function upgradeReplicantiGalaxy() {
  let cost = player.replicanti.galCost;
  if (player.timestudy.studies.includes(233))
    cost = cost.dividedBy(player.replicanti.amount.pow(0.3));
  if (player.infinityPoints.gte(cost) && player.eterc8repl !== 0) {
    player.infinityPoints = player.infinityPoints.minus(cost);
    if (player.currentEternityChall == "eterc6")
      player.replicanti.galCost = player.replicanti.galCost
        .times(Decimal.pow(1e2, player.replicanti.gal))
        .times(1e2);
    else
      player.replicanti.galCost = player.replicanti.galCost
        .times(Decimal.pow(1e5, player.replicanti.gal))
        .times(1e25);
    if (player.replicanti.gal >= 100)
      player.replicanti.galCost = player.replicanti.galCost.times(
        Decimal.pow(1e50, player.replicanti.gal - 95)
      );
    if (player.replicanti.gal >= 400)
      player.replicanti.galCost = player.replicanti.galCost.times(
        Decimal.pow(1e5, Math.floor(Math.pow(1.2, player.replicanti.gal - 395)))
      );
    player.replicanti.gal += 1;
    if (player.currentEternityChall == "eterc8") player.eterc8repl -= 1;
    document.getElementById("eterc8repl").textContent =
      "You have " + player.eterc8repl + " purchases left.";
    return true;
  }
  return false;
}

function replicantiGalaxy() {
  let galLimit = player.timestudy.studies.includes(131)
    ? Math.floor(player.replicanti.gal * 1.5)
    : player.replicanti.gal;
  if (
    player.replicanti.amount.gte(Number.MAX_VALUE) &&
    player.replicanti.galaxies < galLimit
  ) {
    if (player.achievements.includes("r126"))
      player.replicanti.amount = player.replicanti.amount.dividedBy(
        Number.MAX_VALUE
      );
    else player.replicanti.amount = new Decimal(1);
    if (player.replicanti.bulkmode) {
      if (player.achievements.includes("r146")) {
        player.replicanti.galaxies = galLimit;
      } else {
        throw new Error("🌙🌙🌙 YOU WERE WARNED 🌙🌙🌙");
        player.replicanti.bulkmode = false;
      }
    } else {
      player.replicanti.galaxies += 1;
    }
    player.galaxies -= 1;
    // automatically catches universal harmony
    galaxyReset();
  }
}

function updateMilestones() {
  var milestoneRequirements = [
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    20,
    25,
    30,
    40,
    50,
    60,
    80,
    100,
    1e10,
    1e11,
    1e12,
    1e13
  ];
  for (i = 0; i < milestoneRequirements.length; i++) {
    var name = "reward" + i;
    if (player.eternities >= milestoneRequirements[i]) {
      document.getElementById(name).className = "milestonereward";
    } else {
      document.getElementById(name).className = "milestonerewardlocked";
    }
  }
}

function milestoneCheck(x) {
  var milestoneRequirements = [
    1, //reward 0
    2, //1
    3, //2
    4, //3
    5, //4
    7, //5
    9, //6
    10, //7
    11, //8
    12, //9
    13, //10
    14, //11
    15, //12
    16, //13
    17, //14
    18, //15
    20, //16
    25, //17
    30, //18
    40, //19
    50, //20
    60, //21
    80, //22
    100, //23
    1e10, //24
    1e11, //25
    1e12, //26
    1e13 //27
  ];
  if (player.eternities.gte(milestoneRequirements[x])) return true;
  else return false;
}

function replicantiGalaxyAutoToggle() {
  if (player.replicanti.galaxybuyer) {
    player.replicanti.galaxybuyer = false;
    if (
      player.timestudy.studies.includes(131) &&
      !player.achievements.includes("r143")
    )
      document.getElementById("replicantiresettoggle").textContent =
        "Auto galaxy OFF (disabled)";
    else
      document.getElementById("replicantiresettoggle").textContent =
        "Auto galaxy OFF";
  } else {
    player.replicanti.galaxybuyer = true;
    if (
      player.timestudy.studies.includes(131) &&
      !player.achievements.includes("r143")
    )
      document.getElementById("replicantiresettoggle").textContent =
        "Auto galaxy ON (disabled)";
    else
      document.getElementById("replicantiresettoggle").textContent =
        "Auto galaxy ON";
  }
}

function replicantiGalaxyBulkModeToggle() {
  if (player.replicanti.bulkmode) {
    player.replicanti.bulkmode = false;
    document.getElementById("replicantibulkmodetoggle").textContent =
      "Galaxy bulk mode: single";
  } else {
    player.replicanti.bulkmode = true;
    document.getElementById("replicantibulkmodetoggle").textContent =
      "Galaxy bulk mode: max";
  }
}

function timeDimensionAutoToggle() {
  if (player.timeDimensionAutobuyer) {
    player.timeDimensionAutobuyer = false;
    document.getElementById("tdautotoggle").textContent = "Auto max TD: OFF";
  } else {
    player.timeDimensionAutobuyer = true;
    document.getElementById("tdautotoggle").textContent = "Auto max TD: ON";
  }
}

function ep5xAutoToggle() {
  if (player.ep5xAutobuyer) {
    player.ep5xAutobuyer = false;
    document.getElementById("epautotoggle").textContent = "Auto max 5x EP: OFF";
  } else {
    player.ep5xAutobuyer = true;
    document.getElementById("epautotoggle").textContent = "Auto max 5x EP: ON";
  }
}

function infMultAutoToggle() {
  if (player.infMultBuyer) {
    player.infMultBuyer = false;
    document.getElementById("infmultbuyer").textContent =
      "Autobuy IP mult: OFF";
  } else {
    player.infMultBuyer = true;
    document.getElementById("infmultbuyer").textContent = "Autobuy IP mult: ON";
  }
}

function toggleCrunchMode() {
  if (player.autoCrunchMode == "amount") {
    player.autoCrunchMode = "time";
    document.getElementById("togglecrunchmode").textContent =
      "Auto crunch mode: time";
    document.getElementById("limittext").textContent =
      "Seconds between crunches:";
  } else if (player.autoCrunchMode == "time") {
    player.autoCrunchMode = "relative";
    document.getElementById("togglecrunchmode").textContent =
      "Auto crunch mode: X times last crunch";
    document.getElementById("limittext").textContent = "X times last crunch:";
  } else {
    player.autoCrunchMode = "amount";
    document.getElementById("togglecrunchmode").textContent =
      "Auto crunch mode: amount";
    document.getElementById("limittext").textContent =
      "Amount of IP to wait until reset:";
  }
}

function toggleAutoEterMode() {
  if (player.autoEterMode == "amount") {
    player.autoEterMode = "time";
    document.getElementById("toggleautoetermode").textContent =
      "Auto eternity mode: time";
    document.getElementById("eterlimittext").textContent =
      "Seconds between eternities:";
  } else if (player.autoEterMode == "time") {
    player.autoEterMode = "relative";
    document.getElementById("toggleautoetermode").textContent =
      "Auto eternity mode: X times last eternity";
    document.getElementById("eterlimittext").textContent =
      "X times last eternity:";
  } else if (player.autoEterMode == "relative") {
    player.autoEterMode = "relativebest";
    document.getElementById("toggleautoetermode").textContent =
      "Auto eternity mode: X times best of last 10 eternities";
    document.getElementById("eterlimittext").textContent =
      "X times best of last 10 eternities:";
  } else {
    player.autoEterMode = "amount";
    document.getElementById("toggleautoetermode").textContent =
      "Auto eternity mode: amount";
    document.getElementById("eterlimittext").textContent =
      "Amount of EP to wait until reset:";
  }
}

function toggleEternityConf() {
  if (player.options.eternityconfirm) {
    player.options.eternityconfirm = false;
    document.getElementById("eternityconf").textContent =
      "Eternity confirmation: OFF";
  } else {
    player.options.eternityconfirm = true;
    document.getElementById("eternityconf").textContent =
      "Eternity confirmation: ON";
  }
}

function toggleReplAuto(i) {
  if (i == "chance") {
    if (player.replicanti.auto[0]) {
      player.replicanti.auto[0] = false;
      document.getElementById("replauto1").textContent = "Auto: OFF";
    } else {
      player.replicanti.auto[0] = true;
      document.getElementById("replauto1").textContent = "Auto: ON";
    }
  } else if (i == "interval") {
    if (player.replicanti.auto[1]) {
      player.replicanti.auto[1] = false;
      document.getElementById("replauto2").textContent = "Auto: OFF";
    } else {
      player.replicanti.auto[1] = true;
      document.getElementById("replauto2").textContent = "Auto: ON";
    }
  } else if (i == "galaxy") {
    if (player.replicanti.auto[2]) {
      player.replicanti.auto[2] = false;
      document.getElementById("replauto3").textContent = "Auto: OFF";
    } else {
      player.replicanti.auto[2] = true;
      document.getElementById("replauto3").textContent = "Auto: ON";
    }
  }
}

function toggleCommas() {
  player.options.commas = !player.options.commas;

  if (player.options.commas)
    document.getElementById("commas").textContent = "Commas on exponents";
  else document.getElementById("commas").textContent = "Notation on exponents";
}

buyAutobuyer = function(id) {
  if (player.infinityPoints.lt(player.autobuyers[id].cost)) return false;
  if (player.autobuyers[id].bulk >= 1e100) return false;
  player.infinityPoints = player.infinityPoints.minus(
    player.autobuyers[id].cost
  );
  if (player.autobuyers[id].interval <= 100) {
    player.autobuyers[id].bulk = Math.min(
      player.autobuyers[id].bulk * 2,
      1e100
    );
    player.autobuyers[id].cost = Math.ceil(2.4 * player.autobuyers[id].cost);
    var b1 = true;
    for (let i = 0; i < 8; i++) {
      if (player.autobuyers[i].bulk < 512) b1 = false;
    }
    if (b1) giveAchievement("Bulked up");
  } else {
    player.autobuyers[id].interval = Math.max(
      player.autobuyers[id].interval * 0.6,
      100
    );
    if (player.autobuyers[id].interval > 120) player.autobuyers[id].cost *= 2; //if your last purchase wont be very strong, dont double the cost
  }
  if (
    player.autobuyers[id].interval == 100 &&
    id == 11 &&
    player.break == false
  )
    $.notify("You can break infinity now.", "success");
  updateAutobuyers();
};

document.getElementById("buyerBtn1").onclick = function() {
  buyAutobuyer(0);
};

document.getElementById("buyerBtn2").onclick = function() {
  buyAutobuyer(1);
};

document.getElementById("buyerBtn3").onclick = function() {
  buyAutobuyer(2);
};

document.getElementById("buyerBtn4").onclick = function() {
  buyAutobuyer(3);
};

document.getElementById("buyerBtn5").onclick = function() {
  buyAutobuyer(4);
};

document.getElementById("buyerBtn6").onclick = function() {
  buyAutobuyer(5);
};

document.getElementById("buyerBtn7").onclick = function() {
  buyAutobuyer(6);
};

document.getElementById("buyerBtn8").onclick = function() {
  buyAutobuyer(7);
};

document.getElementById("buyerBtnTickSpeed").onclick = function() {
  buyAutobuyer(8);
};

document.getElementById("buyerBtnDimBoost").onclick = function() {
  buyAutobuyer(9);
};

document.getElementById("buyerBtnGalaxies").onclick = function() {
  buyAutobuyer(10);
};

document.getElementById("buyerBtnInf").onclick = function() {
  buyAutobuyer(11);
};

toggleAutobuyerTarget = function(id) {
  if (player.autobuyers[id - 1].target == id) {
    player.autobuyers[id - 1].target = 10 + id;
    document.getElementById("toggleBtn" + id).textContent = "Buys until 10";
  } else {
    player.autobuyers[id - 1].target = id;
    document.getElementById("toggleBtn" + id).textContent = "Buys singles";
  }
};

document.getElementById("toggleBtn1").onclick = function() {
  toggleAutobuyerTarget(1);
};

document.getElementById("toggleBtn2").onclick = function() {
  toggleAutobuyerTarget(2);
};

document.getElementById("toggleBtn3").onclick = function() {
  toggleAutobuyerTarget(3);
};

document.getElementById("toggleBtn4").onclick = function() {
  toggleAutobuyerTarget(4);
};

document.getElementById("toggleBtn5").onclick = function() {
  toggleAutobuyerTarget(5);
};

document.getElementById("toggleBtn6").onclick = function() {
  toggleAutobuyerTarget(6);
};

document.getElementById("toggleBtn7").onclick = function() {
  toggleAutobuyerTarget(7);
};

document.getElementById("toggleBtn8").onclick = function() {
  toggleAutobuyerTarget(8);
};

document.getElementById("toggleBtnTickSpeed").onclick = function() {
  if (player.autobuyers[8].target == 1) {
    player.autobuyers[8].target = 10;
    document.getElementById("toggleBtnTickSpeed").textContent = "Buys max";
  } else {
    player.autobuyers[8].target = 1;
    document.getElementById("toggleBtnTickSpeed").textContent = "Buys singles";
  }
};

document.getElementById("secondSoftReset").onclick = function() {
  if (player.currentEternityChall == "eterc6") return;
  var bool =
    player.currentChallenge != "challenge11" &&
    player.currentChallenge != "postc1" &&
    player.currentChallenge != "postc7" &&
    (player.break || player.money.lte(Number.MAX_VALUE));
  if (
    player.currentChallenge == "challenge4"
      ? player.sixthAmount >= getGalaxyRequirement() && bool
      : player.eightAmount >= getGalaxyRequirement() && bool
  ) {
    if (player.eternities >= 7 && !shiftDown) maxBuyGalaxies(true);
    else galaxyReset();
  }
};

function setInitialDimensionPower() {
  player.firstPow = getDimensionBoostPower().pow(player.resets);
  player.secondPow = getDimensionBoostPower()
    .pow(player.resets - 1)
    .max(1);
  player.thirdPow = getDimensionBoostPower()
    .pow(player.resets - 2)
    .max(1);
  player.fourthPow = getDimensionBoostPower()
    .pow(player.resets - 3)
    .max(1);
  player.fifthPow = getDimensionBoostPower()
    .pow(player.resets - 4)
    .max(1);
  player.sixthPow = getDimensionBoostPower()
    .pow(player.resets - 5)
    .max(1);
  player.seventhPow = getDimensionBoostPower()
    .pow(player.resets - 6)
    .max(1);
  player.eightPow = getDimensionBoostPower()
    .pow(player.resets - 7)
    .max(1);
}

function galaxyReset() {
  if (autoS) auto = false;
  autoS = true;
  if (player.sacrificed == 0) giveAchievement("I don't believe in Gods");
  player = {
    money: player.achievements.includes("r111")
      ? player.money
      : new Decimal(10),
    tickSpeedCost: new Decimal(1000),
    tickspeed: new Decimal(1000),
    firstCost: new Decimal(10),
    secondCost: new Decimal(100),
    thirdCost: new Decimal(10000),
    fourthCost: new Decimal(1000000),
    fifthCost: new Decimal(1e9),
    sixthCost: new Decimal(1e13),
    seventhCost: new Decimal(1e18),
    eightCost: new Decimal(1e24),
    firstAmount: new Decimal(0),
    secondAmount: new Decimal(0),
    thirdAmount: new Decimal(0),
    fourthAmount: new Decimal(0),
    firstBought: 0,
    secondBought: 0,
    thirdBought: 0,
    fourthBought: 0,
    fifthAmount: new Decimal(0),
    sixthAmount: new Decimal(0),
    seventhAmount: new Decimal(0),
    eightAmount: new Decimal(0),
    fifthBought: 0,
    sixthBought: 0,
    seventhBought: 0,
    eightBought: 0,
    firstPow: new Decimal(1),
    secondPow: new Decimal(1),
    thirdPow: new Decimal(1),
    fourthPow: new Decimal(1),
    fifthPow: new Decimal(1),
    sixthPow: new Decimal(1),
    seventhPow: new Decimal(1),
    eightPow: new Decimal(1),
    sacrificed: new Decimal(0),
    achievements: player.achievements,
    challenges: player.challenges,
    currentChallenge: player.currentChallenge,
    infinityUpgrades: player.infinityUpgrades,
    infinityPoints: player.infinityPoints,
    infinitied: player.infinitied,
    infinitiedBank: player.infinitiedBank,
    totalTimePlayed: player.totalTimePlayed,
    bestInfinityTime: player.bestInfinityTime,
    thisInfinityTime: player.thisInfinityTime,
    resets: 0,
    galaxies: player.galaxies + 1,
    totalmoney: player.totalmoney,
    tickDecrease: player.tickDecrease - 0.03,
    interval: null,
    lastUpdate: player.lastUpdate,
    achPow: player.achPow,
    newsArray: player.newsArray,
    autobuyers: player.autobuyers,
    costMultipliers: [
      new Decimal(1e3),
      new Decimal(1e4),
      new Decimal(1e5),
      new Decimal(1e6),
      new Decimal(1e8),
      new Decimal(1e10),
      new Decimal(1e12),
      new Decimal(1e15)
    ],
    tickspeedMultiplier: new Decimal(10),
    chall2Pow: player.chall2Pow,
    chall3Pow: new Decimal(0.01),
    matter: new Decimal(0),
    chall11Pow: new Decimal(1),
    partInfinityPoint: player.partInfinityPoint,
    partInfinitied: player.partInfinitied,
    break: player.break,
    challengeTimes: player.challengeTimes,
    infchallengeTimes: player.infchallengeTimes,
    lastTenRuns: player.lastTenRuns,
    lastTenEternities: player.lastTenEternities,
    infMult: player.infMult,
    infMultCost: player.infMultCost,
    tickSpeedMultDecrease: player.tickSpeedMultDecrease,
    tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
    dimensionMultDecrease: player.dimensionMultDecrease,
    dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
    version: player.version,
    overXGalaxies: player.overXGalaxies,
    spreadingCancer: player.spreadingCancer,
    infDimensionsUnlocked: player.infDimensionsUnlocked,
    infinityPower: player.infinityPower,
    postChallUnlocked: player.postChallUnlocked,
    postC4Tier: 1,
    postC3Reward: new Decimal(1),
    infinityDimension1: player.infinityDimension1,
    infinityDimension2: player.infinityDimension2,
    infinityDimension3: player.infinityDimension3,
    infinityDimension4: player.infinityDimension4,
    infinityDimension5: player.infinityDimension5,
    infinityDimension6: player.infinityDimension6,
    infinityDimension7: player.infinityDimension7,
    infinityDimension8: player.infinityDimension8,
    infDimBuyers: player.infDimBuyers,
    timeShards: player.timeShards,
    tickThreshold: player.tickThreshold,
    timeDimension1: player.timeDimension1,
    timeDimension2: player.timeDimension2,
    timeDimension3: player.timeDimension3,
    timeDimension4: player.timeDimension4,
    timeDimension5: player.timeDimension5,
    timeDimension6: player.timeDimension6,
    timeDimension7: player.timeDimension7,
    timeDimension8: player.timeDimension8,
    eternityPoints: player.eternityPoints,
    eternities: player.eternities,
    thisEternity: player.thisEternity,
    bestEternity: player.bestEternity,
    eternityUpgrades: player.eternityUpgrades,
    epmult: player.epmult,
    epmultCost: player.epmultCost,
    totalTickGained: player.totalTickGained,
    offlineProd: player.offlineProd,
    offlineProdCost: player.offlineProdCost,
    challengeTarget: player.challengeTarget,
    autoSacrifice: player.autoSacrifice,
    replicanti: player.replicanti,
    timeDimensionAutobuyer: player.timeDimensionAutobuyer,
    ep5xAutobuyer: player.ep5xAutobuyer,
    timestudy: player.timestudy,
    eternityChalls: player.eternityChalls,
    eternityChallGoal: player.eternityChallGoal,
    currentEternityChall: player.currentEternityChall,
    eternityChallUnlocked: player.eternityChallUnlocked,
    etercreq: player.etercreq,
    autoIP: player.autoIP,
    autoTime: player.autoTime,
    infMultBuyer: player.infMultBuyer,
    autoCrunchMode: player.autoCrunchMode,
    autoEterMode: player.autoEterMode,
    respec: player.respec,
    eternityBuyer: player.eternityBuyer,
    eterc8ids: player.eterc8ids,
    eterc8repl: player.eterc8repl,
    dimlife: player.dimlife,
    dead: player.dead,
    dilation: player.dilation,
    meta: player.meta,
    quantum: player.quantum,
    why: player.why,
    options: player.options
  };

  if (
    player.currentChallenge == "challenge10" ||
    player.currentChallenge == "postc1"
  ) {
    player.thirdCost = new Decimal(100);
    player.fourthCost = new Decimal(500);
    player.fifthCost = new Decimal(2500);
    player.sixthCost = new Decimal(2e4);
    player.seventhCost = new Decimal(2e5);
    player.eightCost = new Decimal(4e6);
  }

  if (player.resets == 0 && player.currentChallenge == "") {
    if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
    if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
    if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
    if (player.infinityUpgrades.includes("skipResetGalaxy")) {
      player.resets++;
      if (player.galaxies == 0) player.galaxies = 1;
    }
  }
  if (player.currentChallenge == "postc2") {
    player.eightAmount = new Decimal(1);
    player.eightBought = 1;
    player.resets = 4;
  }

  setInitialDimensionPower();

  if (player.options.notation == "Emojis") player.spreadingCancer += 1;
  if (player.spreadingCancer >= 10) giveAchievement("Spreading Cancer");
  if (player.spreadingCancer >= 1000000) giveAchievement("Cancer = Spread");
  if (player.achievements.includes("r36"))
    player.tickspeed = player.tickspeed.times(0.98);
  if (player.achievements.includes("r45"))
    player.tickspeed = player.tickspeed.times(0.98);
  if (player.achievements.includes("r83"))
    player.tickspeed = player.tickspeed.times(
      Decimal.pow(0.95, player.galaxies)
    );

  if (player.eternities < 30) {
    document.getElementById("secondRow").style.display = "none";
    document.getElementById("thirdRow").style.display = "none";
    document.getElementById("tickSpeed").style.visibility = "hidden";
    document.getElementById("tickSpeedMax").style.visibility = "hidden";
    document.getElementById("tickLabel").style.visibility = "hidden";
    document.getElementById("tickSpeedAmount").style.visibility = "hidden";
    document.getElementById("fourthRow").style.display = "none";
    document.getElementById("fifthRow").style.display = "none";
    document.getElementById("sixthRow").style.display = "none";
    document.getElementById("seventhRow").style.display = "none";
    document.getElementById("eightRow").style.display = "none";
  }

  if (player.galaxies >= 50) giveAchievement("YOU CAN GET 50 GALAXIES!??");
  if (player.galaxies >= 2) giveAchievement("Double Galaxy");
  if (player.galaxies >= 1) giveAchievement("You got past The Big Wall");
  player.money = getAntimatterOnReset().max(player.money);
  player.tickspeed = player.tickspeed.times(
    Decimal.pow(getTickSpeedMultiplier(), player.totalTickGained)
  );
  if (player.achievements.includes("r66"))
    player.tickspeed = player.tickspeed.times(0.98);
  if (player.galaxies >= 700 && player.replicanti.galaxies == 0)
    giveAchievement("Unique snowflakes");
  if (canGiveUniversalHarmony()) giveAchievement("Universal harmony");
  updateTickSpeed();
}

let canGiveUniversalHarmony = function() {
  return (
    player.galaxies >= 700 &&
    getTotalRGs() >= 700 &&
    player.dilation.freeGalaxies >= 700
  );
};

document.getElementById("exportbtn").onclick = function() {
  let output = document.getElementById("exportOutput");
  let parent = output.parentElement;

  parent.style.display = "";
  output.value = btoa(
    JSON.stringify(player, function(k, v) {
      return v === Infinity ? "Infinity" : v;
    })
  );

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
};

document.getElementById("save").onclick = function() {
  saved++;
  if (saved > 99) giveAchievement("Just in case");
  save_game();
};

document.getElementById("load").onclick = function() {
  closeToolTip();
  for (var i = 0; i < 3; i++) {
    var _break = player.break;
    player.break = true;
    if (currentSave === i)
      document.querySelector(
        "#save" + (i + 1) + " .save_antimatter"
      ).textContent = "Antimatter: " + shortenMoney(player.money);
    else
      document.querySelector(
        "#save" + (i + 1) + " .save_antimatter"
      ).textContent =
        "Antimatter: " +
        shortenMoney(saves[i] ? new Decimal(saves[i].money) : 10);
    player.break = _break;
  }

  document.querySelectorAll(".save_selected").forEach(function(el) {
    el.style.display = "none";
  });

  document.querySelector(
    "#save" + (currentSave + 1) + " .save_selected"
  ).style.display = "inline";

  document.getElementById("loadmenu").style.display = "flex";
};

document.getElementById("animationoptionsbtn").onclick = function() {
  closeToolTip();
  document.getElementById("animationoptions").style.display = "flex";
};

function verify_save(obj) {
  if (typeof obj != "object") return false;

  return true;
}

document.getElementById("importbtn").onclick = function() {
  var save_data = prompt(
    "Input your save. (your current save file will be overwritten!)"
  );
  if (save_data.constructor !== String) save_data = "";
  if (
    sha512_256(save_data.replace(/\s/g, "").toUpperCase()) ===
    "80b7fdc794f5dfc944da6a445a3f21a2d0f7c974d044f2ea25713037e96af9e3"
  ) {
    document.getElementById("body").style.animation = "barrelRoll 5s 1";
    giveAchievement("Do a barrel roll!");
    setTimeout(function() {
      document.getElementById("body").style.animation = "";
    }, 5000);
  }
  if (
    sha512_256(save_data.replace(/\s/g, "").toUpperCase()) ===
    "857876556a230da15fe1bb6f410ca8dbc9274de47c1a847c2281a7103dd2c274"
  )
    giveAchievement("So do I");
  if (
    sha512_256(save_data) ===
    "de24687ee7ba1acd8f5dc8f71d41a3d4b7f14432fff53a4d4166e7eea48a88c0"
  ) {
    player.options.theme = "S1";
    player.options.secretThemeKey = save_data;
    setTheme(player.options.theme);
  } else if (
    sha512_256(save_data) ===
    "76269d18c05c9ebec8a990a096cee046dea042a0421f8ab81d17f34dd1cdbdbf"
  ) {
    player.options.theme = "S2";
    player.options.secretThemeKey = save_data;
    setTheme(player.options.theme);
  } else if (
    sha512_256(save_data) ===
    "d764e9a1d1e18081be19f3483b537ae1159ab40d10e096df1d9e857d68d6ba7a"
  ) {
    player.options.theme = "S3";
    player.options.secretThemeKey = save_data;
    setTheme(player.options.theme);
  } else if (
    sha512_256(save_data) ===
    "ae0199482ecfa538a03eb37c67866e67a11f1832516c26c7939e971e514d40c5"
  ) {
    player.options.theme = "S4";
    player.options.secretThemeKey = save_data;
    setTheme(player.options.theme);
  } else if (
    sha512_256(save_data) ===
    "7a668b64cdfe1bcdf7a38d3858429ee21290268de66b9784afba27dc5225ce28"
  ) {
    player.options.theme = "S5";
    player.options.secretThemeKey = save_data;
    setTheme(player.options.theme);
  } else if (
    sha512_256(save_data) ===
    "c0a9d1097cae8247796ab13c493276918e3ee0369608e59e6ed5fd5f9d0ca336"
  ) {
    player = metaplayer;
    saved = 0;
    totalMult = 1;
    currentMult = 1;
    infinitiedMult = 1;
    achievementMult = 1;
    challengeMult = 1;
    unspentBonus = 1;
    infDimPow = 1;
    postc8Mult = new Decimal(0);
    mult18 = new Decimal(1);
    ec10bonus = new Decimal(1);
    save_game();
    load_game();
    updateChallenges();
    transformSaveToDecimal();
  } else {
    save_data = JSON.parse(atob(save_data), function(k, v) {
      return v === Infinity ? "Infinity" : v;
    });
    if (verify_save(save_data)) forceHardReset = true;
    if (verify_save(save_data)) document.getElementById("reset").click();
    forceHardReset = false;
    if (!save_data || !verify_save(save_data)) {
      alert("could not load the save..");
      load_custom_game();
      return;
    }
    saved = 0;
    totalMult = 1;
    currentMult = 1;
    infinitiedMult = 1;
    achievementMult = 1;
    challengeMult = 1;
    unspentBonus = 1;
    infDimPow = 1;
    postc8Mult = new Decimal(0);
    mult18 = new Decimal(1);
    ec10bonus = new Decimal(1);
    player = save_data;
    save_game();
    load_game();
    updateChallenges();
    transformSaveToDecimal();
  }
};

document.getElementById("reset").onclick = function() {
  if (forceHardReset) {
    if (window.location.href.split("//")[1].length > 20)
      set_save("dimensionTestSave", currentSave, defaultStart);
    else set_save("dimensionSave", currentSave, defaultStart);
    player = defaultStart;
    infDimPow = 1;
    save_game();
    load_game();
    updateCosts();

    document.getElementById("secondRow").style.display = "none";
    document.getElementById("thirdRow").style.display = "none";
    document.getElementById("tickSpeed").style.visibility = "hidden";
    document.getElementById("tickSpeedMax").style.visibility = "hidden";
    document.getElementById("tickLabel").style.visibility = "hidden";
    document.getElementById("tickSpeedAmount").style.visibility = "hidden";
    document.getElementById("fourthRow").style.display = "none";
    document.getElementById("fifthRow").style.display = "none";
    document.getElementById("sixthRow").style.display = "none";
    document.getElementById("seventhRow").style.display = "none";
    document.getElementById("eightRow").style.display = "none";
    showDimTab("antimatterdimensions");
    updateTickSpeed();
    updateDimensions();
    updateChallenges();
    updateAutobuyers();
  } else if (
    confirm(
      "Do you really want to erase all your progress? YOU WILL GAIN NOTHING FROM HARD RESETTING YOUR GAME. THIS CHANGE IS IRREVERSIBLE. Press OK if you really want to do this."
    )
  ) {
    if (
      confirm(
        "This is your last warning. If you want to erase your progress, please press OK, otherwise press cancel now."
      )
    ) {
      if (window.location.href.split("//")[1].length > 20)
        set_save("dimensionTestSave", currentSave, defaultStart);
      else set_save("dimensionSave", currentSave, defaultStart);
      player = defaultStart;
      infDimPow = 1;
      save_game();
      load_game();
      updateCosts();

      document.getElementById("secondRow").style.display = "none";
      document.getElementById("thirdRow").style.display = "none";
      document.getElementById("tickSpeed").style.visibility = "hidden";
      document.getElementById("tickSpeedMax").style.visibility = "hidden";
      document.getElementById("tickLabel").style.visibility = "hidden";
      document.getElementById("tickSpeedAmount").style.visibility = "hidden";
      document.getElementById("fourthRow").style.display = "none";
      document.getElementById("fifthRow").style.display = "none";
      document.getElementById("sixthRow").style.display = "none";
      document.getElementById("seventhRow").style.display = "none";
      document.getElementById("eightRow").style.display = "none";
      showDimTab("antimatterdimensions");
      updateTickSpeed();
      updateDimensions();
      updateChallenges();
      updateAutobuyers();
    }
  }
};

function breakInfinity() {
  if (player.autobuyers[11] % 1 === 0 || player.autobuyers[11].interval > 100)
    return false;
  if (player.break && !player.currentChallenge.includes("post")) {
    player.break = false;
    document.getElementById("break").textContent = "BREAK INFINITY";
  } else {
    player.break = true;
    document.getElementById("break").textContent = "FIX INFINITY";
    giveAchievement("Limit Break");
  }
}

function setAchieveTooltip() {
  var apocAchieve = document.getElementById("Antimatter Apocalypse");
  var noPointAchieve = document.getElementById(
    "There's no point in doing that"
  );
  var sanic = document.getElementById("Super Sanic");
  var forgotAchieve = document.getElementById("I forgot to nerf that");
  var potato = document.getElementById("Faster than a potato");
  let potato2 = document.getElementById("Faster than a squared potato");
  let potato3 = document.getElementById("Faster than a potato^286078");
  var dimensional = document.getElementById("Multidimensional");
  var IPBelongs = document.getElementById("All your IP are belong to us");
  var reference = document.getElementById("Yet another infinity reference");
  let blink = document.getElementById("Blink of an eye");
  let oneforeach = document.getElementById("One for each dimension");
  let spare = document.getElementById("I got a few to spare");
  let speed = document.getElementById("Ludicrous Speed");
  let speed2 = document.getElementById("I brake for nobody");
  let overdrive = document.getElementById("MAXIMUM OVERDRIVE");
  let minute = document.getElementById("4.3333 minutes of Infinity");
  let longlasting = document.getElementById("Long lasting relationship");
  let infiniteIP = document.getElementById("Can you get infinite IP?");
  let eternitiesareinfinity = document.getElementById(
    "Eternities are the new infinity"
  );
  let over9000 = document.getElementById("IT'S OVER 9000");
  let dawg = document.getElementById(
    "Yo dawg, I heard you liked infinities..."
  );
  let eatass = document.getElementById("Like feasting on a behind");
  let layer = document.getElementById("But I wanted another prestige layer...");
  let fkoff = document.getElementById("What do I have to do to get rid of you");
  let minaj = document.getElementById("Popular music");
  let infstuff = document.getElementById(
    "I never liked this infinity stuff anyway"
  );
  let when = document.getElementById("When will it be enough?");
  let thinking = document.getElementById("Now you're thinking with dilation!");
  let thisis = document.getElementById(
    "This is what I have to do to get rid of you."
  );
  let onlywar = document.getElementById(
    "In the grim darkness of the far endgame"
  );
  let thecap = document.getElementById("The cap is a million, not a trillion");
  let neverenough = document.getElementById("It will never be enough");
  let iamspeed = document.getElementById("GAS GAS GAS");
  let nevermetadimension = document.getElementById(
    "I never meta-dimension I didn't like"
  );
  let sanctum = document.getElementById("Deeper Sanctum");

  apocAchieve.setAttribute(
    "ach-tooltip",
    "Get over " +
      formatValue(player.options.notation, 1e80, 0, 0) +
      " antimatter."
  );
  noPointAchieve.setAttribute(
    "ach-tooltip",
    "Buy a single First Dimension when you have over " +
      formatValue(player.options.notation, 1e150, 0, 0) +
      " of them. Reward: First Dimensions are 10% stronger."
  );
  forgotAchieve.setAttribute(
    "ach-tooltip",
    "Get any Dimension multiplier over " +
      formatValue(player.options.notation, 1e31, 0, 0) +
      ". Reward: First Dimensions are 5% stronger."
  );
  sanic.setAttribute(
    "ach-tooltip",
    "Get over " +
      formatValue(player.options.notation, 1e63, 0, 0) +
      " antimatter."
  );
  potato.setAttribute(
    "ach-tooltip",
    "Get more than " +
      formatValue(player.options.notation, 1e29, 0, 0) +
      " ticks per second. Reward: Reduce the initial tick interval by 2%."
  );
  potato2.setAttribute(
    "ach-tooltip",
    "Get more than " +
      formatValue(player.options.notation, 1e58, 0, 0) +
      " ticks per second. Reward: Reduce the initial tick interval by 2%."
  );
  potato3.setAttribute(
    "ach-tooltip",
    "Get more than " +
      shortenCosts(new Decimal("1e8296262")) +
      " ticks per second. Reward: Reduce the initial tick interval by 5%."
  );
  dimensional.setAttribute(
    "ach-tooltip",
    "Get at least " +
      formatValue(player.options.notation, 1e12, 0, 0) +
      " of all dimensions except for the 8th dimension."
  );
  IPBelongs.setAttribute(
    "ach-tooltip",
    "Big Crunch for " +
      shortenCosts(1e150) +
      " IP. Reward: Gain an additional 4x multiplier to IP."
  );
  reference.setAttribute(
    "ach-tooltip",
    "Get a x" +
      shortenDimensions(Number.MAX_VALUE) +
      " multiplier in a single sacrifice. Reward: Sacrifices are stronger."
  );
  blink.setAttribute(
    "ach-tooltip",
    "Get to Infinity in under 200 milliseconds. Reward: You start with " +
      formatValue(player.options.notation, 2e25, 0, 0) +
      " antimatter on reset, and all dimensions are stronger in the first 300 milliseconds of an Infinity."
  );
  oneforeach.setAttribute(
    "ach-tooltip",
    "Play for 8 days. Reward: Gain a time multiplier to all Antimatter Dimensions. Currently: " +
      shortenMoney(new Decimal(timeMultUpg(3, 2))) +
      "x"
  );
  spare.setAttribute(
    "ach-tooltip",
    "Reach " +
      formatValue(player.options.notation, new Decimal("1e35000"), 0, 0) +
      " antimatter. Reward: “This achievement doesn't exist”'s reward is buffed."
  );
  speed.setAttribute(
    "ach-tooltip",
    "Big Crunch for " +
      shortenCosts(1e200) +
      " IP in 2 seconds or less. Reward: All dimensions are significantly stronger in the first 5 seconds of an infinity."
  );
  speed2.setAttribute(
    "ach-tooltip",
    "Big Crunch for " +
      shortenCosts(1e250) +
      " IP in 20 seconds or less. Reward: All dimensions are significantly stronger in the first 60 seconds of an infinity."
  );
  overdrive.setAttribute(
    "ach-tooltip",
    "Big Crunch with " +
      shortenCosts(1e300) +
      " IP/min. Reward: Gain an additional 4x multiplier to IP."
  );
  minute.setAttribute(
    "ach-tooltip",
    "Reach " +
      shortenCosts(1e260) +
      " infinity power. Reward: The 1st Infinity Dimension gains a 2x multiplier."
  );
  infiniteIP.setAttribute(
    "ach-tooltip",
    "Reach " + shortenCosts(new Decimal("1e30008")) + " IP."
  );
  over9000.setAttribute(
    "ach-tooltip",
    "Get a total sacrifice multiplier of " +
      shortenCosts(new Decimal("1e9000")) +
      ". Reward: Sacrifice doesn't reset your dimensions."
  );
  dawg.setAttribute(
    "ach-tooltip",
    "Have all your past 10 infinities be at least " +
      shortenMoney(Number.MAX_VALUE) +
      " times higher IP than the previous one. Reward: Your antimatter doesn't reset on dimboost/galaxy."
  );
  eatass.setAttribute(
    "ach-tooltip",
    "Reach " +
      shortenCosts(1e100) +
      " IP without any infinities or First Dimensions. Reward: Gain a IP multiplier based on time spent this infinity."
  );
  eternitiesareinfinity.setAttribute(
    "ach-tooltip",
    "Eternity in under 200ms. Reward: The longer an eternity is, it gives more eternities (stat), up to 30x eternity stat multiplier. Currently: " +
      r124Mult().toFixed(2) +
      "x more eternities"
  );
  longlasting.setAttribute(
    "ach-tooltip",
    "Have your Infinity power per second exceed your infinity power for 60 consecutive seconds during a single infinity. Reward: Infinity Dimensions gain a multiplier based on EC1's reward to the power of 10. Currently: " +
      shortenDimensions(timeMultUpg(4, 1).pow(10)) +
      "x"
  );
  layer.setAttribute(
    "ach-tooltip",
    "Reach " + shortenMoney(Number.MAX_VALUE) + " EP. "
  );
  fkoff.setAttribute(
    "ach-tooltip",
    "Reach " +
      shortenCosts(new Decimal("1e22000")) +
      " IP without any time studies. Reward: Time Dimensions are more powerful based on the number of time studies you have bought."
  );
  minaj.setAttribute(
    "ach-tooltip",
    "Have 180 times more non-bonus replicanti galaxies than normal galaxies. Reward: When creating replicanti galaxies, your replicanti is divided by " +
      shortenMoney(Number.MAX_VALUE) +
      " instead of being reset to 1."
  );
  infstuff.setAttribute(
    "ach-tooltip",
    "Reach " +
      shortenCosts(new Decimal("1e200000")) +
      " IP without buying IDs or IP multipliers. Reward: You start eternities with all Infinity Challenges unlocked and completed, and your infinity gain is multiplied by dilated time^(1/4)."
  );
  when.setAttribute(
    "ach-tooltip",
    "Reach " +
      shortenCosts(new Decimal("1e17500")) +
      " replicanti. Reward: You gain replicanti 2 times faster when your replicanti amount is below " +
      shortenMoney(Number.MAX_VALUE) +
      "."
  );
  thinking.setAttribute(
    "ach-tooltip",
    "Eternity for " +
      shortenCosts(new Decimal("1e600")) +
      " EP in at most 1 minute while dilated. Reward: All dimensions are raised to the power of 1.01 in dilation."
  );
  thisis.setAttribute(
    "ach-tooltip",
    "Reach " +
      shortenCosts(new Decimal("1e20000")) +
      " IP without any time studies while dilated."
  );
  onlywar.setAttribute(
    "ach-tooltip",
    "Reach " +
      shortenMoney(new Decimal("1e40000")) +
      " EP. Reward: The penalties for active, idle, and passive time study paths are removed."
  );
  thecap.setAttribute(
    "ach-tooltip",
    "Get " +
      formatValue(player.options.notation, 1e12, 0, 0) +
      " eternities. Reward: Eternity Upgrade 2 uses a better formula."
  );
  neverenough.setAttribute(
    "ach-tooltip",
    "Reach " +
      shortenCosts(new Decimal("1e100000")) +
      " replicanti. Reward: You can buy max replicanti galaxies."
  );
  iamspeed.setAttribute(
    "ach-tooltip",
    "Get " +
      formatValue(player.options.notation, 1e6, 0, 0) +
      " tickspeed upgrades from Time Dimensions. Reward: Unlock autobuyers for max Time Dimensions and 5x EP."
  );
  nevermetadimension.setAttribute(
    "ach-tooltip",
    "Get at least " +
      formatValue(player.options.notation, 1e25, 0, 0) +
      "x multiplier on all Meta Dimensions. Reward: Unlock the meta-dimension autobuyers."
  );
  sanctum.setAttribute(
    "ach-tooltip",
    "Get " +
      shortenCosts(new Decimal("1e70000")) +
      " IP with only 1 normal galaxy and your free galaxies in dilation. Reward: Galaxies (including meta galaxies) are 0.05% stronger."
  );
}

document.getElementById("notation").onclick = function() {
  player.options.scientific = !player.options.scientific;
  if (player.options.notation === "Infinity") {
    player.options.notation = "Scientific";
    document.getElementById("notation").textContent = "Notation: Scientific";
  } else if (player.options.notation === "Scientific") {
    player.options.notation = "Engineering";
    document.getElementById("notation").textContent = "Notation: Engineering";
  } else if (player.options.notation === "Engineering") {
    player.options.notation = "Letters";
    document.getElementById("notation").textContent = "Notation: Letters";
  } else if (player.options.notation === "Letters") {
    player.options.notation = "Standard";
    document.getElementById("notation").textContent = "Notation: Standard";
  } else if (player.options.notation === "Standard") {
    player.options.notation = "Emojis";
    document.getElementById("notation").textContent = "Notation: Cancer";
  } else if (player.options.notation === "Emojis") {
    player.options.notation = "Mixed scientific";
    document.getElementById("notation").textContent =
      "Notation: Mixed scientific";
  } else if (player.options.notation === "Mixed scientific") {
    player.options.notation = "Mixed engineering";
    document.getElementById("notation").textContent =
      "Notation: Mixed engineering";
  } else if (player.options.notation === "Mixed engineering") {
    player.options.notation = "Logarithm";
    document.getElementById("notation").textContent = "Notation: Logarithm";
  } else if (player.options.notation === "Logarithm") {
    player.options.notation = "Brackets";
    document.getElementById("notation").textContent = "Notation: Brackets";
  } else if (player.options.notation === "Brackets") {
    player.options.notation = "Infinity";
    document.getElementById("notation").textContent = "Notation: Infinity";
  }

  updateLastTenRuns();
  updateLastTenEternities();
  updateTickSpeed();
  setAchieveTooltip();
  updateCosts();
  updateDilationUpgradeCosts();
  document.getElementById("epmult").innerHTML =
    "You gain 5 times more EP<p>Currently: " +
    shortenDimensions(player.epmult) +
    "x<p>Cost: " +
    shortenDimensions(player.epmultCost) +
    " EP";
};

document.getElementById("newsbtn").onclick = function() {
  if (!player.options.newsHidden) {
    document.getElementById("game").style.display = "none";
    player.options.newsHidden = true;
  } else {
    document.getElementById("game").style.display = "block";
    player.options.newsHidden = false;
    scrollNextMessage();
  }
};

function resetDimensions() {
  var tiers = [
    null,
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eight"
  ];

  for (i = 1; i <= 8; i++) {
    player[tiers[i] + "Amount"] = new Decimal(0);
    player[tiers[i] + "Pow"] = new Decimal(1);
  }
  player.firstCost = new Decimal(10);
  player.secondCost = new Decimal(100);
  player.thirdCost = new Decimal(10000);
  player.fourthCost = new Decimal(1e6);
  player.fifthCost = new Decimal(1e9);
  player.sixthCost = new Decimal(1e13);
  player.seventhCost = new Decimal(1e18);
  player.eightCost = new Decimal(1e24);
  player.eightPow = new Decimal(player.chall11Pow);
}

function calcSacrificeBoost() {
  if (player.firstAmount == 0) return new Decimal(1);
  if (player.challenges.includes("postc2")) {
    if (player.timestudy.studies.includes(228))
      return player.firstAmount
        .dividedBy(player.sacrificed.max(1))
        .pow(0.013)
        .max(1);
    if (player.achievements.includes("r88"))
      return player.firstAmount
        .dividedBy(player.sacrificed.max(1))
        .pow(0.011)
        .max(1);
    return player.firstAmount
      .dividedBy(player.sacrificed.max(1))
      .pow(0.01)
      .max(1);
  }
  if (player.currentChallenge != "challenge11") {
    var sacrificePow = 2;
    if (player.achievements.includes("r32")) sacrificePow += 0.2;
    if (player.achievements.includes("r57")) sacrificePow += 0.2; //this upgrade was too OP lol
    return Decimal.pow(player.firstAmount.e / 10.0, sacrificePow)
      .dividedBy(
        Decimal.max(player.sacrificed.e, 1)
          .dividedBy(10.0)
          .pow(sacrificePow)
          .max(1)
      )
      .max(1);
  } else {
    return player.firstAmount
      .pow(0.05)
      .dividedBy(player.sacrificed.pow(0.04).max(1))
      .max(1);
  }
}

function calcTotalSacrificeBoost() {
  if (player.sacrificed == 0) return new Decimal(1);
  if (player.challenges.includes("postc2")) {
    if (player.timestudy.studies.includes(228))
      return player.sacrificed.pow(0.013).max(1);
    if (player.achievements.includes("r88"))
      return player.sacrificed.pow(0.011).max(1);
    else return player.sacrificed.pow(0.01);
  }
  if (player.currentChallenge != "challenge11") {
    var sacrificePow = 2;
    if (player.achievements.includes("r32")) sacrificePow += 0.2;
    if (player.achievements.includes("r57")) sacrificePow += 0.2;
    return Decimal.pow(player.sacrificed.e / 10.0, sacrificePow);
  } else {
    return player.sacrificed.pow(0.05); //this is actually off but like im not sure how youd make it good. not that it matters.
  }
}

function sacrifice(auto = false) {
  if (player.eightAmount == 0) return false;
  if (player.resets < 5) return false;
  if (player.currentEternityChall == "eterc3") return false;
  if (
    player.currentChallenge == "challenge11" &&
    (calcTotalSacrificeBoost().gte(Number.MAX_VALUE) ||
      player.chall11Pow.gte(Number.MAX_VALUE))
  )
    return false;
  if (!auto) floatText("eightD", "x" + shortenMoney(calcSacrificeBoost()));
  if (calcSacrificeBoost().gte(Number.MAX_VALUE))
    giveAchievement("Yet another infinity reference");
  player.eightPow = player.eightPow.times(calcSacrificeBoost());
  player.sacrificed = player.sacrificed.plus(player.firstAmount);
  if (player.currentChallenge != "challenge11") {
    if (
      player.currentChallenge == "challenge7" &&
      !player.achievements.includes("r118")
    )
      clearDimensions(6);
    else if (!player.achievements.includes("r118")) clearDimensions(7);
  } else {
    player.chall11Pow = player.chall11Pow.times(calcSacrificeBoost());
    if (!player.achievements.includes("r118")) resetDimensions();
    player.money = new Decimal(100);
  }
  if (calcTotalSacrificeBoost() >= 600) giveAchievement("The Gods are pleased");
  if (calcTotalSacrificeBoost().gte("1e9000"))
    giveAchievement("IT'S OVER 9000");
}

document.getElementById("sacrifice").onclick = function() {
  if (
    !document.getElementById("confirmation").checked &&
    sacrifice() == !false
  ) {
    if (
      !confirm(
        "Dimensional Sacrifice will remove all of your first to seventh dimensions (with the cost and multiplier unchanged) for a boost to the Eighth Dimension. It will take time to regain production."
      )
    ) {
      return false;
    }
  }

  auto = false;
  return sacrifice();
};

function updateAutobuyers() {
  var autoBuyerDim1 = new Autobuyer(1);
  var autoBuyerDim2 = new Autobuyer(2);
  var autoBuyerDim3 = new Autobuyer(3);
  var autoBuyerDim4 = new Autobuyer(4);
  var autoBuyerDim5 = new Autobuyer(5);
  var autoBuyerDim6 = new Autobuyer(6);
  var autoBuyerDim7 = new Autobuyer(7);
  var autoBuyerDim8 = new Autobuyer(8);
  var autoBuyerDimBoost = new Autobuyer(9);
  var autoBuyerGalaxy = new Autobuyer(
    document.getElementById("secondSoftReset")
  );
  var autoBuyerTickspeed = new Autobuyer(document.getElementById("tickSpeed"));
  var autoBuyerInf = new Autobuyer(document.getElementById("bigcrunch"));
  var autoSacrifice = new Autobuyer(13);

  autoBuyerDim1.interval = 1500;
  autoBuyerDim2.interval = 2000;
  autoBuyerDim3.interval = 2500;
  autoBuyerDim4.interval = 3000;
  autoBuyerDim5.interval = 4000;
  autoBuyerDim6.interval = 5000;
  autoBuyerDim7.interval = 6000;
  autoBuyerDim8.interval = 7500;
  autoBuyerDimBoost.interval = 8000;
  autoBuyerGalaxy.interval = 150000;
  autoBuyerTickspeed.interval = 5000;
  autoBuyerInf.interval = 300000;

  autoSacrifice.interval = 100;
  autoSacrifice.priority = 5;

  autoBuyerDim1.tier = 1;
  autoBuyerDim2.tier = 2;
  autoBuyerDim3.tier = 3;
  autoBuyerDim4.tier = 4;
  autoBuyerDim5.tier = 5;
  autoBuyerDim6.tier = 6;
  autoBuyerDim7.tier = 7;
  autoBuyerDim8.tier = 8;
  autoBuyerTickSpeed.tier = 9;

  if (player.challenges.includes("challenge1") && player.autobuyers[0] == 1) {
    player.autobuyers[0] = autoBuyerDim1;
    document.getElementById("autoBuyer1").style.display = "inline-block";
  }
  if (player.challenges.includes("challenge2") && player.autobuyers[1] == 2) {
    player.autobuyers[1] = autoBuyerDim2;
    document.getElementById("autoBuyer2").style.display = "inline-block";
  }
  if (player.challenges.includes("challenge3") && player.autobuyers[2] == 3) {
    player.autobuyers[2] = autoBuyerDim3;
    document.getElementById("autoBuyer3").style.display = "inline-block";
  }
  if (player.challenges.includes("challenge4") && player.autobuyers[9] == 10) {
    player.autobuyers[9] = autoBuyerDimBoost;
    document.getElementById("autoBuyerDimBoost").style.display = "inline-block";
  }
  if (player.challenges.includes("challenge5") && player.autobuyers[8] == 9) {
    player.autobuyers[8] = autoBuyerTickspeed;
    document.getElementById("autoBuyerTickSpeed").style.display =
      "inline-block";
  }
  if (player.challenges.includes("challenge6") && player.autobuyers[4] == 5) {
    player.autobuyers[4] = autoBuyerDim5;
    document.getElementById("autoBuyer5").style.display = "inline-block";
  }
  if (player.challenges.includes("challenge7") && player.autobuyers[11] == 12) {
    player.autobuyers[11] = autoBuyerInf;
    document.getElementById("autoBuyerInf").style.display = "inline-block";
  }
  if (player.challenges.includes("challenge8") && player.autobuyers[3] == 4) {
    player.autobuyers[3] = autoBuyerDim4;
    document.getElementById("autoBuyer4").style.display = "inline-block";
  }
  if (player.challenges.includes("challenge9") && player.autobuyers[6] == 7) {
    player.autobuyers[6] = autoBuyerDim7;
    document.getElementById("autoBuyer7").style.display = "inline-block";
  }
  if (player.challenges.includes("challenge10") && player.autobuyers[5] == 6) {
    player.autobuyers[5] = autoBuyerDim6;
    document.getElementById("autoBuyer6").style.display = "inline-block";
  }
  if (player.challenges.includes("challenge11") && player.autobuyers[7] == 8) {
    player.autobuyers[7] = autoBuyerDim8;
    document.getElementById("autoBuyer8").style.display = "inline-block";
  }
  if (
    player.challenges.includes("challenge12") &&
    player.autobuyers[10] == 11
  ) {
    player.autobuyers[10] = autoBuyerGalaxy;
    document.getElementById("autoBuyerGalaxies").style.display = "inline-block";
  }

  if (player.challenges.includes("postc2") && player.autoSacrifice == 1) {
    player.autoSacrifice = autoSacrifice;
    document.getElementById("autoBuyerSac").style.display = "inline-block";
  } else {
    document.getElementById("autoBuyerSac").style.display = "none";
  }

  if (player.eternities < 100) {
    document.getElementById("autoBuyerEter").style.display = "none";
  }

  if (player.infinityUpgrades.includes("autoBuyerUpgrade")) {
    document.getElementById("interval1").textContent =
      "Current interval: " +
      (player.autobuyers[0].interval / 2000).toFixed(2) +
      " seconds";
    document.getElementById("interval2").textContent =
      "Current interval: " +
      (player.autobuyers[1].interval / 2000).toFixed(2) +
      " seconds";
    document.getElementById("interval3").textContent =
      "Current interval: " +
      (player.autobuyers[2].interval / 2000).toFixed(2) +
      " seconds";
    document.getElementById("interval4").textContent =
      "Current interval: " +
      (player.autobuyers[3].interval / 2000).toFixed(2) +
      " seconds";
    document.getElementById("interval5").textContent =
      "Current interval: " +
      (player.autobuyers[4].interval / 2000).toFixed(2) +
      " seconds";
    document.getElementById("interval6").textContent =
      "Current interval: " +
      (player.autobuyers[5].interval / 2000).toFixed(2) +
      " seconds";
    document.getElementById("interval7").textContent =
      "Current interval: " +
      (player.autobuyers[6].interval / 2000).toFixed(2) +
      " seconds";
    document.getElementById("interval8").textContent =
      "Current interval: " +
      (player.autobuyers[7].interval / 2000).toFixed(2) +
      " seconds";
    document.getElementById("intervalTickSpeed").textContent =
      "Current interval: " +
      (player.autobuyers[8].interval / 2000).toFixed(2) +
      " seconds";
    document.getElementById("intervalDimBoost").textContent =
      "Current interval: " +
      (player.autobuyers[9].interval / 2000).toFixed(2) +
      " seconds";
    document.getElementById("intervalGalaxies").textContent =
      "Current interval: " +
      (player.autobuyers[10].interval / 2000).toFixed(2) +
      " seconds";
    document.getElementById("intervalInf").textContent =
      "Current interval: " +
      (player.autobuyers[11].interval / 2000).toFixed(2) +
      " seconds";
    document.getElementById("intervalSac").textContent =
      "Current interval: 0.05 seconds";
  } else {
    document.getElementById("interval1").textContent =
      "Current interval: " +
      (player.autobuyers[0].interval / 1000).toFixed(2) +
      " seconds";
    document.getElementById("interval2").textContent =
      "Current interval: " +
      (player.autobuyers[1].interval / 1000).toFixed(2) +
      " seconds";
    document.getElementById("interval3").textContent =
      "Current interval: " +
      (player.autobuyers[2].interval / 1000).toFixed(2) +
      " seconds";
    document.getElementById("interval4").textContent =
      "Current interval: " +
      (player.autobuyers[3].interval / 1000).toFixed(2) +
      " seconds";
    document.getElementById("interval5").textContent =
      "Current interval: " +
      (player.autobuyers[4].interval / 1000).toFixed(2) +
      " seconds";
    document.getElementById("interval6").textContent =
      "Current interval: " +
      (player.autobuyers[5].interval / 1000).toFixed(2) +
      " seconds";
    document.getElementById("interval7").textContent =
      "Current interval: " +
      (player.autobuyers[6].interval / 1000).toFixed(2) +
      " seconds";
    document.getElementById("interval8").textContent =
      "Current interval: " +
      (player.autobuyers[7].interval / 1000).toFixed(2) +
      " seconds";
    document.getElementById("intervalTickSpeed").textContent =
      "Current interval: " +
      (player.autobuyers[8].interval / 1000).toFixed(2) +
      " seconds";
    document.getElementById("intervalDimBoost").textContent =
      "Current interval: " +
      (player.autobuyers[9].interval / 1000).toFixed(2) +
      " seconds";
    document.getElementById("intervalGalaxies").textContent =
      "Current interval: " +
      (player.autobuyers[10].interval / 1000).toFixed(2) +
      " seconds";
    document.getElementById("intervalInf").textContent =
      "Current interval: " +
      (player.autobuyers[11].interval / 1000).toFixed(2) +
      " seconds";
    document.getElementById("intervalSac").textContent =
      "Current interval: 0.10 seconds";
  }

  var maxedAutobuy = 0;
  var e100autobuy = 0;
  for (let tier = 1; tier <= 8; ++tier) {
    document.getElementById("toggleBtn" + tier).style.display = "inline-block";
    if (player.autobuyers[tier - 1].bulk >= 1e100) {
      player.autobuyers[tier - 1].bulk = 1e100;
      document.getElementById("buyerBtn" + tier).textContent =
        shortenDimensions(player.autobuyers[tier - 1].bulk) + "x bulk purchase";
      e100autobuy++;
    } else {
      if (player.autobuyers[tier - 1].interval <= 100) {
        if (player.autobuyers[tier - 1].bulk * 2 >= 1e100) {
          document.getElementById("buyerBtn" + tier).innerHTML =
            shortenDimensions(1e100) +
            "x bulk purchase<br>Cost: " +
            shortenDimensions(player.autobuyers[tier - 1].cost) +
            " IP";
        } else {
          document.getElementById("buyerBtn" + tier).innerHTML =
            shortenDimensions(player.autobuyers[tier - 1].bulk * 2) +
            "x bulk purchase (next)<br>Cost: " +
            shortenDimensions(player.autobuyers[tier - 1].cost) +
            " IP";
        }
        maxedAutobuy++;
      } else
        document.getElementById("buyerBtn" + tier).innerHTML =
          "40% smaller interval <br>Cost: " +
          shortenDimensions(player.autobuyers[tier - 1].cost) +
          " IP";
    }
  }

  if (player.autobuyers[8].interval <= 100) {
    document.getElementById("buyerBtnTickSpeed").style.display = "none";
    document.getElementById("toggleBtnTickSpeed").style.display =
      "inline-block";
    maxedAutobuy++;
  }
  if (player.autobuyers[9].interval <= 100) {
    document.getElementById("buyerBtnDimBoost").style.display = "none";
    maxedAutobuy++;
  }
  if (player.autobuyers[10].interval <= 100) {
    document.getElementById("buyerBtnGalaxies").style.display = "none";
    maxedAutobuy++;
  }
  if (player.autobuyers[11].interval <= 100) {
    document.getElementById("buyerBtnInf").style.display = "none";
    maxedAutobuy++;
  }

  if (maxedAutobuy >= 9) giveAchievement("Age of Automation");
  if (maxedAutobuy >= 12) giveAchievement("Definitely not worth it");
  if (e100autobuy >= 8) giveAchievement("Professional bodybuilder");

  document.getElementById("buyerBtnTickSpeed").innerHTML =
    "40% smaller interval <br>Cost: " + player.autobuyers[8].cost + " IP";
  document.getElementById("buyerBtnDimBoost").innerHTML =
    "40% smaller interval <br>Cost: " + player.autobuyers[9].cost + " IP";
  document.getElementById("buyerBtnGalaxies").innerHTML =
    "40% smaller interval <br>Cost: " + player.autobuyers[10].cost + " IP";
  document.getElementById("buyerBtnInf").innerHTML =
    "40% smaller interval <br>Cost: " + player.autobuyers[11].cost + " IP";

  for (var i = 0; i < 8; i++) {
    if (player.autobuyers[i] % 1 !== 0)
      document.getElementById("autoBuyer" + (i + 1)).style.display =
        "inline-block";
  }
  if (player.autobuyers[8] % 1 !== 0)
    document.getElementById("autoBuyerTickSpeed").style.display =
      "inline-block";
  if (player.autobuyers[9] % 1 !== 0)
    document.getElementById("autoBuyerDimBoost").style.display = "inline-block";
  if (player.autobuyers[10] % 1 !== 0)
    document.getElementById("autoBuyerGalaxies").style.display = "inline-block";
  if (player.autobuyers[11] % 1 !== 0)
    document.getElementById("autoBuyerInf").style.display = "inline-block";
  if (player.autoSacrifice % 1 !== 0)
    document.getElementById("autoBuyerSac").style.display = "inline-block";

  for (var i = 1; i <= 12; i++) {
    player.autobuyers[i - 1].isOn = document.getElementById(i + "ison").checked;
  }

  player.autoSacrifice.isOn = document.getElementById("13ison").checked;
  player.eternityBuyer.isOn = document.getElementById("eternityison").checked;
  priorityOrder();
}

/*function loadAutoBuyers() {
    for (var i=0; i<12; i++) {
        if (player.autobuyers[i]%1 !== 0 ) {
            switch(i) {
                case 8: player.autobuyers[i].target = "buyTickSpeed()";
                case 9: player.autobuyers[i].target = "document.getElementById('softReset').click";
                case 10: player.autobuyers[i].target = "document.getElementById('secondSoftReset').click";
                case 11: player.autobuyers[i].target = "document.getElementById('bigcrunch').click";
                default: player.autobuyers[i].target = "buyOneDimension(" + i+1 + ")";
            }
        }
    }

}*/

function autoBuyerArray() {
  var tempArray = [];
  for (var i = 0; i < player.autobuyers.length && i < 9; i++) {
    if (player.autobuyers[i] % 1 !== 0) {
      tempArray.push(player.autobuyers[i]);
    }
  }
  return tempArray;
}

var priority = [];

function priorityOrder() {
  var tempArray = [];
  var i = 1;
  while (tempArray.length != autoBuyerArray().length) {
    for (var x = 0; x < autoBuyerArray().length; x++) {
      if (autoBuyerArray()[x].priority == i)
        tempArray.push(autoBuyerArray()[x]);
    }
    i++;
  }
  priority = tempArray;
}

function updatePriorities() {
  auto = false;
  for (var x = 0; x < autoBuyerArray().length; x++) {
    if (x < 9)
      autoBuyerArray()[x].priority = parseInt(
        document.getElementById("priority" + (x + 1)).value
      );
  }
  if (
    parseInt(document.getElementById("priority10").value) === 69 ||
    parseInt(document.getElementById("priority11").value) === 69 ||
    parseInt(
      fromValue(document.getElementById("priority12").value).toString()
    ) === 69 ||
    parseInt(document.getElementById("bulkDimboost").value) === 69 ||
    parseInt(document.getElementById("overGalaxies").value) === 69 ||
    parseInt(
      fromValue(document.getElementById("prioritySac").value).toString()
    ) === 69 ||
    parseInt(document.getElementById("bulkgalaxy").value) === 69 ||
    parseInt(
      fromValue(document.getElementById("priority13").value).toString()
    ) === 69
  )
    giveAchievement("Nice."); // if any of these values are 69, give secret achievement "Nice."
  player.autobuyers[9].priority = parseInt(
    document.getElementById("priority10").value
  );
  player.autobuyers[10].priority = parseInt(
    document.getElementById("priority11").value
  );
  player.autobuyers[11].priority = fromValue(
    document.getElementById("priority12").value
  );
  if (player.eternities < 10) {
    var bulk = Math.floor(
      Math.max(parseFloat(document.getElementById("bulkDimboost").value), 1)
    );
  } else {
    var bulk = Math.max(
      parseFloat(document.getElementById("bulkDimboost").value),
      0.05
    );
  }
  player.autobuyers[9].bulk = isNaN(bulk) ? 1 : bulk;
  player.overXGalaxies = parseInt(
    document.getElementById("overGalaxies").value
  );
  player.autoSacrifice.priority = fromValue(
    document.getElementById("prioritySac").value
  );
  if (
    isNaN(player.autoSacrifice.priority) ||
    player.autoSacrifice.priority === null ||
    player.autoSacrifice.priority === undefined ||
    player.autoSacrifice.priority <= 1
  )
    player.autoSacrifice.priority = Decimal.fromNumber(1.01);
  player.autobuyers[10].bulk = parseFloat(
    document.getElementById("bulkgalaxy").value
  );
  const eterValue = fromValue(document.getElementById("priority13").value);
  if (!isNaN(eterValue)) player.eternityBuyer.limit = eterValue;

  priorityOrder();
}

function updateCheckBoxes() {
  for (var i = 0; i < 12; i++) {
    if (player.autobuyers[i] % 1 !== 0) {
      if (player.autobuyers[i].isOn)
        document.getElementById(i + 1 + "ison").checked = "true";
      else document.getElementById(i + 1 + "ison").checked = "";
    }
  }
  if (player.autoSacrifice.isOn)
    document.getElementById("13ison").checked = "true";
  else document.getElementById("13ison").checked = "";
  document.getElementById("eternityison").checked = player.eternityBuyer.isOn;
}

function toggleAutoBuyers() {
  var bool = player.autobuyers[0].isOn;
  for (var i = 0; i < 12; i++) {
    if (player.autobuyers[i] % 1 !== 0) {
      player.autobuyers[i].isOn = !bool;
    }
  }
  player.autoSacrifice.isOn = !bool;
  player.eternityBuyer.isOn = !bool;
  updateCheckBoxes();
  updateAutobuyers();
}

function toggleBulk() {
  if (player.options.bulkOn) {
    player.options.bulkOn = false;
    document.getElementById("togglebulk").textContent = "Enable bulk buy";
  } else {
    player.options.bulkOn = true;
    document.getElementById("togglebulk").textContent = "Disable bulk buy";
  }
}

function toggleHotkeys() {
  if (player.options.hotkeys) {
    player.options.hotkeys = false;
    document.getElementById("hotkeys").textContent = "Enable hotkeys";
  } else {
    player.options.hotkeys = true;
    document.getElementById("hotkeys").textContent = "Disable hotkeys";
  }
}

function updateChallengeTimes() {
  document.getElementById("challengetime2").textContent =
    "Challenge  " +
    2 +
    " time record: " +
    timeDisplayShort(player.challengeTimes[0]);
  document.getElementById("challengetime3").textContent =
    "Challenge  " +
    3 +
    " time record: " +
    timeDisplayShort(player.challengeTimes[1]);
  document.getElementById("challengetime4").textContent =
    "Challenge  " +
    4 +
    " time record: " +
    timeDisplayShort(player.challengeTimes[6]);
  document.getElementById("challengetime5").textContent =
    "Challenge  " +
    5 +
    " time record: " +
    timeDisplayShort(player.challengeTimes[4]);
  document.getElementById("challengetime6").textContent =
    "Challenge  " +
    6 +
    " time record: " +
    timeDisplayShort(player.challengeTimes[8]);
  document.getElementById("challengetime7").textContent =
    "Challenge  " +
    7 +
    " time record: " +
    timeDisplayShort(player.challengeTimes[7]);
  document.getElementById("challengetime8").textContent =
    "Challenge  " +
    8 +
    " time record: " +
    timeDisplayShort(player.challengeTimes[9]);
  document.getElementById("challengetime9").textContent =
    "Challenge  " +
    9 +
    " time record: " +
    timeDisplayShort(player.challengeTimes[3]);
  document.getElementById("challengetime10").textContent =
    "Challenge " +
    10 +
    " time record: " +
    timeDisplayShort(player.challengeTimes[2]);
  document.getElementById("challengetime11").textContent =
    "Challenge " +
    11 +
    " time record: " +
    timeDisplayShort(player.challengeTimes[10]);
  document.getElementById("challengetime12").textContent =
    "Challenge " +
    12 +
    " time record: " +
    timeDisplayShort(player.challengeTimes[5]);
  var temp = 0;
  for (var i = 0; i < 11; i++) {
    temp += player.challengeTimes[i];
  }
  document.getElementById("challengetimesum").textContent =
    "The sum of your challenge time records is " + timeDisplayShort(temp) + ".";

  temp = 0;
  for (var i = 0; i < 8; i++) {
    document.getElementById("infchallengetime" + (i + 1)).textContent =
      "Infinity Challenge " +
      (i + 1) +
      " time record: " +
      timeDisplayShort(player.infchallengeTimes[i]);
    temp += player.infchallengeTimes[i];
  }
  document.getElementById("infchallengetimesum").textContent =
    "The sum of your Infinity Challenge time records is " +
    timeDisplayShort(temp) +
    ".";
  updateWorstChallengeTime();
}

// so i know why you cannot get "Oh hey, you're still here" in aarex's mods, because for some reason bestrunippm is still 0"
// tempbest is bugged for whatever reason and will be at 0.
// copied and pasted vanilla code and now it works. weird.
var bestRunIppm = new Decimal(0);
function updateLastTenRuns() {
  let tempBest = 0;
  var tempTime = new Decimal(0);
  var tempIP = new Decimal(0);
  for (var i = 0; i < 10; i++) {
    tempTime = tempTime.plus(player.lastTenRuns[i][0]);
    tempIP = tempIP.plus(player.lastTenRuns[i][1]);
  }
  tempTime = tempTime.dividedBy(10);
  tempIP = tempIP.dividedBy(10);
  for (var i = 0; i < 10; i++) {
    var ippm = player.lastTenRuns[i][1].dividedBy(
      player.lastTenRuns[i][0] / 600
    );
    if (ippm.gt(tempBest)) tempBest = ippm;
    var tempstring = "(" + shorten(ippm) + " IP/min)";
    if (ippm < 1) tempstring = "(" + shorten(ippm * 60) + " IP/hour";
    var plural = i == 0 ? " infinity" : " infinities";
    document.getElementById("run" + (i + 1)).textContent =
      "The infinity " +
      (i + 1) +
      plural +
      " ago took " +
      timeDisplayShort(player.lastTenRuns[i][0]) +
      " and gave " +
      shortenDimensions(player.lastTenRuns[i][1]) +
      " IP. " +
      tempstring;
  }

  var ippm = tempIP.dividedBy(tempTime / 600);
  var tempstring = "(" + shorten(ippm) + " IP/min)";
  if (ippm < 1) tempstring = "(" + shorten(ippm * 60) + " IP/hour)";
  document.getElementById("averagerun").textContent =
    "Average time of the last 10 infinities: " +
    timeDisplayShort(tempTime) +
    " | Average IP gain: " +
    shortenDimensions(tempIP) +
    " IP. " +
    tempstring;

  if (tempBest.gte(1e8)) giveAchievement("Oh hey, you're still here");
  if (tempBest.gte(1e300)) giveAchievement("MAXIMUM OVERDRIVE");

  bestRunIppm = tempBest;
}

var averageEp = new Decimal(0);
function updateLastTenEternities() {
  let tempBest = 0;
  var tempTime = new Decimal(0);
  var tempEP = new Decimal(0);
  for (var i = 0; i < 10; i++) {
    tempTime = tempTime.plus(player.lastTenEternities[i][0]);
    tempEP = tempEP.plus(player.lastTenEternities[i][1]);
  }
  tempTime = tempTime.dividedBy(10);
  tempEP = tempEP.dividedBy(10);
  for (var i = 0; i < 10; i++) {
    var eppm = player.lastTenEternities[i][1].dividedBy(
      player.lastTenEternities[i][0] / 600
    );
    if (eppm.gt(tempBest)) tempBest = eppm;
    var tempstring = "(" + shorten(eppm) + " EP/min)";
    if (eppm < 1) tempstring = "(" + shorten(eppm * 60) + " EP/hour)";
    var plural = i == 0 ? " eternity" : " eternities";
    document.getElementById("eternityrun" + (i + 1)).textContent =
      "The Eternity " +
      (i + 1) +
      plural +
      " ago took " +
      timeDisplayShort(player.lastTenEternities[i][0]) +
      " and gave " +
      shortenDimensions(player.lastTenEternities[i][1]) +
      " EP. " +
      tempstring;
  }

  var eppm = tempEP.dividedBy(tempTime / 600);
  var tempstring = "(" + shorten(eppm) + " EP/min)";
  averageEp = tempEP;
  if (eppm < 1) tempstring = "(" + shorten(eppm * 60) + " EP/hour)";
  document.getElementById("averageEternityRun").textContent =
    "Average time of the last 10 eternities: " +
    timeDisplayShort(tempTime) +
    " | Average EP gain: " +
    shortenDimensions(tempEP) +
    " EP. " +
    tempstring;
}

function addEternityTime(time, ep) {
  for (var i = player.lastTenEternities.length - 1; i > 0; i--) {
    player.lastTenEternities[i] = player.lastTenEternities[i - 1];
  }
  player.lastTenEternities[0] = [time, ep];
}

document.getElementById("postInfinityButton").onclick = function() {
  document.getElementById("bigcrunch").click();
};

function addTime(time, ip) {
  for (var i = player.lastTenRuns.length - 1; i > 0; i--) {
    player.lastTenRuns[i] = player.lastTenRuns[i - 1];
  }
  player.lastTenRuns[0] = [time, ip];
}

var infchallengeTimes = 999999999;

function checkChallengeAchievements() {
  var temp = 0;
  for (var i = 0; i < 11; i++) {
    temp += player.challengeTimes[i];
  }
  if (temp <= 1800) giveAchievement("Not-so-challenging");
  if (temp <= 50) giveAchievement("End me");
  var temp2 = 0;
  for (var i = 0; i < 8; i++) {
    temp2 += player.infchallengeTimes[i];
  }
  infchallengeTimes = temp2;
  if (temp2 <= 66.6) giveAchievement("Yes. This is hell.");
}

function respecToggle() {
  if (player.respec) {
    player.respec = false;
    document.getElementById("respec").className = "storebtn";
  } else {
    player.respec = true;
    document.getElementById("respec").className = "timestudybought";
  }
}

function exitChallenge() {
  if (player.currentChallenge !== "") {
    document.getElementById(player.currentChallenge).textContent = "Start";
    startChallenge("");
    updateChallenges();
  } else if (player.currentEternityChall !== "") {
    player.currentEternityChall = "";
    player.eternityChallGoal = new Decimal(Number.MAX_VALUE);
    eternity(true);
    updateEternityChallenges();
  }
}

function startChallenge(name, target) {
  if (
    !player.options.challConf || name == ""
      ? true
      : name.includes("post")
      ? confirm(
          "You will start over with just your infinity upgrades, and achievements. You need to reach a set goal with special conditions. NOTE: The rightmost infinity upgrade column doesn't work on challenges."
        )
      : confirm(
          "You will start over with just your infinity upgrades, and achievements. You need to reach infinity with special conditions. NOTE: The rightmost infinity upgrade column doesn't work on challenges."
        )
  ) {
    if (player.currentChallenge != "")
      document.getElementById(player.currentChallenge).textContent = "Start";
    player = {
      ngPlus: player.ngPlus,
      money: new Decimal(10),
      tickSpeedCost: new Decimal(1000),
      tickspeed: new Decimal(1000),
      firstCost: new Decimal(10),
      secondCost: new Decimal(100),
      thirdCost: new Decimal(10000),
      fourthCost: new Decimal(1000000),
      fifthCost: new Decimal(1e9),
      sixthCost: new Decimal(1e13),
      seventhCost: new Decimal(1e18),
      eightCost: new Decimal(1e24),
      firstAmount: new Decimal(0),
      secondAmount: new Decimal(0),
      thirdAmount: new Decimal(0),
      fourthAmount: new Decimal(0),
      firstBought: 0,
      secondBought: 0,
      thirdBought: 0,
      fourthBought: 0,
      fifthAmount: new Decimal(0),
      sixthAmount: new Decimal(0),
      seventhAmount: new Decimal(0),
      eightAmount: new Decimal(0),
      fifthBought: 0,
      sixthBought: 0,
      seventhBought: 0,
      eightBought: 0,
      firstPow: new Decimal(1),
      secondPow: new Decimal(1),
      thirdPow: new Decimal(1),
      fourthPow: new Decimal(1),
      fifthPow: new Decimal(1),
      sixthPow: new Decimal(1),
      seventhPow: new Decimal(1),
      eightPow: new Decimal(1),
      sacrificed: new Decimal(0),
      achievements: player.achievements,
      challenges: player.challenges,
      currentChallenge: name,
      infinityUpgrades: player.infinityUpgrades,
      infinityPoints: player.infinityPoints,
      infinitied: player.infinitied,
      infinitiedBank: player.infinitiedBank,
      totalTimePlayed: player.totalTimePlayed,
      bestInfinityTime: player.bestInfinityTime,
      thisInfinityTime: 0,
      resets: 0,
      galaxies: 0,
      tickDecrease: 0.9,
      totalmoney: player.totalmoney,
      interval: null,
      lastUpdate: player.lastUpdate,
      achPow: player.achPow,
      autobuyers: player.autobuyers,
      costMultipliers: [
        new Decimal(1e3),
        new Decimal(1e4),
        new Decimal(1e5),
        new Decimal(1e6),
        new Decimal(1e8),
        new Decimal(1e10),
        new Decimal(1e12),
        new Decimal(1e15)
      ],
      tickspeedMultiplier: new Decimal(10),
      chall2Pow: 1,
      chall3Pow: new Decimal(0.01),
      matter: new Decimal(0),
      newsArray: player.newsArray,
      chall11Pow: new Decimal(1),
      partInfinityPoint: player.partInfinityPoint,
      partInfinitied: player.partInfinitied,
      break: player.break,
      challengeTimes: player.challengeTimes,
      infchallengeTimes: player.infchallengeTimes,
      lastTenRuns: player.lastTenRuns,
      lastTenEternities: player.lastTenEternities,
      infMult: player.infMult,
      infMultCost: player.infMultCost,
      tickSpeedMultDecrease: player.tickSpeedMultDecrease,
      tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
      dimensionMultDecrease: player.dimensionMultDecrease,
      dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
      version: player.version,
      postChallUnlocked: player.postChallUnlocked,
      postC4Tier: 1,
      postC3Reward: new Decimal(1),
      overXGalaxies: player.overXGalaxies,
      spreadingCancer: player.spreadingCancer,
      infDimensionsUnlocked: player.infDimensionsUnlocked,
      infinityPower: player.infinityPower,
      infinityDimension1: player.infinityDimension1,
      infinityDimension2: player.infinityDimension2,
      infinityDimension3: player.infinityDimension3,
      infinityDimension4: player.infinityDimension4,
      infinityDimension5: player.infinityDimension5,
      infinityDimension6: player.infinityDimension6,
      infinityDimension7: player.infinityDimension7,
      infinityDimension8: player.infinityDimension8,
      infDimBuyers: player.infDimBuyers,
      timeShards: player.timeShards,
      tickThreshold: player.tickThreshold,
      timeDimension1: player.timeDimension1,
      timeDimension2: player.timeDimension2,
      timeDimension3: player.timeDimension3,
      timeDimension4: player.timeDimension4,
      timeDimension5: player.timeDimension5,
      timeDimension6: player.timeDimension6,
      timeDimension7: player.timeDimension7,
      timeDimension8: player.timeDimension8,
      eternityPoints: player.eternityPoints,
      eternities: player.eternities,
      thisEternity: player.thisEternity,
      bestEternity: player.bestEternity,
      eternityUpgrades: player.eternityUpgrades,
      epmult: player.epmult,
      epmultCost: player.epmultCost,
      totalTickGained: player.totalTickGained,
      offlineProd: player.offlineProd,
      offlineProdCost: player.offlineProdCost,
      challengeTarget: target,
      autoSacrifice: player.autoSacrifice,
      replicanti: player.replicanti,
      timeDimensionAutobuyer: player.timeDimensionAutobuyer,
      ep5xAutobuyer: player.ep5xAutobuyer,
      timestudy: player.timestudy,
      eternityChalls: player.eternityChalls,
      eternityChallGoal: player.eternityChallGoal,
      currentEternityChall: player.currentEternityChall,
      eternityChallUnlocked: player.eternityChallUnlocked,
      etercreq: player.etercreq,
      autoIP: player.autoIP,
      autoTime: player.autoTime,
      infMultBuyer: player.infMultBuyer,
      autoCrunchMode: player.autoCrunchMode,
      autoEterMode: player.autoEterMode,
      respec: player.respec,
      eternityBuyer: player.eternityBuyer,
      eterc8ids: player.eterc8ids,
      eterc8repl: player.eterc8repl,
      dimlife: player.dimlife,
      dead: player.dead,
      dilation: player.dilation,
      meta: player.meta,
      quantum: player.quantum,
      why: player.why,
      options: player.options
    };
    if (
      player.currentChallenge == "challenge10" ||
      player.currentChallenge == "postc1"
    ) {
      player.thirdCost = new Decimal(100);
      player.fourthCost = new Decimal(500);
      player.fifthCost = new Decimal(2500);
      player.sixthCost = new Decimal(2e4);
      player.seventhCost = new Decimal(2e5);
      player.eightCost = new Decimal(4e6);
    }
    if (player.currentChallenge == "postc1")
      player.costMultipliers = [
        new Decimal(1e3),
        new Decimal(5e3),
        new Decimal(1e4),
        new Decimal(1.2e4),
        new Decimal(1.8e4),
        new Decimal(2.6e4),
        new Decimal(3.2e4),
        new Decimal(4.2e4)
      ];
    if (player.currentChallenge == "postc2") {
      player.eightAmount = new Decimal(1);
      player.eightBought = 1;
      player.resets = 4;
    }

    if (player.replicanti.unl) player.replicanti.amount = new Decimal(1);
    player.replicanti.galaxies = 0;

    // even if we're in a challenge, apparently if it's challenge 2 we might have four resets anyway.
    setInitialDimensionPower();

    IPminpeak = new Decimal(0);
    if (player.currentChallenge.includes("post")) player.break = true;
    if (player.achievements.includes("r36"))
      player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45"))
      player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r66"))
      player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r83"))
      player.tickspeed = player.tickspeed.times(
        Decimal.pow(0.95, player.galaxies)
      );

    if (player.eternities < 30) {
      document.getElementById("secondRow").style.display = "none";
      document.getElementById("thirdRow").style.display = "none";
      document.getElementById("tickSpeed").style.visibility = "hidden";
      document.getElementById("tickSpeedMax").style.visibility = "hidden";
      document.getElementById("tickLabel").style.visibility = "hidden";
      document.getElementById("tickSpeedAmount").style.visibility = "hidden";
      document.getElementById("fourthRow").style.display = "none";
    }
    document.getElementById("fifthRow").style.display = "none";
    document.getElementById("sixthRow").style.display = "none";
    document.getElementById("seventhRow").style.display = "none";
    document.getElementById("eightRow").style.display = "none";

    matterDisplay();
    quickResetDisplay();

    showTab("dimensions");
    updateChallenges();
    player.money = getAntimatterOnReset();
    showTab("dimensions");

    if (player.infinitied >= 10) giveAchievement("That's a lot of infinites");

    RGDisplayAmount();

    resetInfDimensions();
    player.tickspeed = player.tickspeed.times(
      Decimal.pow(getTickSpeedMultiplier(), player.totalTickGained)
    );
    updateTickSpeed();

    if (player.resets == 0 && player.currentChallenge == "") {
      if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
      if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
      if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
      if (player.infinityUpgrades.includes("skipResetGalaxy")) {
        player.resets++;
        if (player.galaxies == 0) player.galaxies = 1;
      }
    }
    if (
      player.currentChallenge.includes("post") &&
      player.currentEternityChall !== ""
    )
      giveAchievement("I wish I had gotten 7 eternities");
    Marathon2 = 0;
  }
}

function calcPerSec(amount, pow, hasMult) {
  if (!hasMult)
    return Decimal.floor(amount)
      .times(pow)
      .times(player.achPow)
      .times(timeMult())
      .times(player.chall2Pow)
      .dividedBy(player.tickspeed.dividedBy(1000));
  else
    return Decimal.floor(amount)
      .times(pow)
      .times(player.achPow)
      .times(dimMults())
      .times(timeMult())
      .times(player.chall2Pow)
      .dividedBy(player.tickspeed.dividedBy(1000));
}

document.getElementById("quickReset").onclick = function() {
  if (player.resets == 0) player.resets--;
  else player.resets -= 2;
  softReset(1);
};

function updateInfPower() {
  document.getElementById("infPowAmount").textContent = shortenMoney(
    player.infinityPower
  );
  if (player.currentEternityChall == "eterc9")
    document.getElementById("infDimMultAmount").textContent = shortenMoney(
      Decimal.pow(Math.max(player.infinityPower.log2(), 1), 4).max(1)
    );
  else
    document.getElementById("infDimMultAmount").textContent = shortenMoney(
      player.infinityPower.pow(7)
    );
  if (player.currentEternityChall == "eterc7")
    document.getElementById("infPowPerSec").textContent =
      "You are getting " +
      shortenDimensions(DimensionProduction(1)) +
      " Seventh Dimensions per second.";
  else
    document.getElementById("infPowPerSec").textContent =
      "You are getting " +
      shortenDimensions(DimensionProduction(1)) +
      " Infinity Power per second.";
}

function getReplSpeed() {
  let ret = 0.2;
  if (player.dilation.upgrades.includes(8)) {
    ret /= 1 + player.dilation.dilatedTime.max(1).log(10) / 10;
  }
  return ret + 1;
}

function updateTimeShards() {
  if (
    document.getElementById("timedimensions").style.display == "block" &&
    document.getElementById("dimensions").style.display == "block"
  ) {
    document.getElementById("timeShardAmount").textContent = shortenMoney(
      player.timeShards
    );
    document.getElementById("tickThreshold").textContent = shortenMoney(
      player.tickThreshold
    );
    if (player.currentEternityChall == "eterc7")
      document.getElementById("timeShardsPerSec").textContent =
        "You are getting " +
        shortenDimensions(getTimeDimensionProduction(1)) +
        " Eighth Infinity Dimensions per second.";
    else
      document.getElementById("timeShardsPerSec").textContent =
        "You are getting " +
        shortenDimensions(getTimeDimensionProduction(1)) +
        " Time Shards per second.";
  }
}

function updateDilation() {
  if (
    document.getElementById("dilation").style.display == "block" &&
    document.getElementById("eternitystore").style.display == "block"
  ) {
    document.getElementById("tachyonParticleAmount").textContent = shortenMoney(
      player.dilation.tachyonParticles
    );
    document.getElementById("dilatedTimeAmount").textContent = shortenMoney(
      player.dilation.dilatedTime
    );
    document.getElementById("dilatedTimePerSecond").textContent =
      "(+" + shortenMoney(getDilTimeGainPerSecond()) + "/s)";
    document.getElementById("galaxyThreshold").textContent = shortenMoney(
      player.dilation.nextThreshold
    );
    document.getElementById("dilatedGalaxies").textContent =
      player.dilation.freeGalaxies;
  }
}

function getNewInfReq() {
  // unlock the infinity dimensions
  if (!player.infDimensionsUnlocked[0]) return new Decimal("1e1100");
  else if (!player.infDimensionsUnlocked[1]) return new Decimal("1e1900");
  else if (!player.infDimensionsUnlocked[2]) return new Decimal("1e2400");
  else if (!player.infDimensionsUnlocked[3]) return new Decimal("1e10500");
  else if (!player.infDimensionsUnlocked[4]) return new Decimal("1e30000");
  else if (!player.infDimensionsUnlocked[5]) return new Decimal("1e45000");
  else if (!player.infDimensionsUnlocked[6]) return new Decimal("1e54000");
  else return new Decimal("1e60000");
}

function newDimension() {
  // get the infinity dimensions
  if (player.money.gte(getNewInfReq())) {
    if (!player.infDimensionsUnlocked[0])
      player.infDimensionsUnlocked[0] = true;
    else if (!player.infDimensionsUnlocked[1])
      player.infDimensionsUnlocked[1] = true;
    else if (!player.infDimensionsUnlocked[2])
      player.infDimensionsUnlocked[2] = true;
    else if (!player.infDimensionsUnlocked[3]) {
      player.infDimensionsUnlocked[3] = true;
      giveAchievement("NEW DIMENSIONS???");
    } else if (!player.infDimensionsUnlocked[4])
      player.infDimensionsUnlocked[4] = true;
    else if (!player.infDimensionsUnlocked[5])
      player.infDimensionsUnlocked[5] = true;
    else if (!player.infDimensionsUnlocked[6])
      player.infDimensionsUnlocked[6] = true;
    else if (!player.infDimensionsUnlocked[7]) {
      player.infDimensionsUnlocked[7] = true;
      giveAchievement("0 degrees from infinity");
    }
  }
}
var blink = true;
setInterval(function() {
  $.getJSON("version.txt", function(data) {
    //data is actual content of version.txt, so
    //do whatever you need with it
    //I'd compare it with last result and if it's different
    //show the message received and nag for attention
    //like this:
    if (data.version > player.version) {
      player.version = data.version;
      document.getElementById("update").style.display = "block";
      document.getElementById("updatePopup").innerHTML = data.message;
      //or some more resilient method
      //like forced news bar with message running over and over
    }
  });
}, 60000);

var nextAt = [
  //ic unlock requirements
  new Decimal("1e2000"),
  new Decimal("1e10000"),
  new Decimal("1e12000"),
  new Decimal("1e14000"),
  new Decimal("1e18000"),
  new Decimal("1e20000"),
  new Decimal("1e23000"),
  new Decimal("1e28000")
];

var goals = [
  //IC goals
  new Decimal("1e850"),
  new Decimal("1e10500"),
  new Decimal("1e5000"),
  new Decimal("1e13000"),
  new Decimal("1e11111"),
  new Decimal("2e22222"),
  new Decimal("1e10000"),
  new Decimal("1e27000")
];
setInterval(function() {
  r72Check();
  antitablesCheck();
  metaDimensionAchievement();

  if (
    new Decimal(player.infinitied).eq(0) &&
    player.infinityPoints.lt(new Decimal(1e50)) &&
    player.eternities.eq(0)
  )
    document.getElementById("infinityPoints2").style.display = "none";
  else
    document.getElementById("infinityPoints2").style.display = "inline-block";

  if (blink && !player.achievements.includes("r78")) {
    document.getElementById("Blink of an eye").style.display = "none";
    blink = false;
  } else {
    document.getElementById("Blink of an eye").style.display = "block";
    blink = true;
  }
  if (player.challenges.includes("postc1")) {
    let temp = 1;
    for (var i = 0; i < player.challenges.length; i++) {
      if (player.challenges[i].includes("post")) {
        temp *= 1.3;
        document.getElementById("infchallengesbtn").style.display =
          "inline-block";
      }
    }
    infDimPow = temp;
  } else {
    document.getElementById("infchallengesbtn").style.display = "none";
  }

  if (
    player.money.gte(new Decimal("1e2000")) ||
    Object.keys(player.eternityChalls).length > 0 ||
    player.eternityChallUnlocked !== 0
  )
    document.getElementById("challTabButtons").style.display = "table";

  document.getElementById("eternityPoints2").innerHTML =
    'You have <span class="EPAmount2">' +
    shortenDimensions(player.eternityPoints) +
    "</span> Eternity point" +
    (player.eternityPoints.eq(1) ? "." : "s.");

  document.getElementById("eternitybtn").style.display =
    player.infinityPoints.gte(player.eternityChallGoal) &&
    (player.infDimensionsUnlocked[7] || player.eternities > 24)
      ? "inline-block"
      : "none";

  if (player.eternities != 0)
    document.getElementById("eternitystorebtn").style.display = "inline-block";
  for (var i = 1; i <= 8; i++) {
    document.getElementById("postc" + i + "goal").textContent =
      "Goal: " + shortenCosts(goals[i - 1]);
  }

  if (player.replicanti.galaxybuyer !== undefined)
    document.getElementById("replicantiresettoggle").style.display =
      "inline-block";
  else document.getElementById("replicantiresettoggle").style.display = "none";

  if (player.achievements.includes("r146"))
    document.getElementById("replicantibulkmodetoggle").style.display =
      "inline-block";
  else
    document.getElementById("replicantibulkmodetoggle").style.display = "none";

  if (player.achievements.includes("r147")) {
    document.getElementById("epautotoggle").style.display = "inline-block";
    document.getElementById("tdautotoggle").style.display = "inline-block";
  } else {
    document.getElementById("epautotoggle").style.display = "none";
    document.getElementById("tdautotoggle").style.display = "none";
  }

  if (milestoneCheck(0))
    document.getElementById("infmultbuyer").style.display = "inline-block";
  else document.getElementById("infmultbuyer").style.display = "none";
  if (milestoneCheck(4))
    document.getElementById("togglecrunchmode").style.display = "inline-block";
  else document.getElementById("togglecrunchmode").style.display = "none";
  if (milestoneCheck(6))
    document.getElementById("galaxybulk").style.display = "inline-block";
  else document.getElementById("galaxybulk").style.display = "none";
  if (milestoneCheck(23))
    document.getElementById("toggleautoetermode").style.display =
      "inline-block";
  else document.getElementById("toggleautoetermode").style.display = "none";

  document.getElementById("replicantichance").className =
    player.infinityPoints.gte(player.replicanti.chanceCost) &&
    player.replicanti.chance < 1
      ? "storebtn"
      : "unavailablebtn";
  document.getElementById("replicantiinterval").className =
    player.infinityPoints.gte(player.replicanti.intervalCost) &&
    (player.replicanti.interval !== 50 ||
      player.timestudy.studies.includes(22)) &&
    player.replicanti.interval !== 1
      ? "storebtn"
      : "unavailablebtn";
  document.getElementById(
    "replicantimax"
  ).className = player.infinityPoints.gte(player.replicanti.galCost)
    ? "storebtn"
    : "unavailablebtn";
  document.getElementById("replicantireset").className =
    player.replicanti.galaxies < player.replicanti.gal &&
    player.replicanti.amount.gte(Number.MAX_VALUE)
      ? "storebtn"
      : "unavailablebtn";
  document.getElementById(
    "replicantiunlock"
  ).className = player.infinityPoints.gte(1e140)
    ? "storebtn"
    : "unavailablebtn";
  updateTheoremButtons();

  if (getTickSpeedMultiplier() < 0.001)
    giveAchievement("Do you even bend time bro?");

  if (milestoneCheck(7))
    document.getElementById("bulklabel").textContent =
      "Buy max dimboosts every X seconds:";
  else
    document.getElementById("bulklabel").textContent = "Bulk DimBoost Amount:";

  if (milestoneCheck(8)) {
    for (var i = 1; i < player.eternities - 9 && i < 9; i++) {
      document.getElementById("infauto" + i).style.visibility = "visible";
    }
    document.getElementById("toggleallinfdims").style.visibility = "visible";
  } else {
    for (var i = 1; i < 9; i++) {
      document.getElementById("infauto" + i).style.visibility = "hidden";
    }
    document.getElementById("toggleallinfdims").style.visibility = "hidden";
  }

  if (player.eternities !== 0)
    document.getElementById("eternityconf").style.display = "inline-block";
  else document.getElementById("eternityconf").style.display = "none";
  if (milestoneCheck(19))
    document.getElementById("replauto1").style.visibility = "visible";
  else document.getElementById("replauto1").style.visibility = "hidden";
  if (milestoneCheck(20))
    document.getElementById("replauto2").style.visibility = "visible";
  else document.getElementById("replauto2").style.visibility = "hidden";
  if (milestoneCheck(21))
    document.getElementById("replauto3").style.visibility = "visible";
  else document.getElementById("replauto3").style.visibility = "hidden";
  if (milestoneCheck(22))
    document.getElementById("autoBuyerEter").style.display = "inline-block";

  if (player.eternities.eq(0))
    document.getElementById("pasteternities").style.display = "none";
  else document.getElementById("pasteternities").style.display = "inline-block";
  if (player.challenges.length > 1)
    document.getElementById("challengetimesbtn").style.display = "inline-block";
  else document.getElementById("challengetimesbtn").style.display = "none";
  if (player.infinitied > 0 || player.eternities > 0)
    document.getElementById("pastinfs").style.display = "inline-block";
  else document.getElementById("pastinfs").style.display = "none";

  if (player.infinitied !== 0 || player.eternities !== 0)
    document.getElementById("bigCrunchAnimBtn").style.display = "inline-block";
  else document.getElementById("bigCrunchAnimBtn").style.display = "none";
  if (!player.dilation.tachyonParticles.eq(0))
    document.getElementById("tachyonParticleAnimBtn").style.display =
      "inline-block";
  else document.getElementById("tachyonParticleAnimBtn").style.display = "none";

  if (milestoneCheck(8) && player.currentEternityChall !== "eterc8") {
    for (var i = 1; i < player.eternities - 9 && i < 9; i++) {
      if (player.infDimBuyers[i - 1]) {
        buyMaxInfDims(i);
        buyManyInfinityDimension(i);
      }
    }
  }

  dor147Stuff();
  displayEterMilestoneButton();

  if (
    milestoneCheck(19) &&
    player.replicanti.auto[0] &&
    player.currentEternityChall !== "eterc8"
  ) {
    while (
      player.infinityPoints.gte(player.replicanti.chanceCost) &&
      player.currentEternityChall !== "eterc8" &&
      player.replicanti.chance < 1
    )
      upgradeReplicantiChance();
  }

  if (
    milestoneCheck(20) &&
    player.replicanti.auto[1] &&
    player.currentEternityChall !== "eterc8"
  ) {
    while (
      player.infinityPoints.gte(player.replicanti.intervalCost) &&
      player.currentEternityChall !== "eterc8" &&
      (player.timestudy.studies.includes(22)
        ? player.replicanti.interval > 1
        : player.replicanti.interval > 50)
    )
      upgradeReplicantiInterval();
  }

  if (
    milestoneCheck(21) &&
    player.replicanti.auto[2] &&
    player.currentEternityChall !== "eterc8"
  ) {
    while (upgradeReplicantiGalaxy()) continue;
  }

  document.getElementById("eterc1goal").textContent =
    "Goal: " +
    shortenCosts(
      new Decimal("1e1800")
        .times(new Decimal("1e200").pow(ECTimesCompleted("eterc1")))
        .max(new Decimal("1e1800"))
    ) +
    " IP";
  document.getElementById("eterc1completed").textContent =
    "Completed " + ECTimesCompleted("eterc1") + " times.";

  document.getElementById("eterc2goal").textContent =
    "Goal: " +
    shortenCosts(
      new Decimal("1e975")
        .times(new Decimal("1e175").pow(ECTimesCompleted("eterc2")))
        .max(new Decimal("1e975"))
    ) +
    " IP";
  document.getElementById("eterc2completed").textContent =
    "Completed " + ECTimesCompleted("eterc2") + " times.";

  document.getElementById("eterc3goal").textContent =
    "Goal: " +
    shortenCosts(
      new Decimal("1e600")
        .times(new Decimal("1e75").pow(ECTimesCompleted("eterc3")))
        .max(new Decimal("1e575"))
    ) +
    " IP";
  document.getElementById("eterc3completed").textContent =
    "Completed " + ECTimesCompleted("eterc3") + " times.";

  document.getElementById("eterc4goal").textContent =
    "Goal: " +
    shortenCosts(
      new Decimal("1e2750")
        .times(new Decimal("1e550").pow(ECTimesCompleted("eterc4")))
        .max(new Decimal("1e2750"))
    ) +
    " IP in " +
    Math.max(16 - ECTimesCompleted("eterc4") * 4, 0) +
    " infinities or less.";
  document.getElementById("eterc4completed").textContent =
    "Completed " + ECTimesCompleted("eterc4") + " times.";

  document.getElementById("eterc5goal").textContent =
    "Goal: " +
    shortenCosts(
      new Decimal("1e750")
        .times(new Decimal("1e400").pow(ECTimesCompleted("eterc5")))
        .max(new Decimal("1e750"))
    ) +
    " IP";
  document.getElementById("eterc5completed").textContent =
    "Completed " + ECTimesCompleted("eterc5") + " times.";

  document.getElementById("eterc6goal").textContent =
    "Goal: " +
    shortenCosts(
      new Decimal("1e850")
        .times(new Decimal("1e250").pow(ECTimesCompleted("eterc6")))
        .max(new Decimal("1e850"))
    ) +
    " IP";
  document.getElementById("eterc6completed").textContent =
    "Completed " + ECTimesCompleted("eterc6") + " times.";

  document.getElementById("eterc7goal").textContent =
    "Goal: " +
    shortenCosts(
      new Decimal("1e2000")
        .times(new Decimal("1e530").pow(ECTimesCompleted("eterc7")))
        .max(new Decimal("1e2000"))
    ) +
    " IP";
  document.getElementById("eterc7completed").textContent =
    "Completed " + ECTimesCompleted("eterc7") + " times.";

  document.getElementById("eterc8goal").textContent =
    "Goal: " +
    shortenCosts(
      new Decimal("1e1300")
        .times(new Decimal("1e900").pow(ECTimesCompleted("eterc8")))
        .max(new Decimal("1e1300"))
    ) +
    " IP";
  document.getElementById("eterc8completed").textContent =
    "Completed " + ECTimesCompleted("eterc8") + " times.";

  document.getElementById("eterc9goal").textContent =
    "Goal: " +
    shortenCosts(
      new Decimal("1e1750")
        .times(new Decimal("1e250").pow(ECTimesCompleted("eterc9")))
        .max(new Decimal("1e1750"))
    ) +
    " IP";
  document.getElementById("eterc9completed").textContent =
    "Completed " + ECTimesCompleted("eterc9") + " times.";

  document.getElementById("eterc10goal").textContent =
    "Goal: " +
    shortenCosts(
      new Decimal("1e3000")
        .times(new Decimal("1e300").pow(ECTimesCompleted("eterc10")))
        .max(new Decimal("1e3000"))
    ) +
    " IP";
  document.getElementById("eterc10completed").textContent =
    "Completed " + ECTimesCompleted("eterc10") + " times.";

  document.getElementById("eterc11goal").textContent =
    "Goal: " +
    shortenCosts(
      new Decimal("1e500")
        .times(new Decimal("1e200").pow(ECTimesCompleted("eterc11")))
        .max(new Decimal("1e500"))
    ) +
    " IP";
  document.getElementById("eterc11completed").textContent =
    "Completed " + ECTimesCompleted("eterc11") + " times.";

  document.getElementById("eterc12goal").textContent =
    "Goal: " +
    shortenCosts(
      new Decimal("1e110000")
        .times(new Decimal("1e12000").pow(ECTimesCompleted("eterc12")))
        .max(new Decimal("1e110000"))
    ) +
    " IP in " +
    Math.max(10 - ECTimesCompleted("eterc12") * 2, 1) / 10 +
    (ECTimesCompleted("eterc12") === 0
      ? " second or less."
      : " seconds or less.");
  document.getElementById("eterc12completed").textContent =
    "Completed " + ECTimesCompleted("eterc12") + " times.";

  updateECUnlockButtons();

  if (player.currentEternityChall == "eterc8") {
    document.getElementById("eterc8repl").style.display = "block";
    document.getElementById("eterc8ids").style.display = "block";
    document.getElementById("eterc8repl").textContent =
      "You have " + player.eterc8repl + " purchases left.";
    document.getElementById("eterc8ids").textContent =
      "You have " + player.eterc8ids + " purchases left.";
  } else {
    document.getElementById("eterc8repl").style.display = "none";
    document.getElementById("eterc8ids").style.display = "none";
  }

  if (
    player.currentEternityChall == "eterc12" &&
    player.thisEternity >= Math.max(2 * (5 - ECTimesCompleted("eterc12")), 1)
  ) {
    document.getElementById("challfail").style.display = "block";
    setTimeout(exitChallenge, 500);
    giveAchievement("You're a mistake");
    failureCount++;
    if (failureCount > 9) giveAchievement("You're a failure");
  }

  document.getElementById("infinitiedBank").style.display =
    player.infinitiedBank > 0 ? "block" : "none";
  document.getElementById("infinitiedBank").textContent =
    "You have " +
    formatInfOrEter(player.infinitiedBank) +
    " banked infinities.";

  if (player.dilation.tachyonParticles !== 0 || player.quantum.times !== 0)
    document.getElementById("dilationconf").style.display = "inline-block";
  else document.getElementById("dilationconf").style.display = "none";
  if (player.quantum.times !== 0)
    document.getElementById("quantumconf").style.display = "inline-block";
  else document.getElementById("quantumconf").style.display = "none";

  if (infchallengeTimes < 7.5) giveAchievement("Never again");
  if (
    player.infinityPoints.gte(new Decimal("1e22000")) &&
    player.timestudy.studies.length == 0
  )
    giveAchievement("What do I have to do to get rid of you");
  if (
    player.replicanti.galaxies >= 180 * player.galaxies &&
    player.galaxies > 0
  )
    giveAchievement("Popular music");
  if (player.eternityPoints.gte(Number.MAX_VALUE))
    giveAchievement("But I wanted another prestige layer...");
  if (player.eternityPoints.gte(new Decimal("1e40000")))
    giveAchievement("In the grim darkness of the far endgame");
  if (
    player.infinityPoints.gte(1e100) &&
    player.firstAmount.equals(0) &&
    player.infinitied == 0 &&
    player.resets <= 4 &&
    player.galaxies <= 1 &&
    player.replicanti.galaxies == 0
  )
    giveAchievement("Like feasting on a behind");
  if (player.infinityPoints.gte("9.99999e999"))
    giveAchievement("This achievement doesn't exist II");
  if (player.infinityPoints.gte("1e30008"))
    giveAchievement("Can you get infinite IP?");
  if (player.infinitied > 2e6) giveAchievement("2 Million Infinities");
  if (player.money.gte("9.9999e9999"))
    giveAchievement("This achievement doesn't exist");
  if (player.money.gte("1e35000")) giveAchievement("I got a few to spare");
  if (player.infinityPower.gt(1)) giveAchievement("A new beginning.");
  if (player.infinityPower.gt(1e6)) giveAchievement("1 million is a lot"); //TBD
  if (player.infinityPower.gt(1e260))
    giveAchievement("4.3333 minutes of Infinity"); //TBD
  if (player.totalTickGained >= 308) giveAchievement("Infinite time");
  if (player.totalTickGained >= 1e6) giveAchievement("GAS GAS GAS");
  if (player.firstPow >= 1e31) giveAchievement("I forgot to nerf that");
  if (player.money >= 1e80) giveAchievement("Antimatter Apocalypse");
  if (player.totalTimePlayed >= 10 * 60 * 60 * 24 * 8)
    giveAchievement("One for each dimension");
  if (player.seventhAmount > 1e12) giveAchievement("Multidimensional");
  if (player.tickspeed.lt(1e-26)) giveAchievement("Faster than a potato");
  if (player.tickspeed.lt(1e-55))
    giveAchievement("Faster than a squared potato");
  if (player.dilation.studies.includes(6)) giveAchievement("I'm so meta");
  if (player.resets >= 10) giveAchievement("Boosting to the max");
  if (player.meta.resets >= 10) giveAchievement("Meta-boosting to the max");

  if (Math.random() < 0.00001)
    giveAchievement("Do you feel lucky? Well do ya punk?");
  if (
    (player.matter.gte(2.586e15) && player.currentChallenge == "postc6") ||
    player.matter.gte(Number.MAX_VALUE)
  )
    giveAchievement("It's not called matter dimensions is it?");

  document.getElementById(
    "dilationTabbtn"
  ).style.display = player.dilation.studies.includes(1)
    ? "inline-block"
    : "none";
  document.getElementById("timeRiftTabbtn").style.display =
    player.dilation.unstable.times > 0 && player.quantum.times > 0
      ? "inline-block"
      : "none";

  updateDilationUpgradeButtons();

  if (
    player.infinityDimension1.baseAmount == 0 &&
    player.infinityDimension2.baseAmount == 0 &&
    player.infinityDimension3.baseAmount == 0 &&
    player.infinityDimension4.baseAmount == 0 &&
    player.infinityDimension5.baseAmount == 0 &&
    player.infinityDimension6.baseAmount == 0 &&
    player.infinityDimension7.baseAmount == 0 &&
    player.infinityDimension8.baseAmount == 0 &&
    player.infMultCost.equals(10) &&
    player.infinityPoints.gt(new Decimal("1e200000"))
  ) {
    giveAchievement("I never liked this infinity stuff anyway");
  }

  if (player.replicanti.amount.gt(new Decimal("1e17500")))
    giveAchievement("When will it be enough?");
  if (player.replicanti.amount.gt(new Decimal("1e100000")))
    giveAchievement("It will never be enough");
  if (player.tickspeed.e < -8296262)
    giveAchievement("Faster than a potato^286078");
  if (
    player.timestudy.studies.length == 0 &&
    player.dilation.active &&
    player.infinityPoints.e >= 20000
  )
    giveAchievement("This is what I have to do to get rid of you.");
  if (
    player.infinityPoints.gte(new Decimal("1e70000")) &&
    player.dilation.active &&
    player.galaxies == 1 &&
    player.replicanti.galaxies == 0
  )
    giveAchievement("Deeper Sanctum");
  if (player.why >= 1e6)
    giveAchievement("Should we tell them about buy max...");
}, 1000);

function dor147Stuff() {
  if (player.achievements.includes("r147")) {
    if (player.ep5xAutobuyer) {
      buyMaxEPMult();
    }
    if (player.timeDimensionAutobuyer) {
      buyMaxTimeDimensions();
    }
  }
}

var postC2Count = 0;
var IPminpeak = new Decimal(0);
var EPminpeak = new Decimal(0);
var replicantiTicks = 0;

function gameLoop(diff) {
  var thisUpdate = new Date().getTime();
  if (thisUpdate - player.lastUpdate >= 21600000)
    giveAchievement("Don't you dare sleep");
  if (typeof diff === "undefined")
    var diff = Math.min(thisUpdate - player.lastUpdate, 21600000);
  diff = diff / 100;
  if (diff < 0) diff = 1;
  if (player.currentEternityChall === "eterc12") diff = diff / 1000;
  if (player.thisInfinityTime < -10) player.thisInfinityTime = Infinity;
  if (player.bestInfinityTime < -10) player.bestInfinityTime = Infinity;
  if (diff > player.autoTime && !player.break)
    player.infinityPoints = player.infinityPoints.plus(
      player.autoIP.times(diff / player.autoTime)
    );
  /*if (player.currentChallenge == "postc6" && player.matter.gte(1)) player.matter = player.matter.plus(diff/10)
    else */
  player.matter = player.matter.times(
    Decimal.pow(1.03 + player.resets / 200 + player.galaxies / 100, diff)
  );
  if (
    player.matter.gt(player.money) &&
    (player.currentChallenge == "challenge12" ||
      player.currentChallenge == "postc1")
  ) {
    if (player.resets > 0) player.resets--;
    $.notify(
      "Your " +
        shortenMoney(player.money) +
        " units of antimatter were annihilated by " +
        shortenMoney(player.matter) +
        " units of matter.",
      "error"
    );
    softReset(0);
  }

  if (player.currentChallenge == "postc8")
    postc8Mult = postc8Mult.times(Math.pow(0.000000046416, diff));

  if (player.currentChallenge == "challenge3" || player.matter.gte(1))
    player.chall3Pow = player.chall3Pow.times(Decimal.pow(1.00038, diff));
  player.chall2Pow = Math.min(player.chall2Pow + diff / 1800, 1);
  if (player.currentChallenge == "postc2") {
    postC2Count++;
    if (postC2Count >= 8 || diff > 80) {
      sacrifice();
      postC2Count = 0;
    }
  }
  if (player.infinityUpgrades.includes("passiveGen"))
    player.partInfinityPoint += diff / player.bestInfinityTime;
  if (player.partInfinityPoint >= 100) {
    player.infinityPoints = player.infinityPoints.plus(
      player.infMult.times(player.partInfinityPoint / 10)
    );
    player.partInfinityPoint = 0;
  }

  if (player.partInfinityPoint >= 10) {
    player.partInfinityPoint -= 10;
    player.infinityPoints = player.infinityPoints.plus(player.infMult);
  }

  if (
    player.infinityUpgrades.includes("infinitiedGeneration") &&
    player.currentEternityChall !== "eterc4"
  )
    player.partInfinitied += diff / player.bestInfinityTime;
  if (player.partInfinitied >= 50) {
    player.infinitied.add(Math.floor(player.partInfinitied / 5));
    player.partInfinitied = 0;
  }

  if (player.partInfinitied >= 5) {
    player.partInfinitied -= 5;
    player.infinitied = player.infinitied.add(1);
  }

  player.infinityPoints = player.infinityPoints.plus(
    new Decimal(bestRunIppm).times(player.offlineProd / 100).times(diff / 600)
  );

  if (
    player.money.lte(Number.MAX_VALUE) ||
    (player.break && player.currentChallenge == "") ||
    (player.currentChallenge != "" && player.money.lte(player.challengeTarget))
  ) {
    if (
      player.currentChallenge != "challenge7" &&
      player.currentEternityChall != "eterc3"
    ) {
      for (let tier = 7; tier >= 1; --tier) {
        var name = TIER_NAMES[tier];

        player[name + "Amount"] = player[name + "Amount"].plus(
          getDimensionProductionPerSecond(tier + 1).times(diff / 100)
        );
      }
    } else if (player.currentEternityChall != "eterc3") {
      for (let tier = 6; tier >= 1; --tier) {
        var name = TIER_NAMES[tier];

        player[name + "Amount"] = player[name + "Amount"].plus(
          getDimensionProductionPerSecond(tier + 2).times(diff / 100)
        );
      }
    } else {
      for (let tier = 3; tier >= 1; --tier) {
        var name = TIER_NAMES[tier];

        player[name + "Amount"] = player[name + "Amount"].plus(
          getDimensionProductionPerSecond(tier + 1).times(diff / 100)
        );
      }
    }

    if (
      player.currentChallenge == "challenge3" ||
      player.currentChallenge == "postc1"
    ) {
      player.money = player.money.plus(
        getDimensionProductionPerSecond(1)
          .times(diff / 10)
          .times(player.chall3Pow)
      );
      player.totalmoney = player.totalmoney.plus(
        getDimensionProductionPerSecond(1)
          .times(diff / 10)
          .times(player.chall3Pow)
      );
    } else {
      player.money = player.money.plus(
        getDimensionProductionPerSecond(1).times(diff / 10)
      );
      player.totalmoney = player.totalmoney.plus(
        getDimensionProductionPerSecond(1).times(diff / 10)
      );
    }
    if (player.currentChallenge == "challenge7") {
      player.money = player.money.plus(
        getDimensionProductionPerSecond(2).times(diff / 10)
      );
      player.totalmoney = player.totalmoney.plus(
        getDimensionProductionPerSecond(2).times(diff / 10)
      );
    }
  }

  document.getElementById("dimTabButtons").style.display = "none";

  if (player.currentEternityChall === "eterc12")
    player.totalTimePlayed += diff * 1000;
  else player.totalTimePlayed += diff;

  player.thisInfinityTime += diff;
  player.thisEternity += diff;
  player.thisQuantum += diff;

  if (player.eternities > 0)
    document.getElementById("tdtabbtn").style.display = "inline-block";
  if (player.dilation.studies.includes(6)) {
    document.getElementById("mdtabbtn").style.display = "inline-block";
    document.getElementById("mddilupg").style.display = "";
  }

  for (let tier = 1; tier < 9; tier++) {
    if (
      tier != 8 &&
      (player.infDimensionsUnlocked[tier - 1] || ECTimesCompleted("eterc7") > 0)
    )
      player["infinityDimension" + tier].amount = player[
        "infinityDimension" + tier
      ].amount.plus(DimensionProduction(tier + 1).times(diff / 100));

    if (player.infDimensionsUnlocked[tier - 1]) {
      document.getElementById("infRow" + tier).style.display = "inline-block";
      document.getElementById("dimTabButtons").style.display = "inline-block";
      var idtabshown = true;
    } else {
      document.getElementById("infRow" + tier).style.display = "none";
      document.getElementById("idtabbtn").style.display = "none";
    }
    if (idtabshown || player.eternities >= 1) {
      document.getElementById("idtabbtn").style.display = "inline-block";
    }

    if (tier < 8)
      player["timeDimension" + tier].amount = player[
        "timeDimension" + tier
      ].amount.plus(getTimeDimensionProduction(tier + 1).times(diff / 100));
  }

  if (player.achievements.includes("r156")) {
    document.getElementById("metaMaxAllAuto").style.display = "";
    document.getElementById("metaMaxAllAuto").innerText = `Auto Max All: ${
      player.meta.autoMaxAll ? "ON" : "OFF"
    }`;
    if (player.meta.autoMaxAll) {
      for (let i = 1; i <= 8; i++) {
        while (metaBuyManyDimension(i));
      }
    }
  } else {
    document.getElementById("metaMaxAllAuto").style.display = "none";
  }
  // meta dimension production stuff
  player.meta.antimatter = player.meta.antimatter.plus(
    getMetaDimensionProductionPerSecond(1).times(diff / 10)
  );
  player.meta.bestAntimatter = player.meta.bestAntimatter.max(
    player.meta.antimatter
  );
  for (let i = 1; i < 8; i++) {
    player.meta[i].amount = player.meta[i].amount.plus(
      getMetaDimensionProductionPerSecond(i + 1).times(diff / 100)
    );
  }
  // end meta dimension production stuff

  if (player.infinitied > 0 && player.eternities < 1) {
    document.getElementById("dimTabButtons").style.display = "inline-block";
    document.getElementById("dtabbtn").style.display = "inline-block";
    document.getElementById("prodtabbtn").style.display = "inline-block";
  }
  if (player.eternities > 0)
    document.getElementById("dimTabButtons").style.display = "inline-block";

  if (player.currentEternityChall !== "eterc7")
    player.infinityPower = player.infinityPower.plus(
      DimensionProduction(1).times(diff / 10)
    );
  else if (
    player.currentChallenge !== "challenge4" &&
    player.currentChallenge !== "postc1"
  )
    player.seventhAmount = player.seventhAmount.plus(
      DimensionProduction(1).times(diff / 10)
    );

  if (player.currentEternityChall == "eterc7")
    player.infinityDimension8.amount = player.infinityDimension8.amount.plus(
      getTimeDimensionProduction(1).times(diff / 10)
    );
  else
    player.timeShards = player.timeShards.plus(
      getTimeDimensionProduction(1).times(diff / 10)
    );

  if (
    getTimeDimensionProduction(1).gt(0) &&
    ECTimesCompleted("eterc7") > 0 &&
    player.currentEternityChall !== "eterc12"
  )
    player.infinityDimension8.amount = player.infinityDimension8.amount.plus(
      eterChallReward(7)
    );

  let gain;
  if (player.timeShards.gt(0)) {
    if (player.timestudy.studies.includes(171))
      gain = Math.ceil(
        new Decimal(player.timeShards).dividedBy(player.tickThreshold).log10() /
          Math.log10(1.25)
      );
    else
      gain = Math.ceil(
        new Decimal(player.timeShards).dividedBy(player.tickThreshold).log10() /
          Math.log10(1.33)
      );
    player.totalTickGained += gain;
    player.tickspeed = player.tickspeed.times(
      Decimal.pow(getTickSpeedMultiplier(), gain)
    );
    if (player.timestudy.studies.includes(171))
      player.tickThreshold = new Decimal(1)
        .times(1.25)
        .pow(player.totalTickGained);
    else
      player.tickThreshold = new Decimal(1)
        .times(1.33)
        .pow(player.totalTickGained);
    document.getElementById("totaltickgained").textContent =
      "You've gained " +
      player.totalTickGained.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      " tickspeed upgrades.";
    updateTickSpeed();
  }

  if (player.eternities.eq(0)) {
    document.getElementById("eternityPoints2").style.display = "none";
    document.getElementById("eternitystorebtn").style.display = "none";
  } else {
    document.getElementById("eternityPoints2").style.display = "inline-block";
  }

  if (
    player.money.gte(Number.MAX_VALUE) &&
    (!player.break ||
      (player.currentChallenge != "" &&
        player.money.gte(player.challengeTarget)))
  ) {
    document.getElementById("bigcrunch").style.display = "inline-block";
    if (
      (player.currentChallenge == "" || player.options.retryChallenge) &&
      !(player.bestInfinityTime <= 600 || player.break)
    ) {
      showTab("emptiness");
    }
  } else document.getElementById("bigcrunch").style.display = "none";

  updateBigCrunchButton();

  if (nextAt[player.postChallUnlocked] === undefined)
    document.getElementById("nextchall").textContent = " ";
  else if (!player.achievements.includes("r133")) {
    document.getElementById("nextchall").textContent =
      "Next challenge unlocks at " +
      shortenCosts(nextAt[player.postChallUnlocked]) +
      " antimatter.";
    while (
      player.money.gte(nextAt[player.postChallUnlocked]) &&
      player.challenges.includes("postc8") === false &&
      player.postChallUnlocked != 8
    ) {
      if (player.postChallUnlocked != 8) player.postChallUnlocked += 1;
      if (player.eternities > 6)
        player.challenges.push("postc" + player.postChallUnlocked);
      updateChallenges();
    }
  }
  let interval = player.replicanti.interval;
  if (player.timestudy.studies.includes(62)) interval = interval / 5;
  if (
    (player.timestudy.studies.includes(133) &&
      !player.achievements.includes("r143")) ||
    player.replicanti.amount.gt(Number.MAX_VALUE)
  )
    interval *= 10;
  if (player.timestudy.studies.includes(213)) interval /= 20;
  if (
    player.replicanti.amount.lt(Number.MAX_VALUE) &&
    player.achievements.includes("r134")
  )
    interval /= 2;
  if (player.replicanti.amount.gt(Number.MAX_VALUE))
    interval = Math.max(
      interval *
        Math.pow(
          getReplSpeed(),
          (player.replicanti.amount.log10() - 308) / 308
        ),
      interval
    );
  var est = (Math.log(player.replicanti.chance + 1) * 1000) / interval;

  var current = player.replicanti.amount.ln();
  if (player.replicanti.amount.lt(1) || isNaN(player.replicanti.amount))
    player.replicanti.amount = new Decimal(1);
  if (
    player.replicanti.unl &&
    (diff > 5 || interval < 50 || player.timestudy.studies.includes(192))
  ) {
    var gained = Decimal.pow(Math.E, current + (diff * est) / 10);
    let c = Decimal.log(getReplSpeed(), 10) / 308;
    if (player.timestudy.studies.includes(192)) {
      gained = Decimal.pow(
        Math.E,
        current + Math.log(((diff * est) / 10) * c + 1) / c
      );
    }
    player.replicanti.amount = Decimal.min(Number.MAX_VALUE, gained);
    if (player.timestudy.studies.includes(192))
      player.replicanti.amount = gained;
    replicantiTicks = 0;
  } else {
    if (interval <= replicantiTicks && player.replicanti.unl) {
      if (player.replicanti.amount.lte(100)) {
        var temp = player.replicanti.amount;
        for (var i = 0; temp.gt(i); i++) {
          if (player.replicanti.chance > Math.random())
            player.replicanti.amount = player.replicanti.amount.plus(1);
        }
      } else {
        var temp = Decimal.round(player.replicanti.amount.dividedBy(100));
        if (Math.round(player.replicanti.chance) !== 1) {
          let counter = 0;
          for (var i = 0; i < 100; i++) {
            if (player.replicanti.chance > Math.random()) {
              counter++;
            }
          }
          player.replicanti.amount = Decimal.min(
            Number.MAX_VALUE,
            temp.times(counter).plus(player.replicanti.amount)
          );
          if (player.timestudy.studies.includes(192))
            player.replicanti.amount = temp
              .times(counter)
              .plus(player.replicanti.amount);
          counter = 0;
        } else {
          if (player.timestudy.studies.includes(192))
            player.replicanti.amount = player.replicanti.amount.times(2);
          else
            player.replicanti.amount = Decimal.min(
              Number.MAX_VALUE,
              player.replicanti.amount.times(2)
            );
        }
      }
      replicantiTicks -= interval;
    }
  }

  if (player.replicanti.amount !== 0)
    replicantiTicks += player.options.updateRate;

  if (
    current == Decimal.ln(Number.MAX_VALUE) &&
    player.thisInfinityTime < 600 * 30
  )
    giveAchievement("Is this safe?");
  if (player.replicanti.galaxies >= 10 && player.thisInfinityTime < 150)
    giveAchievement("The swarm");

  if (
    player.replicanti.galaxybuyer &&
    player.replicanti.amount.gte(Number.MAX_VALUE) &&
    !player.timestudy.studies.includes(131)
  ) {
    document.getElementById("replicantireset").click();
  } else if (
    player.replicanti.galaxybuyer &&
    player.replicanti.amount.gte(Number.MAX_VALUE) &&
    player.timestudy.studies.includes(131) &&
    player.achievements.includes("r143")
  )
    document.getElementById("replicantireset").click();
  if (
    player.timestudy.studies.includes(22)
      ? player.replicanti.interval !== 1
      : player.replicanti.interval !== 50
  )
    document.getElementById("replicantiinterval").innerHTML =
      "Interval: " +
      interval.toFixed(3) +
      "ms<br>-> " +
      Math.max(interval * 0.9).toFixed(3) +
      " Costs: " +
      shortenCosts(player.replicanti.intervalCost) +
      " IP";
  else
    document.getElementById("replicantiinterval").textContent =
      "Interval: " + interval.toFixed(3) + "ms";

  if (player.infMultBuyer) {
    var dif = player.infinityPoints.e - player.infMultCost.e + 1;
    if (dif > 0) {
      player.infMult = player.infMult.times(Decimal.pow(getInfMult(), dif));
      player.infMultCost = player.infMultCost.times(Decimal.pow(10, dif));
      updateInfMult();
      player.infinityPoints = player.infinityPoints.minus(
        player.infMultCost.dividedBy(10)
      );
      if (
        player.autobuyers[11].priority !== undefined &&
        player.autobuyers[11].priority !== null &&
        player.autoCrunchMode == "amount"
      )
        player.autobuyers[11].priority = player.autobuyers[11].priority.times(
          Decimal.pow(getInfMult(), dif)
        );
      if (player.autoCrunchMode == "amount")
        document.getElementById("priority12").value =
          player.autobuyers[11].priority;
    }
  }

  var estimate = Math.max((Math.log(Number.MAX_VALUE) - current) / est, 0);
  document.getElementById("replicantiapprox").textContent =
    "Approximately " +
    timeDisplay(estimate * 10) +
    " until infinite Replicanti.";

  document.getElementById("replicantiamount").textContent = shortenDimensions(
    player.replicanti.amount
  );

  document.getElementById("replicantimult").textContent = shorten(
    getReplMult()
  );
  updateEternityButton();
  document.getElementById("metaCost").innerHTML = shortenCosts(1e24);

  updateMoney();
  updateCoinPerSec();
  updateDimensions();
  updateInfCosts();
  updateInfinityDimensions();
  updateInfPower();
  updateTimeDimensions();
  updateTimeShards();
  updateDilation();
  if (
    getDimensionProductionPerSecond(1).gt(player.money) &&
    !player.achievements.includes("r44")
  ) {
    Marathon += player.options.updateRate / 1000;
    if (Marathon >= 30) giveAchievement("Over in 30 seconds");
  } else {
    Marathon = 0;
  }
  if (
    DimensionProduction(1).gt(player.infinityPower) &&
    player.currentEternityChall != "eterc7" &&
    !player.achievements.includes("r113")
  ) {
    Marathon2 += player.options.updateRate / 1000;
    if (Marathon2 >= 60) giveAchievement("Long lasting relationship");
  } else {
    Marathon2 = 0;
  }
  if (
    player.eternities >= 1 &&
    (player.options.notation == "Standard" ||
      player.options.notation == "Emojis" ||
      player.options.notation == "Brackets")
  ) {
    painTimer += player.options.updateRate / 1000;
    if (painTimer >= 600) giveAchievement("Do you enjoy pain?");
  }

  if (player.money.gt(1e63)) giveAchievement("Super Sanic");

  for (let tier = 1; tier <= 8; ++tier) {
    var name = TIER_NAMES[tier];
    if (
      player.currentChallenge != "challenge10" &&
      player.currentChallenge != "postc1"
    ) {
      document.getElementById(name).className = canAfford(player[name + "Cost"])
        ? "storebtn"
        : "unavailablebtn";
      document.getElementById(name + "Max").className = canAfford(
        player[name + "Cost"].times(10 - dimBought(tier))
      )
        ? "storebtn"
        : "unavailablebtn";
    } else {
      if (tier >= 3) {
        document.getElementById(name).className = player[
          TIER_NAMES[tier - 2] + "Amount"
        ].gte(player[name + "Cost"])
          ? "storebtn"
          : "unavailablebtn";
        document.getElementById(name + "Max").className = player[
          TIER_NAMES[tier - 2] + "Amount"
        ].gte(player[name + "Cost"].times(10 - dimBought(tier)))
          ? "storebtn"
          : "unavailablebtn";
      } else {
        document.getElementById(name).className = canAfford(
          player[name + "Cost"]
        )
          ? "storebtn"
          : "unavailablebtn";
        document.getElementById(name + "Max").className = canAfford(
          player[name + "Cost"].times(10 - dimBought(tier))
        )
          ? "storebtn"
          : "unavailablebtn";
      }
    }
  }
  if (player.firstAmount.lt(1))
    document.getElementById("first").className = "storebtn";

  for (var tier = 1; tier < 9; tier++) {
    if (player.infinityPoints.gte(player["infinityDimension" + tier].cost))
      document.getElementById("infMax" + tier).className = "storebtn";
    else document.getElementById("infMax" + tier).className = "unavailablebtn";
  }

  for (var tier = 1; tier < 9; tier++) {
    if (player.eternityPoints.gte(player["timeDimension" + tier].cost))
      document.getElementById("timeMax" + tier).className = "storebtn";
    else document.getElementById("timeMax" + tier).className = "unavailablebtn";
  }

  if (player.dilation.studies.includes(1)) {
    let gain = getDilTimeGainPerSecond().times(diff / 10);
    player.dilation.dilatedTime = player.dilation.dilatedTime.plus(gain);
  }

  if (player.achievements.includes("r141")) {
    document.getElementById("rebuyupgauto").innerText = `Autobuy Rebuyables: ${
      player.dilation.autobuy ? "ON" : "OFF"
    }`;
    document.getElementById("rebuyupgauto").style.display = "";
    if (player.dilation.autobuy) {
      for (let id of [4, 3, 1, 2]) {
        while (buyDilationUpgrade(id)) {
          // Clever, right?
        }
      }
    }
  } else {
    document.getElementById("rebuyupgauto").style.display = "none";
  }

  let thresholdMult =
    1.35 + 3.65 * Math.pow(0.8, player.dilation.rebuyables[2]);

  if (player.dilation.nextThreshold.lte(player.dilation.dilatedTime)) {
    // for (var i = 0; i < player.dilation.rebuyables[2]; i++) {
    //     thresholdMult *= Math.min( 1 - (Math.pow(0.8, i) / 10), 0.999)
    // }
    let newGalaxies = Math.floor(
      player.dilation.dilatedTime
        .div(player.dilation.nextThreshold)
        .log(thresholdMult) + 1
    );
    player.dilation.nextThreshold = player.dilation.nextThreshold.times(
      Decimal.pow(thresholdMult, newGalaxies)
    );
    player.dilation.freeGalaxies += newGalaxies;

    let doubleFree = player.dilation.upgrades.includes(5) * newGalaxies;
    if (doubleFree > 600) doubleFree = 600;
    if (player.dilation.upgrades.includes(5))
      player.dilation.freeGalaxies += doubleFree;
    if (canGiveUniversalHarmony()) {
      giveAchievement("Universal harmony");
    }
  }

  if (
    canAfford(player.tickSpeedCost) ||
    !player.currentEternityChall == "eterc9"
  ) {
    document.getElementById("tickSpeed").className = "storebtn";
    document.getElementById("tickSpeedMax").className = "storebtn";
  } else {
    document.getElementById("tickSpeed").className = "unavailablebtn";
    document.getElementById("tickSpeedMax").className = "unavailablebtn";
  }

  if (player.infinityPoints.gt(0) || player.eternities !== 0) {
    document.getElementById("infinitybtn").style.display = "block";
    document.getElementById("infi11").className = "infinistorebtn1";
    document.getElementById("infi21").className = "infinistorebtn2";
    if (player.infinityUpgrades.includes("timeMult"))
      document.getElementById("infi12").className = "infinistorebtn1";
    else document.getElementById("infi12").className = "infinistorebtnlocked";
    if (player.infinityUpgrades.includes("dimMult"))
      document.getElementById("infi22").className = "infinistorebtn2";
    else document.getElementById("infi22").className = "infinistorebtnlocked";
    if (player.infinityUpgrades.includes("18Mult"))
      document.getElementById("infi13").className = "infinistorebtn1";
    else document.getElementById("infi13").className = "infinistorebtnlocked";
    if (player.infinityUpgrades.includes("27Mult"))
      document.getElementById("infi23").className = "infinistorebtn2";
    else document.getElementById("infi23").className = "infinistorebtnlocked";
    if (player.infinityUpgrades.includes("36Mult"))
      document.getElementById("infi14").className = "infinistorebtn1";
    else document.getElementById("infi14").className = "infinistorebtnlocked";
    if (
      player.infinityUpgrades.includes("45Mult") &&
      player.infinityPoints.gte(2)
    )
      document.getElementById("infi24").className = "infinistorebtn2";
    else document.getElementById("infi24").className = "infinistorebtnlocked";
    if (player.infinityPoints.gte(3))
      document.getElementById("infi31").className = "infinistorebtn3";
    else document.getElementById("infi31").className = "infinistorebtnlocked";
    if (
      player.infinityUpgrades.includes("timeMult2") &&
      player.infinityPoints.gte(5)
    )
      document.getElementById("infi32").className = "infinistorebtn3";
    else document.getElementById("infi32").className = "infinistorebtnlocked";
    if (
      player.infinityUpgrades.includes("unspentBonus") &&
      player.infinityPoints.gte(7)
    )
      document.getElementById("infi33").className = "infinistorebtn3";
    else document.getElementById("infi33").className = "infinistorebtnlocked";
    if (
      player.infinityUpgrades.includes("resetMult") &&
      player.infinityPoints.gte(10)
    )
      document.getElementById("infi34").className = "infinistorebtn3";
    else document.getElementById("infi34").className = "infinistorebtnlocked";
    if (player.infinityPoints.gte(20))
      document.getElementById("infi41").className = "infinistorebtn4";
    else document.getElementById("infi41").className = "infinistorebtnlocked";
    if (
      player.infinityUpgrades.includes("skipReset1") &&
      player.infinityPoints.gte(40)
    )
      document.getElementById("infi42").className = "infinistorebtn4";
    else document.getElementById("infi42").className = "infinistorebtnlocked";
    if (
      player.infinityUpgrades.includes("skipReset2") &&
      player.infinityPoints.gte(80)
    )
      document.getElementById("infi43").className = "infinistorebtn4";
    else document.getElementById("infi43").className = "infinistorebtnlocked";
    if (
      player.infinityUpgrades.includes("skipReset3") &&
      player.infinityPoints.gte(500)
    )
      document.getElementById("infi44").className = "infinistorebtn4";
    else document.getElementById("infi44").className = "infinistorebtnlocked";
    if (
      player.infinityUpgrades.includes("skipResetGalaxy") &&
      player.infinityUpgrades.includes("passiveGen") &&
      player.infinityUpgrades.includes("galaxyBoost") &&
      player.infinityUpgrades.includes("resetBoost") &&
      player.infinityPoints.gte(player.infMultCost)
    ) {
      document.getElementById("infiMult").className = "infinimultbtn";
    } else
      document.getElementById("infiMult").className = "infinistorebtnlocked";

    if (player.infinityPoints.gte(1e4))
      document.getElementById("postinfi11").className = "infinistorebtn1";
    else
      document.getElementById("postinfi11").className = "infinistorebtnlocked";

    if (player.infinityPoints.gte(5e4))
      document.getElementById("postinfi21").className = "infinistorebtn1";
    else
      document.getElementById("postinfi21").className = "infinistorebtnlocked";

    if (player.infinityPoints.gte(player.tickSpeedMultDecreaseCost))
      document.getElementById("postinfi31").className = "infinimultbtn";
    else
      document.getElementById("postinfi31").className = "infinistorebtnlocked";

    if (player.infinityPoints.gte(5e11))
      document.getElementById("postinfi41").className = "infinistorebtn1";
    else
      document.getElementById("postinfi41").className = "infinistorebtnlocked";

    if (player.infinityPoints.gte(1e5))
      document.getElementById("postinfi12").className = "infinistorebtn1";
    else
      document.getElementById("postinfi12").className = "infinistorebtnlocked";

    if (player.infinityPoints.gte(1e6))
      document.getElementById("postinfi22").className = "infinistorebtn1";
    else
      document.getElementById("postinfi22").className = "infinistorebtnlocked";

    if (player.infinityPoints.gte(1e7))
      document.getElementById("postinfi32").className = "infinistorebtn1";
    else
      document.getElementById("postinfi32").className = "infinistorebtnlocked";

    if (player.infinityPoints.gte(player.dimensionMultDecreaseCost))
      document.getElementById("postinfi42").className = "infinimultbtn";
    else
      document.getElementById("postinfi42").className = "infinistorebtnlocked";

    if (player.infinityPoints.gte(20e6))
      document.getElementById("postinfi13").className = "infinistorebtn1";
    else
      document.getElementById("postinfi13").className = "infinistorebtnlocked";

    if (player.infinityPoints.gte(5e9))
      document.getElementById("postinfi23").className = "infinistorebtn1";
    else
      document.getElementById("postinfi23").className = "infinistorebtnlocked";

    if (player.infinityPoints.gte(1e15))
      document.getElementById("postinfi33").className = "infinistorebtn1";
    else
      document.getElementById("postinfi33").className = "infinistorebtnlocked";

    if (player.infinityPoints.gte(player.offlineProdCost))
      document.getElementById("offlineProd").className = "infinimultbtn";
    else
      document.getElementById("offlineProd").className = "infinistorebtnlocked";
  }
  if (player.infinityPoints.equals(0)) {
    document.getElementById("infi11").className = "infinistorebtnlocked";
    document.getElementById("infi12").className = "infinistorebtnlocked";
    document.getElementById("infi13").className = "infinistorebtnlocked";
    document.getElementById("infi14").className = "infinistorebtnlocked";
    document.getElementById("infi21").className = "infinistorebtnlocked";
    document.getElementById("infi22").className = "infinistorebtnlocked";
    document.getElementById("infi23").className = "infinistorebtnlocked";
    document.getElementById("infi24").className = "infinistorebtnlocked";
    document.getElementById("infi31").className = "infinistorebtnlocked";
    document.getElementById("infi32").className = "infinistorebtnlocked";
    document.getElementById("infi33").className = "infinistorebtnlocked";
    document.getElementById("infi34").className = "infinistorebtnlocked";
    document.getElementById("infi41").className = "infinistorebtnlocked";
    document.getElementById("infi42").className = "infinistorebtnlocked";
    document.getElementById("infi43").className = "infinistorebtnlocked";
    document.getElementById("infi44").className = "infinistorebtnlocked";
    document.getElementById("infiMult").className = "infinistorebtnlocked";
  }

  if (player.autobuyers[11] % 1 === 0 || player.autobuyers[11].interval > 100)
    document.getElementById("break").className = "infinistorebtnlocked";
  else document.getElementById("break").className = "infinistorebtn2";

  if (player.resets > 4) {
    document.getElementById("confirmation").style.display = "inline-block";
    document.getElementById("sacrifice").style.display = "inline-block";
  } else {
    document.getElementById("confirmation").style.display = "none";
    document.getElementById("sacrifice").style.display = "none";
  }

  if (player.infinitied > 0)
    document.getElementById("sacrifice").style.display = "inline-block";

  if (
    player.eightAmount > 0 &&
    player.resets > 4 &&
    player.currentEternityChall !== "eterc3"
  )
    document.getElementById("sacrifice").className = "storebtn";
  else document.getElementById("sacrifice").className = "unavailablebtn";

  if (
    player.autobuyers[11] % 1 !== 0 &&
    player.autobuyers[11].interval == 100
  ) {
    document.getElementById("postinftable").style.display = "inline-block";
  } else {
    document.getElementById("postinftable").style.display = "none";
  }

  if (player.autobuyers[11].interval == 100)
    document.getElementById("abletobreak").style.display = "none";

  document.getElementById("infinitybtn").style.display = "none";
  document.getElementById("challengesbtn").style.display = "none";

  if (
    player.money.gte(Number.MAX_VALUE) &&
    ((player.currentChallenge != "" &&
      player.money.gte(player.challengeTarget) &&
      !player.options.retryChallenge) ||
      (player.bestInfinityTime > 600 && !player.break))
  ) {
    document.getElementById("dimensionsbtn").style.display = "none";
    document.getElementById("optionsbtn").style.display = "none";
    document.getElementById("statisticsbtn").style.display = "none";
    document.getElementById("achievementsbtn").style.display = "none";
    document.getElementById("challengesbtn").style.display = "none";
    document.getElementById("infinitybtn").style.display = "none";
    document.getElementById("tickSpeed").style.visibility = "hidden";
    document.getElementById("tickSpeedMax").style.visibility = "hidden";
    document.getElementById("tickLabel").style.visibility = "hidden";
    document.getElementById("tickSpeedAmount").style.visibility = "hidden";
  } else {
    document.getElementById("dimensionsbtn").style.display = "inline-block";
    document.getElementById("optionsbtn").style.display = "inline-block";
    document.getElementById("statisticsbtn").style.display = "inline-block";
    document.getElementById("achievementsbtn").style.display = "inline-block";
    if (player.infinitied > 0) {
      document.getElementById("infinitybtn").style.display = "inline-block";
      document.getElementById("challengesbtn").style.display = "inline-block";
    }
  }

  document.getElementById("epmult").className = player.eternityPoints.gte(
    player.epmultCost
  )
    ? "eternityupbtn"
    : "eternityupbtnlocked";

  if (player.infinityUpgrades.includes("bulkBoost"))
    document.getElementById("bulkdimboost").style.display = "inline";
  else document.getElementById("bulkdimboost").style.display = "none";

  if (player.infinityUpgrades.includes("timeMult"))
    document.getElementById("infi11").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("dimMult"))
    document.getElementById("infi21").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("18Mult"))
    document.getElementById("infi12").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("27Mult"))
    document.getElementById("infi22").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("36Mult"))
    document.getElementById("infi13").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("45Mult"))
    document.getElementById("infi23").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("resetBoost"))
    document.getElementById("infi14").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("galaxyBoost"))
    document.getElementById("infi24").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("timeMult2"))
    document.getElementById("infi31").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("unspentBonus"))
    document.getElementById("infi32").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("resetMult"))
    document.getElementById("infi33").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("passiveGen"))
    document.getElementById("infi34").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("skipReset1"))
    document.getElementById("infi41").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("skipReset2"))
    document.getElementById("infi42").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("skipReset3"))
    document.getElementById("infi43").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("skipResetGalaxy"))
    document.getElementById("infi44").className = "infinistorebtnbought";

  if (player.infinityUpgrades.includes("totalMult"))
    document.getElementById("postinfi11").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("currentMult"))
    document.getElementById("postinfi21").className = "infinistorebtnbought";
  if (player.tickSpeedMultDecrease <= 2)
    document.getElementById("postinfi31").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("achievementMult"))
    document.getElementById("postinfi22").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("infinitiedMult"))
    document.getElementById("postinfi12").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("postGalaxy"))
    document.getElementById("postinfi41").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("challengeMult"))
    document.getElementById("postinfi32").className = "infinistorebtnbought";
  if (player.dimensionMultDecrease <= 3)
    document.getElementById("postinfi42").className = "infinistorebtnbought";
  if (player.offlineProd == 50)
    document.getElementById("offlineProd").className = "infinistorebtnbought";

  if (player.infinityUpgrades.includes("infinitiedGeneration"))
    document.getElementById("postinfi13").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("bulkBoost"))
    document.getElementById("postinfi23").className = "infinistorebtnbought";
  if (player.infinityUpgrades.includes("autoBuyerUpgrade"))
    document.getElementById("postinfi33").className = "infinistorebtnbought";

  if (player.eternities > 0) {
    document.getElementById("infinitybtn").style.display = "inline-block";
    document.getElementById("challengesbtn").style.display = "inline-block";
  }

  calculateProgressBar();
  updateECRewardText();
  updateStatisticsText();

  var shiftRequirement = getShiftRequirement(0);

  if (
    player[TIER_NAMES[shiftRequirement.tier] + "Amount"] >=
    shiftRequirement.amount
  ) {
    document.getElementById("softReset").className = "storebtn";
  } else {
    document.getElementById("softReset").className = "unavailablebtn";
  }

  if (player.eightAmount >= getGalaxyRequirement()) {
    document.getElementById("secondSoftReset").className = "storebtn";
  } else {
    document.getElementById("secondSoftReset").className = "unavailablebtn";
  }

  if (
    player.currentChallenge == "challenge4" &&
    player.sixthAmount >= getGalaxyRequirement()
  ) {
    document.getElementById("secondSoftReset").className = "storebtn";
  }

  if (
    player.currentChallenge == "challenge2" ||
    player.currentChallenge == "postc1"
  )
    document.getElementById("chall2Pow").style.display = "inline-block";
  else document.getElementById("chall2Pow").style.display = "none";
  if (
    player.currentChallenge == "challenge3" ||
    player.currentChallenge == "postc1"
  )
    document.getElementById("chall3Pow").style.display = "inline-block";
  else document.getElementById("chall3Pow").style.display = "none";

  document.getElementById("chall2Pow").textContent =
    "(Production of all dimensions: " +
    (player.chall2Pow * 100).toFixed(2) +
    "%)";
  document.getElementById("chall3Pow").textContent =
    "(1st Dimension multiplier: " + shorten(player.chall3Pow * 100) + "%)";

  if (
    player.infDimensionsUnlocked[7] == false &&
    player.break &&
    player.eternities <= 24
  ) {
    document.getElementById("newDimensionButton").style.display =
      "inline-block";
  } else document.getElementById("newDimensionButton").style.display = "none";

  if (player.money.gte(getNewInfReq()))
    document.getElementById("newDimensionButton").className = "newdim";
  else document.getElementById("newDimensionButton").className = "newdimlocked";

  var infdimpurchasewhileloop = 1;
  while (
    player.eternities > 24 &&
    getNewInfReq().lt(player.money) &&
    player.infDimensionsUnlocked[7] === false
  ) {
    for (i = 0; i < 8; i++) {
      if (player.infDimensionsUnlocked[i]) infdimpurchasewhileloop++;
    }
    newDimension();
    if (player.infDimBuyers[i - 1]) buyMaxInfDims(infdimpurchasewhileloop);
    infdimpurchasewhileloop = 1;
  }

  dor147Stuff();

  document.getElementById("newDimensionButton").textContent =
    "Get " +
    shortenCosts(getNewInfReq()) +
    " antimatter to unlock a new Dimension.";

  document
    .getElementById("sacrifice")
    .setAttribute(
      "ach-tooltip",
      "Boosts 8th Dimension by " +
        formatValue(player.options.notation, calcSacrificeBoost(), 2, 2) +
        "x"
    );

  document.getElementById("sacrifice").textContent =
    "Dimensional Sacrifice (" +
    formatValue(player.options.notation, calcSacrificeBoost(), 2, 2) +
    "x)";
  if (isNaN(player.totalmoney)) player.totalmoney = new Decimal(10);
  if (player.timestudy.studies.includes(181))
    player.infinityPoints = player.infinityPoints.plus(
      gainedInfinityPoints()
        .times(diff / 1000)
        .times(player.timestudy.studies.includes(282) ? 100 : 1)
    );
  if (player.dilation.upgrades.includes(17)) {
    checkIfTTNaN();
    document.getElementById("theorembuyers").style.display = "none";
    player.timestudy.theorem += parseFloat(
      player.dilation.tachyonParticles
        .div(20000)
        .times(diff / 10)
        .toString()
    );
    if (
      document.getElementById("timestudies").style.display != "none" &&
      document.getElementById("eternitystore").style.display != "none"
    ) {
      if (player.timestudy.theorem > 99999)
        document.getElementById("timetheorems").innerHTML =
          "You have <span style='display:inline' class=\"TheoremAmount\">" +
          shortenMoney(player.timestudy.theorem) +
          "</span> Time " +
          "Theorems.";
      else
        document.getElementById("timetheorems").innerHTML =
          "You have <span style='display:inline' class=\"TheoremAmount\">" +
          player.timestudy.theorem.toFixed(0) +
          "</span> Time " +
          (player.timestudy.theorem == 1 ? "Theorem." : "Theorems.");
      updateTimeStudyButtons();
    }
  } else {
    document.getElementById("theorembuyers").style.display = "";
  }

  document.getElementById("infinityPoints1").innerHTML =
    'You have <span class="IPAmount1">' +
    shortenDimensions(player.infinityPoints) +
    "</span> Infinity points.";
  document.getElementById("infinityPoints2").innerHTML =
    'You have <span class="IPAmount2">' +
    shortenDimensions(player.infinityPoints) +
    "</span> Infinity points.";
  if (player.dilation.active && player.achievements.includes("r151")) {
    if (player.dilation.tachyonParticles.lte(getDilGain())) {
      player.dilation.tachyonParticles = getDilGain();
    }
  }
  updateQuantum();
  getDilationSeverity();
  autoTTCycle();
  updateSacrificeMultText();
  player.lastUpdate = thisUpdate;
}

function simulateTime(seconds, real) {
  //the game is simulated at a 50ms update rate, with a max of 1000 ticks
  //warning: do not call this function with real unless you know what you're doing
  document.getElementById("offlineprogress").style.display = "block";
  var ticks = seconds * 20;
  var bonusDiff = 0;
  var playerStart = Object.assign({}, player);
  // since there's an extra level of nesting
  var startingMetaAntimatter = playerStart.meta.antimatter;
  if (ticks > 1000 && !real) {
    bonusDiff = (ticks - 1000) / 20;
    ticks = 1000;
  }
  let ticksDone = 0;
  for (ticksDone = 0; ticksDone < ticks; ticksDone++) {
    gameLoop(50 + bonusDiff);
    autoBuyerTick();
    if (real) console.log(ticksDone);
  }
  var popupString =
    "Offline ticks processed: " + ticks * bonusDiff + "<br>While you were away";
  if (player.money.gt(playerStart.money))
    popupString +=
      ",<br> your antimatter increased from " +
      shortenMoney(playerStart.money) +
      " to " +
      shortenMoney(player.money);
  if (player.infinityPower.gt(playerStart.infinityPower))
    popupString +=
      ",<br> your Infinity Power increased from " +
      shortenMoney(Decimal.max(playerStart.infinityPower, 1)) +
      " to " +
      shortenMoney(player.infinityPower);
  if (player.timeShards.gt(playerStart.timeShards))
    popupString +=
      ",<br> your Time Shards increased from " +
      shortenMoney(playerStart.timeShards) +
      " to " +
      shortenMoney(player.timeShards);
  if (player.meta.antimatter.gt(startingMetaAntimatter))
    popupString +=
      ",<br> your meta-antimatter increased from " +
      shortenMoney(Decimal.max(startingMetaAntimatter, 1)) +
      " to " +
      shortenMoney(player.meta.antimatter);
  if (
    player.infinitied.gt(playerStart.infinitied) ||
    player.eternities.gt(playerStart.eternities)
  ) {
    popupString += ",";
  } else popupString += ".";
  if (player.infinitied > playerStart.infinitied)
    popupString +=
      "<br>you infinitied " +
      formatInfOrEter(player.infinitied - playerStart.infinitied) +
      " times.";
  if (player.eternities > playerStart.eternities)
    popupString +=
      " <br>you eternitied " +
      formatInfOrEter(player.eternities - playerStart.eternities) +
      " times.";
  if (popupString.length == 20) {
    popupString = popupString.slice(0, -1);
    popupString += "... Nothing happened.";
    giveAchievement("While you were away... Nothing happened.");
  }

  document.getElementById("offlinePopup").innerHTML = popupString;
}

function startInterval() {
  gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
}

function enableChart() {
  if (document.getElementById("chartOnOff").checked) {
    player.options.chart.on = true;
    if (player.options.chart.warning < 1)
      alert(
        "Warning: Using the chart can cause performance issues. Please disable it if you're experiencing lag."
      );
  } else {
    player.options.chart.on = false;
  }
}

function enableChartDips() {
  if (document.getElementById("chartDipsOnOff").checked) {
    player.options.chart.dips = true;
  } else {
    player.options.chart.dips = false;
  }
}

function updateChart(first) {
  if (
    !first &&
    (player.infinitied >= 1 || player.eternities >= 1) &&
    player.options.chart.on
  ) {
    if (
      player.currentChallenge == "challenge3" ||
      player.currentChallenge == "postc1"
    ) {
      addData(
        normalDimChart,
        "0",
        getDimensionProductionPerSecond(1).times(player.chall3Pow)
      );
    } else {
      addData(normalDimChart, "0", getDimensionProductionPerSecond(1));
    }
  }
  if (player.options.chart.updateRate) {
    setTimeout(updateChart, player.options.chart.updateRate);
  } else {
    setTimeout(updateChart, 1000);
  }
}
updateChart(true);

var slider = document.getElementById("updaterateslider");
var sliderText = document.getElementById("updaterate");

slider.oninput = function() {
  player.options.updateRate = parseInt(this.value);
  sliderText.textContent = "Update rate: " + this.value + "ms";
  if (player.options.updateRate === 200)
    giveAchievement("You should download some more RAM");
  clearInterval(gameLoopIntervalId);
  gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
};

function dimBoolean() {
  var name = TIER_NAMES[getShiftRequirement(0).tier];
  if (!player.autobuyers[9].isOn) return false;
  if (player.autobuyers[9].ticks * 100 < player.autobuyers[9].interval)
    return false;
  if (player[name + "Amount"] > getShiftRequirement(0)) return true;
  if (
    player.eternities < 10 &&
    player[name + "Amount"] <
      getShiftRequirement(player.autobuyers[9].bulk - 1).amount
  )
    return false;
  if (player.overXGalaxies <= player.galaxies) return true;
  if (
    (player.currentChallenge == "challenge4" ||
      player.currentChallenge == "postc1") &&
    player.autobuyers[9].priority < getShiftRequirement(0).amount &&
    getShiftRequirement(0).tier == 6
  )
    return false;
  if (
    player.autobuyers[9].priority < getShiftRequirement(0).amount &&
    getShiftRequirement(0).tier == 8
  )
    return false;
  return true;
}

function maxBuyGalaxies(manual) {
  if (
    player.currentEternityChall == "eterc6" ||
    player.currentChallenge == "challenge11" ||
    player.currentChallenge == "postc1" ||
    player.currentChallenge == "postc7"
  )
    return;
  if (player.autobuyers[10].priority > player.galaxies || manual) {
    while (
      player.eightAmount >= getGalaxyRequirement() &&
      (player.autobuyers[10].priority > player.galaxies || manual)
    ) {
      if (player.options.notation == "Emojis") player.spreadingCancer += 1;
      player.galaxies++;
    }
    player.galaxies--;
    galaxyReset();
  }
}

function maxBuyDimBoosts(manual) {
  if (
    player.autobuyers[9].priority >= player.eightBought ||
    player.galaxies >= player.overXGalaxies ||
    getShiftRequirement(0).tier < 8 ||
    manual
  ) {
    var bought = player[TIER_NAMES[getShiftRequirement(0).tier] + "Bought"];
    // get shift requirement is 1 different that what you might expect.
    var r = 1;
    while (bought >= getShiftRequirement(2 * r - 1).amount) {
      r *= 2;
    }
    inc = r;
    while (inc >= 1) {
      while (bought >= getShiftRequirement(r + inc - 1).amount) {
        r += inc;
      }
      inc /= 2;
    }
    if (bought < getShiftRequirement(0).amount) {
      r = 0;
    }
    if (player.galaxies < player.overXGalaxies) {
      r = Math.min(r, player.autobuyers[9].priority - player.resets);
    }
    if (r >= 750) giveAchievement("Costco sells dimboosts now");
    if (r > 0) softReset(r);
  }
}

var timer = 0;
function autoBuyerTick() {
  if (milestoneCheck(23) && player.eternityBuyer.isOn) {
    if (player.autoEterMode === "amount") {
      if (player.eternityBuyer.limit.lte(gainedEternityPoints())) {
        eternity(false, true);
      }
    } else if (player.autoEterMode === "time") {
      if (player.eternityBuyer.limit.lte(player.thisEternity / 10)) {
        eternity(false, true);
      }
    } else if (player.autoEterMode === "relative") {
      if (
        player.eternityBuyer.limit.lte(
          gainedEternityPoints().div(player.lastTenEternities[0][1].max(1))
        )
      ) {
        eternity(false, true);
      }
    } else {
      let bestLast10 = player.lastTenEternities.reduce(function(a, b) {
        return a.max(b[1]);
      }, new Decimal(1));
      if (
        player.eternityBuyer.limit.lte(gainedEternityPoints().div(bestLast10))
      ) {
        eternity(false, true);
      }
    }
  }

  if (player.autobuyers[11] % 1 !== 0) {
    if (
      player.autobuyers[11].ticks * 100 >= player.autobuyers[11].interval &&
      player.money.gte(Number.MAX_VALUE)
    ) {
      if (player.autobuyers[11].isOn) {
        if (player.autoCrunchMode == "amount") {
          if (
            !player.break ||
            player.currentChallenge != "" ||
            player.autobuyers[11].priority.lt(gainedInfinityPoints())
          ) {
            autoS = false;
            document.getElementById("bigcrunch").click();
          }
        } else if (player.autoCrunchMode == "time") {
          if (
            !player.break ||
            player.currentChallenge != "" ||
            player.autobuyers[11].priority.lt(player.thisInfinityTime / 10)
          ) {
            autoS = false;
            document.getElementById("bigcrunch").click();
          }
        } else {
          if (
            !player.break ||
            player.currentChallenge != "" ||
            gainedInfinityPoints().gte(
              player.lastTenRuns[0][1].times(player.autobuyers[11].priority)
            )
          ) {
            autoS = false;
            document.getElementById("bigcrunch").click();
          }
        }
        player.autobuyers[11].ticks = 1;
      }
    } else player.autobuyers[11].ticks += 1;
  }

  if (player.autobuyers[10] % 1 !== 0) {
    if (
      player.autobuyers[10].ticks * 100 >= player.autobuyers[10].interval &&
      (player.currentChallenge == "challenge4"
        ? player.sixthAmount >= getGalaxyRequirement()
        : player.eightAmount >= getGalaxyRequirement())
    ) {
      if (player.eternities < 9 || player.autobuyers[10].bulk == 0) {
        if (
          player.autobuyers[10].isOn &&
          player.autobuyers[10].priority > player.galaxies
        ) {
          autoS = false;
          document.getElementById("secondSoftReset").click();
          player.autobuyers[10].ticks = 1;
        }
      } else if (
        player.autobuyers[10].isOn &&
        Math.round(timer * 100) %
          Math.round(player.autobuyers[10].bulk * 100) ==
          0
      ) {
        maxBuyGalaxies();
      }
    } else player.autobuyers[10].ticks += 1;
  }

  if (player.autobuyers[9] % 1 !== 0) {
    if (player.autobuyers[9].isOn && dimBoolean()) {
      if (player.resets < 4) softReset(1);
      else if (player.eternities < 10) softReset(player.autobuyers[9].bulk);
      else if (
        Math.round(timer * 100) % Math.round(player.autobuyers[9].bulk * 100) ==
          0 &&
        player.eightAmount >= getShiftRequirement(0).amount
      )
        maxBuyDimBoosts();
      player.autobuyers[9].ticks = 0;
    }
    player.autobuyers[9].ticks += 1;
  }

  if (player.autoSacrifice % 1 !== 0) {
    if (
      calcSacrificeBoost().gte(player.autoSacrifice.priority) &&
      player.autoSacrifice.isOn
    ) {
      sacrifice(true);
    }
  }

  for (var i = 0; i < priority.length; i++) {
    if (
      priority[i].ticks * 100 >= priority[i].interval ||
      priority[i].interval == 100
    ) {
      if (priority[i].isOn && canBuyDimension(priority[i].tier)) {
        if (priority[i] == player.autobuyers[8]) {
          if (priority[i].target == 10) buyMaxTickSpeed();
          else buyTickSpeed();
        } else {
          if (priority[i].target > 10) {
            if (player.options.bulkOn)
              buyManyDimensionAutobuyer(
                priority[i].target - 10,
                priority[i].bulk
              );
            else buyManyDimensionAutobuyer(priority[i].target - 10, 1);
          } else {
            buyOneDimension(priority[i].target);
          }
        }
        priority[i].ticks = 0;
      }
    } else priority[i].ticks += 1;
  }
  updateCosts();
}

setInterval(
  function() {
    autoBuyerTick();
  },
  player.infinityUpgrades.includes("autoBuyerUpgrade") ? 50 : 100
);

//start scrolling
scrollNextMessage();

document.getElementById("challenge2").onclick = function() {
  startChallenge("challenge2", Number.MAX_VALUE);
};

document.getElementById("challenge3").onclick = function() {
  startChallenge("challenge3", Number.MAX_VALUE);
};

document.getElementById("challenge4").onclick = function() {
  startChallenge("challenge4", Number.MAX_VALUE);
};

document.getElementById("challenge5").onclick = function() {
  startChallenge("challenge5", Number.MAX_VALUE);
};

document.getElementById("challenge6").onclick = function() {
  startChallenge("challenge6", Number.MAX_VALUE);
};

document.getElementById("challenge7").onclick = function() {
  startChallenge("challenge7", Number.MAX_VALUE);
};

document.getElementById("challenge8").onclick = function() {
  startChallenge("challenge8", Number.MAX_VALUE);
};

document.getElementById("challenge9").onclick = function() {
  startChallenge("challenge9", Number.MAX_VALUE);
};

document.getElementById("challenge10").onclick = function() {
  startChallenge("challenge10", Number.MAX_VALUE);
};

document.getElementById("challenge11").onclick = function() {
  startChallenge("challenge11", Number.MAX_VALUE);
};

document.getElementById("challenge12").onclick = function() {
  startChallenge("challenge12", Number.MAX_VALUE);
};

function showInfTab(tabName) {
  //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
  var tabs = document.getElementsByClassName("inftab");
  var tab;
  for (var i = 0; i < tabs.length; i++) {
    tab = tabs.item(i);
    if (tab.id === tabName) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  }
}

function showStatsTab(tabName) {
  //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
  var tabs = document.getElementsByClassName("statstab");
  var tab;
  for (var i = 0; i < tabs.length; i++) {
    tab = tabs.item(i);
    if (tab.id === tabName) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  }
}

function showDimTab(tabName) {
  //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
  var tabs = document.getElementsByClassName("dimtab");
  var tab;
  for (var i = 0; i < tabs.length; i++) {
    tab = tabs.item(i);
    if (tab.id === tabName) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  }
  if (tabName === "metadimensions") {
    document.getElementById("progress").style.display = "none";
  } else {
    document.getElementById("progress").style.display = "block";
  }
}

function showChallengesTab(tabName) {
  //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
  var tabs = document.getElementsByClassName("challengeTab");
  var tab;
  for (var i = 0; i < tabs.length; i++) {
    tab = tabs.item(i);
    if (tab.id === tabName) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  }
}

function showEternityTab(tabName, init) {
  //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
  var tabs = document.getElementsByClassName("eternitytab");
  var tab;
  for (var i = 0; i < tabs.length; i++) {
    tab = tabs.item(i);
    if (tab.id === tabName) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  }
  if (tabName === "timestudies" && !init)
    document.getElementById("TTbuttons").style.display = "block";
  else document.getElementById("TTbuttons").style.display = "none";
  resizeCanvas();
}

function showAchTab(tabName) {
  //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
  var tabs = document.getElementsByClassName("achtab");
  var tab;
  for (var i = 0; i < tabs.length; i++) {
    tab = tabs.item(i);
    if (tab.id === tabName) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  }
}

function init() {
  //setup the onclick callbacks for the buttons
  document.getElementById("dimensionsbtn").onclick = function() {
    showTab("dimensions");
  };
  document.getElementById("optionsbtn").onclick = function() {
    showTab("options");
  };
  document.getElementById("statisticsbtn").onclick = function() {
    showTab("statistics");
  };
  document.getElementById("achievementsbtn").onclick = function() {
    showTab("achievements");
  };
  document.getElementById("challengesbtn").onclick = function() {
    showTab("challengesTab");
  };
  document.getElementById("infinitybtn").onclick = function() {
    showTab("infinity");
  };
  document.getElementById("quantumbtn").onclick = function() {
    showTab("quantum");
  };
  document.getElementById("eternitystorebtn").onclick = function() {
    showTab("eternitystore");
  };
  //show one tab during init or they'll all start hidden
  showTab("dimensions");
  showInfTab("preinf");
  showStatsTab("stats");
  showDimTab("antimatterdimensions");
  showChallengesTab("challenges");
  showEternityTab("timestudies", true);
  showQuantumTab("investment");
  load_game();
  updateTickSpeed();
  updateAutobuyers();
  updateChallengeTimes();
}

function closeToolTip() {
  var elements = document.getElementsByClassName("popup");
  for (var i = 0; i < elements.length; i++) elements[i].style.display = "none";
}

setInterval(function() {
  save_game();
}, 30000);

updateCosts();
//updateInterval();
updateDimensions();
document.getElementById("hiddenheader").style.display = "none";

(window.onload = function() {
  startInterval();
  document.getElementById("container").style.display = "block";
  document.getElementById("loading").style.display = "none";
}),
  1000;

window.addEventListener(
  "keydown",
  function(event) {
    if (keySequence == 0 && event.keyCode == 38) {
      keySequence++;
    } else if (keySequence == 1 && event.keyCode == 38) {
      keySequence++;
    } else if (keySequence == 2 && event.keyCode == 40) {
      keySequence++;
    } else if (keySequence == 3 && event.keyCode == 40) {
      keySequence++;
    } else if (keySequence == 4 && event.keyCode == 37) {
      keySequence++;
    } else if (keySequence == 5 && event.keyCode == 39) {
      keySequence++;
    } else if (keySequence == 6 && event.keyCode == 37) {
      keySequence++;
    } else if (keySequence == 7 && event.keyCode == 39) {
      keySequence++;
    } else if (keySequence == 8 && event.keyCode == 66) {
      keySequence++;
    } else if (keySequence == 9 && event.keyCode == 65) {
      giveAchievement("30 Lives");
    } else {
      keySequence = 0;
    }
    if (event.keyCode == 17) controlDown = true;
    if (event.keyCode == 16) {
      shiftDown = true;
      document.getElementById("studytreeloadsavetext").textContent = "Save:";
      drawStudyTree();
    }
    if (
      (controlDown &&
        shiftDown &&
        (event.keyCode == 67 || event.keyCode == 73 || event.keyCode == 74)) ||
      event.keyCode == 123
    ) {
      giveAchievement("Stop right there criminal scum!");
    }
  },
  false
);

window.addEventListener(
  "keyup",
  function(event) {
    if (event.keyCode == 17) controlDown = false;
    if (event.keyCode == 16) {
      shiftDown = false;
      document.getElementById("studytreeloadsavetext").textContent = "Load:";
      drawStudyTree();
    }
  },
  false
);

window.onfocus = function() {
  controlDown = false;
  shiftDown = false;
  document.getElementById("studytreeloadsavetext").textContent = "Load:";
  drawStudyTree();
};

window.addEventListener("keydown", function(event) {
  if (
    !player.options.hotkeys ||
    controlDown ||
    document.activeElement.type === "text"
  )
    return false;
});

Mousetrap.bind("1", function() {
  if (shiftDown) buyOneDimension(1);
  else buyManyDimension(1);
});
Mousetrap.bind("2", function() {
  if (shiftDown) buyOneDimension(2);
  else buyManyDimension(2);
});
Mousetrap.bind("3", function() {
  if (shiftDown) buyOneDimension(3);
  else buyManyDimension(3);
});
Mousetrap.bind("4", function() {
  if (shiftDown) buyOneDimension(4);
  else buyManyDimension(4);
});
Mousetrap.bind("5", function() {
  if (shiftDown) buyOneDimension(5);
  else buyManyDimension(5);
});
Mousetrap.bind("6", function() {
  if (shiftDown) buyOneDimension(6);
  else buyManyDimension(6);
});
Mousetrap.bind("7", function() {
  if (shiftDown) buyOneDimension(7);
  else buyManyDimension(7);
});
Mousetrap.bind("8", function() {
  if (shiftDown) buyOneDimension(8);
  else buyManyDimension(8);
});
Mousetrap.bind("a", function() {
  toggleAutoBuyers();
});
Mousetrap.bind("d", function() {
  document.getElementById("softReset").onclick();
});
Mousetrap.bind("g", function() {
  document.getElementById("secondSoftReset").onclick();
});
Mousetrap.bind("m", function() {
  if (player.dilation.studies.includes(6))
    document.getElementById("metaMaxAll").onclick();
  else document.getElementById("maxall").onclick();
});
Mousetrap.bind("s", function() {
  document.getElementById("sacrifice").onclick();
});
Mousetrap.bind("t", function() {
  buyMaxTickSpeed();
});
Mousetrap.bind("shift+t", function() {
  buyTickSpeed();
});
Mousetrap.bind("r", function() {
  replicantiGalaxy();
});
Mousetrap.bind("c", function() {
  document.getElementById("bigcrunch").onclick();
});
Mousetrap.bind("e", function() {
  document.getElementById("eternitybtn").onclick();
});
Mousetrap.bind(
  "f",
  function() {
    $.notify("Paying respects", "info");
    giveAchievement("It pays to have respect");
  },
  "keyup"
);

init();
var totalMult = 1;
var currentMult = 1;
var infinitiedMult = 1;
var achievementMult = 1;
var challengeMult = 1;
var unspentBonus = 1;
var postc8Mult = new Decimal(0);
var ec10bonus = new Decimal(1);
setInterval(function() {
  setAchieveTooltip();
  totalMult = Math.pow(player.totalmoney.e + 1, 0.5);
  currentMult = Math.pow(player.money.e + 1, 0.5);
  if (player.timestudy.studies.includes(31))
    infinitiedMult = 1 + Math.pow(Math.log10(getInfinitied() + 1) * 10, 4);
  else infinitiedMult = 1 + Math.log10(getInfinitied() + 1) * 10;
  achievementMult = Math.max(
    Math.pow(player.achievements.length - 30 - getSecretAchAmount(), 3) / 40,
    1
  );
  challengeMult = Decimal.max(1000000 / worstChallengeTime, 1);
  unspentBonus = player.infinityPoints
    .dividedBy(2)
    .pow(1.5)
    .plus(1);
  mult18 = getDimensionFinalMultiplier(1)
    .times(getDimensionFinalMultiplier(8))
    .pow(0.02);
  if (player.currentEternityChall == "eterc10") {
    ec10bonus = Decimal.pow(getInfinitied(), 1000).max(1);
    if (player.timestudy.studies.includes(31)) ec10bonus = ec10bonus.pow(4);
  } else {
    ec10bonus = new Decimal(1);
  }
}, 100);
setTimeout(drawAnimations, 100);
setTimeout(onLoad, 100);
showQuantumTab;
