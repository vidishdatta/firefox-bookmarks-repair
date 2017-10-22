const fs = require('fs');
let defaultJSON = require("./bookmarks.json");

let nj = JSON.parse(JSON.stringify(defaultJSON));
const newFileName = "new-bookmarks-" + Date.now() + ".json";

repairJSON(nj);

fs.writeFile(newFileName, JSON.stringify(nj, null, 4), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved! : ", newFileName);
});

function repairJSON(json) {

    // Fix if dateAdded is 0
    if (json.dateAdded == 0) {
        json.dateAdded = Date.now();
    }

    // Fix when lastModified is 0 but dateAdded is available
    if (json.lastModified == 0) {
        json.lastModified = json.dateAdded;
    }

    if (json.children) {
        for (const child of json.children) {
            repairJSON(child);
        }   
    }
}