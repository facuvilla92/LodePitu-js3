const modoOscuro = document.querySelector("#modo-claro");
const main = document.querySelector("main");
const selecProvincia = document.querySelector("#selProv");
const selecMunicipio = document.querySelector("#selMuni");
const selecLocalidad = document.querySelector("#selLoc");
const apiprovincias = 'https://apis.datos.gob.ar/georef/api/provincias';
const apilocalidades = 'https://apis.datos.gob.ar/georef/api/localidades';


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

function fetchData(apiUrl) {
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud a la API ha fallado');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Se ha producido un error al obtener los datos:', error);
    });
}

function obtenerProvincias() {
  fetchData(apiprovincias)
    .then(data => {
      let $option = `<option value="elije una provincia">elije una provincia</option>`;

      data.provincias.forEach(element => $option += `<option value="${element.nombre}">${element.nombre}</option>`);

      selecProvincia.innerHTML = $option;

    });
}
obtenerProvincias();

function obtenerMunicipios(provincia) {
  const urlMunicipios = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}`;

  fetchData(urlMunicipios)
    .then(data => {
      let options = `<option value="elije un municipio">elije un municipio</option>`;

      if (data && data.municipios) {
        data.municipios.forEach(municipio => {
          options += `<option value="${municipio.id}">${municipio.nombre}</option>`;
        });
      }

      selecMunicipio.innerHTML = options;
    })
    .catch(error => {
      console.error('Error al obtener los municipios:', error);
    });
}

selecProvincia.addEventListener('change', function () {
  const provinciaSeleccionada = selecProvincia.value;

  obtenerMunicipios(provinciaSeleccionada);
});

function obtenerLocalidades(municipioId) {
  const urlLocalidades = `https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipioId}`;

  fetchData(urlLocalidades)
    .then(data => {
      let options = `<option value="elije una localidad">elije una localidad</option>`;
      if (data && data.localidades) {
        data.localidades.forEach(localidad => {
          options += `<option value="${localidad.id}">${localidad.nombre}</option>`;
        });
      }

      selecLocalidad.innerHTML = options;
    })
    .catch(error => {
      console.error('Error al obtener las localidades:', error);
    });
}

selecMunicipio.addEventListener('change', function () {
  const municipioSeleccionado = selecMunicipio.value;

  obtenerLocalidades(municipioSeleccionado);
});

obtenerProvincias();
obtenerMunicipios();
obtenerLocalidades();


