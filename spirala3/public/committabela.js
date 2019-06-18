var CommitTabela=(function(){
    //lokalne variable idu ovdje
    var tbl;
    var tr;
    var i, j;
    var td;
    var doc = document;
    var fragment = doc.createDocumentFragment();
    var brojCommita = 0, maxCommita = 0;
    var link = doc.createElement("a");
    var linkText;
    var konstruktor=function(divElement,brojZadataka){       
     
           for (i = 0; i<1; i++) {
               tr = doc.createElement("tr");
               for (j = 0; j <= 1; j++) {
                td = doc.createElement("td");
                if (i == 0 && j == 0) td.innerHTML = "Naziv zadatka";                    
                else if (i == 0 && j == 1) td.innerHTML = "Commiti";
                tr.appendChild(td);                    
                fragment.appendChild(tr);
               }
              
           }
           for (i = 1; i <= brojZadataka; i++) {
                 tr = doc.createElement("tr");
                
                 for (j=0; j< 1; j++) {
                    td = doc.createElement("td");
                    
                     if (j == 0 && i > 0) td.innerHTML = "Zadatak " + i;
                    tr.appendChild(td);                    
                    fragment.appendChild(tr);
                 }                 
            }

            tbl = doc.createElement("table");
            tbl.appendChild(fragment);
            doc.getElementById("zaTabelu").appendChild(tbl);
           tbl.style.border = "1px solid rgb(6, 6, 59)";
           tbl.style.borderCollapse = "collapse";
           

        return{
            dodajCommit:function(rbZadatka,url){
               for (i=0; i<=rbZadatka; i++) {
                   if (i == rbZadatka) {
                        if (brojCommita == 0) {
                            td = doc.createElement("td");
                            link.setAttribute("href", url);
                            linkText = doc.createTextNode(brojCommita+1);
                            link.appendChild(linkText);
                            td.appendChild(link);                                          
                            tr.appendChild(td);
                            brojCommita += 1;
                            maksCommita = brojCommita;
                        }
                        else if (brojCommita <= maksCommita) {
                            td = doc.createElement("td");
                            link.setAttribute("href", url);
                            linkText = doc.createTextNode(brojCommita+1);
                            link.appendChild(linkText);
                            td.appendChild(link);                                          
                            tr.appendChild(td);
                            brojCommita += 1;
                        }
                        break;
                   }
               }  
            },
           /* editujCommit:function(rbZadatka,rbCommita,url){...},
            obrisiCommit:function(rbZadatka,rbCommita){...}*/
        }
    }
    return konstruktor;
    }());