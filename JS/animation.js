/* ==============================
   animation.js
   ============================== */

// ===== CONTADOR ANIMADO PARA MÉTRICAS =====
const counters = document.querySelectorAll(".metric-item h3");

const counterOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -50px 0px"
};

const counterObserver = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = +counter.innerText; // número final
    let start = 0;
    const increment = target / 100; // velocidad del conteo

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

// ===== ANIMACIÓN SUAVE DE SECCIONES =====
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
