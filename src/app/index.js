const { app, BrowserWindow, Menu } = require('electron');

const isDevelopment = true;


function goWindow() {
    const window = new BrowserWindow({
        title: "NEXE-DECOMPILATOR",
        icon: `./src/assets/img/logo.png`,

        width: 1e3,
        height: 900,


        frame: false,
        transparent: true,

        movable: true,
        resizable: false,
        fullscreenable: false,
        maximizable: false,

        webPreferences: {
            nodeIntegration: true,
        }
    });
    window.loadFile(`../assets/page/index.html`);
    if (isDevelopment) {
        window.webContents.openDevTools({ mode: "detach" });
    };
    window.on("closed", () => {
        mainWindow = null;
    });
    mainWindow = window
    const titleBarMenu = [
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'selectAll' },
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Appearance',
                    submenu: [

                        { role: 'zoomIn' },
                        { role: 'zoomOut' },
                        { role: 'resetZoom' }
                    ]
                },
                {
                    label: 'Window',
                    submenu: [
                        { role: 'reload' },
                        { role: 'forceReload' },
                        { role: 'togglefullscreen' },
                        { type: 'separator' },
                        { role: 'minimize' },
                        // { role: 'maximize' },
                        { role: 'close' }
                    ]
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                { role: 'toggleDevTools' },
                { type: 'separator' },
                {
                    label: 'Developper',
                    submenu: [

                        {
                            label: 'Github', click: function () {
                                shell.openExternal('https://github.com/zougataga');
                            }
                        },
                    ]
                },
                {
                    label: 'Source Code',
                    submenu: [

                        {
                            label: 'Github', click: function () {
                                shell.openExternal('https://github.com/zougataga/nexe-decompilator');
                            }
                        },
                    ]
                }
            ]
        }
    ];
    if (process.platform === 'darwin') {
        titleBarMenu.unshift({
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' },
            ]
        });
        // Window menu
        titleBarMenu[3].submenu = [
            { role: 'close' },
            { role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { role: 'front' },
        ];
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(titleBarMenu));
};

app.on("ready", async () => {
    goWindow();
});
app.on("activate", () => {
    if (mainWindow !== null) return;
    goWindow();
});

app.on("window-all-closed", () => {
    if (process.platform === "darwin") return;
    app.quit();
});




