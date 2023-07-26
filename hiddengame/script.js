let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const specialButton = document.querySelector("#specialButton69");
const controls = document.querySelector("#controls");

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "clawhammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  },
];

const monsters = [
  {
    name: "slime",
    level:3,
    health: 35
  },
  {
    name: "fanged beast",
    level: 20,
    health: 600
  },
  {
    name: "dragon",
    level: 20,
    health: 3000
  },
];

const locations = [
      {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the decrepit town square. No one in sight, you thirst hard for a cold one with the boys. You see a sign that says \"store\"."
      },
      {
        name: "store",
        "button text": ["Buy 10 HP (10 Gold)", "Buy weapon (30 Gold)", "Go to Town Square"],
        "button functions": [buyHealth, buyWeapon, goSquare],
        text: "You entered the store. Welcome to my shop. We have all sorts of helpful things here to coincidentally help you slay all of the beasts in the cave."
      },
      {
        name: "cave",
        "button text": ["Fight Slime", "Fight Beast", "Return to town"],
        "button functions": [fightSlime, fightBeast, goSquare],
        text: "You entered a cave. You see some monsters. Might wanna kill these guys"
      },
      {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goSquare],
        text: "You are fighting a monster."
      },
      {
        name: "kill monster",
        "button text": ["Go to Square", "Go to Square", "Go to Square"],
        "button functions": [goSquare, goSquare, easterEgg],
        text:'The monster screams "Argh!!!" as it dies. You gain XP and find gold.'
      },
      {
        name: "lose",
        "button text": ["What a loser", "Can't park there", "Should've stayed home"],
        "button functions": [restart, restart, restart],
        text:"You died"
      },
        {
        name: "win game",
        "button text": ["Good job!", "You sure can park here", "Glad you didn't stay home"],
        "button functions": [restart, restart, restart],
        text:"Congrats loser... jk Good one"
      },
      {
        name: "easter egg",
        "button text": ["2", "8", "Go to Square"],
        "button functions": [pickTwo, pickEight, goSquare, pickSpecialButton],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
      },
];



//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  specialButton.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];

  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  specialButton.onclick = location["button functions"] [3];

  text.innerText = location.text;
}

function goSquare() {
  update(locations[0]);
  button1.style.display = "";
  button2.style.display = "";
  button3.style.display = "";
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health; 
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
  
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
      if (gold >= 30) {
        gold -= 30;
        currentWeapon++
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You now have a " + newWeapon + ".";
        inventory.push(newWeapon);
        text.innerText += " In your inventory you have: " + inventory;
      } else {
        text.innerText = "You do not have enough gold to buy a weapon.";
        }
      } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon (15 Gold)";
        button2.onclick = sellWeapon;
      }
}

function sellWeapon() {
  if (inventory.length > 1){
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Fool. You cannot get rid of your only line of defense.";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();  
}

function fightDragon() {
  fighting = 2;
  goFight();   
}

function goFight() {
   update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  
  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  } else {
    text.innerText += " You missed. :(|)";
  }
  
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health <= 0){
     lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }

  if (Math.random() <= .3 && inventory.length !== 1) {
    text.innerText += " and your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  let hit = (level * 8) - (Math.floor(Math.random() * xp));
  console.log(hit)
  return hit;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
   text.innerText = "You dodged the attack from " + monsters[fighting].name + ".";
}

function lose() {
   update(locations[5]);
  
}

function winGame() {
  update(locations[6]);
}

function defeatMonster() {
   gold += Math.floor(monsters[fighting].level * 6.7)
   xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4])
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goSquare();
}

function easterEgg() {
  update(locations[7]);
  specialButton.style.display = "block";  
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pickSpecialButton() {
  specialButton.style.display = "none";
  button1.style.display = "none";
  button2.style.display = "none";
  button3.style.display = "none";
  text.innerText = "Well well well. You've done well well well... No one would've guessed it.";
  setTimeout(page2, 3500);
  
  function page2() {
  text.innerText = "Silly dog you! haha. Well, niiice... Here's a bonus!!! 6969420(Added 300 XP, 100 Health, and 150 gold.)024969696"
  gold += 150;
  goldText.innerText = gold;
  health += 100;
  healthText.innerText = health;
  xp += 300;
  xpText.innerText = xp;
  setTimeout(goSquare, 6000);
  }
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = "You picked " + guess + ". Here are the random numbhers:\n";

  for (let i = 0; i < 10; i++ ) {
    text.innerText += numbers[i] + "\n";
  }

  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Correct, here's your keep";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health; 
    if (health <= 0) {
      lose();
    }
  }
  
}