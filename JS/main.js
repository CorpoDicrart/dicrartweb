/* ==============================
   main.js
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

// ===== ANIMACIONES AL HACER SCROLL =====
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// ===== ENLACE ACTIVO SEGÚN PÁGINA =====
const navLinks = document.querySelectorAll(".nav-list a");
const currentUrl = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentUrl) {
    link.classList.add("active");
  }
});

// ===== CERRAR MENÚ DESPUÉS DE CLICK (MÓVIL) =====
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navList.classList.contains("active")) {
      navList.classList.remove("active");
      menuToggle.classList.remove("open");
    }
  });
});
