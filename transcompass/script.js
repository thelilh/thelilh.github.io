var pInputs = {yes: document.getElementById("po1"), no:  document.getElementById("po2"), message:"Techie", positionx: 0, positiony : -1} /* Do you like to program? */
var mInputs = {yes: document.getElementById("mo1"), no:  document.getElementById("mo2"), message:"Slut", positionx: -1, positiony : 0}/* Do you want someone to be your master? */
var nInputs = {yes: document.getElementById("no1"), no:  document.getElementById("no2"), message:"Prude", positionx: 1, positiony : 0}/* Are you shocked by seeing people naked? */
var gInputs = {yes: document.getElementById("go1"), no:  document.getElementById("go2"), message:"Gun Nut", positionx: 0, positiony : 1}/* Do you like guns? */
var inputs = [pInputs, mInputs, nInputs, gInputs];
var board = document.getElementById("board");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var img = new Image();
img.src = "board.png";
img.onload = function() {canvas.height = img.height; canvas.width = img.width; ctx.drawImage(img,0,0);}

function IsChecked(someInput) {
	var anyChecked = someInput.yes.checked || someInput.no.checked;
	if(!anyChecked) {
		return null;
	}
	return someInput.yes.checked;
}
function GetScaleForImage(img,canvas) {
	var scaleH = canvas.height / img.height;
	var scaleW = canvas.width / img.width;
	return Math.min(scaleH,scaleW);
}
function GetTextFromInputs() {
	if(!inputs.reduce((acc, input) => acc && (IsChecked(input) !== null))) {
		return null;
	}
	var str = inputs.filter( x => IsChecked(x)).map(x => x.message);
	console.log(str);
	if(str == false){return "Neutral";}
	return str;
}

function UpdateImage() {
    'use strict';
    var uwumode, t1, t2, t3, t4, yougot;
    uwumode = document.getElementById("uwumode");
    t1 = document.getElementById("title1");
    t2 = document.getElementById("title2");
    t3 = document.getElementById("title3");
    t4 = document.getElementById("title4");
    yougot = document.getElementById("yougot");   
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (o7.checked === false && o8.checked === false) {
        o7.scrollIntoView();
        document.getElementById("title4").classList.add("red");
    } else {
        document.getElementById("title4").classList.remove("red");
    }
    if (o5.checked === false && o6.checked === false) {
        o5.scrollIntoView();
        document.getElementById("title3").classList.add("red");
    } else {
        document.getElementById("title3").classList.remove("red");
    }
    if (o3.checked === false && o4.checked === false) {
        o3.scrollIntoView();
        document.getElementById("title2").classList.add("red");
    } else {
        document.getElementById("title2").classList.remove("red");
    }
    if (o1.checked === false && o2.checked === false) {
        o1.scrollIntoView();
        document.getElementById("title1").classList.add("red");
    } else {
        document.getElementById("title1").classList.remove("red");
    }
}
function UpdateRadio() {
    'use strict';
    var o1, o2, o3, o4, o5, o6, o7, o8, l1, l2, l3, l4, l5, l6, l7, l8, uwumode, board, t1, t2, t3, t4;
    o1 = document.getElementById("po1");
    o2 = document.getElementById("po2");
    o3 = document.getElementById("mo1");
    o4 = document.getElementById("mo2");
    o5 = document.getElementById("no1");
    o6 = document.getElementById("no2");
    o7 = document.getElementById("go1");
    o8 = document.getElementById("go2");
    l1 = document.getElementById("l1");
    l2 = document.getElementById("l2");
    l3 = document.getElementById("l3");
    l4 = document.getElementById("l4");
    l5 = document.getElementById("l5");
    l6 = document.getElementById("l6");
    l7 = document.getElementById("l7");
    l8 = document.getElementById("l8");
    board = document.getElementById("board");
    uwumode = document.getElementById("uwumode");
    t1 = document.getElementById("title1");
    t2 = document.getElementById("title2");
    t3 = document.getElementById("title3");
    t4 = document.getElementById("title4");
    if (o1.checked === false) {
        l1.src = "yes_deactive.png";
    } else {
        l1.src = "yes_active.png";
    }
    if (o2.checked === false) {
        l2.src = "no_deactive.png";
    } else {
        l2.src = "no_active.png";
    }
    if (o3.checked === false) {
        l3.src = "yes_deactive.png";
    } else {
        l3.src = "yes_active.png";
    }
    if (o4.checked === false) {
        l4.src = "no_deactive.png";
    } else {
        l4.src = "no_active.png";
    }
    if (o5.checked === false) {
        l5.src = "yes_deactive.png";
    } else {
        l5.src = "yes_active.png";
    }
    if (o5.checked === false) {
        l5.src = "yes_deactive.png";
    } else {
        l5.src = "yes_active.png";
    }
    if (o6.checked === false) {
        l6.src = "no_deactive.png";
    } else {
        l6.src = "no_active.png";
    }
    if (o7.checked === false) {
        l7.src = "yes_deactive.png";
    } else {
        l7.src = "yes_active.png";
    }
    if (o8.checked === false) {
        l8.src = "no_deactive.png";
    } else {
        l8.src = "no_active.png";
    }
    if (uwumode.checked === true) {
        t1.innerHTML = "Nyaa, do you like to program uwu";
        t2.innerHTML = "Do you have any daddies or mommies uwu";
        t3.innerHTML = "Do you often >///<";
        t4.innerHTML = "Are guns cool uwu";
    } else {
        t1.innerHTML = "Do you have an knowledge of any programming language?";
        t2.innerHTML = "Do you have an sexual fantasies that may be out of the 'normal' for some? (i.e wanting to be someone's master)";
        t3.innerHTML = "If someone was standing naked in front of you, would you be scared? (if you know the person, not some random person)";
        t4.innerHTML = "Do you currently own a firearm or do you want to own a firearm?";
    }
	var newText = GetTextFromInputs();
	if(newText !== null) {
		yougot.innerHTML = "You got: " + newText;
	}
	var checkedinputs = inputs.filter(x => IsChecked(x) === true);
	if(checkedinputs == true) { //check if empty 
		
		var posx = checkedinputs.map(x => x.positionx).reduce((acc,input) => acc + input);
		var posy = checkedinputs.map(x => x.positiony).reduce((acc,input) => acc + input);
		
		//reset the canvas
		ctx.clearRect(0,0, canvas.width, canvas.height);
		//draw background images
		ctx.drawImage(img,0,0);
		//by default, the coordinate (0,0) is the top left corner of the canvas
		// translate changes the coordinate 0,0 to mean something else
		// in this case 0,0 now corresponds to the middle of the canvas
		ctx.translate((canvas.width/2),(canvas.height/2));
		//this means that negative coordinates are left/up of the center
		//i do this translation for convenience,
		var offset = 10;
		ctx.beginPath(); //declare you wanna start drawing
		ctx.arc(posy * canvas.width / 3, posx * canvas.height / 3, 10, 0, 2 * Math.PI) //draws a full circle
		ctx.fillStyle = "#FF0000"; //set the fill to red
		ctx.fill(); //fill what you've drawn
		ctx.stroke(); //outline what you've drawn
		ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the translation
	}
}