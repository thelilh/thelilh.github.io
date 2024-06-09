class ENumber {
    constructor(name = "", num = "", status = "", comment = "", source = "") {
        this.Name = name
        this.Number = num;
        this.VeganStatus = status;
        this.Comment = comment;
        this.Source = source;
    }

    ToTable() {
        var style = "";
        if (this.VeganStatus.toLowerCase() == "vegan") {
            style = "background-color: green !important; color: white;"
        }
        else {
            style = "background-color: red !important; color: white;"
        }
        return "<tr><td>" + this.Name + "</td><td>" + this.Number + "</td><td style=\"" + style + "\">" + Capitalize(this.VeganStatus) + "</td><td>"+this.Comment+"</td><td>"+this.Source+"</td></tr>"
    }
}