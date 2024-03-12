document.addEventListener("DOMContentLoaded", () => {
    let navbar = `        <nav class="nav--main">
    <a href="/">
        <div id="logo_placeholder"></div>
    </a>
    <ul id="main_nav">
        <li class="nav_link"><a href="/">Home</a></li>
        <li class="nav_link"><a href="about.html">About</a></li>
        <li class="nav_link"><a href="contact.html">Contact</a></li>
    </ul>
    <ul id="mobile_nav">
        <div class="hamburger_ctn">
            <div class="bar top"></div>
            <div class="bar center"></div>
            <div class="bar bottom"></div>
            <div class="hamburger_content">
                <li style="--order: 1" class="cta">
                    <a href="today.html">
                    Start your journey</a><i class="fas fa-arrow-right"></i></li>
                </a></li>
                <li style="--order: 2"><a href="/">Home</a></li>
                <li style="--order: 3"><a href="">Features</a></li>
                <li style="--order: 4"><a href="about.html">About</a></li>
                <li style="--order: 5"><a href="contact.html">Contact</a></li>
            </div>
        </div>
    </ul>
</nav>`
    let navContainers = document.querySelectorAll('.nav-placeholder')
    navContainers.forEach(container => {
        container.innerHTML = navbar
    })
})