const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const isDev = true;//process.env.NODE_ENV === 'development';

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        height: 700,
        width: 1000,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
            enableRemoteModule: true,
            // preload: path.join(__dirname, 'preload.js'),
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,
            allowRunningInsecureContent: isDev,
        }
    });

    mainWindow.loadURL("http://localhost:3000");

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
