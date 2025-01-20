let el = document.getElementById("advent");
el.style.visibility = "";
let days = 24; // Default to 24, I guess? I dunno :3
let date = new Date(); // Get Current Date
let startDate = new Date(`12/1/${date.getFullYear()}`);
let christmasDate = new Date(`12/24/${date.getFullYear()}`);
let lang = navigator.language || navigator.userLanguage;
let langSplit = lang.split("-");
let locale = langSplit[1] || langSplit[0];

if (locale === "US" || locale === "GB" || locale === "FR") {
	days = 25;
	christmasDate = new Date(`12/25/${date.getFullYear()}`);
}
while(startDate.getDay() !== 1) {
	startDate.setDate(startDate.getDate() - 1);
	days++;
	console.log(startDate.toString())
}

let iDate = new Date(startDate);
let endDate = new Date(startDate);
endDate.setDate(endDate.getDate() + (days - 1));
while (endDate.getDay() !== 0) {
	endDate.setDate(endDate.getDate() + 1);
	console.log(endDate.toString())
}

let day = 1;
while(true) {
	let text = [];
	let className = ["day"]
	
	let dayOfTheWeek = GetDayOfTheWeek(iDate.getDay());
	className.push(dayOfTheWeek.toLowerCase())

	let disabled = "";

	if (iDate > date && !(iDate > christmasDate)) {
		className.push("disabled");
		disabled = "disabled";
	}

	if (iDate.getMonth() !== 11 || iDate > christmasDate) {
		className.push("out-of-range");
		disabled = "disabled";
	}

	if (iDate.getDate() === date.getDate()) {
		className.push("today")
	}


	text.push(`<div id=\"day${day}\" class=\"${className.join(" ")}\"><p class=\"day-of-week\">${dayOfTheWeek.toLowerCase()}</p><button onclick=\"ClickItem(${iDate})\" ${disabled}>${iDate.toString()}</button></div>`);

	el.innerHTML += text.join("");
	if (iDate - endDate === 0) {
		break;
	}
	iDate.setDate(iDate.getDate() + 1)

}

function GetDayOfTheWeek(day) {
	switch(day) {
		case 0:
			return "Sunday";
		case 1:
			return "Monday";
		case 2: 
			return "Tuesday";
		case 3: 
			return "Wednesday";
		case 4: 
			return "Thursday";
		case 5: 
			return "Friday";
		case 6: 
			return "Saturday";
		default:
			return "N/A"
	}
}

function ClickItem(day) {
	let date = new Date();
	let iDate = new Date(`12/${day}/${date.getFullYear()}`);

	if (iDate > date) {
		return;
	}

	let storedItem = localStorage.getItem(`day${day}`);

	if (storedItem === undefined || storedItem === null) {
		localStorage.setItem(`day${day}`, "opened")
	}
	else {
		alert("already opened")
	}
	return;
}
