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
            title: "¡Usuario existente!",
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
            title: "¡Ya subiste esta publicacion!",
            text: "Vuelve a intentarlo con algo diferente.",
            icon: "error",
        })
    } else {
        Swal.fire({
            title: "Error en el formulario",
            text: "Todos los campos son obligatorios",
            icon: "warning",
        })
    }
    // verValoracion()
}

let valo = JSON.parse(localStorage.getItem("valo"));
if (valo == null) {
    valo = []
}

function verValoracion() {
    localStorage.setItem("valo", JSON.stringify(valo));
    let div = document.getElementById("div-valoraciones")
    for (const valoracion of valoraciones) {
        let contenedor = document.createElement("section")
        contenedor.innerText = `Nombre: ${valoracion.nombre} \n Puntaje: ${valoracion.puntaje} \nReseña: ${valoracion.reseña}`
        div.appendChild(contenedor)
    }
}

btnLeer.onclick = (e) => {
    e.preventDefault()
    localStorage.setItem("valo", JSON.stringify(valo));
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
};

function verReservas() {
    let div = document.getElementById("div-reservas")
    for (const reserva of reservas) {
        let contenedor = document.createElement("section")
        contenedor.innerText = `Nombre: ${reserva.nombre} Fecha: ${reserva.fecha} Mesas Ocupadas: ${reserva.personas}`
        div.appendChild(contenedor)
    }
}

btnReservados.onclick = (e) => {
    e.preventDefault()
    verReservas()
}


let stock = [];
let carrito = [];

stock.push(new Producto("Papa", 1000));
stock.push(new Producto("Batata", 2000));
stock.push(new Producto("Calabaza", 3000));

const inventario = document.getElementById("inventario")
const agregarProducto = document.getElementById("agregar")
const items = document.getElementById("items")
const vaciar = document.getElementById("vaciar")
const pagar = document.getElementById("pagar")


function mostrarInventario() {
    inventario.innerHTML = ""
    stock.forEach((producto, indice) => {
        let option = document.createElement("option");
        option.innerText = `${producto.nombre} - $${producto.precio}`
        option.value = indice
        inventario.appendChild(option)
    })
}

function carroInventario(item) {
    items.innerHTML = ""
    carrito.forEach((elemento) => {
        let tr = document.createElement("tr")
        let th = document.createElement("th")
        th.innerText = elemento.producto.nombre
        tr.appendChild(th)

        th = document.createElement("th")
        th.innerText = elemento.cantidad
        tr.appendChild(th)

        th = document.createElement("th")
        th.innerText = elemento.producto.precio
        tr.appendChild(th)

        let pos = carrito.indexOf(item);
        let btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-danger";
        btnEliminar.innerText = "Eliminar";
        btnEliminar.onclick = () => {
            carrito.splice(pos, 1);
            listadoUpdate();
        };

        th = document.createElement("th");
        th.append(btnEliminar);
        tr.appendChild(th)

        items.appendChild(tr)
    });

    total.innerText = carrito.reduce((acumulador, elemento) => acumulador + elemento.precioTotal(), 0)
}

function listadoUpdate() {
    items.innerHTML = "";
    carrito.forEach((item) => {
        carroInventario(item);
    });
    total.innerText = carrito.reduce(
        (total, item) => total + item.producto.precio * item.cantidad,
        0
    );
}

agregarProducto.onclick = () => {
    let aggProd = stock[inventario.value]
    let posicion = carrito.findIndex(
        (elemento) => elemento.producto.nombre == aggProd.nombre)

    if (posicion == -1) {
        let item = new Item(aggProd, 1)
        carrito.push(item)
    } else {
        carrito[posicion].cantidad++
    }

    carroInventario()
}

vaciar.onclick = () => {
    carrito = [];
    carroInventario();
    total.innerText = 0
}


mostrarInventario()
