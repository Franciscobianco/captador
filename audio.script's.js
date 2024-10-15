function generarParrafo() {
    // Lógica para generar un párrafo
    return "Este es un párrafo generado.";
}

// Función principal
(async () => {
    const mic = new Microfono();

    const grabarAntes = confirm("¿Deseas grabar un audio antes de generar el párrafo?");
    if (grabarAntes) {
        await mic.abrirMic();
        const audioUrl = await mic.grabar(5); // Graba por 5 segundos
        console.log("Grabación antes de generar el párrafo. URL de audio:", audioUrl);
    }

    const parrafo = generarParrafo();
    console.log(parrafo);

    const grabarDespues = confirm("¿Deseas grabar un audio después de generar el párrafo?");
    if (grabarDespues) {
        await mic.abrirMic();
        const audioUrl = await mic.grabar(5); // Graba por 5 segundos
        console.log("Grabación después de generar el párrafo. URL de audio:", audioUrl);
    }
})();
