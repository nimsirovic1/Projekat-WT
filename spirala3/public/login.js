function klik() {
    var div = document.getElementById("loginError");
    var sifra = document.getElementById("password");
    var username = document.getElementById("username");
    var validacija = new Validacija(div);
    validacija.ime(username);
    validacija.password(sifra);
   // this.form.submit();
}