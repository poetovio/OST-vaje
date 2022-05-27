$(document).ready(() => {
    $('#nakupIzdelkov').click(() => {

        let uporabnik = JSON.parse(sessionStorage.getItem("prijavljenUporabnik"));

        let stevilka = uporabnik.id;

        let nakupi = JSON.parse(sessionStorage.getItem("kosarica"));


        let znesek = $('#skupniZnesek').text();
        const znesekRazreze = znesek.split(' ');

        let datumNakupa =  new Date(Date.now());

        let nakup = { "id": stevilka, "nakupi": nakupi, "znesek": parseFloat(znesekRazreze[2]), "datumNakupa": datumNakupa };

        nakup = JSON.parse(JSON.stringify(nakup));

        izvrsitevNakupa(nakup);
    });
});

izvrsitevNakupa = (nakup) => {
    $.ajax({
        url: 'http://localhost:4002/nakup',
        type: 'POST',
        dataType: 'json',
        data: nakup,
        crossDomain: true,
        context: document.body,
        success: function(data, status) {
            $("#obvestiloKosarica").text("Nakup je bil uspešno izveden!");
        },
        error: function(xhr, status, error) {
            alert("Error: nakup ni bil uspešen!");
        }
    });
};