document.addEventListener("DOMContentLoaded", () => {
    let navbar = `        
    <nav class="nav--main">
        <a href="/">
            <div id="logo_placeholder"></div>
        </a>
        <ul id="desktop_nav">
            <div id="follower"></div>
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

const navButtons = [
    {name: "Home", link: "/"},
    {name: "About", link: "about.html"},
    {name: "Contact", link: "contact.html"},
    {name: "Start your journey", link: "today.html"},

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
    item.classList.add('nav-link')
    item.id = (`index-${index}`)

    let link = document.createElement('a')
    link.textContent = button.name
    link.href = button.link

    item.appendChild(link)
    
    item.addEventListener("mouseenter", () => {
      let percentage = Number(index * 100)
      follower.style = `transform: translateX(${percentage}%)`
    })
    console.log(item)
    list.appendChild(item)
    
  });
})

