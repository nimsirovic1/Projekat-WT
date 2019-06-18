function Klik() {
    var div = document.getElementById("error");
    var indeks2 = document.getElementById("indeks");
    var ime2 = document.getElementById("ime");
    var validacija = new Validacija(div);
    validacija.ime(ime2);
    validacija.index(indeks2);
}