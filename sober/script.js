import { CounterDateTime } from '../modules/CounterDateTime.js';

var calculated_date = new CounterDateTime(new Date("22 August 2023"), new Date("8 March 2024"));
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
        if (calculated_date.getMonth() == "00M" && calculated_date.getDay() == "00D") {
            year_element.innerHTML = calculated_date.years > 1 ? calculated_date.years + " YEARS" : calculated_date.years + " YEAR";
        }
    }
    if (month_element != null) {
        if (calculated_date.getMonth() == "00M") {
            month_element.style.display = "none";
        }
        month_element.innerHTML = calculated_date.getMonth();
        if (calculated_date.getYear() == "00Y" && calculated_date.getDay() == "00D") {
            month_element.innerHTML = calculated_date.months > 1 ? calculated_date.months + " MONTHS" : calculated_date.months + " MONTH";
        }
    }
    if (day_element != null) {
        if (calculated_date.getDay() == "00D") {
            day_element.style.display = "none";
        }
        day_element.innerHTML = calculated_date.getDay();
    }
}
catch (error) {
    console.error(error);
}