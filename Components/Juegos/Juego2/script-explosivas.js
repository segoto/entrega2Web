/*-------------------------CONSTANTES-------------------------*/

const PALABRA_YO = "PALABRA_YO";
const TURNO_YO = "TURNO_YO";

const PALABRA_REPETIDA = "PALABRA_REPETIDA";
const RESULTADOS_VOTO = "RESULTADOS_VOTO";
const SIGUIENTE_TURNO = "SIGUIENTE_TURNO";

const FIN_TURNO = "FIN_TURNO";
const TURNO_OTROS = "TURNO_OTROS";
const VOTACION_OTROS = "VOTACION_OTROS";
const VOTO_YO = "VOTO_YO";
const PERDER = "PERDER";

const SI = "SI";
const NO = "NO";

const CATEGORIAS = {
    Animales: ["Jirafa", "Cerdo", "Perro", "Gato", "Mi ex", "Serpiente", "Lémur", "Cerdo"],
    Paises: ["Colombia", "Perú", "Rusia", "Estados Unidos", "Panamá", "España", "Francia", "Suiza"],
    Cantantes: ["Joe Arroyo", "Katy Perry", "Paul McCartney", "J Balvin", "Ozuna", "Reik", "Diomedes ", "Suiza"],
    "Cosas rojas": ["Sangre", "Rosas", "Comunismo", "Labios", "Tomate", "Fresa", "Coca-cola", "Elmo", "Fuego"],
    "Que empiece por N": ["Noviembre", "Norberto", "Nolan", "Nintendo", "Niño", "Nigeria", "Nissan", "No", "Natilla", "Nospirin", "Nestor", "Negro", "Nalga"],
    "Que empiece por S": ["Sombrío", "Sonreír", "Siempre", "Solamente", "Soledad"],
};

const coloresPalabras = ["#e254ff", "#04fd9e", "#fd6604", "#0099ff", "#ffcd00", "#ff7597"];

const fragmentoJugadores = `
<div id="placeholder" class="placeholder-jugador">    
<p id="timer_@i"class="timer-otros"></p>
<div id="tool_tip_@i"class="tool-tip"></div>

<div class="icono-jugador">
    <!--Toca usar inline por ser un html agregado dinámicamente donde el color-->
    <svg style width="80%" height="80%" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>
</div>
<h2 class="text-center mx-auto nombre-jugador" style="color:@color">@nombre</h2> 
</div>`;

//Guarda variables que son trasnversales a distitntos turnos
var ctx;

/*----------Funciones auxiliares----------*/

function desActivarBtnsVoto(desActivar) {
    $("#btn_si").disabled = desActivar;
    $("#btn_no").disabled = desActivar;
}

function desActivarEnviar(desActivar) {
    $("#input_palabra").disabled = desActivar;
    $("#btn_enviar_palabra").disabled = desActivar;
}

function getCategoriaRand() {
    properties = [];
    for (p in CATEGORIAS) {
        properties.push(p);
    }
    return properties[getRandomInt(0, properties.length)];
}

function quitarPalabrAI(palabra) {
    let indexPalabra = -1;

    //Quitar las palabras dicha
    for (let i = 0; i < ctx["palabrasAI"].length; i++) {
        if (ctx["palabrasAI"][i].toUpperCase() === palabra.toUpperCase()) {
            ctx["palabrasAI"].splice(i, 1);
            break;
        }
    }
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const esMiTurno = () => ctx.idTurno % ctx.jugadores.length === ctx.idYo;

const randomRango = (min, max) => Math.random() * (max - min) + min;

const getJugador = () => ctx.jugadores[ctx.idTurno % ctx.jugadores.length];

const jugadorActual = () => ctx.idTurno % ctx.jugadores.length;

const setPalabra = (palabra) => ($(".palabra-principal").textContent = palabra);

const $ = (selector) => document.querySelector(selector);

/*----------/Funciones auxiliares----------*/

//Event listener para que sirva el enter
var inputPalabra = $("#input_palabra");
inputPalabra.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        $("#btn_enviar_palabra").click();
    }
});

function addJugadoresHtml() {
    const contenedor = $("#placeholder_usuarios");

    for (i in ctx.jugadores) {
        j = ctx.jugadores[i];

        let fragmentoJugador = fragmentoJugadores
            .replace(/@i/g, i)
            .replace(/@color/g, coloresPalabras[i])
            .replace(/@nombre/g, ctx.jugadores[i]);

        contenedor.appendChild(document.createRange().createContextualFragment(fragmentoJugador));
    }
}

function tiempoContador() {
    let idTurno = ctx.idTurno;
    if (idTurno < ctx.jugadores.length) {
        return 10;
    } else if (idTurno < ctx.jugadores.length * 2) {
        return 8;
    } else {
        return 5;
    }
}

function iniciarContador() {
    let idTurno = ctx.idTurno;
    let segundos = tiempoContador();

    const timer = esMiTurno() ? $("#timer_yo") : $("#timer_" + (idTurno % ctx.jugadores.length));

    let tiempoActual = segundos;
    const interval = setInterval(() => {
        timer.textContent = tiempoActual--;
        if (tiempoActual == -1) {
            timer.textContent = "";
            clearInterval(interval);
            procesarTurno(PERDER, ctx);
        }
    }, 1000);

    return interval;
}

function limpiarTimer() {
    $("#timer_yo").textContent = "";
    $("#timer_" + (ctx.idTurno % ctx.jugadores.length)).textContent = "";
}

function limpiarVotos() {
    for (let i = 0; i < ctx.jugadores.length; i++) {
        popUpVoto("", i, "hidden");
    }
}

function popUpVoto(voto, id, estado) {
    const tt = $("#tool_tip_" + id);

    tt.style.visibility = estado;
    tt.textContent = voto;

    if (voto === NO) tt.style.color = "#ff0000";
    if (voto === SI) tt.style.color = "#238c06";

    if (estado === "hidden") tt.style.color = "black";
}

function procesarTurno(turno, voto) {
    switch (turno) {
        case SIGUIENTE_TURNO:
            setPalabra("");
            limpiarVotos();
            limpiarTimer();
            ctx["idTurno"] += 1;

            if (esMiTurno()) {
                procesarTurno(TURNO_YO);
            } else {
                procesarTurno(TURNO_OTROS);
            }
            break;

        case TURNO_YO:
            ctx.intervalYo = iniciarContador();
            desActivarEnviar(false);
            break;

        case PALABRA_YO:
            $(".palabra-principal").style.color = coloresPalabras[ctx.idTurno % ctx["jugadores"].length];
            let palabra = $("#input_palabra").value;

            if (ctx.palabrasDichas.includes(palabra.toUpperCase())) {
                $(".aviso-repetida").style.visibility = "visible";
                setTimeout(() => {
                    $(".aviso-repetida").style.visibility = "hidden";
                }, 2000);
            } else {
                clearInterval(ctx.intervalYo);
                ctx.palabrasDichas.push(palabra.toUpperCase());
                quitarPalabrAI(palabra);

                setPalabra(palabra);

                $("#input_palabra").value = "";
                desActivarEnviar(true);

                procesarTurno(VOTACION_OTROS);
                procesarTurno(RESULTADOS_VOTO);
            }

            break;

        case TURNO_OTROS:
            let tiempoPensar = randomRango(1000, 11000);

            //TODO: Iniciar el contador
            let interval = iniciarContador();

            if (ctx.palabrasAI.length > 0) {
                let palabra = ctx.palabrasAI.pop();
                //Simulación de selección de palabra
                setTimeout(() => {
                    clearInterval(interval);
                    $(".palabra-principal").style.color = coloresPalabras[ctx.idTurno % coloresPalabras.length];
                    setPalabra(palabra);
                    ctx.palabrasDichas.push(palabra.toUpperCase());
                    procesarTurno(VOTACION_OTROS);
                }, tiempoPensar);
            }

            //Si no hay más palabras no hace nada y pierde

            break;
        case VOTACION_OTROS:
            $(".aviso-repetida").style.visibility = "hidden";
            let promesas = [];
            for (let i = 0; i < ctx.jugadores.length; i++) {
                let voto = SI;
                if (Math.random() < 0.07) voto = NO;

                if (i !== ctx.idYo && i !== jugadorActual()) {
                    let tiempo = randomRango(1000, 4000);
                    let p = new Promise((resolve) => {
                        setTimeout(() => {
                            popUpVoto(voto, i, "visible");
                            if (voto == NO) $("tool-");
                            resolve(voto);
                        }, tiempo);
                    });
                    promesas.push(p);
                }
            }

            ctx["promesasVoto"] = promesas;
            desActivarBtnsVoto(false);

            break;

        case RESULTADOS_VOTO:
            desActivarBtnsVoto(true);

            let votosSi = voto === SI ? 1 : 0;
            let votosNo = voto === NO ? 1 : 0;

            if (!esMiTurno()) popUpVoto(voto, ctx.idYo, "visible");

            Promise.all(ctx.promesasVoto).then((values) => {
                values.forEach((v) => {
                    if (v === SI) {
                        votosSi++;
                    } else {
                        votosNo++;
                    }
                }); //EndForEach
                setTimeout(() => {
                    if (votosNo > 1) {
                        procesarTurno(PERDER);
                    } else {
                        procesarTurno(SIGUIENTE_TURNO);
                    }
                }, 1000);
            });
            break;
        case PERDER:
            desActivarEnviar(true);
            desActivarBtnsVoto(true);
            setPalabra("");
            limpiarVotos();
            limpiarTimer();

            let mensaje = esMiTurno() ? "Perdiste :(" : `Perdió ${getJugador(ctx.idTurno)}`;

            $("#mensaje_perder").textContent = mensaje;
            $(".aviso-perder").style.visibility = "visible";
            $("#input_palabra").value = "";

            break;
    }
}

function comenzarJuego() {
    $(".aviso-perder").style.visibility = "hidden";
    ctx.idTurno = 0;
    ctx.categoria = getCategoriaRand();

    $("#categoria").textContent = ctx.categoria;
    ctx.palabrasAI = CATEGORIAS[ctx.categoria].slice();
    ctx.palabrasDichas = [];

    if (ctx.idTurno === ctx.idYo) {
        procesarTurno(TURNO_YO);
    } else {
        procesarTurno(TURNO_OTROS);
    }
}

function initJuego() {
    let yo = "Joaquin";
    let jugadores = ["Lola", "Joaquin", "Michel", "Eduardo", "Chicano", "Lucio"];
    let idYo = jugadores.indexOf(yo);

    ctx = {
        jugadores: jugadores,
        yo: yo,
        idYo: idYo,
        idTurno: 0,
    };
    addJugadoresHtml();

    comenzarJuego();
}
