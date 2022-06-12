var kosarica = new Array();
var izdelki = new Array();
var artikli = new Array();
var stevilo = 2;

localStorage.setItem("kosarica", "[]");
localStorage.setItem("prijavljenUporabnik", "[]");
sessionStorage.setItem("skladisce", "[]");

function validate() {
    const ime = document.forms["myForm"]["ime"].value;
    const priimek = document.forms["myForm"]["priimek"].value;

    const geslo = document.forms["myForm"]["geslo"].value;
    const geslo1 = document.forms["myForm"]["geslo1"].value;
    if (ime == "" && ime.length < 3) {
        
        
        return false;
    }

    if (priimek == "") {
        alert("Prosimo, vpišite priimek");
        return false;
    }

    if ((geslo == "" || geslo1 == "") && geslo.length < 5) {
        alert("Geslo ni ustrezno. Geslo mora vsebovati najmanj 5 znakov.");
        return false;
    } else {
        if (geslo != geslo1) {
            alert("Gesli se ne ujemata");
            return false;
        }
    }

    document.getElementById("vnosIme").value = "";
    document.getElementById("vnosPriimek").value = "";
    document.getElementById("vnosGeslo1").value = "";
    document.getElementById("vnosGeslo2").value = "";
    $('input[type="radio"][name="spol"]').prop('checked', false);
    $('input[type="checkbox"]').prop('checked', false);
    document.getElementById("vnosKraj").value = "MB";

    try {
        $('#uspesnoR').modal({
            backdrop: 'static',
            keyboard: false
        });
    } catch(err) {
        alert(err);
    } 

    return false;

}

function dodaj(izdelek, cena, kolicina, popust) {
    const produkt = new Object();
    produkt.id = generirajId();
    produkt.izdelek = izdelek;
    produkt.cena = cena;
    produkt.kolicina = kolicina;
    produkt.popust = popust;

    let kosara = JSON.parse(localStorage.getItem("kosarica"));

    let niVTabeli = true;

    kosara.forEach((element, index) => {
        if(element.oznaka == izdelek.oznaka) {
            kosara[index].kolicina++;
            niVTabeli = false;
        }
    });

    if(niVTabeli) {

        kosarica.push(produkt);
        localStorage.setItem("kosarica", JSON.stringify(kosarica));
    }


    console.log(kosarica);

}

function generirajId() {
    const newId = kosarica.length + 1;

    return newId;
}

function odstraniIzdelek(oznaka) {
    kosara = JSON.parse(sessionStorage.getItem("kosarica"));

    kosara.forEach((izdelek, index) => {
        if(izdelek.oznaka == oznaka) {
            kosara.splice(index, 1);
            document.getElementById("obvestiloKosarica").innerHTML = "Izdelek " + izdelek.ime + " je bil odstranjen iz kosarice";
        }
    });

    sessionStorage.setItem("kosarica", JSON.stringify(kosara));
    izracunajCeno();
    generirajTabelo();
}

function generirajTabelo() {
    kosara = JSON.parse(sessionStorage.getItem("kosarica"));

    let izdelkiTabela = document.getElementById("kosaricaTable");
    izdelkiTabela.innerHTML = "";
    let celica = null;

    if(kosara.length == 0) {
        izdelkiTabela.innerHTML = "Vaša košarica je prazna. Prosimo, da dodate izdelke v košarico.";
    } else {
        kosara.forEach(izdelek => {
            let vrstica = izdelkiTabela.insertRow(izdelkiTabela.rows.length);

            celica = vrstica.insertCell(0);
            celica.innerHTML = izdelek.ime;

            celica = vrstica.insertCell(1);
            celica.innerHTML = izdelek.opis;
            
            celica = vrstica.insertCell(2);
            celica.innerHTML = izdelek.kolicina;

            celica = vrstica.insertCell(3);
            celica.innerHTML = izdelek.popust + " %";

            celica = vrstica.insertCell(4);
            celica.innerHTML = izdelek.cena + " €";

            celica = vrstica.insertCell(5);
            let dodajKolicina = document.createElement('button');
            dodajKolicina.setAttribute('onclick', "pristejKolicina('" + izdelek.oznaka + "')");
            dodajKolicina.setAttribute("class", "btn btn-success");
            dodajKolicina.appendChild(document.createTextNode("+"));
            celica.appendChild(dodajKolicina);

            celica = vrstica.insertCell(6);
            let zmanjsajKolicina = document.createElement('button');
            zmanjsajKolicina.setAttribute('onclick', "odstejKolicina('" + izdelek.oznaka + "')");
            zmanjsajKolicina.setAttribute("class", "btn btn-danger");
            zmanjsajKolicina.appendChild(document.createTextNode("-"));
            celica.appendChild(zmanjsajKolicina);

            celica = vrstica.insertCell(7);
            let gumb = document.createElement('button');
            gumb.setAttribute("onclick", "odstraniIzdelek('" + izdelek.oznaka + "')");
            gumb.setAttribute("class", "btn btn-info");
            gumb.appendChild(document.createTextNode("Odstrani izdelek iz košarice"));
            celica.appendChild(gumb);

            stevilo++;
        });
        izracunajCeno(1, 1, 1);
    }
}

function pristejKolicina(oznaka) {
    let kosarica = JSON.parse(sessionStorage.getItem("kosarica"));

    kosarica.forEach((kosara, index)=> {
        if(kosara.oznaka == oznaka) {
            kosarica[index].kolicina++;
        }
    });

    sessionStorage.setItem("kosarica", JSON.stringify(kosarica));
    generirajTabelo();
}

function odstejKolicina(oznaka) {
    let kosarica = JSON.parse(sessionStorage.getItem("kosarica"));

    kosarica.forEach((kosara, index)=> {
        if(kosara.oznaka == oznaka) {
            kosarica[index].kolicina--;
            if(kosarica[index].kolicina == 0) {
                kosarica[index].kolicina = 1;
            }
        }
    });


    sessionStorage.setItem("kosarica", JSON.stringify(kosarica));
    generirajTabelo();
}

function narocninaZnesek() {
    let element = document.getElementById('narocnine');
    let izpis = document.getElementById('znesek');
    let kolicina = document.getElementById('tekstKolicina');
    
    if(element.options[element.selectedIndex].value == 'osnovni') {
        izpis.innerHTML = '0 €';
    } else if(element.options[element.selectedIndex].value == 'zlat') {
        izpis.innerHTML = parseInt(kolicina.value) * 5 + ' €';
    } else if(element.options[element.selectedIndex].value == 'platinum') {
        izpis.innerHTML = parseInt(kolicina.value) * 15 + ' €';
    } else {
        izpis.innerHTML = parseInt(kolicina.value) * 30 + ' €';
    }

    return false;
}



function shraniIzdelek() {
    let ime = document.forms["izdelekForm"]["imeIzdelka"].value;
    let opis = document.forms["izdelekForm"]["opisIzdelka"].value;
    let cena = document.forms["izdelekForm"]["cenaIzdelka"].value;
    let kolicina = document.forms["izdelekForm"]["kolicinaIzdelka"].value;

    let branjeJSON = JSON.parse(sessionStorage.getItem('skladisce'));

    if(typeof ime === "string") {
        if(cena > 0) {
            if(kolicina > 0) {
                if(typeof opis === "string") {
                    branjeJSON.push({oznaka: 'izdelek' + stevilo, ime: ime, opis: opis, kolicina: kolicina, cena: cena});
                    sessionStorage.setItem('skladisce', JSON.stringify(branjeJSON));
                    stevilo++;
                    delovanjeIzdelki();
                    document.getElementById('obvestiloKreiranjeIzdelka').innerHTML = "Izdelek je bil uspesno dodan.";

                    try {
                        $('#uspesnoI').modal({
                            backdrop: 'static',
                            keyboard: false
                        });
                    } catch(err) {
                        alert(err);
                    }
                } else {
                    window.alert("Opis mora biti tipa string ter dolg vsaj 5 znakov!");
                    document.getElementById("opisIzdelka").focus();
                }
            } else {
                window.alert("Kolicina ne sme biti negativna!");
                document.getElementById("kolicinaIzdelka").focus();
            }
        } else {
            window.alert("Cena ne sme biti negativna!");
            document.getElementById("cenaIzdelka").focus();
        }
    } else {
        window.alert("Ime more biti tipa string in dolgo najmanj 3 znake!");
        document.getElementById("imeIzdelka").focus();
    }
}

function dodajArtikel() {
    let ime = document.forms["artikelForm"]["imeArtikla"].value;
    let opis = document.forms["artikelForm"]["opisArtikla"].value;
    let cena = document.forms["artikelForm"]["cenaArtikla"].value;

    if(ime.length > 2 && typeof ime === "string") {
        if(opis.length > 4 && typeof opis === "string") {
            if(cena >= 0 && cena.length != 0) {
                let artikel = {
                    ime: ime,
                    opis: opis,
                    cena: cena
                };
                artikli.push(artikel);

                document.getElementById("imeArtikla").value = "";
                document.getElementById("opisArtikla").value = "";
                document.getElementById("cenaArtikla").value = "";

                try {
                    $('#uspesnoA').modal({
                        backdrop: 'static',
                        keyboard: false
                    });

                } catch(err) {
                    alert(err);
                }
            } else {
                window.alert("Cena izdelka ne sme biti negativna!");
                document.getElementById("cenaArtikla").focus();

                return false;
            }
        } else {
            window.alert("Opis mora imeti vsaj 5 znakov in mora biti tipa string!")
            document.getElementById("opisArtikla").focus();
            return false;
        }
    } else {
        window.alert("Ime mora imeti vsaj 3 znake ter mora biti tipa string!");
        document.getElementById("imeArtikla").focus();
        return false;
    }

    return false;
}

function izdelekKosarica(oznaka) {
    let izdelek = null;
    let branjeIzdelki = JSON.parse(sessionStorage.getItem("skladisce"));

    branjeIzdelki.forEach(product => {
        if(product.oznaka == oznaka) {
            izdelek = product;
            product.kolicina -= 1;
        }
    });

    let kosara = JSON.parse(sessionStorage.getItem("kosarica"));
    console.log('dodajanje izdelka v kosaro');
    console.log(kosara);

    if(kosara != null) {
        if(izdelek != null && Object.keys(kosara).length != 0) {
            let niVtabeli = true;
        
            if(parseInt($("#" + izdelek.oznaka + "kol").val()) <= 0) {
                alert("Količina izdelka ne sme biti enaka ali manjša od 0!");
            } else {
                kosara.forEach((element, index) => {
                    if(element.oznaka == izdelek.oznaka) {
                        kosara[index].kolicina += parseInt($("#" + izdelek.oznaka + "kol").val());
                        niVtabeli = false;
                    }
                });
            
                if(niVtabeli) {
                    izdelek.kolicina = $("#" + izdelek.oznaka + "kol").val();
                    kosara.push(izdelek);
                }
            }

        } else {
            if(parseInt($("#" + izdelek.oznaka + "kol").val()) <= 0) {
                alert("Količina izdelka ne sme biti enaka ali manjša od 0!");
            } else {
                izdelek.kolicina = parseInt($("#" + izdelek.oznaka + "kol").val());
                kosara.push(izdelek);
            }
        }
    }

    
    document.getElementById("obvestiloKreiranjeIzdelka").innerHTML = "Izdelek " + izdelek.ime + " je bil uspešno dodan v košarico.";
    sessionStorage.setItem("kosarica", JSON.stringify(kosara));
    return true;
}

function delovanjeIzdelki() {
    let branjeJSON = JSON.parse(sessionStorage.getItem("skladisce"));

    console.log(branjeJSON);

    let izdelkiTabela = document.getElementById("teloTabele");
    izdelkiTabela.innerHTML = "";
    let stevilo = 0;
    let celica = null;

    branjeJSON.forEach(izdelek => {
        let vrstica = izdelkiTabela.insertRow(izdelkiTabela.rows.length);

        celica = vrstica.insertCell(0);
        celica.innerHTML = izdelek.ime;

        celica = vrstica.insertCell(1);
        celica.innerHTML = izdelek.opis;
        
        celica = vrstica.insertCell(2);
        let kolicinaVnos = document.createElement('input');
        kolicinaVnos.setAttribute('type', 'number');
        kolicinaVnos.setAttribute('id', izdelek.oznaka + 'kol');
        kolicinaVnos.setAttribute('value', 1);
        celica.appendChild(kolicinaVnos);

        celica = vrstica.insertCell(3);
        celica.innerHTML = "<img src='" + izdelek.src + "' style='max-width: 300px; width: 100%; max-height: 300px; height: 100%'>";

        celica = vrstica.insertCell(4);
        celica.innerHTML = izdelek.cena + " €";

        celica = vrstica.insertCell(5);
        let gumb = document.createElement('button');
        gumb.setAttribute("onclick", "izdelekKosarica('izdelek" + stevilo + "')");
        gumb.setAttribute("class", "btn btn-success");
        gumb.appendChild(document.createTextNode("Dodaj izdelek v košarico"));
        celica.appendChild(gumb);

        stevilo++;
    });

    return true;
}

function nastaviKolicino(oznaka, kolicina) {
    let kosara = JSON.parse(sessionStorage.getItem("kosarica"));
    let izdelek = null;
    kosara.forEach((element, index) => {
        if(element.oznaka == oznaka) {
            izdelek = element;
            kosara[index].kolicina = parseInt(kolicina);
        }
    });

    $("#obvestiloKosarica").innerHTML = "Izdelku " + izdelek.ime + "  v košarici ste uspešno spremenili količino na " + kolicina + ".";
    sessionStorage.setItem("kosarica", JSON.stringify(kosara));
}

function izracunajCeno() {
    let kosara = JSON.parse(sessionStorage.getItem("kosarica"));
    let znesek = 0.0;
    let davek = document.getElementById("davek").value;
    let popust = document.getElementById("popust").value;
    let obroki = document.getElementById("obroki").value;

    if(kosara.length == 0) {
        znesek = 0;
    } else {
        kosara.forEach(izdelek => {
            for(let i = 0; i < izdelek.kolicina; i++) {
                znesek += izdelek.cena * ((100 - popust) / 100);
            }
        });
    }

    
    document.getElementById("skupniZnesek").innerHTML = "Skupni znesek: " + ((davek * popust * znesek)/obroki).toFixed(2) + " €";
}

function cas(gumb) {
    if(!gumb) {
        setTimeout(cas(gumb), 500);
    } else {
        return;
    }
}

async function nalaganjeJSON() {
    await nalaganje();
}

async function nalaganje() {
    $.ajax({
        url: 'http://localhost:4002/zaloga',
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        context: document.body,
        success: function(data, status) {
            sessionStorage.setItem('skladisce', JSON.stringify(data));
            delovanjeIzdelki();
        }
    });

    /*
    const odgovor = await fetch('./zaloga.json');
    const podatki = await odgovor.text();
    localStorage.setItem("skladisce", podatki);
    */
}
