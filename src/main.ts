import {app, BrowserWindow} from 'electron';
import path from "path";

let mainWindow: Electron.BrowserWindow | null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js') // 필요에 따라 preload 스크립트 추가
        }
    });

    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
