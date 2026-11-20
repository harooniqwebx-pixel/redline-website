import './style.css';

const photos = {
  hero: 'https://ringside24.com/media/post/lebedev_2.jpg',
  fighter1: 'https://cdn.shopify.com/s/files/1/1147/5966/files/Dmitry_Bivol_Unfinished_Business_1024x1024.jpg?v=1738182042',
  fighter2: 'https://www.olympic.uz/storage/uploads/news/efdb3ec949c6b8552c63b79cb12d3d9e.jpg',
  fighter3: 'https://images.squarespace-cdn.com/content/v1/6431b641d7c6bb38963d5510/d4da91ad-b1a2-4726-a123-5e15c23042ff/DSC09371.jpg',
  training1: 'https://www.honourandglory.co.uk/images/blog/what-to-wear-to-a-boxing-class-inline-3.jpg',
  training2: 'https://static.tildacdn.one/tild6263-6632-4362-b130-396337366363/5199634026292438644.jpg',
  training3: 'https://images.pexels.com/photos/5750838/pexels-photo-5750838.jpeg?auto=compress&cs=tinysrgb&w=1400',
  event1: 'https://photo.boxingscene.com/uploads/oleksandr-usyk_5.jpg',
  event2: 'https://shop.chapelboxing.com/cdn/shop/files/Screenshot_2025-04-08_at_3.33.32_pm.png?v=1744097879&width=1946',
  gallery1: 'https://thefightclub.com.au/cdn/shop/files/Champy-T-Shirt-Black_04.jpg?v=1775206142&width=1946',
  gallery2: 'https://uk.boxraw.com/cdn/shop/files/ABC-PDP-Storytelling-1.png?v=1692178134&width=1920',
  gallery3: 'https://surkovboxing.ru/thumb/2/xDnJu4f0f4Hj6ghk5yfmXA/1920r1920/d/img_1016.jpg',
  gallery4: 'https://images.squarespace-cdn.com/content/v1/5e43813f08f1cd0315d27f72/1624598633567-UHF42ABIXSVKGOQYNC62/1J7A0849.jpg',
  gallery5: 'https://images.pexels.com/photos/4401634/pexels-photo-4401634.jpeg?auto=compress&cs=tinysrgb&w=1400',
  coach: 'https://images.pexels.com/photos/9944851/pexels-photo-9944851.jpeg?auto=compress&cs=tinysrgb&w=1400',
  about: 'https://images.pexels.com/photos/6295830/pexels-photo-6295830.jpeg?auto=compress&cs=tinysrgb&w=1800'
};

const image = (src, alt, extra = '') =>
  `<img src="${src}" alt="${alt}" class="${extra}" loading="lazy">`;

const navItems = [
  ['Home', 'home'],
  ['Fighters', 'fighters'],
  ['Training', 'training'],
  ['Events', 'events'],
  ['Schedule', 'schedule'],
  ['Gallery', 'gallery'],
  ['Coaches', 'coaches'],
  ['Membership', 'membership'],
  ['About', 'about'],
  ['Contact', 'contact']
];

document.querySelector('#app').innerHTML = `
<header class="navbar">
  <a class="logo" href="#home">RED<span>LINE</span><small>THE ART OF COMBAT</small></a>
  <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button>
  <nav class="nav-links">
    ${navItems.map(([name,id]) => `<a href="#${id}">${name}</a>`).join('')}
  </nav>
  <a href="#membership" class="nav-cta">JOIN THE TEAM ↗</a>
</header>

<main>
<section id="home" class="hero">
  ${image(photos.hero, 'Combat sports athlete in a dramatic training setting', 'hero-image parallax-image')}
  <div class="hero-shade"></div>
  <div class="hero-content">
    <p class="eyebrow">DISCIPLINE. STRENGTH. RESPECT.</p>
    <h1>THE ART<br>OF <span>COMBAT.</span></h1>
    <p class="hero-description">You don't become a fighter overnight.<br>You earn it every single day.</p>
    <div class="hero-actions">
      <a class="button button-red" href="#training">EXPLORE TRAINING ↗</a>
      <a class="button button-outline" href="#about">OUR PHILOSOPHY</a>
    </div>
  </div>
  <div class="hero-bottom"><span>01 / 10</span><span>SCROLL TO DISCOVER ↓</span><span>EST. FOR THE DISCIPLINED</span></div>
  <div class="hero-vertical">NO EXCUSES. JUST WORK.</div>
</section>

<section id="fighters" class="section fighters-section">
  <div class="section-heading">
    <div><p class="eyebrow">BUILT THROUGH DISCIPLINE</p><h2>MEET THE <span>FIGHTERS.</span></h2></div>
    <p>Different journeys. One mindset.<br>Meet the people who represent REDLINE.</p>
  </div>
  <div class="fighter-grid">
    <article class="fighter-card">
      ${image(photos.fighter1, 'Athlete training in a gym')}
      <div class="fighter-info"><span>01 / STRIKING</span><h3>THE STRIKER</h3><p>Speed. Precision. Control.</p></div>
    </article>
    <article class="fighter-card">
      ${image(photos.fighter2, 'Strength and conditioning athlete')}
      <div class="fighter-info"><span>02 / CONDITIONING</span><h3>THE MACHINE</h3><p>Power built through consistency.</p></div>
    </article>
    <article class="fighter-card">
      ${image(photos.fighter3, 'Athlete building strength')}
      <div class="fighter-info"><span>03 / DISCIPLINE</span><h3>THE WARRIOR</h3><p>Focus beyond the limits.</p></div>
    </article>
  </div>
</section>

<section id="training" class="section training-section">
  <div class="section-heading">
    <div><p class="eyebrow">FIND YOUR STRENGTH</p><h2>TRAIN WITH <span>PURPOSE.</span></h2></div>
    <p>Every session has a purpose.<br>Every movement makes a difference.</p>
  </div>
  <div class="training-grid">
    <article class="training-card">
      ${image(photos.training1, 'Modern athletic training facility')}
      <div class="training-copy"><span>01</span><h3>BOXING</h3><p>Footwork, combinations, timing and technique.</p><a href="#contact">DISCOVER ↗</a></div>
    </article>
    <article class="training-card">
      ${image(photos.training2, 'Athlete working through a training session')}
      <div class="training-copy"><span>02</span><h3>CONDITIONING</h3><p>Build endurance, strength and resilience.</p><a href="#contact">DISCOVER ↗</a></div>
    </article>
    <article class="training-card">
      ${image(photos.training3, 'Athlete performing physical training')}
      <div class="training-copy"><span>03</span><h3>MMA FITNESS</h3><p>Develop balance, coordination and control.</p><a href="#contact">DISCOVER ↗</a></div>
    </article>
  </div>
</section>

<section id="events" class="section events-section">
  <div class="section-heading">
    <div><p class="eyebrow">THE MOMENTS THAT DEFINE US</p><h2>BUILT FOR THE <span>MOMENT.</span></h2></div>
    <p>Competition brings out the best.<br>Preparation makes it possible.</p>
  </div>
  <div class="events-grid">
    <article class="event-feature">
      ${image(photos.event1, 'Athletic competition atmosphere')}
      <div class="event-copy"><span>REDLINE / FEATURE EVENT</span><h3>THE FIGHT<br>BEGINS HERE.</h3><a href="#contact">EVENT INFORMATION ↗</a></div>
    </article>
    <article class="event-secondary">
      ${image(photos.event2, 'Athlete training for competition')}
      <div><span>COMMUNITY • COMPETITION</span><h3>MORE THAN A MATCH.</h3><p>Every event is an opportunity to learn, grow and show what discipline means.</p></div>
    </article>
  </div>
</section>

<section id="schedule" class="section schedule-section">
  <div class="section-heading">
    <div><p class="eyebrow">SHOW UP. PUT IN THE WORK.</p><h2>THE <span>SCHEDULE.</span></h2></div>
    <p>Consistency creates progress.<br>Make time for your training.</p>
  </div>
  <div class="schedule-list">
    <div class="schedule-row schedule-header"><span>DAY</span><span>SESSION</span><span>TIME</span><span>LEVEL</span></div>
    <div class="schedule-row"><strong>MONDAY</strong><span>Boxing Fundamentals</span><span>5:00 PM</span><span>ALL LEVELS</span></div>
    <div class="schedule-row"><strong>TUESDAY</strong><span>Strength & Conditioning</span><span>6:00 PM</span><span>ALL LEVELS</span></div>
    <div class="schedule-row"><strong>WEDNESDAY</strong><span>Striking Technique</span><span>5:30 PM</span><span>INTERMEDIATE</span></div>
    <div class="schedule-row"><strong>THURSDAY</strong><span>Combat Fitness</span><span>6:00 PM</span><span>ALL LEVELS</span></div>
    <div class="schedule-row"><strong>FRIDAY</strong><span>Open Training</span><span>5:00 PM</span><span>ALL LEVELS</span></div>
    <div class="schedule-row"><strong>SATURDAY</strong><span>Team Training</span><span>10:00 AM</span><span>ALL LEVELS</span></div>
  </div>
  <p class="schedule-note">* DEMONSTRATION SCHEDULE — CONFIRM ACTUAL CLASS TIMES WITH THE GYM.</p>
</section>

<section id="gallery" class="section gallery-section">
  <div class="section-heading">
    <div><p class="eyebrow">NO FILTER. ALL DISCIPLINE.</p><h2>INSIDE THE <span>REDLINE.</span></h2></div>
    <p>The work. The focus. The community.<br>Captured in motion.</p>
  </div>
  <div class="gallery-grid">
    ${image(photos.gallery1, 'Athletic training moment', 'gallery-tall')}
    ${image(photos.gallery2, 'Strength training photography')}
    ${image(photos.gallery3, 'Gym and fitness atmosphere')}
    ${image(photos.gallery4, 'Athlete workout photography', 'gallery-wide')}
    ${image(photos.gallery5, 'Fitness training moment')}
  </div>
</section>

<section id="coaches" class="section coaches-section">
  <div class="coach-photo">${image(photos.coach, 'Athletic coach training in a gym')}</div>
  <div class="coach-content">
    <p class="eyebrow">EXPERIENCE MEETS DISCIPLINE</p>
    <h2>LEARN FROM<br>THE <span>BEST.</span></h2>
    <p>Great training starts with great guidance. Develop your technique, improve your fitness and build confidence with a team that values progress.</p>
    <a class="button button-red" href="#contact">MEET THE TEAM ↗</a>
  </div>
</section>

<section id="membership" class="section membership-section">
  <div class="section-heading">
    <div><p class="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>CLAIM YOUR <span>SPACE.</span></h2></div>
    <p>Start where you are.<br>Build into who you want to become.</p>
  </div>
  <div class="membership-grid">
    <article class="membership-card"><span>01 / START</span><h3>FOUNDATION</h3><p>For those beginning their training journey.</p><ul><li>Fundamentals training</li><li>Fitness development</li><li>Technique sessions</li></ul><a href="#contact">GET STARTED ↗</a></article>
    <article class="membership-card featured"><span>02 / PROGRESS</span><h3>PERFORMANCE</h3><p>For those ready to take their training further.</p><ul><li>Structured training</li><li>Skill development</li><li>Conditioning sessions</li></ul><a href="#contact">GET STARTED ↗</a></article>
    <article class="membership-card"><span>03 / COMMIT</span><h3>COMPETITOR</h3><p>For dedicated athletes with bigger goals.</p><ul><li>Advanced development</li><li>Competition preparation</li><li>Performance guidance</li></ul><a href="#contact">GET STARTED ↗</a></article>
  </div>
  <p class="schedule-note">MEMBERSHIP PRICES AND AVAILABILITY TO BE CONFIRMED.</p>
</section>

<section id="about" class="section about-section">
  ${image(photos.about, 'Athlete training with determination', 'about-image parallax-image')}
  <div class="about-overlay"></div>
  <div class="about-content"><p class="eyebrow">THIS IS MORE THAN A GYM</p><h2>DISCIPLINE<br>IS <span>POWER.</span></h2><p>REDLINE stands for commitment, respect and the courage to improve. It's not about where you start. It's about how much you're willing to grow.</p><a href="#contact" class="button button-red">BECOME PART OF REDLINE ↗</a></div>
</section>

<section id="contact" class="section contact-section">
  <div><p class="eyebrow">YOUR MOVE STARTS NOW</p><h2>READY TO<br><span>STEP UP?</span></h2><p>Take the first step. Get in touch and discover your next training chapter.</p></div>
  <div class="contact-details">
    <a href="mailto:hello@redline.com">EMAIL US ↗<strong>hello@redline.com</strong></a>
    <a href="#home">BACK TO TOP ↑<strong>RETURN TO REDLINE</strong></a>
  </div>
</section>
</main>

<footer class="footer"><a class="logo" href="#home">RED<span>LINE</span><small>THE ART OF COMBAT</small></a><p>DISCIPLINE. STRENGTH. RESPECT.</p><span>© 2026 REDLINE. ALL RIGHTS RESERVED.</span></footer>
`;

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? '✕' : '☰';
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.textContent = '☰';
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-heading, .fighter-card, .training-card, .event-feature, .event-secondary, .schedule-row, .gallery-grid img, .coach-content, .membership-card, .about-content, .contact-section > *').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

const sections = document.querySelectorAll('main section[id]');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      nav.querySelectorAll('a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach(section => navObserver.observe(section));

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      document.querySelectorAll('.parallax-image').forEach(img => {
        const rect = img.parentElement.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const distance = (window.innerHeight - rect.top) * 0.12;
          img.style.setProperty('--parallax-y', `${distance}px`);
        }
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
import './animations.js';
import './hero-fix.js';
import './redline-effects.js';

import './golden-eagle.js';

import './fighters-cinema.js';
