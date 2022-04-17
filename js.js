var kosarica = new Array();
var izdelki = new Array();
var kosarica = new Array();
var artikli = new Array();
var stevilo = 2;

izdelki.push({
    oznaka: 'izdelek0',
    ime: 'Nizkobeljakovinske testenine',
    opis: 'Testenine z nizko vsebnostjo beljakovin',
    kolicina: 30,
    cena: 3.5
});

izdelki.push({
    oznaka: 'izdelek1',
    ime: 'Nizkobeljakovinski kruh',
    opis: 'Kruh z nizko vsebnostjo beljakovin',
    kolicina: 25,
    cena: 2.6
});

izdelki.push({
    oznaka: 'izdelek2',
    ime: 'Nizkobeljakovinski keksi',
    opis: 'Keksi z nizko vsebnostjo beljakovin',
    kolicina: 15,
    cena: 3.2
});

izdelki.push({
    oznaka: 'izdelek3',
    ime: 'Brezglutenski kruh',
    opis: 'Kruh brez glutena',
    kolicina: 40,
    cena: 2.1
});

izdelki.push({
    oznaka: 'izdelek4',
    ime: 'Nizkobeljakovinska pizza',
    opis: 'Pizza z nizko vsebnostjo beljakovin',
    kolicina: 10,
    cena: 5.8
});

izdelki.push({
    oznaka: 'izdelek5',
    ime: 'Brezglutenske prestice',
    opis: 'Prestice brez glutena',
    kolicina: 25,
    cena: 1.9
});

izdelki.push({
    oznaka: 'izdelek6',
    ime: 'Nizkobeljakovinska moka',
    opis: 'Moka z nizko vsebnostjo beljakovin',
    kolicina: 66,
    cena: 3.1
});

izdelki.push({
    oznaka: 'izdelek7',
    ime: 'Nizkobeljakovinski špageti',
    opis: 'Špageti z nizko vsebnostjo beljakovin',
    kolicina: 39,
    cena: 3.4
});

function validate() {
    const ime = document.forms["myForm"]["ime"].value;
    const priimek = document.forms["myForm"]["priimek"].value;

    const geslo = document.forms["myForm"]["geslo"].value;
    const geslo1 = document.forms["myForm"]["geslo1"].value;
    if (ime == "" && ime.length < 3) {
        alert("Prosimo, vpišite ime");
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

    return true;
}

function dodaj(izdelek, cena, kolicina, popust) {
    const produkt = new Object();
    produkt.id = generirajId();
    produkt.izdelek = izdelek;
    produkt.cena = cena;
    produkt.kolicina = kolicina;
    produkt.popust = popust;

    kosarica.push(produkt);

    console.log(kosarica);

    localStorage.setItem("kosarica", JSON.stringify(kosarica));
}

function generirajId() {
    const newId = kosarica.length + 1;

    return newId;
}

function odstraniIzdelek(oznaka) {
    kosarica = JSON.parse(localStorage.getItem("kosarica"));
    let stevilo = 0;

    kosarica.forEach(izdelek => {
        if(izdelek.oznaka == oznaka) {
            kosarica.splice(stevilo, 1);
            document.getElementById("obvestiloKosarica").innerHTML = "Izdelek " + izdelek.ime + " je bil odstranjen iz kosarice";
        }
        stevilo++;
    });

    localStorage.setItem("kosarica", JSON.stringify(kosarica));
    generirajTabelo();
}

function generirajTabelo() {
    kosarica = JSON.parse(localStorage.getItem("kosarica"));

    let izdelkiTabela = document.getElementById("kosaricaTable");
    izdelkiTabela.innerHTML = "";
    let celica = null;

    if(kosarica.length == 0) {
        izdelkiTabela.innerHTML = "Vaša košarica je prazna. Prosimo, da dodate izdelke v košarico.";
    } else {
        kosarica.forEach(izdelek => {
            let vrstica = izdelkiTabela.insertRow(izdelkiTabela.rows.length);

            celica = vrstica.insertCell(0);
            celica.innerHTML = izdelek.ime;

            celica = vrstica.insertCell(1);
            celica.innerHTML = izdelek.opis;
            
            celica = vrstica.insertCell(2);
            celica.innerHTML = izdelek.kolicina;

            celica = vrstica.insertCell(3);
            celica.innerHTML = izdelek.cena + " €";

            celica = vrstica.insertCell(4);
            let gumb = document.createElement('button');
            gumb.setAttribute("onclick", "odstraniIzdelek('" + izdelek.oznaka + "')");
            gumb.appendChild(document.createTextNode("Odstrani izdelek iz košarice"));
            celica.appendChild(gumb);

            stevilo++;
        });
        izracunajCeno(1, 1, 1);
    }
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

    if(typeof ime === "string") {
        if(cena > 0) {
            if(kolicina > 0) {
                if(typeof opis === "string") {
                    izdelki.push({oznaka: 'izdelek' + stevilo, ime: ime, opis: opis, kolicina: kolicina, cena: cena});
                    stevilo++;
                    delovanjeIzdelki();
                    document.getElementById('obvestiloKreiranjeIzdelka').innerHTML = "Izdelek je bil uspesno dodan.";
                } else {
                    alert("Opis mora biti tipa string ter dolg vsaj 5 znakov!");
                }
            } else {
                alert("Kolicina ne sme biti negativna!");
            }
        } else {
            alert("Cena ne sme biti negativna!");
        }
    } else {
        alert("Ime more biti tipa string in dolgo najmanj 3 znake!");
    }
}

function dodajArtikel() {
    let ime = document.forms["artikelForm"]["imeArtikla"].value;
    let opis = document.forms["artikelForm"]["opisArtikla"].value;
    let cena = document.forms["artikelForm"]["cenaArtikla"].value;

    if(ime.length > 2 && typeof ime === "string") {
        if(opis.length > 4 && typeof opis === "string") {
            if(cena >= 0) {
                let artikel = {
                    ime: ime,
                    opis: opis,
                    cena: cena
                };
                artikli.push(artikel);
                alert("Dodan artikel " + ime);
            } else {
                alert("Cena ne sme biti negativna ter mora biti tipa number!");
            }
        } else {
            alert("Opis mora imeti vsaj 5 znakov in mora biti tipa string!")
        }
    } else {
        alert("Ime mora imeti vsaj 3 znake ter mora biti tipa string!");
    }

    return true;
}

function izdelekKosarica(oznaka) {
    let izdelek = null;

    izdelki.forEach(product => {
        if(product.oznaka == oznaka) {
            izdelek = product;
            product.kolicina -= 1;
        }
    });

    if(izdelek != null) {
        kosarica.push(izdelek);
        document.getElementById("obvestiloKreiranjeIzdelka").innerHTML = "Izdelek " + izdelek.ime + " je bil uspešno dodan v košarico.";
    }
    localStorage.setItem("kosarica", JSON.stringify(kosarica));
    return false;
}

function delovanjeIzdelki() {
    let izdelkiTabela = document.getElementById("teloTabele");
    izdelkiTabela.innerHTML = "";
    let stevilo = 0;
    let celica = null;

    izdelki.forEach(izdelek => {
        let vrstica = izdelkiTabela.insertRow(izdelkiTabela.rows.length);

        celica = vrstica.insertCell(0);
        celica.innerHTML = izdelek.ime;

        celica = vrstica.insertCell(1);
        celica.innerHTML = izdelek.opis;
        
        celica = vrstica.insertCell(2);
        celica.innerHTML = izdelek.kolicina;

        celica = vrstica.insertCell(3);
        celica.innerHTML = izdelek.cena + " €";

        celica = vrstica.insertCell(4);
        let gumb = document.createElement('button');
        gumb.setAttribute("onclick", "izdelekKosarica('izdelek" + stevilo + "')");
        gumb.appendChild(document.createTextNode("Dodaj izdelek v košarico"));
        celica.appendChild(gumb);

        stevilo++;
    });
}

function izracunajCeno() {
    kosarica = JSON.parse(localStorage.getItem("kosarica"));
    let znesek = 0.0;
    let davek = document.getElementById("davek").value;
    let popust = document.getElementById("popust").value;
    let obroki = document.getElementById("obroki").value;

    if(kosarica.length == 0) {
        znesek = 0;
    } else {
        kosarica.forEach(izdelek => {
            znesek += izdelek.cena;
        });
    }
    
    document.getElementById("skupniZnesek").innerHTML = "Skupni znesek: " + ((davek * popust * znesek)/obroki).toFixed(2) + " €";
}

