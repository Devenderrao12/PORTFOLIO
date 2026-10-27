
// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.textContent = isOpen ? "✕" : "☰";
});

// Close menu after selecting a section
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    });
});

// Automatic copyright year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    backToTop.style.display =
        window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(
    "#about .section-title, " +
    "#about .about-content, " +
    "#skills .section-title, " +
    "#skills .skill-category, " +
    "#skills .skill, " +
    "#experience .section-title, " +
    "#experience .card, " +
    "#projects .section-title, " +
    "#projects .card, " +
    "#certificates .section-title, " +
    "#certificates .card, " +
    "#resume .section-title, " +
    "#resume .about-content, " +
    "#contact .section-title, " +
    "#contact .contact-card"
);

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {
    revealElements.forEach(function (element, index) {
        element.classList.add("reveal-ready");

        element.style.transitionDelay =
            (index % 3) * 100 + "ms";
    });

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    // Keep content visible if animation is unsupported
    // or the visitor prefers reduced motion.
    revealElements.forEach(function (element) {
        element.classList.add("is-visible");
    });
}
```
