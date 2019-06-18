function Klik() {
    var div = document.getElementById("error3");
    var naz = document.getElementById("naziv1");
    var forma = document.getElementById("noviZadatak");
    var validacija = new Validacija(div);
    return validacija.naziv(naz);
}