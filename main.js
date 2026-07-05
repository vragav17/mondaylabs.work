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
  btn.textContent = 'Opening your mail app…';
  btn.disabled = true;
  input.disabled = true;
});
