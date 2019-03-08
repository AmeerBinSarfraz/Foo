// file system
var normalize_path = require('path').join(__dirname, "../src/routes");
var path = '../src/routes/';

module.exports = (app) => {
    const fs = require('fs').readdirSync(normalize_path).forEach((file) => {
        // uncomment this for testing
        // console.log(file," route loaded");
        require(path + file)(app);
    });
}