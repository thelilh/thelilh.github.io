var obj;
let eNumberTable = document.getElementById("eNumberTable");
var citationUl = document.getElementById("citationUl");
var blahaj = false;
blahajBtn.style.display = "none";
var citationList = []
var data = []
fetch('./data.json')
    .then((response) => response.json())
    .then((json) => obj = json)
    .then(() => {
        var citationTemp = []
        obj.forEach((e) => {

            var source = e.source;
            if (e.source != null && e.source.length > 0) {
                source = e.source;
                if (!citationTemp.includes(source)) {
                    citationTemp.push(source)
                }
                var id = citationTemp.indexOf(source);
                var citation = new Citation(source, id)
                source = citation.ToShortCitation();
                if (!citationList.some(function (c) {
                    return c.ToShortCitation() == citation.ToShortCitation()
                })) {
                    citationList.push(citation);
                }
                var enumber = new ENumber(e.name, e.eNumber, e.status, e.comment, source)
                data.push(enumber);
            }
            else {
                var enumber = new ENumber(e.name, e.eNumber, e.status, e.comment, source)
                data.push(enumber);
            }
        })
    })
    .then(() => {
        citationList.forEach((e) => {
            citationUl.innerHTML += `<li id=\"citation${e.GetId()}\">${e.ToString()}</li>`
        });
        displayTable(currentPage);
    });

function Capitalize(text = "") {
    var split = text.split(/-| /);
    if (split.length <= 1)
        return text.charAt(0).toUpperCase() + text.substring(1)

    var test = ""
    for (let i = 0; i < split.length; i++) {
        var splitAtI = split[i];
        test += splitAtI.charAt(0).toUpperCase() + splitAtI.substring(1) + " "
    }

    return test;
}

function searchInTable() {
    // Declare variables
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();

    displayTable(currentPage, filter)
}

function ToggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-theme");
}

function ToggleHeaders(header, shouldHide = false) {
    var headers = header.getElementsByTagName("th");
    for (i = 0; i < headers.length; i++) {
        if (i != headers.length - 1) {
            if (shouldHide) {
                headers[i].style.display = "none"
            }
            else {
                headers[i].style.display = ""
            }
        } else {
            if (shouldHide) {
                headers[i].style.display = ""
            }
            else {
                headers[i].style.display = "none"
            }
        }
    }
}

const rowsPerPage = 20;
let currentPage = 1;

function displayTable(page, searchTerm = "") {
    const table = document.getElementById("eNumberTable");
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Filter data based on search term (case-insensitive)
    const filteredData = data.filter(item => {
        const searchString = `${item.Name} ${item.Number} ${item.VeganStatus} ${item.Comment} ${item.Source}`;
        return searchString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const slicedData = filteredData.slice(startIndex, endIndex);

    // Clear existing table rows
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Vegan Status</th>
            <th>Comments</th>
            <th>Source</th>
        </tr>
    `;

    // Add new rows to the table
    slicedData.forEach(item => {
        const row = table.insertRow();
        const nameCell = row.insertCell(0);
        const numberCell = row.insertCell(1);
        const veganStatusCell = row.insertCell(2);
        const commentsCell = row.insertCell(3);
        const sourceCell = row.insertCell(4);
        nameCell.innerHTML = item.Name;
        numberCell.innerHTML = item.Number;
        veganStatusCell.innerHTML = item.VeganStatus;
        commentsCell.innerHTML = item.Comment;
        sourceCell.innerHTML = item.Source;
    });

    // Update pagination with the filtered data
    updatePagination(page, filteredData.length);
}


function updatePagination(currentPage, maxPages) {
    const pageCount = Math.ceil(maxPages / rowsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= pageCount; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.innerText = i;
        pageLink.onclick = function () {
            displayTable(i);
        };
        if (i === currentPage) {
            pageLink.style.fontWeight = "bold";
        }
        paginationContainer.appendChild(pageLink);
        paginationContainer.appendChild(document.createTextNode(" "));
    }
}

// Initial display
displayTable(currentPage);