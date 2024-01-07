"use:strict"

/* Sweet Alert - Libreria */

// Swal.fire({   //Sentencia para crear el alert
//     timer: 10000,        //Taimea el tiempo que aparece el alert en pantalla
//     timerProgressBar: true,      //Agrega una barra de carga en el alert de arriba
//     title: "Empezamos?",      //Agregamos un titulo grande
//     text: "Preparate...",      //Agregamos texto debajo del titulo
//     icon: "success"      //Agregamos un icono
// });

const inputUsuario = document.getElementById("usuario")
const inputContraseña = document.getElementById("contraseña")
const btnRegistrar = document.getElementById("registrar")

const inputNombre = document.getElementById("nombre")
const inputPuntaje = document.getElementById("puntaje")
const inputReseña = document.getElementById("reseña")
const btnPublicar = document.getElementById("publicar")
const btnLeer = document.getElementById("leer")

const inputReserva = document.getElementById("reserva")
const inputFecha = document.getElementById("fecha")
const inputPersonas = document.getElementById("personas")
const btnReservar = document.getElementById("reservar")
const btnReservados = document.getElementById("reservados")

let users = []
let reservas = []
let valoraciones = []

btnRegistrar.onclick = (e) => {
    e.preventDefault()
    let usuario = inputUsuario.value
    let contraseña = inputContraseña.value
    let existente = users.some(elemento => elemento.usuario.toUpperCase() == usuario.toUpperCase())
    if (nombre != "" && contraseña != "" && !existente) {
        let user = new Registros(usuario, contraseña)
        users.push(user)
        Swal.fire({
            title: "Registro exitoso!",
            text: "Continua investigando",
            icon: "success",
        })
    } else if (existente) {
        Swal.fire({
            title: "¡Algo salio mal!",
            text: "Vuelve a intentarlo",
            icon: "error",
        })
    } else {
        Swal.fire({
            title: "Error en el formulario",
            text: "Todos los campos son obligatorios",
            icon: "warning",
        })
    }
}

btnPublicar.onclick = (e) => {
    e.preventDefault()
    let nombre = inputNombre.value
    let puntaje = inputPuntaje.value
    let reseña = inputReseña.value
    let repetido = valoraciones.some(elemento => elemento.nombre == nombre && elemento.puntaje == puntaje && elemento.reseña == reseña)
    if (nombre != "" && puntaje > 0 && reseña != "" && !repetido) {
        let opinion = new Valoraciones(nombre, puntaje, reseña)
        valoraciones.push(opinion)
        Swal.fire({
            title: "¡Publicado!",
            icon: "success",
        })
    } else if (repetido) {
        Swal.fire({
            title: "¡Algo salio mal!",
            text: "Vuelve a intentarlo",
            icon: "error",
        })
    } else {
        Swal.fire({
            title: "Error en el formulario",
            text: "Todos los campos son obligatorios",
            icon: "warning",
        })
    }
}

function verValoracion() {
    let div = document.getElementById("div-valoraciones")
    for (const valoracion of valoraciones) {
        let contenedor = document.createElement("section")
        contenedor.innerText = `Nombre: ${valoracion.nombre} Puntaje: ${valoracion.puntaje} Reseña: ${valoracion.reseña}`
        div.appendChild(contenedor)
    }
}

btnLeer.onclick = (e) => {
    e.preventDefault()
    verValoracion()
}


btnReservar.onclick = (e) => {
    e.preventDefault()
    let nombre = inputReserva.value
    let fecha = inputFecha.value
    let personas = inputPersonas.value
    let ocupado = reservas.some(elemento => elemento.fecha == fecha)
    if (nombre != "" && fecha != "" && personas != "" && !ocupado) {
        let agendar = new Reservas(nombre, fecha, personas)
        reservas.push(agendar)
        console.log(reservas)
        Swal.fire({
            title: "Reserva Realizada",
            icon: "success",
        })
    } else if (ocupado) {
        Swal.fire({
            title: "¡Fecha ya Reservada!",
            text: "Vuelve a intentarlo",
            icon: "error",
        })
    } else {
        Swal.fire({
            title: "Error en el formulario",
            text: "Todos los campos son obligatorios",
            icon: "warning",
        })
    }
}

function verReservas() {
    let div = document.getElementById("div-reservas")
    for (const reserva of reservas) {
        let contenedor = document.createElement("section")
        contenedor.innerText = `Nombre: ${reserva.nombre} Puntaje: ${reserva.fecha} Reseña: ${reserva.personas}`
        div.appendChild(contenedor)
    }
}

btnReservados.onclick = (e) => {
    e.preventDefault()
    verReservas()
}