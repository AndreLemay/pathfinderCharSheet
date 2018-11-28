import { app, BrowserWindow } from "electron";
import * as path from "path";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow();

    mainWindow.loadFile(path.join(__dirname, "../views/CharSheet.html"));

    mainWindow.on("closed", (event) => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    app.quit();
});