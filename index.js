import { Translations } from './modules/Translations.js';

const lang = navigator.language.substring(0, 2);
const translations = await Translations.build("translations.json", lang);

document.getElementById("yippee").innerHTML = translations.GetString("word");