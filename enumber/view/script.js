// General Stuff from the E-Number Page
var title = document.getElementById("title");
var description = document.getElementById("description");

// Actual code :3
var id = getIdFromUrl();

if (id == null) {
    window.location.href = `../search/`;
}
else {
    getEnumberForId(id);
}

// Functions
function getIdFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("id")) {
        return urlParams.get("id");
    }
 
    return null;
}

function getEnumberForId(id) {
    var eNumber = new ENumber('', '', '', '', '');
    var hasFound = false;

    fetch('../data.json')
        .then((response) => response.json())
        .then((json) => obj = json)
        .then(() => {
            obj.forEach((e) => {
                var tempId = toEnumber(id).toLowerCase();
                var tempENumber = toEnumber(e.eNumber).toLowerCase();
               
                if (tempENumber == tempId) {
                    eNumber = new ENumber(e.name, e.eNumber, e.status, e.comment, '')
                    hasFound = true;
                }
            })
        })
        .then(() => {
            if (!hasFound) {
                console.log("Couldn't find E-Number with ID: " + id);   
                displayEnumber(id);
                return;
            }
        
            displayEnumber(eNumber);
            return;
        });
}

function displayEnumber(enumber) {
    if (typeof(enumber) == "string") {
        console.log("Couldn't find E-Number: " + enumber);
        title.innerText = "E-Number Not Found";
        if (enumber.toLowerCase().startsWith("e")) {
            description.innerText = `Can't find ${enumber}.`;
        }
        else {
            description.innerText = `Can't find E-${enumber}.`;
        }
        return;
    }    

    if (enumber.Number != null) {
        title.innerText = enumber.Number;
    }

    if (enumber.Name != null && enumber.Name.length > 0) {
        description.innerText = enumber.Name;
    }
    else {
        description.innerText = "No description available for this E-Number.";
    }
}

function toEnumber(number) {
    if (number.toLowerCase().startsWith("e")) {
        return number;
    }
    return "E" + number;
}