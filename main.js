const cortesArray = [
    {
        id: "asad-o",
        titulo: "asado",
        imagen: "./imagenes/asado.jpg",
        precio: 6000
    },
    {
        id: "vaci-0",
        titulo: "vacio",
        imagen: "./imagenes/vacio.jpg",
        precio: 6800
    },
    {
        id: "entran-a",
        titulo: "entrana",
        imagen: "./imagenes/entraña.jpg",
        precio: 7000
    },
    {
        id: "tapa-de-asad-o",
        titulo: "tapa de Asado",
        imagen: "./imagenes/tapa de asado.jpg",
        precio: 6000
    },
    {
        id: "matambr-e",
        titulo: "matambre",
        imagen: "./imagenes/matambre.jpg",
        precio: 5800
    },
    {
        id: "nalg-a",
        titulo: "nalga",
        imagen: "./imagenes/nalga.jpg",
        precio: 7000
    },
    {
        id: "cuadrad-a",
        titulo: "cuadrada",
        imagen: "./imagenes/cuadrada.jpg",
        precio: 7000
    },

];

const listaCortes = document.querySelector("#contenedorCortes");
const listaMenu = document.querySelectorAll(".lista-menu");
let botonesAgregar = document.querySelectorAll(".agregar-corte");

function cargarCortes() {
    cortesArray.forEach(corte => {
        const div = document.createElement("div");
        div.classList.add("Corte");
        div.innerHTML = `
            <img class="fotos" src="${corte.imagen}" alt="${corte.titulo}">
            <div class="detalles">
                <h3 class="productos-cortes">${corte.titulo}</h3>
                <h4 class="cortes-precios">${corte.precio}</h4>
                <button class="agregar-corte" ${corte.id}">agregar</button>
            </div>
        `;
        listaCortes.appendChild(div);
    });
    actualizarBotones();
}
cargarCortes();

function actualizarBotones() {
    botonesAgregar = document.querySelectorAll(".agregar-corte");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
        const id = boton.getAttribute("data-id");

        console.log(id);
    });
}

listaMenu.forEach(boton => {
    boton.addEventListener("click", (e) => {
        listaMenu.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
    })
});

const productosDelCarrito = [];

function agregarAlCarrito(e) {
    const id = e.currentTarget.getAttribute("data-id");
    console.log(id)
}
