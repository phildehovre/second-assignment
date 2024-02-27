document.addEventListener('DOMContentLoaded', function() {

    let nav = document.querySelector('.nav--main');

    console.log(nav);

    setTimeout(function() {
        nav.classList.add('nav--show');
    }, 1000);

    const hamburger = document.querySelector('.hamburger_ctn');
    
    if (hamburger) {

        hamburger.addEventListener('click', function(e) {
            hamburger.classList.toggle('active');
        })
        
        window.addEventListener('click', (e) => {
            if (!e.target.classList.contains('hamburger_ctn--active') || e.target.classList.contains('bar')) {
                hamburger.classList.remove('hamburger_ctn--active');
            }
        })
    }
})




// console.log('hamburger',hamburger);