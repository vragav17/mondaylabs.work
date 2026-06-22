// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
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
  window.location.href = `mailto:me@mondaylabs.work?subject=${subject}&body=${body}`;
  btn.textContent = "Opening your mail app…";
  btn.disabled = true;
  input.disabled = true;
});

// Subtle scroll fade-in for sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-featured, .about-inner, .stat-card, .cs-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });

// Override: add visible class
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(style);
