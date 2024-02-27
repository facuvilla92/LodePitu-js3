let productosenCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoCortes = document.querySelector("#carrito-cortes");
const botonesAbajo = document.querySelector("#botones-abajo");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-eliminar");
const carritoVaciar = document.querySelector("#carrito-vaciar");
const carritoComprar = document.querySelector("#carrito-comprar")
const contenedorTotal = document.querySelector("#total");

function cargarProductosCarritos() {
    if (productosenCarrito && productosenCarrito.length > 0) {
        carritoVacio.classList.add("disabled");
        carritoCortes.classList.remove("disabled");
        botonesAbajo.classList.remove("disabled");
        carritoComprado.classList.add("disabled");

        carritoCortes.innerHTML = "";

        productosenCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-corte");
            div.innerHTML = `
            <img class="carrito-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto">
                <small>corte</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="cantidad-corte">
                <small>cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="precio-corte">
                <small>precio</small>
                <p>${producto.precio}</p>
            </div>
            <div class="subtotal-precio">
                <small>subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button><i class="bi bi-trash3-fill carrito-eliminar" id="${producto.id}"></i></button>
        `;
            carritoCortes.appendChild(div);
        });
    } else {
        carritoVacio.classList.remove("disabled");
        carritoCortes.classList.add("disabled");
        botonesAbajo.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal()
}

cargarProductosCarritos();


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function (e) {
            eliminarDelCarrito(e);
        });
    });
}


function eliminarDelCarrito(e) {
    Toastify({
        text: "producto eliminado del carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            borderRadius: "2rem"
        },
        onClick: function () { }
    }).showToast();

    let id = e.currentTarget.id;
    const productoIndex = productosenCarrito.findIndex(producto => producto.id === id);
    if (productoIndex !== -1) {
        productosenCarrito[productoIndex].cantidad--;
        if (productosenCarrito[productoIndex].cantidad <= 0) {
            productosenCarrito.splice(productoIndex, 1);
        }
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosenCarrito));

        cargarProductosCarritos();
    }
}
carritoVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    Swal.fire({
        title: "¿estas seguro de eliminar todos los productos?",
        icon: "question",
        html: `el carrito quedara vacio`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `si`,
        cancelButtonText: `no`,
    }).then((result) => {
        
        if (result.isConfirmed) {
            productosenCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosenCarrito));
            cargarProductosCarritos();
        } 
    });
}
   
    function actualizarTotal() {
        const totalCalculado = productosenCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        total.innerText = `$${totalCalculado}`;
    }

    carritoComprar.addEventListener("click", comprarCarrito);
    function comprarCarrito() {
        productosenCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosenCarrito));

        carritoVacio.classList.add("disabled");
        carritoCortes.classList.add("disabled");
        botonesAbajo.classList.add("disabled");
        carritoComprado.classList.remove("disabled");

    }




