$(document).ready(() => {
    let prijavljenUporabnik = JSON.parse(sessionStorage.getItem("prijavljenUporabnik"));

    if(prijavljenUporabnik != null && prijavljenUporabnik != "" && prijavljenUporabnik != undefined && prijavljenUporabnik.admin == "true") {
        $('.admin').show();
    } else {
        $('.admin').hide();
    }
});