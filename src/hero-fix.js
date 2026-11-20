const fixHero = () => {
  const hero = document.querySelector('.hero');

  if (!hero) {
    console.error('REDLINE: Hero section not found');
    return;
  }

  let content = hero.querySelector('.redline-hero-copy');

  if (!content) {
    content = document.createElement('div');
    content.className = 'redline-hero-copy';

    content.innerHTML = `
      <div class="redline-eyebrow">THE ART OF COMBAT</div>

      <h1>BUILT FOR<br><span>THE FIGHT.</span></h1>

      <p>
        Discipline. Strength. Precision.
        Train harder, push further, and discover
        what you're capable of.
      </p>

      <div class="redline-hero-buttons">
        <a href="#booking">BOOK A SESSION</a>
        <a href="#training">EXPLORE TRAINING</a>
      </div>
    `;

    hero.appendChild(content);
  }

  console.log('REDLINE HERO TEXT INSTALLED');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fixHero);
} else {
  fixHero();
}
