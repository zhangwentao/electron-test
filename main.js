const { BrowserWindow, app } = require('electron');

let win;
/*
app.on('ready', () => {
 win = new BrowserWindow();
});
*/
app.whenReady().then(()=>{
    win = new BrowserWindow();
    win.loadFile('index.html');
});
app.on('window-all-closed', () => {
    debugger;
    app.quit();
})

