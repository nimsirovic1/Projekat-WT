function klikAddGodina() {
    var div = document.getElementById("error2");
    var god2 = document.getElementById("god");
    var validacija = new Validacija(div);
    validacija.godina(god2);

   var repo1 = document.getElementById("rep1");
    var regex = /Repozitorij/;
    validacija.repozitorij(repo1, regex);
    var repo2 = document.getElementById("rep2");
    return validacija.repozitorij(repo2, regex);
   // this.form.submit();
}