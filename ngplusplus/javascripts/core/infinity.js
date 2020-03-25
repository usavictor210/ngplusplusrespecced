function getInfinitiedGain() {
  let infGain = new Decimal(1);
  if (player.thisInfinityTime > 50 && player.achievements.includes("r87")) {
    infGain = new Decimal(250);
  }
  let TS32 = Math.max(player.resets, 1);
  if (player.timestudy.studies.includes(271))
    TS32 = TS32 * (1e3 * (player.meta.resets + 1));
  player.timestudy.studies.includes(32) ? infGain.times(TS32) : infGain;
  player.achievements.includes("r133")
    ? infGain.times(
        Math.max(
          1,
          Math.floor(player.dilation.dilatedTime.pow(0.25).toNumber())
        )
      )
    : (infGain = infGain);
  player.achievements.includes("r156")
    ? infGain.times(
        Decimal.max(1, Decimal.floor(Decimal.log(player.eternities / 250), 10).pow(0.8))
      )
    : (infGain = infGain);
  return infGain;
}

function getAntimatterOnReset() {
  let tier = 0;
  let antimatter = [10, 100, 1000, 2e5, 1e10, 1e25];
  if (player.challenges.includes("challenge1")) tier = 1;
  if (player.achievements.includes("r37")) tier = 2;
  if (player.achievements.includes("r54")) tier = 3;
  if (player.achievements.includes("r55")) tier = 4;
  if (player.achievements.includes("r78")) tier = 5;
  return new Decimal(antimatter[tier]);
}

function gainedInfinityPoints() {
  let div = 308;
  if (player.timestudy.studies.includes(111)) div = 285;
  else if (player.achievements.includes("r103")) div = 307.8;

  var ret = Decimal.pow(10, player.money.e / div - 0.75).times(player.infMult);
  if (player.timestudy.studies.includes(41))
    ret = ret.times(
      Decimal.pow(1.2, player.galaxies + player.replicanti.galaxies)
    );
  if (player.timestudy.studies.includes(51)) ret = ret.times(1e15);
  if (player.timestudy.studies.includes(141))
    ret = ret.times(
      new Decimal(1e45)
        .dividedBy(
          Decimal.pow(
            15,
            Math.log(player.thisInfinityTime + 1) *
              Math.pow(player.thisInfinityTime + 1, 0.125)
          )
        )
        .max(1)
    );
  if (player.timestudy.studies.includes(142)) ret = ret.times(1e25);
  if (player.timestudy.studies.includes(143))
    ret = ret.times(
      Decimal.pow(
        15,
        Math.log(player.thisInfinityTime + 1) *
          Math.pow(player.thisInfinityTime + 1, 0.125)
      )
    );
  if (player.achievements.includes("r116"))
    ret = ret.times(Decimal.pow(2, Math.log10(getInfinitied() + 1)));
  if (player.achievements.includes("r125"))
    ret = ret.times(
      Decimal.pow(
        2,
        Math.log(player.thisInfinityTime + 1) *
          Math.pow(player.thisInfinityTime + 1, 0.11)
      )
    );
  if (player.dilation.upgrades.includes(9))
    ret = ret.times(player.dilation.dilatedTime.pow(1000));
  return ret.floor();
}

function updateBigCrunchButton() {
  if (
    player.break &&
    player.money.gte(Number.MAX_VALUE) &&
    player.currentChallenge == ""
  ) {
    document.getElementById("postInfinityButton").style.display =
      "inline-block";
  } else {
    document.getElementById("postInfinityButton").style.display = "none";
  }

  if (player.break) document.getElementById("iplimit").style.display = "inline";
  else document.getElementById("iplimit").style.display = "none";

  var currentIPmin = gainedInfinityPoints().dividedBy(
    player.thisInfinityTime / 600
  );
  if (currentIPmin.gt(IPminpeak)) IPminpeak = currentIPmin;

  if (IPminpeak.lte("1e100000"))
    document.getElementById("postInfinityButton").innerHTML =
      "<b>Big Crunch for " +
      shortenDimensions(gainedInfinityPoints()) +
      " Infinity Points.</b><br>" +
      shortenDimensions(currentIPmin) +
      " IP/min" +
      "<br>Peaked at " +
      shortenDimensions(IPminpeak) +
      " IP/min";
  else
    document.getElementById("postInfinityButton").innerHTML = // add infinities gained on big crunch like in NG^^
      "<b>Gain " +
      shortenDimensions(gainedInfinityPoints()) +
      " Infinity Points.</b>" +
      "<br>+" +
      shortenDimensions(getInfinitiedGain()) +
      " infinities";
}

function infinity() {
  var challNumber = parseInt(
    player.currentChallenge[player.currentChallenge.length - 1]
  );
  if (player.currentChallenge.length == 11)
    challNumber = parseInt(
      "1" + player.currentChallenge[player.currentChallenge.length - 1]
    );
  if (
    (player.money.gte(Number.MAX_VALUE) &&
      !player.currentChallenge.includes("post")) ||
    (player.currentChallenge !== "" && player.money.gte(player.challengeTarget))
  ) {
    if (
      player.bestInfinityTime > 600 &&
      !player.break &&
      player.eternities === 0 &&
      implosionCheck === 0 &&
      player.options.animations.bigCrunch
    ) {
      implosionCheck = 1;
      document.getElementById("body").style.animation = "implode 2s 1";
      setTimeout(function() {
        document.getElementById("body").style.animation = "";
      }, 2000);
      setTimeout(function() {
        document.getElementById("bigcrunch").onclick();
      }, 1000);
      return;
    }
    implosionCheck = 0;
    if (player.thisInfinityTime <= 72000) giveAchievement("That's fast!");
    if (player.thisInfinityTime <= 6000) giveAchievement("That's faster!");
    if (player.thisInfinityTime <= 600)
      giveAchievement("Forever isn't that long");
    if (player.thisInfinityTime <= 2) giveAchievement("Blink of an eye");
    if (player.eightAmount == 0) giveAchievement("You didn't need it anyway");
    if (player.galaxies == 1) giveAchievement("Claustrophobic");
    if (player.galaxies == 0 && player.resets == 0)
      giveAchievement("Zero Deaths");
    if (
      player.currentChallenge == "challenge2" &&
      player.thisInfinityTime <= 1800
    )
      giveAchievement("Many Deaths");
    if (
      player.currentChallenge == "challenge11" &&
      player.thisInfinityTime <= 1800
    )
      giveAchievement("Gift from the Gods");
    if (
      player.currentChallenge == "challenge5" &&
      player.thisInfinityTime <= 1800
    )
      giveAchievement("Is this hell?");
    if (
      player.currentChallenge == "challenge3" &&
      player.thisInfinityTime <= 100
    )
      giveAchievement("You did this again just for the achievement right?");
    if (
      player.firstAmount == 1 &&
      player.resets == 0 &&
      player.galaxies == 0 &&
      player.currentChallenge == "challenge12"
    )
      giveAchievement("ERROR 909: Dimension not found");
    if (
      player.currentChallenge != "" &&
      player.challengeTimes[challNumber - 2] > player.thisInfinityTime
    )
      player.challengeTimes[challNumber - 2] = player.thisInfinityTime;
    if (
      player.currentChallenge.includes("post") &&
      player.infchallengeTimes[challNumber - 1] > player.thisInfinityTime
    )
      player.infchallengeTimes[challNumber - 1] = player.thisInfinityTime;
    if (player.currentChallenge == "postc5" && player.thisInfinityTime <= 100)
      giveAchievement("Hevipelle did nothing wrong");
    if (
      (player.bestInfinityTime > 600 && !player.break) ||
      (player.currentChallenge != "" && !player.options.retryChallenge)
    )
      showTab("dimensions");
    if (
      player.currentChallenge != "" &&
      !player.challenges.includes(player.currentChallenge)
    ) {
      player.challenges.push(player.currentChallenge);
    }
    if (player.challenges.length > 12)
      giveAchievement("Infinitely Challenging");
    if (player.challenges.length == 20) giveAchievement("Anti-antichallenged");
    if (!player.break || player.currentChallenge != "") {
      var add = new Decimal(player.infMult);
      if (player.timestudy.studies.includes(51)) add = add.times(1e15);
      player.infinityPoints = player.infinityPoints.plus(add);
      addTime(player.thisInfinityTime, add);
    } else {
      player.infinityPoints = player.infinityPoints.plus(
        gainedInfinityPoints()
      );
      addTime(player.thisInfinityTime, gainedInfinityPoints());
      if (gainedInfinityPoints().gte(1e150))
        giveAchievement("All your IP are belong to us");
      if (gainedInfinityPoints().gte(1e200) && player.thisInfinityTime <= 20)
        giveAchievement("Ludicrous Speed");
      if (gainedInfinityPoints().gte(1e250) && player.thisInfinityTime <= 200)
        giveAchievement("I brake for nobody");
    }
    if (
      !player.achievements.includes("r111") &&
      player.lastTenRuns[9][1] != 1
    ) {
      var n = 0;
      for (i = 0; i < 9; i++) {
        if (
          player.lastTenRuns[i][1].gte(
            player.lastTenRuns[i + 1][1].times(Number.MAX_VALUE)
          )
        )
          n++;
      }
      if (n == 9) giveAchievement("Yo dawg, I heard you liked infinities...");
    }

    let infGain;

    if (player.currentEternityChall == "eterc4") {
      infGain = 1;
      if (player.infinitied.gte(16 - ECTimesCompleted("eterc4") * 4)) {
        document.getElementById("challfail").style.display = "block";
        setTimeout(exitChallenge, 500);
        giveAchievement("You're a mistake");
        failureCount++;
        if (failureCount > 9) giveAchievement("You're a failure");
      }
    } else infGain = getInfinitiedGain();

    if (autoS && auto) {
      if (
        gainedInfinityPoints()
          .dividedBy(player.thisInfinityTime)
          .gt(player.autoIP) &&
        !player.break
      )
        player.autoIP = gainedInfinityPoints().dividedBy(
          player.thisInfinityTime
        );
      if (player.thisInfinityTime < player.autoTime)
        player.autoTime = player.thisInfinityTime;
    }
    auto = autoS; //only allow autoing if prev crunch was autoed
    autoS = true;
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
      currentChallenge: player.currentChallenge,
      infinityUpgrades: player.infinityUpgrades,
      infinityPoints: player.infinityPoints,
      infinitied: player.infinitied.add(getInfinitiedGain()),
      infinitiedBank: player.infinitiedBank,
      totalTimePlayed: player.totalTimePlayed,
      bestInfinityTime: Math.min(
        player.bestInfinityTime,
        player.thisInfinityTime
      ),
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
      newsArray: player.newsArray,
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

    if (player.bestInfinityTime <= 0.01)
      giveAchievement("Less than or equal to 0.001");

    if (!player.options.retryChallenge) player.currentChallenge = "";

    if (player.resets == 0 && player.currentChallenge == "") {
      if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
      if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
      if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
      if (player.infinityUpgrades.includes("skipResetGalaxy")) {
        player.resets++;
        if (player.galaxies == 0) player.galaxies = 1;
      }
    }

    if (player.replicanti.unl && !player.achievements.includes("r95"))
      player.replicanti.amount = new Decimal(1);

    player.replicanti.galaxies = player.timestudy.studies.includes(33)
      ? Math.floor(player.replicanti.galaxies / 2)
      : 0;

    setInitialDimensionPower();

    if (
      player.currentChallenge == "challenge12" ||
      player.currentChallenge == "postc1" ||
      player.currentChallenge == "postc6"
    )
      document.getElementById("matter").style.display = "block";
    else document.getElementById("matter").style.display = "none";

    RGDisplayAmount();

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
      document.getElementById("fifthRow").style.display = "none";
      document.getElementById("sixthRow").style.display = "none";
      document.getElementById("seventhRow").style.display = "none";
      document.getElementById("eightRow").style.display = "none";
    }
    document.getElementById("matter").style.display = "none";
    document.getElementById("quickReset").style.display = "none";

    checkChallengeAchievements();

    giveAchievement("To infinity!");
    if (player.infinitied.gt(10)) giveAchievement("That's a lot of infinites");
    if (player.infinitied.gt(1) && !player.challenges.includes("challenge1"))
      player.challenges.push("challenge1");

    updateAutobuyers();
    player.money = getAntimatterOnReset();
    if (player.challenges.length >= 2) giveAchievement("Daredevil");
    if (player.challenges.length >= 12 && player.challenges.includes("postc1"))
      giveAchievement("AntiChallenged");
    resetInfDimensions();
    player.tickspeed = player.tickspeed.times(
      Decimal.pow(getTickSpeedMultiplier(), player.totalTickGained)
    );
    updateTickSpeed();
    if (player.challenges.length == 20) giveAchievement("Anti-antichallenged");
    IPminpeak = new Decimal(0);

    if (
      player.eternities.gt(10) &&
      player.currentEternityChall !== "eterc8" &&
      player.currentEternityChall !== "eterc2" &&
      player.currentEternityChall !== "eterc10"
    ) {
      for (var i = 1; i < player.eternities - 9 && i < 9; i++) {
        if (player.infDimBuyers[i - 1]) {
          buyMaxInfDims(i);
          buyManyInfinityDimension(i);
        }
      }
    }

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
      milestoneCheck(21) &&
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
      milestoneCheck(22) &&
      player.replicanti.auto[2] &&
      player.currentEternityChall !== "eterc8"
    ) {
      while (player.infinityPoints.gte(player.replicanti.galCost))
        upgradeReplicantiGalaxy();
    }

    Marathon2 = 0;
  }
  updateChallenges();
  updateChallengeTimes();
  updateLastTenRuns();
}

function getReplMult() {
  var replmult = Decimal.pow(
    Decimal.log2(Decimal.max(player.replicanti.amount, 1)),
    2
  );
  if (player.timestudy.studies.includes(21))
    replmult = replmult.plus(Decimal.pow(player.replicanti.amount, 0.032));
  if (player.timestudy.studies.includes(102))
    replmult = replmult.times(Decimal.pow(5, player.replicanti.galaxies, 150));
  if (player.achievements.includes("r108")) replmult = replmult.pow(1.09);
  if (player.quantum.investmentAmount[3].gt(0))
    replmult = replmult.pow(getInvestMultiplier(3));
  if (replmult.lt(1) || isNaN(replmult)) replmult = new Decimal(1);
  return replmult;
}

function r72Check() {
  var r72 = 0;
  for (let i = 1; i < 9; i++) {
    if (getDimensionFinalMultiplier(i).gte(1e308)) r72++;
  }
  if (r72 == 8) giveAchievement("Can't hold all these infinities");
  return r72;
}

function antitablesCheck() {
  var antitables = 0;
  for (let i = 0; i < 8; i++) {
    if (getDimensionFinalMultiplier(i + 1).lt(getDimensionFinalMultiplier(i)))
      antitables++;
  }
  if (antitables == 8) giveAchievement("How the antitables have turned");
  return antitables;
}

function updateInfMult() {
  document.getElementById("infiMult").innerHTML =
    "You gain " +
    getInfMult() +
    "x more IP.<br>Currently: " +
    shorten(player.infMult) +
    "x<br>Cost: " +
    shortenCosts(player.infMultCost) +
    " IP";
}

function getInfMult() {
  var infMult = 2;
  if (player.timestudy.studies.includes(272)) infMult = 2.2;
  return infMult;
}

function resetInfMult() {
  player.infMult = new Decimal(1);
  if (player.achievements.includes("r85"))
    player.infMult = player.infMult.times(4);
  if (player.achievements.includes("r93"))
    player.infMult = player.infMult.times(4);
  player.infMultCost = new Decimal(10);
}
