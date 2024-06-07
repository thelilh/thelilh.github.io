class ENumber {
    constructor(name = "", num = "", status = "", comment = "") {
        this.Name = name
        this.Number = num;
        this.VeganStatus = status;
        this.Comment = comment;
    }

    ToTable() {
        var style = "";
        if (this.VeganStatus.toLowerCase() == "vegan") {
            style = "background-color: green !important; color: white;"
        }
        else {
            style = "background-color: red !important; color: white;"
        }
        return "<tr><td>" + this.Name + "</td><td>" + this.Number + "</td><td style=\"" + style + "\">" + Capitalize(this.VeganStatus) + "</td></tr>"
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
        eNumberTable.innerHTML += e.ToTable();
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

function searchInTable() {
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

function ToggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-theme");
  } 