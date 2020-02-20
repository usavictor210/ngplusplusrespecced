let prevMoney = new Decimal(10);
let simulation = null;
let notSoFast = 100;

function doShit () {
    document.getElementById('softReset').onclick();
    let newMoney = player.money;
    if (newMoney.lt(100)) {
      simulation = null;
    }
    for (let i = 8; i > 0; i--) {
      buyManyDimensionAutobuyer(i, 1000);
    }
    for (let i = 8; i > 0; i--) {
      if (player[TIER_NAMES[i] + 'Amount'].lt(10)) {
        buyOneDimension(i);
      }
    }
    buyMaxTickSpeed();
    let ratio = newMoney.div(prevMoney);
    notSoFast--;
    if (simulation === null) {
      if (ratio.gt(1) && ratio.lt(1.5) && notSoFast < 0) {
        console.log('ratio info = ', ratio, newMoney, prevMoney);
        simulation = 'minute';
        notSoFast = 100;
      }
    } else if (simulation === 'minute') {
      if (ratio.gt(1) && ratio.lt(1.5) && notSoFast < 0) {
        console.log('ratio info = ', ratio, newMoney, prevMoney);
        simulation = 'hour';
        notSoFast = 100;
      }
      simulateTime(60);
    } else if (simulation === 'hour') {
      simulateTime(3600);
    }
    prevMoney = newMoney;
}


document.getElementById("offlineprogress").style.visibility = 'hidden';

setInterval(doShit, 1000);
