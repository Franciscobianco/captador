class Microfono {
    constructor() {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.stream = null;
    }

    async abrirMic() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(this.stream);
            this.mediaRecorder.ondataavailable = event => {
                this.audioChunks.push(event.data);
            };
            console.log("Micrófono abierto.");
        } catch (error) {
            console.error("Error al acceder al micrófono:", error);
        }
    }

    apagarMic() {
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
            this.stream.getTracks().forEach(track => track.stop());
            this.mediaRecorder = null;
            console.log("Micrófono apagado.");
        }
    }

    grabar(duracion) {
        return new Promise((resolve) => {
            this.audioChunks = [];
            this.mediaRecorder.start();
            console.log("Grabando...");

            setTimeout(() => {
                this.apagarMic();
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                resolve(audioUrl);
            }, duracion * 1000);
        });
    }
}

// Uso del micrófono
(async () => {
    const mic = new Microfono();
    
    await mic.abrirMic();
    const audioUrl = await mic.grabar(5); // Graba por 5 segundos
    console.log("Grabación finalizada. URL de audio:", audioUrl);
})();
