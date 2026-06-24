gsap.registerPlugin(ScrollTrigger);

/* Initialize all elements with proper starting states */
function initializeElementStates() {
  // Set initial states for hero elements
  gsap.set('#contactEyebrow', { opacity: 0 });
  gsap.set('#contactSub', { opacity: 0 });
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

/* Contact Hero Animation */
function playContactHeroIn() {
  gsap.to('#contactEyebrow', { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 });

  // Animate title words
  const titleWords = document.querySelectorAll('#contactTitle .word');
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

  gsap.to('#contactSub', { opacity: 1, duration: 0.7, ease: 'power2.out', delay: 1.0 });
}

/* Stagger reveal for contact details */
function animateContactDetails() {
  const labels = document.querySelectorAll('.contact-details-section .section-label');
  const headings = document.querySelectorAll('.contact-details-section .section-heading');
  const details = document.querySelectorAll('.contact-detail');

  labels.forEach(label => {
    ScrollTrigger.create({
      trigger: label,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(label, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    });
  });

  headings.forEach(heading => {
    ScrollTrigger.create({
      trigger: heading,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(heading, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }
    });
    gsap.set(heading, { y: 30, opacity: 0 });
  });

  details.forEach((detail, i) => {
    ScrollTrigger.create({
      trigger: detail,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(detail, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: i * 0.1 });
      }
    });
    gsap.set(detail, { y: 20, opacity: 0 });
  });
}

/* Animate form fields */
function animateFormFields() {
  const formLabels = document.querySelectorAll('.contact-form-section .section-label');
  const formHeadings = document.querySelectorAll('.contact-form-section .section-heading');
  const formGroups = document.querySelectorAll('.form-group');
  const submitBtn = document.querySelector('.form-submit-btn');

  formLabels.forEach(label => {
    ScrollTrigger.create({
      trigger: label,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(label, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      }
    });
  });

  formHeadings.forEach(heading => {
    ScrollTrigger.create({
      trigger: heading,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(heading, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }
    });
    gsap.set(heading, { y: 30, opacity: 0 });
  });

  formGroups.forEach((group, i) => {
    ScrollTrigger.create({
      trigger: group,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(group, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: i * 0.08 });
      }
    });
    gsap.set(group, { y: 20, opacity: 0 });
  });

  ScrollTrigger.create({
    trigger: submitBtn,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(submitBtn, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.4 });
    }
  });
  gsap.set(submitBtn, { y: 20, opacity: 0 });
}

/* Animate map section */
function animateMapSection() {
  const mapContainer = document.querySelector('.map-container');
  
  ScrollTrigger.create({
    trigger: mapContainer,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(mapContainer, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' });
    }
  });
  gsap.set(mapContainer, { y: 40, opacity: 0 });
}

/* Form submission handler */
function initFormHandler() {
  const form = document.getElementById('contactForm');
  
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="btn-arrow">⋯</span>';
    
    try {
      // Simulate form submission (replace with your actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success animation
      gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.2,
        ease: 'back.inOut',
        onComplete: () => {
          gsap.to(submitBtn, {
            scale: 1,
            duration: 0.2,
            ease: 'back.inOut'
          });
        }
      });

      submitBtn.innerHTML = '✓ Message Sent!';
      submitBtn.style.background = 'rgba(184, 150, 62, 0.7)';
      
      // Reset form
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = 'var(--brass)';
      }, 2000);
      
    } catch (error) {
      submitBtn.innerHTML = '✗ Error - Try Again';
      submitBtn.disabled = false;
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
      }, 2000);
    }
  });

  // Add smooth focus animation for inputs
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        paddingLeft: 4,
        duration: 0.2,
        ease: 'power1.out'
      });
    });

    input.addEventListener('blur', () => {
      gsap.to(input, {
        paddingLeft: 0,
        duration: 0.2,
        ease: 'power1.out'
      });
    });
  });
}

/* Initialize all animations when page loads */
document.addEventListener('DOMContentLoaded', () => {
  initializeElementStates();
  initHeader();
  playContactHeroIn();
  animateContactDetails();
  animateFormFields();
  animateMapSection();
  initFormHandler();
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
