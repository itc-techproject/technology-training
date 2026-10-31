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

const historyDialog = document.getElementById('history-dialog');
const historyYearButtons = document.querySelectorAll('.history-year-button');

if (historyDialog instanceof HTMLDialogElement) {
  const dialogYear = document.getElementById('history-dialog-year');
  const dialogEdition = document.getElementById('history-dialog-edition');
  const dialogStory = document.getElementById('history-dialog-story');
  const dialogArchive = document.getElementById('history-dialog-archive');
  const dialogGallery = document.getElementById('history-dialog-gallery');
  const galleryTemplate = document.getElementById('history-gallery-template');
  const closeDialogButton = historyDialog.querySelector('.history-dialog-close');

  historyYearButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!dialogYear || !dialogEdition || !dialogStory || !dialogArchive || !dialogGallery || !(galleryTemplate instanceof HTMLTemplateElement)) return;

      dialogYear.textContent = button.dataset.year || '';
      dialogEdition.textContent = button.dataset.edition || 'ARSIP TETRA';
      dialogStory.textContent = button.dataset.story || '';
      dialogArchive.textContent = button.dataset.archive || '';
      dialogGallery.replaceChildren();

      for (let slot = 1; slot <= 4; slot += 1) {
        const gallerySlot = galleryTemplate.content.cloneNode(true);
        const label = gallerySlot.querySelector('.history-gallery-slot-label');

        if (label) label.textContent = `Slot foto 0${slot}`;
        dialogGallery.appendChild(gallerySlot);
      }

      historyDialog.showModal();
    });
  });

  closeDialogButton?.addEventListener('click', () => historyDialog.close());
  historyDialog.addEventListener('click', (event) => {
    if (event.target === historyDialog) historyDialog.close();
  });
}