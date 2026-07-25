// ==================== AOS INIT ====================
AOS.init({
    duration: 800,
    once: true,
    offset: 60
});

// ==================== TYPED.JS ====================
if (document.getElementById('typing')) {
    new Typed('#typing', {
        strings: [
            'Software Developer',
            'Python Developer',
            'AI / ML Enthusiast',
            'Data Analyst'
        ],
        typeSpeed: 55,
        backSpeed: 30,
        backDelay: 1500,
        loop: true
    });
}

// ==================== MOBILE NAV TOGGLE ====================
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

if (menuBtn && navbar) {
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Close menu when a link is clicked (mobile)
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });
}

// ==================== ACTIVE LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function setActiveLink() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ==================== HEADER SHADOW ON SCROLL ====================
const header = document.querySelector('.header');

function toggleHeaderShadow() {
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 10px 30px -15px rgba(0,0,0,0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', toggleHeaderShadow);

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.getElementById('scrollTop');

function toggleScrollTopBtn() {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', toggleScrollTopBtn);

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== CONTACT FORM (front-end only) ====================
// NOTE: This currently only validates and resets the form in the browser.
// To actually receive messages, connect this form to a service like
// Formspree, EmailJS, or your own backend endpoint.
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Noted';
        submitBtn.disabled = true;

        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}
