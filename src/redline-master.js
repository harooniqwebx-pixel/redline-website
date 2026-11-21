import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initREDLINE() {
  const app = document.querySelector('#app');

  if (!app || !app.querySelector('.hero')) return;
  if (document.documentElement.dataset.redlineMaster === 'active') return;

  document.documentElement.dataset.redlineMaster = 'active';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const style = document.createElement('style');
  style.id = 'redline-master-styles';

  style.textContent = `
    .hero {
      perspective: 1400px;
      transform-style: preserve-3d;
    }

    .hero-image {
      will-change: transform;
    }

    .fighters-section,
    .fighter-grid,
    .fighter-card {
      transform-style: preserve-3d;
    }

    .fighter-card,
    .training-card,
    .membership-card {
      backface-visibility: hidden;
      will-change: transform, opacity;
    }

    .rl-word {
      display: inline-block;
      transform-style: preserve-3d;
    }

    .gallery-section {
      overflow: hidden;
    }

    @media (min-width: 900px) {
      .fighters-section {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: clip;
      }

      .fighters-section .fighter-grid {
        position: relative;
        display: block;
        height: min(56vh, 500px);
        perspective: 1600px;
      }

      .fighters-section .fighter-card {
        position: absolute;
        top: 0;
        left: 50%;
        width: min(29vw, 360px);
        height: 100%;
        margin: 0;
        transform-style: preserve-3d;
      }

      .gallery-section {
        min-height: 100vh;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-top: 9vh;
        padding-bottom: 9vh;
      }

      .gallery-section .gallery-grid {
        display: flex;
        flex-wrap: nowrap;
        gap: 18px;
        width: max-content;
        grid-template-columns: none;
        grid-template-rows: none;
        will-change: transform;
      }

      .gallery-section .gallery-grid img {
        flex: 0 0 min(45vw, 620px);
        width: min(45vw, 620px);
        height: min(56vh, 600px);
        min-height: 380px;
        object-fit: cover;
      }

      .gallery-section .gallery-tall,
      .gallery-section .gallery-wide {
        grid-row: auto;
        grid-column: auto;
      }
    }

    @media (max-width: 899px) {
      .gallery-section {
        overflow: hidden;
      }

      .gallery-section .gallery-grid {
        width: 100%;
      }
    }
  `;

  document.head.appendChild(style);

  // =========================================
  // 1. LAYERED CINEMATIC HERO PARALLAX
  // =========================================

  const hero = app.querySelector('.hero');
  const heroImage = app.querySelector('.hero-image');
  const heroShade = app.querySelector('.hero-shade');
  const heroContent = app.querySelector('.hero-content');

  if (hero && heroImage) {
    gsap.fromTo(heroImage,
      { yPercent: -3, scale: 1.04 },
      {
        yPercent: 22,
        scale: 1.20,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      }
    );
  }

  if (hero && heroShade) {
    gsap.to(heroShade, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  if (hero && heroContent) {
    gsap.to(heroContent, {
      y: -130,
      opacity: 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  }

  // =========================================
  // 2. PINNED FIGHTER SECTION + STACKING CARDS
  // =========================================

  const fighterSection = app.querySelector('.fighters-section');
  const fighterGrid = app.querySelector('.fighter-grid');
  const fighterCards = fighterGrid
    ? [...fighterGrid.querySelectorAll('.fighter-card')]
    : [];

  if (fighterSection && fighterGrid && fighterCards.length >= 3) {
    ScrollTrigger.matchMedia({
      '(min-width: 900px)': function () {
        fighterCards.forEach((card, index) => {
          gsap.set(card, {
            xPercent: -50,
            x: 0,
            y: index * 5,
            rotationY: 0,
            rotationZ: 0,
            scale: index === 1 ? 1 : 0.94,
            z: index === 1 ? 70 : 0,
            zIndex: fighterCards.length - index,
            opacity: 1
          });
        });

        const deck = gsap.timeline({
          scrollTrigger: {
            trigger: fighterSection,
            start: 'top top',
            end: '+=1200',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        deck.to(fighterCards[0], {
          x: () => -Math.min(390, window.innerWidth * 0.30),
          rotationY: 17,
          rotationZ: -4,
          scale: 1,
          z: 0,
          ease: 'power2.inOut'
        }, 0.15);

        deck.to(fighterCards[1], {
          scale: 1.05,
          z: 70,
          ease: 'power2.inOut'
        }, 0.15);

        deck.to(fighterCards[2], {
          x: () => Math.min(390, window.innerWidth * 0.30),
          rotationY: -17,
          rotationZ: 4,
          scale: 1,
          z: 0,
          ease: 'power2.inOut'
        }, 0.15);
      }
    });
  }

  // =========================================
  // 3. 3D ZOOM FOR TRAINING AND MEMBERSHIP CARDS
  // =========================================

  const depthCards = app.querySelectorAll(
    '.training-card, .membership-card, .event-secondary'
  );

  depthCards.forEach((card, index) => {
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 110,
        z: -100,
        scale: 0.82,
        rotateY: index % 2 === 0 ? -12 : 12,
        transformPerspective: 1200
      },
      {
        opacity: 1,
        y: 0,
        z: 0,
        scale: 1,
        rotateY: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          once: true
        }
      }
    );
  });

  // =========================================
  // 4. LINE-BY-LINE HEADING REVEALS
  // Preserve existing nested spans and colours.
  // =========================================

  function splitHeading(heading) {
    if (heading.dataset.rlSplit) return;

    const walker = document.createTreeWalker(
      heading,
      NodeFilter.SHOW_TEXT
    );

    const nodes = [];
    while (walker.nextNode()) {
      if (walker.currentNode.textContent.trim()) {
        nodes.push(walker.currentNode);
      }
    }

    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      const parts = node.textContent.match(/\s+|\S+/g) || [];

      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.className = 'rl-word';
          span.textContent = part;
          fragment.appendChild(span);
        }
      });

      node.parentNode.replaceChild(fragment, node);
    });

    heading.dataset.rlSplit = 'true';

    const words = [...heading.querySelectorAll('.rl-word')];
    const lines = new Map();

    words.forEach((word) => {
      const top = Math.round(word.getBoundingClientRect().top);
      if (!lines.has(top)) lines.set(top, []);
      lines.get(top).push(word);
    });

    [...lines.values()].forEach((line) => {
      gsap.from(line, {
        y: 65,
        opacity: 0,
        rotateX: -35,
        transformOrigin: '50% 100%',
        duration: 0.85,
        stagger: 0.055,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          once: true
        }
      });
    });
  }

  app.querySelectorAll(
    '.section-heading h2, .coach-content h2, .about-content h2'
  ).forEach(splitHeading);

  // =========================================
  // 5. SIDEWAYS TYPOGRAPHY
  // =========================================

  const sideways = app.querySelectorAll(
    '.events-section .section-heading h2, ' +
    '.training-section .section-heading h2, ' +
    '.membership-section .section-heading h2'
  );

  sideways.forEach((heading, index) => {
    gsap.fromTo(heading,
      { x: index % 2 === 0 ? -110 : 110 },
      {
        x: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heading,
          start: 'top bottom',
          end: 'center center',
          scrub: 1
        }
      }
    );
  });

  // =========================================
  // 6. PINNED HORIZONTAL GALLERY
  // =========================================

  const gallerySection = app.querySelector('.gallery-section');
  const gallery = app.querySelector('.gallery-grid');

  if (gallerySection && gallery) {
    ScrollTrigger.matchMedia({
      '(min-width: 900px)': function () {
        const getTravel = () => {
          const sectionStyle = getComputedStyle(gallerySection);
          const horizontalPadding =
            parseFloat(sectionStyle.paddingLeft) +
            parseFloat(sectionStyle.paddingRight);

          const visibleWidth = gallerySection.clientWidth - horizontalPadding;
          return Math.max(0, gallery.scrollWidth - visibleWidth);
        };

        gsap.to(gallery, {
          x: () => -getTravel(),
          ease: 'none',
          scrollTrigger: {
            trigger: gallerySection,
            start: 'top top',
            end: () => '+=' + Math.max(700, getTravel()),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
      }
    });
  }

  // =========================================
  // 7. CINEMATIC IMAGE DEPTH
  // =========================================

  app.querySelectorAll(
    '.fighter-card img, .training-card img, ' +
    '.event-feature img, .event-secondary img, .coach-photo img'
  ).forEach((image) => {
    gsap.fromTo(image,
      { scale: 1.14 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      }
    );
  });

  // =========================================
  // 8. SCHEDULE ROW REVEALS
  // =========================================

  app.querySelectorAll('.schedule-row:not(.schedule-header)').forEach((row) => {
    gsap.fromTo(row,
      { x: 75, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
          once: true
        }
      }
    );
  });

  // =========================================
  // FINAL REFRESH
  // =========================================

  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  }, { once: true });

  console.log('REDLINE MASTER: cinematic GSAP system active.');
}

function boot() {
  const app = document.querySelector('#app');

  if (app?.querySelector('.hero')) {
    initREDLINE();
    return;
  }

  if (!app) return;

  const observer = new MutationObserver(() => {
    if (app.querySelector('.hero')) {
      observer.disconnect();
      initREDLINE();
    }
  });

  observer.observe(app, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
