var kosarica = new Array();

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

function generirajTabelo() {
    kosarica = JSON.parse(localStorage.getItem("kosarica"));

    //Create a HTML Table element.
    const table = document.createElement("TABLE");

    //Add the header row.
    var row = table.insertRow(-1);
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "Izdelelk";
    row.appendChild(headerCell);

    // TO DO

    console.log(kosarica);

    //Add the data rows.
    for (var i = 0; i < kosarica.length; i++) {
        console.log("sem tukaj");
        row = table.insertRow(-1);
        var cell = row.insertCell(-1);
        cell.innerHTML = kosarica[i].izdelek;

        // TO DO
    }

    const dvTable = document.getElementById("table");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
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