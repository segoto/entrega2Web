let colores = [
    "rgb(188, 99, 85)",
    "rgb(255, 0, 0)",
    "rgb(255, 255, 0)",
    "rgb(249, 107, 227)",
    "rgb(255, 165, 0)",
    "rgb(173, 255, 47)",
    "rgb(0, 0, 255)",
    "rgb(255, 255, 255)",
];
let ids = ["yo", "j1", "j2", "j3", "j4", "j5", "j6", "j7"];

let seleccion = null;
let mostrar = () => {
    let div = document.getElementById("jugadores");
    div.classList.remove("ocultarcircl");
};

let colorRandom = () => {
    aleatorio = Math.floor(Math.random() * colores.length);

    seleccion = colores[aleatorio];
    let a = document.getElementsByClassName("forma");
    a[0].style.backgroundColor = seleccion;

    ids.forEach((element) => {
        let elemento = document.getElementById(element);
        let elementStyle = window.getComputedStyle(elemento);
        let elementColor = elementStyle.getPropertyValue("background-color");
        if (elementColor == seleccion) {
            elemento.disabled = true;
        }
    });
};
let turno = (color, id) => {
    let div = document.getElementById("log");
    div.classList.remove("ocultarLog");

    let b = document.getElementsByClassName("forma1");
    b[0].style.backgroundColor = seleccion;

    let a = document.getElementsByClassName("forma2");
    a[0].style.backgroundColor = color;

    seleccion = color;

    ids.forEach((element) => {
        let elemento = document.getElementById(element);
        let elementStyle = window.getComputedStyle(elemento);
        let elementColor = elementStyle.getPropertyValue("background-color");
        if (elementColor == seleccion) {
            elemento.disabled = true;
        } else {
            elemento.disabled = false;
        }
    });
    setTimeout(remar(seleccion, id), 5000);
};

let remar = (colorDeRemador, id) => {
    let botonDerecha = document.getElementById(id + 1);
    let botonIzquierda = document.getElementById(id + 2);
    let elemento = document.getElementById(id);
    let jugadorDerecha;
    let jugadorIzquierda;
    for (let i = 0; i < ids.length; i++) {
        const element = ids[i];
        if (element == id && i != 0 && i != 7) {
            jugadorIzquierda = ids[i + 1];
            jugadorDerecha = ids[i - 1];
        } else if (element == id && i == 0) {
            jugadorIzquierda = ids[i + 1];
            jugadorDerecha = ids[ids.length - 1];
        } else if (element == id && i == 7) {
            jugadorDerecha = ids[ids.length - 2];
            jugadorIzquierda = ids[0];
        }
    }

    let informacionJuego = document.getElementById("ponerInfoJuego");

    let botonDerechaJugadorDerecha = document.getElementById(jugadorDerecha + 1);
    let botonIzquierdaJugadorDerecha = document.getElementById(jugadorDerecha + 2);
    let jDerecha = document.getElementById(jugadorDerecha);
    let jDerechaColor = window.getComputedStyle(jDerecha);
    let elementDColor = jDerechaColor.getPropertyValue("background-color");

    let botonDerechaJugadorIzquierda = document.getElementById(jugadorIzquierda + 1);
    let botonIzquierdaJugadorIzquierda = document.getElementById(jugadorIzquierda + 2);
    let jIzquierda = document.getElementById(jugadorIzquierda);
    let jIzquierdaColor = window.getComputedStyle(jIzquierda);
    let elementIColor = jIzquierdaColor.getPropertyValue("background-color");

    var result_name_jD;
    var result_name_jI;

    if (elementIColor == "rgb(188, 99, 85)") {
        result_name_jI = "Rosado Oscuro";
    } else if (elementIColor == "rgb(255, 0, 0)") {
        result_name_jI = "Rojo";
    } else if (elementIColor == "rgb(255, 255, 0)") {
        result_name_jI = "Amarillo";
    } else if (elementIColor == "rgb(255, 255, 255)") {
        result_name_jI = "Blanco";
    } else if (elementIColor == "rgb(249, 107, 227)") {
        result_name_jI = "Rosado Claro";
    } else if (elementIColor == "rgb(255, 165, 0)") {
        result_name_jI = "Naranja";
    } else if (elementIColor == "rgb(173, 255, 47)") {
        result_name_jI = "Verde Lima";
    } else if (elementIColor == "rgb(0, 0, 255)") {
        result_name_jI = "Azul";
    }

    if (elementDColor == "rgb(188, 99, 85)") {
        result_name_jD = "Rosado Oscuro";
    } else if (elementDColor == "rgb(255, 0, 0)") {
        result_name_jD = "Rojo";
    } else if (elementDColor == "rgb(255, 255, 0)") {
        result_name_jD = "Amarillo";
    } else if (elementDColor == "rgb(255, 255, 255)") {
        result_name_jD = "Blanco";
    } else if (elementDColor == "rgb(249, 107, 227)") {
        result_name_jD = "Rosado Claro";
    } else if (elementDColor == "rgb(255, 165, 0)") {
        result_name_jD = "Naranja";
    } else if (elementDColor == "rgb(173, 255, 47)") {
        result_name_jD = "Verde Lima";
    } else if (elementDColor == "rgb(0, 0, 255)") {
        result_name_jD = "Azul";
    }

    //Revisar esta parte porque siempre da falso
    var isCheckedJugadorDerechaBien = botonIzquierdaJugadorDerecha.checked;
    var isCheckedJugadorDerechaMal = botonDerechaJugadorDerecha.checked;
    var isCheckedJugadorIzquierdaBien = botonDerechaJugadorIzquierda.checked;
    var isCheckedJugadorIzquierdaMal = botonIzquierdaJugadorIzquierda.checked;

    if (isCheckedJugadorDerechaBien && isCheckedJugadorDerechaMal == false && isCheckedJugadorIzquierdaBien && isCheckedJugadorIzquierdaMal == false) {
        informacionJuego.innerHTML = "Muy Bien";
    } else {
        if (
            isCheckedJugadorDerechaBien == true &&
            isCheckedJugadorDerechaMal == false &&
            isCheckedJugadorIzquierdaBien == false &&
            isCheckedJugadorIzquierdaMal == true
        ) {
            informacionJuego.innerHTML = "Jugador " + result_name_jI + " perdiste, a tomar !";
        } else if (
            isCheckedJugadorDerechaBien == false &&
            isCheckedJugadorDerechaMal == true &&
            isCheckedJugadorIzquierdaBien == true &&
            isCheckedJugadorIzquierdaMal == false
        ) {
            informacionJuego.innerHTML = "Jugador " + result_name_jD + " perdiste, a tomar !";
        } else if (
            ((isCheckedJugadorDerechaBien == true && isCheckedJugadorDerechaMal == true) ||
                (isCheckedJugadorDerechaBien == false && isCheckedJugadorDerechaMal == false)) &&
            isCheckedJugadorIzquierdaBien == true
        ) {
            informacionJuego.innerHTML = "Jugador " + result_name_jD + " perdiste por no decirte, a tomar !";
        } else if (
            ((isCheckedJugadorIzquierdaBien == true && isCheckedJugadorIzquierdaBien == true) ||
                (isCheckedJugadorIzquierdaBien == false && isCheckedJugadorIzquierdaMal == false)) &&
            isCheckedJugadorDerechaBien == true
        ) {
            informacionJuego.innerHTML = "Jugador " + result_name_jI + " perdiste por no decirte, a tomar !";
        } else {
            informacionJuego.innerHTML = "Ambos " + result_name_jI + " y " + result_name_jD + "  toman!";
        }
    }

    ids.forEach((elemento) => {
        let idCheckD = elemento + 1;
        let idCheckI = elemento + 2;

        document.getElementById(idCheckD).checked = 0;
        document.getElementById(idCheckI).checked = 0;
    });
};
