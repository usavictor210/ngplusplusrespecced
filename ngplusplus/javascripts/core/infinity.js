function getInfinitiedGain() {
  let infGain = 1;
  if (player.thisInfinityTime > 50 && player.achievements.includes("r87")) {
      infGain = 250;
  }
  player.timestudy.studies.includes(32) ? infGain *= Math.max(player.resets, 1) : infGain = infGain
  player.achievements.includes("r133") ? infGain *= Math.max(1, Math.floor(player.dilation.dilatedTime.pow(0.25).toNumber())) : infGain = infGain
  player.achievements.includes("r156") ? infGain *= Math.max(1, Math.floor(Math.log10(player.eternities/250)**0.8)) : infGain = infGain
  return infGain
}

function getAntimatterOnReset() {
let tier = 0
let antimatter = [10, 100, 1000, 2e5, 1e10, 1e25]
  if (player.challenges.includes("challenge1")) tier = 1
  if (player.achievements.includes("r37")) tier = 2
  if (player.achievements.includes("r54")) tier = 3
  if (player.achievements.includes("r55")) tier = 4
  if (player.achievements.includes("r78")) tier = 5
return new Decimal (antimatter[tier])
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
      "<br>+" + shortenDimensions(getInfinitiedGain()) + " infinities"
}