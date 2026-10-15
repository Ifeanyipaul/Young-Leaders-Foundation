document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       GALLERY REVEAL ANIMATION
    ======================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("show");
        });

    }


    /* ========================================
       GALLERY LIGHTBOX
    ======================================== */

    const galleryItems = document.querySelectorAll(".gallery-item");

    if (!galleryItems.length) {
        return;
    }

    const images = Array.from(galleryItems).map(item => {

        const image = item.querySelector("img");

        return {
            src: image.src,
            alt: image.alt
        };

    });


    /* ========================================
       CREATE LIGHTBOX
    ======================================== */

    const lightbox = document.createElement("div");

    lightbox.className = "gallery-lightbox";

    lightbox.innerHTML = `
        <button
            class="lightbox-close"
            type="button"
            aria-label="Close image"
        >
            <i class="fas fa-xmark"></i>
        </button>

        <button
            class="lightbox-prev"
            type="button"
            aria-label="Previous image"
        >
            <i class="fas fa-chevron-left"></i>
        </button>

        <div class="lightbox-content">

            <img
                class="lightbox-image"
                src=""
                alt=""
            >

            <div class="lightbox-counter"></div>

        </div>

        <button
            class="lightbox-next"
            type="button"
            aria-label="Next image"
        >
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    document.body.appendChild(lightbox);


    /* ========================================
       LIGHTBOX ELEMENTS
    ======================================== */

    const lightboxImage =
        lightbox.querySelector(".lightbox-image");

    const closeButton =
        lightbox.querySelector(".lightbox-close");

    const previousButton =
        lightbox.querySelector(".lightbox-prev");

    const nextButton =
        lightbox.querySelector(".lightbox-next");

    const counter =
        lightbox.querySelector(".lightbox-counter");


    let currentIndex = 0;


    /* ========================================
       SHOW IMAGE
    ======================================== */

    function showImage(index) {

        if (index < 0) {
            index = images.length - 1;
        }

        if (index >= images.length) {
            index = 0;
        }

        currentIndex = index;

        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;

        counter.textContent =
            `${currentIndex + 1} / ${images.length}`;

    }


    /* ========================================
       OPEN LIGHTBOX
    ======================================== */

    function openLightbox(index) {

        showImage(index);

        lightbox.classList.add("active");

        document.body.classList.add("lightbox-open");

        closeButton.focus();

    }


    /* ========================================
       CLOSE LIGHTBOX
    ======================================== */

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.classList.remove("lightbox-open");

    }


    /* ========================================
       NEXT IMAGE
    ======================================== */

    function nextImage() {

        showImage(currentIndex + 1);

    }


    /* ========================================
       PREVIOUS IMAGE
    ======================================== */

    function previousImage() {

        showImage(currentIndex - 1);

    }


    /* ========================================
       GALLERY CLICK
    ======================================== */

    galleryItems.forEach((item, index) => {

        const viewButton =
            item.querySelector(".gallery-view");

        const image =
            item.querySelector("img");


        function openCurrentImage(event) {

            event.preventDefault();

            openLightbox(index);

        }


        if (viewButton) {

            viewButton.addEventListener(
                "click",
                openCurrentImage
            );

        }


        image.addEventListener(
            "click",
            openCurrentImage
        );

    });


    /* ========================================
       BUTTON CONTROLS
    ======================================== */

    closeButton.addEventListener(
        "click",
        closeLightbox
    );

    nextButton.addEventListener(
        "click",
        nextImage
    );

    previousButton.addEventListener(
        "click",
        previousImage
    );


    /* ========================================
       CLICK OUTSIDE IMAGE
    ======================================== */

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    /* ========================================
       KEYBOARD CONTROLS
    ======================================== */

    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("active")) {
            return;
        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowRight") {

            nextImage();

        }


        if (event.key === "ArrowLeft") {

            previousImage();

        }

    });


});