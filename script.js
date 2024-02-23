document.addEventListener('DOMContentLoaded', function() {

    let nav = document.querySelector('.nav--main');

    console.log(nav);

    setTimeout(function() {
        nav.classList.add('nav--show');
    }, 1000);

})