const hamburger = document.getElementById('hamburger');
const navUL = document.getElementById('ham-ul')

hamburger.addEventListener('click', () => {
    navUL.classList.toggle('show');
    hamburger.classList.toggle('active')
});