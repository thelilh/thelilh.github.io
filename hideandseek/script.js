var obj;
var lineList = document.getElementById("lines");
var stationSelect = document.getElementById("stationSelect");
var stationInfo = document.getElementById("stationInfo");
setStationInformationVisibility(false);

lineList.onchange = function() {
    showStations(this.value, true);
};
stationSelect.onchange = function() {
    selectStation(this.value);
}
var data = []
var stations = []
fetch('./data.json')
    .then((response) => response.json())
    .then((json) => obj = json)
    .then(() => {
        obj.forEach((l) => {
            var line = new Line(l.lineNumber, l.lineName, l.stations);
            data.push(line);
            l.stations.forEach((s) => {
                if (!stations.includes(s)) {
                    stations.push(s);
                }
            });
        })
    })
    .then(() => {
        generateLines();
        generateStations();
    });

function generateLines() {
    lineList.innerHTML = "<option value=\"0\" selected>Select a line</option>";
    data.forEach((l) => {
        lineList.innerHTML += `<option value="${l.LineNumber}">${l.LineName} (${l.LineNumber})</option>`;
    });
}

function generateStations() {
    stations.sort();    
    stationSelect.innerHTML = "<option value=\"0\" selected>Select a station</option>";
    stations.forEach((s) => {
        stationSelect.innerHTML += `<option value="${s}">${s}</option>`;
    });
}

function showStations(lineNumber, clearStation = false) {
    var stationList = document.getElementById("stations");
    var lineNameElement = document.getElementById("lineName");
    lineNameElement.innerText = "";
    stationList.innerHTML = "";
    data.forEach((l) => {
        if (l.LineNumber == lineNumber) {
            lineNameElement.innerHTML = `<span style="color: #e23d28">Line ${l.LineNumber}:</span> ${l.LineName}`;

            // If the station that is currently selected is on the line that is selected, do not clear the station information. Otherwise, clear the station information.
            if (l.Stations.includes(stationSelect.value) && clearStation) {
                clearStation = false;
            }

            l.Stations.forEach((s) => {
                stationList.innerHTML += `<div class="station"><div class="v-stepper"><div class="circle"></div><div class="line"></div></div><div class="content">${s}</div></div>`;
            });
        }
    });

    if (clearStation) {
        stationSelect.selectedIndex = "0";
        showInformationAboutStation(0, []);
    }   
}

function selectStation(station) {
    let count = 0;
    let lastLine = 0;
    let lines = [];

    if (station == "0") {
        showStations(0);
        showInformationAboutStation(0, lines);
        return;
    }

    data.forEach((l) => {
        if (l.Stations.includes(station)) {
            count++;
            lastLine = l.LineNumber;
            lines.push(l);
        }
    });

    if (count == 1) {
        showStations(lastLine);
        showInformationAboutStation("0", [])
        lineList.selectedIndex = `${lastLine}`;
    }
    else {
        let clearStations = true;
        lines.forEach(l => {
            if (l.LineNumber == lineList.value) {
                clearStations = false;
            }
        })

        if (clearStations) {
            lineList.selectedIndex = "0";
            showStations(0);
        }

        showInformationAboutStation(station, lines);
    }

}

function showInformationAboutStation(station, lines) {
    let stationNameElement = document.getElementById("stationName");
    let stationLinesElement = document.getElementById("stationLines");
    stationNameElement.innerText = "";
    stationLinesElement.innerHTML = "";

    if (station == "0") {
        setStationInformationVisibility(false);
        return;
    }

    setStationInformationVisibility(true);

    stationNameElement.innerText = station;

    lines.forEach((l) => {
        stationLinesElement.innerHTML += `<li>${l.LineName} (${l.LineNumber})</li>`;
    });
}

function setStationInformationVisibility(visible) {
    if (visible) {
        stationInfo.style.display = "block";
    }
    else {
        stationInfo.style.display = "none";
    }
}

class Line {
    constructor(lineNumber = 0, lineName = "", stations = []) {
        this.LineName = lineName;
        this.LineNumber = lineNumber;
        this.Stations = stations;
    }
}