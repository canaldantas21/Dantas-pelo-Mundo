
/* Banner rotativo simples — autoplay com fade, pausa on hover, controlos e indicadores */
(function(){
  const autoplayInterval = 6000; // 6s por slide
  let idx = 0;
  let timer = null;
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const indicators = Array.from(document.querySelectorAll('.indicator'));
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  const carousel = document.querySelector('.banner-carousel');

  if (!slides.length) return;

  function goTo(n) {
    slides.forEach((s, i) => s.classList.toggle('active', i === n));
    indicators.forEach((ind, i) => ind.classList.toggle('active', i === n));
    idx = n;
  }

  function next() { goTo((idx + 1) % slides.length); }
  function prev() { goTo((idx - 1 + slides.length) % slides.length); }

  // Autoplay
  function start() {
    stop();
    timer = setInterval(next, autoplayInterval);
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // Event listeners
  nextBtn && nextBtn.addEventListener('click', () => { next(); start(); });
  prevBtn && prevBtn.addEventListener('click', () => { prev(); start(); });

  indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => { goTo(i); start(); });
  });

  // Pause on hover/focus
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  // Keyboard left/right
  document.addEventListener('keydown', (e) => {
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft') { prev(); start(); }
    if (e.key === 'ArrowRight') { next(); start(); }
  });

  // Start on load
  goTo(0);
  start();
})();


@dantaspelomundo5710
