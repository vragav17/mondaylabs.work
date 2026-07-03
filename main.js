// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Waitlist form
document.getElementById('waitlistForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const btn = e.target.querySelector('button');
  const userEmail = input.value.trim();
  const subject = encodeURIComponent('Waitlist — SlotMyFiles Early Access');
  const body = encodeURIComponent(`Hi,\n\nPlease add me to the SlotMyFiles waitlist.\n\nMy email: ${userEmail}\n`);
  window.location.href = `mailto:veera.ragavan.1996@gmail.com?subject=${subject}&body=${body}`;
  btn.textContent = '[ OPENING_MAIL… ]';
  btn.disabled = true;
  input.disabled = true;
});

// Status bar: UTC clock + session uptime
const clockEl = document.getElementById('clock');
const uptimeEl = document.getElementById('uptime');
const bootTime = Date.now();

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const now = new Date();
  if (clockEl) {
    clockEl.textContent = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
  }
  if (uptimeEl) {
    const s = Math.floor((Date.now() - bootTime) / 1000);
    uptimeEl.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  }
}
tick();
setInterval(tick, 1000);

// Terminal: append new routing lines on a loop
const termBody = document.getElementById('termBody');
const routes = [
  ['slack', 'PO_8841.pdf', 'onedrive:/Orders', '0.6s'],
  ['whatsapp', 'Site_Photos.zip', 's3://media', '1.3s'],
  ['email', 'Statement_Jun.pdf', 'gdrive:/Finance', '0.4s'],
  ['slack', 'Specs_v3.docx', 'azure-blob:/docs', '0.8s'],
  ['email', 'Quote_1207.pdf', 'custom:/quotes', '0.3s'],
  ['whatsapp', 'Delivery_Note.jpg', 'onedrive:/Logistics', '0.5s'],
];
let routeIdx = 0;

function appendRoute() {
  if (!termBody) return;
  const [src, file, dest, t] = routes[routeIdx % routes.length];
  routeIdx++;
  const prompt = termBody.querySelector('.t-prompt');
  const line = document.createElement('div');
  line.className = 't-line';
  line.innerHTML = `<span class="t-src">${src}</span> ▸ ${file} <span class="t-arrow">→</span> <span class="t-dest">${dest}</span> <span class="t-ok">✓ ${t}</span>`;
  termBody.insertBefore(line, prompt);
  // keep terminal height stable: drop oldest routed line
  const lines = termBody.querySelectorAll('.t-line:not(.t-boot):not(.t-sep):not(.t-prompt)');
  if (lines.length > 6) lines[0].remove();
}
setInterval(appendRoute, 2600);

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

const revealEls = document.querySelectorAll('.module, .stage, .about-grid > *, .section-head, .terminal');
revealEls.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Fallback: never leave content hidden if the observer doesn't fire
setTimeout(() => {
  revealEls.forEach(el => el.classList.add('visible'));
}, 2500);
