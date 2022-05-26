$(document).ready(() => {
    $('#formPrijava').submit(event => {

        event.preventDefault();

        let uporabnisko = $('#prijavaUporabnisko').val();
        let geslo = $("#prijavaGeslo").val();

        let uporabnik = {  "username": uporabnisko, "password": geslo}; 

        uporabnik = JSON.stringify(uporabnik);

        let parsanje = JSON.parse(uporabnik);

        $('#prijavaUporabnisko').val('');
        $('#prijavaGeslo').val('');

        posiljanjeObrazca(parsanje);
    });
});

posiljanjeObrazca = (file) => {
    $.ajax({
        url: 'http://localhost:4002/prijava',
        type: 'POST',
        dataType: 'json',
        data: file,
        crossDomain: true,
        context: document.body,
        success: function(data, status) {
            console.log("deluje");
            sessionStorage.setItem("prijavljenUporabnik", JSON.stringify(data));
        },
        error: function(xhr, status, error) {
            alert("Error: " + xhr.status + ":" + xhr.statusText + " | Uporabnik v bazi ne obstaja!");
        }
    });
};