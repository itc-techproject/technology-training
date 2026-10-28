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

// TETRA topic selector
const techExplorer = document.getElementById('tech-explorer');
if (techExplorer) {
  const techWheel = techExplorer.querySelector('.tech-wheel');
  const techChoices = Array.from(techExplorer.querySelectorAll('.tech-choice'));
  const techPanels = Array.from(techExplorer.querySelectorAll('.tech-panel'));
  const techArrows = techExplorer.querySelectorAll('[data-tech-direction]');
  const techPosition = techExplorer.querySelector('.tech-position');
  let activeTechIndex = 0;
  let lastWheelChange = 0;

  const showTech = (index, focusChoice = false) => {
    activeTechIndex = (index + techChoices.length) % techChoices.length;
    const radius = techWheel.clientWidth * 0.34;

    techChoices.forEach((choice, choiceIndex) => {
      const isActive = choiceIndex === activeTechIndex;
      const angle = (-90 + (choiceIndex - activeTechIndex) * 120) * (Math.PI / 180);
      choice.classList.toggle('is-active', isActive);
      choice.setAttribute('aria-pressed', String(isActive));
      choice.style.setProperty('--x', `${Math.sin(angle) * radius}px`);
      choice.style.setProperty('--y', `${-Math.cos(angle) * radius}px`);
    });

    techPanels.forEach((panel, panelIndex) => {
      panel.hidden = panelIndex !== activeTechIndex;
    });

    techPosition.textContent = `${String(activeTechIndex + 1).padStart(2, '0')} / ${String(techChoices.length).padStart(2, '0')}`;

    if (focusChoice) {
      techChoices[activeTechIndex].focus();
    }
  };

  techChoices.forEach((choice, index) => {
    choice.addEventListener('click', () => showTech(index));
  });

  techArrows.forEach((arrow) => {
    arrow.addEventListener('click', () => {
      showTech(activeTechIndex + Number(arrow.dataset.techDirection), true);
    });
  });

  techExplorer.querySelector('.tech-carousel').addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showTech(activeTechIndex + (event.key === 'ArrowRight' ? 1 : -1), true);
    }
  });

  techWheel.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) < 10) {
      return;
    }

    event.preventDefault();
    const now = Date.now();
    if (now - lastWheelChange > 350) {
      showTech(activeTechIndex + (event.deltaY > 0 ? 1 : -1));
      lastWheelChange = now;
    }
  }, { passive: false });

  let pointerStartX = null;
  techWheel.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' && !event.target.closest('.tech-choice')) {
      pointerStartX = event.clientX;
    }
  });

  techWheel.addEventListener('pointerup', (event) => {
    if (pointerStartX === null) {
      return;
    }

    const distance = event.clientX - pointerStartX;
    if (Math.abs(distance) > 40) {
      showTech(activeTechIndex + (distance < 0 ? 1 : -1));
    }
    pointerStartX = null;
  });

  techWheel.addEventListener('pointercancel', () => {
    pointerStartX = null;
  });

  window.addEventListener('resize', () => showTech(activeTechIndex));

  const styleDemoButton = techExplorer.querySelector('.demo-style-button');
  styleDemoButton.addEventListener('click', () => {
    const demo = styleDemoButton.closest('.css-demo');
    const isStyled = demo.classList.toggle('is-styled');
    demo.querySelector('.demo-style-status').textContent = isStyled ? 'Gaya CSS diterapkan!' : 'Tampilan awal';
  });

  const clickDemoButton = techExplorer.querySelector('.demo-click-button');
  let demoClickCount = 0;
  clickDemoButton.addEventListener('click', () => {
    demoClickCount += 1;
    techExplorer.querySelector('.demo-click-count').textContent = String(demoClickCount);
    techExplorer.querySelector('.demo-click-status').textContent =
      `Tombol diklik ${demoClickCount} kali`;
  });

  showTech(activeTechIndex);
}