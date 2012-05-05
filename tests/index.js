var jsdom = require('jsdom').jsdom,
    fs = require('fs');

// Recreate browser variables
// yes. I know global variables are bad.
// I'm open to suggestions
global.document = jsdom('<html><body></body></html>');
global.window = document.createWindow();
window.VisualHash = VisualHash = require(__dirname + '/coverage/VisualHash');

var files = fs.readdirSync(__dirname + '/tests');
files.forEach(function (val) {
    require(__dirname + '/tests/' + val)
});