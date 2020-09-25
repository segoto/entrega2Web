const biblioteca = [
    {
        nombre: "Bohemian Rhapsody",
        autor: "Queen",
        tiempo: "5:59",
        sec: 359,
    },
    {
        nombre: "Liar",
        autor: "Camila Cabello",
        tiempo: "3:27",
        sec: 208,
    },
    {
        nombre: "Persiana Americana",
        autor: "Soda Stereo",
        tiempo: "4:52",
        sec: 359,
    },
    {
        nombre: "Causa Perdida",
        autor: "Morat",
        tiempo: "3:40",
        sec: 359,
    },
    {
        nombre: "Amor Prohibido",
        autor: "Selena",
        tiempo: "2:44",
        sec: 359,
    },
    {
        nombre: "Carita Bonita",
        autor: "Lil Silvio & El Vega",
        tiempo: "2:54",
        sec: 359,
    },
    {
        nombre: "La hormiguita",
        autor: "Juan L.Guerra",
        tiempo: "3:04",
        sec: 359,
    },
    {
        nombre: "Las Cosas de la Vida",
        autor: "Carlos Vives",
        tiempo: "3:27",
        sec: 359,
    },
    {
        nombre: "Hymn for the Weekend",
        autor: "Coldplay, Seeb",
        tiempo: "3:32",
        sec: 359,
    },
    {
        nombre: "Todo Cambió",
        autor: "Camila",
        tiempo: "3:13",
        sec: 359,
    },
    {
        nombre: "Dejaría Todo",
        autor: "chayanne",
        tiempo: "4:43",
        sec: 359,
    },
];

var canciones_espera = [
    {
        nombre: "Bohemian Rhapsody",
        autor: "Queen",
        tiempo: "5:59",
        sec: 359,
    },
    {
        nombre: "Liar",
        autor: "Camila Cabello",
        tiempo: "3:28",
        sec: 208,
    },
    {
        nombre: "Persiana Americana",
        autor: "Soda Stereo",
        tiempo: "4:52",
        sec: 359,
    },
    {
        nombre: "Causa Perdida",
        autor: "Morat",
        tiempo: "3:40",
        sec: 359,
    },
];

const canciones_pasadas = [];

const audio = document.getElementById("audio-player");
const rango = document.getElementById("prog-time");
const act_tim = document.getElementById("actual-time");
const tLista = document.getElementById("music-order");
const t_cancion = document.getElementById("titulo-cancion");
const t_autor = document.getElementById("autor-cancion");
const t_tiempo = document.getElementById("tiempo-cancion");
const btn = document.getElementById("cancel-btn");
const lst = document.getElementById("searchResult");
const input = document.getElementById("music-input");
const spc = document.getElementById("espacer");
const search = document.getElementById("search-bar");

var secActuales = 100;

function cargar_canciones() {
    while (tLista.firstChild) {
        tLista.removeChild(tLista.firstChild);
    }
    var i = 0;
    canciones_espera.forEach((cancion) => {
        const canc = document.createElement("p");
        canc.setAttribute("class", "nom-canc");
        canc.textContent = cancion.nombre;
        const div_nombre = document.createElement("div");
        div_nombre.setAttribute("class", "col-auto");
        div_nombre.appendChild(canc);
        const div_row = document.createElement("div");
        div_row.setAttribute("class", "row justify-content-between");
        div_row.appendChild(div_nombre);

        const elim = document.createElement("p");
        elim.setAttribute("onclick", "removeSong(" + i + ")");
        elim.textContent = "-";

        const mover = document.createElement("p");
        mover.textContent = "M";
        mover.setAttribute("class", "handle");

        const row = document.createElement("div");
        row.setAttribute("class", "row");

        const col1 = document.createElement("div");
        col1.setAttribute("class", "col");

        const col2 = document.createElement("div");
        col2.setAttribute("class", "col");

        col1.appendChild(elim);
        col2.appendChild(mover);
        row.appendChild(col1);
        row.appendChild(col2);
        const div_mover = document.createElement("div");
        div_mover.setAttribute("class", "col-auto");
        div_mover.appendChild(row);
        div_row.appendChild(div_mover);

        const div_item = document.createElement("div");
        div_item.setAttribute("class", "list-group-item");
        div_item.appendChild(div_row);
        tLista.appendChild(div_item);

        i += 1;
    });
}

new Sortable(document.getElementById("music-order"), {
    handle: ".handle",
    group: "shared",
    animation: 145,
    ghostClass: "bg-info",
});

function cargar_primera() {
    if (canciones_espera.length > 0) {
        var act = canciones_espera.shift();
        canciones_pasadas.push(act);
        t_cancion.textContent = act.nombre;
        t_autor.textContent = act.autor;
        t_tiempo.textContent = act.tiempo;
    }
}

function siguiente_cancion() {
    actulizarLista();
    if (canciones_espera.length > 0) {
        var act = canciones_espera.shift();
        canciones_pasadas.push(act);
        t_cancion.textContent = act.nombre;
        t_autor.textContent = act.autor;
        t_tiempo.textContent = act.tiempo;
        secActuales = act.sec;
        actualizarAudio();
        play();
        cargar_canciones();
    } else if (canciones_espera.length == 0) {
        actualizarAudio();
        t_cancion.textContent = "--";
        t_autor.textContent = "-";
        t_tiempo.textContent = "--:--";
    }
}

function anterior_cancion() {
    if (canciones_pasadas.length > 1) {
        var act = canciones_pasadas.pop();
        canciones_espera.unshift(act);
        act = canciones_pasadas[canciones_pasadas.length - 1];
        t_cancion.textContent = act.nombre;
        t_autor.textContent = act.autor;
        t_tiempo.textContent = act.tiempo;
        secActuales = act.sec;

        actualizarAudio();
        play();

        cargar_canciones();
    }
}

function inicio() {
    cargar_primera();
    cargar_canciones();
}

function actulizarLista() {
    var nuevo = [];
    var child = document.getElementsByClassName("nom-canc");
    for (var i = 0; i < child.length; i++) {
        nuevo.push(canciones_espera.find((can) => can.nombre === child[i].textContent));
    }
    canciones_espera = nuevo;
}

function cancel_btn() {
    btn.hidden = true;
    lst.hidden = true;
    input.value = "";
    spc.hidden = true;
}

function search_btn() {
    if (input.value != "") {
        spc.hidden = false;
        btn.hidden = false;
        lst.hidden = false;

        var busqueda = [];
        for (var i = 0; i < biblioteca.length; i++) {
            var bus = biblioteca[i];
            if (bus.nombre.toLowerCase().includes(input.value.toLowerCase()) || bus.autor.toLowerCase().includes(input.value.toLowerCase())) {
                busqueda.push(bus);
            }
        }
        actBusqueda(busqueda);
    }
}

function actBusqueda(data) {
    while (lst.firstChild) {
        lst.removeChild(lst.firstChild);
    }
    if (data.length === 0) {
    } else {
        data.forEach((res) => {
            const canc = document.createElement("p");
            canc.textContent = res.nombre + " - " + res.autor;
            const div_nombre = document.createElement("div");
            div_nombre.setAttribute("class", "col-auto");
            div_nombre.appendChild(canc);
            const div_row = document.createElement("div");
            div_row.setAttribute("class", "row justify-content-between");
            div_row.appendChild(div_nombre);
            const add = document.createElement("p");
            add.setAttribute("onclick", 'addSong("' + res.nombre + '")');
            add.textContent = "+";
            const div_mover = document.createElement("div");
            div_mover.setAttribute("class", "col-auto");
            div_mover.appendChild(add);
            div_row.appendChild(div_mover);
            const div_item = document.createElement("div");
            div_item.setAttribute("class", "list-group-item");
            div_item.appendChild(div_row);
            lst.appendChild(div_item);
        });
    }
}

function addSong(nombre) {
    canciones_espera.push(biblioteca.find((can) => can.nombre === nombre));
    cargar_canciones();
}

function removeSong(index) {
    actulizarLista();
    var nuevo = [];
    for (var i = 0; i < canciones_espera.length; i++) {
        if (i != index) {
            nuevo.push(canciones_espera[i]);
        }
    }
    canciones_espera = nuevo;
    cargar_canciones();
}

var actTiempo;

function actualizarAudio() {
    audio.setAttribute("src", "./mp3/" + t_cancion.textContent + ".mp3");
    rango.setAttribute("max", secActuales);
}

function play() {
    if (audio.paused) {
        audio.play();
        actTiempo = setInterval(timeLine, 1000);
    } else {
        audio.pause();
    }
}

function sec2min(sec) {
    return parseInt(sec / 60, 10) + ":" + (sec.toFixed(0) - parseInt(sec / 60, 10) * 60);
}

function timeLine() {
    act_tim.textContent = sec2min(audio.currentTime);
    if (audio.currentTime >= secActuales) {
        siguiente_cancion();
    }
    rango.value = audio.currentTime;
}

function rangoTime() {
    audio.currentTime = rango.value;
}

inicio();
