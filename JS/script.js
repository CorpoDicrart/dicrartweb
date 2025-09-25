/* ==============================
   script.js (todo en uno)
   ============================== */

// ===== MENÚ HAMBURGUESA =====
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });
}

// ===== ENLACE ACTIVO SEGÚN PÁGINA =====
const navLinks = document.querySelectorAll(".nav-list a");
const currentUrl = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentUrl) {
    link.classList.add("active");
  }
});

// Cerrar menú al hacer clic en un enlace (modo móvil)
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navList.classList.contains("active")) {
      navList.classList.remove("active");
      menuToggle.classList.remove("open");
    }
  });
});

// ===== ANIMACIONES AL HACER SCROLL =====
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// ===== CONTADOR ANIMADO PARA MÉTRICAS =====
const counters = document.querySelectorAll(".metric-item h3");

const counterOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -50px 0px"
};

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = +counter.innerText;
    let start = 0;
    const increment = target / 100; // velocidad

    const updateCounter = () => {
      start += increment;
      if (start < target) {
        counter.innerText = Math.ceil(start);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
    observer.unobserve(counter);
  });
}, counterOptions);

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// ===== ANIMACIÓN DE SECCIONES (slide-up) =====
const animatedSections = document.querySelectorAll(".section-animate");

animatedSections.forEach(section => {
  section.classList.add("hidden");
});

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

animatedSections.forEach(section => {
  sectionObserver.observe(section);
});
