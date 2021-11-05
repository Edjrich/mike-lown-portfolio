const app = {}

app.hamburger_menu = function () {
    const hamburger = document.getElementById('hamburger');
    const navUL = document.getElementById('ham-ul')
    const navLogo = document.getElementById('nav-logo')
    
    hamburger.addEventListener('click', () => {
        navUL.classList.toggle('show');
        hamburger.classList.toggle('active')
        navLogo.classList.toggle('hide')
    });
}

app.typingEffect = function () {
    const textDisplay = document.getElementById("typewriter-text");
    const typewriterArray = ["UX/UI Designer", "Drummer", "Guy Who really likes FOOTY", "Friend of Eric", "NEEEERRRDDDD"];
    let i = 0
    let j = 0;
    let currentPhrase = []
    let isDeleting = false
    let isEnd = false

    function loop () {
        isEnd = false
        textDisplay.innerHTML = currentPhrase.join("");
        // textDisplay.innerHTML = currentPhrase.join("") + "<span>|</span>";

        if (i < typewriterArray.length) {

            if (!isDeleting && j <= typewriterArray[i].length) {
                currentPhrase.push(typewriterArray[i][j])
                j++
                textDisplay.innerHTML = currentPhrase.join("")
            }

            if (isDeleting && j <= typewriterArray[i].length) {
                currentPhrase.pop(typewriterArray[i][j])
                j--
            }

            if (j == typewriterArray[i].length) {
                isEnd = true
                isDeleting = true
            }

            if (isDeleting && j === 0) {
                currentPhrase = []
                isDeleting = false
                i++
                if (i== typewriterArray.length) {
                    i = 0
                }
            }
        }
        const spedUp = Math.random() * (50 -30) + 30
        const normalSpeed = Math.random() * (200 -100) + 100
        const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed
        setTimeout(loop, time)
    }

    loop();
}

app.init = function() {
    app.hamburger_menu();
    // app.typewriterText();
    app.typingEffect();
}

app.init();