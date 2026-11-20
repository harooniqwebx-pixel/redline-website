(() => {
  function install() {
    const hero = document.querySelector('#home.hero, .hero');

    // Wait until the existing website has rendered.
    if (!hero) {
      requestAnimationFrame(install);
      return;
    }

    if (document.querySelector('#ge-registration')) return;

    const css = document.createElement('style');
    css.textContent = `
      /* THREE CINEMATIC ANIMATIONS */

      #home, .hero {
        position:relative;
        overflow:hidden;
        isolation:isolate;
      }

      .ge-parallax-bg {
        position:absolute;
        inset:-15% 0;
        width:100%;
        height:130%;
        object-fit:cover;
        pointer-events:none;
        will-change:transform;
      }

      .ge-fighter {
        position:absolute;
        z-index:4;
        right:3%;
        bottom:0;
        width:min(43%,480px);
        height:88%;
        pointer-events:none;
        filter:drop-shadow(0 0 25px rgba(210,0,20,.35));
        animation:ge-float 4s ease-in-out infinite;
      }

      .ge-fighter svg {
        width:100%;
        height:100%;
        overflow:visible;
      }

      .ge-skin { fill:#a76b4d; }
      .ge-shirt { fill:#171719; stroke:#444; stroke-width:3; }
      .ge-glove { fill:#d20d20; stroke:#65000a; stroke-width:4; }
      .ge-arm {
        fill:none;
        stroke:#a76b4d;
        stroke-width:22;
        stroke-linecap:round;
        transform-box:fill-box;
        transform-origin:top center;
      }
      .ge-arm-a { animation:ge-guard-a 2.4s infinite ease-in-out; }
      .ge-arm-b { animation:ge-guard-b 2.4s infinite ease-in-out; }
      .ge-legs {
        fill:none;
        stroke:#171719;
        stroke-width:29;
        stroke-linecap:round;
      }
      .ge-head { fill:#a76b4d; }
      .ge-hair { fill:#111; }

      @keyframes ge-float {
        0%,100% { transform:translateY(0); }
        50% { transform:translateY(-15px); }
      }

      /* Boxing guard, punch and defensive block sequence */
      @keyframes ge-guard-a {
        0%,100% { transform:rotate(-35deg); }
        25% { transform:rotate(12deg); }
        45% { transform:rotate(45deg); }
        65% { transform:rotate(-65deg); }
        80% { transform:rotate(-15deg); }
      }
      @keyframes ge-guard-b {
        0%,100% { transform:rotate(35deg); }
        25% { transform:rotate(-45deg); }
        45% { transform:rotate(-10deg); }
        65% { transform:rotate(65deg); }
        80% { transform:rotate(25deg); }
      }

      /* Scrolling section reveals */
      .ge-reveal {
        opacity:0;
        transform:translateY(55px);
        transition:opacity .9s ease, transform .9s ease;
      }
      .ge-reveal.ge-visible {
        opacity:1;
        transform:translateY(0);
      }

      /* GOLDEN EAGLE REGISTRATION */
      #ge-registration {
        position:relative;
        padding:100px 6%;
        color:white;
        background:
          radial-gradient(ellipse at 85% 15%,rgba(190,0,20,.25),transparent 40%),
          linear-gradient(135deg,#080808,#171719,#090909);
        overflow:hidden;
      }

      .ge-layout {
        max-width:1150px;
        margin:auto;
        display:grid;
        grid-template-columns:1fr 1.1fr;
        gap:55px;
        align-items:start;
      }

      .ge-eyebrow {
        color:#ef2637;
        font-size:12px;
        font-weight:900;
        letter-spacing:4px;
      }

      .ge-heading {
        font-size:clamp(42px,6vw,78px);
        line-height:.95;
        margin:20px 0;
        font-weight:950;
        text-transform:uppercase;
      }

      .ge-heading span { color:#e51b2b; }

      .ge-description {
        color:#aaa;
        line-height:1.8;
        max-width:420px;
      }

      .ge-form {
        padding:32px;
        background:#151517;
        border:1px solid #39393d;
        box-shadow:0 25px 70px #0008;
      }

      .ge-form h3 {
        margin:0 0 25px;
        font-size:25px;
        text-transform:uppercase;
      }

      .ge-fields {
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:17px;
      }

      .ge-field {
        display:flex;
        flex-direction:column;
        gap:8px;
      }

      .ge-field.full { grid-column:1/-1; }

      .ge-field label {
        font-size:11px;
        color:#bbb;
        letter-spacing:1.4px;
        font-weight:800;
        text-transform:uppercase;
      }

      .ge-field input,
      .ge-field select,
      .ge-field textarea {
        width:100%;
        min-width:0;
        box-sizing:border-box;
        padding:14px;
        background:#09090a;
        border:1px solid #424247;
        color:white;
        font:inherit;
        outline:none;
      }

      .ge-field input:focus,
      .ge-field select:focus,
      .ge-field textarea:focus {
        border-color:#e51b2b;
      }

      .ge-submit {
        width:100%;
        padding:18px;
        margin-top:22px;
        border:0;
        background:#d71928;
        color:white;
        font-weight:900;
        letter-spacing:2px;
        cursor:pointer;
        text-transform:uppercase;
      }

      .ge-submit:hover { background:#ff2638; }

      .ge-confirm {
        display:none;
        padding:16px;
        margin-top:18px;
        background:#123322;
        border:1px solid #328b59;
        line-height:1.6;
      }

      @media(max-width:760px) {
        .ge-layout { grid-template-columns:1fr; }
        .ge-fighter { width:58%;right:-10%;height:65%;opacity:.65; }
        #ge-registration { padding:70px 5%; }
      }

      @media(max-width:450px) {
        .ge-fields { grid-template-columns:1fr; }
        .ge-field.full { grid-column:auto; }
        .ge-form { padding:20px; }
      }

      @media(prefers-reduced-motion:reduce) {
        .ge-fighter,.ge-arm { animation:none !important; }
        .ge-reveal { opacity:1;transform:none; }
      }
    `;
    document.head.appendChild(css);

    // 1. Background parallax: keep the existing hero photograph.
    const existingImage = hero.querySelector('.hero-image, img');
    if (existingImage) {
      existingImage.classList.add('ge-parallax-bg');

      window.addEventListener('scroll', () => {
        const rect = hero.getBoundingClientRect();
        const movement = Math.max(-100,Math.min(100,-rect.top * .22));
        existingImage.style.transform =
          `translate3d(0,${movement}px,0) scale(1.08)`;
      }, { passive:true });
    }

    // 2. Animated boxer with changing arm positions.
    const fighter = document.createElement('div');
    fighter.className = 'ge-fighter';

    fighter.innerHTML = `
      <svg viewBox="0 0 400 650" role="img"
           aria-label="Animated boxing athlete">
        <path class="ge-legs" d="M180 390 L140 510 L110 610"/>
        <path class="ge-legs" d="M220 390 L265 510 L300 610"/>

        <path class="ge-shirt"
          d="M155 205 Q200 180 245 205 L275 375
             Q210 420 130 375Z"/>

        <circle class="ge-head" cx="200" cy="135" r="56"/>
        <path class="ge-hair"
          d="M145 130 Q145 65 202 70 Q258 70 257 132
             Q225 103 198 108 Q167 120 145 130Z"/>

        <path class="ge-arm ge-arm-a" d="M155 230 L105 290 L130 335"/>
        <path class="ge-glove" d="M105 320 Q75 310 75 345
          Q80 380 115 375 Q145 365 140 340Z"/>

        <path class="ge-arm ge-arm-b" d="M245 230 L300 280 L270 330"/>
        <path class="ge-glove" d="M265 315 Q300 295 320 325
          Q335 350 305 370 Q275 375 255 345Z"/>
      </svg>
    `;

    hero.appendChild(fighter);

    // Foreground boxer moves at a different scroll speed.
    window.addEventListener('scroll', () => {
      const rect = hero.getBoundingClientRect();
      fighter.style.translate = `0 ${Math.max(-75,Math.min(75,-rect.top*.12))}px`;
    }, { passive:true });

    // 3. Reveal cards and sections as they enter view.
    document.querySelectorAll(
      'main section:not(#home), .fighter-card, .training-card, .membership-card'
    ).forEach(element => {
      element.classList.add('ge-reveal');
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ge-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:.12 });

    document.querySelectorAll('.ge-reveal').forEach(element => {
      observer.observe(element);
    });

    // Registration form.
    const section = document.createElement('section');
    section.id = 'ge-registration';

    section.innerHTML = `
      <div class="ge-layout">
        <div>
          <div class="ge-eyebrow">TRAIN WITH PURPOSE</div>
          <h2 class="ge-heading">GOLDEN<br><span>EAGLE</span><br>REGISTRATION</h2>
          <p class="ge-description">
            Take the first step. Choose your training program,
            request an appointment and register your interest
            with Golden Eagle.
          </p>
        </div>

        <form class="ge-form" id="ge-form">
          <h3>Register now</h3>
          <div class="ge-fields">
            <div class="ge-field">
              <label for="ge-name">Full name</label>
              <input id="ge-name" name="name" required placeholder="Full name">
            </div>

            <div class="ge-field">
              <label for="ge-phone">Phone</label>
              <input id="ge-phone" name="phone" type="tel" required placeholder="Phone number">
            </div>

            <div class="ge-field full">
              <label for="ge-email">Email</label>
              <input id="ge-email" name="email" type="email" required placeholder="Email address">
            </div>

            <div class="ge-field">
              <label for="ge-program">Program</label>
              <select id="ge-program" name="program" required>
                <option value="">Choose program</option>
                <option>Boxing</option>
                <option>Fitness</option>
                <option>Beginner training</option>
                <option>Personal training</option>
              </select>
            </div>

            <div class="ge-field">
              <label for="ge-level">Experience</label>
              <select id="ge-level" name="experience" required>
                <option value="">Choose level</option>
                <option>Beginner</option>
                <option>Some experience</option>
                <option>Experienced</option>
              </select>
            </div>

            <div class="ge-field">
              <label for="ge-date">Preferred date</label>
              <input id="ge-date" name="date" type="date" required>
            </div>

            <div class="ge-field">
              <label for="ge-time">Preferred time</label>
              <select id="ge-time" name="time" required>
                <option value="">Choose time</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>

            <div class="ge-field full">
              <label for="ge-notes">Additional message</label>
              <textarea id="ge-notes" name="notes" rows="3"
                placeholder="Your goals or questions"></textarea>
            </div>
          </div>

          <button class="ge-submit" type="submit">
            SEND REGISTRATION →
          </button>

          <div class="ge-confirm" id="ge-confirm" role="status"></div>
        </form>
      </div>
    `;

    const contact = document.querySelector('#contact');
    if (contact && contact.parentNode) {
      contact.parentNode.insertBefore(section,contact);
    } else {
      document.body.appendChild(section);
    }

    const date = section.querySelector('#ge-date');
    const now = new Date();
    date.min = new Date(now.getTime()-now.getTimezoneOffset()*60000)
      .toISOString().slice(0,10);

    section.querySelector('#ge-form').addEventListener('submit', event => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const confirmation = section.querySelector('#ge-confirm');

      confirmation.textContent =
        'Thank you, ' + data.get('name') +
        '. Your details have been entered. This demo does not send or save registrations yet. A booking service or backend must be connected to receive real submissions.';

      confirmation.style.display = 'block';
    });

    console.log('GOLDEN EAGLE animations and registration installed.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',install,{once:true});
  } else {
    install();
  }
})();
