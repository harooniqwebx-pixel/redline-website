import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initRedlineCinematic() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (document.documentElement.dataset.redlineCinematic === 'on') return;

  const app = document.querySelector('#app');
  if (!app || !app.querySelector('.hero')) return;

  document.documentElement.dataset.redlineCinematic = 'on';

  const mm = gsap.matchMedia();

  // 1. LAYERED PARALLAX
  const hero = app.querySelector('.hero');
  const heroImage = app.querySelector('.hero-image');
  const heroShade = app.querySelector('.hero-shade');
  const heroContent = app.querySelector('.hero-content');

  if (hero && heroImage) {
    gsap.to(heroImage, {
      yPercent: 20,
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  if (hero && heroShade) {
    gsap.fromTo(heroShade,
      { y: 0 },
      {
        y: 65,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 2
        }
      }
    );
  }

  if (hero && heroContent) {
    gsap.to(heroContent, {
      y: -90,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  // 2. LINE-BY-LINE HEADING REVEALS
  const headings = app.querySelectorAll(
    '.section-heading h2, .coach-content h2, .about-content h2'
  );

  headings.forEach((heading) => {
    if (heading.children.length > 0) return;

    const originalText = heading.textContent.trim();
    if (!originalText) return;

    const words = originalText.split(/\s+/);
    heading.textContent = '';

    const wordElements = words.map((word) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.marginRight = '0.23em';
      heading.appendChild(span);
      return span;
    });

    // Group words by their actual rendered line.
    const lines = new Map();

    wordElements.forEach((word) => {
      const top = Math.round(word.offsetTop);
      if (!lines.has(top)) lines.set(top, []);
      lines.get(top).push(word);
    });

    const lineGroups = [...lines.values()];

    lineGroups.forEach((line) => {
      gsap.fromTo(line,
        { y: 55, opacity: 0, rotateX: -8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.85,
          stagger: 0.045,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            once: true
          }
        }
      );
    });
  });

  // 3. PINNED FIGHTERS HEADING
  mm.add('(min-width: 900px)', () => {
    const fighters = app.querySelector('.fighters-section');
    const heading = fighters?.querySelector('.section-heading');

    if (fighters && heading) {
      ScrollTrigger.create({
        trigger: fighters,
        start: 'top top+=95',
        end: 'bottom bottom',
        pin: heading,
        pinSpacing: false,
        anticipatePin: 1
      });
    }
  });

  // 4. 3D CARD ZOOM ON SCROLL
  const cards = app.querySelectorAll(
    '.fighter-card, .training-card, .membership-card, .event-secondary'
  );

  cards.forEach((card, index) => {
    const direction = index % 2 === 0 ? -1 : 1;

    gsap.fromTo(card,
      {
        opacity: 0,
        y: 75,
        scale: 0.88,
        rotateY: direction * 8,
        transformPerspective: 1100
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true
        }
      }
    );
  });

  // 5. SIDEWAYS MOVING TYPOGRAPHY
  const sidewaysHeadings = app.querySelectorAll(
    '.events-section .section-heading h2, .gallery-section .section-heading h2'
  );

  sidewaysHeadings.forEach((heading, index) => {
    gsap.fromTo(heading,
      { x: index % 2 === 0 ? -55 : 55 },
      {
        x: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heading,
          start: 'top bottom',
          end: 'center center',
          scrub: 1.5
        }
      }
    );
  });

  // 6. FOCUS-FRAME GALLERY
  const galleryImages = app.querySelectorAll('.gallery-grid img');

  galleryImages.forEach((image, index) => {
    const wrapper = image.parentElement;

    gsap.fromTo(image,
      {
        scale: 1.18,
        filter: 'brightness(0.55)'
      },
      {
        scale: 1,
        filter: 'brightness(1)',
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 90%',
          end: 'center 48%',
          scrub: 1.3
        }
      }
    );
  });

  // 7. SCROLL-TRIGGERED SECTION TRANSITIONS
  const sections = app.querySelectorAll(
    '.training-section, .events-section, .schedule-section, .coaches-section, .membership-section, .about-section, .contact-section'
  );

  sections.forEach((section) => {
    const content = section.querySelector(
      '.training-grid, .events-grid, .schedule-grid, .coaches-section, .membership-grid, .about-content, .contact-section'
    );

    if (!content) return;

    gsap.fromTo(content,
      { y: 45, opacity: 0.55 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true
        }
      }
    );
  });

  // 8. IMAGE DEPTH IN FIGHTER AND TRAINING CARDS
  app.querySelectorAll(
    '.fighter-card img, .training-card img, .event-secondary img'
  ).forEach((image) => {
    gsap.fromTo(image,
      { scale: 1.12 },
      {
        scale: 1,
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

  // Refresh once images have loaded and layout is stable.
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  }, { once: true });

  console.log('REDLINE CINEMATIC: 7 animation systems active.');
}

function waitForWebsite() {
  const app = document.querySelector('#app');

  if (app?.querySelector('.hero')) {
    initRedlineCinematic();
    return;
  }

  if (!app) return;

  const observer = new MutationObserver(() => {
    if (app.querySelector('.hero')) {
      observer.disconnect();
      initRedlineCinematic();
    }
  });

  observer.observe(app, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForWebsite, { once: true });
} else {
  waitForWebsite();
}
