const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const historyDialog = document.getElementById('history-dialog');
const historyYearButtons = document.querySelectorAll('.history-year-button');

const documentation = {
  2022: [
    'Screenshot 2026-10-31 193435.png',
    'Screenshot 2026-10-31 193534.png',
    'Screenshot 2026-10-31 193636.png',
    'Screenshot 2026-10-31 193735.png',
    'Screenshot 2026-10-31 193833.png',
    'Screenshot 2026-10-31 193935.png',
  ],
  2023: [
    'DSC01952.JPG',
    'DSC01971.JPG',
    'DSC01981.JPG',
    'DSC01989.JPG',
    'Screenshot 2026-10-31 192906.png',
    'Screenshot 2026-10-31 193032.png',
  ],
  2024: [
    'DSC_0305.JPG',
    'DSC_0317.JPG',
    'DSC_0336.JPG',
    'IMG_6846.png',
    'IMG_6861.png',
    'IMG_6867.png',
  ],
  2025: [
    'IMG_0283.JPG',
    'IMG_0286.JPG',
    'IMG_0341.JPG',
    'IMG_5398.JPG',
    'IMG_5485.JPG',
    'IMG_5488 (1).JPG',
  ],
  2026: [
    'DSCF5208.JPG',
    'DSCF5236.JPG',
    'IMG-20261011-WA0024.jpg',
    'IMG-20261011-WA0026.jpg',
    'IMG_4345.png',
    'IMG_4360.png',
  ],
};

if (historyDialog instanceof HTMLDialogElement) {
  const dialogYear = document.getElementById('history-dialog-year');
  const dialogEdition = document.getElementById('history-dialog-edition');
  const dialogStory = document.getElementById('history-dialog-story');
  const dialogArchive = document.getElementById('history-dialog-archive');
  const dialogGallery = document.getElementById('history-dialog-gallery');
  const closeDialogButton = historyDialog.querySelector('.history-dialog-close');

  const renderPhoto = (filename, year, index) => {
    const figure = document.createElement('figure');
    const link = document.createElement('a');
    const image = document.createElement('img');
    const caption = document.createElement('figcaption');
    const source = `image/dokum%20tetra/${year.slice(-2)}/${encodeURIComponent(filename)}`;

    figure.className = 'history-gallery-slot';
    link.className = 'history-gallery-link';
    link.href = source;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Buka foto ${index + 1}, TETRA ${year}`);
    image.src = source;
    image.alt = `Dokumentasi TETRA ${year}, foto ${index + 1}`;
    image.loading = 'lazy';
    caption.textContent = `TETRA ${year} · ${String(index + 1).padStart(2, '0')}`;
    link.appendChild(image);
    figure.append(link, caption);

    return figure;
  };

  historyYearButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!dialogYear || !dialogEdition || !dialogStory || !dialogArchive || !dialogGallery) return;

      const year = button.dataset.year || '';
      const images = documentation[year];

      if (!images) {
        console.error(`Dokumentasi untuk tahun ${year} tidak ditemukan.`);
        return;
      }

      dialogYear.textContent = year;
      dialogEdition.textContent = button.dataset.edition || 'ARSIP TETRA';
      dialogStory.textContent = `Dokumentasi kegiatan Technology Training tahun ${year}.`;
      dialogArchive.textContent = `${images.length} foto dokumentasi kegiatan TETRA.`;

      const photoSet = document.createElement('div');
      photoSet.className = 'history-photo-set';
      images.forEach((filename, index) => {
        photoSet.appendChild(renderPhoto(filename, year, index));
      });

      const duplicateSet = photoSet.cloneNode(true);
      duplicateSet.setAttribute('aria-hidden', 'true');
      duplicateSet.querySelectorAll('.history-gallery-link').forEach((link) => {
        link.tabIndex = -1;
      });
      dialogGallery.replaceChildren(photoSet, duplicateSet);

      dialogGallery.querySelectorAll('img').forEach((image) => {
        image.addEventListener('error', () => {
          const fallback = document.createElement('span');
          const icon = document.createElement('i');
          const message = document.createElement('span');

          fallback.className = 'history-gallery-fallback';
          icon.className = 'fas fa-file-arrow-down';
          icon.setAttribute('aria-hidden', 'true');
          message.textContent = 'Pratinjau tidak tersedia. Klik untuk membuka file.';
          fallback.append(icon, message);
          image.replaceWith(fallback);
        }, { once: true });
      });

      historyDialog.showModal();
    });
  });

  closeDialogButton?.addEventListener('click', () => historyDialog.close());
  historyDialog.addEventListener('click', (event) => {
    if (event.target === historyDialog) historyDialog.close();
  });
}
