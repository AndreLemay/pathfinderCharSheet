import { app, BrowserWindow } from "electron";
import * as path from "path";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            textAreasAreResizable: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, "../views/CharSheet.html"));

    mainWindow.on("closed", (event) => {
        mainWindow = null;
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.maximize();
    })
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    app.quit();
});