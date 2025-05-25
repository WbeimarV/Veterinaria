
let dueños = [];
let mascotas = [];

const ESTADOS_VALIDOS = ["SANO", "ENFERMO", "EN TRATAMIENTO"];
const ESPECIES_VALIDAS = ["PERRO", "GATO", "AVE", "REPTIL", "OTRO"];

const validarTexto = (input) => input && input.trim().length > 0;
const validarNumero = (input) => !isNaN(input) && Number(input) > 0;

// 1. Registrar Dueño (callback + setTimeout)
const registrarDueño = (callback) => {
    setTimeout(() => {
        let nombre = prompt("Nombre del dueño: ").toUpperCase();
        let cc = prompt("Cédula: ");
        let tel = prompt("Teléfono: ");
        let correo = prompt("Correo: ");

        if (![nombre, cc, tel, correo].every(validarTexto)) {
            alert("Datos inválidos.");
            return callback();
        }

        let id = dueños.length;
        dueños.push({ id, nombre, cc, tel, correo });
        alert("Dueño registrado.");
        callback();
    }, 1500);
};

// 2. Registrar Mascota (callback + setTimeout)
const registrarMascota = (callback) => {
    setTimeout(() => {
        let nombreMascota = prompt("Nombre de la mascota: ").toUpperCase();
        let especie = prompt("Especie: ").toUpperCase();
        let edad = prompt("Edad (años): ");
        let peso = prompt("Peso (kg): ");
        let estado = prompt("Estado de salud (Sano, Enfermo, En tratamiento): ").toUpperCase();
        let cedulaDueño = prompt("Cédula del dueño:");

        if (![nombreMascota, especie, estado].every(validarTexto) ||
            !validarNumero(edad) || !validarNumero(peso) ||
            !ESPECIES_VALIDAS.includes(especie) || !ESTADOS_VALIDOS.includes(estado)) {
            alert("Datos inválidos.");
            return callback();
        }

        let dueño = dueños.find(d => d.cc === cedulaDueño);
        if (!dueño) {
            alert("Dueño no encontrado.");
            return callback();
        }

        let id = mascotas.length;
        mascotas.push({ id, nombre: nombreMascota, especie, edad: Number(edad), peso: Number(peso), estado, idDueño: dueño.id });
        alert("Mascota registrada.");
        callback();
    }, 2000);
};

// 3. Listar Mascotas (sincrónico)
const listarMascotas = () => {
    if (mascotas.length === 0) return alert("No hay mascotas registradas.");
    console.log("=== LISTA DE MASCOTAS ===");
    mascotas.forEach(m => {
        let dueño = dueños.find(d => d.id === m.idDueño);
        console.log(`${m.nombre} (${m.especie}) - Edad: ${m.edad}, Peso: ${m.peso}kg, Estado: ${m.estado}, Dueño: ${dueño?.nombre}`);
    });
};

// 4. Buscar Mascota por Nombre (Promise)
const buscarMascota = () => {
    let nombre = prompt("Nombre de la mascota a buscar: ").toUpperCase();

    new Promise((resolve, reject) => {
        setTimeout(() => {
            const resultado = mascotas.find(m => m.nombre === nombre);
            if (resultado) resolve(resultado);
            else reject("Mascota no encontrada.");
        }, 1500);
    }).then(m => {
        let dueño = dueños.find(d => d.id === m.idDueño);
        alert(`Mascota: ${m.nombre}, Dueño: ${dueño?.nombre}, Estado: ${m.estado}`);
    }).catch(alert);
};

// 5. Actualizar Estado de Salud (async/await)
const actualizarEstadoSalud = async () => {
    let nombre = prompt("Nombre de la mascota para actualizar: ").toUpperCase();
    let nuevaCondicion = prompt("Nuevo estado (Sano, Enfermo, En tratamiento): ").toUpperCase();

    if (!ESTADOS_VALIDOS.includes(nuevaCondicion)) {
        alert("Estado inválido.");
        return;
    }

    await new Promise(res => setTimeout(res, 1000));

    let mascota = mascotas.find(m => m.nombre === nombre);
    if (!mascota) {
        alert("Mascota no encontrada.");
        return;
    }

    mascota.estado = nuevaCondicion;
    alert("Estado de salud actualizado.");
};

// 6. Eliminar Mascota (Promise + confirmación)
const eliminarMascota = () => {
    let nombre = prompt("Nombre de la mascota a eliminar: ").toUpperCase();

    new Promise((resolve, reject) => {
        setTimeout(() => {
            let index = mascotas.findIndex(m => m.nombre === nombre);
            if (index >= 0) {
                mascotas.splice(index, 1);
                resolve();
            } else {
                reject("Mascota no encontrada.");
            }
        }, 2000);
    }).then(() => {
        alert("Mascota eliminada.");
    }).catch(alert);
};

// 7. Ver mascotas de un dueño (async/await + retraso)
const verMascotasDeDueño = async () => {
    let cc = prompt("Cédula del dueño:");
    await new Promise(res => setTimeout(res, 2000));

    let dueño = dueños.find(d => d.cc === cc);
    if (!dueño) {
        alert("Dueño no encontrado.");
        return;
    }

    let lista = mascotas.filter(m => m.idDueño === dueño.id);
    if (lista.length === 0) {
        alert("Este dueño no tiene mascotas registradas.");
    } else {
        console.log(`=== Mascotas de ${dueño.nombre} ===`);
        lista.forEach(m => {
            console.log(`${m.nombre} (${m.especie}) - Estado: ${m.estado}`);
        });
    }
};

// Menú principal
const mostrarMenu = () => {
    const opciones = `
1. Registrar Dueño
2. Registrar Mascota
3. Listar Mascotas
4. Buscar Mascota por Nombre
5. Actualizar Estado de Salud
6. Eliminar Mascota
7. Ver Mascotas por Cédula del Dueño
0. Salir
`;
    const elegirOpcion = () => {
        let opcion = prompt(opciones);
        switch (opcion) {
            case "1":
                registrarDueño(elegirOpcion);
                break;
            case "2":
                registrarMascota(elegirOpcion);
                break;
            case "3":
                listarMascotas();
                elegirOpcion();
                break;
            case "4":
                buscarMascota();
                setTimeout(elegirOpcion, 1600);
                break;
            case "5":
                actualizarEstadoSalud().then(elegirOpcion);
                break;
            case "6":
                eliminarMascota();
                setTimeout(elegirOpcion, 2200);
                break;
            case "7":
                verMascotasDeDueño().then(elegirOpcion);
                break;
            case "0":
                alert("Saliendo...");
                break;
            default:
                alert("Opción inválida.");
                elegirOpcion();
        }
    };
    elegirOpcion();
};

// Iniciar
mostrarMenu();