const yearElement = document.getElementById("years");
const monthElement = document.getElementById("months");
const dayElement = document.getElementById("days");

function calcAlcoholFreeDate() {
    const startDate = new Date("22 August 2023 00:00:00 GMT+2");
    const endDate = new Date();
    const oneDayMs = 1000 * 60 * 60 * 24;
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / oneDayMs);
    const years = Math.floor(diffDays / 365);
    const months = Math.floor(diffDays / 30.44) % 12;
    const days = diffDays - (years * 365) - (Math.floor(months * 30.44));
    return { years, months, days };
}

function fixAlcoholFreeElements() {
    var dateDifference = calcAlcoholFreeDate();
    yearElement.innerHTML = dateDifference.years;
    monthElement.innerHTML = dateDifference.months;
    dayElement.innerHTML = dateDifference.days;
}
fixAlcoholFreeElements();
setTimeout(() => {
    fixAlcoholFreeElements();
}, 2000);