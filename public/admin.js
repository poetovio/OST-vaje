$(document).ready(() => {
    let prijavljenUporabnik = JSON.parse(sessionStorage.getItem("prijavljenUporabnik"));

    if(prijavljenUporabnik.admin == "true") {
        $('.admin').show();
    } else {
        $('.admin').hide();
    }
});