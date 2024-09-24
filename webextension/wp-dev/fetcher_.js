"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchHtml = fetchHtml;
var htmlFolder = 'html/';
function fetchHtml(filename) {
    var url = browser.runtime.getURL(htmlFolder + filename);
    // this is th epromise that we return and letting the fetch function handle resolving the promise
    return fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (text) { return text; })
        .catch(function (error) { return console.error(error); });
}
