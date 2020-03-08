function quantum(force, auto) {
  if (
    (player.meta.antimatter.gte(quantRequirement()) && player.dilation.dilatedTime.gte(1e100) &&
      (!player.options.quantumconfirm ||
        auto ||
        confirm(
          "Quantum will reset everything eternity resets, including dilation, and meta-dimensions, in exchange for a quark and unlock various upgrades. Are you sure you want to do this?"
        ))) ||
    force === true
  ) {
    player.quantum.quarks = player.quantum.quarks.plus(quarkGain());
    player.quantum.gluons = 0;
    if (player.thisQuantum < player.bestQuantum && !force) {
    player.bestQuantum = player.thisQuantum;
    }
    player.thisQuantum = 0
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
      currentChallenge: "",
      infinityUpgrades: player.infinityUpgrades,
      infinityPoints: new Decimal(0),
      infinitied: 0,
      infinitiedBank: player.infinitiedBank,
      totalTimePlayed: player.totalTimePlayed,
      bestInfinityTime: 9999999999,
      thisInfinityTime: 0,
      resets: 4,
      galaxies: 1,
      tickDecrease: 0.9,
      totalmoney: player.totalmoney,
      interval: null,
      lastUpdate: player.lastUpdate,
      achPow: player.achPow,
      autobuyers: player.autobuyers,
      partInfinityPoint: 0,
      partInfinitied: 0,
      break: player.break,
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
      newsArray: player.newsArray,
      matter: new Decimal(0),
      chall11Pow: new Decimal(1),
      challengeTimes: player.challengeTimes,
      infchallengeTimes: player.infchallengeTimes,
      lastTenRuns: [
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)]
      ],
      lastTenEternities: [
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)],
        [600 * 60 * 24 * 31, new Decimal(1)]
      ],
      infMult: new Decimal(1),
      infMultCost: new Decimal(10),
      tickSpeedMultDecrease: player.tickSpeedMultDecrease,
      tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
      dimensionMultDecrease: player.dimensionMultDecrease,
      dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
      version: player.version,
      postChallUnlocked: player.achievements.includes("r133") ? 8 : 0,
      postC4Tier: 1,
      postC3Reward: new Decimal(1),
      overXGalaxies: player.overXGalaxies,
      spreadingCancer: player.spreadingCancer,
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
      infDimBuyers: player.infDimBuyers,
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
      eternityPoints: new Decimal(0),
      eternities: 1012680,
      thisEternity: 0,
      bestEternity: 9999999999,
      eternityUpgrades: [],
      epmult: new Decimal(1),
      epmultCost: new Decimal(500),
      offlineProd: player.offlineProd,
      offlineProdCost: player.offlineProdCost,
      challengeTarget: 0,
      autoSacrifice: player.autoSacrifice,
      replicanti: {
        amount: new Decimal(1),
        unl: true,
        chance: 0.01,
        chanceCost: new Decimal(1e150),
        interval: 1000,
        intervalCost: new Decimal(1e140),
        gal: 0,
        galaxies: 0,
        galCost: new Decimal(1e170),
        galaxybuyer: player.replicanti.galaxybuyer,
        auto: player.replicanti.auto,
        bulkmode: player.replicanti.bulkmode
      },
      timeDimensionAutobuyer: player.timeDimensionAutobuyer,
      ep5xAutobuyer: player.ep5xAutobuyer,
      timestudy: {
        theorem: 0,
        amcost: new Decimal("1e20000"),
        ipcost: new Decimal(1),
        epcost: new Decimal(1),
        studies: []
      },
      eternityChalls: {
        eterc1: 5,
        eterc2: 5,
        eterc3: 5,
        eterc4: 0,
        eterc5: 0,
        eterc6: 0,
        eterc7: 0,
        eterc8: 0,
        eterc9: 0,
        eterc10: 0,
        eterc11: 0,
        eterc12: 0
      },
      eternityChallGoal: new Decimal(Number.MAX_VALUE),
      currentEternityChall: "",
      eternityChallUnlocked: 0,
      etercreq: 0,
      autoIP: new Decimal(0),
      autoTime: 1e300,
      infMultBuyer: player.infMultBuyer,
      autoCrunchMode: player.autoCrunchMode,
      autoEterMode: player.autoEterMode,
      respec: false,
      eternityBuyer: player.eternityBuyer,
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
          upgrades: []
        },
        timeRift: {
          temporalPower: new Decimal(0),
          seconds: 0,
          upgrades: []
        },
        autobuy: player.dilation.autobuy
      },
      meta: {
        antimatter: new Decimal(10),
        bestAntimatter: new Decimal(10),
        resets: 0,
        galaxy: 0,
        autoMaxAll: player.autoMaxAll,
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
        }
      },
      quantum: player.quantum,
      why: player.why,
      options: player.options
    };
    if (player.replicanti.unl) player.replicanti.amount = new Decimal(1);
    player.replicanti.galaxies = 0;
    document.getElementById("respec").className = "storebtn";
    if (player.achievements.includes("r36"))
      player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45"))
      player.tickspeed = player.tickspeed.times(0.98);
    document.getElementById("matter").style.display = "none";
    document.getElementById("quickReset").style.display = "none";
    if (player.infinitied >= 1 && !player.challenges.includes("challenge1"))
      player.challenges.push("challenge1");
    updateAutobuyers();
    player.money = getAntimatterOnReset()
    if (player.achievements.includes("r85"))
      player.infMult = player.infMult.times(4);
    if (player.achievements.includes("r93"))
      player.infMult = player.infMult.times(4);
    if (player.achievements.includes("r104"))
      player.infinityPoints = new Decimal(2e25);
    if (player.achievements.includes("r142") && !player.achievements.includes("r152")) {
      player.meta.antimatter = new Decimal(100);
  } else if (player.achievements.includes("r152")) {
    player.meta.antimatter = new Decimal (1000)
  }
    
    resetInfDimensions();
    updateChallenges();
    updateChallengeTimes();
    updateLastTenRuns();
    updateLastTenEternities();
    if (!player.achievements.includes("r133")) {
      var infchalls = Array.from(
        document.getElementsByClassName("infchallengediv")
      );
      for (var i = 0; i < infchalls.length; i++)
        infchalls[i].style.display = "none";
    }
    IPminpeak = new Decimal(0);
    EPminpeak = new Decimal(0);
    dor147Stuff();
    updateMilestones();
    resetTimeDimensions();
    if (document.getElementById("replicantidiv").style.display === "none") {
      document.getElementById("replicantidiv").style.display = "inline-block";
      document.getElementById("replicantiunlock").style.display = "none";
    }
    if (player.eternities > 2 && player.replicanti.galaxybuyer === undefined)
      player.replicanti.galaxybuyer = false;
    document.getElementById("infinityPoints1").innerHTML =
      'You have <span class="IPAmount1">' +
      shortenDimensions(player.infinityPoints) +
      "</span> Infinity points.";
    document.getElementById("infinityPoints2").innerHTML =
      'You have <span class="IPAmount2">' +
      shortenDimensions(player.infinityPoints) +
      "</span> Infinity points.";
    if (player.eternities < 2)
      document.getElementById("break").textContent = "BREAK INFINITY";
    document.getElementById("replicantireset").innerHTML =
      "Reset replicanti amount for a free galaxy.<br>" +
      player.replicanti.galaxies +
      " replicated galaxies created.";
    document.getElementById(
      "eternitybtn"
    ).style.display = player.infinityPoints.gte(player.eternityChallGoal)
      ? "inline-block"
      : "none";
    document.getElementById("eternityPoints2").style.display = "inline-block";
    document.getElementById("eternitystorebtn").style.display = "inline-block";
    document.getElementById("infiMult").innerHTML =
      "Multiply infinity points from all sources by 2 <br>currently: " +
      shorten(player.infMult) +
      "x<br>Cost: " +
      shortenCosts(player.infMultCost) +
      " IP";
    updateEternityUpgrades();
    document.getElementById("totaltickgained").textContent =
      "You've gained " +
      player.totalTickGained.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      " tickspeed upgrades.";
    updateTickSpeed();
    playerInfinityUpgradesOnEternity();
    document.getElementById("eternityPoints2").innerHTML =
      'You have <span class="EPAmount2">' +
      shortenDimensions(player.eternityPoints) +
      "</span> Eternity point" +
      (player.eternityPoints.eq(1) ? "." : "s.");
    if (player.lastTenQuantums === undefined) {
    player.lastTenQuantums = [
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
    ];
  }
    updateEternityChallenges();
    updateTheoremButtons();
    updateTimeStudyButtons();
    drawStudyTree();
    //updateLastTenQuantums(); this is too buggy right now, either we could pull a NG^^ or actually fix it
    Marathon2 = 0;
    player.quantum.times++;
    document.getElementById("mdtabbtn").style.display = "none";
    showDimTab('antimatterdimensions')
    giveAchievement("Sub-atomic");
  }
}

let quarkGain = function() {
  return Decimal.pow(
    10,
    player.meta.antimatter.log(10) / Decimal.log10(quantRequirement()) - 1
  )
    .times(quarkMult())
    .floor();
};

let quarkMult = function() {
  let ret = Decimal.pow(2, player.quantum.rebuyables[2]); // how many times you bought rebuyable 2 will increase quarks.
  if (player.quantum.upgrades.includes(4)) {
    ret = ret.times(Decimal.pow(2, player.quantum.realGluons / 1024)); // quantum upgrade 4
  }
  return ret;
};

let quantRequirement = function() {
  return new Decimal(Number.MAX_VALUE); // 1.79e308 - this can be changed to different values in outer challenges.
};

function toggleDilationConf() {
  if (player.options.dilationconfirm) {
    player.options.dilationconfirm = false;
    document.getElementById("dilationconf").textContent =
      "Dilation confirmation: OFF";
  } else {
    player.options.dilationconfirm = true;
    document.getElementById("dilationconf").textContent =
      "Dilation confirmation: ON";
  }
}

function toggleQuantumConf() {
  if (player.options.quantumconfirm) {
    player.options.quantumconfirm = false;
    document.getElementById("quantumconf").textContent =
      "Quantum confirmation: OFF";
  } else {
    player.options.quantumconfirm = true;
    document.getElementById("quantumconf").textContent =
      "Quantum confirmation: ON";
  }
}

function updateQuantum() {
  let plural = player.quantum.times != 1 ? "s" : "";
  if (player.quantum.times != 0) {
    document.getElementById("pastquantums").style.display = "inline-block";
    document.getElementById("quantumbtn").style.display = "inline-block";
    document.getElementById("quantumed").textContent =
      "You have gone quantum " + player.quantum.times + " time" + plural + ".";
    document.getElementById("thisquantum").textContent =
      "You have spent " + timeDisplay(player.quantum.thisQuantum) + " in this Quantum.";
    document.getElementById("bestquantum").textContent =
      "Your fastest Quantum is in " + timeDisplay(player.quantum.bestQuantum) + ".";
  } else { document.getElementById("quantumbtn").style.display = "none";
  document.getElementById("quantumed").textContent = "";
  document.getElementById("thisquantum").textContent = "";
  document.getElementById("bestquantum").textContent = "";
  document.getElementById("pastquantums").style.display = "none";
}
  let plural2 = player.quantum.quarks != 1 ? "s" : "";
  var x = new Decimal(0)
  for (i=1; i<6; i++) {
  x = x.add(player.quantum.investmentAmount[i])
  }
  let plural3 = x.notEquals(1) ? "s" : ""
  document.getElementById("quarkAmount").textContent = `You have ${shortenDimensions(player.quantum.quarks)} quark` + plural2 + `.`
  document.getElementById("unstableShardAmount").textContent = player.dilation.unstable.shards
  //document.getElementById("totalInvest").textContent = `You have invested a total of ${shortenDimensions(getTotalInvestmentAmount())} quark` + plural3 + `.`
  document.getElementById("dilationseverity").textContent = "Dilation's penalty on all dimensions is x^" + getDilPunish().toFixed(3) + "."
}

function updateLastTenQuantums() {
  let tempBest = 0;
  var averageQK = new Decimal(0);
  var tempTime = new Decimal(0);
  var tempQK = new Decimal(0);
  for (var i = 0; i < 10; i++) {
    tempTime = tempTime.plus(player.quantum.lastTenQuantums[i][0]);
    tempQK = tempQK.plus(player.quantum.lastTenQuantums[i][1]);
  }
  tempTime = tempTime.dividedBy(10);
  tempQK = tempQK.dividedBy(10);
  for (var i = 0; i < 10; i++) {
    var qkpm = player.quantum.lastTenQuantums[i][1].dividedBy(
      player.quantum.lastTenQuantums[i][0] / 600
    );
    var plural = s
    if (qkpm.gt(tempBest)) tempBest = qkpm;
    var tempstring = shorten(qkpm) + " QK/min";
    if (qkpm < 1) tempstring = shorten(qkpm * 60) + " QK/hour";
    document.getElementById("quantumrun" + (i + 1)).textContent =
      "The Quantum " +
      (i + 1) +
      " quantum" + plural + " ago took " +
      timeDisplayShort(player.lastTenQuantums[i][0]) +
      " and gave " +
      shortenDimensions(player.lastTenQuantums[i][1]) +
      " QK. " +
      tempstring;
  }

  var qkpm = tempQK.dividedBy(tempTime / 600);
  var tempstring = shorten(qkpm) + " QK/min";
  averageQK = tempQK;
  if (qkpm < 1) tempstring = shorten(qkpm * 60) + " QK/hour";
  document.getElementById("averageEternityRun").textContent =
    "Last 10 quantums average time: " +
    timeDisplayShort(tempTime) +
    " Average QK gain: " +
    shortenDimensions(tempQK) +
    " QK. " +
    tempstring;
}

function investQuarks(feature, amount) {
if (feature != 0 && feature < 6 && player.quantum.quarks >= amount && !player.quantum.quarks < amount && amount != 0 && !amount < 1 && !isNaN(amount)) { // i screwed up on the array, it appears there is array value number 0 and it looks weird.
player.quantum.investmentAmount[feature] = Decimal.add(player.quantum.investmentAmount[feature], amount)
player.quantum.quarks = player.quantum.quarks.sub(amount)
  }
}


function getTotalInvestmentAmount() { // gets a value from all values of the array and adds it into a decimal
  let ret = new Decimal(0)
  for (let feature of Object.values(player.quantum.investmentAmount)) { // currently breaks because null
  Decimal.add(ret, feature) //add to decimal
  return ret
  }
}
function getInvestMultiplier(x) { // you have to decide a formula for each feature.
if (x == 1) { // time studies; this will probably multiply the softcaps.
  return new Decimal(player.quantum.investmentAmount[1]).pow(2.5)
  }
if (x == 2) { // time dimensions
  return new Decimal(player.quantum.investmentAmount[2]).pow(100)
  }
if (x == 3) { // replicantis
  return new Decimal(player.quantum.investmentAmount[3]).pow(1.0025)
  }
if (x == 4) { // meta dimensions
  return new Decimal(player.quantum.investmentAmount[4]).times(4)
  }
if (x == 5) { // time dilation
  return new Decimal(player.quantum.investmentAmount[5]).times(1.25)
  }
}

function showQuantumTab(tabName, init) {
  //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName - "showEternityTab, 2018"
  var tabs = document.getElementsByClassName("quantumtab");
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