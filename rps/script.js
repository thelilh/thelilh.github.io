// this toggles the visibility of the script.js content in a table format
let playerCount = 0;

let types = ['rock', 'paper', 'scissors'];
setImageForIndex(1, "unknown"); // Default image for player 1
setImageForIndex(2, "unknown"); // Default image for player 1

function setPlayers(players) {
    playerCount = players;

    if (playerCount < 1 || playerCount > 2) {
        console.error('Invalid player count. Must be between 1 and 2.');
        return;
    }
    else {
        if (playerCount === 1) {
            hidePlayerTwo();
        }
        else {
            showPlayerTwo();
        }
    }
}

function showPlayerTwo() {
    const rps2 = document.getElementById('rps2');
    if (rps2) {
        rps2.classList.remove('hidden');
    }
}
function hidePlayerTwo() {
    const rps2 = document.getElementById('rps2');
    if (rps2) {
        rps2.classList.add('hidden');
    }
}

function rpsActivate() {
    let x = Math.floor(Math.random() * types.length);
    let y = Math.floor(Math.random() * types.length);

    console.log(`Player 1 chose: ${x}`);
    console.log(`Player 2 chose: ${y}`);

    if (playerCount === 1) {
        setImageForIndex(1, types[x]);
    }
    else {  
        setImageForIndex(1, types[x]);
        setImageForIndex(2, types[y]);
    }
}

function setImageForIndex(index, type) {
    console.log(`Setting image for player ${index} with type: ${type}`);
    const rpsTitle = document.getElementById(`rpsTitle${index}`);
    const rpsImage = document.getElementById(`rpsImage${index}`);
    const rpsCredit = document.getElementById(`rpsCredit${index}`);

    if (type === 'rock') {
        rpsTitle.innerText = 'Rock';
        rpsImage.src = 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Rock-paper-scissors_%28rock%29.png';
        rpsImage.setAttribute('alt', 'A rock');
        rpsCredit.innerHTML = "<a href=\"https://commons.wikimedia.org/wiki/File:Rock-paper-scissors_(rock).png\">Sertion</a>, <a href=\"https://creativecommons.org/licenses/by-sa/3.0\">CC BY-SA 3.0</a>, via Wikimedia Commons";
    }
    else if (type === 'paper') {
        rpsTitle.innerText = 'Paper';
        rpsImage.src = 'https://upload.wikimedia.org/wikipedia/commons/a/af/Rock-paper-scissors_%28paper%29.png';
        rpsImage.setAttribute('alt', 'paper');
        rpsCredit.innerHTML = "<a href=\"https://commons.wikimedia.org/wiki/File:Rock-paper-scissors_(paper).png\">Sertion</a>, <a href=\"https://creativecommons.org/licenses/by-sa/3.0\">CC BY-SA 3.0</a>, via Wikimedia Commons";
    }
    else if (type === 'scissors') { 
        rpsTitle.innerText = 'Scissors';
        rpsImage.src = 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Rock-paper-scissors_%28scissors%29.png';
        rpsImage.setAttribute('alt', 'scissors');
        rpsCredit.innerHTML = "<a href=\"https://commons.wikimedia.org/wiki/File:Rock-paper-scissors_(scissors).png\">Sertion</a>, <a href=\"https://creativecommons.org/licenses/by-sa/3.0\">CC BY-SA 3.0</a>, via Wikimedia Commons";
    }
    else {
        rpsTitle.innerText = 'Unknown';
        rpsImage.src = '';
        rpsImage.setAttribute('alt', 'N/A');
        rpsCredit.innerText = '';
    }
}


function showScript() {
    const scriptElement = document.getElementById('scriptDiv');
    scriptElement.classList.remove('hidden');

    showOverlay();
}
function hideScript() {
    const scriptElement = document.getElementById('scriptDiv');
    scriptElement.classList.add('hidden');
    hideOverlay();
}

function showOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when overlay is visible
}

function hideOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling when overlay is hidden
}

// Dismiss all overlays when clicking outside the script table
function dismissAllOverlays() {
    hideScript();
}

// Fetch the script.js file and display its content in a table format
fetch('script.js')
    .then(response => response.text())
    .then(text => {
        const lines = text.split('\n');
        const tbody = lines.map((line, idx) =>
            `<tr><td class="line-number">${idx + 1}</td><td class="line-content">${line.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td></tr>`
        ).join('');
        document.getElementById('scriptTable').innerHTML = `<tbody>${tbody}</tbody>`;
    })
    .catch(error => {
        document.getElementById('scriptTable').innerHTML = '<tr><td colspan="2">Could not load file.</td></tr>';
    });