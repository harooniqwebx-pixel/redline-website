(() => {
  function init() {
    if (window.__fightersCinemaLoaded) return;
    window.__fightersCinemaLoaded = true;

    const css = document.createElement('style');
    css.textContent = `
      /* STRONGER NAVIGATION */
      nav a, header nav a, .navbar a {
        font-weight: 800 !important;
        letter-spacing: .5px;
        transition: color .25s ease, text-shadow .25s ease;
      }

      nav a:hover, header nav a:hover, .navbar a:hover {
        color: #ff2938 !important;
        text-shadow: 0 0 15px #ff293866;
      }

      /* FIGHTERS CINEMATIC INTRO */
      #fighters {
        position: relative;
        isolation: isolate;
        overflow: hidden;
      }

      #fighters.ge-cinema-started::before {
        content: "";
        position: absolute;
        z-index: 8;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(
          110deg,
          #080808 0%,
          #26060a 45%,
          #080808 100%
        );
        transform: translateX(-110%);
        animation: ge-curtain 1.5s cubic-bezier(.76,0,.18,1) forwards;
      }

      @keyframes ge-curtain {
        0% { transform: translateX(-110%); }
        45% { transform: translateX(0); }
        100% { transform: translateX(110%); }
      }

      .ge-fighters-heading {
        position: relative;
        z-index: 2;
        padding: 15px 0 35px;
        overflow: hidden;
      }

      .ge-fighters-heading .ge-eyebrow {
        display: block;
        color: #ed2635;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: 5px;
        margin-bottom: 15px;
      }

      .ge-fighters-heading h2 {
        font-size: clamp(42px, 7vw, 92px);
        line-height: .95;
        font-weight: 950;
        letter-spacing: -3px;
        text-transform: uppercase;
        margin: 0;
        transform: translateY(65px);
        opacity: 0;
        transition: transform 1s cubic-bezier(.2,.8,.2,1),
                    opacity 1s ease;
      }

      .ge-fighters-heading h2 span {
        color: #ed2635;
      }

      #fighters.ge-cinema-visible .ge-fighters-heading h2 {
        transform: translateY(0);
        opacity: 1;
      }

      #fighters .fighter-card {
        position: relative;
        overflow: hidden;
        transform-style: preserve-3d;
        transition:
          transform .35s ease,
          box-shadow .35s ease,
          border-color .35s ease;
        will-change: transform;
      }

      #fighters .fighter-card img {
        transition: transform .8s cubic-bezier(.2,.7,.2,1),
                    filter .6s ease;
        will-change: transform;
      }

      #fighters.ge-cinema-visible .fighter-card img {
        animation: ge-photo-arrive 1.2s both;
      }

      #fighters.ge-cinema-visible .fighter-card:nth-child(2) img {
        animation-delay: .12s;
      }

      #fighters.ge-cinema-visible .fighter-card:nth-child(3) img {
        animation-delay: .24s;
      }

      @keyframes ge-photo-arrive {
        from { transform: scale(1.22); filter: brightness(.35); }
        to { transform: scale(1); filter: brightness(1); }
      }

      #fighters .fighter-card:hover {
        transform: perspective(1000px) rotateX(2deg) rotateY(-3deg) translateY(-12px);
        box-shadow: 0 25px 60px #0009, 0 0 25px #d7192830;
      }

      #fighters .fighter-card:hover img {
        transform: scale(1.09);
        filter: contrast(1.1);
      }

      /* RED CINEMATIC EDGE */
      #fighters .fighter-card::after {
        content: "";
        position: absolute;
        inset: 0;
        border: 1px solid transparent;
        pointer-events: none;
        transition: border-color .3s ease;
      }

      #fighters .fighter-card:hover::after {
        border-color: #ed2635;
      }

      @media(max-width:700px) {
        .ge-fighters-heading h2 {
          letter-spacing: -1px;
        }
        #fighters .fighter-card:hover {
          transform: translateY(-5px);
        }
      }

      @media(prefers-reduced-motion:reduce) {
        #fighters.ge-cinema-started::before,
        #fighters.ge-cinema-visible .fighter-card img {
          animation: none !important;
        }
        .ge-fighters-heading h2 {
          opacity: 1;
          transform: none;
        }
      }
    `;
    document.head.appendChild(css);

    const fighters = document.querySelector('#fighters');

    if (!fighters) {
      console.warn('Could not find the #fighters section.');
      return;
    }

    // Use the existing heading if one already exists.
    let heading = fighters.querySelector('h2');

    if (!heading) {
      heading = document.createElement('h2');
      heading.textContent = 'MEET THE FIGHTERS';
      fighters.prepend(heading);
    }

    const headingWrap = document.createElement('div');
    headingWrap.className = 'ge-fighters-heading';

    const eyebrow = document.createElement('span');
    eyebrow.className = 'ge-eyebrow';
    eyebrow.textContent = 'DISCIPLINE. STRENGTH. RESPECT.';

    heading.parentNode.insertBefore(headingWrap, heading);
    headingWrap.appendChild(eyebrow);
    headingWrap.appendChild(heading);

    // Cinematic curtain and heading reveal.
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fighters.classList.add('ge-cinema-started');
          fighters.classList.add('ge-cinema-visible');
          observer.disconnect();
        }
      });
    }, { threshold: 0.15 });

    observer.observe(fighters);

    // Background-like parallax on existing fighter photographs.
    const photos = fighters.querySelectorAll('.fighter-card img');

    window.addEventListener('scroll', () => {
      const rect = fighters.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * 0.035;

      photos.forEach((photo, index) => {
        const movement = Math.max(-22, Math.min(22, offset * (index % 2 ? -1 : 1)));
        photo.style.translate = `0 ${movement}px`;
      });
    }, { passive: true });

    // Interactive 3D card movement.
    fighters.querySelectorAll('.fighter-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (window.innerWidth < 700) return;

        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;

        card.style.transform =
          `perspective(1000px) rotateX(${-y * 7}deg) rotateY(${x * 8}deg) translateY(-8px)`;
      });

      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });

    console.log('REDLINE MEET THE FIGHTERS cinematic sequence ready.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
