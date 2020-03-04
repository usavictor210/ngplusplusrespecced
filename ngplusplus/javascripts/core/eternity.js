function calculateEternitiedGain() {
let base = 1
if (player.dilation.upgrades.includes(12)) base = base * Math.floor(Decimal.pow(player.dilation.dilatedTime, 0.1).toNumber()) // If you have eternities and DT power up each other (x^0.1)
if (player.achievements.includes("r155")) base = base*100 // If you have Sub-atomic (x100 eternitied stat gain)
return base // grand total
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

function updateEternityButton() { //updates the eternity button based on your eternities and EP gained on eternity
var currentEPmin = gainedEternityPoints().dividedBy(
  player.thisEternity / 600
);
var EPminpeak = new Decimal(0);
if (currentEPmin.gt(EPminpeak) && player.infinityPoints.gte(Number.MAX_VALUE))
    EPminpeak = currentEPmin;
  document.getElementById("eternitybtn").innerHTML =
    player.eternities == 0
      ? "Other times await.. I need to become Eternal"
      : "<b>I need to become Eternal.</b><br>" +
        "Gain <b>" +
        shortenDimensions(gainedEternityPoints()) +
        "</b> Eternity points.<br>" +
        shortenDimensions(currentEPmin) +
        " EP/min<br>Peaked at " +
        shortenDimensions(EPminpeak) +
        " EP/min";
  if (gainedEternityPoints().gte(1e6) && !(gainedEternityPoints().gte(new Decimal("1e100000")))) {
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
      "</b> Eternity points.<br>" + "+"
      + shortenDimensions(calculateEternitiedGain()) + " eternities"
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