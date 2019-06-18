var CokoladaAjax = (function () {
    var konstruktor = function () {
        var osvjezi = function (select, mode) {
            var http = new XMLHttpRequest();
            http.onreadystatechange = function () {
                if(http.readyState === 4 && http.status == 200) {
                    let opcije = '';
                    let data = JSON.parse(http.responseText);    
                    
                    
                    data.forEach(opcija => {
                        opcije += `<option value="${opcija.id}">${opcija.naziv}</option>`;
                    });
                    select.innerHTML = opcije;
                }
                else if (http.readyState == 4 && http.status == 404)
                    select.innerHTML = "Greska";
        }

              
        http.open("GET","http://localhost:8080/"+mode,true);
        http.setRequestHeader("Content-Type","application/json");
        http.send();
    };
      return {
          osvjezi: osvjezi
      } 
    }
    return konstruktor;
}());

