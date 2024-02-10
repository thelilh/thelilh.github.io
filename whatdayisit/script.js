Date.prototype.getWeek = function (dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */
    dowOffset = typeof (dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(), 0, 1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() -
        (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if (day < 4) {
        weeknum = Math.floor((daynum + day - 1) / 7) + 1;
        if (weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1, 0, 1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
                the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum + day - 1) / 7);
    }
    return weeknum;
};
let d = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const actualDayToday = days[d.getDay()];

const day = String(d.getDate()).padStart(2, '0');
const month = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
const year = d.getFullYear();

let today = day + '/' + month + '/' + year;
today = today + "<br/>(Week " + d.getWeek() + ")";
let loops = 0;
let loopsMax = 25;
let currentDay = 0;

function pollDOM() {
    var theDay = document.getElementById('theDay');
    var theDate = document.getElementById('theDate');
    const retryTime = 50; // in milliseconds
    theDate.innerHTML = today;
    theDay.innerHTML = days[currentDay]

    loops += 1

    if (currentDay < 6) {
        currentDay += 1
    } else {
        currentDay = 0
    }

    if (loops < loopsMax) {
        setTimeout(pollDOM, retryTime);
    } else {
        theDay.innerHTML = actualDayToday;
    }
}
pollDOM()