document.addEventListener("DOMContentLoaded", () => {
    let navbar = `        
    <nav class="nav_main">
        <a href="/" aria-label="Logo, Navigate to home">
            <div id="logo_placeholder"></div>
        </a>
        <ul id="desktop_nav">
            <div id="follower"></div>
        </ul>

        <div id="mobile_nav">
            <div class="hamburger_ctn">
                <div class="bar top"></div>
                <div class="bar center"></div>
                <div class="bar bottom"></div>
                <ul class="hamburger_content">
                    <li style="--order: 1">
                        <a href="phwirdle.html">
                        Play</a><i class="fas fa-arrow-right"></i>
                    </a></li>
                    <li style="--order: 2"><a href="/">Home</a></li>
                    <li style="--order: 3"><a href="">Features</a></li>
                    <li style="--order: 4"><a href="about.html">About</a></li>
                    <li style="--order: 5"><a href="https://www.philippedehovre.com/#contact" target="_blank">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
`

    let navContainers = document.querySelectorAll('.nav_placeholder')
    navContainers.forEach(container => {
        container.innerHTML = navbar
    })
})

const navButtons = [
    {name: "Home", link: "/"},
    {name: "About", link: "about.html"},
    {name: "Contact", link: "https://www.philippedehovre.com/#contact"},
    {name: "Play", link: "/"},
    // {name: "Playground", link: "/playground.html"},

]


document.addEventListener('DOMContentLoaded', () => {
    const follower = document.querySelector('#follower')
    follower.style = `
    opacity: 0;
    `
  const list = document.querySelector("#desktop_nav")
  list.addEventListener("mouseenter", () => {
    follower.style = `opacity: 1;`
  })
  list.addEventListener("mouseleave", () => {
    follower.style = `
    opacity: 0; 
    transition: all 0.5s ease-in-out;`
  })
  navButtons.forEach((button, index) => {
    let item = document.createElement('li')
    item.classList.add('nav_link')
    item.id = (`index-${index}`)

    let link = document.createElement('a')
    link.textContent = button.name
    link.href = button.link

    item.appendChild(link)
    
    item.addEventListener("mouseenter", () => {
      let percentage = Number(index * 100)
      follower.style = `transform: translateX(${percentage}%)`
    })
    list.appendChild(item)
    
  });
})

document.addEventListener('scroll', () => {
    let nav = document.querySelector('.nav_main')
    if (window.scrollY > 1) {
        nav.style = `transition: all 0.5s ease-in-out;`
        nav.classList.add('scrolled')
    } else {
        nav.classList.remove('scrolled')
    }
})
