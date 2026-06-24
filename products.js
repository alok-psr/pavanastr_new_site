gsap.registerPlugin(ScrollTrigger);

/* Initialize all elements with proper starting states */
function initializeElementStates() {
  gsap.set('#productsEyebrow', { opacity: 0 });
  gsap.set('#productsSub', { opacity: 0 });
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

/* Products Hero Animation */
function playProductsHeroIn() {
  gsap.to('#productsEyebrow', { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 });

  // Animate title words
  const titleWords = document.querySelectorAll('#productsTitle .word');
  titleWords.forEach((word, idx) => {
    const chars = word.textContent.split('');
    word.innerHTML = chars.map(c => c === ' ' ? ' ' : `<span class="char">${c}</span>`).join('');
    
    // Set initial state for newly created chars
    gsap.set(word.querySelectorAll('.char'), { y: 110 });
    
    // Animate them in
    gsap.to(word.querySelectorAll('.char'), {
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.03,
      delay: 0.4 + idx * 0.15
    });
  });

  gsap.to('#productsSub', { opacity: 1, duration: 0.7, ease: 'power2.out', delay: 1.0 });
}

/* Animate product cards on scroll */
function animateProductCards() {
  const cards = document.querySelectorAll('.product-card');
  
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
          delay: i * 0.08
        });
      }
    });
    gsap.set(card, { y: 30, opacity: 0 });
  });
}

/* Animate spec blocks on scroll */
function animateSpecBlocks() {
  const blocks = document.querySelectorAll('.spec-block');
  const label = document.querySelector('#specs-section .section-label');
  const heading = document.querySelector('#specs-section .section-heading');

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

/* Animate grid section labels and headings */
function animateGridSectionHeaders() {
  const label = document.querySelector('#products-grid-section .section-label');
  const heading = document.querySelector('#products-grid-section .section-heading');

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
}

/* Animate CTA section */
function animateCtaSection() {
  const section = document.querySelector('#contact-cta-section');
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

/* Product Modal Functionality */
const productDetails = {
  'gandiv-i': {
    label: 'Flagship System',
    title: 'GANDIV-I',
    desc: 'Long-endurance fixed-wing UAV built for persistent ISR missions across contested terrain. Features AI-assisted target recognition onboard with advanced sensor fusion.',
    specs: [
      { label: 'Endurance', value: '12+ hours' },
      { label: 'Range', value: '120 km' },
      { label: 'Payload', value: '8 kg' },
      { label: 'Cruise Speed', value: '85 km/h' }
    ],
    tags: ['ISR', 'Tactical', 'Long Range', 'AI-Enabled']
  },
  'gandiv-ii': {
    label: 'Combat System',
    title: 'GANDIV-II',
    desc: 'Precision strike system with extended loiter time and AI-guided target acquisition for surgical strike operations. Equipped with real-time threat assessment.',
    specs: [
      { label: 'Loiter Time', value: '45 minutes' },
      { label: 'Strike Radius', value: '75 km' },
      { label: 'Warhead', value: 'Variable' },
      { label: 'Accuracy', value: '< 2m CEP' }
    ],
    tags: ['Strike', 'Precision', 'Autonomous', 'Tactical']
  },
  'gandiv-iii': {
    label: 'Electronic Warfare',
    title: 'GANDIV-III',
    desc: 'Electronic warfare and jamming platform for spectrum dominance and signal intelligence across hostile environments. Advanced frequency hopping technology.',
    specs: [
      { label: 'Freq Range', value: '800M-6GHz' },
      { label: 'Power Output', value: '2 kW' },
      { label: 'Coverage', value: '100 km' },
      { label: 'Processing', value: 'Real-time' }
    ],
    tags: ['EW', 'SIGINT', 'Spectrum', 'Jamming']
  },
  'nano-drone': {
    label: 'Swarm Platform',
    title: 'Nano Drone',
    desc: 'Autonomous micro-UAV for distributed sensing, swarm coordination, and collaborative multi-agent operations. Perfect for dense urban environments.',
    specs: [
      { label: 'Unit Weight', value: '250 g' },
      { label: 'Swarm Size', value: 'Up to 50' },
      { label: 'Flight Time', value: '45 minutes' },
      { label: 'Coordination', value: 'AI-Guided' }
    ],
    tags: ['Autonomous', 'Swarm', 'Distributed', 'Tactical']
  },
  'grenade-dropper': {
    label: 'Logistics & Supply',
    title: 'GRENADE DROPPER',
    desc: 'Cargo logistics UAV for supply delivery, emergency medical transport, and forward operating area resupply missions. Heavy-lift capacity.',
    specs: [
      { label: 'Payload', value: '25 kg' },
      { label: 'Delivery Range', value: '80 km' },
      { label: 'Flight Time', value: '3 hours' },
      { label: 'Accuracy', value: '±10m' }
    ],
    tags: ['Supply', 'Logistics', 'Medical', 'Heavy-Lift']
  },
  'gandiv-iv': {
    label: 'Counter-UAS',
    title: 'GANDIV-IV',
    desc: 'Anti-UAS defense platform with integrated threat detection, classification, and neutralization capabilities. Multi-modal detection system.',
    specs: [
      { label: 'Detection Range', value: '50 km' },
      { label: 'Threat Types', value: '50+' },
      { label: 'Response Time', value: '< 2 sec' },
      { label: 'Engagement', value: 'Multi-Layer' }
    ],
    tags: ['Defence', 'Counter-UAS', 'Active', 'Detection']
  }
};

function openProductModal(productKey) {
  const modal = document.getElementById('product-modal');
  const product = productDetails[productKey];
  
  if (!product) return;

  // Update modal content
  document.getElementById('modal-label').textContent = product.label;
  document.getElementById('modal-title').textContent = product.title;
  document.getElementById('modal-desc').textContent = product.desc;

  // Update specs
  const specsHtml = product.specs.map(spec => 
    `<div class="modal-spec">
      <span class="modal-spec-label">${spec.label}</span>
      <span class="modal-spec-value">${spec.value}</span>
    </div>`
  ).join('');
  document.getElementById('modal-specs').innerHTML = specsHtml;

  // Update tags
  const tagsHtml = product.tags.map(tag => 
    `<span class="modal-tag">${tag}</span>`
  ).join('');
  document.getElementById('modal-tags').innerHTML = tagsHtml;

  // Update image
  const imgNum = Object.keys(productDetails).indexOf(productKey) + 1;
  document.getElementById('modal-product-img').src = `img/product-${imgNum}.jpg`;
  document.getElementById('modal-product-img').alt = product.title;

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

/* Initialize all animations when page loads */
document.addEventListener('DOMContentLoaded', () => {
  initializeElementStates();
  initHeader();
  playProductsHeroIn();
  animateGridSectionHeaders();
  animateProductCards();
  animateSpecBlocks();
  animateCtaSection();

  // Setup product card click handlers
  document.querySelectorAll('.product-card[data-product]').forEach(card => {
    card.addEventListener('click', () => {
      const productKey = card.dataset.product;
      openProductModal(productKey);
    });
  });

  // Setup modal close handlers
  const modal = document.getElementById('product-modal');
  const closeBtn = document.querySelector('.modal-close');
  const overlay = document.querySelector('.modal-overlay');

  closeBtn?.addEventListener('click', closeProductModal);
  overlay?.addEventListener('click', closeProductModal);

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProductModal();
    }
  });
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
