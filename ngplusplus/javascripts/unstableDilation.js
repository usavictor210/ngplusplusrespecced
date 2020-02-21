function unstableDilation() {
var usGain = new Decimal(((player.dilation.tachyonParticles.log(10)/15))).max(1).floor()
 if (!player.dilation.studies.includes(6) || player.dilation.dilatedTime.lt(9.99e99) || player.quantum.times === 0) return
 if (confirm("Unstabilizing time dilation will result in harsher scaling, allowing you to get more TP, but dilation will reset in exchange for Dilation Shards. Are you prepared for this change?")) {
        eternity(true)
        player.dilation.studies = player.dilation.studies,
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
        Decimal.add(player.dilation.unstable.shards, usGain)
        player.dilation.unstable.times++
        player.dilation.unstable.severity++
        giveAchievement("Time Leaper")
  }
}
//showing the unstable dilation button
function checkUnstableDilationButton() {
  if (player.dilation.dilatedTime.gte(9.99e99)) document.getElementById("enabledilation2").style.display = "inline-block"
  else document.getElementById("enabledilation2").style.display = "none"
  if (!player.dilation.studies.includes(6) || player.dilation.dilatedTime.lt(9.99e99) || player.quantum.times === 0) {
  document.getElementById("enabledilation2").innerHTML = "Go quantum and have at least 1e100 DT to unstabilize dilation."
  } else document.getElementById("enabledilation2").innerHTML = "Unstabilize dilation."
}


function timeLeaperMult() {
  var x = Decimal.pow(player.totalTickGained/500, 30)
  if (!player.achievements.includes("r151")) return new Decimal(1)
  else return x
}

function timeMultUpg(x, check) {
  var y = 1
  var z = 1
  if (x === 1) {
      if (player.achievements.includes("r151")) {
        y = new Decimal(Decimal.pow(0.5 * player.totalTimePlayed / 360, 0.15).pow(timeLeaperMult().log10()))
    } else y = new Decimal (Decimal.pow(0.5 * player.totalTimePlayed / 600, 0.15).toFixed(2))
  }
  if (x === 2) {
    if (player.achievements.includes("r151")) {
      y = new Decimal ((Decimal.max(Math.pow(player.thisInfinityTime / 50, 0.4)+1, 1).pow((timeLeaperMult()).times(player.thisInfinityTime), 1.05).log10()))
    } else y = new Decimal (Decimal.max(Math.pow(player.thisInfinityTime / 2400, 0.25), 1).toFixed(2))
  }
  if (x === 3) {
    if (player.achievements.includes("r151")) {
      y = new Decimal (((Decimal.pow(player.totalTimePlayed / (600*60*48), (0.05*timeLeaperMult()**0.025)))))
    } else y = new Decimal (Math.pow(player.totalTimePlayed / (600*60*48), 0.05));
  }
  if (x === 4) {
    if (player.achievements.includes("r151")) {
      y = new Decimal (Decimal.pow(Decimal.max(player.thisEternity*20, 1), (0.55+new Decimal(player.totalTickGained**0.0125).log10())*(player.thisEternity)+1).pow(0.125))
      if (y.gte (player.dilation.active ? 1e25 : 1e100)) y = y.pow(player.dilation.active ? 0.75 : 0.1).max(player.dilation.active ? 1e25 : 1e100)
      if (y.gte (new Decimal (player.dilation.active ? "1e100" : "1e2000"))) y = y.pow(player.dilation.active ? 0.375 : 0.1).max(new Decimal(player.dilation.active ? "1e100" : "1e2000"))
      if (y.gte (new Decimal (player.dilation.active ? Number.MAX_VALUE : "1e30000"))) y = y.pow(0.01).max(new Decimal(player.dilation.active ? Number.MAX_VALUE : "1e30000"))
    } else y = new Decimal (Math.pow(Math.max(player.thisEternity*10, 1), 0.3+(ECTimesCompleted("eterc1")*0.05)))
  }
  z = shortenMoney(y)
  if (check === 1) {
    return y
  } else if (check === 2) {
    return z
  } else throw "Invalid check value"
}