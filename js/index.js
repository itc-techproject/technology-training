// index.js
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Mascot Slider
const mascotImages = document.querySelectorAll('.mascot-placeholder .mascot-img');
if (mascotImages.length > 1) {
  let currentIndex = 0;
  setInterval(() => {
    mascotImages[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % mascotImages.length;
    mascotImages[currentIndex].classList.add('active');
  }, 3500);
}