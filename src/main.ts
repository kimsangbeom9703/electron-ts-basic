import {app, BrowserWindow} from 'electron';
import * as path from "path";

let mainWindow: Electron.BrowserWindow | null;


const createWindow = async () => {
    // browser window를 생성합니다.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // fullscreen: true,
        // frame: false,
        // kiosk: true,
        // alwaysOnTop: true,
        // show: false,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
            backgroundThrottling: false,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile(path.join(__dirname, "../views/index.html"));
    mainWindow.webContents.openDevTools();
    return mainWindow;
}
app.whenReady().then(async() => {
    await createWindow()

    // Linux와 Winodws 앱은 browser window가 열려 있지 않을 때 종료됩니다.
    // macOS는 browser window가 열려 있지 않아도 계속 실행되기 때문에,
    // browser window가 열려 있지 않을 때 앱을 활성화 하면 새로운 browser window를 열어줍니다.
    app.on('activate', async () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            await createWindow()
        }
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})