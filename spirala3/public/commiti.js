function klik() {
    var mojDiv = document.getElementById("zaTabelu");
    var brojZadataka = document.getElementById("brojZad");
    var tabela = new CommitTabela(mojDiv,4);
    var url = "www.google.ba";
    tabela.dodajCommit(0,url);
    tabela.dodajCommit(0,url);
    tabela.dodajCommit(0,url);
}
