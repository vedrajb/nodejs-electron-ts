const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: `${__dirname}/preload`,
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    
    win.loadFile('../../index.html');
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

// main app code
const {temp} = require (`${__dirname}/../modules/ts/my-app`);
