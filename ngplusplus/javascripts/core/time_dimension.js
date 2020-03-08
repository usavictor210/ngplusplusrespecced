//time dimensions

function getTimeDimensionPower(tier) {
  if (player.currentEternityChall == "eterc11") return new Decimal(1)
  var dim = player["timeDimension"+tier]
  var ret = dim.power.pow(2)

  if (player.timestudy.studies.includes(11) && tier == 1) ret = ret.dividedBy(player.tickspeed.dividedBy(1000).pow(0.005).times(0.95).plus(player.tickspeed.dividedBy(1000).pow(0.0003).times(0.05)).max(Decimal.fromMantissaExponent(1, -2500)))
  if (player.achievements.includes("r105")) ret = ret.div(getInfiniteTimeReward())
  if (player.eternityUpgrades.includes(4)) ret = ret.times(player.achPow)
  if (player.eternityUpgrades.includes(5)) ret = ret.times(Math.max(player.timestudy.theorem, 1))
  if (player.eternityUpgrades.includes(6)) ret = ret.times(player.totalTimePlayed / 10 / 60 / 60 / 24)
  if (player.timestudy.studies.includes(73) && tier == 3) ret = ret.times(calcTotalSacrificeBoost().pow(0.005).min(new Decimal("1e1300")))
  if (player.timestudy.studies.includes(93)) ret = ret.times(Decimal.pow(player.totalTickGained, 0.25).max(1))
  if (player.timestudy.studies.includes(103)) ret = ret.times(Math.max(player.replicanti.galaxies, 1))
  if (player.timestudy.studies.includes(151)) ret = ret.times(1e4)
  if (player.timestudy.studies.includes(221)) ret = ret.times(Decimal.pow(1.0025, player.resets))
  if (player.timestudy.studies.includes(227) && tier == 4) ret = ret.times(Math.max(Math.pow(calcTotalSacrificeBoost().log10(), 10), 1))
  if (player.currentEternityChall == "eterc9") ret = ret.times((Decimal.pow(Math.max(player.infinityPower.log2(), 1), 4)).max(1))
  if (ECTimesCompleted("eterc1") !== 0) if (!player.achievements.includes("r151")) {
  ret = ret.times(Math.pow(Math.max(player.thisEternity*10, 0.9), 0.3+(ECTimesCompleted("eterc1")*0.05)))
  } else if (player.achievements.includes("r151")) ret = ret.times(timeMultUpg(4,1))
  let ec10bonus = new Decimal(1)
  if (ECTimesCompleted("eterc10") !== 0) ec10bonus = new Decimal(Math.max(Math.pow(getInfinitied(), 0.9) * ECTimesCompleted("eterc10") * 0.000002+1, 1))
  if (player.timestudy.studies.includes(31)) ec10bonus = ec10bonus.pow(4)
  ret = ret.times(ec10bonus)
  if (player.achievements.includes("r128")) ret = ret.times(Math.max(player.timestudy.studies.length, 1))

  if (player.replicanti.unl && player.replicanti.amount.gt(1) && player.dilation.upgrades.includes(6)) {
    ret = ret.times(getReplMult().pow(0.1))
  }

  if (ret.lt(0)) {
    ret = new Decimal(0)
  }

  if (player.dilation.active) {
    ret = Decimal.pow(10, Math.pow(ret.log10(), getDilPunish()))
    if (player.dilation.upgrades.includes(11)) {
      ret = Decimal.pow(10, Math.pow(ret.log10(), 1.05))
    }
  }

  if (player.achievements.includes("r105")) { 
    document.getElementById("itmult").innerHTML = "Your 'Infinite Time' multiplier is currently " + shortenMoney(getInfiniteTimeReward().recip()) + "x."
  } else document.getElementById("itmult").style.display = "none"
  return ret
}

function getInfiniteTimeReward() {
return (player.tickspeed.div(1000).pow(0.000005))
}
function getTimeDimensionProduction(tier) {
  if (player.currentEternityChall == "eterc10") return new Decimal(0)
  var dim = player["timeDimension"+tier]
  if (player.currentEternityChall == "eterc11") return dim.amount
  var ret = dim.amount
  ret = ret.times(getTimeDimensionPower(tier))
  if (player.currentEternityChall == "eterc7") {
      ret = ret.dividedBy(player.tickspeed.dividedBy(1000))
  }
  if (player.currentEternityChall == "eterc1") return new Decimal(0)
  return ret
}


function getTimeDimensionRateOfChange(tier) {
  let toGain = getTimeDimensionProduction(tier+1)
  var current = Decimal.max(player["timeDimension"+tier].amount, 1);
  var change  = toGain.times(10).dividedBy(current);
  return change;
}

function getTimeDimensionDescription(tier) {
  var name = TIER_NAMES[tier];

  let description = shortenDimensions(player['timeDimension'+tier].amount);

  if (tier < 8) {
      description += '  (+' + formatValue(player.options.notation, getTimeDimensionRateOfChange(tier), 2, 2) + '%/s)';
  }

  return description;
}

function updateTimeDimensions() {
  if (document.getElementById("timedimensions").style.display == "block" && document.getElementById("dimensions").style.display == "block") {
    for (let tier = 1; tier <= 4; ++tier) {
      document.getElementById("timeD"+tier).textContent = DISPLAY_NAMES[tier] + " Time Dimension x" + shortenMoney(getTimeDimensionPower(tier));
      document.getElementById("timeAmount"+tier).textContent = getTimeDimensionDescription(tier);
    }
    if (player.dilation.studies.includes(2)) {
      for (let tier = 5; tier <= 8; ++tier) {
        if (player.dilation.studies.includes(tier-3)) {
          document.getElementById("timeD"+tier).textContent = DISPLAY_NAMES[tier] + " Time Dimension x" + shortenMoney(getTimeDimensionPower(tier));
          document.getElementById("timeAmount"+tier).textContent = getTimeDimensionDescription(tier);
        }
      }
    }
    for (let tier = 1; tier <= 8; ++tier) {
      if (player.dilation.studies.includes(tier-3) || tier < 5) {
        document.getElementById("timeRow"+tier).style.display = "table-row"
      } else {
        document.getElementById("timeRow"+tier).style.display = "none"
      }
    }
  }
}

var timeDimCostMults = [null, 3, 9, 27, 81, 243, 729, 2187, 6561]
var timeDimStartCosts = [null, 1, 5, 100, 1000, "1e2350", "1e2650", "1e3000", "1e3350"]

function timeDimCost(tier, bought) {
  let cost = Decimal.pow(timeDimCostMults[tier], bought).times(timeDimStartCosts[tier])
  if (cost.gte(Number.MAX_VALUE)) {
      cost = Decimal.pow(timeDimCostMults[tier]*1.5, bought).times(timeDimStartCosts[tier])
  }
  if (cost.gte("1e1300")) {
      cost = Decimal.pow(timeDimCostMults[tier]*2.2, bought).times(timeDimStartCosts[tier])
  }
  if (cost.gte("1e20000")) {
      // rather than fixed cost scaling as before, quadratic cost scaling
      // to avoid exponential growth
      cost = cost.times(Decimal.pow(new Decimal('1e1000'),
      Math.pow(cost.log(10) / 1000 - 20, 2)));
  }
  if (tier > 4) {
    // as it was before
    cost = Decimal.pow(timeDimCostMults[tier]*100, bought).times(timeDimStartCosts[tier]);
    if (cost.gte("1e300000")) {
        // we do the same thing as with TD 1-4, but 15 times later.
        // This means that at 1e300000 progress should hit a wall
        // that the 1e80 dilation upgrade gets us over.
        cost = cost.times(Decimal.pow(new Decimal('1e1000'),
        Math.pow(cost.log(10) / 1000 - 300, 2)));
    }
  }
  return cost;
}

function buyTimeDimension(tier) {
  var dim = player["timeDimension"+tier]
  if (tier > 4 && !player.dilation.studies.includes(tier-3)) return false
  if (player.eternityPoints.lt(dim.cost)) return false

  player.eternityPoints = player.eternityPoints.minus(dim.cost)
  dim.amount = dim.amount.plus(1);
  dim.bought += 1
  dim.power = dim.power.times(2)
  dim.cost = timeDimCost(tier, dim.bought);
  updateEternityUpgrades()
  return true
}

function resetTimeDimensions() {
  for (var i=1; i<9; i++) {
      var dim = player["timeDimension"+i]
      dim.amount = new Decimal(dim.bought)
  }

}

function buyMaxTimeDimensions() {
  for(var i=1; i<9; i++) {
    // strategy: repeatedly buy the maximum power of 2 possible
    var dim = player["timeDimension"+i];
    while (true) {
      let toBuy = .5;
      while (timeDimCost(i, dim.bought + 2 * toBuy).times(2).lte(player.eternityPoints)) {
        toBuy *= 2;
      }
      if (toBuy === .5) {
        break;
      }
      // now we can safely buy toBuy.
      let purchase = toBuy;
      while (purchase > 0) {
        let cost = timeDimCost(i, dim.bought + purchase - 1);
        let newEP = player.eternityPoints.minus(cost);
        if (newEP.eq(player.eternityPoints)) {
          break;
        }
        player.eternityPoints = newEP;
        purchase--;
      }
      dim.amount = dim.amount.plus(toBuy);
      dim.bought += toBuy;
      dim.power = dim.power.times(Decimal.pow(2, toBuy))
      dim.cost = timeDimCost(i, dim.bought);
    }
    // if we can buy more than 1 now we definitely clearly could have bought 1.
    buyTimeDimension(i);
  }
}
