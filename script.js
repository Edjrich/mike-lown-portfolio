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
    const typewriterArray = ["a UX/UI Designer", "a Storyteller", "He/Him", "a Start-Up Enthusiast", "a UX Copywriter", "a Brit living in Canada", "a Drummer", "always good for a Simpsons quote", "occasionally a Gnome Bard", "likely to bring donuts"];
    let i = 0
    let j = 0;
    let currentPhrase = []
    let isDeleting = false
    let isEnd = false

    function loop () {
        isEnd = false
        textDisplay.innerHTML = currentPhrase.join("");

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

app.carousel = function () {
    const track = document.querySelector('.carousel__track')
    const slides = Array.from(track.children);
    const nextButton =  document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');
    const dotsNav = document.querySelector('.carousel__nav')
    const dots = Array.from(dotsNav.children)

    const slideWidth = slides[0].getBoundingClientRect().width;
    // console.log(slideWidth)


    // arrange the slides next to one another
    // slides[0].style.left = slideWidth * 0 + "px";
    // slides[1].style.left = slideWidth * 1 + "px";
    // slides[1].style.left = slideWidth * 2 + "px";

    const setSlidePosition = function (slide, index) {
        slide.style.left = slideWidth * index + "px";
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = function (track, currentSlide, targetSlide) {
        track.style.transform = "translateX(-" + targetSlide.style.left + ")";
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    const updateDots = function (currentDot, targetDot) {
        currentDot.classList.remove("current-slide");
        targetDot.classList.add("current-slide");
    }

    const hideShowArrows = function (slides, prevButton, nextButton, targetIndex) {
        if (targetIndex === 0) {
            prevButton.classList.add("is-hidden");
            nextButton.classList.remove("is-hidden");
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove("is-hidden");
            nextButton.classList.add("is-hidden");
        } else {
            prevButton.classList.remove("is-hidden");
            nextButton.classList.remove("is-hidden")
        }
    }

    // when I click left, move slides to the left
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector(".current-slide");
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        moveToSlide(track, currentSlide, prevSlide)
        updateDots(currentDot, prevDot);
        hideShowArrows(slides, prevButton, nextButton, prevIndex);

    })

    // when I click right, move the slides to the right
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector(".current-slide");
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);
        // move to the next slide
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
    })

    // when I click the nav indicators, move to that slide
    dotsNav.addEventListener('click', e => {
        // what indicator was clicked on?
        const targetDot = e.target.closest('button');

        if(!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);
    })
}

app.init = function() {
    app.hamburger_menu();
    app.typingEffect();
    app.carousel();
}

app.init();