gsap.registerPlugin(ScrollTrigger);

/* ── Hamburger menu ───────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu    = document.getElementById("navMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  if (!menuToggle || !navMenu || !menuOverlay) return;

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    menuOverlay.classList.toggle("active");
  });

  menuOverlay.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
  });

  /* Close drawer when a nav link is clicked (mobile UX) */
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      menuOverlay.classList.remove("active");
    });
  });
});

/* ── Intro animation ──────────────────────────────────── */
const tl = gsap.timeline({
  onComplete: () => {
    gsap.to('#intro', {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 0.3,
      onComplete: () => {
        document.getElementById('intro').style.display = 'none';
        playHeroIn();
      }
    });
  }
});

tl.to('.intro-logo-mark', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
  .to('#introName',    { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
  .to('#introTagline', { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1')
  .to('#introLine',    { width: '120px', duration: 0.6, ease: 'power2.out' }, '-=0.2')
  .to({}, { duration: 0.8 });

function playHeroIn() {
  const isMobile = window.innerWidth <= 768;

  /* On mobile the header is already visible via CSS (opacity:1 !important).
     On desktop GSAP fades it in. Either way, make sure it's visible. */
  gsap.set('#header', { opacity: 1 });
  if (!isMobile) {
    gsap.from('#header', { opacity: 0, duration: 0.6, ease: 'power2.out' });
  }

  gsap.to('#heroEyebrow', { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 });

  const words = document.querySelectorAll('#heroHeadline .word');
  words.forEach((word, i) => {
    const chars = word.textContent.split('');
    word.innerHTML = chars
      .map(c => c === ' ' ? ' ' : `<span class="char">${c}</span>`)
      .join('');
    gsap.to(word.querySelectorAll('.char'), {
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.03,
      delay: 0.2 + i * 0.1
    });
  });

  gsap.to('#heroSub',        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.7 });
  gsap.to('#heroStats',      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.9 });
  gsap.to('#heroMeta',       { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 1.0 });
  gsap.to('#scrollIndicator',{ opacity: 1, duration: 0.5, delay: 1.3 });
}

/* ── Header scroll effect ─────────────────────────────── */
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* ── Bento scroll reveal ──────────────────────────────── */
gsap.utils.toArray('.bento-card').forEach((card, i) => {
  ScrollTrigger.create({
    trigger: card,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(card, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.9,
        ease: 'power3.inOut',
        delay: i * 0.08
      });
    }
  });
});

/* ── Carousel — infinite auto-advance ────────────────── */
const slides = document.querySelectorAll('.carousel-slide');
const total  = slides.length;
let current  = 0;
let autoTimer = null;

function goTo(idx) {
  const prev = current;
  current = ((idx % total) + total) % total;
  slides[prev].classList.remove('active');
  slides[current].classList.add('active');
  document.getElementById('carouselCounter').textContent =
    `0${current + 1} / 0${total}`;
  document.getElementById('carouselProgress').style.width =
    `${((current + 1) / total) * 100}%`;
}

function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current + 1), 3500);
}

function initCarousel() {
  slides[0].classList.add('active');
  goTo(0);
  startAuto();
}

document.getElementById('prevBtn').addEventListener('click', () => { goTo(current - 1); startAuto(); });
document.getElementById('nextBtn').addEventListener('click', () => { goTo(current + 1); startAuto(); });

ScrollTrigger.create({
  trigger: '#field',
  start: 'top 70%',
  onEnter: () => initCarousel()
});

/* ── Section headlines scroll reveal ─────────────────── */
gsap.utils.toArray('.section-headline, .field-headline, .reviews-headline').forEach(el => {
  gsap.from(el, {
    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});

gsap.utils.toArray('.field-desc').forEach(el => {
  gsap.from(el, {
    y: 20, opacity: 0, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});