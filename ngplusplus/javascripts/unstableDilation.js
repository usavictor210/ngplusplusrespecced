function unstableDilation() {
var usGain = new Decimal(((player.dilation.tachyonParticles.log(10).divide(15)))).max(1).floor()
 if (!player.dilation.studies.includes(6) || player.dilation.dilatedTime.lt(9.99e99)) return
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
    y = (Decimal.pow(0.5 * player.totalTimePlayed / 600, 0.15)).pow(timeLeaperMult().log10())
  } else y = Decimal.pow(0.5 * player.totalTimePlayed / 600, 0.15)
}
  if (x === 2) {
    if (player.achievements.includes("r151")) {
    y = new Decimal (Decimal.max(Math.pow(player.thisInfinityTime / 100, 0.25)+1, 1).pow((timeLeaperMult()).times(player.thisInfinityTime), 1).log10())
    } else y = Decimal.max(Math.pow(player.thisInfinityTime / 2400, 0.25), 1)
  }
  if (x === 3) {
  
  }





  z = new Decimal(y).toFixed(2)
  if (check === 1) {
    return y
} else if (check === 2) {
    return z
} else throw ("Invalid check value")
}