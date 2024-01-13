"use:strict"
 
let stock = [];
let stock2 = [];
let carrito = [];

stock.push(new Producto("Papa", 1000));
stock.push(new Producto("Batata", 2000));
stock.push(new Producto("Calabaza", 3000));

stock2.push(new Producto("Naranja", 1000));
stock2.push(new Producto("Banana", 2000));
stock2.push(new Producto("Tomate", 3000));

const productos = document.getElementById("productos")
const productos2 = document.getElementById("productos2")
const aggProductos = document.getElementById("agregar")
const aggProductos2 = document.getElementById("agregar2")
const items = document.getElementById("items")
const total = document.getElementById("total")
const vaciar = document.getElementById("vaciar")

const descuento = document.getElementById("descuento")
const aplicar = document.getElementById("aplicar")


function dibujaCarrito() {
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

        items.appendChild(tr)
    })
    total.innerText = carrito.reduce((acumulador, elemento) => acumulador + elemento.precioTotal(), 0)
}

aplicar.onclick = () => {
    let cantidad = Number(descuento.value)
    let indice = productos.value
    let indice2 = productos2.value

    stock[indice].precio -= cantidad
    stock2[indice2].precio -= cantidad

    // carrito.forEach((item) => {
    //     item.producto.precio -= cantidad
    // })

    dibujaCarrito()
    mostrarStock()
}

vaciar.onclick = () => {
    carrito = [];
    dibujaCarrito();
    total.innerText = 0
}


aggProductos.onclick = () => {
    let aggProd = stock[productos.value]
    let posicion = carrito.findIndex(
        (elemento) => elemento.producto.nombre == aggProd.nombre)

    if (posicion == -1) {
        let item = new Item(aggProd, 1)
        carrito.push(item)
    } else {
        carrito[posicion].cantidad++
    }

    dibujaCarrito()
}

aggProductos2.onclick = () => {
    let aggProd2 = stock2[productos2.value]
    let posicion2 = carrito.findIndex(
        (elemento) => elemento.producto.nombre == aggProd2.nombre)

    if (posicion2 == -1) {
        let item = new Item(aggProd2, 1)
        carrito.push(item)
    } else {
        carrito[posicion2].cantidad++
    }

    dibujaCarrito()

    total.innerText = carrito.reduce((acumulador, elemento) => acumulador + elemento.precioTotal(), 0)
}

function mostrarStock() {
    productos.innerHTML = ""
    stock.forEach((producto, indice) => {
        let option = document.createElement("option");
        option.innerText = `${producto.nombre} - $${producto.precio}`
        option.value = indice
        productos.appendChild(option)
    })
    productos2.innerHTML = ""
    stock2.forEach((producto, indice) => {
        let option = document.createElement("option");
        option.innerText = `${producto.nombre} - $${producto.precio}`
        option.value = indice
        productos2.appendChild(option)
    })
}


mostrarStock()

