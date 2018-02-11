var huggif = document.getElementById("huggif");
document.getElementById("yeshug").addEventListener("click", function (event) {
    huggif.style.visibility = "visible";
}, false);
document.body.onload = function () {
    huggif.style.visibility = "hidden";
};