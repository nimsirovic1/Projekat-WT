

window.onload = function () {
    var godine = document.getElementsByName("sGodine");
    var vjezbe = document.getElementsByName("sVjezbe");
    var zadaci = document.getElementsByName("sZadatak");
    var cokoladaAjax = new CokoladaAjax();
    godine.forEach((godina) => {
        cokoladaAjax.osvjezi(godina, 'malina');
    });
    vjezbe.forEach((vjezba) => {
        cokoladaAjax.osvjezi(vjezba, 'cokolada');
    });
    zadaci.forEach((zadatak) => {
        cokoladaAjax.osvjezi(zadatak, 'kupina');
    });

    var div = document.getElementById("error4");
    var n = document.getElementById("tb");
    var forma = document.getElementById("fNova");
    var validacija = new Validacija(div);
    forma.onsubmit = function(event) {
        validacija.naziv(n);
        return n.style.backgroundColor !== "orangered";
    }
    
}
