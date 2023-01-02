function eternity(force, auto) {
  if (
    (player.infinityPoints.gte(Number.MAX_VALUE) &&
      (!player.options.eternityconfirm ||
        auto ||
        confirm(
          "Eternity will reset all content up to and including Infinity, except for your achievements and challenge records. You will gain Eternity points, and unlock various upgrades. Are you sure you want to do this?"
        ))) ||
    force
  ) {
    if (force) player.currentEternityChall = "";
    if (
      player.currentEternityChall !== "" &&
      player.infinityPoints.lt(player.eternityChallGoal)
    )
      return false;
    if (player.thisEternity < player.bestEternity && !force) {
      player.bestEternity = player.thisEternity;
      if (player.bestEternity < 300) giveAchievement("That wasn't an eternity");
      if (player.bestEternity <= 0.01)
        giveAchievement("Less than or equal to 0.001");
    }
    if (player.thisEternity < 2)
      giveAchievement("Eternities are the new infinity");
    player.dimensionMultDecrease = parseFloat(eterChallReward(6));
    player.tickspeedMultDecrease = parseFloat(eterChallReward(11));
    if (player.infinitied.lte(10) && !force)
      giveAchievement("Do you really need a guide for this?");
    if (Decimal.round(player.replicanti.amount) == 9)
      giveAchievement("We could afford 9");
    if (player.dimlife && !force) giveAchievement("8 nobody got time for that");
    if (player.dead && !force) giveAchievement("You're already dead.");
    if (player.infinitied.lte(1) && !force)
      giveAchievement("Do I really need to infinity");
    if (
      gainedEternityPoints().gte("1e600") &&
      player.thisEternity <= 600 &&
      player.dilation.active &&
      !force
    )
      giveAchievement("Now you're thinking with dilation!");
    temp = [];
    player.eternityPoints = player.eternityPoints.plus(gainedEternityPoints());
    addEternityTime(player.thisEternity, gainedEternityPoints());
    if (player.currentEternityChall !== "") {
      if (player.eternityChalls[player.currentEternityChall] === undefined) {
        player.eternityChalls[player.currentEternityChall] = 1;
      } else if (player.eternityChalls[player.currentEternityChall] < 5)
        player.eternityChalls[player.currentEternityChall] += 1;
      player.etercreq = 0;
      respecTimeStudies();
      if (Object.keys(player.eternityChalls).length >= 10) {
        var eterchallscompletedtotal = 0;
        for (i = 1; i < Object.keys(player.eternityChalls).length + 1; i++) {
          eterchallscompletedtotal += player.eternityChalls["eterc" + i];
        }
        if (eterchallscompletedtotal >= 50) {
          giveAchievement("5 more eternities until the update");
        }
      }
    }
    for (var i = 0; i < player.challenges.length; i++) {
      if (!player.challenges[i].includes("post") && player.eternities > 1)
        temp.push(player.challenges[i]);
    }

    player.infinitiedBank = new Decimal(player.infinitiedBank).add(
      getBankedInfinities()
    );

    if (player.infinitiedBank.gte(5e9))
      giveAchievement("No ethical consumption");
    if (
      player.dilation.active &&
      (!force || player.infinityPoints.gte(Number.MAX_VALUE))
    ) {
      let tachyonGain = Math.max(
        getDilGain() - player.dilation.totalTachyonParticles,
        0
      );
      if (!player.achievements.includes("r151")) {
        player.dilation.totalTachyonParticles = player.dilation.totalTachyonParticles.plus(
          tachyonGain
        );
        player.dilation.tachyonParticles = player.dilation.tachyonParticles.plus(
          tachyonGain
        );
      }
    } else
      player.dilation.totalTachyonParticles = player.dilation.tachyonParticles;
    player.challenges = temp;
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
      challenges:
        player.eternities.gt(0) && player.achievements.includes("r133")
          ? [
              "challenge1",
              "challenge2",
              "challenge3",
              "challenge4",
              "challenge5",
              "challenge6",
              "challenge7",
              "challenge8",
              "challenge9",
              "challenge10",
              "challenge11",
              "challenge12",
              "postc1",
              "postc2",
              "postc3",
              "postc4",
              "postc5",
              "postc6",
              "postc7",
              "postc8"
            ]
          : player.eternities.gt(0)
          ? [
              "challenge1",
              "challenge2",
              "challenge3",
              "challenge4",
              "challenge5",
              "challenge6",
              "challenge7",
              "challenge8",
              "challenge9",
              "challenge10",
              "challenge11",
              "challenge12"
            ]
          : [],
      currentChallenge: "",
      infinityUpgrades: player.infinityUpgrades,
      infinityPoints: new Decimal(0),
      infinitied: new Decimal(0),
      infinitiedBank: player.infinitiedBank,
      totalTimePlayed: player.totalTimePlayed,
      bestInfinityTime: 9999999999,
      thisInfinityTime: 0,
      resets: player.eternities.gt(2) ? 4 : 0,
      galaxies: player.eternities.gt(2) ? 1 : 0,
      tickDecrease: 0.9,
      totalmoney: player.totalmoney,
      interval: null,
      lastUpdate: player.lastUpdate,
      achPow: player.achPow,
      autobuyers:
        player.eternities > 0
          ? player.autobuyers
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      partInfinityPoint: 0,
      partInfinitied: 0,
      break: player.eternities.gt(0) ? player.break : false,
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
      lastTenEternities: player.lastTenEternities,
      infMult: new Decimal(1),
      infMultCost: new Decimal(10),
      tickSpeedMultDecrease: player.eternities.gt(18)
        ? player.tickSpeedMultDecrease
        : 10,
      tickSpeedMultDecreaseCost: player.eternities.gt(18)
        ? player.tickSpeedMultDecreaseCost
        : 3e6,
      dimensionMultDecrease: player.eternities.gt(18)
        ? player.dimensionMultDecrease
        : 10,
      dimensionMultDecreaseCost: player.eternities.gt(18)
        ? player.dimensionMultDecreaseCost
        : 1e8,
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
      timeDimension1: player.timeDimension1,
      timeDimension2: player.timeDimension2,
      timeDimension3: player.timeDimension3,
      timeDimension4: player.timeDimension4,
      timeDimension5: player.timeDimension5,
      timeDimension6: player.timeDimension6,
      timeDimension7: player.timeDimension7,
      timeDimension8: player.timeDimension8,
      eternityPoints: player.eternityPoints,
      eternities: player.eternities.add(getEternitiedGain()),
      thisEternity: 0,
      bestEternity: player.bestEternity,
      eternityUpgrades: player.eternityUpgrades,
      epmult: player.epmult,
      epmultCost: player.epmultCost,
      totalTickGained: 0,
      offlineProd: player.eternities.gt(18) ? player.offlineProd : 0,
      offlineProdCost: player.eternities.gt(18) ? player.offlineProdCost : 1e7,
      challengeTarget: 0,
      autoSacrifice: player.eternities.gt(5) ? player.autoSacrifice : 1,
      replicanti: {
        amount: player.eternities.gt(48) ? new Decimal(1) : new Decimal(0),
        unl: player.eternities.gt(48) ? true : false,
        chance: 0.01,
        chanceCost: new Decimal(1e150),
        interval: 1000,
        intervalCost: new Decimal(1e140),
        gal: 0,
        galaxies: 0,
        galCost: new Decimal(1e170),
        galaxybuyer: player.eternities.gt(1)
          ? player.replicanti.galaxybuyer
          : undefined,
        auto: player.replicanti.auto,
        bulkmode: player.replicanti.bulkmode
      },
      timeDimensionAutobuyer: player.timeDimensionAutobuyer,
      ep5xAutobuyer: player.ep5xAutobuyer,
      timestudy: player.timestudy,
      eternityChalls: player.eternityChalls,
      eternityChallGoal: new Decimal(Number.MAX_VALUE),
      currentEternityChall: "",
      eternityChallUnlocked: player.eternityChallUnlocked,
      etercreq: player.etercreq,
      autoIP: new Decimal(0),
      autoTime: 1e300,
      infMultBuyer: player.infMultBuyer,
      autoCrunchMode: player.autoCrunchMode,
      autoEterMode: player.autoEterMode,
      respec: player.respec,
      eternityBuyer: player.eternityBuyer,
      eterc8ids: 50,
      eterc8repl: 40,
      dimlife: true,
      dead: true,
      dilation: {
        studies: player.dilation.studies,
        active: false,
        tachyonParticles: player.dilation.tachyonParticles,
        dilatedTime: player.dilation.dilatedTime,
        totalTachyonParticles: player.dilation.totalTachyonParticles,
        nextThreshold: player.dilation.nextThreshold,
        freeGalaxies: player.dilation.freeGalaxies,
        upgrades: player.dilation.upgrades,
        rebuyables: player.dilation.rebuyables,
        unstable: player.dilation.unstable,
        timeRift: player.dilation.timeRift,
        autobuy: player.dilation.autobuy
      },
      meta: player.meta,
      quantum: player.quantum,
      why: player.why,
      options: player.options
    };
    if (player.respec) respecTimeStudies();
    player.respec = false;
    giveAchievement("Time is relative");
    if (milestoneCheck(23)) giveAchievement("This mile took an Eternity"); // 100 eternities
    if (player.eternities.gte(1e12))
      giveAchievement("The cap is a million, not a trillion");
    if (player.replicanti.unl) player.replicanti.amount = new Decimal(1);
    player.replicanti.galaxies = 0;
    document.getElementById("respec").className = "storebtn";
    if (player.achievements.includes("r36"))
      player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45"))
      player.tickspeed = player.tickspeed.times(0.98);

    if (!milestoneCheck(18)) {
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
    matterDisplay()
    quickResetDisplay()
    if (player.infinitied.gte(1) && !player.challenges.includes("challenge1"))
      player.challenges.push("challenge1");
    var autobuyers = document.getElementsByClassName("autoBuyerDiv");
    if (player.eternities.lt(2)) {
      for (var i = 0; i < autobuyers.length; i++)
        autobuyers.item(i).style.display = "none";
      document.getElementById("buyerBtnDimBoost").style.display =
        "inline-block";
      document.getElementById("buyerBtnGalaxies").style.display =
        "inline-block";
      document.getElementById("buyerBtnInf").style.display = "inline-block";
      document.getElementById("buyerBtnTickSpeed").style.display =
        "inline-block";
    }
    updateAutobuyers();
    player.money = getAntimatterOnReset();
    if (player.achievements.includes("r85"))
      player.infMult = player.infMult.times(4);
    if (player.achievements.includes("r93"))
      player.infMult = player.infMult.times(4);
    if (player.achievements.includes("r104"))
      player.infinityPoints = new Decimal(2e25);
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
    if (player.eternities.lt(20)) player.autobuyers[9].bulk = 1;
    if (player.eternities.lt(20))
      document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk;
    if (player.eternities.lt(50)) {
      document.getElementById("replicantidiv").style.display = "none";
      document.getElementById("replicantiunlock").style.display =
        "inline-block";
    } else if (
      document.getElementById("replicantidiv").style.display === "none" &&
      milestoneCheck(20)
    ) {
      document.getElementById("replicantidiv").style.display = "inline-block";
      document.getElementById("replicantiunlock").style.display = "none";
    }
    if (milestoneCheck(3) && player.replicanti.galaxybuyer === undefined)
      player.replicanti.galaxybuyer = false;
    document.getElementById("infinityPoints1").innerHTML =
      'You have <span class="IPAmount1">' +
      shortenDimensions(player.infinityPoints) +
      "</span> Infinity points.";
    document.getElementById("infinityPoints2").innerHTML =
      'You have <span class="IPAmount2">' +
      shortenDimensions(player.infinityPoints) +
      "</span> Infinity points.";
    if (player.eternities.lt(2))
      document.getElementById("break").textContent = "BREAK INFINITY";
    RGDisplayAmount();
    document.getElementById(
      "eternitybtn"
    ).style.display = player.infinityPoints.gte(player.eternityChallGoal)
      ? "inline-block"
      : "none";
    document.getElementById("eternityPoints2").style.display = "inline-block";
    document.getElementById("eternitystorebtn").style.display = "inline-block";
    updateInfMult();
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
    updateEternityChallenges();
    if (player.eternities.lte(1)) {
      showTab("dimensions");
      showDimTab("timedimensions");
      loadAutoBuyerSettings();
    }
    Marathon2 = 0;
  }
}

function startEternityChallenge(name, startgoal, goalIncrease) {
  if (
    player.eternityChallUnlocked == 0 ||
    parseInt(name.split("c")[1]) !== player.eternityChallUnlocked
  )
    return;
  if (
    !player.options.challConf || name == ""
      ? true
      : confirm(
          "You will start over with your time studies, eternity upgrades and achievements. You need to reach a certain amount of Infinity Points with special conditions."
        )
  ) {
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
      challenges:
        player.eternities.gt(0) && player.achievements.includes("r133")
          ? [
              "challenge1",
              "challenge2",
              "challenge3",
              "challenge4",
              "challenge5",
              "challenge6",
              "challenge7",
              "challenge8",
              "challenge9",
              "challenge10",
              "challenge11",
              "challenge12",
              "postc1",
              "postc2",
              "postc3",
              "postc4",
              "postc5",
              "postc6",
              "postc7",
              "postc8"
            ]
          : player.eternities > 0
          ? [
              "challenge1",
              "challenge2",
              "challenge3",
              "challenge4",
              "challenge5",
              "challenge6",
              "challenge7",
              "challenge8",
              "challenge9",
              "challenge10",
              "challenge11",
              "challenge12"
            ]
          : [],
      currentChallenge: "",
      infinityUpgrades: player.infinityUpgrades,
      infinityPoints: new Decimal(0),
      infinitied: new Decimal(0),
      infinitiedBank: player.infinitiedBank,
      totalTimePlayed: player.totalTimePlayed,
      bestInfinityTime: 9999999999,
      thisInfinityTime: 0,
      resets: player.eternities.gt(2) ? 4 : 0,
      galaxies: player.eternities.gt(2) ? 1 : 0,
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
      lastTenEternities: player.lastTenEternities,
      infMult: new Decimal(1),
      infMultCost: new Decimal(10),
      tickSpeedMultDecrease: player.eternities.gt(18)
        ? player.tickSpeedMultDecrease
        : 10,
      tickSpeedMultDecreaseCost: player.eternities.gt(18)
        ? player.tickSpeedMultDecreaseCost
        : 3e6,
      dimensionMultDecrease: player.eternities.gt(18)
        ? player.dimensionMultDecrease
        : 10,
      dimensionMultDecreaseCost: player.eternities.gt(18)
        ? player.dimensionMultDecreaseCost
        : 1e8,
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
      timeDimension1: player.timeDimension1,
      timeDimension2: player.timeDimension2,
      timeDimension3: player.timeDimension3,
      timeDimension4: player.timeDimension4,
      timeDimension5: player.timeDimension5,
      timeDimension6: player.timeDimension6,
      timeDimension7: player.timeDimension7,
      timeDimension8: player.timeDimension8,
      eternityPoints: player.eternityPoints,
      eternities: player.eternities.add(getEternitiedGain()),
      thisEternity: 0,
      bestEternity: player.bestEternity,
      eternityUpgrades: player.eternityUpgrades,
      epmult: player.epmult,
      epmultCost: player.epmultCost,
      totalTickGained: 0,
      offlineProd: player.eternities.gt(18) ? player.offlineProd : 0,
      offlineProdCost: player.eternities.gt(18) ? player.offlineProdCost : 1e7,
      challengeTarget: 0,
      autoSacrifice: player.eternities.gt(5) ? player.autoSacrifice : 1,
      replicanti: {
        amount: player.eternities.gt(48) ? 1 : 0,
        unl: player.eternities.gt(48) ? true : false,
        chance: 0.01,
        chanceCost: new Decimal(1e150),
        interval: 1000,
        intervalCost: new Decimal(1e140),
        gal: 0,
        galaxies: 0,
        galCost: new Decimal(1e170),
        galaxybuyer: player.eternities.gt(1)
          ? player.replicanti.galaxybuyer
          : undefined,
        auto: player.replicanti.auto,
        bulkmode: player.replicanti.bulkmode
      },
      timeDimensionAutobuyer: player.timeDimensionAutobuyer,
      ep5xAutobuyer: player.ep5xAutobuyer,
      timestudy: player.timestudy,
      eternityChalls: player.eternityChalls,
      eternityChallGoal: startgoal
        .times(goalIncrease.pow(ECTimesCompleted(name)))
        .max(startgoal),
      currentEternityChall: name,
      eternityChallUnlocked: player.eternityChallUnlocked,
      etercreq: player.etercreq,
      autoIP: new Decimal(0),
      autoTime: 1e300,
      infMultBuyer: player.infMultBuyer,
      autoCrunchMode: player.autoCrunchMode,
      autoEterMode: player.autoEterMode,
      respec: player.respec,
      eternityBuyer: player.eternityBuyer,
      eterc8ids: 50,
      eterc8repl: 40,
      dimlife: true,
      dead: true,
      dilation: {
        studies: player.dilation.studies,
        active: false,
        tachyonParticles: player.dilation.tachyonParticles,
        dilatedTime: player.dilation.dilatedTime,
        totalTachyonParticles: player.dilation.totalTachyonParticles,
        nextThreshold: player.dilation.nextThreshold,
        freeGalaxies: player.dilation.freeGalaxies,
        upgrades: player.dilation.upgrades,
        rebuyables: player.dilation.rebuyables,
        unstable: player.dilation.unstable,
        timeRift: player.dilation.timeRift
      },
      meta: player.meta,
      quantum: player.quantum,
      why: player.why,
      options: player.options
    };

    if (player.replicanti.unl) player.replicanti.amount = new Decimal(1);
    player.replicanti.galaxies = 0;
    if (player.achievements.includes("r36"))
      player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45"))
      player.tickspeed = player.tickspeed.times(0.98);
    if (player.eternities.lt(30)) {
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
    matterDisplay()
    quickResetDisplay()
    var autobuyers = document.getElementsByClassName("autoBuyerDiv");
    if (player.eternities.lt(2)) {
      for (var i = 0; i < autobuyers.length; i++)
        autobuyers.item(i).style.display = "none";
      document.getElementById("buyerBtnDimBoost").style.display =
        "inline-block";
      document.getElementById("buyerBtnGalaxies").style.display =
        "inline-block";
      document.getElementById("buyerBtnInf").style.display = "inline-block";
      document.getElementById("buyerBtnTickSpeed").style.display =
        "inline-block";
    }
    updateAutobuyers();
    player.money = getAntimatterOnReset();
    if (player.achievements.includes("r85"))
      player.infMult = player.infMult.times(4);
    if (player.achievements.includes("r93"))
      player.infMult = player.infMult.times(4);
    if (player.achievements.includes("r104"))
      player.infinityPoints = new Decimal(2e25);
    resetInfDimensions();
    updateChallenges();
    updateChallengeTimes();
    updateLastTenRuns();
    updateLastTenEternities();
    var infchalls = Array.from(
      document.getElementsByClassName("infchallengediv")
    );
    for (var i = 0; i < infchalls.length; i++)
      infchalls[i].style.display = "none";
    IPminpeak = new Decimal(0);
    EPminpeak = new Decimal(0);
    dor147Stuff();
    updateMilestones();
    resetTimeDimensions();
    if (player.eternities.lt(20)) player.autobuyers[9].bulk = 1;
    if (player.eternities.lt(20))
      document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk;
    if (player.eternities.lt(50)) {
      document.getElementById("replicantidiv").style.display = "none";
      document.getElementById("replicantiunlock").style.display =
        "inline-block";
    }

    if (player.eternities.gt(2) && player.replicanti.galaxybuyer === undefined)
      player.replicanti.galaxybuyer = false;
    document.getElementById("infinityPoints1").innerHTML =
      'You have <span class="IPAmount1">' +
      shortenDimensions(player.infinityPoints) +
      "</span> Infinity points.";
    document.getElementById("infinityPoints2").innerHTML =
      'You have <span class="IPAmount2">' +
      shortenDimensions(player.infinityPoints) +
      "</span> Infinity points.";
    if (player.eternities.gt(2))
      document.getElementById("break").textContent = "BREAK INFINITY";
    RGDisplayAmount();
    document.getElementById(
      "eternitybtn"
    ).style.display = player.infinityPoints.gte(player.eternityChallGoal)
      ? "inline-block"
      : "none";
    document.getElementById("eternityPoints2").style.display = "inline-block";
    document.getElementById("eternitystorebtn").style.display = "inline-block";
    updateInfMult();
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
    updateEternityChallenges();
    Marathon2 = 0;
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

function showEternityMilestoneSubtab(tabName, init) {
  //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
  var tabs = document.getElementsByClassName("eterMilestone");
  var tab;
  for (var i = 0; i < tabs.length; i++) {
    tab = tabs.item(i);
    if (tab.id === tabName) {
      tab.style.display = "inline-block";
    } else {
      tab.style.display = "none";
    }
  }
}

function updateECRewardText() {
  document.getElementById("ec1reward").textContent =
    "Reward: " +
    shortenMoney(timeMultUpg(4, 1)) +
    "x on all Time Dimensions (based on time spent this Eternity)";
  document.getElementById("ec2reward").textContent =
    "Reward: Infinity Power slightly boosts the 1st Infinity Dimension. Currently: " +
    shortenMoney(eterChallReward(2)) +
    "x";
  document.getElementById("ec3reward").textContent =
    "Reward: Increase the multiplier for buying 10 Antimatter Dimensions. Currently: +" +
    eterChallReward(3).toFixed(2) +
    "x, total: " +
    getDimensionPowerMultiplier().toFixed(2) +
    "x";
  document.getElementById("ec4reward").textContent =
    "Reward: Infinity Dimensions gain a multiplier from unspent IP. Currently: " +
    shortenMoney(eterChallReward(4)) +
    "x";
  document.getElementById("ec5reward").textContent =
    "Reward: Distant Galaxy cost scaling starts " +
    eterChallReward(5) +
    " galaxies later.";
  document.getElementById("ec6reward").textContent =
    "Reward: Further reduce the dimension cost multiplier increase. Currently: " +
    eterChallReward(6) +
    "x";
  document.getElementById("ec7reward").textContent =
    "Reward: The First Time Dimension produces Eighth Infinity Dimensions. Currently: " +
    shortenMoney(eterChallReward(7)) +
    " per second. ";
  document.getElementById("ec8reward").textContent =
    "Reward: Replicanti Galaxies are strengthened by Infinity Power. Currently: " +
    ((eterChallReward(8) - 1) * 100).toFixed(2) +
    "%";
  document.getElementById("ec9reward").textContent =
    "Reward: Infinity Dimensions gain a multiplier based on Time Shards. Currently: " +
    shortenMoney(eterChallReward(9)) +
    "x ";
  document.getElementById("ec10reward").textContent =
    "Reward: Time Dimensions gain a multiplier from infinitied stat. Currently: " +
    shortenMoney(eterChallReward(10)) +
    "x ";
  document.getElementById("ec11reward").textContent =
    "Reward: Further reduce the tickspeed cost multiplier increase. Currently: " +
    eterChallReward(11) +
    "x ";
  document.getElementById("ec12reward").textContent =
    "Reward: Infinity Dimension cost multipliers are reduced. (x^" +
    eterChallReward(12) +
    ")";

  document.getElementById("ec10span").textContent =
    shortenMoney(ec10bonus) + "x";
}

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
    updateEPMult()
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

// for eternity milestones
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

function getEPCost(bought) {
  var cost = Decimal.pow(
    bought > 481 ? 1e3 : bought > 153 ? 500 : bought > 58 ? 100 : 50,
    bought + Math.pow(Math.max(bought - 1334, 0), 1.2)
  ).times(500);
  if (cost.lte(new Decimal("1e100000"))) {
    return cost;
  } else {
    return Infinity;
  }
}

function updateEPMult() {
  if (player.epmultCost.e != 9e15) {
  document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: " + shortenDimensions(player.epmult) + "x<p>Cost: " + shortenDimensions(player.epmultCost) + " EP";
  } else {
    document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: " + shortenDimensions(player.epmult) + "x<p>Maxed out";
  }
}

function buyEPMult() {
  if (player.eternityPoints.gte(player.epmultCost)) {
    player.epmult = player.epmult.times(5);
    if (player.autoEterMode === undefined || player.autoEterMode === "amount") {
      player.eternityBuyer.limit = Decimal.times(player.eternityBuyer.limit, 5);
      document.getElementById("priority13").value = formatValue(
        "Scientific",
        player.eternityBuyer.limit,
        2,
        0
      );
    }
    player.eternityPoints = player.eternityPoints.minus(player.epmultCost);
    player.epmultCost = getEPCost(Math.round(player.epmult.ln() / Math.log(5)));
    document.getElementById("epmult").innerHTML =
      "You gain 5 times more EP<p>Currently: " +
      shortenDimensions(player.epmult) +
      "x<p>Cost: " +
      shortenDimensions(player.epmultCost) +
      " EP";
    updateEternityUpgrades();
  }
}

function buyMaxEPMult() {
  if (player.eternityPoints.lt(player.epmultCost)) return;
  var bought = Math.round(player.epmult.ln() / Math.log(5));
  var increment = 1;
  while (player.eternityPoints.gte(getEPCost(bought + increment * 2 - 1))) {
    increment *= 2;
  }
  var toBuy = increment;
  for (p = 0; p < 53; p++) {
    increment /= 2;
    if (increment < 1) break;
    if (player.eternityPoints.gte(getEPCost(bought + toBuy + increment - 1)))
      toBuy += increment;
  }
  var num = toBuy;
  var newEP = player.eternityPoints;
  while (num > 0) {
    var temp = newEP;
    var cost = getEPCost(bought + num - 1);
    if (newEP.lt(cost)) {
      newEP = player.eternityPoints.sub(cost);
      toBuy--;
    } else newEP = newEP.sub(cost);
    if (newEP.eq(temp) || num > 9007199254740992) break;
    num--;
  }
  player.eternityPoints = newEP;
  if (isNaN(newEP.e)) player.eternityPoints = new Decimal(0);
  player.epmult = player.epmult.times(Decimal.pow(5, toBuy));
  player.epmultCost = getEPCost(bought + toBuy);
  document.getElementById("epmult").innerHTML =
    "You gain 5 times more EP<p>Currently: " +
    shortenDimensions(player.epmult) +
    "x<p>Cost: " +
    shortenDimensions(player.epmultCost) +
    " EP";
}

// plans to simplify
function eterUpgrade(x) {}

function RGDisplayAmount() {
  let extraGals = 0;
  if (player.timestudy.studies.includes(225))
    extraGals += Math.floor(player.replicanti.amount.e / 1000);
  if (player.timestudy.studies.includes(226))
    extraGals += Math.floor(player.replicanti.gal / 15);
  let extraText = "";
  if (extraGals !== 0)
    extraText = " (+" + formatInfOrEter(extraGals) + " extra)";
  if (player.achievements.includes("r126")) {
    document.getElementById("replicantireset").innerHTML =
      "Divide replicanti by " +
      shortenDimensions(Number.MAX_VALUE) +
      " for a free galaxy.<br>" +
      formatInfOrEter(player.replicanti.galaxies) +
      extraText +
      " replicated galaxies created.";
  } else
    document.getElementById("replicantireset").innerHTML =
      "Reset Replicanti amount for a free galaxy.<br>" +
      formatInfOrEter(player.replicanti.galaxies) +
      extraText +
      " replicated galaxies created.";
}

function eterChallReward(x) {
  switch (x) {
    case 1:
      return timeMultUpg(4, 1);
    case 2:
      return new Decimal(
        player.infinityPower
          .pow(1.5 / (700 - ECTimesCompleted("eterc2") * 100))
          .min(new Decimal("1e100"))
          .max(1)
      );
    case 3:
      return ECTimesCompleted("eterc3") * 0.8;
    case 4:
      return player.infinityPoints
        .pow(0.003 + player.eternityChalls.eterc4 * 0.002)
        .min(new Decimal("1e200"));
    case 5:
      return player.eternityChalls.eterc5 * 5;
    case 6:
      return (3 - 0.2 * player.eternityChalls.eterc6).toFixed(1);
    case 7:
      return getTimeDimensionProduction(1)
        .pow(ECTimesCompleted("eterc7") * 0.2)
        .minus(1)
        .max(0);
    case 8:
      return new Decimal(
        Math.pow(
          Math.log10(player.infinityPower.plus(1).log10() + 1),
          0.03 * ECTimesCompleted("eterc8")
        )
      ).max(1);
    case 9:
      return player.timeShards
        .pow(ECTimesCompleted("eterc9") * 0.1)
        .min(new Decimal("1e400"))
        .max(1);
    case 10:
      return new Decimal(
        Math.max(
          Math.pow(getInfinitied(), 0.9) *
            ECTimesCompleted("eterc10") *
            0.000002 +
            1,
          1
        )
      )
        .pow(player.timestudy.studies.includes(31) ? 4 : 1)
        .max(1);
    case 11:
      return (2 - 0.07 * ECTimesCompleted("eterc11")).toFixed(2);
    case 12:
      return 1 - ECTimesCompleted("eterc12") * 0.008;
    default:
      return 1;
  }
}

function startDilatedEternity() {
  if (!player.dilation.studies.includes(1)) return;
  clearInterval(gameLoopIntervalId);
  if (player.dilation.active) {
    eternity(true);
    setTimeout(function() {
      gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
    }, 250);
    return;
  }
  if (player.options.dilationconfirm) {
    if (
      !confirm(
        "Dilating time will start a new alternate eternity, where all of your types of dimension multiplier's exponents and the tickspeed multiplier's exponent will be reduced to ^ 0.75. If you can eternity while dilated, you'll be rewarded with tachyon particles based on your antimatter and tachyon particles."
      )
    ) {
      setTimeout(function() {
        gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
      }, 250);
      return;
    }
  }
  giveAchievement("I told you already, time is relative");
  eternity(true);
  player.dilation.active = true;
  var totalMult = 1;
  var currentMult = 1;
  var infinitiedMult = 1;
  var achievementMult = 1;
  var challengeMult = 1;
  var unspentBonus = 1;
  var postc8Mult = new Decimal(0);
  var mult18 = new Decimal(1);
  var ec10bonus = new Decimal(1);
  setTimeout(function() {
    gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
  }, 250);
}

function displayEterMilestoneButton() {
  document.getElementById("reward26enable").style.display = milestoneCheck(26)
    ? "inline-block"
    : "none";
}

function getEternitiedGain() {
  let base = new Decimal(1); //eterGain
  if (player.dilation.upgrades.includes(12))
    base = base.times(
      new Decimal(
        Decimal.pow(player.dilation.dilatedTime, 0.1).toNumber()
      ).floor()
    ); // If you have eternities and DT power up each other (x^0.1)
  if (player.achievements.includes("r155")) base = base.times(100); // If you have Sub-atomic (x100 eternitied stat gain)
  if (player.achievements.includes("r124")) base = base.times(r124Mult()); // If you have "Eternities are the new infinity"
  return Decimal.floor(base); // grand total
}

function getBankedInfinities() {
  let bank = 0;
  if (player.achievements.includes("r131")) bank += 0.05;
  if (player.timestudy.studies.includes(191)) bank += 0.05;
  return Decimal.floor(player.infinitied.times(bank));
}

function r124Mult() {
  return Decimal.min(Math.sqrt(player.thisEternity / 12.5), 30).max(1);
}

function gainedEternityPoints() {
  var ret = Decimal.pow(
    5,
    player.infinityPoints.plus(gainedInfinityPoints()).e / 308 - 0.7
  ).times(player.epmult);
  if (player.timestudy.studies.includes(61)) ret = ret.times(10);
  if (player.timestudy.studies.includes(121))
    ret = ret.times(
      (253 -
        averageEp
          .dividedBy(player.epmult)
          .dividedBy(10)
          .min(248)
          .max(3)) /
        5
    );
  //x300 if tryhard, ~x60 if not
  else if (player.timestudy.studies.includes(122)) ret = ret.times(35);
  else if (player.timestudy.studies.includes(123))
    ret = ret.times(Math.sqrt((1.39 * player.thisEternity) / 10));

  return ret.floor();
}

function updateEternityButton() {
  //updates the eternity button based on your eternities and EP gained on eternity
  var currentEPmin = gainedEternityPoints().dividedBy(
    player.thisEternity / 600
  );
  var EPminpeak = new Decimal(0);
  if (currentEPmin.gt(EPminpeak) && player.infinityPoints.gte(Number.MAX_VALUE))
    EPminpeak = currentEPmin;
  document.getElementById("eternitybtn").innerHTML = player.eternities.eq(0)
    ? "Other times await.. I need to become Eternal"
    : "<b>I need to become Eternal.</b><br>" +
      "Gain <b>" +
      shortenDimensions(gainedEternityPoints()) +
      "</b> Eternity points.<br>" +
      shortenDimensions(currentEPmin) +
      " EP/min<br>Peaked at " +
      shortenDimensions(EPminpeak) +
      " EP/min";
  if (
    gainedEternityPoints().gte(1e6) &&
    !gainedEternityPoints().gte(new Decimal("1e100000"))
  ) {
    document.getElementById("eternitybtn").innerHTML =
      "Gain <b>" +
      shortenDimensions(gainedEternityPoints()) +
      "</b> Eternity points.<br>" +
      shortenDimensions(currentEPmin) +
      " EP/min<br>Peaked at " +
      shortenDimensions(EPminpeak) +
      " EP/min";
  } else if (gainedEternityPoints().gte(new Decimal("1e100000"))) {
    document.getElementById("eternitybtn").innerHTML =
      "Gain <b>" +
      shortenDimensions(gainedEternityPoints()) +
      "</b> Eternity points.<br>" +
      "+" +
      shortenDimensions(getEternitiedGain()) +
      " eternities";
  }
  if (player.dilation.active)
    document.getElementById("eternitybtn").innerHTML =
      "Gain <b>" +
      shortenDimensions(gainedEternityPoints()) +
      "</b> Eternity points.<br>" +
      "+" +
      shortenDimensions(
        Math.max(0, getDilGain() - player.dilation.totalTachyonParticles)
      ) +
      " Tachyon particles.";
  if (player.currentEternityChall !== "")
    document.getElementById("eternitybtn").textContent =
      "Other challenges await.. I need to become Eternal";
}

/* EC stuff here... */

function unlockEChall(idx) {
  if (player.eternityChallUnlocked == 0) {
    player.eternityChallUnlocked = idx;
    document.getElementById(
      "eterc" + player.eternityChallUnlocked + "div"
    ).style.display = "inline-block";
    if (!justImported) showTab("challengesTab");
    if (!justImported) showChallengesTab("eternitychallenges");
    if (idx !== 12 && idx !== 13) player.etercreq = idx;
  }
  updateEternityChallenges();
  updateTimeStudyButtons();
}

function ECTimesCompleted(name) {
  if (player.eternityChalls[name] === undefined) return 0;
  else return player.eternityChalls[name];
}

/* Ok, I'm going to put dilation stuff here... */

function unlockDilation() {
  if (player.dilation.studies.includes(1)) return;
  if (player.timestudy.theorem < 5000) return;
  if (ECTimesCompleted("eterc12") !== 5) return;
  if (ECTimesCompleted("eterc11") !== 5) return;
  player.timestudy.theorem -= 5000;
  document.getElementById("dilationunlock").className = "dilationupgbought";
  updateTimeStudyButtons();
  showEternityTab("dilation");
  document.getElementById("dilationunlock").innerHTML =
    "Unlock time dilation<span>Cost: 5000 Time Theorems";
}

/////// DILATION \\\\\\\
/**
 *
 * @param {Name of the ugrade} id
 * @param {Cost of the upgrade} cost
 * @param {Cost increase for the upgrade, only for rebuyables} costInc
 *
 * id 1-4 are rebuyables
 *
 * id 2 resets your dilated time and free galaxies
 *
 */

const DIL_UPG_COSTS = [
  null,
  [1e5, 10],
  [1e6, 100],
  [1e7, 20],
  [1e8, 1e4],
  5e6,
  1e9,
  5e7,
  1e20,
  2e12,
  1e10,
  1e11,
  1e25,
  1e50,
  1e60,
  1e80,
  1e100,
  1e15,
  1e12,
  2.5e14
];

function buyDilationUpgrade(id, costInc) {
  if (id > 4) {
    // Not rebuyable
    if (player.dilation.dilatedTime < DIL_UPG_COSTS[id]) return false; // Not enough dilated time
    if (player.dilation.upgrades.includes(id)) return false; // Has the upgrade
    player.dilation.dilatedTime = player.dilation.dilatedTime.minus(
      DIL_UPG_COSTS[id]
    );
    // consistency
    player.dilation.upgrades.push(id);
    if (id == 5)
      if (player.dilation.freeGalaxies * 2 < 1200) {
        player.dilation.freeGalaxies *= 2; // Double the current galaxies
      } else player.dilation.freeGalaxies += 600; // If over 1,100 galaxies (550 galaxies), only "double" up to 550 galaxies
  } else {
    // Is rebuyable
    let realCost = getDilRebuyableUpgCost(id);
    if (player.dilation.dilatedTime.lt(realCost)) return false;

    player.dilation.dilatedTime = player.dilation.dilatedTime.minus(realCost);
    player.dilation.rebuyables[id] += 1;
    if (id == 2) {
      player.dilation.dilatedTime = new Decimal(0);
      player.dilation.nextThreshold = new Decimal(1000);
      player.dilation.freeGalaxies = 0;
    }
  }

  updateDilationUpgradeCosts();
  updateDilationUpgradeButtons();
  updateTimeStudyButtons();
  return true;
}

let DIL_UPG_NUM = 19;

function updateDilationUpgradeButtons() {
  for (var i = 1; i <= DIL_UPG_NUM; i++) {
    if (i <= 4) {
      document.getElementById("dil" + i).className = getDilRebuyableUpgCost(
        i
      ).gt(player.dilation.dilatedTime)
        ? "dilationupgrebuyablelocked"
        : "dilationupgrebuyable";
    } else if (player.dilation.upgrades.includes(i)) {
      document.getElementById("dil" + i).className = "dilationupgbought";
    } else {
      document.getElementById("dil" + i).className =
        DIL_UPG_COSTS[i] > player.dilation.dilatedTime
          ? "dilationupglocked"
          : "dilationupg";
    }
  }
  document.getElementById("dil2desc").textContent =
    "Currently: " +
    (1.35 + 3.65 * Math.pow(0.8, player.dilation.rebuyables[2])).toFixed(3) +
    " -> " +
    (1.35 + 3.65 * Math.pow(0.8, player.dilation.rebuyables[2] + 1)).toFixed(3);
  document.getElementById("dil3desc").textContent =
    "Currently: " +
    shortenMoney(Decimal.pow(3, player.dilation.rebuyables[3])) +
    "x";
  document.getElementById("dil4desc").textContent =
    "Currently: ^" + getDilExp() + " -> ^" + (getDilExp() + 0.25);
  document.getElementById("dil7desc").textContent =
    "Currently: " +
    shortenMoney(player.dilation.dilatedTime.pow(308).max(1)) +
    "x";
  document.getElementById("dil9desc").textContent =
    "Currently: " +
    shortenMoney(player.dilation.dilatedTime.pow(1000).max(1)) +
    "x";
  document.getElementById("dil13desc").textContent =
    "Currently: " + shortenMoney(getDil13Bonus()) + "x";
  document.getElementById("dil14desc").textContent =
    "Currently: " + shortenMoney(getDil14Bonus()) + "x";
  document.getElementById("dil16desc").textContent =
    "Currently: " + shortenMoney(getDil16Bonus()) + "x";
  document.getElementById("dil17desc").textContent =
    "Currently: " +
    shortenMoney(
      Math.floor(player.dilation.tachyonParticles.div(20000).max(1))
    ) +
    "/s";
  document.getElementById("dil18desc").textContent =
    "Currently: " + getDil18Bonus().toFixed(3) + "x";
  document.getElementById("dil19desc").textContent =
    "Currently: " +
    shortenMoney(
      player.dilation.tachyonParticles
        .pow(1.5)
        .divide(1e6)
        .max(1)
    ) +
    "x";
  checkUnstableDilationButton();
}

let getDilRebuyableUpgCost = function(i) {
  let cost = new Decimal(DIL_UPG_COSTS[i][0]).times(
    Decimal.pow(DIL_UPG_COSTS[i][1], player.dilation.rebuyables[i])
  );
  // rounding
  if ((i === 2) & cost.gte(9.99e99)) {
    cost = new Decimal("1e99999");
  }
  if (i === 3 && cost.gte(9e99)) {
    cost = new Decimal(1e100).times(
      Decimal.pow(1e3, player.dilation.rebuyables[i] - 75).times(
        1.05 * player.dilation.rebuyables[i] - 75
      )
    );
  }
  if (i === 4 && cost.gte(9e99)) {
    cost = new Decimal(1e100).times(
      Decimal.pow(1e5, player.dilation.rebuyables[i] - 23).times(
        1.05 * player.dilation.rebuyables[i] - 23
      )
    );
  }
  return cost;
};

function updateDilationUpgradeCosts() {
  for (let i = 1; i <= 4; i++) {
    let cost = getDilRebuyableUpgCost(i);
    document.getElementById("dil" + i + "cost").textContent =
      "Cost: " +
      formatValue(player.options.notation, cost, 1, 1) +
      " dilated time";
    if (cost.gte(new Decimal("1e9999")))
      document.getElementById("dil" + i + "cost").textContent = "Maxed out";
  }
  for (let i = 5; i <= DIL_UPG_NUM; i++) {
    document.getElementById("dil" + i + "cost").textContent =
      "Cost: " + shortenCosts(DIL_UPG_COSTS[i]) + " dilated time";
  }
}

function getDilExp() {
  return 1.5 + player.dilation.rebuyables[4] * 0.25; // repeatable upgrade 4
}

function getDilGain() {
  // formula: log10(antimatter)/400^((1.5)+0.25(times bought formula upgrade))*(3^(times bought 3x TP upgrade))
  return Decimal.pow(
    Decimal.log10(player.money) / (400 - (0.75 - getDilPunish()) * 10),
    getDilExp()
  ).times(Decimal.pow(3, player.dilation.rebuyables[3]));
}

function getDilReq() {
  return Decimal.pow(
    10,
    Math.pow(
      player.dilation.totalTachyonParticles /
        Math.pow(3, player.dilation.rebuyables[3]),
      1 / getDilExp()
    ) * 400
  );
}

function getDilPunish() {
  let x = 0.75;
  x = x ** (getDilationSeverity() ** 0.25);
  return x;
}

function getDilTimeGainPerSecond() {
  let gain = player.dilation.tachyonParticles.times(
    Math.pow(2, player.dilation.rebuyables[1]) * 2
  ); // tachyon particle amount
  //upgrades 7-9, 12 and 16
  if (player.eternityUpgrades.includes(7))
    gain = gain.times(1 + Math.log10(Math.max(1, player.money.log(10))) / 30);
  if (player.eternityUpgrades.includes(8))
    gain = gain.times(
      1 + Math.log10(Math.max(1, player.infinityPoints.log(10))) / 16
    );
  if (player.eternityUpgrades.includes(9))
    gain = gain.times(
      1 + Math.log10(Math.max(1, player.eternityPoints.log(10))) / 8
    );
  if (player.dilation.upgrades.includes(12))
    gain = gain.times(Math.pow(player.eternities, 0.1));
  if (player.dilation.upgrades.includes(16)) gain = gain.times(getDil16Bonus());
  if (player.dilation.upgrades.includes(18)) gain = gain.times(getDil18Bonus());
  if (player.quantum.investmentAmount[5].gt(0))
    gain = gain.times(getInvestMultiplier(5));
  return gain;
}

// DILATION UPGRADES (META DIMENSIONS)

function getDil13Bonus() {
  return 1 + Math.log10(1 - Math.min(0, player.tickspeed.log(10)));
}

function getDil14RealBonus() {
  if (player.dilation.upgrades.includes(14)) {
    return getDil14Bonus();
  } else {
    return 2;
  }
}

function getDil14Bonus() {
  return (
    Math.log(
      player.dilation.dilatedTime
        .max(1e10)
        .min(1e100)
        .log(10)
    ) /
      Math.log(10) +
    1
  );
}

function getDil16Bonus() {
  return Decimal.max(
    Math.pow(player.meta.bestAntimatter.log10() / 2.5, 0.5),
    1
  );
}

function getDil18Bonus() {
  var x = new Decimal(Math.log10(player.dilation.tachyonParticles) / 4);
  if (isNaN(x) || x.lt(1)) x = new Decimal(1);
  if (x.gt(12.5)) x = x.pow(0.75).max(12.5);
  return x;
}
