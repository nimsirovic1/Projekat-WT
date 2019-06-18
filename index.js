const db = require('./db.js');
db.sequelize.sync();

const mysql = require('mysql2');
var accepts = require('accepts');
const express = require('express');
var http = require('http');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'Documents/' });
var path = require('path');
var pug = require('pug');
var json2csv = require('json2csv').parse;
var noviRed= "\r\n";
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Accept = require('accept');
const mediaTypes = Accept.mediaTypes("application/json;q=0.5", "application/xml", "text/csv");

app.use(express.static('./spirala3/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('http://localhost:8080/nazivDokumenta.html', (req, res) => {
   res.send('To je sve....');
});

// treci zadatak
app.get('/zadatak', (req, res) => {
    // http://localhost:8080/zadatak?naziv=Zadatak1
    var ima = false;
    db.zadatak.findAll({
        where: {
            naziv: req.query.naziv
        }
    }).then((resp) => {
        resp.forEach((object) => {
            if (object.naziv == req.query.naziv) {
                ima = true;
                let a = object.postavka.split('/');
                let b = a[a.length-1];
                res.redirect(b);
                return;
                
            }
        });
        if (ima == false) {
            var fn = pug.compile('Zadatak ne postoji');        
            var html = pug.renderFile('greska.pug', {
                Poruka: "Zadatak ne postoji"
            });
            res.send(html);
        }
      });
});

// drugi zadatak
app.post('/addZadatak', upload.single('postavka'), (req, res, next) => {   
    let extNiz  = req.file.mimetype.split("/");
    let ext = extNiz[extNiz.length - 1]; 

    fs.readdir('./spirala3/public',(err, files) => {
        if (err) throw err;

        let extNiz  = req.file.mimetype.split("/");
        let ext = extNiz[extNiz.length - 1];

        if(!files.includes(`${req.body.naziv}.pdf`)) //ukoliko nema tog zadatka
        {
            if (ext === "pdf") { //ukoliko je pdf fajl

                db.zadatak.findOrCreate({
                    where: {
                        naziv : req.body.naziv
                    },
                    defaults: {
                        naziv : req.body.naziv,
                        postavka: `localhost:8080/${req.body.naziv}.pdf`
                    }
                });

                let zad = {  
                    naziv: req.body.naziv,
                    postavka: `localhost:8080/${req.body.naziv}.pdf`
                };

                let data = JSON.stringify(zad);  

                fs.writeFile(`${req.body.naziv}Zad.json`, data, (err) => {
                    if (err) throw err;
                });

                var isWin = process.platform === "win32";
                if (isWin) var delimiter = '\\';
                else var delimiter = '/';

                //kreirati pdf fajl
                var newDest = './spirala3/public' ;    
            
                var oldPath = req.file.path;
                
                var newPath = newDest + delimiter +  `${req.body.naziv}.pdf`;
        
                fs.renameSync(oldPath, newPath);
                //fs.unlinkSync(oldPath);
                
                
                //  res.sendFile('public/addZadatak.html', { root: __dirname });
                res.sendFile('addZadatak.html', { root: path.join(__dirname, './spirala3/public') });
              //  return;
            }
        
            else {
                // ukoliko nije pdf fajl          
            
                var fn = pug.compile('Izabrani file nije pdf fajl.');        
                var html = pug.renderFile('greska.pug', {
                    Poruka: "Izabrani file nije pdf file",
                    Link: "addZadatak.html"
                });
                res.send(html);
            //    return;
            }
        }

        else {
            // ukoliko zadatak sa tim nazivom vec postoji
            var fn = pug.compile('Zadatak sa izabranim nazivom vec postoji');        
            var html = pug.renderFile('greska.pug', {
                Poruka: "Zadatak sa izabranim nazivom vec postoji",
                Link: "addZadatak.html"
            });
            res.send(html);
           // return;
        }
   
    });
});


// cetvrti zadatak
app.post('/addGodina', (req, res) => {   
    var response = {
        nazivGod: req.body.nazivGod,
        nazivRepVje: req.body.nazivRepVje,
        nazivRepSpi: req.body.nazivRepSpi
    };
           
    var toCsv = {
        response,
        hasCSVColumnTitle: false
    };   
  
    var nasao = false;
    

    fs.readFile("godine.csv", (err, content) => {
        if (err) throw err;
        
        var tekst = content.toString();
            if (tekst.includes(req.body.nazivGod)) {
                var fn = pug.compile('Godina sa unesenim nazivom vec postoji');        
                var html = pug.renderFile('greska.pug', {
                    Poruka: "Godina sa unesenim nazivom vec postoji",
                    Link: "addGodina.html"
                });
                res.send(html);
                return;
            }
           else {
                db.godina.findOrCreate({
                    where: {
                        naziv : req.body.nazivGod
                    },
                    defaults: {
                        naziv : req.body.nazivGod,
                        nazivRepSpi : req.body.nazivRepSpi,
                        nazivRepVje : req.body.nazivRepVje
                    }
                });

                fs.stat('godine.csv', (err, stat) => {            
                    var csv = json2csv(response).replace('"nazivGod","nazivRepVje","nazivRepSpi"', '');
                    csv = csv.replace(/['"]+/g, '');
                    fs.appendFile('godine.csv', csv, (err) => {
                        if (err) throw err;
                        console.log("Red je dodan");
                    });
                });
                
                res.sendFile('addGodina.html', { root: path.join(__dirname, './spirala3/public') });
            }
    });
});

// peti zadatak
app.get('/godine', (req, res) => {
    var niz = [];
    db.godina.findAll().then((resp) => {
        resp.forEach((object) => {
            var objekat = {nazivGod:object.naziv,nazivRepVje:object.nazivRepVje,nazivRepSpi:object.nazivRepSpi};
            niz.push(objekat);
        });
        var json = JSON.stringify(niz);
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
      });
});

const getHighestPriorityType = function (accept) {
    const types = accept.type();
    let highest = '';
    types.forEach(type => {
        if (type.indexOf('json') > 0) {
            highest = 'json';
        }
        if (type.indexOf('xml') > 0 && highest !== 'json') {
            highest = 'xml';
        }
        if (type.indexOf('csv') > 0 && highest !== 'json' && highest !== 'xml') {
            highest = 'csv';
        }
    });
    return highest;
}

// sedmi zadatak
app.get('/zadaci', function (req, res) {
    var accept = accepts(req);
    const type = getHighestPriorityType(accept);
    
    db.zadatak.findAll().then((resp) => {
        var result = [];
        var niz = [];
       // resp.forEach((object) => {
            switch (type) {
                case 'json':
                resp.forEach((object) => {
                   
                     result.push({ naziv: object.naziv, postavka: object.postavka });  
                    
                });                 
                    res.contentType('application/json');
                    res.send(JSON.stringify(result));
                    break;

                case 'xml':
                    var rez = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
                    rez += "<zadaci>";
                   
                    resp.forEach((object) => { 
                        
                            rez += "<zadatak>";
                            rez += "<naziv>" + object.naziv + "</naziv>";
                            rez += "<postavka>" + object.postavka + "</postavka>";
                            rez += "</zadatak>";
                        
                           
                    });   
                   
                    rez += "</zadaci>";
                    res.set('Content-Type', 'application/xml');
                    res.send(rez);
                    break;

                case 'csv':
                    var csv = "";
                    resp.forEach((object) => {
                        
                            var objekat = {naziv:object.naziv,postavka:object.postavka};
                           
                            var csv2 = json2csv(objekat).replace('"naziv","postavka"', '');
                            csv2 = csv2.replace(/['"\r\n]+/g, '');
                            
                            csv += csv2;
                            csv += "\n";
                    });
                    
                    res.set('Content-Type', 'text/csv');
                    res.send(csv);
                    break;

                default:
                    var fn = pug.compile('Greska');        
                    var html = pug.renderFile('greska.pug', {
                        Poruka: "Greska",
                        Link: "addZadatak.html"
                    });
                    res.send(html);
                    break;
            }
        });
       // res.end();
   // });
});

// 2.a

app.get('/cokolada', (req, res) => {
    db.vjezba.findAll().then((resp) => {
        res.contentType('application/json');
        res.send(JSON.stringify(resp));
    });
});

app.get('/malina', (req, res) => {
    db.godina.findAll().then((resp) => {
        res.contentType('application/json');
        res.send(JSON.stringify(resp));
    });
});

app.get('/kupina', (req, res) => {
    db.zadatak.findAll().then((resp) => {
        res.contentType('application/json');
        res.send(JSON.stringify(resp));
    });
});



app.post('/addVjezba', function (req, res) {
    var sGodine = req.body['sGodine'];
    var sVjezbe = req.body['sVjezbe'];
    var naziv = req.body['naziv'];
    var spirala = req.body['spirala'];
   
    if (!naziv) {
        if (!sGodine || !sVjezbe) {
            var fn = pug.compile('Greska');        
            var html = pug.renderFile('greska.pug', {
                Poruka: "Greska",
                Link: "addVjezba.html"
            });
            res.send(html);
        }

        db.vjezba.findByPk(sVjezbe).then((vjezba) => {
            db.godina.findByPk(sGodine).then((godina) => {
                if (godina && vjezba) {
                    vjezba.addGodine(godina).then(function () {
                        res.redirect('/addVjezba.html');
                    });
                }
            });
        }).catch(function () {
            var fn = pug.compile('Greska');        
            var html = pug.renderFile('greska.pug', {
                Poruka: "Greska",
                Link: "addVjezba.html"
            });
            res.send(html);
        });
    } 
    else {
        // 2. b)
        if (!sGodine ) {
           var fn = pug.compile('Greska');        
            var html = pug.renderFile('greska.pug', {
                Poruka: "Greska",
                Link: "addVjezba.html"
            });
            res.send(html);
        }

        let jeLiCekiranaSpirala = false;
        
        if(spirala){
            jeLiCekiranaSpirala = true;
        }

       
            db.vjezba.create({
                naziv: naziv,
                spirala: jeLiCekiranaSpirala
            }).then(function (vjezba) {
                db.godina.findByPk(sGodine).then((godina) => {
                    vjezba.addGodine(godina).then(function () {
                        res.redirect('/addVjezba.html');
                    });
                });
            }).catch(function () {
                var fn = pug.compile('Greska');        
                var html = pug.renderFile('greska.pug', {
                    Poruka: "Vjezba sa tim nazivom vec postoji!",
                    Link: "addVjezba.html"
                });
                res.send(html);
            });
     
    }
});


/*
app.post('/vjezba/:idVjezbe/zadatak"', (req, res) => {
    var sVjezbe = req.params['idVjezbe'];
   // var sZadatak = req.params['sZadatak'];

    if (!sVjezbe|| !sZadatak) {
        var fn = pug.compile('Greska');        
        var html = pug.renderFile('greska.pug', {
            Poruka: "Greska",
            Link: "addVjezba.html"
        });
        res.send(html);
    }

    db.vjezba.findByPk(sVjezbe).then((vjezba) => {

        db.zadatak.findByPk(sZadatak).then((zadatak) => {
            if (vjezba && zadatak) {
                zadatak.addVjezbe(vjezba).then(function () {
                    res.redirect('/addVjezba.html');
                });
            }
        });
    });
});

*/
app.listen(8080);