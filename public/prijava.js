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
        url: 'http://localhost:4002/prijava/' + file.username + '/' + file.password,
        type: 'POST',
        crossDomain: true,
        context: document.body,
        success: function(data, status) {
            sessionStorage.setItem("prijavljenUporabnik", JSON.stringify(data));
            alert('Uspešno ste se prijavili!');
        },
        error: function(xhr, status, error) {
            alert("Error: " + xhr.status + ":" + xhr.statusText + " | Uporabnik v bazi ne obstaja!");
        }
    });
};