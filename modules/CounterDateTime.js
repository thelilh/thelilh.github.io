export class CounterDateTime {
    years = 0;
    months = 0;
    days = 0;

    constructor(start_date, end_date) {
        const monthDiff = (dateFrom, dateTo) => dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
        const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

        this.months = monthDiff(start_date, end_date);

        while (this.months >= 12) {
            this.months -= 12;
            this.years += 1;
        }

        this.days = end_date.getDate() - start_date.getDate();

        if (this.days < 0) {
            this.months -= 1;
            let month = end_date.getMonth() - 1;

            let tempDays = daysInMonth(end_date.getFullYear(), month < 0 ? 12 : month) + this.days;
            this.days = tempDays;
        }
    }

    toString = () => `Years: ${this.years}, Months: ${this.months}, Days: ${this.days}`;

    getYear = () => this.years > 10 ? `${this.years}Y` : `${this.years}Y`;
    getYearOnly = () => this.years > 10 ? `${this.years}` : `${this.years}`;

    getMonth = () => this.months > 10 ? `${this.months}M` : `${this.months}M`;
    getMonthOnly = () => this.months > 10 ? `${this.months}` : `${this.months}`;

    getDay = () => this.days > 10 ? `${this.days}D` : `${this.days}D`;
    getDayOnly = () => this.days > 10 ? `${this.days}` : `${this.days}`;
}