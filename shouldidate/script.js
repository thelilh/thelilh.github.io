var age_a, age_b, dif;
function agechecker() {
    'use strict';
    age_a = document.getElementById("age_a").value;
    age_b = document.getElementById("age_b").value;
    if (Math.abs(~~age_a - ~~age_b) <= 3 && age_a > 0 && age_a < 100 && age_b > 0 && age_b < 100) {
        document.getElementById("dif").innerHTML = "Yes";
    }
    if (Math.abs(~~age_a - ~~age_b) > 3 && age_a > 0 && age_a < 100 && age_b > 0 && age_b < 100) {
        document.getElementById("dif").innerHTML = "No";
    }
    if (age_a < 15 || age_b < 15 && age_a > 0 && age_a < 100 && age_b > 0 && age_b < 100) {
        document.getElementById("dif").innerHTML = "No";
    }
    if (age_a === age_b && age_a > 0 && age_a < 100 && age_b > 0 && age_b < 100) {
        document.getElementById("dif").innerHTML = "Yes";
    }
    setTimeout(function () {
        agechecker();
    }, 100);
}