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

const inventario = document.getElementById("inventario")
const agregarProducto = document.getElementById("agregar")
const items = document.getElementById("items")
const vaciar = document.getElementById("vaciar")
const pagar = document.getElementById("pagar")


let users = JSON.parse(localStorage.getItem('users'));
if (users === undefined) {
    users = [];
}

let reservas = JSON.parse(localStorage.getItem('reservas'));
if (reservas == undefined) {
    reservas = [];
}

let valoraciones = JSON.parse(localStorage.getItem('valoraciones'));
if (valoraciones == undefined) {
    valoraciones = [];
}

let stock = [];

let carrito = JSON.parse(localStorage.getItem('carrito'));
if (carrito == undefined) {
    carrito = [];
}

btnRegistrar.onclick = (e) => {
    e.preventDefault()
    localStorage.setItem("users", JSON.stringify(users));
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
}

function verValoracion() {
    localStorage.setItem("valoraciones", JSON.stringify(valoraciones));
    let div = document.getElementById("div-valoraciones")
    div.innerHTML = ""
    valoraciones.forEach((elemento) => {
        let i = document.createElement("p");
        i.innerText = `De: ${elemento.nombre} - Puntaje: ${elemento.puntaje} \nReseña: ${elemento.reseña}`
        div.appendChild(i);
    });
};

btnLeer.onclick = (e) => {
    e.preventDefault()
    localStorage.setItem("valoraciones", JSON.stringify(valoraciones));
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
    localStorage.setItem("reservas", JSON.stringify(reservas));
    let div = document.getElementById("div-reservas")
    div.innerHTML = ""
    reservas.forEach((elemento) => {
        let i = document.createElement("p");
        i.innerText = `De: ${elemento.nombre} - Fecha: ${elemento.fecha} \nPara: ${elemento.personas} personas`
        div.appendChild(i);
    });
}

btnReservados.onclick = (e) => {
    e.preventDefault()
    verReservas()
}

stock.push(new Producto("Menu 1", 1500));
stock.push(new Producto("Menu 2", 2500));
stock.push(new Producto("Menu 3", 3500));
stock.push(new Producto("Menu 4", 4500));
stock.push(new Producto("Menu 5", 5500));

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
    localStorage.setItem("carrito", JSON.stringify(carrito));
    items.innerHTML = ""
    carrito.forEach((elemento) => {
        let tr = document.createElement("tr")
        let th = document.createElement("th")
        let pos = carrito.indexOf(item);
        let eliminar = document.createElement("button");

        th = document.createElement("th")
        th.innerText = `"${elemento.producto.nombre}"`
        tr.appendChild(th)

        th = document.createElement("th")
        th.innerText = `°${elemento.cantidad}`
        tr.appendChild(th)

        th = document.createElement("th")
        th.innerText = `$${elemento.producto.precio}`
        tr.appendChild(th)

        eliminar.className = "btn btn-danger";
        eliminar.innerText = "X";
        eliminar.onclick = () => {
            carrito.splice(pos, 1);
            carroInventario();
        };

        th = document.createElement("th");
        th.appendChild(eliminar);
        tr.appendChild(th)

        items.appendChild(tr)

    });
    total.innerText = carrito.reduce((acum, elemento) => acum + elemento.cantidad * elemento.producto.precio,0);
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

pagar.onclick = () => {
    total.innerText = carrito.reduce((acum, elemento) => acum + elemento.cantidad * elemento.producto.precio,0);
    if (total.innerText == 0) {
        Swal.fire({
            title: "Error en el formulario",
            text: "No ingresaste productos",
            icon: "warning",
        })
    } else {
        Swal.fire({
            title: "Ya casi es tuyo!",
            text: `Solo te queda pagar: $${total.innerText} y te enviaremos tu pedido!`,
            icon: "success"
        });
    }
}


/* Esto no pude hacerlo funcionar en local, pero en palabras del profe dijo que esta parte podiamos correrla por live server */
// function menu() {
//     const lista = document.getElementById('listado')
//     fetch('/data.json')
//         .then((res) => res.json())
//         .then((data) => {
//             data.forEach((producto) => {
//                 const li = document.createElement('li')
//                 li.innerHTML = `
//                 <h3>${producto.nombre}</h3>
//                 <p>${producto.descrip}</p>
//                 <p>Precio: ${producto.precio}</p>
//                 <hr/>
//             `
//                 lista.appendChild(li)
//             })
//         })
// }


mostrarInventario()
carroInventario()
// menu()
