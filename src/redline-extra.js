import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const extraCSS = document.createElement('style');
extraCSS.textContent = `
  #redline-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: #e32636;
    z-index: 99999;
    box-shadow: 0 0 12px rgba(227,38,54,.65);
    pointer-events: none;
  }

  .fighter-card,
  .training-card,
  .membership-card,
  .event-feature,
  .event-secondary {
    transform-style: preserve-3d;
    transition:
      transform .45s cubic-bezier(.2,.8,.2,1),
      box-shadow .45s ease;
  }

  .fighter-card:hover,
  .training-card:hover,
  .membership-card:hover,
  .event-feature:hover,
  .event-secondary:hover {
    transform: translateY(-8px);
    box-shadow: 0 22px 45px rgba(0,0,0,.3);
  }

  .fighter-card img,
  .gallery-grid img,
  .training-card img,
  .event-feature img {
    transition: transform .8s cubic-bezier(.2,.7,.2,1),
                filter .6s ease;
  }

  .fighter-card:hover img,
  .gallery-grid img:hover,
  .training-card:hover img,
  .event-feature:hover img {
    transform: scale(1.055);
    filter: brightness(1.05);
  }

  .btn, button, a.button, .nav-cta {
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }

  .btn::after, button::after, a.button::after, .nav-cta::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -120%;
    width: 55%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,.22),
      transparent
    );
    transform: skewX(-22deg);
    transition: left .7s ease;
    pointer-events: none;
    z-index: 2;
  }

  .btn:hover::after,
  button:hover::after,
  a.button:hover::after,
  .nav-cta:hover::after {
    left: 150%;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      transition-duration: .01ms !important;
      animation-duration: .01ms !important;
    }
  }
`;
document.head.appendChild(extraCSS);

if (!document.getElementById('redline-progress')) {
  const bar = document.createElement('div');
  bar.id = 'redline-progress';
  document.body.appendChild(bar);

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}

console.log('REDLINE EXTRA: finishing effects active.');
