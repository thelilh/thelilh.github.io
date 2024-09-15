const translations = "experience.json"

fetch(translations)
    .then((response) => response.json())
    .then((json) => GenerateWebsite(json));

function GenerateWebsite(json) {
    let bodyData = ""
    for (const [key, value] of Object.entries(json)) {
        bodyData += ReturnSubentries(key, value)
    }
    document.body.innerHTML = bodyData
}

function ReturnSubentries(key, entry) {
    let result = ""
    if (typeof (entry) == "object") {
        result += `<div class="${key}"><h1>${capitalizeFirstLetter(key)}</h1>`
        for (const [key, value] of Object.entries(entry)) {
            result += ReturnSubentries(key, value)
        }
        result += `</div>`
    }
    else {
        // okay so this part is fun?
        if (entry.includes("http://") || entry.includes("https://")) {
            result += `<a class="${key}" href="${entry}">${entry}</a>`
        }
        else {
            result += `<p class="${key}">${entry}</p>`
        }
    }

    return result;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}