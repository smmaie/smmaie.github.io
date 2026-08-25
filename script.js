// hamburger
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});


//dichtmaken hamburger
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// scroll animatie
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealTargets = document.querySelectorAll(
  '.about, .reelcard, .project, .skillsgrid__col, .credits__roll'
);

revealTargets.forEach(el => el.classList.add('reveal'));

if (reduceMotion) {
  revealTargets.forEach(el => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));
}


function initSlideshows() {
  document.querySelectorAll('[data-slideshow]').forEach(root => {
    const track = root.querySelector('.project__slides');
    const slides = Array.from(root.querySelectorAll('.project__slide'));
    const dotsWrap = root.querySelector('.project__dots');
    const prevBtn = root.querySelector('.project__nav--prev');
    const nextBtn = root.querySelector('.project__nav--next');

    if (slides.length <= 1) {
      if (dotsWrap) dotsWrap.remove();
      if (prevBtn) prevBtn.remove();
      if (nextBtn) nextBtn.remove();
      return;
    }

    let index = 0;

    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ga naar screenshot ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
      return dot;
    });

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));

    update();
  });
}

initSlideshows();