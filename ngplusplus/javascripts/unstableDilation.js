// Obsoleted

function unstableDilation() { // begins a reset for unstable dilation
var usGain = new Decimal(((player.dilation.tachyonParticles.log(10)/15))).max(1).floor() // formula
var sacTPGain = player.dilation.unstable.sacrificedTP.add(player.dilation.tachyonParticles.pow(0.025)).floor()
 if (!player.dilation.studies.includes(6) || player.dilation.dilatedTime.lt(9.99e99) || player.quantum.times === 0) return // if player doesn't have meta dimensions, 1e100+ DT or have went quantum, return
 if (confirm("Unstabilizing time dilation will result in harsher scaling, allowing you to get more TP, but dilation will reset in exchange for Unstable Shards and sacrificed TP. Are you prepared for this change?")) {
        eternity(true) // forced eternity
        player.dilation.unstable.sacrificedTP = player.dilation.unstable.sacrificedTP.add(sacTPGain)
        player.dilation.unstable.shards = player.dilation.unstable.shards.add(usGain)
        player.dilation.studies = player.dilation.studies, // resetting dilation
        player.dilation.active = false,
        player.dilation.tachyonParticles = new Decimal(0),
        player.dilation.dilatedTime = new Decimal(0),
        player.dilation.nextThreshold = new Decimal(1000),
        player.dilation.freeGalaxies = 0,
        player.dilation.upgrades = [],
        player.dilation.totalTachyonParticles = new Decimal(0),
        player.dilation.rebuyables = {
            1: 0,
            2: 0,
            3: 0,
            4: 0
        }
        
        player.dilation.unstable.times++ // this affects the penalty
        giveAchievement("Time Leaper")
        document.getElementById("unstableShardAmount").textContent = player.dilation.unstable.shards // we don't really need to update unstable shards all the time, but we might have to.
  }
}
//showing the unstable dilation button
function checkUnstableDilationButton() {
  if (player.dilation.dilatedTime.gte(9.99e99)) document.getElementById("enabledilation2").style.display = "inline-block"
  else document.getElementById("enabledilation2").style.display = "none"
  if (!player.dilation.studies.includes(6) || player.dilation.dilatedTime.lt(9.99e99) || player.quantum.times === 0) {
  document.getElementById("enabledilation2").innerHTML = "Go quantum, have at least 1e100 DT and unlock Meta Dimensions to unstabilize dilation."
  } else document.getElementById("enabledilation2").innerHTML = "Unstabilize dilation for " + new Decimal(((player.dilation.tachyonParticles.log(10)/15))).max(1).floor() + " unstable shards and " + player.dilation.tachyonParticles.pow(0.025).floor() + " sacrificed TP."
}
// for deciding how harsh dilation is. 
function getDilationSeverity() {
  var x = player.dilation.unstable.times
  if (x > 2) player.dilation.unstable.times**1.05 // x^1.05
  if (x < 1 || isNaN(x)) x = 1
  return x
}

function timeLeaperMult() { // for time leaper achievement
  var x = Decimal.pow(player.totalTickGained/400, 30).max(1)
  if (!player.achievements.includes("r151")) return new Decimal(1)
  else return x
}

function getTemporalPowerPerSec() {
  var x = Decimal.pow(player.dilation.unstable.sacrificedTP, 0.1).div(1000).floor()
  return x
}

function timeMultUpg(x, check) { // needs better organization.
  var y = 1 // multiplier
  var z = 1 // the "display" variable
  if (x === 1) { // affects ND multiplier based on time played
      if (player.achievements.includes("r151")) {
        y = new Decimal(Decimal.pow(0.5 * player.totalTimePlayed / 360, 0.15).pow(timeLeaperMult().log10()))
    } else y = new Decimal (Decimal.pow(0.5 * player.totalTimePlayed / 600, 0.15).toFixed(2))
  }
  if (x === 2) {  // affects ND multiplier based on time in infinity
    if (player.achievements.includes("r151")) {
      y = new Decimal ((Decimal.max(Math.pow(player.thisInfinityTime / 50, 0.4)+1, 1).pow((timeLeaperMult()).times(player.thisInfinityTime), 1.05).log10()))
    } else y = new Decimal (Decimal.max(Math.pow(player.thisInfinityTime / 2400, 0.25), 1).toFixed(2))
  }
  if (x === 3) { // affects "One for each dimension"
    if (player.achievements.includes("r151")) {
      y = new Decimal (((Decimal.pow(player.totalTimePlayed / (600*60*48), (0.05*timeLeaperMult()**0.025)))))
    } else y = new Decimal (Math.pow(player.totalTimePlayed / (600*60*48), 0.05));
  }
  if (x === 4) { // affects EC1 reward. Softcap at 1e25/1e100, 1e100/1e2000, and 1.79e308/1e30000 in dilation and regular runs respectively.
    if (player.achievements.includes("r151")) {
      y = new Decimal (Decimal.pow(Decimal.max(player.thisEternity*20, 1), (0.55+new Decimal(player.totalTickGained**0.0125).log10())*(player.thisEternity)+1).pow(0.125))
      if (y.gte (player.dilation.active ? 1e25 : 1e100)) y = y.pow(player.dilation.active ? 0.75 : 0.1).max(player.dilation.active ? 1e25 : 1e100)
      if (y.gte (new Decimal (player.dilation.active ? "1e100" : "1e2000"))) y = y.pow(player.dilation.active ? 0.5 : 0.1).max(new Decimal(player.dilation.active ? "1e100" : "1e2000"))
      if (y.gte (new Decimal (player.dilation.active ? Number.MAX_VALUE : "1e30000"))) y = y.pow(0.125).max(new Decimal(player.dilation.active ? Number.MAX_VALUE : "1e30000"))
    } else y = new Decimal (Math.pow(Math.max(player.thisEternity*10, 1), 0.3+(ECTimesCompleted("eterc1")*0.05)))
  }
  if (y.lt(1) || isNaN(y)) y = new Decimal (1) // prevents NaN or dumb errors
  z = shortenMoney(y) // notation change
  if (check === 1) { // check for if you want number or display number.
    return y
  } else if (check === 2) {
    return z
  } else throw "Invalid check value"
}

function getUnstableUpgMult(x) {
  switch(x) {
    case 1: return (Decimal.log(player.dilation.unstable.shards.pow(0.75))/10).min(1)
    case 2: return timeLeaperMult()
    case 3: return new Decimal(getDilPunish()).recip()
    case 4: return Decimal.pow(1.2, player.dilation.unstable.shards).plus(4)
    case 6: return Decimal.max(Math.pow(Math.log10(player.dilation.tachyonParticles), 0.075), 1);
    case 7: return Decimal.max(Math.pow(player.galaxies, 0.18), 1);
    case 8: return 1
    case 9: return 1
  } 
}