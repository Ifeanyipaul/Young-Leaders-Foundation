// ================================
// MOBILE NAVIGATION
// ================================
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    // Change hamburger to X
    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

        menuToggle.setAttribute("aria-label", "Close navigation menu");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
});



// ================================
// CLOSE MENU WHEN LINK IS CLICKED
// ================================
const navLinks = document.querySelectorAll(".nav-link, .donate-btn");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });

});

// ========================================
// ACTIVE NAVBAR LINK
// ========================================

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(link => {

    const linkPage = link.getAttribute("href");

    // Remove active from every link first
    link.classList.remove("active");

    // Add active only to the current page
    if (linkPage === currentPage) {
        link.classList.add("active");
    }

});


// ================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// ================================

document.addEventListener("click", (event) => {

    const clickedInsideNavbar = event.target.closest(".navbar");

    if (!clickedInsideNavbar && navMenu.classList.contains("active")) {

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

});

// ================================
// HERO SLIDER
// ================================

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");

let currentSlide = 0;
let heroInterval;


// Change slide

function showHeroSlide(index) {

    heroSlides.forEach(slide => {
        slide.classList.remove("active");
    });

    heroDots.forEach(dot => {
        dot.classList.remove("active");
    });

    heroSlides[index].classList.add("active");
    heroDots[index].classList.add("active");

    currentSlide = index;
}


// Automatic slider

function startHeroSlider() {

    heroInterval = setInterval(() => {

        let nextSlide = currentSlide + 1;

        if (nextSlide >= heroSlides.length) {
            nextSlide = 0;
        }

        showHeroSlide(nextSlide);

    }, 6000);

}


// Dot navigation

heroDots.forEach(dot => {

    dot.addEventListener("click", () => {

        const slideIndex = Number(dot.dataset.slide);

        showHeroSlide(slideIndex);

        // Restart timer after manual selection
        clearInterval(heroInterval);

        startHeroSlider();

    });

});
// Start slider
if (heroSlides.length > 0) {
    startHeroSlider();
}

// ================================
// SCROLL REVEAL ANIMATION
// ================================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);
revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ================================
// IMPACT COUNTERS
// ================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const duration = 1800;

            const increment = target / (duration / 16);

            function updateCounter() {

                current += increment;

                if (current < target) {

                    counter.textContent =
                        Math.floor(current).toLocaleString();

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent =
                        target.toLocaleString();

                }
            }

            updateCounter();

            observer.unobserve(counter);
        });

    },
    {
        threshold: 0.5
    }
);
counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* ================================
   TESTIMONIAL SLIDER
================================= */

const testimonialCards =
    document.querySelectorAll(".testimonial-card");

const testimonialDots =
    document.querySelectorAll(".testimonial-dot");

const testimonialPrev =
    document.querySelector(".testimonial-prev");

const testimonialNext =
    document.querySelector(".testimonial-next");

let currentTestimonial = 0;
let testimonialInterval;


function showTestimonial(index) {

    testimonialCards.forEach(card => {
        card.classList.remove("active");
    });

    testimonialDots.forEach(dot => {
        dot.classList.remove("active");
    });

    testimonialCards[index].classList.add("active");
    testimonialDots[index].classList.add("active");

    currentTestimonial = index;
}
function nextTestimonial() {

    let next = currentTestimonial + 1;

    if (next >= testimonialCards.length) {
        next = 0;
    }

    showTestimonial(next);
}
function previousTestimonial() {

    let previous = currentTestimonial - 1;

    if (previous < 0) {
        previous = testimonialCards.length - 1;
    }

    showTestimonial(previous);
}
function startTestimonials() {

    testimonialInterval = setInterval(() => {
        nextTestimonial();
    }, 6000);
}
function resetTestimonials() {

    clearInterval(testimonialInterval);

    startTestimonials();
}
testimonialNext?.addEventListener("click", () => {

    nextTestimonial();
    resetTestimonials();

});
testimonialPrev?.addEventListener("click", () => {

    previousTestimonial();
    resetTestimonials();

});
testimonialDots.forEach(dot => {

    dot.addEventListener("click", () => {

        const index =
            Number(dot.dataset.testimonial);

        showTestimonial(index);

        resetTestimonials();

    });

});
if (testimonialCards.length > 0) {
    startTestimonials();
}

/* ================================
   FAQ ACCORDION
================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");


        // Close all other FAQ items

        faqItems.forEach(otherItem => {

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherItem.classList.remove("active");

            otherAnswer.style.maxHeight = null;

        });


        // Open clicked item

        if (!isActive) {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});