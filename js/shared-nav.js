document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelectorAll("nav ul li a");

    if (!navToggle) {
        return;
    }

    navToggle.addEventListener("change", () => {
        navToggle.setAttribute("aria-expanded", String(navToggle.checked));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navToggle.checked) {
                navToggle.checked = false;
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    });
});
