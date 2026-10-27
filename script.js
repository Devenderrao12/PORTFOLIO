
document.addEventListener("DOMContentLoaded", () => {
  // Footer: automatically update the current year
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  function closeMenu() {
    navLinks?.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuToggle?.setAttribute("aria-expanded", "false");

    if (menuToggle) {
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("open");

    document.body.classList.toggle("menu-open", Boolean(isOpen));
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));

    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu with Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Scroll reveal animations
  const revealElements = document.querySelectorAll(".reveal");

  // Add subtle alternating directions to cards
  document.querySelectorAll(
    ".about-cards .info-card, .skills-grid .skill-card, " +
    ".projects-grid .project-card, .certificates-grid .certificate-card, " +
    ".marketing-grid .marketing-card"
  ).forEach((element, index) => {
    if (index % 3 === 1) {
      element.classList.add("zoom-in");
    } else if (index % 3 === 2) {
      element.classList.add("from-right");
    }
  });

  // Stagger the animations for groups of cards
  document.querySelectorAll(
    ".about-cards, .skills-grid, .projects-grid, " +
    ".certificates-grid, .marketing-grid"
  ).forEach((group) => {
    group.querySelectorAll(".reveal").forEach((element, index) => {
      element.style.setProperty("--delay", `${(index % 3) * 120}ms`);
    });
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Typing animation in the hero section
  const typingElement = document.getElementById("typingText");

  if (typingElement) {
    const words = [
      "Python Developer",
      "AI / ML Enthusiast",
      "Computer Science Graduate",
      "Problem Solver"
    ];

    let wordIndex = 0;
    let characterIndex = words[0].length;
    let deleting = true;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (deleting) {
        characterIndex--;
      } else {
        characterIndex++;
      }

      typingElement.textContent = currentWord.substring(
        0,
        Math.max(0, characterIndex)
      );

      let delay = deleting ? 45 : 85;

      if (!deleting && characterIndex === currentWord.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }

      window.setTimeout(typeEffect, delay);
    }

    window.setTimeout(typeEffect, 1400);
  }

  // Animate skill bars when the Skills section becomes visible
  const skillSection = document.getElementById("skills");
  const skillBars = document.querySelectorAll(".skill-track span");

  function fillSkillBars() {
    skillBars.forEach((bar) => {
      const width = bar.dataset.width || "0%";
      bar.style.setProperty("--skill-width", width);
      bar.classList.add("filled");
    });
  }

  if (skillSection && "IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fillSkillBars();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    skillObserver.observe(skillSection);
  } else {
    fillSkillBars();
  }

  // Scroll progress bar and back-to-top button
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");

  function handleScroll() {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    }

    // Highlight the current navigation section
    let currentSection = "home";

    document.querySelectorAll("main section[id]").forEach((section) => {
      if (window.scrollY >= section.offsetTop - 160) {
        currentSection = section.id;
      }
    });

    navItems.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Back-to-top action
  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Contact form: opens the visitor's email application
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const recipient = "yadav.devender2005@gmail.com";
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    if (formNote) {
      formNote.textContent =
        "Your email application will open to send this message.";
    }

    window.location.href =
      `mailto:${recipient}?subject=${subject}&body=${body}`;
  });

  console.log("Portfolio animations initialized successfully!");
});
