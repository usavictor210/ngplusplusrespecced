var newsArray;
// how to make a proper news ticker: ["x", 'y', "z"] (x is the news ticker itself, y is the condition to show it, and z is the "id")
function updateNewsArray() {
  newsArray = [
    //always true
    ["The cookie is a lie.", true, "a1"],
    [
      "Antimatter cookies have been confirmed to not exist; whoever claims that, stop.",
      true,
      "a4"
    ],
    [
      "Antimatter ghosts do not exist. Just like matter ghosts. They don't have any matter, for that matter.",
      true,
      "a2"
    ],
    [
      "Nuclear power plants have been abandoned in favor of antimatter power.",
      true,
      "a3"
    ],
    [
      "Antimatter prices have drastically dropped due to newfound abundance.",
      true,
      "a5"
    ],
    [
      "In the news today, humans make an antimatter animal sacrifice to the antimatter god.",
      true,
      "a6"
    ],
    ["You made one antimatter! Whatever that means.", true, "a7"],
    [
      "Scientists confirm that the colour of antimatter is Blurple.",
      true,
      "a11"
    ],
    ["How does it matter if its antimatter?", true, "a10"],
    ["None of this matters.", true, "a9"],
    ["IN THE END, IT DOESN'T ANTIMATTER - Hevipelle", true, "a8"],
    ["How does NASA organise a party? They planet.", true, "a12"],
    [
      "Electrons are now seeing the happy things in life. We're calling these happy electrons 'Positrons.' Wait, that's taken?",
      true,
      "a13"
    ],
    [
      "This completely useless sentence will get you nowhere and you know it. What a horrible obnoxious man would come up with it, he will probably go to hell, and why would the developer even implement it? Even if you kept reading it you wouldn't be able to finish it (the first time).",
      true,
      "a14"
    ],
    ["'GHOST SAYS HELLO' - Boo-chan", true, "a15"],
    ["Can someone tell hevi to calm down? - Mee6", true, "a16"],
    [
      "Due to Antimatter messing with physics, a creature that was once a moose is now a human.",
      true,
      "a17"
    ],
    ["!hi", true, "a18"],
    ["'Alright' - Alright", true, "a19"],
    ["The English greeting is not present in Antimatter speak.", true, "a20"],
    ["To buy max or not to buy max, that is the question.", true, "a21"],
    ["Sorry. It seems the news ticker that was supposed to be here is now missing. I'm trying to find the new one right now... uh... Ok! I'm sure I found the next one.", true, "a22"],
    ["No, mom, I can't pause this game.", true, "a23"],
    ["Scientific notation has entered the battlefield.", true, "a24"],
    ["Make the Universe Great Again! - Tronald Dump", true, "a25"],
    ["#dank-maymays", true, "a26"],
    [
      "A new religion has been created, and it's spreading like wildfire. The believers of this religion worship the Heavenly Pelle, the goddess of antimatter. They also believe that 10^308 is infinite.",
      true,
      "a27"
    ],
    [
      "Someone has just touched a blob, and blown up. Was the blob antimatter, or was the guy made of Explodium?",
      true,
      "a28"
    ],
    [
      "If you are not playing on Kongregate or ivark.github.io, the site is bootleg.",
      true,
      "a29"
    ],
    [
      "Rate the original game 5 on Kongregate so more people can experience this 5 star Rating.",
      true,
      "a30"
    ],
    ["BOO!", true, "a31"],
    ["\"You ate for too long.\" - Hevipelle", true, "a32"],
    ["\"I hate myself.\" -Boo-chan", true, "a33"],
    ["\"Gee golly\" - Xandawesome", true, "a34"],
    ["Above us, there is nothing above, but the stars, above.", true, "a35"],
    ["\"QUOTE MISSING\" - Anonymous", true, "a36"],
    ["Somebody wasn't nice, he got an antimatter-storm.", true, "a37"],
    [
      "You are living, you occupy space, you have a mass, you matter... unless you antimatter.",
      true,
      "a38"
    ],
    ["I clicked too fast... my PC is now dematerialised.", true, "a39"],
    [
      "If an alien lands on your front lawn and extends an appendage as a gesture of greeting, before you get friendly, toss it an eightball. If the appendage explodes, then the alien was probably made of antimatter. If not, then you can proceed to take it to your leader. -Neil deGrasse Tyson",
      true,
      "a40"
    ],
    [
      "There always must be equal matter than there is antimatter, I guess your mom balances that a bit",
      true,
      "a41"
    ],
    ["Nothing is created, nothing is destroyed.", true, "a42"],
    [
      "We dug a big hole to store this antimatter... Adele's rolling in it.",
      true,
      "a43"
    ],
    ["If everything is antimatter, how can you see yourself?", true, "a44"],
    [
      "The stock markets have crashed due to antimatter beings somehow knowing what they will be tomorrow.",
      true,
      "a45"
    ],
    ["My dog ate too much antimatter, now he is doing 'meow!'", true, "a46"],
    [
      "If you put infinity into your calculator, it will result in 42!",
      true,
      "a47"
    ],
    [
      "You have found the rarest antimatter pepe, it's ultra rare!",
      true,
      "a48"
    ],
    [
      "Can we get 1e169 likes on this video??? Smash that like button!!",
      true,
      "a49"
    ],
    [
      "The smell of antimatter has been revealed. It smells like kittens",
      true,
      "a50"
    ],
    ["Just another antimatter in the wall", true, "a51"],
    ["GET SNIPED, WEAKLING", true, "a52"],
    ["\"Thanks a lot\" - dankesehr", true, "a53"],
    [
      "This world situation is a SOS situation to the world!! MAYDAY, MAYDAY!!",
      true,
      "a54"
    ],
    [
      "\"As for sure as the sun rises in the west, of all the singers and poets on earth, I am the bestest.\" - Hevipelle",
      true,
      "a55"
    ],
    ["\"I'm good at using github\" - Hevipelle", true, "a56"],
    [
      "A new chat server has been created for Antimatter people to spy on Matter people, and the world has fallen into chaos and discord",
      true,
      "a57"
    ],
    [
      "A new study has come out linking the consumption of potatoes with increased risk of Antimatter implosion.  Scientists suggest eating more.",
      true,
      "a58"
    ],
    [
      "\"I thought that I fixed that bug, but apparently some update broke it again\" - Hevipelle",
      true,
      "a59"
    ],
    ["\"Maybe I'm gay then\" - Bootato", true, "a60"],
    [
      "Breaking news! Hevipelle has just announced that the buy max button is in fact going to be removed!",
      true,
      "a61"
    ],
    ["\"I dedicate this game to my girlfriend\" - Hevipelle", true, "a62"],
    [
      "Antimatter guns don't kill antimatter people, antimatter people kill antimatter people, but does that mean that an antimatter toaster doesn't toast antimatter toasts, and antimatter toast toasts antimatter toasts?",
      true,
      "a63"
    ],
    [
      "But to an antimatter person, wouldn't they be matter and us antimatter?",
      true,
      "a64"
    ],
    ["And nothing Antimatters", true, "a65"],
    [
      "School starting up strikes fear in students universe-wide, as schools are no longer segregated between Matter and Antimatter. Annihilation is prominent.",
      true,
      "a66"
    ],
    ["Why does no one talk about the 0th dimension?", true, "a67"],
    ["The fatter catter satter on the antimatter.", true, "a68"],
    ["Who let the DOgs out?", true, "a69"],
    ["If you can't read this, you disabled the news.", true, "a70"],
    [
      "Doesn't leave, just mutes the server so he doesn't receive notifications.",
      true,
      "a71"
    ],
    [
      "\"Most quotes found online are falsely atributed\" - Abraham Lincoln",
      true,
      "a72"
    ],
    ["\"It should work now, but it doesn't.\" - Hevipelle", true, "a73"],
    [
      "This game doesn't have any errors... they're alternative successes.",
      true,
      "a74"
    ],
    [
      "A third type of matter has been discovered: null matter. It doesn't do anything and is basically useless. The scientists who discovered it were fired.",
      true,
      "a75"
    ],
    [
      "Your Mother-in-Law keeps nagging you about all these antimatter colliders.",
      true,
      "a76"
    ],
    ["If matter exists, then does antimatter not exist?", true, "a77"],
    [
      "Antimatter = Life. Not cobblestone, not dirt, nothing like that. Antimatter.",
      true,
      "a78"
    ],
    ["Breaking News: Error Error Error", true, "a79"],
    [
      "How much antiwood could an antiwoodchuck chuck if an antiwoodchuck could chuck antiwood?",
      true,
      "a80"
    ],
    ["Chaos isn't a pit, chaos is a matter.", true, "a81"],
    [
      "\"That's because I'm a good game developer and pushed some code that totally works.\" - Hevipelle",
      true,
      "a82"
    ],
    ["What's the matter with anti matter?", true, "a83"],
    ["Doesn't it annoy you when people don't finish their", true, "a84"],
    ["Don't anti-quote me on this.", true, "a85"],
    ["Antimatter is honest, matter makes up everything.", true, "a86"],
    [
      "According to no known laws of aviation, there are multiple ways a bee should be able to be swallowed up by antimatter.",
      true,
      "a87"
    ],
    [
      "You either die as matter or live long enough to be consumed by the antimatter, and then die again.",
      true,
      "a88"
    ],
    [
      "If you gaze long enough into the antimatter, the antimatter gazes back into you.",
      true,
      "a89"
    ],
    [
      "\"Always gonna give you up. Always gonna let you down.\" - Anti-Rick Astley",
      true,
      "a90"
    ],
    [
      "Antimatter Dimensions: The next update is always 5 hours away. Always.",
      true,
      "a91"
    ],
    ["This news ticker has been replaced by an elephant. The elephant in the room is about wondering where it came from.", true, "a92"],
    [
      "Do antimatter people with suicidal thoughts get depressants?",
      true,
      "a93"
    ],
    ["To matter or to antimatter, that is the question.", true, "a94"],
    ["Why is everything so Hevi?", true, "a95"],
    [
      "It has been scientifically proven ages ago, that cats made of matter are assholes. We have good news, because cats made of antimatter are still assholes.",
      true,
      "a96"
    ],
    ["Nobody once told me the anti-world wasn’t gonna roll me", true, "a97"],
    [
      "Antimatter is like internet. If you're reading this, you can't have enough of it.",
      true,
      "a98"
    ],
    [
      "\"Antimatter has made time travel possible and I'm here to make the past great again.\" - 2nd President of the World",
      true,
      "a99"
    ],
    [
      "Please insert Disc -1 to continue playing Antimatter Dimensions ™.",
      true,
      "a100"
    ],
    ["Lore - coming soon ™", true, "a101"],
    [
      "I was a part of antimatter like you once... But then I got matter in my knee.",
      true,
      "a101"
    ],
    [
      "Antimatter... antimatter never changes... until you get to quantum physics of antimatter, but we don't have enough tachyon particles for that.",
      true,
      "a102"
    ],
    [
      "There is no war in Antimatter Dimensions. Here we are safe. Here we are free.",
      true,
      "a103"
    ],
    [
      "Antimatter has solved global warming. In unrelated news, the Earth no longer exists.",
      true,
      "a104"
    ],
    [
      "Anti-water, anti-Earth, anti-fire, anti-air. Long ago, the four anti-nations lived together in harmony. Then, everything changed when the anti-Fire Nation attacked. Only the anti-Avatar, the master of all 4 anti-elements could bring balance to the anti-world, but when the world needed him most, he accidentally touched some regular matter and exploded.",
      true,
      "a105"
    ],
    [
      "If you open an anti-lootbox, are you selling random possessions for in-game currency?",
      true,
      "a106"
    ],
    ["People are beginning to question Hevipelle's existence.", true, "a107"],
    [
      "Antimatter Dimensions is proud to be sponsored by Lehmä! Now offering - grass eating lessons! Learn what grass is safe to eat and what grass isn't.",
      true,
      "a108"
    ],
    [
      "It is the year 2422. The update still isn't out. Hevi is working on balancing unfunity dimension dimensions and challenges for the 38th layer of prestige. There are over 100 rows of achievements. They're getting ready to start using breaking_breaking_breaking_infinity.js",
      true,
      "a109"
    ],
    ["Import Christmas for a secret theme", true, "a110"],
    [
      "What the f*ck did you just f*cking say about me, you little b*tch? I’ll have you know I graduated top of my class in the Antimatter Seals, and I’ve been involved in numerous secret raids on the 9th Dimension, and I have over 300 NNnNeMI-NNnNe confirmed kills. I am trained in potato warfare and I’m the top sniper in the entire Antimatter Galactic armed forces. You are nothing to me but just another infinity. I will wipe you the f*ck out with Max All mashing the likes of which has never been seen before in this dimension, mark my f*cking words. You think you can get away with saying that shit to me over the Interdimensional network? Think again, f*cker. As we speak I am contacting my secret network of autobuyers across the galaxy and your IP is being traced right now so you better prepare for the Big Crunch, maggot. The Big Crunch that wipes out the pathetic little thing you call your life. You’re f*cking dead, kid. I can be anywhere, anytime, and I can kill you in over seven 😠💩 different ways, and that’s just with my mouse. Not only am I extensively trained in dimension shift combat, but I have access to the entire arsenal of the Antimatter Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the universe, you little shit. If only you could have known what unhevi retribution your little “clever” comment was about to bring down upon you, maybe you would have held your f*cking tongue. But you couldn’t, you didn’t, and now you’re buying until 10, you goddamn idiot. I will shit antimatter shit all over you and you will drown in it. You’re f*cking dead, kiddo.",
      true,
      "a111"
    ],
    [
      "So I've pondered this question for a long time. Antimatter Dimensions... what does it mean? I mean it's a game, that's clear. You buy the first dimension, and it gives you antimatter, and the second dimension provides more first dimensions and so on... But what does it mean? It can't just be a game, it seems too plain for that. The developer must have made it as a metaphor. I was doing my weekly ritual of using the fingernail clipper to cut my pubic hair, when finally the realization came to me. The dimensions are just thinly veiled misspellings of the word 'depression'. Regular matter are the cruel and negative thoughts that add to and fuel depression, while antimatter is the positive thoughts and good friends that dispel it. You start off with something simple, and it fights almost imperceptibly against the depression, but as you keep going the fight builds. But it never seems to fix everything. The depression seems like it could go on to infinity. So you keep going. But eventually, you figure out, depression isn't infinite. It's just very very large. But your 'dimensions' eventually, with enough work, make enough 'antimatter' to usurp that seeming infinity of depression. Then the possibilities are endless. You are actually happy for once, and your happiness grows exponentially as you go beyond and seemingly 'break' the 'infinity' of depression. And you go on until that 'infinity' seems tiny in comparison to the happiness you've managed to achieve in your life, where if you reset you get over that infinity in less than the blink of an eye. If you want to know what the multiple layers of prestige are...'Dimensional Shifts' are getting new things and methods to give you happiness. 'Dimension Boosts' are upgrading the things and methods. Examples would be getting a new car being a 'Dimensional Shift' and trading that car in for a new one would be a 'Dimensional Boost'. 'Eternities' are major tragedies such as a loved one dying. That lapse brings you straight back to the beginning, with seemingly no hope of return. But with time, you grow back stronger and happier than ever before. 'Dimensional Sacrifice' is moving away. You have to give up a lot of the things you had that made you happy, but there is new opportunity in where you move to. And that new opportunity gives you more happiness than you ever had. 'Tickspeed' is how easy it is to make you happy, and 'Time Dimensions' make it even easier to be happy. Antimatter Dimensions is a metaphor for a depressed man's successful battle against his illness.",
      true,
      "a112"
    ],
    [
      "(Make me sleep) Put me to sleep inside. (I can't sleep) Put me to sleep inside. (Leave me) Whisper my name and give me to the dark. (Make me sleep) Bid my milk to stay. (I can't fall asleep) Before I become done. (Leave me) Leave me to the nothing I've become.",
      true,
      "a113"
    ],
    [
      "A preview of the next update - loot boxes! Feel a sense of pride and progression as you open cosmic, galactic, and universal lootboxes for chances at rare skins, unique challenges with uniquer rewards, time skips and even new dimensions!",
      true,
      "a114"
    ],
    [
      "The intent of dimensions is to give a sense of pride and accomplishment.",
      true,
      "a115"
    ],
    ["Refreshing cures cancer.", true, "a116"],
    [
      "I have a 9th, I have a dimension... UHH... IT DOESN'T EXIST!",
      true,
      "a117"
    ],
    [
      "Since when did we start reporting stuff like this? Half of it isn't even proper news, it's just jokes and meta-references, it doesn't even make sens- HAHAHA DISREGARD THAT I SUCK CO-",
      true,
      "a118"
    ],
    [
      "The year is 1944. Hevipelle can't release updates for AD because he doesn't exist.",
      true,
      "a119"
    ],
    ['"THAT DIMENSION DOESN\'T EXIST" -GhostBot', true, "a120"],
    [
      "Most things you know as nuts are actually Drupe seeds or Legumes. Hevipelle on the other hand is quite crazy and can thus be considered a dry uncompartmented fruit.",
      true,
      "a121"
    ],
    [
      eval(
        'LZString.decompressFromEncodedURIComponent("GISwdgNghmAmAEsCmBjaAnJBneAXAFlLvCLgOQ5a5Tq7gDmeA9iQLYAOTt8AwjCknRA")'
      ),
      true,
      "a122"
    ],
    [
      eval(
        'LZString.decompressFromEncodedURIComponent("IIGxAIBcAsEsGdywLYAcD2AnSsB2BzJRZAQwGs9DkBTcAYXVwDMBXeagEyA")'
      ),
      true,
      "a123"
    ],
    [
      "Only today you can call 1-800-ANTIMATTER and get a FREE Infinity Dimension! The package also comes with a COMPLETELY FREE SHIPPING and a FREE HIGH DEFINITION ANTI-V!!! Only today for the low price of 42! Estimated delivery time - 5 hours.",
      true,
      "a124"
    ],
    ["1e420 blaze it.", true, "a125"],
    [
      "This game doesn't have any bugs, you're just doing it wrong.",
      true,
      "a126"
    ],
    ["Antimatter_Dimensions.mp1.79e308", true, "a127"],
    ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", true, "a128"],
    ["Click this to unlock a secret achievement.", true, "a129"],
    [
      "Warning - We have just been informed that there is a chance of infection with a mind-virus of the Basilisk type, similar to the infamous winking parrot. This particular example is known as 'Fractal Cancer Type III'. This is believed to cause a 'crashing' of the mind, similar to a computer crash, due to the mathematical complexity of the image causing mathematical ideas that the mind can't comprehend, a Gondelian shock input eventually leading to crashing through Gondelian spoilers. All who have researched it have eventually died the same way, so it is impossible to tell exactly, but this is the common belief. Regardless, with the introduction of 'cancer' mode, as well as reports of its spontaneous appearance, sufficient repetition of this mode's appearance may lead to an image forming in the mind similar to 'Fractal Cancer Type III'. With this in mind, we have some suggestions if you find yourself plagued with it. First, refresh immediately and see if that fixes the issue. If not, navigate to options, and change the theme from cancer to literally anything else. And above all else, godspeed. We can't afford to lose anymore viewers.",
      true,
      "a130"
    ],
    [
      "If I have bad English, I'll study English until I have good English.",
      true,
      "a131"
    ],
    [
      "Someone once told me that antimatter is gonna roll me. I ain't the sharpest atom in the shed. WELL, the tubes start coming and they don't stop coming...",
      true,
      "a132"
    ],
    [
      'Because of this game, I can now use the word "infinity" as a verb.',
      true,
      "a133"
    ],
    [
      "Ahhh, I love the smell of particle annihilation in the morning.",
      true,
      "a134"
    ],
    [
      "The person who said ghosts don't exist obviously doesn't have a Discord.",
      true,
      "a135"
    ],
    [
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAntimatter Dimensions was made by some dude from Finland.",
      true,
      "a136"
    ],
    [
      "The Holy Trinity of Hevipelle: Antimatter, Infinity Points, and Eternity Points. These 3 resources let us access Hevi’s gift, Time Theorems. And, with these Time Theorems, we reach out to Hevi and call, “Hevi, bless us on this fine day!” And Hevi does. He give us the blessing of Time Studies. These Time Studies were blessings so powerful, Hevi restricted their power. He said, “I will give you a choice of three paths.” and then humanity chose: The short, cheap route of Antimatter Dimensions, giving instant gratification; the powerful choice of Infinity Dimensions, which were a fast, middle ground path; or Time Dimensions, the long wait, and struggle, of humanity. Then, as humanity chose, a crack broke the earth. A serpent snaked out and sneered to humanity, “I will offer the powerful choice of a Ninth Dimension! I am Slabdrill, lord of all Unhevi.” Humanity rose and said, “Begone Slabdrill! We want none of your foul Heresy!” And Hevi rose as well, and smote Slabdrill with his godlike power. As Slabdrill’s corpse fell into the earth, he cried, “This will not be the last of me! Hevi will betr-” and he fell in the Abyss of matter. Hevi gifted humanity with Eternity upgrades, which boosted Infinity Dimensions and Time Dimensions, and Hevi gave humanity his greatest gift: EP multipliers. He said, “These will multiply all EP gained by 5, but their cost will increase 25 times. Use them wisely.” ...and Humanity journeyed off with their new power, as Slabdrill’s words echoed in their heads.",
      "player.eternities.gt(0)",
      "a137"
    ],
    ["We have updated our Antimatter Privacy Policy.", true, "a138"],

    //patreon
    ["Is this a jojo reference?", true, "pat1"],

    //basic (pre-inf)
    [
      "You just made your 1,000,000,000,000,000 antimatter. This one tastes like chicken.",
      "player.money.e >= 15",
      "b1"
    ],
    [
      "Nerf the galaxies please.",
      "player.galaxies == 2 || player.infinitied.gt(0)",
      "b2"
    ],
    [
      "What do you mean, more than two dimensions??? We're on a screen, so clearly there are only 2 dimensions.",
      "player.thirdAmount.gt(0) || player.resets > 0",
      "b3"
    ],
    [
      "\"How much is Infinity?\" - literally everyone at least once",
      "player.eightAmount.eq(190) || player.infinitied > 0",
      "b4"
    ],
    [
      "Eh, the Fourth Dimension is alright...",
      "player.fourthAmount.gt(0) && player.fifthAmount.eq(0)",
      "b5"
    ],
    [
      "Antimatter people seem to be even more afraid of 13 then we are. They destroyed entire galaxies just to remove 13 from their percents.",
      "player.galaxies > 0 || player.infinitied.gt(0)",
      "b8"
    ],
    [
      "To understand Dimensional Sacrifice, you do actually need a PhD in Theoretical Physics. Sorry!",
      "player.sacrificed.e >= 10 || player.resets >= 6",
      "b9"
    ],
    [
      "A new group for the standardisation of numbers have come forward with a novel new format involving emojis.",
      "player.spreadingCancer > 0",
      "b11"
    ],
    [
      "Antimatter ice cream stand has recently opened - they have octillions of flavors!",
      "player.totalmoney.e >= 27",
      "b13"
    ],
    [
      "The Heavenly Pelle has generated too much antimatter and needed to create another galaxy. This one can be seen in the southwestern sky.",
      "player.galaxies > 0 || player.infinitied > 0",
      "b21"
    ],
    ["What does the CTRL button do again?", "controlDown", "b27"],
    //9th dim
    [
      "The 9th Dimension is a lie.",
      "player.resets >= 5 || player.galaxies > 0",
      "b6"
    ],
    [
      "The square root of 9 is 3, therefore the 9th Dimension can't exist.",
      "player.resets >= 5 || player.galaxies > 0",
      "b7"
    ],
    [
      "You got assimilated by the 9th Dimension? Just call your doctor for mental illness!",
      "player.resets >= 5 || player.galaxies > 0",
      "b10"
    ],
    [
      "Why is there no 9th Dimension? Because 7 8 9.",
      "player.resets >= 5 || player.galaxies > 0",
      "b12"
    ],
    [
      "The 9th Dimension cannot exist because there were nine reasons to defy it.",
      "player.resets >= 5 || player.galaxies > 0",
      "b14"
    ],
    [
      "If you break the fourth wall... well, there's still the fifth, sixth, seventh, and eighth to get through before you encounter bad things, so you should be fine.",
      "player.resets >= 5 || player.galaxies > 0",
      "b17"
    ],
    [
      "Conditions must be met for Hevipelle to sleep. First, it needs to be a blue moon. Second, a specific town in the arctic must have not seen light for a month. Third, he needs to release an AD update. And finally, no one on the discord can be on dimension 9. Only then can he rest, for up to 6 hours, before waking up forcefully to avoid getting the offline achievement.",
      (player.resets >= 5 || player.galaxies > 0) &&
        player.achievements.includes("r22"),
      "b22"
    ],
    [
      "If the 9th dimension is all evil, then is 3 the root of all evil?",
      "player.resets >= 5 || player.galaxies > 0",
      "b24"
    ],
    //basic (post-inf pre-rep)
    [
      "I've got 1.79e308 problems, but none of them antimatters.",
      "player.infinitied.gt(0) && !player.break",
      "b15"
    ],
    ["Anti Emoji Movie a huge hit", "player.spreadingCancer >= 5", "b18"],
    [
      "If this game was made by Valve, Zero Deaths would be impossible.",
      'player.achievements.includes("r43")',
      "b19"
    ],
    [
      "Florida man attempts to get Zero Deaths on first run, is stopped by the heat death of the universe.",
      'player.achievements.includes("r43")',
      "b16"
    ],
    [
      "\"Having done half the achievements isn't much of an achievement\" - Boo",
      "player.achievements.length >= 40",
      "b20"
    ],
    //basic (post-rep)
    [
      "Thanos is gonna be super disappointed when he shows up with a fully powered infinity gauntlet, and Hevi has a fully powered eternity gauntlet.",
      "player.eternities > 0",
      "b23"
    ],
    [
      "A new strange material has been found. It seems to grow exponentially, but it only helps with antimatter production. We'll call this thing \"replicanti\", whatever that means.",
      "player.replicanti.unl && player.replicanti.chance == 0.01",
      "b25"
    ],
    [
      'It seems this "replicanti" stuff won\'t be growing any faster now.',
      "player.replicanti.chance == 1 && player.replicanti.interval == 1",
      "b26"
    ],
    //newsarray - these unorganized news tickers aren't good
    [
      "Does Hevi just pick quotes to put into the game?",
      "player.newsArray.length >= 30",
      "n3"
    ],
    [
      "New news company has become rivals with us. They are made entirely of antimatter.",
      "player.newsArray.length >= 80",
      "n1"
    ],
    [
      'How many times can we use "Anti" in a row before people stop listening?',
      "player.newsArray.length >= 100",
      "n5"
    ],
    ["Need more quotes! -hevipelle", "player.newsArray.length >= 135", "n2"],
    ["You're almost there!", "player.newsArray.length >= 160", "n11"],
    ["You can stop now", "player.newsArray.length >= 175", "n9"],
    ["fricking hacker, ok how do i turn off news", "player.newsArray.length >= 200", "n10"],
    ["You are a pure being of chaos", "player.newsArray.length >= 250", "n12"],
    ["You should've stopped these quotes from coming long ago", "player.newsArray.length >= 333", "n13"],
    [
      "Asian man trys to steal the trophy of fastest Infinity of -1 seconds, AND HE DOES IT!",
      'player.newsArray.includes("c1")',
      "n4"
    ],
    [
      "I broke the 8th wall, and there is only chaos. Slabdrill is ritually sacrificing antimatter to the 9th Dimension. This will be my last entry, may Hevipelle have mercy on our souls. We didn't listen. We should have listened.",
      'player.newsArray.includes("b17")',
      "n6"
    ],
    [
      "I thought the update was 5 hours away... -new players after more than 5 hours of gameplay",
      'player.newsArray.includes("a91") && player.totalTimePlayed >= 600*300',
      "n7"
    ],
    [
      "Somebody told me to wait five hours for the update yesterday, but it's today, and it still hasn't come! What do I do?",
      'player.newsArray.includes("a91") && player.totalTimePlayed >= 600*300',
      "n8"
    ],
    ["Hackers are coming.", "player.newsArray.length >= 300", "n13"],
    //hard, but rather easy
    [
      "You do know that you won't reach Infinity in -1 seconds, right?",
      "player.bestInfinityTime <= 0.1",
      "c1"
    ],
    [
      "Where does Antimatter Nemo live? In a NNnNeMI-NNnNe.",
      "player.totalmoney.e >= 3e6",
      "c2"
    ], //might not be poss? // no it's just you - usavictor
    [
      "Anti Emoji Movie MMMCMXCIX is a major hit!",
      "player.spreadingCancer >= 3999",
      "c3"
    ],
    ["Achievement Unlocked!", "player.achievements.length >= 88", "c4"],
    [
      "Did you use an autoclicker for that?",
      "player.timestudy.studies.includes(131) && player.thisInfinityTime <= 600 && player.replicanti.galaxies >= 50",
      "c5"
    ],
    ["Timing is key.", "player.thisEternity < 1", "c6"],
    [
      "If you want to farm infinitied, why don't you just get the time study?",
      "!player.timestudy.studies.includes(32) && player.infinitied > 72000 * 168",
      "c7"
    ],
    [
      "The achievement is for two million, not two billion...",
      "player.infinitied.gt(2e9)",
      "c8"
    ],
    ["Keep up the quick pace!", "Marathon > 1200", "c9"],
    [
      "One day you will stop your incessant grind.",
      "player.eternities.gt(50000)",
      "c10"
    ],
    [
      "You can probably stop farming for eternities now...",
      "player.eternities.gt(2000000)",
      "c11"
    ],
    ["Are you serious?", "worstChallengeTime <= 0.1", "c12"],
    ["The amazing speedster", "infchallengeTimes <= 0.8", "c13"],
    [
      "More people are now grinding endlessly to no benefit in a cheese factory. What happens there may shock you.",
      "player.eternities > 1e12",
      "c14"
    ], // respeccedx+2
    //luck, these are actually way more missable than you think they are.
    [
      "Technically, these luck messages are even rarer than we thought. This is considering the fact that you only have one chance to get the lucky news tickers for every news ticker out of the many news tickers in the news array, and even then, Math.random() is very random.",
      "Math.random() < 0.01",
      "l0"
    ], // respeccedx+1
    [
      "This news message is 1000x rarer than all the others.",
      "Math.random() < 0.001",
      "l1"
    ],
    [
      "You just won a small prize in the lottery.",
      "Math.random() < 1e-4",
      "l2"
    ],
    [
      "You just won a moderate prize in the lottery.",
      "Math.random() < 1e-5",
      "l3"
    ],
    [
      "You just won a large prize in the lottery.",
      "Math.random() < 1e-6",
      "l4"
    ],
    ["You just won a huge prize in the lottery.", "Math.random() < 1e-7", "l5"],
    [
      "You just won a massive prize in the lottery.",
      "Math.random() < 1e-8",
      "l6"
    ],
    [
      "You just won a very massive prize in the lottery.",
      "Math.random() < 1e-9",
      "l7"
    ],
    ["You just won the lottery.", "Math.random() < 1e-10", "l8"],
    ["Just how lucky are you?", "Math.random() < 1e-11", "l9"],
    [
      "This news message is 1000000000000x rarer than all the others.",
      "Math.random() <= 1e-12",
      "l10"
    ],
    //missable / pay req
    [
      "How dare you actually get zero deaths on a first run?",
      'player.achievements.includes("r43")',
      "s1"
    ],
    [
      "Legend says the ninth dimension is supposed to be found here, but I don't see anything.",
      "player.money.e >= 4190000 && player.dilation.active && player.galaxies == 1 && player.resets == 4 && player.thirdAmount == new Decimal(0)", // reminder to make this a achievement...?
      "s2"
    ], // requirement changed to e4,190,000 antimatter, 1 galaxy, 4 resets and only up to 2nd dimensions
    ["Person with money likes to support this game.", true, "s3"],
    ["Whale is bad at making smart purchases.", true, "s4"],
    ["Whale complains that the game broke.", true, "s5"],
    ["Whale complains that their buying isn't doing anything.", true, "s6"],
    
    // respecced news tickers (revamped)
    ["You exist. I exist.", true, "respecced1"],
    ["In another alternate universe, NG+2 Respecced is the most popular mod, but I think that's just me daydreaming.", true, "respecced2"],
    ["Who am I? Oh wait, I'm the... uh... how long was I asleep?", true, "respecced3"],
    ["Something's wrong here, the place is devoid of onions. They've all been replaced with beetroots! Who dun it? Find out on tonight's blockbuster!", true, "respecced4"],
    ["Next on Universe's Got Talent, we have antimatter and matter coming up on the stage. This better not end with a **BANG** ...well, nevermind.", true, "respecced5"],
    ["Aren't you glad it didn't gild banana?", true, "respecced6"],
    ["I broke stuff. Again.", true, "respecced7"],
    ["Who would win, an ace scout or a bunch of photons?", true, "respecced8"],
    ["TYOP", true, "respecced9"],
    [
      "It's the year 2517. Nothing happened. Well, maybe except for the human race dying.",
      true,
      "respecced10"
    ],
    ["Time Flux for NG+5 when? Apparently, never, as Reality has snapped almost all of the mods out of existence.", true, "respecced11"],
    [
      "You know the game is old when it has tons of spaghetti code.",
      true,
      "respecced12"
    ],
    [
      "Infinite bugs? In my NG+3? It's more likely than you think.",
      true,
      "respecced13"
    ],
    [
      "Quantum exists. It just has been under development for a while.",
      true,
      "respecced14"
    ],
    [
      "It appears when we looked closer at the explosion, the antimatter and matter were hugging each other. Oh well. I guess they would've made it to the semi-finals if they were careful. NEXT!",
      'player.newsArray.includes("respecced5")',
      "respecced15"
    ],
    [
      "You just made your first 1e1,000,000,000 antimatter. This one tastes like turkey.",
      "player.totalmoney.e > 1e9",
      "respecced16"
    ],
    ["The writers have a feeling they've become too self-aware when they wrote these tickers.", true, "respecced17"],
    [
      "The life of a news ticker: First, they start out small, while being conceived in the creator's mind. Then, they deliver their punchline. Afterwards, they die, and become a distant memory.",
      true,
      "respecced18"
    ],
    ["Person with money regrets they spent $10 just for a 2x dimension multiplier that has no effect.", true, "respecced19"],
    [
      "In order to create the perfect antimatter, we need to mix [REDACTED], reality fabric and Chemical Z.",
      true,
      "respecced20"
    ],
    [
      "If you are not playing NG+2 Respecced on http://ngplus2.glitch.me/ngplusplus/, the site is bootleg. Wait, we're already bootleg.",
      true,
      "respecced21"
    ],
    ["I'm so meta", true, "respecced22"],
    ["I'm blue, da ba dee", true, "respecced23"],
    [
      "Tonight on the Evening News: Civil war has broke out on the hill. People say it's just petty fighting... but who is behind it?",
      true,
      "respecced24"
    ],
    [
      "Thank you Devion! But our battle replicants is in another castle!",
      true,
      "respecced25"
    ],
    [
      "One small step for antimatter, one giant leap for antimatterkind.",
      "player.quantum.times > 0",
      "respecced26"
    ],
    ["This phenomenon shows how it feels to chew 5 Gum. Maybe.", "player.dilation.active", "respecced27"],
    [
      "A man has fallen into the 9th Dimension in Antimatter City! Start the new Big Crunch! Hey! Build the big crunch and off to the rescue. Prepare the crunch, wipe the 9th dimension, and make the rescue. The new Big Crunch collection from Antimatter Dimensions",
      "player.infinitied.gt(0)",
      "respecced28"
    ],
    ["Universal Attractor isn't a very good game...", true, "respecced29"],
    [
      "No, no! It isn't AD with 10 dimensions! Shut up, stop it-",
      true,
      "respecced30"
    ],
    ["¬θ ¬θ´ μ€'§ ¤θ% Ω Гθ|¬!", true, "respecced31"],
    [
      '"Onion was a mistake." ~ TheTastyPi, 2020',
      'player.newsArray.includes("respecced4")',
      "respeccced32"
    ],
    [
      "Florida man has been spotted stealing the secret formula. The secret formula of what? Antimatter?!",
      true,
      "respecced33"
    ],
    [
      "In another universe, ninth dimensions or the 5 hour updates don't exist. There is instead something much worse... the unmentionable thing.",
      true,
      "respecced34"
    ], //not sure if this is supposed to be an NGU reference
    [
      "If you could convert your " +
        shortenMoney(player.money) +
        " units of antimatter to dollars, the economy would inflate and go upside down and inside out.",
      "player.money.e >= 308",
      "respecced35"
    ],
    [
      "This is a test of our new creative works software. Your random number is: " +
        Math.floor(Math.random() * 1000) +
        ".   Hey, did it work? We hope it did.",
      true,
      "respecced36"
    ],
    [
      "This ticker will be replaced in a future update. I don't know what to do with it.",
      'player.eternityPoints.gte(new Decimal("1e1300"))',
      "respecced37"
    ],
    [
      "An infinite clock has been found near the end of universe #6,210,322. It often makes figure eights with its hands. Weird.",
      true,
      "respecced38"
    ],
    [
      "This game just gets more meta the more you look at your meta dimensions.",
      "player.dilation.studies.includes(6)",
      "respecced39"
    ],
    [
      "Yes, you can get Zero Deaths on your first run. Don't worry about it.",
      true,
      "respecced40"
    ],
    ["Nonus modus non est.", true, "respecced41"],
    [
      '"that... aint uh... f*ck. no more words" - The Incremental Nerd, 2020',
      "player.newsArray.length == (newsArray.length)-1",
      "respecced42"
    ],
    [
      "How are you doing? I hope you're doing well.",
      true,
      "respecced43"
    ],
    ["Qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", true, "respecced44"], // fun fact: this was accidental

    ["Zoinks, scoobs! The antimatter is heading straight towards us!", true, "respecced45"],
    [
      "If I lived in a world with 10 dimensions, I would be so confused.",
      "player.resets >= 5 || player.galaxies > 0",
      "respecced46"
    ],
    // oh wait, nevermind. RESPECCED PART 2
    [
      "Are meta dimensions really that meta? Do we just make up these new terms just to sound smart?",
      "player.dilation.studies.includes(6)",
      "respecced47"
    ],
    [
      "The metaverse ain't got anything on these dimensions",
      "player.dilation.studies.includes(6)",
      "respecced48"
    ],
    [
      "There should be eleven dimensions. Oh wait...",
      "player.dilation.studies.includes(6)",
      "respecced49"
    ],
    [
      "Help, my save vanished!",
      "player.dilation.studies.includes(6)",
      "respecced50"
    ],
    [
      "I thought Meta-Antimatter Galaxies didn't exist. Well, I guess they do now.",
      "player.dilation.studies.includes(6) && player.meta.galaxies > 0",
      "respecced51"
    ],
    [
      "Do you speak Galaxy?",
      "player.dilation.studies.includes(6) && player.meta.galaxies > 0",
      "respecced52"
    ],
    [
      "Well, if there's meta-antimatter galaxies, then where is meta-infinity?",
      "player.dilation.studies.includes(6) && player.meta.galaxies > 0 && player.meta.bestAntimatter.lt(Number.MAX_VALUE)",
      "respecced53"
    ],
    [
      "Friendly reminder that there's tons of pseudoscience! It's ok, don't worry, it's fictional.",
      true,
      "respecced54"
    ],
    [
      "A new study has appeared linking meta-antimatter to more antimatter production. Scientists say this is pseudoscience.",
      "player.dilation.studies.includes(6)",
      "respecced55"
    ],
    [
      "So I've been pondering for some time... where are we in Antimatter Dimensions? Sure, we're probably living on Earth, but to be honest, if we had made antimatter condensers, it'd probably not be reasonable. One day I was sitting on my chair. I thought about all the antimatter I had produced. Then it hit me. We were living in the 22nd century. Scientists found a way to manipulate antimatter, for some reason. I believe I was one of them. ...but, by crunching and warping the fabric of time, we're breaking the very universe we exist in. We break the time and space fabric to produce more antimatter. Then all of a sudden, it all fades into a flash. I woke up. Maybe this is a dream. No. It can't be. I see many galaxies in the sky. There's thousands upon thousands of dimensions, not to mention even centillions. Oh no. I think I know what this means. When I touched that antimatter dimension, more antimatter began to produce. My curiosity made me create more dimensions. I am controlling the planet, even the universe. I am the one who caused all this. But, for what? Massive greed? Do I enjoy this massive hoard operation? Huh. Maybe I was wrong about taking this job just to do some science. The universe gets worse each and every time I big crunch, or reshape the universe by going Eternal. Who am I? ...  I'm a monster. I destroyed everything for my personal gain. I want to stop, but I cannot. Soon, the antimatter will consume me. It is only a matter of time before I die. If you're reading this, please be safe out there. Don't end up like me who destroyed the rest of humanity.",
      true,
      "respecced56"
    ],
    [
      "Well, if we have meta-galaxies, then where is meta-tickspeed?",
      "player.dilation.studies.includes(6) && player.meta.galaxies > 0",
      "respecced57"
    ],
    [
      "The invasion of the battle replicants has been postponed indefinitely. Everyone, please remain calm!",
      "player.dilation.studies.includes(6) && player.meta.galaxies > 0",
      "respecced58"
    ],
    [
      "No news is good news.",
      true,
      "respecced59"
    ],
    [
      "First-time developer releases incremental game, gets mocked by Aarex for inflation",
      true,
      "respecced60"
    ],
    [
      "Whenever I try to give Aarex an antimatter onion, the onion vanishes. Does this mean Aarex is made of matter?",
      true,
      "respecced61"
    ],
    [
      "NG+3 has prestige layers, and onions have layers. Does this mean NG+3 is a prestige onion?",
      true,
      "respecced62"
    ],
    [
      "Alright, so we're checking the only game where you can destroy Florida with antimatter: it's Antimatter Dimensions NG+2 Respecced.",
      true,
      "respecced63"
    ],
    [
      "We have discovered that tachyon particles may drift and end the universe.",
      "player.dilation.studies.includes(1)",
      "respecced64"
    ],
    [
      "Hey, someone keeps sacrificing my replicants to the void... DAMN IT, NOT AGAIN!",
      "player.dilation.studies.includes(6)",
      "respecced65"
    ],
    [
      "ELECTRONS CONSUME YOUR STARS",
      "player.dilation.studies.includes(6)",
      "respecced66"
    ],
    [
      "Tree of Decay isn't a upgrade tree. I have been lied to.",
      "player.dilation.studies.includes(6)",
      "respecced67"
    ],
    ["Your call has been forwarded to the voicemail for Sam. No one is available to take your call. Please leave a message after the tone.", true, "respecced68"],
    ["Noice.", true, "respecced69"], // Nice, I guess.
    [
      '"I think he became depressed after he realized that Antimatter Dimensions is real." ~ Aarex, 2020',
      'player.newsArray.includes("respecced56")',
      "respecced70"
    ],
    [
      "You feel like baking antimatter, but no body wants to explode.",
      true,
      "respecced71"
    ],
    [
      "'We need to ban standard.' - Douche who can't balance his mods correctly",
      true,
      "respecced72"
    ],
    [
      "NG+3.1, now featuring 33% less timewalls and the all new Higgs timewall!",
      true,
      "respecced73"
    ],
    [
      "Warning! We have reported an anomaly within the space and time continuum! It is likely that it will strike and make more time inconsistencies! Protect the time you have at all costs!",
      "player.dilation.unstable.times > 0",
      "respecced74"
    ],
    ["\"I like Gunvolt Chronicles.\" ~ Technokaguya, 2020", true, "respecced75"],
    [
      "We apologize for any inconveniences you may have with the newsticker.js service.",
      true,
      "respecced76"
    ],
    [
      "The news ticker industry is inflating. There have not been any major advancements in the news ticker department. We need to think of better news tickers, but most of them are just horribly written stuff...",
      true,
      "respecced77"
    ],
    [
      "5 hours was a mistake. There stands only an infinite time between Reality. 5 hours was never an accurate measurement, it just kept moving away from us. Everything we knew of it was wrong. What are we waiting for then?",
      'player.newsArray.includes("a91") && player.totalTimePlayed >= 600*300',
      "respecced78"
    ],
    //news tickers from randomtuba
    ["Just wait six hours and your package will arrive", true, "respecced79"],
    [
      "Anti-Jake from State Farm says that he is not on your side.",
      true,
      "respecced80"
    ],
    [
      "Recipe for anti-cereal: it's just the same as the recipe for cereal, but pour the milk before the anti-bowl is even on the table",
      true,
      "respecced81"
    ],
    [
      "If there's no triple exponentiational growth in this game, I will stop playing.",
      true,
      "respecced82"
    ],
    [
      "'It's not respecced, it's NG+2 modded' - some random loser",
      true,
      "respecced83"
    ],
    [
      "Did antimatter cause the Local58 incidents? If it did, boy were they wrong.",
      true,
      "respecced84"
    ],
    [
      "PLEASE INSERT THE ANTIMATTER INTO THE PROPER SLOT. IF THERE ARE NO MORE SLOTS, PLEASE FREE UP ANY SLOT AND TRY AGAIN.",
      true,
      "respecced85"
    ],
    ["https://safeyoutube.net/w/4nj1", true, "respecced86"], //rickroll
    ["John, I want a divorce.", true, "respecced87"],
    [
      "If the 9th dimension doesn't exist, then why can you obtain 9 antimatter galaxies?",
      "player.galaxies >= 9",
      "respecced88"
    ],
    [
      "Aarex is gonna be mad because we're making another mod of NG+2, but who fucking cares", // he probably won't care honestly...
      true,
      "respecced89"
    ],
    ["var 9thDimensions = NaN; | Uncaught SyntaxError: Invalid or unexpected token", true, "respecced90"],
    ["NG+3 Respecced is the bane of my existence", true, "respecced91"],
    [
      "SCP-AD --- Object Class: Keter --- Special Containment Procedures: SCP-AD must be contained in a 5x5 meter cell with no matter by it, or else it will be destroyed due to annhilation. Security cameras have a chance to shut down at a 5-hour interval. --- Description: SCP-AD is a computer screen that has an odd game on it. It is a game where you collect 'antimatter' with 'dimensions'. The computer has a mouse, a keyboard, and a [REDACTED] by it. The keyboard does not have QWERTY format. The arrangement of keys are [REDACTED]. --- Experiment AD-1: D-6969 was asked to play the game on SCP-AD. 5 hours later, security footage malfunctioned. When observing the containment area, D-6969 had disappeared without a trace. On the screen, it showed a '[REDACTED]' had unlocked. --- Experiment AD-3: D-8826 was asked to play the game on SCP-AD in 'Cancer' Notation. 5 hours later, D-8826 exploded from the inside. Later, all remains of the corpse had been absorbed inside the containment chamber.",
      true,
      "respecced92"
    ],
    // unstable dilation may no longer exist
    [
      "Don't worry, we'll unlock Ultra Dilation in -6 minutes",
      "player.dilation.unstable.times >= 1",
      "respecced93"
    ],
    ["On the news tonight, the mass production of prestige layers has left many worried. Some say their layers are bitter and unprocessed. Prestige tree factories have expanded beyond the expectations of what was possible. More at 11.", true, "respecced94"],

    //pass the mic back
    [
      "It cries above mount Everest, and antimatter from the raindrops of the antimatter galaxies made by Hevi Pelle who smote slabdrill and mighty aarex and produced too much antimatter and the forbidden matter from Slabdrill.",
      true,
      "respecced95"
    ],
    // serious message
    [
      "Hi there! If you're a developer who somehow wants to look in the game, comments are now put in place to read segments of the code. I hope you are able to pinpoint exactly where the bugs are present when you send bug reports.",
      true,
      "respecced96"
    ],

    // Everything below this needs to be changed
    [
      "Antimatter Dimensions now for the Meta Quest 2 in VR",
      true,
      "respecced97"
    ],
    [
      "Even if you could halate snow, you don't have enough light to do that. We'd need more tickspeed. Speaking of more tickspeed... a potato's on the loose.",
      'player.newsArray.includes("respecced17") && player.achievements.includes("r135")',
      "respecced98"
    ],
    [
      "You wouldn't download an antimatter particle.",
      true,
      "respecced99"
    ],
    [
      "How to fix the game's bugs: Revision 45 - 1. Make sure no pesky bugs exist in your code and blast them with antimatter if you see them. 2. Do something to prevent the spread of these evil bugs. Maybe alter the code and encourage the bugs to go away. 3. Watch as more bugs emerge from the previous bugs you've exploded. If in any case the bugs begin a revolution, big crunch the universe.",
      true,
      "respecced100"
    ],
    [
      "This message's contents will only be viewable if you buy the News Ticker DLC for only $39.99. Sorry!",
      true,
      "respecced101"
    ],
    [
      "🦟",
      true,
      "respecced102"
    ],
    [
      '"Make this into the news ticker" ~ Cats and Dogs, 2020',
      true,
      "respecced103"
    ],
    [
      "i know your type. you're, uh, very determined, aren't you? you'll never give up, even if there's, uh... absolutely NO benefit to persevering whatsoever. if i can make that clear. no matter what, you'll just keep going. not out of any desire for good or evil... but just because you think you can. and because you \"can\"... ... you \"have to\". but now, you've reached the end. there is nothing left for you now. so, uh, in my personal opinion... the most \"determined\" thing you can do here? is to, uh, completely give up. and... well... do literally anything else.",
      "player.money.e >= 9e15",
      "respecced104"
    ], // sans's speech in the undertale genocide route
    [
      "Hi, Billy Mays here for the Antimatter Dimensions game, the newest way to waste time!",
      true,
      "respecced105"
    ],
    ["around the world, around the world", true, "respecced106"],
    ["🛺", true, "respecced107"],
    ["Out of the many messages you could have received, you were shown this useless message.", true, "respecced108"],
    ["Tonight, there will be a meteor shower in your area. Look out!", true, "respecced109"],
    ["The 9th Dimension isn't real, but it will be real 5 hours from now. ...But, maybe... maybe it might just be you.", "player.resets > 4", "respecced110"],
    ["\"But now it's " + (1970 + Math.floor((Date.now()/1000)/3.154e+7)) + "!\" - C16946986", true, "respecced111"],
    ["<a href ='https://www.youtube.com/watch?v=TN25ghkfgQA'>\"What if you pinged yourself?\"</a>", true, "respecced112"],
    ["\"plz make this an entry to the news ticker\" ~ Diamboy, 2020", true, "respecced113"],
    ["theyaremanycolors", true, "respecced114"],
    [
      "Hey there, Technokaguya here. What the FUCK HAVE YOU DONE?!?!?",
      "player.firstPow.eq(1) && player.quantums.gt(1)",
      "respecced115"
    ], // happens if quantums somehow break something
    ["Help! My very spirit is stuck in this news message! Get me out!", true, "respecced116"],
    ["Yo dawg, I heard you liked challenges, so we put challenges in your challenges so you have challenges when you start challenges.", true, "respecced117"],
    ["The glitch is glitching now. That's not good. Everything is falling apart!", true, "respecced118"],
    ["Time error: Seconds cannot exceed past 1.8e308", false, "respecced119"],
    ["On some nights, I like to sit down and look at the sky, wondering about all the stars. Do you?", true, "respecced120"],
    // create a function for randomly selected food.
    ["The Cooking Show presents a recipe for creating pancakes", true, "respecced121"],
    ["In another universe, sacrifice is a sinful matter. The gods will smite you, leaving you doomed in Challenge 8.", true, "respecced122"], // New tickers in Alpha 0.2.1
    ["Hey Scott, all here", true, "respecced123"], // Breakout - 3D Dot Game Heroes
    ["I touch grass sometimes", true, "respecced124"],
    ["Worldwide antimatter stacking competition ends as the dubbed \"leaning tower of antimatter\" is created.", true, "respecced125"],
    ["", 'player.quantum.times > 0', "respecced126"],
    ["In AD 2101, war was beginning. *explosion* What happen? Someone set up us the bomb. We get signal. What! Main screen turn on. It's you!! How are you gentlemen!! All your antimatter are belong to us. You are on the way to destruction. What you say!! You have no chance to survive make your time. Ha ha ha ha... Captain!! Take off every \"dimension\"! You know what you doing. Move \"dimensions\". For great justice.", 'player.newsArray.length > 250', "respecced127"],
    ["happy birthday technokaguya", '(new Date().getMonth() == 5 && new Date().getDate() == 12)', "respecced128"],
    ["\"wait, why does break infinity exist\" - post-reality player", '!player.break', "respecced129"], // the heck is this and why does this exist
    ["Antimatter is known to create annoying bullet patterns and ruin people's 1cc attempts, violating the rules of spell cards.", 'player.newsArray.includes("respecced132")', "respecced130"],
    ["Aren't you bored or something? You should probably take a break.", 'player.totalTimePlayed >= 600*3000', "respecced131"], // 50 hours
    ["Kirby's exploits to fight against intergalactic gods are well known. This leaves us with one question: can he inhale and consume antimatter?", true, "respecced132"],
    ["If the big bang happened 13.8 billion years ago and should've produced matter, where does the antimatter come from?", "player.money.gt('1e200000000')", "respecced133"],
    ["Play responsibly", true, "respecced134"],
    ["2 + 2 = 5, I have been lied to, the universe is no more.", 'player.quantum.times > 0', "respecced135"],
    ["The Return of Killer Bean", true, "respecced136"],
    ["\"apparently there's supposed to be some scientific joke about how tachyon particles actually matter regarding quantum theory and special relativity but it sounds like nerdy stuff\" - some random guy", 'player.newsArray.includes("a102")', "respecced137"],
    ["With the power of the Chaos Emeralds, we're able to move at hypersanic speed. I believe nothing else can go beyond that.", true, "respecced138"],
    ["If 3 is the root of all evil, what's √3 supposed to be then? What about 0.3?", "player.newsArray.includes('b24')", "respeccced139"],
    ["Hey. Yeah? You ever wonder why we're here? It's one of life's greatest mysteries, isn't it? Why are we here?", true, "respecced140"], // red vs blue
    ["\"i'm trying to beat 20c apoc chaos in impossible ascension. i just got to whack him for 2 more minutes...... ok...... it's going go- oh god dang it he just pulled out his rainbow AURA AND ASD@!#@!#$%\" ~ Anti-Idler", true, "respecced141"],
    ["Antimatter Dimensions is the most ambitious crossover of all time.", true, "respecced142"],
    ["I wanna be the antimatter - Many years ago \" antimatter \" left world and retreat to \" celestials \" Now \" player \" goes to defeat \" celestials \" and become \" the antimatter \" with his dimension pass handed down by former \" grandfather hevipelle \". Go find the \" 8 \" units... Now become \" the Antimatter \"", true, "respecced143"],
    ["Remember: If you don't like the news ticker, you can turn it off in the settings. That is why the ticker has been turned off automatically when you start.", true, "respecced143"],
    ["I am incrementy... made of numbers and notations... lasting millions of digits... MUST INCREMENT EVERYTHING.", true, "respecced144"],
    ["Click here to disassemble the news for a slice of cake.", true, "respecced145"],
    ["Did you know? " + didYouKnow(), true, "respecced146"],
    ["Is it me, or am I hearing something in these space walls? Nothing's come around here for a while...", true, "respecced152"],
    ["We are no longer accepting news tickers. Sorry!", true, "respecced153"],
    ["\"too much snow, please, no more snow, no more halating\" ~ Anti-Mikey", "player.newsArray.includes('respecced98')", "respecced154"],
    ["The news ticker machine is currently overheating and cannot take any more requests right now. Please try again later.", true, "respecced155"],

    // End at respecced200.
    ["\"Sorry usavictor, no procrastination for you today. Go work on Antimatter Dimensions NG+2 Respecced Now!\" ~ Pylon", true, "testing"] // exclusive to testing
    ]
  }
var s = document.getElementById("news");
document.addEventListener(
  "visibilitychange",
  function() {
    if (!document.hidden) {
      scrollNextMessage();
    }
  },
  false
);
var scrollTimeouts = [];
var nextMsgIndex;

function scrollNextMessage() {
  //don't run if hidden to save performance
  if (player.options.newsHidden) return false;
  updateNewsArray();
  //select a message at random
  var randomNews
  try {
    do {
      randomNews =  Math.floor(Math.random() * newsArray.length);
      nextMsgIndex = randomNews
      } while (!eval(newsArray[nextMsgIndex][1]));
  } catch (e) {
    console.log("Newsarray doesn't work at idx " + nextMsgIndex);
  }

  scrollTimeouts.forEach(function(v) {
    clearTimeout(v);
  });
  scrollTimeouts = [];

  //set the text
  s.innerHTML = newsArray[nextMsgIndex][0];

  //get the parent width so we can start the message beyond it
  let parentWidth = s.parentElement.clientWidth;
  //set the transition to blank so the move happens immediately
  s.style.transition = "";
  //move div_text to the right, beyond the edge of the div_container
  s.style.transform = "translateX(" + parentWidth + "px)";

  //we need to use a setTimeout here to allow the browser time to move the div_text before we start the scrolling
  scrollTimeouts.push(
    setTimeout(function() {
      //distance to travel is s.parentElement.clientWidth + s.clientWidth + parent padding
      //we want to travel at rate pixels per second so we need to travel for (distance / rate) seconds
      let dist = s.parentElement.clientWidth + s.clientWidth + 20; //20 is div_container padding
      let rate = 100; //change this value to change the scroll speed
      let transformDuration = dist / rate;

      if (
        !player.options.newsHidden &&
        !player.newsArray.includes(newsArray[nextMsgIndex][2])
      ) {
        player.newsArray.push(newsArray[nextMsgIndex][2]);
        if (player.newsArray.length >= 50) giveAchievement("Fake News");
      }

      //set the transition duration
      s.style.transition = "transform " + transformDuration + "s linear";
      let textWidth = s.clientWidth;
      //we need to move it to -(width+parent padding) before it won't be visible
      s.style.transform = "translateX(-" + (textWidth + 5) + "px)";
      //automatically start the next message scrolling after this one finishes
      //you could add more time to this timeout if you wanted to have some time between messages
      scrollTimeouts.push(
        setTimeout(scrollNextMessage, Math.ceil(transformDuration * 1000))
      );
    }, 1000)
  );
}

function didYouKnow() {
  var news = ["Over 9,000 news tickers are sent to the meaningless void daily.", "There is a dedicated list of strings just for this ticker.", "You are reading this message.", "Quantum is the final prestige layer in this modification.", "break_infinity.js could exceed 1e9e15, but it spirals out of control.", "There are a few obscure references to certain media in this mod... see if you can find them!", "There might be a cryptic secret in the news ticker...", "The cake is also a lie.", "This is a robbery.", "Almost all news tickers are possible to see, in one way or another.", "The whales referenced in the game are actually a term for gigantic money spenders in a video game.", "NG+2 Respecced started development in February 2020!", "I don't think you know."]
  var random = Math.floor(Math.random() * news.length)
  return news[random]
}