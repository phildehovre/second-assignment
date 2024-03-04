// init
document.addEventListener('DOMContentLoaded', function() {

    // desktop nav animation
    let nav = document.querySelector('.nav--main');
    if (nav !== null) {
        setTimeout(function() {
            nav?.classList.add('nav--show');
        }, 1000);
    }

    // Hamburger menu class toggling for mobile animation
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

document.addEventListener('DOMContentLoaded', () => {
    const navMain = document.querySelector('.nav--main');
console.log("main:", navMain)
    const navPlaceholders = document.querySelectorAll('.nav-placeholder');
    console.log(navPlaceholders)
    if (navMain) {
        navPlaceholders.forEach((placeholder) => {
            placeholder.appendChild(navMain);
        });
    }
})
document.addEventListener('DOMContentLoaded', () => {
    let features = document.querySelectorAll(".feature")
    features.forEach((feature) => {
        feature.addEventListener("click", (e) => {
            feature.classList.toggle("feature--active")
        })
    })
})
// Insert navigation bar into placeholders