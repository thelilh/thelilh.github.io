var obj;
let eNumberTable = document.getElementById("eNumberTable");
var resultHidden = document.getElementById("noResultsTable");
var blahajBtn = document.getElementById("blahajBtn");
var citationUl = document.getElementById("citationUl");
var blahaj = false;
resultHidden.style.display = "none";
blahajBtn.style.display = "none";
var citationList = []
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
                eNumberTable.innerHTML += enumber.ToTable();
            }
            else {
                var enumber = new ENumber(e.name, e.eNumber, e.status, e.comment, source)
                eNumberTable.innerHTML += enumber.ToTable();
            }
        })
    })
    .then(() => {
        citationList.forEach((e) => {
            citationUl.innerHTML += `<li id=\"citation${e.GetId()}\">${e.ToString()}</li>`
        });
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
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("eNumberTable");
    header = document.getElementById("header");
    tr = table.getElementsByTagName("tr");

    if (filter.trim() == "BLÅHAJ" || filter.trim() == "BLAHAJ") {
        blahaj = true;
        blahajBtn.style.display = "";
        ToggleBlahaj(header);
    }

    // Loop through all table rows, and hide those who don't match the search query
    var countOfHidden = 0;
    for (i = 0; i < tr.length; i++) {
        td = tr[i];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                if (i != 0) {
                    tr[i].style.display = "none";
                    countOfHidden++;
                }
            }
        }
    }
    if (countOfHidden == tr.length - 1) {
        ToggleHeaders(header, true)
        resultHidden.style.display = "";
    }
    else {
        ToggleHeaders(header, false)
        resultHidden.style.display = "none";
    }
}

function ToggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-theme");
}

function TurnOffBlahaj() {
    blahaj = false;
    header = document.getElementById("header");
    blahajBtn.style.display = "none";
    ToggleBlahaj(header)
}

function ToggleBlahaj(header) {
    var trans = header.getElementsByTagName("th");
    resultHidden.innerHTML = "test";
    for (i = 0; i < trans.length; i++) {
        var currentTd = trans[i];
        if (i == 0 || i == 4) {
            if (blahaj) {
                currentTd.classList.add("transBlue");
            }
            else {
                currentTd.classList.remove("transBlue");
            }
        }
        if (i == 1 || i == 3) {
            if (blahaj) {
                currentTd.classList.add("transPink");
            }
            else {
                currentTd.classList.remove("transPink");
            }
        }
        if (i == 2) {
            if (blahaj) {
                currentTd.classList.add("transWhite");
            }
            else {
                currentTd.classList.remove("transWhite");
            }
        }
    }
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