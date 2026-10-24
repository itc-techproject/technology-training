// contact.js
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const contactForm = document.getElementById('contactForm');
const toast       = document.getElementById('toast');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }
    contactForm.reset();
  });
}