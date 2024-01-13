"use:strict"

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
