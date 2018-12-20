import { app, BrowserWindow } from "electron";
import * as path from "path";
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from "electron-devtools-installer";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            textAreasAreResizable: false
        }
    });

    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]).then((name) => {
        console.log(`Added Extension:  ${name}`);
    }).catch((err) => {
        console.log('An error occurred: ', err)
    });

    mainWindow.loadFile(path.join(__dirname, "../views/main.html"));

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