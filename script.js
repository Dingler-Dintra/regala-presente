/* ============================================================
   PRESENTE · JS
   Aurora mouse-follow + float cards parallax + cursor + scroll reveals
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* === SMOOTH SCROLL === */
const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -20 }); }
  });
});

/* === CURSOR LÍQUIDO + TEXTO === */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
const cursorText = document.getElementById('cursorText');
let mouseX = 0, mouseY = 0, cx = 0, cy = 0;
let prevX = 0, prevY = 0, curSpeed = 0, curAngle = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursorDot) cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

(function animateCursor() {
  cx += (mouseX - cx) * 0.15;
  cy += (mouseY - cy) * 0.15;
  const dx = mouseX - prevX, dy = mouseY - prevY;
  prevX = mouseX; prevY = mouseY;
  const v = Math.min(Math.sqrt(dx * dx + dy * dy) / 8, 1.0);
  curSpeed += (v - curSpeed) * 0.18;
  if (v > 0.02) curAngle = Math.atan2(dy, dx) * 180 / Math.PI;

  if (cursor) {
    if (cursor.classList.contains('is-text')) {
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    } else {
      const sx = 1 + curSpeed * 0.45;
      const sy = 1 - curSpeed * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) rotate(${curAngle}deg) scale(${sx}, ${sy})`;
    }
  }
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, [data-magnetic], input, select').forEach(el => {
  el.addEventListener('mouseenter', () => cursor?.classList.add('is-hover'));
  el.addEventListener('mouseleave', () => cursor?.classList.remove('is-hover'));
});

document.querySelectorAll('[data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursorText) cursorText.textContent = el.dataset.cursor;
    cursor?.classList.add('is-text');
    cursor?.classList.remove('is-hover');
  });
  el.addEventListener('mouseleave', () => cursor?.classList.remove('is-text'));
});

/* === AURORA — gradiente que sigue al mouse === */
const aurora = document.getElementById('aurora');
let auroraX = 50, auroraY = 50, ax = 50, ay = 50;
window.addEventListener('mousemove', e => {
  auroraX = (e.clientX / window.innerWidth) * 100;
  auroraY = (e.clientY / window.innerHeight) * 100;
});
(function animAurora() {
  ax += (auroraX - ax) * 0.06;
  ay += (auroraY - ay) * 0.06;
  if (aurora) {
    aurora.style.setProperty('--ax', ax + '%');
    aurora.style.setProperty('--ay', ay + '%');
  }
  requestAnimationFrame(animAurora);
})();

/* === FLOAT CARDS — parallax al mouse + auto-flotación === */
const heroCards = document.getElementById('heroCards');
const cards = document.querySelectorAll('.float-card');
let cardMx = 0, cardMy = 0;

window.addEventListener('mousemove', e => {
  // Sólo durante hero (primeros 100vh)
  if (window.scrollY > window.innerHeight) return;
  cardMx = (e.clientX / window.innerWidth - 0.5) * 2;
  cardMy = (e.clientY / window.innerHeight - 0.5) * 2;
});

cards.forEach((card, i) => {
  // Cada card tiene su rotación base (en CSS) — guardarla
  const baseRotate = parseFloat(card.style.transform.match(/-?\d+\.?\d*/)?.[0] || 0)
    || (i === 0 ? -4 : i === 1 ? 3 : -2);
  card.dataset.baseRotate = baseRotate;
});

(function animateCards() {
  const t = performance.now() / 1000;
  cards.forEach((card, i) => {
    const depth = parseFloat(card.dataset.depth) || 1;
    // Parallax mouse
    const tx = cardMx * 30 * depth;
    const ty = cardMy * 20 * depth;
    // Auto-flotación lenta (cada card a distinto ritmo)
    const floatY = Math.sin(t * 0.6 + i * 1.3) * 8;
    const floatX = Math.cos(t * 0.4 + i * 0.8) * 4;
    const baseRotate = parseFloat(card.dataset.baseRotate) || 0;
    const rotateDelta = Math.sin(t * 0.5 + i) * 1.5;

    card.style.transform = `translate(${tx + floatX}px, ${ty + floatY}px) rotate(${baseRotate + rotateDelta}deg)`;
  });
  requestAnimationFrame(animateCards);
})();

/* === HERO TIMELINE === */
window.addEventListener('load', () => {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from('.hero__title .word', { yPercent: 110, duration: 1.2, stagger: 0.06 })
    .from('.eyebrow', { y: 20, opacity: 0, duration: 0.8 }, '-=0.9')
    .from('.hero__sub', { y: 20, opacity: 0, duration: 0.8 }, '-=0.7')
    .from('.hero__cta .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.5')
    .from('.float-card', { opacity: 0, scale: 0.8, duration: 1, stagger: 0.12, ease: 'back.out(1.4)' }, '-=0.8')
    .from('.hero__scroll-hint', { opacity: 0, duration: 0.6 }, '-=0.3');
});

/* === STRIP COUNT-UP === */
document.querySelectorAll('.strip__num').forEach(el => {
  const target = parseInt(el.dataset.target);
  const obj = { v: 0 };
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(obj, {
        v: target, duration: 1.6, ease: 'expo.out',
        onUpdate: () => { el.textContent = Math.floor(obj.v); },
      });
    },
  });
});

/* === MANIFIESTO REVEAL === */
const rwords = document.querySelectorAll('.rw');
ScrollTrigger.create({
  trigger: '.manifesto',
  start: 'top 70%',
  end: 'bottom 30%',
  scrub: 1,
  onUpdate: self => {
    const p = self.progress;
    rwords.forEach((w, i) => {
      if (p > i / rwords.length - 0.05) w.classList.add('is-visible');
      else w.classList.remove('is-visible');
    });
  },
});

/* === SECTION HEAD REVEAL === */
gsap.utils.toArray('.section-head').forEach(head => {
  gsap.from(head.querySelectorAll('.section-head__num, .section-head__title, .section-head__desc, .section-head__link'), {
    y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out',
    scrollTrigger: { trigger: head, start: 'top 85%' },
  });
});

/* === CARDS REVEAL + TILT 3D + SPOTLIGHT === */
gsap.utils.toArray('.cat, .exp, .step').forEach(el => {
  gsap.from(el, {
    y: 60, opacity: 0, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 88%' },
  });
});

document.querySelectorAll('[data-tilt]').forEach(card => {
  const media = card.querySelector('.exp__media');
  if (!media) return;
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const xPct = ((e.clientX - r.left) / r.width) * 100;
    const yPct = ((e.clientY - r.top) / r.height) * 100;
    card.style.setProperty('--mx', xPct + '%');
    card.style.setProperty('--my', yPct + '%');
    const x = xPct / 100 - 0.5;
    const y = yPct / 100 - 0.5;
    gsap.to(media, {
      rotateY: x * 10, rotateX: -y * 10,
      scale: 1.02,
      duration: 0.5, ease: 'power2.out',
      transformPerspective: 1400,
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(media, {
      rotateY: 0, rotateX: 0, scale: 1,
      duration: 1, ease: 'elastic.out(1, 0.5)',
    });
  });
});

/* === MOMENTS PARALLAX === */
gsap.utils.toArray('.moment').forEach(item => {
  const speed = parseFloat(item.dataset.speed || 1);
  const img = item.querySelector('img');
  if (!img) return;
  gsap.fromTo(img,
    { y: -30 * speed },
    {
      y: 30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    }
  );
});

gsap.utils.toArray('.moment').forEach(item => {
  gsap.from(item, {
    opacity: 0, y: 40, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: item, start: 'top 90%' },
  });
});

/* === MARQUEE INFINITO === */
const marqueeRow = document.querySelector('.marquee__row');
if (marqueeRow) {
  marqueeRow.innerHTML += marqueeRow.innerHTML;
  const w = marqueeRow.scrollWidth / 2;
  gsap.to(marqueeRow, {
    x: -w, duration: 32, ease: 'none', repeat: -1,
  });
}

/* === MAGNETIC BUTTONS === */
document.querySelectorAll('[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  });
});

/* === CTA TITLE REVEAL === */
gsap.from('.cta__title .word', {
  yPercent: 110, duration: 1.1, stagger: 0.06, ease: 'expo.out',
  scrollTrigger: { trigger: '.cta', start: 'top 70%' },
});
gsap.from('.cta__sub, .cta__btns .btn, .cta__contact span', {
  y: 30, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out',
  scrollTrigger: { trigger: '.cta__sub', start: 'top 80%' },
});
