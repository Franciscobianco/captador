const readline = require('readline');  // Importa el módulo readline

// Inicializa la lista de objetos y el registro de acciones
let objetos = [];  // Array para almacenar los objetos
let registro = [];  // Array para almacenar el registro de acciones

console.log("Objetos lista oñembyaty:", objetos);
console.log("Ação registro oñembyaty:", registro);

// Crea la interfaz para leer entradas
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para agregar un objeto
function agregarObjeto(objeto) {
    objetos.push(objeto);  // Agrega el objeto al array
    registro.push("Oñembohory: " + objeto);  // Registra la acción en guaraní
    console.log("Oñembohory:", objeto);
}

// Función para quitar un objeto
function quitarObjeto() {
    if (objetos.length > 0) {  // Verifica si hay objetos para quitar
        let objeto = objetos.pop();  // Quita el último objeto del array
        registro.push("Ojeho: " + objeto);  // Registra la acción en guaraní
        console.log("Ojeho:", objeto);
    } else {
        console.log("Ikatúta, ndaha'éi objeto.");  // Mensaje si no hay objetos
    }
}

// Función para mostrar el registro
function mostrarRegistro() {
    console.log("Ação registro:");
    for (let accion of registro) {  // Itera sobre el registro
        console.log(accion);  // Muestra cada acción en el registro
    }
}

// Función para generar un párrafo con gramática y semántica adecuada
function generarParrafo(cantidad) {
    let parrafo = "Estos son algunos objetos: ";  // Inicio del párrafo
    let objetosElegidos = [];

    for (let i = 0; i < Math.min(cantidad, objetos.length); i++) {
        objetosElegidos.push(objetos[i]);  // Agrega el objeto elegido
    }

    parrafo += objetosElegidos.join(", ") + ".";  // Une los objetos con comas y agrega un punto

    // Asegura que el párrafo tenga un máximo de 255 palabras
    let palabras = parrafo.split(" ");
    if (palabras.length > 255) {
        parrafo = palabras.slice(0, 255).join(" ") + ".";  // Limita a 255 palabras
    }

    console.log("Párrafo generado:", parrafo);  // Muestra el párrafo generado
    return parrafo;  // Devuelve el párrafo final
}

// Función para solicitar un objeto al usuario
function solicitarObjeto(pregunta) {
    rl.question(pregunta, (nuevoObjeto) => {
        agregarObjeto(nuevoObjeto);  // Agrega el objeto ingresado
        if (objetos.length < 2) {
            solicitarObjeto("Eikuaáta ambue objeto añemohorýva: ");  // Solicita otro objeto
        } else {
            quitarObjeto();  // Quita el último objeto agregado
            mostrarRegistro();  // Muestra el registro de acciones
            
            // Mensajes de instrucciones
            console.log("\nInstrucciones:");
            console.log("4. Interacción con el Usuario:");
            console.log("   - Se te pedirá que ingreses cuántas palabras deseas en el párrafo generado (máximo 255).");
            console.log("   - El script generará un párrafo que incluirá los objetos ingresados y lo mostrará en la consola.\n");
            console.log("5. Reglas de Entrada:");
            console.log("   - Asegúrate de ingresar un número válido cuando se te solicite la cantidad de palabras para el párrafo.");
            console.log("   - Si ingresas un valor no válido, recibirás un mensaje de error y el script se cerrará.\n");
            
            rl.question("Eikuaáta mba'e kuatia oikotevẽva (max 255): ", (cantidadPalabras) => {
                const cantidad = parseInt(cantidadPalabras);  // Convierte la entrada a número
                if (!isNaN(cantidad) && cantidad > 0) {
                    generarParrafo(cantidad);  // Genera el párrafo con la cantidad especificada
                } else {
                    console.log("Por favor, ingresa un número válido.");
                }
                rl.close();  // Cierra la interfaz readline
            });
        }
    });
}

// Inicia el proceso solicitando el primer objeto
solicitarObjeto("Eikuaáta peteĩ objeto añemohorýva: ");
