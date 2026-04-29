// ── Animated Counters
function runCounters() {
  document.querySelectorAll('.cnt').forEach(el => {
    const target = +el.dataset.to;
    const dur = 1800;
    const start = performance.now();

    const tick = now => {
      const p    = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val  = Math.round(ease * target);
      el.textContent = val >= 1000 ? val.toLocaleString() : val;
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

new IntersectionObserver(
  e => { if (e[0].isIntersecting) runCounters(); },
  { threshold: .3 }
).observe(document.getElementById('hero'));


// ── Scroll Reveal
const ro = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
  { threshold: .1 }
);
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));


// ── Modals
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

function closeOnBg(e, el) {
  if (e.target === el) {
    el.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ── Project Filter Tabs
document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.proj-card').forEach(card => {
      const cats = card.dataset.cat || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
