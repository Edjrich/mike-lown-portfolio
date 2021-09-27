const hamburger = document.getElementById('hamburger');
const navUL = document.getElementById('ham-ul')
const navLogo = document.getElementById('nav-logo')

hamburger.addEventListener('click', () => {
    navUL.classList.toggle('show');
    hamburger.classList.toggle('active')
    navLogo.classList.toggle('hide')
});