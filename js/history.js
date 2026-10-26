// history.js
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const historyEntries = document.querySelectorAll('.history-entry');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (historyEntries.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
  document.body.classList.add('history-motion-ready');

  const historyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  historyEntries.forEach((entry) => historyObserver.observe(entry));
}

const historyYearGalleries = document.querySelectorAll('.history-year-gallery');

if (!prefersReducedMotion) {
  historyYearGalleries.forEach((gallery) => {
    const track = gallery.querySelector('.history-year-track');
    const group = track ? track.querySelector('.history-year-group') : null;

    if (track && group) {
      const loopGroup = group.cloneNode(true);
      loopGroup.setAttribute('aria-hidden', 'true');
      track.appendChild(loopGroup);
      gallery.classList.add('is-ready');
    }
  });
}