function getDilationMetaDimensionMultiplier () {
  x = player.dilation.dilatedTime.div(1e39).pow(.2).plus(1);
  if (x.gt(10)) x = x.divide(10).pow(.55).max(10)
  return x
}

function getMetaGalaxyPower () {
  let ret = 1.1; //base
  // multiplier has a different amount depending on the amount of meta galaxies
  if (player.meta.galaxy < 2) ret = ret**player.meta.galaxy
  else ret = ret**2+(player.meta.galaxy**0.015)
  
  return ret-1;
}

function getMetaResetPower () {
  let ret = getDil14RealBonus();
  if (player.achievements.includes('r144')) {
    ret *= 1.01;
  }
  ret += getMetaGalaxyPower()
  return ret;
}

function getMetaPerTenPower() {
  return getDil14RealBonus();
}

function getMetaNormalBoostEffect () {
  let exp = 5;
  if (player.dilation.upgrades.includes(15)) {
    exp = 6;
  }
  return player.meta.bestAntimatter.pow(exp).plus(1);
}

function getMetaDimensionMultiplier (tier) {
  if (player.currentEternityChall === "eterc11") {
    return new Decimal(1);
  }
  let multiplier = Decimal.pow(getMetaPerTenPower(), player.meta[tier].tensBought).times(Decimal.pow(getMetaResetPower(), Math.max(0, player.meta.resets - tier + 1))).times(getDilationMetaDimensionMultiplier());
  if (player.dilation.upgrades.includes(13)) {
    multiplier = multiplier.times(getDil13Bonus());
  }

  if (player.achievements.includes('r142')) {
    multiplier = multiplier.times(1.1);
  }

  if (multiplier.lt(1)) multiplier = new Decimal(1);
  if (player.dilation.active) {
    multiplier = Decimal.pow(10, Math.pow(multiplier.log10(), getDilPunish()))
    if (player.dilation.upgrades.includes(11)) {
      multiplier = Decimal.pow(10, Math.pow(multiplier.log10(), 1.05))
    }
  }
  if (player.quantum.investmentAmount[4].gt(0)) multiplier = multiplier.times(getInvestMultiplier(4))

  // The softcap
  if (multiplier.gt(1e36)) multiplier = multiplier.pow(0.96).max(1e36)
  
  return multiplier;
}

function getMetaDimensionDescription(tier) {

  let description = shortenDimensions(player.meta[tier].amount) + ' (' + player.meta[tier].bought + ')';
  if (tier === 8) description = Math.round(player.meta[tier].amount) + ' (' + player.meta[tier].bought + ')';

  if (tier < 8) {
      description += '  (+' + formatValue(player.options.notation, getMetaDimensionRateOfChange(tier), 2, 2) + '%/s)';
  }

  return description;
}

function getMetaDimensionRateOfChange(tier) {
  if (tier === 8) {
      return 0;
  }
  let toGain = getMetaDimensionProductionPerSecond(tier + 1);
  var current = player.meta[tier].amount.max(1);
  var change  = toGain.times(10).dividedBy(current);

  return change;
}


function canBuyMetaDimension(tier) {
    if (tier > player.meta.resets + 4) return false;
    if (tier > 1 && player.meta[tier - 1].amount.eq(0)) return false;
    return true;
}


function clearMetaDimensions () {
    for (i = 1; i <= 8; i++) {
        player.meta[i].amount = new Decimal(0);
        player.meta[i].bought = 0;
        player.meta[i].tensBought = 0;
        player.meta[i].cost = new Decimal(initCost[i]);
    }
}

function getMetaShiftRequirement () {
  return {
    tier: Math.min(8, player.meta.resets + 4),
    amount: getMetaShiftRequirementScaling()
  }
}

function getMetaShiftRequirementScaling() {
  if (player.meta.resets >= 12) {
    return Math.max(150, 150 + (25 * ((player.meta.resets) - 12)))
  } else {
    return Math.max(20, -40 + 15 * player.meta.resets)
  }
}

function metaBoost () {
    let req = getMetaShiftRequirement();
    if (player.meta[req.tier].amount.lt(req.amount)) {
        return false;
    }
    //deciding how much meta-am you get
    player.meta.antimatter = new Decimal(10);
    if (player.achievements.includes('r142') && !player.achievements.includes('r152')) {
      player.meta.antimatter = new Decimal(100);
    } else if (player.achievements.includes('r152')) player.meta.antimatter = new Decimal(1000);
    else player.meta.antimatter = new Decimal(10);

    clearMetaDimensions();
    for (let i = 2; i <= 8; i++) {
      document.getElementById(i + "MetaRow").style.display = "none"
    }
    player.meta.resets++;
    if (player.meta.resets >= 10) {
      giveAchievement('Meta-boosting to the max');
    }
    return true;
}

function metaGalaxyCost() {
var x = -20 + (40 * (player.meta.galaxy+1))
var y = ((player.meta.galaxy-6)*10)
if (player.meta.galaxy > 6) x = x + y
if (player.meta.galaxy > 10) x = x + Math.floor(y * 1.5)
  return {
    tier: 8,
    amount: Math.max(40, x)
  }
}

function metaGalaxy () {
    let req = metaGalaxyCost();
    if (player.meta[req.tier].amount.lt(req.amount)) {
        return false;
    }
    //deciding how much meta-am you get
    player.meta.antimatter = new Decimal(10);
    if (player.achievements.includes('r142') && !player.achievements.includes('r152')) {
      player.meta.antimatter = new Decimal(100);
    } else if (player.achievements.includes('r151')) player.meta.antimatter = new Decimal(2000);
    else player.meta.antimatter = new Decimal(10);

    clearMetaDimensions();
    player.meta.resets = 0
    for (let i = 2; i <= 8; i++) {
      document.getElementById(i + "MetaRow").style.display = "none"
    }
    player.meta.galaxy++;
    //giveAchievement("That's too meta");
    return true;
}

function getMetaDimensionCostMultiplier(tier) {
    return costMults[tier];
}

function metaBuyOneDimension(tier) {
    var cost = player.meta[tier].cost;
    if (!canBuyMetaDimension(tier)) {
        return false;
    }
    if (!canAffordMetaDimension(cost)) {
        return false;
    }
    if (+tier === 8) {
        giveAchievement("And still no ninth dimension...");
    }
    player.meta.antimatter = player.meta.antimatter.minus(cost);
    player.meta[tier].amount = player.meta[tier].amount.plus(1);
    player.meta[tier].bought++;
    if (player.meta[tier].bought === 10) {
      player.meta[tier].cost = player.meta[tier].cost.times(getMetaDimensionCostMultiplier(tier));
      player.meta[tier].bought = 0;
      player.meta[tier].tensBought++;
    }
    return true;
}

function getMetaMaxCost (tier) {
  return player.meta[tier].cost.times(10 - player.meta[tier].bought);
}

function metaBuyManyDimension(tier) {
    var cost = getMetaMaxCost(tier);
    if (!canBuyMetaDimension(tier)) {
        return false;
    }
    if (!canAffordMetaDimension(cost)) {
        return false;
    }
    if (+tier === 8) {
        giveAchievement("And still no ninth dimension...");
    }
    player.meta.antimatter = player.meta.antimatter.minus(cost);
    player.meta[tier].amount = player.meta[tier].amount.plus(10 - player.meta[tier].bought);
    player.meta[tier].cost = player.meta[tier].cost.times(getMetaDimensionCostMultiplier(tier));
    player.meta[tier].bought = 0;
    player.meta[tier].tensBought++;
    return true;
}

function canAffordMetaDimension(cost) {
    return cost.lte(player.meta.antimatter);
}

for (let i = 1; i <= 8; i++) {
    document.getElementById("meta" + i).onclick = function () {
        metaBuyOneDimension(i);
    }
    document.getElementById("metaMax" + i).onclick = function () {
        metaBuyManyDimension(i);
    }
}

document.getElementById("metaMaxAll").onclick = function () {
    for (let i = 1; i <= 8; i++) {
      while (metaBuyManyDimension(i));
    }
}

document.getElementById("metaSoftReset").onclick = function () {
    metaBoost();
}
document.getElementById("metaGalaxySoftReset").onclick = function () {
    metaGalaxy();
}

function getMetaDimensionProductionPerSecond(tier) {
    return Decimal.floor(player.meta[tier].amount).times(getMetaDimensionMultiplier(tier));
}

function metaDimensionAchievement() { // SHOULD BE SIMPLIFIED
var x = 0
  for (let i=1; i<9; i++) {
  if (getMetaDimensionMultiplier(i).gte(1e30)) x++
  }
  if (x == 8) giveAchievement("I never meta-dimension I didn't like");
return x // returns how many dimensions satisfied the requirement.
}

function updateMetaDimensions() {
  if (
    document.getElementById("metadimensions").style.display == "block" &&
    document.getElementById("dimensions").style.display == "block"
  ) {
    var element0 = document.getElementById("metaAntimatterAmount");
    element0.textContent = shortenMoney(player.meta.antimatter);
    var element1 = document.getElementById("metaAntimatterBest");
    element1.textContent = shortenMoney(player.meta.bestAntimatter);
    var element2 = document.getElementById("metaAntimatterEffect");
    element2.textContent = shortenMoney(getMetaNormalBoostEffect());
    var element3 = document.getElementById("metaAntimatterPerSec");
    element3.textContent =
      "You are getting " +
      shortenDimensions(getMetaDimensionProductionPerSecond(1)) +
      " meta-antimatter per second.";
    for (let tier = 1; tier <= 8; ++tier) {
      if (
        !canBuyMetaDimension(tier) &&
        document.getElementById(tier + "MetaRow").style.display !== "table-row"
      ) {
        break;
      }
      document.getElementById(tier + "MetaD").childNodes[0].nodeValue =
        DISPLAY_NAMES[tier] +
        " Meta Dimension x" +
        formatValue(
          player.options.notation,
          getMetaDimensionMultiplier(tier),
          1,
          1
        );
      document.getElementById(
        "meta" + tier + "Amount"
      ).textContent = getMetaDimensionDescription(tier);
    }
    for (let tier = 1; tier <= 8; ++tier) {
      if (!canBuyMetaDimension(tier)) {
        break;
      }
      document.getElementById(tier + "MetaRow").style.display = "table-row";
      document.getElementById(tier + "MetaRow").style.visibility = "visible";
    }

    for (let tier = 1; tier <= 8; ++tier) {
      document.getElementById("meta" + tier).className = canAffordMetaDimension(
        player.meta[tier].cost
      )
        ? "storebtn"
        : "unavailablebtn";
      document.getElementById(
        "metaMax" + tier
      ).className = canAffordMetaDimension(getMetaMaxCost(tier))
        ? "storebtn"
        : "unavailablebtn";
    }

    var shiftRequirement = getMetaShiftRequirement();
    if (shiftRequirement.tier < 8) {
      document.getElementById("metaResetLabel").textContent =
        "Meta-Dimension Shift (" +
        player.meta.resets +
        "): requires " +
        shiftRequirement.amount +
        " " +
        DISPLAY_NAMES[shiftRequirement.tier] +
        " Meta Dimensions";
    } else {
      document.getElementById("metaResetLabel").textContent =
        "Meta-Dimension Boost (" +
        player.meta.resets +
        "): requires " +
        shiftRequirement.amount +
        " " +
        DISPLAY_NAMES[shiftRequirement.tier] +
        " Meta Dimensions";
    }

    if (shiftRequirement.tier < 8) {
      document.getElementById("metaSoftReset").textContent =
        "Reset Meta-Dimensions for a new Dimension";
    } else {
      document.getElementById("metaSoftReset").textContent =
        "Reset Meta-Dimensions for a Boost";
    }

    if (player.meta[shiftRequirement.tier].amount.lt(shiftRequirement.amount)) {
      document.getElementById("metaSoftReset").className = "unavailablebtn";
    } else {
      document.getElementById("metaSoftReset").className = "storebtn";
    }
    var galaxyRequirement = metaGalaxyCost();
    document.getElementById("metaGalaxyResetLabel").textContent =
      "Meta-Antimatter Galaxies (" +
      player.meta.galaxy +
      "): requires " +
      galaxyRequirement.amount +
      " Eighth Meta Dimensions";
    // metaGalaxybuttondiv
    if (
      player.meta[galaxyRequirement.tier].amount.lt(galaxyRequirement.amount)
    ) {
      document.getElementById("metaGalaxySoftReset").className =
        "unavailablebtn";
    } else {
      document.getElementById("metaGalaxySoftReset").className = "storebtn";
    }

    // also quantum stuff since why not
    if (player.meta.antimatter.gte(quantRequirement())) {
    let qg = quarkGain()
      document.getElementById("quantumResetLabel").textContent =
        "Go quantum: Sacrifice everything to get " +
        shortenMoney(qg) +
        (qg.eq(1) ? " quark" : " quarks");
      +".";
      document.getElementById("quantumbuttondiv").style.display = "";
    } else {
      document.getElementById("quantumbuttondiv").style.display = "none";
    }
  }
}
