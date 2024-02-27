document.addEventListener('DOMContentLoaded', function() {

    let nav = document.querySelector('.nav--main');

    console.log(nav);

    if (nav !== null) {
        setTimeout(function() {
            nav.classList.add('nav--show');
        }, 1000);
    }

    const hamburger = document.querySelector('.hamburger_ctn');
    
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            console.log('hamburger',hamburger.classList);
            if (hamburger.classList.contains('active')) {
                hamburger.classList.toggle('animate-in');
                hamburger.classList.toggle('animate-out');
                setTimeout(function() {
                    hamburger.classList.toggle('active');
                    hamburger.classList.toggle('animate-out');
                }, 500)
            }
            if (!hamburger.classList.contains('active')) {
                hamburger.classList.toggle('active');
                hamburger.classList.toggle('animate-in');
            } 
            console.log('hamburger',hamburger.classList);
        })
    }
})




// console.log('hamburger',hamburger);