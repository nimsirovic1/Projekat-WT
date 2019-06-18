var Validacija=(function(){
    //lokalne variable idu ovdje
    var broj_rijeci;
    var tekst;
    var god = /20\d\d\/20\d\d/;
    var g1;
    var g2;
    var nazivRegex = /^[a-zA-z]+[a-zA-Z0-9\/"'!?:;,-]+[a-z0-9]$/;
    var passRegex = /^((?=(.*[A-Z]){2,})(?=(.*\d){2,})(?=(.*[a-z]){2,}))(?!.*\W)/;
    var imeRegex = /^([A-Z][a-z]+[ -]?)([ -]?[A-Z](([^"=]?)')?[a-z]+(([^"=]?)')?[ -]?){0,3}$/; //radjeno za php, ovdje je greska
    var urlRegex = /^(http|https|ftp|ssh):\/\/\w+((\.\w+)*|(\w+(?!\.)))(\/(\w+\/?)+\??([a-z\d\-]\=[a-z\d\-]\&[a-z\d\-]\=[a-z\d\-])?)?/;

    
    var konstruktor=function(divElementPoruke){

        divElementPoruke.innerHTML = "";

        function ispisPoruke(divElementPoruke, tekst) {
            if(divElementPoruke.innerHTML != "") {
               divElementPoruke.innerHTML = divElementPoruke.innerHTML.replace("!","");
               divElementPoruke.innerHTML += "," + tekst + "!";
            }
           else divElementPoruke.innerHTML += "Sljedeća polja nisu validna:" + tekst + "!";
        }

        
        function word_count(str) {
          return str.split(" ").length;
        }
        
        return {
           ime:function(inputElement){  
               tekst = "ime";
               broj_rijeci = word_count(inputElement.value);             
               if (broj_rijeci > 4 || inputElement.value == "" || imeRegex.test(inputElement.value) == false) {
                    inputElement.style.backgroundColor = "orangered";
                    ispisPoruke(divElementPoruke, tekst);
                    return false; 
               }
               else {
                    divElementPoruke.innerHTML = "";
                    inputElement.style.backgroundColor = "white";
                    return true;
               }
            },
            godina:function(inputElement){
                tekst = "godina";
                if(god.test(inputElement.value) == false) {
                    inputElement.style.backgroundColor = "orangered";
                    ispisPoruke(divElementPoruke, tekst);
                   return false; 
                }
                else {
                    g1 = parseInt(inputElement.value.substring(2,4));
                    g2 = parseInt(inputElement.value.substring(7,9));
                    if (Math.abs(g2 - g1) != 1) {
                        inputElement.style.backgroundColor = "orangered";
                        ispisPoruke(divElementPoruke, tekst);
                        return false; 
                    }
                    else {
                        divElementPoruke.innerHTML = "";
                        inputElement.style.backgroundColor = "white";
                        return true;
                    }
                }
            },
            repozitorij:function(inputElement,regex){
                tekst = "repozitorij";
                if (regex.test(inputElement.value) == false) {
                    inputElement.style.backgroundColor = "orangered";
                    ispisPoruke(divElementPoruke, tekst);
                    return false; 
                }                
                else {
                    divElementPoruke.innerHTML = "";
                    inputElement.style.backgroundColor = "white";
                    return true;
                }
            },
            index:function(inputElement){
                tekst = "indeks";
                if (parseInt(inputElement.value) <= 0 ||  parseInt(inputElement.value.substring(0,2)) < 14 || 
                parseInt(inputElement.value.substring(0,2)) > 20 || 
                String(inputElement.value).replace('.', '').length != 5) {
                    inputElement.style.backgroundColor = "orangered";
                    ispisPoruke(divElementPoruke, tekst);
                    return false;
                }
                else {
                    divElementPoruke.innerHTML = "";
                    inputElement.style.backgroundColor = "white";
                    return true;
                }
            },
            naziv:function(inputElement){
                tekst = "naziv";
                if (inputElement.value.length < 3 || nazivRegex.test(inputElement.value) == false ||
                inputElement.value == "") {
                    inputElement.style.backgroundColor = "orangered";
                    ispisPoruke(divElementPoruke, tekst);
                    return false;
                }
                else {
                    divElementPoruke.innerHTML = "";
                    inputElement.style.backgroundColor = "white";
                    return true;
                }
            },
            password:function(inputElement){
                tekst = "password";
                if (inputElement.value.length < 8 || inputElement.value.length == 0 ||
                    passRegex.test(inputElement.value) == false) {
                    inputElement.style.backgroundColor = "orangered";
                    ispisPoruke(divElementPoruke, tekst);
                    return false; 
                }
                else {
                    divElementPoruke.innerHTML = "";
                    inputElement.style.backgroundColor = "white";
                    return true;
                }

            },
            url:function(inputElement){
                tekst = "URL";
                if (urlRegex.test(inputElement.value) == false) {
                    inputElement.style.backgroundColor = "orangered";
                    ispisPoruke(divElementPoruke, tekst);
                    return false; 
                }
                else {
                    divElementPoruke.innerHTML = "";
                    inputElement.style.backgroundColor = "white";
                    return true;
                }
            }
        }
    }
    return konstruktor;
    }()
    );
   