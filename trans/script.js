const hrtYearElement = document.getElementById("years");
const hrtMonthElement = document.getElementById("months");
const hrtDayElement = document.getElementById("days");
const realYearElement = document.getElementById("real-years");
const realMonthElement = document.getElementById("real-months");
const realDayElement = document.getElementById("real-days");

function calcHrtDate() {
    const startDate = new Date("18 September 2020 17:41:00 GMT+2");
    const endDate = new Date();
    const oneDayMs = 1000 * 60 * 60 * 24;
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / oneDayMs);
    const years = Math.floor(diffDays / 365);
    const months = Math.floor(diffDays / 30.44) % 12;
    const days = diffDays - (years * 365) - (Math.floor(months * 30.44));
    return { years, months, days };
}
function calcRealizationDate() {
    const startDate = new Date("20 November 2017 18:18:00 GMT+2");
    const endDate = new Date();
    const oneDayMs = 1000 * 60 * 60 * 24;
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / oneDayMs);
    const years = Math.floor(diffDays / 365);
    const months = Math.floor(diffDays / 30.44) % 12;
    const days = diffDays - (years * 365) - (Math.floor(months * 30.44));
    return { years, months, days };
}

function fixHrtElements() {
    var dateDifference = calcHrtDate();
    hrtYearElement.innerHTML = dateDifference.years;
    hrtMonthElement.innerHTML = dateDifference.months;
    hrtDayElement.innerHTML = dateDifference.days;
}
function fixRealizationElements() {
    var dateDifference = calcRealizationDate();
    realYearElement.innerHTML = dateDifference.years;
    realMonthElement.innerHTML = dateDifference.months;
    realDayElement.innerHTML = dateDifference.days;
}
fixHrtElements();
fixRealizationElements();
setTimeout(() => {
    fixHrtElements();
    fixRealizationElements();
}, 2000);