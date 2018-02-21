var huggif, y, yeshug;
huggif = document.getElementById("huggif");
yeshug = document.getElementById("yeshug");
y = 0;
document.getElementById("yeshug").addEventListener("click", function (event) {
    if (y < 1) {
        y = 1;
        yeshug.innerHTML = "Thank you";
        huggif.style.visibility = "visible";   
    } else {
        y = 0;
        yeshug.innerHTML = "Yeah...";
        huggif.style.visibility = "hidden";   
    }
}, false);