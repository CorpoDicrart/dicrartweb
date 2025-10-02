/* ==============================
  animation.js (Mejorado)
  ============================== */

// ===== CONTADOR ANIMADO PARA MÉTRICAS =====
const counters = document.querySelectorAll(".metric-item h3");

const counterOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -50px 0px"
};

const animateCounter = (counter) => {
  const target = parseInt(counter.dataset.target || counter.innerText, 10);
  let current = 0;
  const duration = 1200; // ms
  const startTime = performance.now();

  const step = (now) => {
   const progress = Math.min((now - startTime) / duration, 1);
   current = Math.floor(progress * target);
   counter.innerText = current;
   if (progress < 1) {
    requestAnimationFrame(step);
   } else {
    counter.innerText = target;
   }
  };

  requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    animateCounter(entry.target);
    observer.unobserve(entry.target);
   }
  });
}, counterOptions);

counters.forEach(counter => {
  // Permite usar data-target para mayor flexibilidad
  counter.setAttribute('aria-label', 'Contador animado');
  counterObserver.observe(counter);
});

// ===== ANIMACIÓN SUAVE DE SECCIONES =====
const animatedSections = document.querySelectorAll(".section-animate");

animatedSections.forEach(section => {
  section.classList.add("hidden");
  section.setAttribute('aria-hidden', 'true');
});

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    entry.target.classList.add("visible");
    entry.target.classList.remove("hidden");
    entry.target.setAttribute('aria-hidden', 'false');
    observer.unobserve(entry.target);
   }
  });
}, { threshold: 0.2 });

animatedSections.forEach(section => {
  sectionObserver.observe(section);
});
