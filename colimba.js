const fs = require('fs');
const path = require('path');

function importar(script) {
    try {
        // Resolviendo la ruta del script a importar
        const ruta = path.resolve(__dirname, script);
        // Importando el módulo
        const modulo = require(ruta);
        console.log(`Script "${script}" importado correctamente.`);
        return modulo;
    } catch (error) {
        console.error(`Error al importar el script "${script}":`, error);
        return null;
    }
}

function exportar(modulo, nombreExportado) {
    try {
        // Aquí podrías hacer algo con el módulo, como guardarlo en un archivo
        // En este ejemplo simplemente se imprime
        console.log(`Módulo "${nombreExportado}" exportado correctamente:`, modulo);
    } catch (error) {
        console.error(`Error al exportar el módulo "${nombreExportado}":`, error);
    }
}

// Función principal que manejará las entradas
function main() {
    const [,, script, nombreExportado] = process.argv;

    if (!script || !nombreExportado) {
        console.error('Se requieren dos argumentos: nombre del script a importar y nombre para exportar.');
        return;
    }

    const modulo = importar(script);
    if (modulo) {
        exportar(modulo, nombreExportado);
    }
}

// Ejecutando la función principal
main();
