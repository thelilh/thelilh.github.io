class Citation {
    constructor(url = "", id = 0) {
        this.Url = url;
        this.Id = id+1;
    }

    ToString() {
        return "<a href=\""+this.Url+"\">"+this.Url+"</a>"
    }

    ToShortCitation() {
        return "<a href=\"#citation"+this.Id+"\">["+this.Id+"]</a>"
    }

    GetUrl() {
        return this.Url;
    }

    GetId() {
        return this.Id;
    }
}