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
        },
        error: function(xhr, status, error) {
            alert("Error: nakup ni bil uspešen!");
        }
    });
};