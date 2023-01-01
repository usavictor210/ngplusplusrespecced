var FormatList = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QaDc', 'QtDc', 'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QaVg', 'QtVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg', 'UTg', 'DTg', 'TTg', 'QaTg', 'QtTg', 'SxTg', 'SpTg', 'OTg', 'NTg', 'Qd', 'UQd', 'DQd', 'TQd', 'QaQd', 'QtQd', 'SxQd', 'SpQd', 'OQd', 'NQd', 'Qi', 'UQi', 'DQi', 'TQi', 'QaQi', 'QtQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se', 'USe', 'DSe', 'TSe', 'QaSe', 'QtSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QtSt', 'SxSt', 'SpSt', 'OSt', 'NSt', 'Og', 'UOg', 'DOg', 'TOg', 'QaOg', 'QtOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Nn', 'UNn', 'DNn', 'TNn', 'QaNn', 'QtNn', 'SxNn', 'SpNn', 'ONn', 'NNn', 'Ce',];

function letter(power,str) {
    const len = str.length;
    function lN(n) {
        let result = 1;
        for (var j = 0; j < n; ++j) result = len*result+1;
        return result;
    }
    if (power <= 5) return str[0];
    power = Math.floor(power / 3);
    let i=0;
    while (power >= lN(++i));
    if (i==1) return str[power-1];
    power -= lN(i-1);
    let ret = '';
    while (i>0) ret += str[Math.floor(power/Math.pow(len,--i))%len]
    return ret;
}

function getAbbreviation(e) {
    const prefixes = [
    ['', 'U', 'D', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'O', 'N'],
    ['', 'Dc', 'Vg', 'Tg', 'Qd', 'Qi', 'Se', 'St', 'Og', 'Nn'],
    ['', 'Ce', 'Dn', 'Tc', 'Qe', 'Qu', 'Sc', 'Si', 'Oe', 'Ne']]
    const prefixes2 = ['', 'MI-', 'MC-', 'NA-', 'PC-', 'FM-']
    e = Math.floor(e/3)-1;
    let index2 = 0;
    let prefix = [prefixes[0][e%10]];
    while (e >= 10) {
        e = Math.floor(e/10);
        prefix.push(prefixes[(++index2)%3][e%10])
    }
    index2 = Math.floor(index2/3)
    while (prefix.length%3 != 0) prefix.push("");
    let ret = "";
    while (index2 >= 0) ret += prefix[index2*3] + prefix[index2*3+1] + prefix[index2*3+2] + prefixes2[index2--];
    if (ret.endsWith("-")) ret = ret.slice(0,ret.length-1)
    return ret.replace("UM","M").replace("UNA","NA").replace("UPC","PC").replace("UFM","FM")
}


const inflog = Math.log10(Number.MAX_VALUE)
function formatValue(notation, value, places, placesUnder1000) {

    if ((value <= Number.MAX_VALUE || (player.break && (player.currentChallenge == "" || !new Decimal(Number.MAX_VALUE).equals(player.challengeTarget)) )) && (value >= 1000)) {
        if (value instanceof Decimal) {
           var power = value.e
           var matissa = value.mantissa
        } else {
            var matissa = value / Math.pow(10, Math.floor(Math.log10(value)));
            var power = Math.floor(Math.log10(value));
        }
        if ((notation === "Mixed scientific" && power >= 33) || notation === "Scientific") {
            matissa = matissa.toFixed(places)
            if (matissa >= 10) {
                matissa /= 10;
                power++;
            }
            if (power > 100000  && !player.options.commas) return (matissa + "e" + formatValue(notation, power, 3, 3))
            if (power > 100000  && player.options.commas) return (matissa + "e" + power.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            return (matissa + "e" + power);
        }
        if (notation === "Infinity") {
            const pow = Decimal.log10(value)
            if (pow / inflog < 1000) var infPlaces = 4
            else var infPlaces = 3
            if (player.options.commas) return (pow / inflog).toFixed(Math.max(infPlaces, places)).toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"."+(pow / inflog).toFixed(Math.max(infPlaces, places)).toString().split(".")[1]+"∞"
            else return (pow / inflog).toFixed(Math.max(infPlaces, places))+"∞"
        }
        if (notation.includes("engineering") || notation.includes("Engineering")) pow = power - (power % 3)
        else pow = power
        if (power > 100000  && !player.options.commas) pow = formatValue(notation, pow, 3, 3)
        if (power > 100000  && player.options.commas) pow = pow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        if (notation === "Logarithm") {
            if (power > 100000  && !player.options.commas) return "ee"+Math.log10(Decimal.log10(value)).toFixed(3)
            if (power > 100000  && player.options.commas) return "e"+Decimal.log10(value).toFixed(places).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            else return "e"+Decimal.log10(value).toFixed(Math.max(places, 1))
        }

        if (notation === "Brackets") {
          var table = [")", "[", "{", "]", "(", "}"];
          var log6 = Math.LN10 / Math.log(6) * Decimal.log10(value);
          var wholePartOfLog = Math.floor(log6);
          var decimalPartOfLog = log6 - wholePartOfLog;
          //Easier to convert a number between 0-35 to base 6 than messing with fractions and shit
          var decimalPartTimes36 = Math.floor(decimalPartOfLog * 36);
          var string = "";
          while (wholePartOfLog >= 6) {
            var remainder = wholePartOfLog % 6;
            wholePartOfLog -= remainder;
            wholePartOfLog /= 6;
            string = table[remainder] + string;
          }
          string = "e" + table[wholePartOfLog] + string + ".";
          string += table[Math.floor(decimalPartTimes36 / 6)];
          string += table[decimalPartTimes36 % 6];
          return string;
        }

        matissa = (matissa * Decimal.pow(10, power % 3)).toFixed(places)
        if (matissa >= 1000) {
            matissa /= 1000;
            power++;
        }

        if (notation === "Standard" || notation === "Mixed scientific") {
            if (power <= 303) return matissa + " " + FormatList[(power - (power % 3)) / 3];
            else return matissa + " " + getAbbreviation(power);
        } else if (notation === "Mixed engineering") {
            if (power <= 33) return matissa + " " + FormatList[(power - (power % 3)) / 3];
            else return (matissa + "e" + pow);
        } else if (notation === "Engineering") {
            return (matissa + "e" + pow);
        } else if (notation === "Letters") {
            return matissa + letter(power,'abcdefghijklmnopqrstuvwxyz');
        } else if (notation === "Emojis") {
            return matissa + letter(power,['😠', '🎂', '🎄', '💀', '🍆', '👪', '🌈', '💯', '🍦', '🎃', '💋', '😂', '🌙', '⛔', '🐙', '💩', '❓', '☢', '🙈', '👍', '☂', '✌', '⚠', '❌', '😋', '⚡'])
        }

        else {
            if (power > 100000  && player.options.commas) power = power.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return "1337 H4CK3R"
        }
    } else if (value < 1000) {
        return (value).toFixed(placesUnder1000);
    } else {
        return "Infinite";
    }
}

shorten = function (money) {
  return formatValue(player.options.notation, money, 2, 2);
};

shortenCosts = function (money) {
  return formatValue(player.options.notation, money, 0, 0);
};

shortenDimensions = function (money) {
  return formatValue(player.options.notation, money, 2, 0);
};

shortenMoney = function (money) {
  return formatValue(player.options.notation, money, 2, 1);
};

function timeDisplay(time) {
  if (time <= 100) return (time/10).toFixed(3) + " seconds"
  time = Decimal.floor(time / 10)
  if (time >= 31536000) {
      return Decimal.floor(time / 31536000) + " years, " + Decimal.floor((time % 31536000) / 86400) + " days, " + Decimal.floor((time % 86400) / 3600) + " hours, " + Decimal.floor((time % 3600) / 60) + " minutes, and " + Decimal.floor(time % 60) + " seconds"
  } else if (time >= 86400) {
      return Decimal.floor(time / 86400) + " days, " + Decimal.floor((time % 86400) / 3600) + " hours, " + Decimal.floor((time % 3600) / 60) + " minutes, and " + Decimal.floor(time % 60) + " seconds"
  } else if (time >= 3600) {
      return Decimal.floor(time / 3600) + " hours, " + Decimal.floor((time % 3600) / 60) + " minutes, and " + Decimal.floor(time % 60) + " seconds"
  } else if (time >= 60) {
      return Decimal.floor(time / 60) + " minutes, and " + Decimal.floor(time % 60) + " seconds"
  } else return Decimal.floor(time % 60) + " seconds"
}

function preformat(int) {
  if (int.toString().length == 1) return "0"+int
  else return int
}


function timeDisplayShort(time) {
  if (time <= 100) return (time/10).toFixed(3) + " seconds"
  if (time <= 600) return (time/10).toFixed(2) + " seconds"
  time = Decimal.floor(time / 10)
  return preformat(Decimal.floor((time) / 3600)) + ":" + preformat(Decimal.floor((time % 3600) / 60)) + ":" + preformat(Decimal.floor(time % 60))
}

function calculateProgressBar() {
    //even more aarex code...
    document.getElementById("progressbar").className = "";
    if (document.getElementById("mdtabbtn").style.display == "inline-block") {
      doQuantumProgress();
    } else if (player.currentChallenge !== "") {
      var percentage =
        Math.min(
          (Decimal.log10(player.money.plus(1)) /
            Decimal.log10(player.challengeTarget)) *
            100,
          100
        ).toFixed(2) + "%";
      document.getElementById("progressbar").style.width = percentage;
      document.getElementById("progresspercent").textContent = percentage;
      document
        .getElementById("progresspercent")
        .setAttribute("ach-tooltip", "Percentage to challenge goal");
    } else if (!player.break) {
      var percentage =
        Math.min(
          (Decimal.log10(player.money.plus(1)) /
            Decimal.log10(Number.MAX_VALUE)) *
            100,
          100
        ).toFixed(2) + "%";
      document.getElementById("progressbar").style.width = percentage;
      document.getElementById("progresspercent").textContent = percentage;
      document
        .getElementById("progresspercent")
        .setAttribute("ach-tooltip", "Percentage to Infinity");
    } else if (player.infDimensionsUnlocked.includes(false)) {
      var percentage =
        Math.min(
          (player.money.e / Decimal.log10(getNewInfReq())) * 100,
          100
        ).toFixed(2) + "%";
      document.getElementById("progressbar").style.width = percentage;
      document.getElementById("progresspercent").textContent = percentage;
      document
        .getElementById("progresspercent")
        .setAttribute("ach-tooltip", "Percentage to the next dimension unlock");
    } else if (
      player.currentEternityChall !== "" &&
      player.infinityPoints.lt(player.eternityChallGoal.pow(2))
    ) {
      var percentage =
        Math.min(
          (Decimal.log10(player.infinityPoints.plus(1)) /
            player.eternityChallGoal.log10()) *
            100,
          100
        ).toFixed(2) + "%";
      document.getElementById("progressbar").style.width = percentage;
      document.getElementById("progresspercent").textContent = percentage;
      document
        .getElementById("progresspercent")
        .setAttribute("ach-tooltip", "Percentage to Eternity Challenge goal");
    } else if (
      player.infinityPoints.lt(Number.MAX_VALUE) ||
      player.eternities.eq(0)
    ) {
      var percentage =
        Math.min(
          (Decimal.log10(player.infinityPoints.plus(1)) /
            Decimal.log10(Number.MAX_VALUE)) *
            100,
          100
        ).toFixed(2) + "%";
      document.getElementById("progressbar").style.width = percentage;
      document.getElementById("progresspercent").textContent = percentage;
      document
        .getElementById("progresspercent")
        .setAttribute("ach-tooltip", "Percentage to Eternity");
    } else if (
      player.achievements.includes("r127") &&
      !player.achievements.includes("r128") &&
      player.timestudy.studies.length == 0
    ) {
      var percentage =
        (Decimal.log10(player.infinityPoints.plus(1)) / 220).toFixed(2) + "%";
      document.getElementById("progressbar").style.width = percentage;
      document.getElementById("progresspercent").textContent = percentage;
      document
        .getElementById("progresspercent")
        .setAttribute(
          "ach-tooltip",
          'Percentage to "What do I have to do to get rid of you"'
        );
    } else if (
      player.dilation.studies.includes(5) &&
      player.dilation.active &&
      !player.achievements.includes("r138") &&
      player.timestudy.studies.length == 0
    ) {
      var percentage =
        Math.min(
          Decimal.log10(player.infinityPoints.plus(1)) / 200,
          100
        ).toFixed(2) + "%";
      document.getElementById("progressbar").style.width = percentage;
      document.getElementById("progresspercent").textContent = percentage;
      document
        .getElementById("progresspercent")
        .setAttribute(
          "ach-tooltip",
          'Percentage to "This is what I have to do to get rid of you."'
        );
    } else if (
      player.dilation.active &&
      player.dilation.totalTachyonParticles.gte(getDilGain())
    ) {
      var percentage =
        (
          getDilGain().log10() / player.dilation.totalTachyonParticles.log10()
        ).toFixed(2) + "%";
      document.getElementById("progressbar").style.width = percentage;
      document.getElementById("progresspercent").textContent = percentage;
      document
        .getElementById("progresspercent")
        .setAttribute(
          "ach-tooltip",
          "Percentage to the requirement for Tachyon Particle gain"
        );
    } else if (
      player.eternityPoints.gte(Decimal.pow(2, 262144)) && // 2^262144 = 1.6e78913 EP
      document.getElementById("mdtabbtn").style.display == "block"
    )
      doQuantumProgress();
    else {
      var gepLog = gainedEternityPoints().log2();
      var goal = Math.pow(2, Math.ceil(Math.log10(gepLog) / Math.log10(2)));
      if (
        goal > 262144 &&
        player.meta &&
        !player.achievements.includes("r143")
      ) {
        goal = Decimal.sub("1e40000", player.eternityPoints).log2();
        var percentage = Math.min((gepLog / goal) * 100, 100).toFixed(2) + "%";
        document.getElementById("progressbar").style.width = percentage;
        document.getElementById("progresspercent").textContent = percentage;
        document
          .getElementById("progresspercent")
          .setAttribute(
            "ach-tooltip",
            'Percentage to "In the grim darkness of the far endgame"'
          );
      } else if (goal > 512 && !player.achievements.includes("r127")) {
        goal = Decimal.sub(Number.MAX_VALUE, player.eternityPoints).log2();
        var percentage = Math.min((gepLog / goal) * 100, 100).toFixed(2) + "%";
        document.getElementById("progressbar").style.width = percentage;
        document.getElementById("progresspercent").textContent = percentage;
        document
          .getElementById("progresspercent")
          .setAttribute(
            "ach-tooltip",
            'Percentage to "But I wanted another prestige layer..."'
          );
      } else {
        var percentage = Math.min((gepLog / goal) * 100, 100).toFixed(2) + "%";
        document.getElementById("progressbar").style.width = percentage;
        document.getElementById("progresspercent").textContent = percentage;
        document
          .getElementById("progresspercent")
          .setAttribute(
            "ach-tooltip",
            "Percentage to gaining " +
              shortenDimensions(Decimal.pow(2, goal)) +
              " EP"
          );
      }
    }
  }

  // aarex's information code
  function updateStatisticsText() {
  if (player.money.gt(Decimal.pow(10, (3 * 86400 * 365.2425 * 79.3) / 10))) {
    var years = player.money.log10() / 3 / 86400 / 365.2425;
    if (years > 2022) {
      var eventBC = years - 2021;
      var since;
      if (eventBC > 5.332e6) {
        since = "???";
        eventBC = 1 / 0 - eventBC;
      } else if (eventBC > 3.5e6) {
        since = "end of the Pliocene epoch";
        eventBC = 5.332e6 - eventBC;
      } else if (eventBC > 2.58e6) {
        since = "birthdate of Lucy (typical Australopithicus afarensis female)";
        eventBC = 3.5e6 - eventBC;
      } else if (eventBC > 7.81e5) {
        since = "the end of the Quaternary period";
        eventBC = 258e4 - eventBC;
      } else if (eventBC > 3.15e5) {
        since = "the end of the Calabrian age";
        eventBC = 7.81e5 - eventBC;
      } else if (eventBC > 2.5e5) {
        since = "emergence of Homo sapiens";
        eventBC = 3.15e5 - eventBC;
      } else if (eventBC > 1.95e5) {
        since = "emergence of Homo neanderthalensis";
        eventBC = 25e4 - eventBC;
      } else if (eventBC > 1.6e5) {
        since = "emergence of anatomically modern humans";
        eventBC = 195e3 - eventBC;
      } else if (eventBC > 1.25e5) {
        since = "emergence of Homo sapiens idaltu";
        eventBC = 16e4 - eventBC;
      } else if (eventBC > 7e4) {
        since = "peak of the Eemian interglacial period";
        eventBC = 125e3 - eventBC;
      } else if (eventBC > 6.7e4) {
        since = "earliest abstract/symbolic art";
        eventBC = 7e4 - eventBC;
      } else if (eventBC > 5e4) {
        since = "Upper Paleolithic/Old Stone Age";
        eventBC = 67e3 - eventBC;
      } else if (eventBC > 4.5e4) {
        since = "Late Stone Age";
        eventBC = 5e4 - eventBC;
      } else if (eventBC > 4e4) {
        since = "European early modern humans";
        eventBC = 45e3 - eventBC;
      } else if (eventBC > 3.5e4) {
        since = "first human settlement";
        eventBC = 4e4 - eventBC;
      } else if (eventBC > 3.3e4) {
        since = "oldest known figurative art";
        eventBC = 35e3 - eventBC;
      } else if (eventBC > 3.1e4) {
        since = "oldest known domesticated dog";
        eventBC = 33e3 - eventBC;
      } else if (eventBC > 2.9e4) {
        since = "Last Glacial Maximum";
        eventBC = 31e3 - eventBC;
      } else if (eventBC > 2.8e4) {
        since = "oldest ovens";
        eventBC = 29e3 - eventBC;
      } else if (eventBC > 2.5e4) {
        since = "oldest known twisted rope";
        eventBC = 28e3 - eventBC;
      } else if (eventBC > 2e4) {
        since =
          "oldest human permanent settlement (hamlet considering to be built of rocks and of mammoth bones)";
        eventBC = 25e3 - eventBC;
      } else if (eventBC > 16e3) {
        since = "rise of Kerberan culture";
        eventBC = 2e4 - eventBC;
      } else if (eventBC > 15e3) {
        since = "colonization of North America";
        eventBC = 16e3 - eventBC;
      } else if (eventBC > 14e3) {
        since = "domestication of the pig";
        eventBC = 15e3 - eventBC;
      } else if (eventBC > 11600) {
        since = "earliest signs of prehistoric warfare";
        eventBC = 14e3 - eventBC;
      } else if (eventBC > 1e4) {
        since = "end of the Holocene epoch";
        eventBC = 11600 - eventBC;
      } else if (eventBC > 8e3) {
        since = "death of other human species";
        eventBC = 1e4 - eventBC;
      } else if (eventBC > 6e3) {
        since = "agricultural revolution";
        eventBC = 8e3 - eventBC;
      } else if (eventBC > 5e3) {
        since = "farmers arrived in Europe";
        eventBC = 6e3 - eventBC;
      } else if (eventBC > 4e3) {
        since = "first metal tools (of lead and copper)";
        eventBC = 5e3 - eventBC;
      } else if (eventBC > 3200) {
        since = "first domesticated horse";
        eventBC = 4e3 - eventBC;
      } else if (eventBC > 3e3) {
        since = "Sumerian cuneiform writing system";
        eventBC = 3200 - eventBC;
      } else if (eventBC > 2600) {
        since = "union of Egypt";
        eventBC = 3e3 - eventBC;
      } else if (eventBC > 2500) {
        since = "rise of Maya";
        eventBC = 2600 - eventBC;
      } else if (eventBC > 2300) {
        since = "extinction of mammoths";
        eventBC = 2500 - eventBC;
      } else if (eventBC > 1800) {
        since = "rise of the Akkadian Empire";
        eventBC = 2300 - eventBC;
      } else if (eventBC > 1175) {
        since = "first alphabetic writing";
        eventBC = 1800 - eventBC;
      } else if (eventBC > 1400) {
        since = "rise of the Olmec civilization";
        eventBC = 1400 - eventBC;
      } else if (eventBC > 800) {
        since = "end of the Bronze Age";
        eventBC = 1175 - eventBC;
      } else if (eventBC > 753) {
        since = "rise of Greek city-states";
        eventBC = 800 - eventBC;
      } else if (eventBC > 653) {
        since = "rise of Rome";
        eventBC = 753 - eventBC;
      } else if (eventBC > 539) {
        since = "rise of the Persian Empire";
        eventBC = 653 - eventBC;
      } else if (eventBC > 356) {
        since = "fall of the Babylonian Empire";
        eventBC = 539 - eventBC;
      } else if (eventBC > 200) {
        since = "birth of Alexander the Great";
        eventBC = 356 - eventBC;
      } else if (eventBC > 4) {
        since = "invention of paper";
        eventBC = 200 - eventBC;
      } else {
        since = "birth of Jesus Christ";
        eventBC = 4 - eventBC;
      }
      var message =
        "<br>If you ended the non-stop writing of your full antimatter amount with 3 digits per second right now, it would have started in " +
        formatInfOrEter(Math.floor(years - 2022)) +
        " BC." +
        (since == "???"
          ? ""
          : "<br>(around " +
            formatInfOrEter(Math.ceil(eventBC)) +
            " years since the " +
            since +
            ")");
    } else {
      var message =
        "<br>If you started writing 3 digits of your full antimatter amount a second down when you were an American baby,<br> it would ";
      if (years > 79.3)
        message +=
          "take up " +
          (((years - 79.3) / years) * 100).toFixed(3) +
          "% of the average lifespan (of another life).";
      else
        message +=
          "take up " +
          (years / 0.793).toFixed(3) +
          "% of the average lifespan. (79.3 years as of 2018)";
    }
    document.getElementById("infoScale").innerHTML = message;
  } else if (player.money.gt(new Decimal("1e100000")))
    document.getElementById("infoScale").innerHTML =
      "<br>If you wrote 3 digits of your antimatter amount every second (with no breaks), it would take you <br>" +
      timeDisplay((player.money.log10() * 10) / 3) +
      "<br> to write down your antimatter amount.";
  else {
    var scale1 = [
      2.82e-45,
      1e-42,
      7.23e-30,
      5e-21,
      9e-17,
      6.2e-11,
      5e-8,
      3.555e-6,
      7.5e-4,
      1,
      2.5e3,
      2.6006e6,
      3.3e8,
      5e12,
      4.5e17,
      1.08e21,
      1.53e24,
      1.41e27,
      5e32,
      8e36,
      1.7e45,
      1.7e48,
      3.3e55,
      3.3e61,
      5e68,
      1e73,
      3.4e80,
      1e113,
      Number.MAX_VALUE,
      new Decimal("1e65000")
    ];
    var scale2 = [
      " protons.",
      " nucleui.",
      " Hydrogen atoms.",
      " viruses.",
      " red blood cells.",
      " grains of sand.",
      " grains of rice.",
      " teaspoons.",
      " wine bottles.",
      " fridge-freezers.",
      " Olympic-sized swimming pools.",
      " Great Pyramids of Giza.",
      " Great Walls of China.",
      " large asteroids.",
      " dwarf planets.",
      " Earths.",
      " Jupiters.",
      " Suns.",
      " red giants.",
      " hypergiant stars.",
      " nebulas.",
      " Oort clouds.",
      " Local Bubbles.",
      " galaxies.",
      " Local Groups.",
      " Sculptor Voids.",
      " observable universes.",
      " Dimensions.",
      " Infinity Dimensions.",
      " Time Dimensions."
    ];
    var id = 0;
    if (player.money.times(4.22419e-105).gt(2.82e-45)) {
      if (player.money.times(4.22419e-105).gt(scale1[scale1.length - 1]))
        id = scale1.length - 1;
      else {
        while (player.money.times(4.22419e-105).gt(scale1[id])) id++;
        if (id > 0) id--;
      }
      if (id >= 7 && id < 11)
        document.getElementById("infoScale").textContent =
          "If every unit of antimatter were a planck volume, you would have enough to fill " +
          formatValue(
            player.options.notation,
            (player.money * 4.22419e-105) / scale1[id],
            2,
            1
          ) +
          scale2[id];
      else
        document.getElementById("infoScale").textContent =
          "If every unit of antimatter were a planck volume, you would have enough to make " +
          formatValue(
            player.options.notation,
            player.money.times(4.22419e-105).dividedBy(scale1[id]),
            2,
            1
          ) +
          scale2[id];
    } else {
      //does this part work correctly? i doubt it does
      if (player.money.times(1e-54) < 2.82e-45)
        document.getElementById("infoScale").textContent =
          "If every unit of antimatter were " +
          formatValue(
            player.options.notation,
            2.82e-45 / 1e-54 / player.money,
            2,
            1
          ) +
          " attometers cubed, you would have enough to make a proton.";
      else if (player.money * 1e-63 < 2.82e-45)
        document.getElementById("infoScale").textContent =
          "If every unit of antimatter were " +
          formatValue(
            player.options.notation,
            2.82e-45 / 1e-63 / player.money,
            2,
            1
          ) +
          " zeptometers cubed, you would have enough to make a proton.";
      else if (player.money * 1e-72 < 2.82e-45)
        document.getElementById("infoScale").textContent =
          "If every unit of antimatter were " +
          formatValue(
            player.options.notation,
            2.82e-45 / 1e-72 / player.money,
            2,
            1
          ) +
          " yoctometers cubed, you would have enough to make a proton.";
      else
        document.getElementById("infoScale").textContent =
          "If every unit of antimatter were " +
          formatValue(
            player.options.notation,
            2.82e-45 / 4.22419e-105 / player.money,
            2,
            1
          ) +
          " planck volumes, you would have enough to make a proton.";
      }
    }
  }

function fromValue(value) {
  value = value.replace(/,/g, "");
  if (
    value.toUpperCase().split("E").length > 2 &&
    value.split(" ")[0] !== value
  ) {
    var temp = new Decimal(0);
    temp.mantissa = parseFloat(value.toUpperCase().split("E")[0]);
    temp.exponent = parseFloat(
      value.toUpperCase().split("E")[1] +
        "e" +
        value.toUpperCase().split("E")[2]
    );
    value = temp.toString();
  }
  if (value.includes(" ")) {
    const prefixes = [
      ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"],
      ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"],
      ["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]
    ];
    const prefixes2 = ["", "MI", "MC", "NA", "PC", "FM", " "];
    let e = 0;
    let m, k, l;
    if (value.split(" ")[1].length < 5) {
      for (l = 101; l > 0; l--) {
        if (value.includes(FormatList[l])) {
          e += l * 3;
          console.log("caught!" + l);

          break;
        }
      }
      return Decimal.fromMantissaExponent(parseInt(value.split(" ")[0]), e);
    }
    for (let i = 1; i < 5; i++) {
      if (value.includes(prefixes2[i])) {
        m = value.split(prefixes2[i])[1];
        for (k = 0; k < 3; k++) {
          for (l = 1; l < 10; l++) {
            if (m.includes(prefixes[k][l])) break;
          }
          if (l != 10) e += Math.pow(10, k) * l;
        }
        break;
      }
      return Decimal.fromMantissaExponent(value.split, e * 3);
    }
    for (let i = 1; i <= 5; i++) {
      if (value.includes(prefixes2[i])) {
        for (let j = 1; j + i < 6; j++) {
          if (value.includes(prefixes2[i + j])) {
            m = value.split(prefixes2[i + j])[1].split(prefixes2[i])[0];
            if (m == "") e += Math.pow(1000, i);
            else {
              for (k = 0; k < 3; k++) {
                for (l = 1; l < 10; l++) {
                  if (m.includes(prefixes[k][l])) break;
                }
                if (l != 10) e += Math.pow(10, k + i * 3) * l;
              }
            }
            break;
          }
        }
      }
    }
    return Decimal.fromMantissaExponent(parseFloat(value), i * 3 + 3);
    //return parseFloat(value) + "e" + (e*3+3)
  }
  if (!isFinite(parseFloat(value[value.length - 1]))) {
    //needs testing
    const l = " abcdefghijklmnopqrstuvwxyz";
    const v = value.replace(parseFloat(value), "");
    let e = 0;
    for (let i = 0; i < v.length; i++) {
      for (let j = 1; j < 27; j++) {
        if (v[i] == l[j]) e += Math.pow(26, v.length - i - 1) * j;
      }
    }
    return Decimal.fromMantissaExponent(parseFloat(value), e * 3);
    //return parseFloat(value) + "e" + (e*3)
  }
  value = value.replace(",", "");
  if (value.split("e")[0] === "")
    return Decimal.fromMantissaExponent(
      Math.pow(10, parseFloat(value.split("e")[1]) % 1),
      parseInt(value.split("e")[1])
    );
  return Decimal.fromString(value);
}