import { CounterDateTime } from '../modules/CounterDateTime.js';

var calculated_date = new CounterDateTime(new Date("18 September 2020"), new Date());
console.log(calculated_date.toString());

try {
    const year_element = document.getElementById("years");
    const month_element = document.getElementById("months");
    const day_element = document.getElementById("days");
    if (year_element != null) {
        if (calculated_date.getYear() == "00Y") {
            year_element.style.display = "none";
        }
        year_element.innerHTML = calculated_date.getYear();
    }
    if (month_element != null) {
        month_element.innerHTML = calculated_date.getMonth();
    }
    if (day_element != null) {
        day_element.innerHTML = calculated_date.getDay();
    }
}
catch (error) {
    console.error(error);
}