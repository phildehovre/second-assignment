if (hamburger) {
    hamburger.addEventListener('click', function(e) {
        if (!hamburger.classList.contains('active')) {
            hamburger.classList.toggle('active');
            hamburger.classList.toggle('animate-in');
        } else {
            hamburger.classList.toggle('animate-in');
            hamburger.classList.toggle('animate-out');
            setTimeout(function() {
                hamburger.classList.toggle('active');
                hamburger.classList.toggle('animate-out');
            }, 1000)
        }
    })
}