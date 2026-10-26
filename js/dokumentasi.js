const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryCards = document.querySelectorAll('.gallery-card[data-media-type]');
const galleryCount = document.querySelector('.gallery-count');

galleryFilters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const selectedType = filter.dataset.filter;
    let visibleCount = 0;

    galleryFilters.forEach((button) => {
      const isActive = button === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    galleryCards.forEach((card) => {
      const isVisible = selectedType === 'all' || card.dataset.mediaType === selectedType;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (galleryCount) {
      galleryCount.textContent = `${visibleCount} dokumentasi`;
    }
  });
});
