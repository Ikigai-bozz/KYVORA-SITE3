document.addEventListener("DOMContentLoaded", () => {
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
