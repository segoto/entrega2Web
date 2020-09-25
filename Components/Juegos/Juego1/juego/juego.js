let llevo = [];
let i;
let maxi;
let suma = 0;

function jugo() {
    if (i === parseInt(this.id[5])) {
        document.getElementById("circle" + (llevo.length - 1)).classList.add("success");
        document.getElementById("circle" + (llevo.length - 1)).classList.remove("notPlayedYet");
        suma++;
        cargarCanciones();
    } else {
        document.getElementById("circle" + (llevo.length - 1)).classList.add("error");
        document.getElementById("circle" + (llevo.length - 1)).classList.remove("notPlayedYet");
        cargarCanciones();
    }
}
function cargarCanciones() {
    if (llevo.length == maxi) {
        let url = 0;
        if (suma >= maxi / 2) {
            url = this.location.href.split("/").slice(0, -2).join("/") + "/finDeJuego/finDeJuego.html?gano=" + "0";
        } else {
            url = this.location.href.split("/").slice(0, -2).join("/") + "/finDeJuego/finDeJuego.html?gano=" + "1";
        }
        this.location.href = url;
    }
    let params = new URL(document.location).searchParams;
    let list = params.get("list");
    i = Math.floor(Math.random() * 3) + 1;

    let songs = listas[list].songs;
    let cancion = Math.floor(Math.random() * songs.length);

    while (llevo.find((element) => element === cancion) != undefined) {
        cancion = Math.floor(Math.random() * songs.length);
    }

    llevo.push(cancion);
    let porAhora = [];
    porAhora.push(cancion);

    for (let j = 1; j <= 4; j++) {
        let esta = cancion;

        if (i != j) {
            esta = Math.floor(Math.random() * songs.length);
            while (porAhora.find((element) => element === esta) != undefined) {
                esta = Math.floor(Math.random() * songs.length);
            }
        }
        document.getElementById("cardTitle" + j).innerHTML = songs[esta].name;
        document.getElementById("cardImage" + j).src = songs[esta].img;
        document.getElementById("boton" + j).addEventListener("click", jugo);
        document.getElementById("cardAuthor" + j).children[0].innerHTML = songs[esta].author;
        porAhora.push(esta);
    }
    const audio = document.getElementById("audio-player");
    audio.setAttribute("src", "." + songs[cancion].mp3);
    audio.play();
}
{
    /* <div class="row justify-content-center mt-5" id="partidas">
<div class="col-sm text-center"><span class="success"></span></div> */
}
function cargarPartidas() {
    let params = new URL(document.location).searchParams;
    let num = params.get("plays");
    let partidas = document.getElementById("partidas");
    maxi = num;
    for (let i = 0; i < num; i++) {
        let div = document.createElement("div");
        div.classList.add("col-sm", "text-center");

        let span = document.createElement("span");
        span.classList.add("notPlayedYet");
        span.id = "circle" + i;

        div.appendChild(span);
        partidas.appendChild(div);
    }
}
cargarCanciones();
cargarPartidas();
