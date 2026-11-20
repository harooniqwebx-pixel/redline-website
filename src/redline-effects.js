import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function startRedlineExperience() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 1. CINEMATIC SCROLL PROGRESS BAR
  const progress = document.createElement('div');
  progress.id = 'redline-scroll-progress';
  document.body.appendChild(progress);

  gsap.to(progress, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });

  // 2. CINEMATIC SECTION REVEALS
  gsap.utils.toArray(
    '.event-feature, .event-secondary, .schedule-row, .membership-card, .coach-content, .about-content, .contact-section'
  ).forEach((element, index) => {
    gsap.from(element, {
      y: 45,
      opacity: 0.45,
      duration: 1,
      delay: (index % 3) * 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
        once: true
      }
    });
  });

  // 3. INTERACTIVE CINEMATIC CARD LIGHTING
  const interactiveCards = document.querySelectorAll(
    '.event-feature, .event-secondary, .membership-card, .coach-content, .about-content'
  );

  interactiveCards.forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--redline-x', `${x}%`);
      card.style.setProperty('--redline-y', `${y}%`);
    });
  });

  // 4. CINEMATIC IMAGE HOVER
  document.querySelectorAll(
    '.section:not(#home) .fighter-card img, .section:not(#home) .training-card img, .section:not(#home) .gallery-grid img'
  ).forEach(img => {
    img.addEventListener('pointerenter', () => {
      gsap.to(img, {
        scale: 1.055,
        duration: 0.65,
        ease: 'power2.out',
        overwrite: true
      });
    });

    img.addEventListener('pointerleave', () => {
      gsap.to(img, {
        scale: 1,
        duration: 0.65,
        ease: 'power2.out',
        overwrite: true
      });
    });
  });

  // 5. ACTIVE NAVIGATION WHILE SCROLLING
  const navLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  const sections = document.querySelectorAll(
    'main section[id], body > section[id]'
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navLinks.forEach(link => {
        link.classList.toggle(
          'redline-active-link',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    });
  }, {
    rootMargin: '-35% 0px -55% 0px'
  });

  sections.forEach(section => observer.observe(section));

  // 6. SMOOTH SCROLL REFRESH
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  console.log('REDLINE CINEMATIC EXPERIENCE READY');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startRedlineExperience);
} else {
  startRedlineExperience();
}
