// Highlight current nav link
document.querySelectorAll('.site-nav a').forEach((link) => {
  const page = link.getAttribute('data-page');
  if (page && document.body.dataset.page === page) {
    link.classList.add('is-active');
  }
});

// SP menu popup toggle — slides down from the top on open, slides back up
// on close. The popup can't animate straight from display:none, so `hidden`
// is only ever toggled at the *edges* of the transition: removed right
// before adding .is-open (open), and set only after the close transition
// has actually finished (close).
(function () {
  const toggle = document.querySelector('.sp-menu-toggle');
  const popup = document.getElementById('sp-menu-popup');
  const closeBtn = document.querySelector('.sp-menu-close');
  if (!toggle || !popup) return;

  let closeTimer = null;

  const isOpen = () => popup.classList.contains('is-open');

  const openMenu = () => {
    clearTimeout(closeTimer);
    popup.hidden = false;
    // Force a layout flush so the browser registers the pre-open (hidden)
    // state before .is-open is added — otherwise the two class changes get
    // batched into one style recalc and the transition never plays.
    void popup.offsetHeight;
    popup.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  };
  const closeMenu = () => {
    if (!isOpen()) return;
    popup.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => { popup.hidden = true; }, 220);
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  document.addEventListener('click', (e) => {
    if (isOpen() && !popup.contains(e.target) && !toggle.contains(e.target)) {
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
