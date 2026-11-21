import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initSmoothParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Prevent duplicate initialization.
  if (document.documentElement.dataset.smoothParallax === 'loaded') return;
  document.documentElement.dataset.smoothParallax = 'loaded';

  // HERO: slow cinematic background movement.
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image');

  if (hero && heroImage) {
    gsap.fromTo(heroImage,
      { y: -25, scale: 1.04 },
      {
        y: 65,
        scale: 1.10,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      }
    );
  }

  // IMAGE PARALLAX: subtle movement, not excessive zoom.
  const imageSelectors = [
    '.fighter-card img',
    '.training-card img',
    '.event-feature img',
    '.event-secondary img',
    '.gallery-grid img',
    '.coach-photo img'
  ];

  const images = document.querySelectorAll(imageSelectors.join(','));

  images.forEach((image) => {
    gsap.fromTo(image,
      { y: -16 },
      {
        y: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      }
    );
  });

  // GENTLE SECTION HEADING FADE.
  const headings = document.querySelectorAll(
    '.section-heading h2, .coach-content h2, .about-content h2'
  );

  headings.forEach((heading) => {
    gsap.fromTo(heading,
      { opacity: 0.35, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // REFRESH AFTER IMAGES LOAD.
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  }, { once: true });

  console.log('REDLINE: smooth GSAP parallax active.');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSmoothParallax, { once: true });
} else {
  initSmoothParallax();
}
