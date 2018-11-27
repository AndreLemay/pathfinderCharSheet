import { app, BrowserWindow } from "electron";
import * as path from "path";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadFile(path.join(__dirname, "../views/main.html"));

    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", (event) => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    app.quit();
});