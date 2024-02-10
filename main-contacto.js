const modoOscuro = document.querySelector("#modo-claro");
const main = document.querySelector("main");

modoOscuro.addEventListener("click", cambiarColor);

function cambiarColor() {
    main.classList.toggle("boton-claro");

    if (main.classList.contains("boton-claro")) {
        modoOscuro.innerText = "modo oscuro"
    } else {
        modoOscuro.innerText = "modo claro"
    }

}
const formulario = document.querySelector("#alerta-form");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.querySelector("#input1").value;
    const apellido = document.querySelector("#input2").value;
    const direccion = document.querySelector("#input3").value;
    const telefono = document.querySelector("#input4").value;
    const email = document.querySelector("#input5").value;
    const mensaje = document.querySelector("#input6").value;

    let mensajeAlerta = `Información del formulario:
    Nombre: ${nombre}
    Apellido: ${apellido}
    Dirección: ${direccion}
    Teléfono: ${telefono}
    Email: ${email}
    Mensaje: ${mensaje}`;

    alert(mensajeAlerta);

    guardarDatosEnLocalStorage(nombre, apellido, direccion, telefono, email, mensaje);
});

function guardarDatosEnLocalStorage(nombre, apellido, direccion, telefono, email, mensaje) {
    const datosFormulario = {
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        telefono: telefono,
        email: email,
        mensaje: mensaje
    };

    localStorage.setItem("datosFormulario", JSON.stringify(datosFormulario));
    }

    const datosJSON = localStorage.getItem("datosFormulario");

        const datosFormulario = JSON.parse(datosJSON);
        document.querySelector("#input1").value = datosFormulario.nombre;
        document.querySelector("#input2").value = datosFormulario.apellido;
        document.querySelector("#input3").value = datosFormulario.direccion;
        document.querySelector("#input4").value = datosFormulario.telefono;
        document.querySelector("#input5").value = datosFormulario.email;
        document.querySelector("#input6").value = datosFormulario.mensaje;
        console.log(datosJSON)