let productos = [];
fetch("./cortes.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarCortes(productos);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });

const ContenedorCortes = document.querySelector("#contenedorCortes");
let botonesAgregar = [];
let productosDelCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
const numerito = document.querySelector("#numerito");

function cargarCortes(productos) {
    productos.forEach(producto => { 
        const div = document.createElement("div");
        div.classList.add("Corte");
        div.innerHTML = `
            <img class="fotos" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="detalles">
                <h3 class="productos-cortes">${producto.titulo}</h3>
                <h4 class="cortes-precios">${producto.precio}</h4>
                <button class="agregar-corte" id="${producto.id}">agregar</button>
            </div>
        `;
        ContenedorCortes.appendChild(div);
    });
    actualizarBotones();
}

function actualizarBotones() {
    botonesAgregar = document.querySelectorAll(".agregar-corte");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    Toastify({
        text: "se agrego al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          borderRadius: "2rem"
        },
        onClick: function(){}
      }).showToast();

    const id = e.currentTarget.id;

    const producto = productos.find(item => item.id === id);

    const productoExistente = productosDelCarrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        productosDelCarrito.push({
            id: producto.id,
            titulo: producto.titulo,
            imagen: producto.imagen,
            precio: producto.precio,
            cantidad: 1
        });
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosDelCarrito))
}

function actualizarNumerito() {
    let totalCantidad = 0;
    if (productosDelCarrito) {
        totalCantidad = productosDelCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    }
    numerito.textContent = totalCantidad.toString();
}

cargarCortes(productos);




