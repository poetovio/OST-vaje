$(document).ready(() => {
    let prijavljenUporabnik = JSON.parse(sessionStorage.getItem("prijavljenUporabnik"));

    if(prijavljenUporabnik.admin == "true" && prijavljenUporabnik.id != null) {
        $('.admin').show();
    } else {
        $('.admin').hide();
    }
});