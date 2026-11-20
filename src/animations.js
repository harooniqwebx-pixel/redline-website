import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  // 1. CINEMATIC 3D HERO
  const hero = document.querySelector('.hero');

  if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const canvas = document.createElement('canvas');
    canvas.className = 'redline-3d-canvas';
    hero.prepend(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const positions = new Float32Array(1800);

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    const particles = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: 0xff2525,
        size: 0.045,
        transparent: true,
        opacity: 0.8
      })
    );

    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;

    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.6;
      mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.6;
    });

    hero.addEventListener('pointerleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    function resizeHero() {
      const width = hero.clientWidth;
      const height = hero.clientHeight;
      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    resizeHero();
    window.addEventListener('resize', resizeHero);

    function animate() {
      requestAnimationFrame(animate);

      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;

      camera.position.x += (mouseX - camera.position.x) * 0.025;
      camera.position.y += (-mouseY - camera.position.y) * 0.025;

      renderer.render(scene, camera);
    }

    animate();
  }

  // 2. 3D TRAINING AND CONTENT CARDS
  const cards = document.querySelectorAll(
    '.card, .training-card, .fighter-card, .gallery-item, .training-grid > *'
  );

  cards.forEach((card) => {
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.2s ease';

    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      card.style.transform =
        `perspective(900px) rotateX(${(0.5-y)*8}deg) rotateY(${(x-0.5)*8}deg) translateY(-5px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform =
        'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // 3. CINEMATIC SCROLL REVEALS
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

    document.querySelectorAll('section h1, section h2').forEach((heading) => {
      gsap.fromTo(heading,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    document.querySelectorAll('section img').forEach((img) => {
      gsap.fromTo(img,
        { scale: 1.08, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 90%',
            once: true
          }
        }
      );
    });

    cards.forEach((card) => {
      gsap.fromTo(card,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true
          }
        }
      );
    });
  }

  requestAnimationFrame(() => ScrollTrigger.refresh());

  console.log('REDLINE: all three animation systems loaded.');
});

// REDLINE HERO MOUSE PARALLAX
const parallaxHero = document.querySelector('.hero');

if (parallaxHero) {
  parallaxHero.addEventListener('pointermove', (event) => {
    const rect = parallaxHero.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    parallaxHero.style.setProperty('--parallax-x', `${x * 12}px`);
    parallaxHero.style.setProperty('--parallax-y', `${y * 8}px`);
  });

  parallaxHero.addEventListener('pointerleave', () => {
    parallaxHero.style.setProperty('--parallax-x', '0px');
    parallaxHero.style.setProperty('--parallax-y', '0px');
  });
}
