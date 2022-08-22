const { app, BrowserWindow, shell } = require('electron');
const config = require("../config.json");

let mainWindow;
const isDevelopment = config.isDevelopment;

function createMainWindow() {
    const window = new BrowserWindow({
        title: config.app.name,
        icon: `./assets/icon.ico`,
        width: 550,
        height: 400,
        frame: false,
        transparent: true,

        movable: true,
        resizable: false,
        fullscreenable: false,
        maximizable: false,

        webPreferences: {
            nodeIntegration: true
        }
    });
    window.loadFile(`./views/index.html`);
    if (isDevelopment) {
        window.webContents.openDevTools({ mode: "detach" });
    };
    window.on("closed", () => {
        mainWindow = null;
    });
    window.webContents.on("devtools-opened", () => {
        window.focus();
        setImmediate(() => {
            window.focus();
        });
    });
    window.webContents.on("new-window", (e, url) => {
        e.preventDefault();
        shell.openExternal(url);
    });

    return window;
};

app.on("window-all-closed", () => {
    if (process.platform === "darwin") return;
    app.quit();
});

app.on("activate", () => {
    if (mainWindow !== null) return;
    mainWindow = createMainWindow();
});

app.on("ready", async () => {
    mainWindow = createMainWindow();
});


