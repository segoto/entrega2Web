let chosenList = 0;

const renderCarousel = (i) => {
    let col = document.createElement("div");
    col.classList.add("col-md-4");

    let button = document.createElement("button");
    button.classList.add("btn", "btn-link", "w-100");
    button.onclick = () => {
        chosenList = i;
    };

    let card = document.createElement("div");
    card.classList.add("card", "h-100");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "h-100");

    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.style.height = "200px";
    img.src = listas[i].img;
    card.appendChild(img);

    let text = document.createElement("h5");
    text.classList.add("card-text", "text-center");
    text.innerHTML = listas[i].list;
    cardBody.appendChild(text);
    card.appendChild(cardBody);
    button.appendChild(card);
    col.appendChild(button);
    return col;
};
function cargarListas() {
    let flag = true;
    let car = document.getElementById("carrusellist");
    let tam = listas.length;

    for (let i in listas) {
        let it = document.createElement("div");
        it.classList.add("carousel-item");

        let col1 = renderCarousel(i);
        let col2 = renderCarousel((parseInt(i) + 1) % tam);
        let col3 = renderCarousel((parseInt(i) + 2) % tam);
        if (flag) {
            it.classList.add("active");
            flag = false;
        }

        it.appendChild(col1);
        it.appendChild(col2);
        it.appendChild(col3);

        car.appendChild(it);
    }
}

cargarListas();

$("#recipeCarousel").carousel({
    interval: false,
});

const onClickPlayGame = () => {
    let i = document.getElementById("inputGroupSelect02");
    i = $("#inputGroupSelect02 option:selected").text();
    let url = this.location.href.split("/").slice(0, -2).join("/") + "/juego/juego.html?list=" + chosenList + "&plays=" + i;
    this.location.href = url;
};
