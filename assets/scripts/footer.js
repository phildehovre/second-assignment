document.addEventListener('DOMContentLoaded', () => {
    const footers = document.querySelectorAll('.footer_placeholder')
    footers.forEach(footer => {
        const footerHTML = `
        <div class="footer_column">
        <h3>Stability</h3>
        <ul>
        <li><a href="#">About us</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Features</a></li>
        <li><a href="#">Get started</a></li>
        </ul>
        </div>
        <div class="footer_column">
        <h3>Legal</h3>
        <ul>
        <li><a href="#">Privacy policy</a></li>
        <li><a href="#">Disclaimer</a></li>
        <li><a href="#">Works for us</a></li>
        </ul>
        </div>
        `
        footer.innerHTML = footerHTML
    })
    });