gsap.registerPlugin(ScrollTrigger);

/* Initialize all elements with proper starting states */
function initializeElementStates() {
  gsap.set('#aboutEyebrow', { opacity: 0 });
  gsap.set('#aboutSub', { opacity: 0 });
}

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



/* Header fade in and scroll effect */
function initHeader() {
  gsap.to('#header', { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.1 });
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      document.getElementById('header').classList.add('scrolled');
    } else {
      document.getElementById('header').classList.remove('scrolled');
    }
  });
}

/* About Hero Animation */
function playAboutHeroIn() {
  gsap.to('#aboutEyebrow', { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 });

  // Animate title words
  const titleWords = document.querySelectorAll('#aboutTitle .word');
  titleWords.forEach((word, idx) => {
    const chars = word.textContent.split('');
    word.innerHTML = chars.map(c => c === ' ' ? ' ' : `<span class="char">${c}</span>`).join('');
    
    gsap.set(word.querySelectorAll('.char'), { y: 110 });
    
    gsap.to(word.querySelectorAll('.char'), {
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.03,
      delay: 0.4 + idx * 0.15
    });
  });

  gsap.to('#aboutSub', { opacity: 1, duration: 0.7, ease: 'power2.out', delay: 1.0 });
}

/* Animate mission blocks on scroll */
function animateMissionBlocks() {
  const label = document.querySelector('#mission-section .section-label');
  const blocks = document.querySelectorAll('.mission-block');

  if (label) {
    ScrollTrigger.create({
      trigger: label,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(label, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    });
  }

  blocks.forEach((block, i) => {
    ScrollTrigger.create({
      trigger: block,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(block, { 
          y: 0, 
          opacity: 1, 
          duration: 0.7, 
          ease: 'power2.out',
          delay: i * 0.1
        });
      }
    });
    gsap.set(block, { y: 30, opacity: 0 });
  });
}

/* Animate overview section */
function animateOverviewSection() {
  const label = document.querySelector('#overview-section .section-label');
  const heading = document.querySelector('#overview-section .section-heading');
  const items = document.querySelectorAll('.timeline-item');

  if (label) {
    ScrollTrigger.create({
      trigger: label,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(label, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    });
  }

  if (heading) {
    ScrollTrigger.create({
      trigger: heading,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(heading, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }
    });
    gsap.set(heading, { y: 30, opacity: 0 });
  }

  items.forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(item, { 
          x: 0, 
          opacity: 1, 
          duration: 0.7, 
          ease: 'power2.out',
          delay: i * 0.08
        });
      }
    });
    gsap.set(item, { x: -20, opacity: 0 });
  });
}

/* Animate stats on scroll */
function animateStats() {
  const stats = document.querySelectorAll('.stat');

  stats.forEach((stat, i) => {
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(stat, { 
          scale: 1, 
          opacity: 1, 
          duration: 0.7, 
          ease: 'back.out',
          delay: i * 0.1
        });
      }
    });
    gsap.set(stat, { scale: 0.9, opacity: 0 });
  });
}

/* Animate value cards on scroll */
function animateValueCards() {
  const label = document.querySelector('#values-section .section-label');
  const heading = document.querySelector('#values-section .section-heading');
  const cards = document.querySelectorAll('.value-card');

  if (label) {
    ScrollTrigger.create({
      trigger: label,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(label, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    });
  }

  if (heading) {
    ScrollTrigger.create({
      trigger: heading,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(heading, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }
    });
    gsap.set(heading, { y: 30, opacity: 0 });
  }

  cards.forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(card, { 
          y: 0, 
          opacity: 1, 
          duration: 0.7, 
          ease: 'power2.out',
          delay: i * 0.1
        });
      }
    });
    gsap.set(card, { y: 30, opacity: 0 });
  });
}

/* Animate tech boxes on scroll */
function animateTechBoxes() {
  const label = document.querySelector('#tech-section .section-label');
  const heading = document.querySelector('#tech-section .section-heading');
  const boxes = document.querySelectorAll('.tech-box');

  if (label) {
    ScrollTrigger.create({
      trigger: label,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(label, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    });
  }

  if (heading) {
    ScrollTrigger.create({
      trigger: heading,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(heading, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }
    });
    gsap.set(heading, { y: 30, opacity: 0 });
  }

  boxes.forEach((box, i) => {
    ScrollTrigger.create({
      trigger: box,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(box, { 
          y: 0, 
          opacity: 1, 
          duration: 0.7, 
          ease: 'power2.out',
          delay: i * 0.1
        });
      }
    });
    gsap.set(box, { y: 30, opacity: 0 });
  });
}

/* Animate Tech CTA section */
function animateTechCtaSection() {
  const section = document.querySelector('#tech-cta-section');
  if (!section) return;

  const label = section.querySelector('.cta-label');
  const heading = section.querySelector('.cta-heading');
  const text = section.querySelector('.cta-text');
  const buttons = section.querySelectorAll('.cta-btn');

  if (label) {
    gsap.set(label, { opacity: 0 });
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(label, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    });
  }

  if (heading) {
    gsap.set(heading, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: heading,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(heading, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });
      }
    });
  }

  if (text) {
    gsap.set(text, { opacity: 0 });
    ScrollTrigger.create({
      trigger: text,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(text, { opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.2 });
      }
    });
  }

  buttons.forEach((btn, i) => {
    gsap.set(btn, { opacity: 0, y: 20 });
    ScrollTrigger.create({
      trigger: btn,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(btn, { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'power2.out',
          delay: 0.3 + i * 0.1
        });
      }
    });
  });
}

/* Initialize all animations when page loads */
document.addEventListener('DOMContentLoaded', () => {
  initializeElementStates();
  initHeader();
  playAboutHeroIn();
  animateMissionBlocks();
  animateOverviewSection();
  animateStats();
  animateValueCards();
  animateTechBoxes();
  animateTechCtaSection();
});

/* Smooth scroll behavior for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
