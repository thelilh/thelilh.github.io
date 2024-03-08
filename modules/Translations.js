export class Translations {
    translationsFile = undefined;
    jsonData = undefined;
    languageCode = "en";

    constructor(code, jsonData) {
        if (typeof code === 'undefined' || typeof jsonData == 'undefined') {
            throw new Error('Cannot be called directly');
        }
        this.languageCode = code;
        this.jsonData = jsonData;
    }
    static async build(translationsFile, code) {
        const supportedLanguages = [
            "en",
            "sv"
        ]
        if (supportedLanguages.indexOf(code) == -1) {
            code = "en";
        }
        this.languageCode = code;
        this.translationsFile = translationsFile;
        await fetch(this.translationsFile)
            .then((response) => response.json())
            .then((json) => this.jsonData = json);
        return new Translations(this.languageCode, this.jsonData);
    }

    GetString(key) {
        if (typeof this.jsonData[key] == 'undefined') {
            return "N/A"
        }
        if (typeof this.jsonData[key][this.languageCode] == 'undefined' && this.languageCode != "en") {
            console.warn('Missing translation for "' + key + '" in language ' + this.languageCode)
            return this.jsonData[key]["en"]; 
        }
        return this.jsonData[key][this.languageCode];
    }

    
}