/* ================================================
   WEDDING WEBSITE — script.js
   ================================================ */
/* ──────────────────────────────────────
   2. PETAL / HEART CANVAS ANIMATION (nâng cấp)
────────────────────────────────────── */
(function initPetals() {
  const canvas = document.getElementById('petals-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = [
    '#f2c4ce', '#e8d5b7', '#d4899a',
    '#e4cda7', '#f9d5dc', '#c9a96e',
    '#fbe8ec', '#f5ede0'
  ];

  class Petal {
    constructor(init) { this.reset(init); }

    reset(init = false) {
      this.x      = Math.random() * canvas.width;
      this.y      = init ? Math.random() * canvas.height : -20;
      this.size   = Math.random() * 9 + 4;
      this.speedY = Math.random() * 0.9 + 0.35;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.rot    = Math.random() * Math.PI * 2;
      this.rotSpd = (Math.random() - 0.5) * 0.04;
      this.alpha  = Math.random() * 0.55 + 0.3;
      this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.type   = Math.random() < 0.38 ? 'heart'
                  : Math.random() < 0.5  ? 'petal' : 'circle';
      this.sway   = Math.random() * 0.9 + 0.1;
      this.swayT  = Math.random() * Math.PI * 2;
      this.wobble = Math.random() * 0.025 + 0.01;
    }

    drawHeart(cx, cy, s) {
      ctx.beginPath();
      ctx.moveTo(cx, cy + s * 0.28);
      ctx.bezierCurveTo(cx, cy, cx - s*0.5, cy, cx - s*0.5, cy - s*0.32);
      ctx.bezierCurveTo(cx - s*0.5, cy - s*0.72, cx, cy - s*0.72, cx, cy - s*0.32);
      ctx.bezierCurveTo(cx, cy - s*0.72, cx + s*0.5, cy - s*0.72, cx + s*0.5, cy - s*0.32);
      ctx.bezierCurveTo(cx + s*0.5, cy, cx, cy, cx, cy + s*0.28);
      ctx.closePath();
    }

    drawPetal(cx, cy, s) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(this.rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.3, s * 0.65, 0, 0, Math.PI * 2);
      ctx.closePath();
      ctx.restore();
    }

    drawCircle(cx, cy, s) {
      ctx.beginPath();
      ctx.arc(cx, cy, s * 0.38, 0, Math.PI * 2);
      ctx.closePath();
    }

    update() {
      this.swayT += this.wobble;
      this.x += this.speedX + Math.sin(this.swayT) * this.sway;
      this.y += this.speedY;
      this.rot += this.rotSpd;
      if (
        this.y > canvas.height + 30 ||
        this.x < -60 ||
        this.x > canvas.width + 60
      ) this.reset(false);
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = this.color;
      if (this.type === 'heart') {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        this.drawHeart(0, 0, this.size);
      } else if (this.type === 'petal') {
        this.drawPetal(this.x, this.y, this.size);
      } else {
        this.drawCircle(this.x, this.y, this.size);
      }
      ctx.fill();
      ctx.restore();
    }
  }

  // Ít hơn trên mobile để tiết kiệm pin
  const COUNT = window.innerWidth < 768 ? 22 : 45;
  const petals = Array.from({ length: COUNT }, () => new Petal(true));

  let raf;
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else loop();
  });

  loop();
})();
/* ──────────────────────────────────────
   1. LOADING SCREEN
────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    // Trigger hero animations after load
    document.querySelectorAll('#hero .reveal-up').forEach(el => el.classList.add('in'));
  }, 1400);
});

/* ──────────────────────────────────────
   2. PETAL / HEART CANVAS ANIMATION
────────────────────────────────────── */
(function initPetals() {
  const canvas = document.getElementById('petals-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Petal shapes: hearts & petals
  const COLORS = ['#f2c4ce', '#e8d5b7', '#d4899a', '#e4cda7', '#f9d5dc'];

  class Petal {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x    = Math.random() * canvas.width;
      this.y    = init ? Math.random() * -canvas.height : -20;
      this.size = Math.random() * 10 + 5;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.rot    = Math.random() * Math.PI * 2;
      this.rotSpd = (Math.random() - 0.5) * 0.03;
      this.alpha  = Math.random() * 0.5 + 0.3;
      this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.type   = Math.random() < 0.45 ? 'heart' : 'petal';
      this.sway   = Math.random() * 0.8;
      this.swayT  = Math.random() * Math.PI * 2;
    }

    drawHeart(cx, cy, s) {
      ctx.beginPath();
      ctx.moveTo(cx, cy + s * 0.3);
      ctx.bezierCurveTo(cx, cy, cx - s * 0.5, cy, cx - s * 0.5, cy - s * 0.35);
      ctx.bezierCurveTo(cx - s * 0.5, cy - s * 0.75, cx, cy - s * 0.75, cx, cy - s * 0.35);
      ctx.bezierCurveTo(cx, cy - s * 0.75, cx + s * 0.5, cy - s * 0.75, cx + s * 0.5, cy - s * 0.35);
      ctx.bezierCurveTo(cx + s * 0.5, cy, cx, cy, cx, cy + s * 0.3);
      ctx.closePath();
    }

    drawPetal(cx, cy, s) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, s * 0.35, s * 0.6, this.rot, 0, Math.PI * 2);
      ctx.closePath();
    }

    update() {
      this.swayT += 0.018;
      this.x  += this.speedX + Math.sin(this.swayT) * this.sway;
      this.y  += this.speedY;
      this.rot += this.rotSpd;
      if (this.y > canvas.height + 30) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = this.color;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.type === 'petal' ? 0 : this.rot);
      if (this.type === 'heart') {
        this.drawHeart(0, 0, this.size);
      } else {
        this.drawPetal(0, 0, this.size);
      }
      ctx.fill();
      ctx.restore();
    }
  }

  // Fewer petals on mobile for performance
  const COUNT = window.innerWidth < 768 ? 18 : 36;
  const petals = Array.from({ length: COUNT }, () => new Petal());

  let raf;
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }

  // Only animate when tab is visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else loop();
  });

  loop();
})();

/* ──────────────────────────────────────
   3. NAVBAR SCROLL EFFECT
────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ──────────────────────────────────────
   4. HAMBURGER MENU
────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navDrawer = document.getElementById('navDrawer');

hamburger.addEventListener('click', () => {
  navDrawer.classList.toggle('open');
});

document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', () => navDrawer.classList.remove('open'));
});

// Close on outside click
document.addEventListener('click', e => {
  if (!navDrawer.contains(e.target) && !hamburger.contains(e.target)) {
    navDrawer.classList.remove('open');
  }
});

/* ──────────────────────────────────────
   5. HERO PARALLAX
────────────────────────────────────── */
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight * 1.5) {
    heroBg.style.transform = `translateY(${y * 0.35}px)`;
  }
}, { passive: true });

/* ──────────────────────────────────────
   6. COUNTDOWN TIMER
   ✏️ Thay ngày cưới ở đây: 'YYYY-MM-DDTHH:MM:SS'
────────────────────────────────────── */
const WEDDING_DATE = new Date('2026-05-24T08:00:00');

function padTwo(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const diff = WEDDING_DATE - Date.now();

  if (diff <= 0) {
    document.getElementById('cd-days').textContent  = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent  = '00';
    document.getElementById('cd-secs').textContent  = '00';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  document.getElementById('cd-days').textContent  = padTwo(days);
  document.getElementById('cd-hours').textContent = padTwo(hours);
  document.getElementById('cd-mins').textContent  = padTwo(mins);
  document.getElementById('cd-secs').textContent  = padTwo(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ──────────────────────────────────────
   7. SCROLL REVEAL (IntersectionObserver)
────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      // Once revealed, stop observing
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale'
).forEach(el => {
  // Don't observe hero elements (handled after load)
  if (!el.closest('#hero')) {
    revealObserver.observe(el);
  }
});

/* ──────────────────────────────────────
   8. GALLERY LIGHTBOX
────────────────────────────────────── */
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  const lbClose  = document.getElementById('lbClose');
  const lbPrev   = document.getElementById('lbPrev');
  const lbNext   = document.getElementById('lbNext');

  const items = Array.from(document.querySelectorAll('.gallery-item img'));
  let current = 0;

  function open(index) {
    current = index;
    lbImg.src = items[current].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  function prev() { current = (current - 1 + items.length) % items.length; lbImg.src = items[current].src; }
  function next() { current = (current + 1) % items.length; lbImg.src = items[current].src; }

  // Attach to gallery items
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    item.addEventListener('click', () => open(i));
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  // Click backdrop to close
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  // Touch swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
  });
})();

/* ──────────────────────────────────────
   9. MUSIC PLAYER
   ✏️ Thêm file nhạc vào thư mục music/
   và cập nhật <source src="..."> trong HTML
────────────────────────────────────── */
(function initMusic() {
  const toggle   = document.getElementById('musicToggle');
  const audio    = document.getElementById('bgMusic');
  const icon     = document.getElementById('musicIcon');
  let   playing  = false;

  toggle.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      icon.className = 'fas fa-music';
      toggle.classList.remove('playing');
    } else {
      // Use a promise to handle browsers blocking autoplay
      audio.play().then(() => {
        icon.className = 'fas fa-pause';
        toggle.classList.add('playing');
      }).catch(() => {
        // Autoplay blocked — that's fine, user clicked intentionally
        icon.className = 'fas fa-pause';
        toggle.classList.add('playing');
      });
    }
    playing = !playing;
  });

  // Fade in/out on section change (optional enhancement)
  audio.volume = 0.45;
})();

/* ──────────────────────────────────────
   10. SMOOTH SECTION TRANSITIONS
   Add a subtle fade when clicking nav links
────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ──────────────────────────────────────
   11. TIMELINE ANIMATION ENHANCEMENT
   Add stagger to timeline cards
────────────────────────────────────── */
(function initTimeline() {
  const tlItems = document.querySelectorAll('.tl-item');
  const tlObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('in');
        }, i * 120);
        tlObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  tlItems.forEach(item => tlObs.observe(item));
})();

/* ──────────────────────────────────────
   12. INVITATION CARD ENTRANCE
   Glassmorphism card subtle float
────────────────────────────────────── */
(function initInviteFloat() {
  const card = document.querySelector('.invite-card');
  if (!card) return;
  let t = 0;
  function floatCard() {
    t += 0.012;
    card.style.transform = `translateY(${Math.sin(t) * 4}px)`;
    requestAnimationFrame(floatCard);
  }
  // Only float when section is visible
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) floatCard();
    });
  }, { threshold: 0.3 });
  obs.observe(card);
})();

/* ──────────────────────────────────────
   13. ACTIVE NAV LINK HIGHLIGHT
────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--rose-gold)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
})();
