$(document).ready(() => {
    $('#nakupIzdelkov').click(() => {

        let uporabnik = JSON.parse(sessionStorage.getItem("prijavljenUporabnik"));

        let stevilka = uporabnik.id;

        let nakupi = JSON.parse(sessionStorage.getItem("kosarica"));


        let znesek = $('#skupniZnesek').text();
        const znesekRazreze = znesek.split(' ');


        let nakup = { "id": stevilka, "nakupi": JSON.stringify(nakupi), "znesek": parseFloat(znesekRazreze[2])};

        nakup = JSON.parse(JSON.stringify(nakup));

        console.log(nakup);

        izvrsitevNakupa(nakup);
    });
});

izvrsitevNakupa = (nakup) => {
    $.ajax({
        url: 'http://localhost:4002/nakup',
        type: 'POST',
        data: nakup,
        dataType: 'json',
        crossDomain: true,
        context: document.body,
        success: function(data, status) {
            $("#obvestiloKosarica").text("Nakup je bil uspešno izveden!");
            sessionStorage.setItem("kosarica", "[]");
            generirajTabelo();
            izracunajCeno();
        },
        error: function(xhr, status, error) {
            alert("Error: nakup ni bil uspešen!");
        }
    });
};

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