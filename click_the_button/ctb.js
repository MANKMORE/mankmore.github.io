// player stats
let clicks = 0;
let clickPower = 1;
let autoCps = 0;

let cursors_amt = 0;
let mechanical_hand_amt = 0;
let hydraulic_piston_amt = 0;
let infantry_division_amt = 0;

let cursors_boost = 0;
let mechanical_hand_boost = 0;
let hydraulic_piston_boost = 0;
let infantry_division_boost = 0;


//lets just ignore this
const splashes = ["Click That Button!", "buy upgrades in the upgrade shop", "some upgrades are worth it, some upgrades are utterly useless", "gotta click click click!", '"i approve" - strantel', "Click the button 3: Need more Click", "2 Clicks 2 Buttons", "As seen on Youtube!", "make  sure to take breaks in real life to play this game!", "also try Cookie Clicker!", "also try any other idle game!", "the button background isnt pixely aligned, i hate it too but there is nothing that can be done", "the github one", "Despite everything, you're still clicking", "made using one of the worst  evils to befall mankind: javascript", "made with notepad!", "also check out that one baldis basics clicker game!", " nows your chance to be a [[CLICKING GOD]]", "does anyone else agree that the britissh empire at its peak looked ridiculous?", "orange"];
let text = document.getElementById("splash");
const interval = setInterval(() => {
	text.textContent = '"' + splashes[randInt(0, splashes.length -1)] + '"';
}, 3000);



// main functions
// ITS THIS ONE THAT IS THE MAIN CLICK FUCNTION, IM DOING THIS SO I DONT GET CONFUSED
// ITS THIS ONE THAT IS THE MAIN CLICK FUCNTION, IM DOING THIS SO I DONT GET CONFUSED
// ITS THIS ONE THAT IS THE MAIN CLICK FUCNTION, IM DOING THIS SO I DONT GET CONFUSED
// ITS THIS ONE THAT IS THE MAIN CLICK FUCNTION, IM DOING THIS SO I DONT GET CONFUSED
function clickington(){
	let para = document.getElementById("numDisplay");
	let btn = document.getElementById("the_button");
	btn.src = "button_pressed.png";
	clicks += clickPower;
	const timer = setTimeout(() => {btn.src = "button_unpressed.png"}, 150);
	para.textContent = "clicks: " + String(Math.round(clicks));
	unlockUpgrade(click_boost);
	if (Math.round(clicks) > 49){
		unlockUpgrade(click_boost_2)
	}
	if (Math.round(clicks) > 99){
		unlockUpgrade(click_boost_3)
	}
	if (Math.round(clicks) > 1247659){
		unlockUpgrade(ohno);
	}
}
// THE FUNCTION ENDS HERE
// THE FUNCTION ENDS HERE
// THE FUNCTION ENDS HERE
// THE FUNCTION ENDS HERE


function buyUpg(upg){
	if (clicks > upg.cost){
		document.getElementById(upg.id).remove();
		upg.buy();
		let para = document.getElementById("numDisplay");
		cpsDisplayRefresh();
		para.textContent = "clicks: " + String(Math.round(clicks));
		if (upg.id == "click_boost_2"){
			unlockUpgrade(toy_hammer);
		}
		
		console.log("bought!");
	}
}

function unlockUpgrade(toUnl){
	if(toUnl.locked == true){
		toUnl.locked = false;
		const upg = document.createElement('img');
		upg.src = 'upg_textures/' + toUnl.id + '.png';
		upg.width = "156";
		upg.height = "64";
		upg.onclick = function() {buyUpg(toUnl);};
		upg.oncontextmenu = function() {inspectUpgrade(toUnl);};
		upg.style="image-rendering: pixelated;"
		upg.id= toUnl.id;
		upg.className='clicki-img';
		console.log(upg.onclick);
		document.getElementById("upgSec").append(upg);
	}
}

function inspectUpgrade(upg){
alert("Name: " + upg.name + "; " + "Description: " + upg.description + "; " + "Cost: " + (upg.cost + 1)); 
}



function ball(){
	clicks = clicks * 4;
	let para = document.getElementById("numDisplay");
	para.textContent = "clicks: " + String(Math.round(clicks));
	let ball = document.getElementById("ball");
	ball.remove();
}

function cpsDisplayRefresh(){
	let para2 = document.getElementById("cpsDisplay");
	para2.textContent = "manual cps: " + clickPower + ";" + "automatic cps: " + autoCps;
}

// upgrade functions
function clickPowerIncrease(amt){
	clickPower += percentageOf(amt, clickPower);
	console.log("called!");
}
function goreHell(yu){
	clickPowerIncrease(500);
	let butSec = document.getElementById("buttonSec");
	butSec.style.backgroundImage = "url('button_bg_gore.png')";
	let upgSec = document.getElementById("upgSec");
	upgSec.style.backgroundImage = "url('wrench_bg_gore.png')";
}

function enableBuilding(yu){
	let bldSec = document.getElementById("bldSec");
	bldSec.style.display = "block";
}
	

// useful functions
function randInt(min, max){
	const minCeil = Math.ceil(min);
	const maxFloor= Math.floor(max);
	return Math.floor(Math.random() * (maxFloor - minCeil +1) + minCeil);
}

function percentageOf(prc, amt){
	return (prc/100)*amt;
}

// classes

class upgrade{
	constructor(name, description, cost, main_func, amt, locked, id){
		this.name = name;
		this.cost = cost;
		this.description = description;
		this.main_func = main_func;
		this.amt = amt;
		this.locked = locked;
		this.id = id;
	}
	buy(){
		clicks -= (this.cost + 1);
		this.main_func(this.amt);
		console.log("bought!");
	}
}

class building {
	constructor(name, description, cost, cps, id, amt_id){
		this.name = name;
		this.cost = cost;
		this.description = description;
		this.id = id;
		this.amt_id = amt_id;
		this.cps = cps;
	}
	buy(){
		clicks -= (this.cost + 1);
		amt_id += 1;
		console.log("bought!")
	}
	sell(){
		clicks += (percentageOf(75, this.cost + 1));
		amt_id -= 1;
		console.log("bought!")
	}
}
	
	
// upgrades
var click_boost = new upgrade("Silver Mouse", "Manual CPS improved by 15%", 49, clickPowerIncrease, 15, true, "click_boost");
var click_boost_2 = new upgrade("Golden Mouse", "Manual CPS improved by 15%", 99, clickPowerIncrease, 15, true, "click_boost_2");
var click_boost_3 = new upgrade("Obsidian Mouse", "Manual CPS doubled", 199, clickPowerIncrease, 100, true, "click_boost_3");

var toy_hammer = new upgrade("Toy Hammer", "Somebody gifted you a toy hammer, now go build something.", 199, enableBuilding, 100, true, "toy_hammer");

var ohno = new upgrade("NULL", "NULL", 13, goreHell, 100, true, "ohno");



