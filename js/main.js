// Highlight current nav link
document.querySelectorAll('.site-nav a').forEach((link) => {
  const page = link.getAttribute('data-page');
  if (page && document.body.dataset.page === page) {
    link.classList.add('is-active');
  }
});

// SP menu popup toggle
(function () {
  const toggle = document.querySelector('.sp-menu-toggle');
  const popup = document.getElementById('sp-menu-popup');
  const closeBtn = document.querySelector('.sp-menu-close');
  if (!toggle || !popup) return;

  const openMenu = () => {
    popup.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  };
  const closeMenu = () => {
    popup.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.hidden ? openMenu() : closeMenu();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  document.addEventListener('click', (e) => {
    if (!popup.hidden && !popup.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });
})();

// Page-top button
(function () {
  const btn = document.querySelector('.page-top-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// Works page: client-side tag filter
(function () {
  const bar = document.querySelector('.filter-bar');
  if (!bar) return;
  const chips = Array.from(bar.querySelectorAll('.filter-chip'));
  const cards = Array.from(document.querySelectorAll('.work-card'));

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const tag = chip.dataset.tag;
      cards.forEach((card) => {
        const tags = (card.dataset.tags || '').split(',');
        const show = tag === 'all' || tags.includes(tag);
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();
