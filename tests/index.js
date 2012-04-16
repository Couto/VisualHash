var jsdom = require('jsdom').jsdom,
    fs = require('fs'),
    blacklistFiles = ['index.js', 'index.html', 'node_modules'];

// Recreate browser variables
// yes. I know global variables are bad.
// I'm open to suggestions
global.document = jsdom('<html><body></body></html>');
global.window = document.createWindow();
window.VisualHash = VisualHash = require(__dirname + '/../coverage/VisualHash');

fs.readdir(__dirname, function (err, files) {
    if (err) { throw new Error(err); }
    else {
        files.forEach(function (val) {
            if (blacklistFiles.indexOf(val) === -1) {
                require(__dirname + '/' + val)
            }
        }.bind(this));
    }
}.bind(this));