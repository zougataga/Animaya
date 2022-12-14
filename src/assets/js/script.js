const electron = require('electron');
const { Titlebar, Color } = require('pj-custom-electron-titlebar');
const fs = require('fs');
const path = require('path');
const os = require('os');

const dialog = electron.remote.dialog;

const titlebar = new Titlebar({
    backgroundColor: Color.fromHex('#222426'),
    icon: '../img/logo.png',
    //  shadow: true
});

const preload = document.querySelector(".preload");

window.onload = () => {
    var isAdvancedUpload = function () {
        var div = document.createElement('div');
        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    }();

    const form = document.querySelector(".form-container");


    const draggableFileArea = document.querySelector(".drag-file-area");
    const uploadIcon = document.querySelector(".upload-icon");
    const dragDropText = document.querySelector(".dynamic-message");
    const fileInput = document.querySelector(".default-file-input");
    const cannotUploadMessage = document.querySelector(".cannot-upload-message");
    const cannotUploadMessage2 = cannotUploadMessage.querySelector("p");
    const cancelAlertButton = document.querySelector(".cancel-alert-button");
    const uploadedFile = document.querySelector(".file-block");
    const fileName = document.querySelector(".file-name");
    const fileSize = document.querySelector(".file-size");
    const removeFileButton = document.querySelector(".remove-file-icon");
    const uploadButton = document.querySelector(".upload-button");
    let fileObj;

    const openInput = (ev) => {
        fileInput.click();
    };

    if (isAdvancedUpload) {
        stopLoading();


        uploadButton.addEventListener("click", () => {
            loading();


            if (fileObj) {
                const name = fileObj.n.split(".exe")[0];
                console.log(name);
                const inputDeco = fileObj.d || "";

                if (inputDeco.includes("})();;") && inputDeco.includes("<nexe~~sentinel>")) {
                    const code = inputDeco.split("})();;")[1].split("<nexe~~sentinel>");
                    const realCode = code[code.length - 2];
                    uploadedFile.style.cssText = "display: none;";
                    draggableFileArea.innerHTML = `
                         <span class="material-icons-outlined upload-icon">file_upload </span>
                         <h3 class="dynamic-message">Cliquez ici pour télécharger le source code de ${name}.exe</h3>
                         `;
                    uploadButton.innerHTML = "Retour";
                    uploadButton.addEventListener("click", async (ev) => {
                        window.location.reload();
                    });
                    draggableFileArea.removeEventListener("click", openInput, false);
                    draggableFileArea.addEventListener("click", async (ev) => {
                        ev.preventDefault();
                        dialog.showSaveDialog({
                            title: 'Sélectionnez le chemin où sauvegarder le fichier',
                            defaultPath: path.join(os.homedir(), "Downloads", `${name}.js`),
                            buttonLabel: 'Enregistrer',


                            filters: [
                                { name: 'js', extensions: ['js'] },
                            ],

                            properties: []
                        }).then(file => {
                            if (!file.canceled) {
                                const path = file.filePath.toString();
                                fs.writeFile(path, realCode, function (err) { if (err) throw err; });
                                notif("SUCCES", `Le fichier <strong>${name}.js</strong> a bien été sauvegarder dans: <strong>${path.split(`${name}.js`)[0]}</strong>`)
                            };
                        }).catch(err => {
                            console.log(err);
                        });
                    });
                    return stopLoading();
                } else {
                    cannotUploadMessage2.innerText = "Une erreur est survenue, assurez-vous que cette exe à bien été compiler avec nexe !"
                };

            } else {
                cannotUploadMessage2.innerText = "Merci de choisir un fichier avant !";
            };

            stopLoading();
            cannotUploadMessage.style.cssText = "display: flex; ";

        });

        cancelAlertButton.addEventListener("click", () => {
            cannotUploadMessage.style.cssText = "display: none;";
        });


        draggableFileArea.addEventListener("click", openInput, false);

        ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach(evt =>
            draggableFileArea.addEventListener(evt, e => {
                e.preventDefault();
                e.stopPropagation();
            })
        );

        ["dragover", "dragenter"].forEach(evt => {
            draggableFileArea.addEventListener(evt, e => {
                e.preventDefault();
                e.stopPropagation();
                uploadIcon.innerHTML = 'file_download';
                dragDropText.innerHTML = 'Choisissez votre fichier ou faites-le glisser ici';
            });
        });

        draggableFileArea.addEventListener("drop", async e => {
            await loading();

            const file = e.dataTransfer.files[0];
            if (file.name.endsWith(".exe")) {
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function () {
                    uploadIcon.innerHTML = 'check_circle';
                    dragDropText.innerHTML = 'Le fichier a été déposé avec succès !';
                    uploadButton.innerHTML = `Decompile`;
                    fileInput.files = e.dataTransfer.file;
                    fileName.innerHTML = file.name;
                    fileSize.innerHTML = (file.size / 1024).toFixed(1) + " KB";
                    uploadedFile.style.cssText = "display: flex;";
                    fileObj = {
                        n: file.name,
                        d: reader.result
                    }
                };
                reader.onerror = function () {
                    cannotUploadMessage2.innerText = "Une erreur est survenue !";
                    cannotUploadMessage.style.cssText = "display: flex; ";
                };
            } else {
                cannotUploadMessage2.innerText = "Ce fichier n'est pas un .exe !";
                cannotUploadMessage.style.cssText = "display: flex; ";
            }
            stopLoading();
        });

        fileInput.addEventListener("change", async e => {
            await loading();

            const file = fileInput.files[0];
            if (file.name.endsWith(".exe")) {
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function () {
                    uploadIcon.innerHTML = 'check_circle';
                    dragDropText.innerHTML = 'Le fichier a été déposé avec succès !';
                    uploadButton.innerHTML = `Decompile`;
                    fileName.innerHTML = file.name;
                    fileSize.innerHTML = (file.size / 1024).toFixed(1) + " KB";
                    uploadedFile.style.cssText = "display: flex;";
                    fileObj = {
                        n: file.name,
                        d: reader.result
                    }
                };
                reader.onerror = function () {
                    cannotUploadMessage2.innerText = "Une erreur est survenue !";
                    cannotUploadMessage.style.cssText = "display: flex; ";
                };
            } else {
                cannotUploadMessage2.innerText = "Ce fichier n'est pas un .exe !";
                cannotUploadMessage.style.cssText = "display: flex; ";
            }
            stopLoading();
        });

        removeFileButton.addEventListener("click", () => {
            uploadedFile.style.cssText = "display: none;";
            fileInput.value = '';
            uploadIcon.innerHTML = 'file_upload';
            dragDropText.innerHTML = 'Choisissez votre fichier ou faites-le glisser ici';
            uploadButton.innerHTML = `Decompile`;
        });
    }
}


function loading() {
    preload.style.display = "block";
    preload.style.opacity = "1";
}
function stopLoading() {
    preload.style.opacity = "0";
    setTimeout(() => {
        preload.style.display = "none";
    }, 120);
}

function notif(title, text) {
    const wrapper = document.querySelector("#toast-wrapper");

    const toast = document.createElement("div");
    toast.classList = "toast";
    toast.innerHTML = `<div class="toast-title">${title}</div>
    <div class="toast-content">${text}</div>
    <div class="toast-timeline"></div>`;
    wrapper.appendChild(toast);
    setTimeout(() => wrapper.removeChild(toast), 6000);
}
