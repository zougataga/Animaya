const
    startEl = document.querySelector(".start"),
    submit = startEl.querySelector("button[type='submit']");

startEl.style.display = "flex";

let chunks = [];

submit.addEventListener("click", async () => {
    try {

        const
            streamEl = document.querySelector(".stream"),
            stop = streamEl.querySelector("#stop"),
            video = streamEl.querySelector('video');
        startEl.style.display = "none";
        streamEl.style.display = "flex";

        let mediaRecorder, chunks = [];

        navigator.mediaDevices.getDisplayMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = e => {
                    chunks.push(e.data);
                };
                mediaRecorder.onstop = e => {
                    const blob = new Blob(chunks, { type: 'video/mp4' });
                    chunks = [];
                    const
                        url = URL.createObjectURL(blob),
                        a = document.createElement('a');
                    a.href = url;
                    a.download = 'ma-video.mp4';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                };
                mediaRecorder.start();
            })
            .catch(err => console.error('Erreur de capture d\'écran : ', err));

        stop.addEventListener("click", () => {
            mediaRecorder.stop();
            streamEl.style.display = "none";
            startEl.style.display = "flex";
        });

    } catch (err) {
        console.error('Erreur:', err);
    }
})
