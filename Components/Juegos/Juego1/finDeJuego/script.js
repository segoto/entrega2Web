function cargar() {
    let params = new URL(document.location).searchParams;
    let num = params.get("gano");
    if (parseInt(num) === 0) {
        let fs = document.getElementById("first");
        fs.innerHTML = "1. ¡¡¡¡Tu!!!!";
    } else {
        let fs = document.getElementById("third");
        fs.innerHTML = "3. Tu";
    }
}
cargar();
