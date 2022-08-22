require('electron').remote.getCurrentWindow().on('close', evt => evt.preventDefault())

const config = require("../../config.json");
const remote = require('electron').remote;
const win = remote.getCurrentWindow();

const titre = [];
let i = 0;
while (i < 3) {
    titre.push(`titre${i++}`)
};
titre.forEach(n => {
    const t = document.getElementById(n);
    t.innerText = n === "titre1" ? `${config.app.name} - v${config.app.version}` : config.app.name;
});


document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {


        document.getElementById('max-button').addEventListener("click", event => win.minimize()); // min
        // document.getElementById('max-button').addEventListener("click", event => win.maximize());
        // document.getElementById('restore-button').addEventListener("click", event => win.unmaximize());
        document.getElementById('close-button').addEventListener("click", event => win.close());

        // resteormaxButton();
        // win.on('maximize', resteormaxButton);
        // win.on('unmaximize', resteormaxButton);
        // function resteormaxButton() {
        //     if (win.isMaximized()) {
        //         document.body.classList.add('maximized');
        //     } else {
        //         document.body.classList.remove('maximized');
        //     }
        // }
    }
};

window.onbeforeunload = (event) => {
    win.removeAllListeners();
};

