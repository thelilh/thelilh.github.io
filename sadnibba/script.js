var sadnibbatxt = document.getElementById("sadnibbatxt");
document.getElementById("sadnibba").addEventListener("click", function (event) {
    sadnibbatxt.style.visibility = "visible";
}, false);
document.body.onload = function () {
    sadnibbatxt.style.visibility = "hidden";
};