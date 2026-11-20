#!/bin/bash

set -e

# Create all ten website pages
for page in home fighters training events schedule gallery coaches membership about contact
do
  if [ "$page" = "home" ]; then
    filename="index.html"
  else
    filename="$page.html"
  fi

  cat > "$filename" <<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#090909">
  <meta name="description" content="REDLINE — Elite combat sports, training and athletic performance.">
  <title>REDLINE | $page</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://images.unsplash.com">
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
</head>
<body data-page="$page">
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
HTML
done

mkdir -p src

cat > src/main.js <<'JS'
const pages = {
  home: {
    label: "THE NEXT GENERATION",
    title: "BUILT TO<br>RISE.<br><span>READY FOR MORE.</span>",
    description: "Discipline. Power. Determination. Welcome to a new standard of combat sports and athletic performance.",
    image: "https://images.pexels.com/photos/17400108/pexels-photo-17400108.jpeg?auto=compress&cs=tinysrgb&w=1800",
    button: "DISCOVER REDLINE",
    heading: "MORE THAN A FIGHT.",
    sub: "A DIFFERENT MINDSET.",
    intro: "REDLINE is built around discipline, confidence, athletic performance and the pursuit of excellence.",
    cards: [
      ["01", "THE FIGHTERS", "Meet the athletes and discover their stories.", "fighters.html", "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=900"],
      ["02", "TRAINING", "Explore programs built around performance.", "training.html", "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900"],
      ["03", "EVENTS", "Discover upcoming events and experiences.", "events.html", "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900"]
    ]
  },
  fighters: {
    label: "MEET THE ATHLETES",
    title: "BUILT BY<br><span>DEDICATION.</span>",
    description: "Meet the athletes, their backgrounds, their ambitions and the journeys that brought them here.",
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?w=1800",
    button: "MEET THE TEAM",
    heading: "THE PEOPLE BEHIND THE PERFORMANCE.",
    sub: "MEET OUR ATHLETES.",
    intro: "Every athlete has a story. Explore the people, personalities and discipline that make REDLINE."
  },
  training: {
    label: "YOUR NEXT CHAPTER STARTS HERE",
    title: "TRAIN<br>WITH <span>PURPOSE.</span>",
    description: "Build confidence, improve fitness and develop athletic skills in a focused training environment.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800",
    button: "EXPLORE TRAINING",
    heading: "FIND YOUR PROGRAM.",
    sub: "MOVE WITH PURPOSE.",
    intro: "From conditioning to athletic development, explore programs designed to help you progress."
  },
  events: {
    label: "THE REDLINE EXPERIENCE",
    title: "THE ENERGY.<br>THE MOMENT.<br><span>THE ARENA.</span>",
    description: "Discover sporting events, athlete showcases and special experiences from the REDLINE community.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1800",
    button: "EXPLORE EVENTS",
    heading: "EVERY EVENT HAS A STORY.",
    sub: "BE PART OF IT.",
    intro: "Discover the latest announcements, showcases and community events."
  },
  schedule: {
    label: "PLAN YOUR WEEK",
    title: "MAKE TIME<br>TO <span>PROGRESS.</span>",
    description: "Find your next session and build consistency into your weekly routine.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800",
    button: "VIEW SCHEDULE",
    heading: "YOUR WEEK AT REDLINE.",
    sub: "SHOW UP. KEEP GROWING.",
    intro: "Explore our sample weekly training timetable. Session availability can be confirmed with the team."
  },
  gallery: {
    label: "INSIDE REDLINE",
    title: "THE WORK.<br>THE FOCUS.<br><span>THE CULTURE.</span>",
    description: "A visual look at athletic performance, training, teamwork and the REDLINE atmosphere.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1800",
    button: "VIEW GALLERY",
    heading: "CAPTURED MOMENTS.",
    sub: "REAL SPORT. REAL STORIES.",
    intro: "Explore the atmosphere, the dedication and the community behind the brand."
  },
  coaches: {
    label: "EXPERIENCE MEETS PASSION",
    title: "LEARN FROM<br><span>THE BEST.</span>",
    description: "Meet the people who help athletes develop skills, confidence and consistency.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1800",
    button: "MEET THE COACHES",
    heading: "GUIDANCE THAT MATTERS.",
    sub: "BUILT ON EXPERIENCE.",
    intro: "Great coaching is about communication, commitment and helping people reach their potential."
  },
  membership: {
    label: "YOUR JOURNEY STARTS HERE",
    title: "INVEST IN<br><span>YOURSELF.</span>",
    description: "Discover membership options and find a training experience that fits your goals.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800",
    button: "VIEW MEMBERSHIP",
    heading: "CHOOSE YOUR PATH.",
    sub: "MAKE YOUR MOVE.",
    intro: "Explore sample membership options. Pricing and availability can be confirmed with REDLINE."
  },
  about: {
    label: "THE REDLINE STORY",
    title: "A BRAND.<br>A MINDSET.<br><span>A STANDARD.</span>",
    description: "We believe in discipline, personal growth, athletic ambition and the strength of community.",
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?w=1800",
    button: "OUR STORY",
    heading: "WHAT REDLINE STANDS FOR.",
    sub: "MORE THAN A NAME.",
    intro: "REDLINE represents the commitment to keep learning, improving and showing up."
  },
  contact: {
    label: "LET'S CONNECT",
    title: "YOUR NEXT<br>MOVE <span>STARTS HERE.</span>",
    description: "Questions about programs, membership or events? Get in touch with the REDLINE team.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800",
    button: "CONTACT US",
    heading: "START A CONVERSATION.",
    sub: "WE'RE READY TO LISTEN.",
    intro: "Send us a message and let us know what you are interested in."
  }
};

const nav = [
  ["HOME", "index.html", "home"],
  ["FIGHTERS", "fighters.html", "fighters"],
  ["TRAINING", "training.html", "training"],
  ["EVENTS", "events.html", "events"],
  ["SCHEDULE", "schedule.html", "schedule"],
  ["GALLERY", "gallery.html", "gallery"],
  ["COACHES", "coaches.html", "coaches"],
  ["MEMBERSHIP", "membership.html", "membership"],
  ["ABOUT", "about.html", "about"],
  ["CONTACT", "contact.html", "contact"]
];

const current = document.body.dataset.page || "home";
const page = pages[current] || pages.home;

const app = document.querySelector("#app");

function cardHTML(card, index) {
  return `
    <a class="feature-card" href="${card[3] || 'training.html'}">
      <div class="feature-image" style="background-image:url('${card[4] || page.image}')"></div>
      <div class="card-number">${card[0] || "0" + (index + 1)}</div>
      <div class="feature-info">
        <h3>${card[1]}</h3>
        <p>${card[2]}</p>
        <span class="arrow">EXPLORE ↗</span>
      </div>
    </a>`;
}

function extraContent() {
  if (current === "schedule") {
    return `
      <div class="schedule">
        ${["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"].map((day,i)=>`
          <div class="schedule-row">
            <strong>${day}</strong>
            <span>${["Fitness & Conditioning","Athletic Development","Strength & Mobility","Fitness & Conditioning","Performance Training","Open Training"][i]}</span>
            <span>${i===5?"10:00 AM":"6:00 PM"}</span>
          </div>`).join("")}
      </div>`;
  }

  if (current === "membership") {
    return `
      <div class="feature-grid">
        ${[
          ["STARTER","Introductory training experience","Contact for pricing"],
          ["PERFORMANCE","Expanded training experience","Contact for pricing"],
          ["ELITE","Advanced training experience","Contact for pricing"]
        ].map((x,i)=>`
          <article class="price-card">
            <span class="eyebrow">OPTION 0${i+1}</span>
            <h3>${x[0]}</h3><p>${x[1]}</p>
            <div class="price">${x[2]}</div>
            <a class="text-link" href="contact.html">ASK ABOUT THIS ↗</a>
          </article>`).join("")}
      </div>`;
  }

  if (current === "contact") {
    return `
      <form class="contact-form" id="contact-form">
        <label>Your name<input required name="name" placeholder="Your name"></label>
        <label>Email address<input required type="email" name="email" placeholder="you@example.com"></label>
        <label>What are you interested in?
          <select name="interest">
            <option>Training</option><option>Membership</option><option>Events</option><option>General question</option>
          </select>
        </label>
        <label>Your message<textarea required name="message" rows="5" placeholder="Write your message..."></textarea></label>
        <button class="primary-button" type="submit">SEND MESSAGE ↗</button>
        <p id="form-status" class="form-status"></p>
      </form>`;
  }

  if (current === "gallery") {
    const images = [
      "photo-1549719386-74dfcbf7dbed",
      "photo-1517836357463-d25dfeac3438",
      "photo-1583454110551-21f2fa2afe61",
      "photo-1571019613454-1cb2f99b2d8b",
      "photo-1534438327276-14e5300c3a48",
      "photo-1549476464-37392f717541"
    ];
    return `<div class="gallery-grid">${images.map((id,i)=>`
      <div class="gallery-image gallery-${i+1}">
        <img src="https://images.unsplash.com/${id}?w=900" alt="REDLINE sports photography" loading="lazy">
      </div>`).join("")}</div>`;
  }

  if (current === "fighters" || current === "coaches") {
    const names = current === "fighters"
      ? ["THE DISCIPLINED","THE DETERMINED","THE RISING"]
      : ["TECHNIQUE","PERFORMANCE","DEVELOPMENT"];
    return `<div class="feature-grid">
      ${names.map((name,i)=>`
        <article class="info-card">
          <span class="eyebrow">0${i+1} / REDLINE</span>
          <h3>${name}</h3>
          <p>${current==="fighters"?"Athletic ambition, focus and dedication.":"Guidance, knowledge and a commitment to improvement."}</p>
        </article>`).join("")}
    </div>`;
  }

  if (current === "training") {
    return `<div class="feature-grid">
      ${[
        ["CONDITIONING","Build endurance and improve fitness."],
        ["STRENGTH","Develop strength and athletic foundations."],
        ["MOBILITY","Improve movement and flexibility."]
      ].map((x,i)=>`
        <article class="info-card"><span class="eyebrow">PROGRAM 0${i+1}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join("")}
    </div>`;
  }

  if (current === "events") {
    return `<div class="feature-grid">
      ${[
        ["ATHLETE SHOWCASE","A community celebration of athletic achievement."],
        ["TRAINING DAY","A focused day of learning and development."],
        ["COMMUNITY MEETUP","Connect with the REDLINE community."]
      ].map((x,i)=>`
        <article class="info-card"><span class="eyebrow">EVENT 0${i+1}</span><h3>${x[0]}</h3><p>${x[1]}</p><a class="text-link" href="contact.html">ENQUIRE ↗</a></article>`).join("")}
    </div>`;
  }

  return `<div class="feature-grid">
    <article class="info-card"><span class="eyebrow">01 / DISCIPLINE</span><h3>SHOW UP.</h3><p>Consistency creates progress.</p></article>
    <article class="info-card"><span class="eyebrow">02 / PERFORMANCE</span><h3>KEEP MOVING.</h3><p>Build your skills and confidence.</p></article>
    <article class="info-card"><span class="eyebrow">03 / COMMUNITY</span><h3>GROW TOGETHER.</h3><p>Be part of something bigger.</p></article>
  </div>`;
}

app.innerHTML = `
  <header class="header">
    <a class="brand" href="index.html">RED<span>LINE</span><small>PERFORMANCE CLUB</small></a>
    <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <nav class="navigation" aria-label="Main navigation">
      ${nav.map(([name,url,key])=>`<a href="${url}" class="${current===key?'active':''}">${name}</a>`).join("")}
    </nav>
    <a href="contact.html" class="header-cta">JOIN THE MOVEMENT ↗</a>
  </header>

  <main>
    <section class="hero">
      <div class="hero-background" style="background-image:url('${page.image}')"></div>
      <div class="hero-shade"></div>
      <div class="hero-content">
        <div class="eyebrow"><span class="red-dot"></span>${page.label}</div>
        <h1>${page.title}</h1>
        <p>${page.description}</p>
        <a href="${current==="home"?"about.html":current==="contact"?"contact.html":"#content"}" class="primary-button">${page.button} ↗</a>
        <div class="hero-bottom">DISCIPLINE / PERFORMANCE / COMMUNITY</div>
      </div>
      <div class="hero-side-label">EST. REDLINE — NEVER STAND STILL</div>
      <div class="hero-index">01 <span>/ 10</span></div>
    </section>

    <section class="intro-section" id="content">
      <div class="section-tag">01 — THE REDLINE STANDARD</div>
      <div class="intro-layout">
        <h2>${page.heading}<br><span>${page.sub}</span></h2>
        <p>${page.intro}</p>
      </div>
      ${current==="home" ? `<div class="feature-grid">${page.cards.map(cardHTML).join("")}</div>` : extraContent()}
    </section>

    <section class="statement">
      <span>REDLINE / THE STANDARD</span>
      <h2>FOCUS YOUR ENERGY.<br><span>DEFINE YOUR FUTURE.</span></h2>
      <a href="contact.html" class="primary-button">GET IN TOUCH ↗</a>
    </section>
  </main>

  <footer class="footer">
    <div>
      <a class="brand footer-brand" href="index.html">RED<span>LINE</span><small>PERFORMANCE CLUB</small></a>
      <p>Discipline. Performance. Community.</p>
    </div>
    <div class="footer-links">${nav.map(([name,url])=>`<a href="${url}">${name}</a>`).join("")}</div>
    <div class="copyright">© 2026 REDLINE. DEMONSTRATION WEBSITE.</div>
  </footer>
`;

const menu = document.querySelector(".menu-toggle");
menu.addEventListener("click", () => {
  const navElement = document.querySelector(".navigation");
  const opened = navElement.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(opened));
  menu.textContent = opened ? "✕" : "☰";
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({behavior:"smooth"});
    }
  });
});

const form = document.querySelector("#contact-form");
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    document.querySelector("#form-status").textContent =
      "Thanks! This demo form is ready to connect to an email service.";
    form.reset();
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12});

document.querySelectorAll(".feature-card,.info-card,.price-card,.schedule-row,.gallery-image").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});
JS

cat > style.css <<'CSS'
:root {
  --red:#e32929;
  --black:#090909;
  --panel:#111111;
  --white:#f4f4f4;
  --muted:#999;
}

* { margin:0; padding:0; box-sizing:border-box; }

html { scroll-behavior:smooth; }

body {
  background:var(--black);
  color:var(--white);
  font-family:'Inter',sans-serif;
  overflow-x:hidden;
}

a { color:inherit; text-decoration:none; }

.header {
  height:88px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 5.5%;
  background:#090909;
  border-bottom:1px solid #262626;
  position:relative;
  z-index:20;
}

.brand {
  font-family:'Barlow Condensed',sans-serif;
  font-size:36px;
  font-weight:900;
  letter-spacing:2px;
  line-height:.8;
}

.brand span { color:var(--red); }

.brand small {
  display:block;
  font-family:'Inter',sans-serif;
  font-size:8px;
  letter-spacing:3px;
  color:#888;
  margin-top:9px;
}

.navigation {
  display:flex;
  gap:21px;
  align-items:center;
}

.navigation a {
  font-size:9px;
  letter-spacing:1.2px;
  font-weight:700;
  color:#aaa;
  transition:.25s;
}

.navigation a:hover,.navigation a.active { color:var(--red); }

.header-cta {
  background:var(--red);
  padding:14px 18px;
  font-size:9px;
  font-weight:800;
  letter-spacing:1px;
  transition:.25s;
}

.header-cta:hover,.primary-button:hover { background:#b81818; }

.menu-toggle {
  display:none;
  color:white;
  background:none;
  border:0;
  font-size:25px;
  cursor:pointer;
}

.hero {
  min-height:690px;
  height:calc(100vh - 88px);
  max-height:950px;
  position:relative;
  display:flex;
  align-items:center;
  overflow:hidden;
  background:#111;
}

.hero-background {
  position:absolute;
  inset:0;
  background-size:cover;
  background-position:center 35%;
  filter:grayscale(65%) contrast(1.15) brightness(.63);
  transform:scale(1.02);
  animation:heroReveal 1.3s ease both;
}

.hero-shade {
  position:absolute;
  inset:0;
  background:
    linear-gradient(90deg,#090909 0%,rgba(9,9,9,.94) 27%,rgba(9,9,9,.48) 61%,rgba(9,9,9,.15) 100%),
    linear-gradient(0deg,#090909 0%,transparent 30%,rgba(0,0,0,.2) 100%);
}

.hero-content {
  position:relative;
  z-index:2;
  padding:0 8%;
  max-width:900px;
  animation:contentIn .9s ease both;
}

.eyebrow {
  color:var(--red);
  font-size:10px;
  font-weight:800;
  letter-spacing:4px;
  margin-bottom:25px;
}

.red-dot {
  display:inline-block;
  width:7px;
  height:7px;
  background:var(--red);
  border-radius:50%;
  margin-right:10px;
}

.hero h1 {
  font-family:'Barlow Condensed',sans-serif;
  font-size:clamp(75px,10vw,145px);
  font-weight:900;
  line-height:.79;
  letter-spacing:-2px;
  text-transform:uppercase;
}

.hero h1 span,.intro-layout h2 span,.statement h2 span {
  color:var(--red);
}

.hero-content > p {
  max-width:480px;
  font-size:14px;
  line-height:1.9;
  color:#bbb;
  margin:32px 0;
}

.primary-button {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  background:var(--red);
  color:white;
  padding:17px 24px;
  font-size:10px;
  font-weight:800;
  letter-spacing:1.4px;
  border:0;
  cursor:pointer;
  transition:.25s;
}

.hero-bottom {
  margin-top:100px;
  font-size:9px;
  letter-spacing:3px;
  color:#777;
}

.hero-side-label {
  position:absolute;
  right:35px;
  top:40%;
  writing-mode:vertical-rl;
  font-size:9px;
  letter-spacing:4px;
  color:#aaa;
}

.hero-index {
  position:absolute;
  bottom:30px;
  right:6%;
  font-family:'Barlow Condensed',sans-serif;
  font-size:32px;
  font-weight:800;
}

.hero-index span { color:#777; font-size:17px; }

.intro-section { padding:110px 8%; }

.section-tag {
  color:var(--red);
  font-size:10px;
  letter-spacing:3px;
  font-weight:800;
  margin-bottom:35px;
}

.intro-layout {
  display:flex;
  justify-content:space-between;
  align-items:flex-end;
  gap:40px;
  margin-bottom:65px;
}

.intro-layout h2 {
  font-family:'Barlow Condensed',sans-serif;
  font-size:clamp(48px,7vw,90px);
  line-height:.92;
  font-weight:900;
  max-width:650px;
}

.intro-layout > p {
  max-width:370px;
  color:var(--muted);
  font-size:13px;
  line-height:2;
}

.feature-grid {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:22px;
}

.feature-card {
  min-height:390px;
  position:relative;
  overflow:hidden;
  background:#171717;
  display:flex;
  align-items:flex-end;
  padding:28px;
  border:1px solid #292929;
  transition:transform .35s,border-color .35s;
}

.feature-card:hover {
  transform:translateY(-7px);
  border-color:var(--red);
}

.feature-image {
  position:absolute;
  inset:0;
  background-size:cover;
  background-position:center;
  filter:grayscale(70%) brightness(.48);
  transition:transform .5s;
}

.feature-card:hover .feature-image { transform:scale(1.07); }

.feature-card::after {
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(0deg,#090909 0%,transparent 100%);
}

.card-number,.feature-info { position:relative; z-index:2; }

.card-number {
  position:absolute;
  top:22px;
  left:25px;
  color:var(--red);
  font-size:12px;
  letter-spacing:3px;
}

.feature-info h3,.info-card h3,.price-card h3 {
  font-family:'Barlow Condensed',sans-serif;
  font-size:38px;
  font-weight:800;
}

.feature-info p,.info-card p,.price-card p {
  color:#aaa;
  font-size:12px;
  line-height:1.8;
  margin:12px 0 20px;
}

.arrow,.text-link {
  font-size:9px;
  font-weight:800;
  letter-spacing:2px;
  color:var(--red);
}

.info-card,.price-card {
  background:var(--panel);
  border:1px solid #292929;
  padding:35px;
  min-height:220px;
}

.info-card .eyebrow,.price-card .eyebrow { margin-bottom:20px; }

.schedule { border-top:1px solid #292929; }

.schedule-row {
  display:grid;
  grid-template-columns:1fr 2fr 1fr;
  gap:20px;
  padding:24px;
  border-bottom:1px solid #292929;
  font-size:12px;
}

.schedule-row strong { color:var(--red); letter-spacing:2px; }
.schedule-row span:last-child { text-align:right; color:#aaa; }

.price-card .price {
  font-size:14px;
  color:var(--red);
  margin:30px 0;
  font-weight:800;
}

.gallery-grid {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  grid-auto-rows:240px;
  gap:15px;
}

.gallery-image { overflow:hidden; background:#171717; }
.gallery-image img {
  width:100%;
  height:100%;
  object-fit:cover;
  filter:grayscale(65%);
  transition:.4s;
}
.gallery-image:hover img { transform:scale(1.05); filter:grayscale(0); }
.gallery-2,.gallery-5 { grid-row:span 2; }

.contact-form {
  max-width:700px;
  display:grid;
  gap:20px;
}

.contact-form label {
  display:grid;
  gap:10px;
  color:#aaa;
  font-size:11px;
  letter-spacing:1px;
}

.contact-form input,.contact-form textarea,.contact-form select {
  background:#151515;
  border:1px solid #333;
  padding:16px;
  color:white;
  font:inherit;
  outline:none;
}

.contact-form input:focus,.contact-form textarea:focus,.contact-form select:focus {
  border-color:var(--red);
}

.contact-form button { justify-self:start; }
.form-status { color:var(--red); font-size:12px; }

.statement {
  padding:100px 8%;
  background:#111;
  text-align:center;
  border-top:1px solid #292929;
}

.statement > span {
  font-size:10px;
  color:var(--red);
  letter-spacing:4px;
}

.statement h2 {
  font-family:'Barlow Condensed',sans-serif;
  font-size:clamp(45px,7vw,90px);
  line-height:1;
  margin:25px 0 35px;
}

.footer {
  padding:65px 8% 25px;
  display:grid;
  grid-template-columns:1fr 2fr;
  gap:40px;
  background:#080808;
}

.footer > div:first-child > p {
  font-size:11px;
  color:#777;
  margin-top:25px;
}

.footer-links {
  display:flex;
  flex-wrap:wrap;
  gap:20px;
  align-content:start;
}

.footer-links a {
  font-size:9px;
  color:#aaa;
  letter-spacing:1px;
}

.footer-links a:hover { color:var(--red); }

.copyright {
  grid-column:1/-1;
  border-top:1px solid #252525;
  padding-top:25px;
  color:#666;
  font-size:9px;
  letter-spacing:2px;
}

.reveal {
  opacity:0;
  transform:translateY(25px);
  transition:opacity .7s,transform .7s;
}
.reveal.visible { opacity:1; transform:translateY(0); }

@keyframes contentIn {
  from {opacity:0;transform:translateY(25px)}
  to {opacity:1;transform:translateY(0)}
}

@keyframes heroReveal {
  from {transform:scale(1.08);opacity:.5}
  to {transform:scale(1.02);opacity:1}
}

@media(max-width:1100px) {
  .navigation { gap:12px; }
  .navigation a { font-size:8px; }
  .header-cta { display:none; }
}

@media(max-width:760px) {
  .header { height:75px; padding:0 6%; }
  .menu-toggle { display:block; }
  .navigation {
    display:none;
    position:absolute;
    top:75px;
    left:0;
    width:100%;
    background:#101010;
    padding:25px;
    flex-direction:column;
    align-items:stretch;
    gap:0;
    border-bottom:1px solid #333;
  }
  .navigation.open { display:flex; }
  .navigation a { padding:14px 5px; font-size:11px; }
  .hero { min-height:720px; height:calc(100vh - 75px); }
  .hero-background { background-position:60% center; }
  .hero-shade {
    background:linear-gradient(90deg,rgba(9,9,9,.92),rgba(9,9,9,.42)),
    linear-gradient(0deg,#090909,transparent 60%);
  }
  .hero-content { padding:0 7%; }
  .hero h1 { font-size:clamp(65px,14vw,105px); }
  .hero-content > p { max-width:330px; font-size:12px; }
  .hero-bottom { margin-top:70px; font-size:8px; }
  .hero-side-label { display:none; }
  .intro-section { padding:75px 7%; }
  .intro-layout { display:block; }
  .intro-layout > p { margin-top:25px; }
  .feature-grid { grid-template-columns:1fr; }
  .feature-card { min-height:350px; }
  .gallery-grid { grid-template-columns:repeat(2,1fr); grid-auto-rows:180px; }
  .schedule-row { grid-template-columns:1fr 1.5fr; }
  .schedule-row span:last-child { grid-column:2; text-align:left; }
  .footer { grid-template-columns:1fr; }
  .copyright { grid-column:1; }
}

@media(prefers-reduced-motion:reduce) {
  *,*::before,*::after {
    animation-duration:.01ms!important;
    transition-duration:.01ms!important;
    scroll-behavior:auto!important;
  }
  .reveal { opacity:1; transform:none; }
}
CSS

echo ""
echo "======================================"
echo "       REDLINE REBUILD COMPLETE"
echo "======================================"
echo "10 pages created."
echo "Shared styling and interactions added."
echo "======================================"
