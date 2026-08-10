document.addEventListener("DOMContentLoaded", () => {
    const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
    const heroDots = document.querySelector(".hero-dots");
    const heroControls = document.querySelector(".hero-slider-controls");
    const heroSection = document.querySelector(".hero-home");

    if (heroSlides.length) {
        const slideImages = [
            { src: "images/hero/hero-tech.png", alt: "KYVORA Premium Tech" },
            { src: "images/hero/hero-gaming.png", alt: "Gaming Collection" },
            { src: "images/hero/hero-smart.png", alt: "Smart Devices" },
            { src: "images/hero/hero-audio.png", alt: "Premium Audio" },
            { src: "images/hero/hero-work.png", alt: "Creative Work Setup" }
        ];

        heroSlides.forEach((slide, index) => {
            const image = slide.querySelector("img");

            if (image) {
                image.src = slideImages[index].src;
                image.alt = slideImages[index].alt;
                image.loading = index === 0 ? "eager" : "lazy";
                image.decoding = "async";
            }

            if (heroDots) {
                const dot = document.createElement("button");
                dot.className = "hero-dot";
                dot.type = "button";
                dot.setAttribute("role", "tab");
                dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
                heroDots.appendChild(dot);
            }
        });

        const dots = Array.from(document.querySelectorAll(".hero-dot"));
        let currentIndex = 0;
        let autoplayTimer;
        let isPaused = false;

        const showSlide = (index) => {
            heroSlides.forEach((slide, slideIndex) => {
                slide.classList.toggle("is-active", slideIndex === index);
            });

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle("is-active", dotIndex === index);
            });

            currentIndex = index;
        };

        const nextSlide = () => {
            const nextIndex = (currentIndex + 1) % heroSlides.length;
            showSlide(nextIndex);
        };

        const previousSlide = () => {
            const previousIndex = (currentIndex - 1 + heroSlides.length) % heroSlides.length;
            showSlide(previousIndex);
        };

        const startAutoplay = () => {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
            }

            autoplayTimer = window.setInterval(() => {
                if (!isPaused && !document.hidden) {
                    nextSlide();
                }
            }, 3800);
        };

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                showSlide(index);
                startAutoplay();
            });
        });

        if (heroControls) {
            heroControls.querySelectorAll(".hero-nav-button").forEach((button) => {
                button.addEventListener("click", () => {
                    if (button.dataset.direction === "next") {
                        nextSlide();
                    } else {
                        previousSlide();
                    }
                    startAutoplay();
                });
            });
        }

        if (heroSection) {
            heroSection.addEventListener("mouseenter", () => {
                isPaused = true;
                clearInterval(autoplayTimer);
            });

            heroSection.addEventListener("mouseleave", () => {
                isPaused = false;
                startAutoplay();
            });
        }

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                event.preventDefault();
                nextSlide();
                startAutoplay();
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                previousSlide();
                startAutoplay();
            }
        });

        showSlide(0);
        startAutoplay();
    }

    const announcementText = document.getElementById("announcement-text");

    if (announcementText) {
        const messages = [
             "💙 Welcome to KYVORA",
            "🚚 Free shipping on orders over $50 • 30-day returns",
            "🎉 New Arrivals Just Landed",
            "🔒 Secure Checkout",
            "⭐ Premium Electronics"
        ];

        let currentIndex = 0;

        const rotateAnnouncement = () => {
            announcementText.classList.remove("is-visible");

            window.setTimeout(() => {
                announcementText.textContent = messages[currentIndex];
                currentIndex = (currentIndex + 1) % messages.length;
                announcementText.classList.add("is-visible");
            }, 220);
        };

        announcementText.textContent = messages[0];
        announcementText.classList.add("is-visible");
        window.setInterval(rotateAnnouncement, 4000);
    }

    const navbar = document.querySelector("nav");

    if (navbar) {
        const setNavState = () => {
            navbar.classList.toggle("scrolled", window.scrollY > 60);
        };

        setNavState();
        window.addEventListener("scroll", setNavState);
    }

    const reveals = document.querySelectorAll(".reveal");

    const revealSections = () => {
        const windowHeight = window.innerHeight;

        reveals.forEach((section) => {
            const top = section.getBoundingClientRect().top;

            if (top < windowHeight - 100) {
                section.classList.add("active");
            }
        });
    };

    revealSections();
    window.addEventListener("scroll", revealSections);

    const counters = document.querySelectorAll(".counter");
    const stats = document.querySelector(".stats");

    if (counters.length && stats) {
        let started = false;

        const animateCounters = () => {
            if (started) {
                return;
            }

            const statsTop = stats.getBoundingClientRect().top;

            if (statsTop >= window.innerHeight - 100) {
                return;
            }

            started = true;

            counters.forEach((counter) => {
                const target = Number(counter.dataset.target);
                let count = 0;
                const speed = target / 100;

                const update = () => {
                    if (count < target) {
                        count += speed;
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = `${target.toLocaleString()}+`;
                    }
                };

                update();
            });
        };

        animateCounters();
        window.addEventListener("scroll", animateCounters);
    }
});
