function agregar_restaurantes() {
    var row = document.getElementById("MyRow");

    for (let i in restaurantes) {
        let body = restaurantes[i];

        var col = document.createElement("div");
        col.classList.add("col-12");
        let rowCol = document.createElement("div");
        rowCol.classList.add("row", "justify-content-center", "blanquito");
        var card = document.createElement("div");
        card.classList.add("card");
        //card.style.width = "100%";
        // card.style.height = "250px";

        var img = document.createElement("img");
        img.classList.add("card-img-top", "img-fluid");
        //img.style.width = "100%";
        //img.style.height = "120px";
        img.style.objectFit = "contain";
        img.src = body.img;
        img.style.backgroundColor = body.color;
        card.appendChild(img);

        var bodyc = document.createElement("div");
        bodyc.classList.add("card-body");

        var cardTitle = document.createElement("h6");
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML = i;
        bodyc.appendChild(cardTitle);

        var cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerHTML = body.des;
        bodyc.appendChild(cardText);

        var hip = document.createElement("a");
        hip.href = body.src;

        card.appendChild(img);
        card.appendChild(bodyc);
        hip.appendChild(card);
        rowCol.appendChild(hip);
        col.appendChild(rowCol);
        row.appendChild(col);
    }
}
agregar_restaurantes();
