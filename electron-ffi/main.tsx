/* eslint-disable no-undef */
const { app, BrowserWindow } = require('electron');

const isDev = true;//process.env.NODE_ENV === 'development';
console.log(process.env.NODE_ENV);

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
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,
            allowRunningInsecureContent: isDev,
        },
    });

    mainWindow.loadURL("http://localhost:5173/");

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
