import { Translations } from '../modules/Translations.js';

let lang = navigator.language.substring(0, 2);
lang = "sv";
const translations = await Translations.build("../translations.json", lang);

const listOfTranslations = document.querySelectorAll('[data-translatable]');
listOfTranslations.forEach((trans) => {
    const attribute = trans.getAttribute("data-translatable");
    let getFrom = attribute;
    if (!attribute) {
        getFrom = trans.id;
    }
    const translation = translations.GetString(getFrom);
    if (translation != "N/A") {
        trans.innerHTML = translation;
    }
    else {
        console.warn('Missing translation for "' + getFrom + '"')
    }
});