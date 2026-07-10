gsap.registerPlugin(ScrollTrigger);

/* ── Hamburger menu ───────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu    = document.getElementById("navMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  let lockedScrollY = 0;

  if (!menuToggle || !navMenu || !menuOverlay) return;

  const setMenuOpen = (isOpen) => {
    menuToggle.classList.toggle("active", isOpen);
    navMenu.classList.toggle("active", isOpen);
    menuOverlay.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    if (isOpen) {
      lockedScrollY = window.scrollY;
      document.body.style.top = `-${lockedScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, lockedScrollY);
    }
  };

  menuToggle.addEventListener("click", () => {
    setMenuOpen(!navMenu.classList.contains("active"));
  });

  menuOverlay.addEventListener("click", () => {
    setMenuOpen(false);
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });
});

/* ── Intro animation (~1.5s total) ───────────────────── */
const tl = gsap.timeline({
  onComplete: () => {
    gsap.to('#intro', {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.55,         // wipe-out: 0.35s
      ease: 'power3.inOut',
      delay: 0.05,
      onComplete: () => {
        document.getElementById('intro').style.display = 'none';
        playHeroIn();
      }
    });
  }
});

// Total timeline: ~1.1s, then 0.05 delay + 0.35s wipe = ~1.5s
tl.to('.intro-logo-mark', { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' })
  .to('#introName',        { opacity: 1, duration: 0.2,  ease: 'power2.out' }, '-=0.1')
  .to('#introTagline',     { opacity: 1, duration: 0.2,  ease: 'power2.out' }, '-=0.05')
  .to('#introLine',        { width: '120px', duration: 0.35, ease: 'power2.out' }, '-=0.1')
  .to({}, { duration: 0.5 });  // brief hold before wipe

function playHeroIn() {
  const isMobile = window.innerWidth <= 768;

  gsap.set('#header', { opacity: 1 });
  if (!isMobile) {
    gsap.from('#header', { opacity: 0, duration: 0.3, ease: 'power2.out' });
  }

  gsap.to('#heroEyebrow', { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 });

  const words = document.querySelectorAll('#heroHeadline .word');
  words.forEach((word, i) => {
    const chars = word.textContent.split('');
    word.innerHTML = chars
      .map(c => c === ' ' ? ' ' : `<span class="char">${c}</span>`)
      .join('');
    gsap.to(word.querySelectorAll('.char'), {
      y: 0,
      duration: 0.45,
      ease: 'power3.out',
      stagger: 0.03,
      delay: 0.2 + i * 0.1
    });
  });

  gsap.to('#heroSub',         { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.7 });
  gsap.to('#heroStats',       { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.9 });
  gsap.to('#heroMeta',        { opacity: 1, duration: 0.45, ease: 'power2.out', delay: 1.0 });
  gsap.to('#scrollIndicator', { opacity: 1, duration: 0.45, delay: 1.3 });
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
        duration: 0.6,
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
    y: 40, opacity: 0, duration: 0.45, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});

gsap.utils.toArray('.field-desc').forEach(el => {
  gsap.from(el, {
    y: 20, opacity: 0, duration: 0.45, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});
