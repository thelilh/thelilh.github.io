class ENumber {
    constructor(name = "", num = "", status = "") {
        this.Name = name
        this.Number = num;
        this.VeganStatus = status;
    }
}

let eNumberTable = document.getElementById("eNumberTable");

function GetAllENumbers() {
    return [
        new ENumber("Curcumin", "100", "vegan"),
        new ENumber("Riboflavin", "101", "vegan"),
        new ENumber("Riboflavin-5'-Phosphate", "101a", "vegan"),
        new ENumber("Tartrazine", "102", "vegan"),
        new ENumber("Alkannin", "103", "Vegan"),
        new ENumber("Quinoline Yellow WS", "104", "Vegan"),
        new ENumber("Fast Yellow AB", "105", "vegan"),
        new ENumber("Riboflavin-5-Sodium Phosphate", "106", "vegan"),
        new ENumber("Yellow 2G", "107", "vegan"),
        new ENumber("Sunset Yellow FCF", "110", "vegan"),
        new ENumber("Orange GGN", "111", "vegan"),
        new ENumber("Cochineal, Carminic acid, Carmine", "120", "no"),
        new ENumber("Citrus Red 2", "121", "vegan")
        // TODO: Add more E-Numbers
    ];
}

function GenerateTable() {
    GetAllENumbers().forEach((e) => {
        var style = "";
        if (e.VeganStatus.toLowerCase() == "vegan") {
            style = "background-color: green !important; color: white;"
        }
        else if (e.VeganStatus.toLowerCase().includes("vegetarian")) {
            style = "background-color: yellow !important; color: black;"
        }
        else {
            style = "background-color: red !important; color: white;"
        }
        eNumberTable.innerHTML += "<tr><td>" + e.Name + "</td><td>" + e.Number + "</td><td style=\"" + style + "\">" + Capitalize(e.VeganStatus) + "</td></tr>"
    })
}
GenerateTable()

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

function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("eNumberTable");
    header = document.getElementById("header");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                if (i != 0) {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}