const { app, BrowserWindow } = require('electron');
const path = require('path');
console.log(__dirname);
const { prototest, vedraj } = require(path.join(__dirname, '../out/modules/ts/proto-test'));


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.ts'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    
    win.loadFile('index.html');
};

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});

app.whenReady().then(() => {
    createWindow();

    // handle activate event
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});

console.log(`Hello from Electron 👋`)
console.log(`Vedraj has ${vedraj._legs} legs`)