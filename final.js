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

const inputReserva = document.getElementById("reserva")
const inputFecha = document.getElementById("fecha")
const inputPersonas = document.getElementById("personas")
const btnReservar = document.getElementById("reservar")


let users = [
    new Registros("User1", "admin1"),
    new Registros("User2", "admin2"),
    new Registros("User3", "admin3"),
]

let reservas = [
    new Reservas("Agustin", "2023-01-14", 50),
    new Reservas("Camila", "2023-01-14", 50),
    new Reservas("Santiago", "2023-01-14", 50),
]

let valoraciones = [
    new Valoraciones("Agustin", 10, "Muy buena comida"),
    new Valoraciones("Camila", 5, "Llego la comida fria"),
    new Valoraciones("Santiago", 3, "Platos sucios"),
]

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
    } else {
        Swal.fire({
            title: "Usuario existente!",
            text: "Vuelvelo a intentar",
            icon: "error",
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
    } else {
        Swal.fire({
            title: "¡Algo salio mal!",
            text: "Vuelvelo a intentar mas tarde",
            icon: "error",
        })
    }
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
    } else {
        Swal.fire({
            title: "¡Fecha ya Reservada!",
            text: "Vuelvelo a intentar",
            icon: "error",
        })
    }
}