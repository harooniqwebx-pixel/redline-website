import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let renderer;
let animationFrame;
let resizeHandler;

export function initRedlineScene() {
  const hero = document.querySelector(".hero");
  if (!hero || hero.dataset.redline3d === "true") return;

  hero.dataset.redline3d = "true";

  const background = hero.querySelector(".hero-background");
  const content = hero.querySelector(".hero-content");
  const shade = hero.querySelector(".hero-shade");

  hero.style.position = "relative";
  hero.style.isolation = "isolate";

  if (background) {
    background.style.zIndex = "0";
    background.style.willChange = "transform";
  }

  if (shade) shade.style.zIndex = "1";

  // Create the visible 3D canvas
  const canvas = document.createElement("canvas");
  canvas.id = "redline-three-canvas";

  Object.assign(canvas.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    zIndex: "2",
    pointerEvents: "none"
  });

  hero.appendChild(canvas);

  if (content) {
    content.style.position = "relative";
    content.style.zIndex = "5";
  }

  const sideLabels = hero.querySelectorAll(
    ".hero-side-label, .hero-index"
  );

  sideLabels.forEach(el => {
    el.style.zIndex = "5";
    el.style.position = "relative";
  });

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
  } catch (error) {
    console.warn("WebGL unavailable:", error);
    canvas.remove();
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 11;

  scene.add(new THREE.AmbientLight(0xffffff, 1.5));

  const redLight = new THREE.PointLight(0xff1028, 100, 30);
  redLight.position.set(3, 2, 5);
  scene.add(redLight);

  const whiteLight = new THREE.PointLight(0xffffff, 30, 20);
  whiteLight.position.set(-4, 3, 4);
  scene.add(whiteLight);

  // 3D ARENA STRUCTURE
  const arena = new THREE.Group();
  arena.position.set(3.1, 0, 0);
  scene.add(arena);

  const redMaterial = new THREE.MeshBasicMaterial({
    color: 0xff1535,
    wireframe: true,
    transparent: true,
    opacity: 0.75
  });

  const rings = [];

  for (let i = 0; i < 4; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(
        1.5 + i * 0.45,
        0.012,
        8,
        120
      ),
      redMaterial
    );

    ring.rotation.x = i * 0.35;
    ring.rotation.y = i * 0.25;

    arena.add(ring);
    rings.push(ring);
  }

  // Central 3D geometric object
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.85, 2),
    new THREE.MeshBasicMaterial({
      color: 0xff203c,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    })
  );

  arena.add(core);

  // Floating particles
  const particleCount = 1400;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 11;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  const particleGeometry = new THREE.BufferGeometry();

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xff2945,
    size: 0.045,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(
    particleGeometry,
    particleMaterial
  );

  scene.add(particles);

  // Resize
  resizeHandler = () => {
    const width = hero.clientWidth;
    const height = hero.clientHeight;

    if (!width || !height) return;

    renderer.setSize(width, height, false);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    arena.position.x = width < 650 ? 1.8 : 3.1;
    arena.scale.setScalar(width < 650 ? 0.65 : 1);
  };

  window.addEventListener("resize", resizeHandler);
  resizeHandler();

  // MOUSE PARALLAX
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  hero.addEventListener("pointermove", event => {
    if (reducedMotion || event.pointerType === "touch") return;

    const rect = hero.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(arena.rotation, {
      y: x * 0.5,
      x: -y * 0.35,
      duration: 0.8,
      overwrite: true
    });

    gsap.to(camera.position, {
      x: x * 0.45,
      y: -y * 0.3,
      duration: 1,
      overwrite: true
    });

    if (background) {
      gsap.to(background, {
        x: -x * 28,
        y: -y * 18,
        duration: 0.8,
        overwrite: true
      });
    }

    if (content) {
      gsap.to(content, {
        x: -x * 9,
        y: -y * 5,
        duration: 1,
        overwrite: true
      });
    }
  });

  hero.addEventListener("pointerleave", () => {
    gsap.to(arena.rotation, {
      x: 0,
      y: 0,
      duration: 1
    });

    gsap.to(camera.position, {
      x: 0,
      y: 0,
      duration: 1
    });

    if (background) {
      gsap.to(background, {
        x: 0,
        y: 0,
        duration: 1
      });
    }

    if (content) {
      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 1
      });
    }
  });

  // Scroll depth for hero
  if (!reducedMotion) {
    gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    })
    .to(arena.position, { y: -1.5, ease: "none" }, 0)
    .to(particles.rotation, { z: 0.4, ease: "none" }, 0);

    if (background) {
      gsap.to(background, {
        y: 140,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    }
  }

  // Animation loop
  const clock = new THREE.Clock();

  function animate() {
    animationFrame = requestAnimationFrame(animate);

    if (!reducedMotion) {
      const t = clock.getElapsedTime();

      rings.forEach((ring, i) => {
        ring.rotation.z = t * (0.12 + i * 0.035);
      });

      core.rotation.x = t * 0.3;
      core.rotation.y = t * 0.4;

      particles.rotation.y = t * 0.018;
      particles.rotation.x = Math.sin(t * 0.2) * 0.05;

      arena.position.y +=
        (Math.sin(t * 0.7) * 0.15 - arena.position.y) * 0.015;

      redLight.intensity = 100 + Math.sin(t * 2) * 20;
    }

    renderer.render(scene, camera);
  }

  animate();

  // Initial render
  renderer.render(scene, camera);

  window.addEventListener("pagehide", () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener("resize", resizeHandler);
    renderer.dispose();
    particleGeometry.dispose();
    particleMaterial.dispose();
    redMaterial.dispose();
  }, { once: true });
}


// IMAGE STACKING + SCROLL ANIMATIONS
export function initRedlineScroll() {
  const cards = gsap.utils.toArray(".feature-card");

  // Guarantee photographs inside the cards
  const images = [
    "/images/athlete-1.jpg",
    "/images/athlete-2.jpg",
    "/images/athlete-3.jpg"
  ];

  cards.forEach((card, index) => {
    if (!card.querySelector(".feature-card-photo")) {
      const img = document.createElement("img");

      img.className = "feature-card-photo";
      img.src = images[index % images.length];
      img.alt = ["REDLINE fighters", "Athletic training", "Performance club"][index % 3];
      img.loading = "lazy";

      card.prepend(img);
    }
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // IMAGE CARDS STACKING
  cards.forEach((card, index) => {
    card.style.zIndex = String(index + 1);

    if (index < cards.length - 1) {
      gsap.to(card, {
        scale: 0.92,
        opacity: 0.55,
        transformOrigin: "center top",
        ease: "none",
        scrollTrigger: {
          trigger: cards[index + 1],
          start: "top 75%",
          end: "top 25%",
          scrub: true
        }
      });
    }

    // Photograph depth animation
    const photo = card.querySelector(".feature-card-photo");

    if (photo) {
      gsap.fromTo(
        photo,
        { scale: 1.18 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "center center",
            scrub: true
          }
        }
      );
    }
  });

  // Section reveal
  gsap.utils.toArray(
    ".intro-layout, .statement, .section-tag, .info-card, .price-card, .gallery-image"
  ).forEach(element => {
    gsap.fromTo(
      element,
      { y: 65, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  ScrollTrigger.refresh();
}
