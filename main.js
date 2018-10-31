const { BrowserWindow, app } = require('electron');

let win;
app.on('ready', () => {
 win = new BrowserWindow();
});

