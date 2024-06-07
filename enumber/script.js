class ENumber {
    constructor(name, num, status) {
        this.Name = name
        this.Number = num;
        this.VeganStatus = status;
    }
}

function SearchForENumber(query) {
    var list = GetAllENumbers();

    var result = list.filter(function(x) {
        if (query.length <= 0) {
            return true;
        }
        if (x.Name.toLowerCase() == query.toLowerCase()
            || x.Name.toLowerCase().includes(query.toLowerCase())
            || x.Name.toLowerCase().startsWith(query.toLowerCase()
            || x.Number.toLowerCase().includes(query.toLowerCase())
            || x.Number.toLowerCase().startsWith(query.toLowerCase())
            || x.Number.toLowerCase() == query.toLowerCase())
            || x.VeganStatus.toLowerCase().includes(query.toLowerCase())
            || x.VeganStatus.toLowerCase().startsWith(query.toLowerCase())
            || x.VeganStatus.toLowerCase() == query.toLowerCase()) {
                return true;
            }

        return false;
    
    })

    return result;
}

function GetAllENumbers() {
    return [new ENumber("Test", "100", "yes")];
}

console.log()