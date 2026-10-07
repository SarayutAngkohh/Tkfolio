/* ==========================================================
   Portfolio script — Sarayut Angkoh
   แก้ BibTeX ของแต่ละผลงานได้ที่ object ด้านล่าง
   ========================================================== */

const bibtexEntries = {
  'cite-author': `@misc{angkoh2026portfolio,
  author = {Angkoh, Sarayut},
  title = {Portfolio: Web Tools, Projects and Archives},
  year = {2026},
  howpublished = {\\url{https://tonkl7.github.io}}
}`,
  'sprouts': `@misc{angkoh2026sprouts,
  author = {Angkoh, Sarayut},
  title = {SproutS: Spaced-Repetition Planner Based on a Forgetting Curve},
  year = {2026},
  howpublished = {\\url{https://sarayutangkohh.github.io/sps/}}
}`,
  'codespace': `@misc{angkoh2026codespace,
  author = {Angkoh, Sarayut},
  title = {Tonkla's Code Space},
  year = {2026},
  howpublished = {\\url{https://tonkl7.github.io/webpt/code/V1/webhub-fixed-v6.html}}
}`,
  'studyvault': `@misc{angkoh2026studyvault,
  author = {Angkoh, Sarayut},
  title = {StudyVault Pro},
  year = {2026},
  howpublished = {\\url{https://tonkl7.github.io/webpt/tools/studyvault.html}}
}`,
  'devtools': `@misc{angkoh2026devtools,
  author = {Angkoh, Sarayut},
  title = {Dev Tools: Frontend and UI/UX Hub},
  year = {2026},
  howpublished = {\\url{https://tonkl7.github.io/webpt/tools/Devtools.html}}
}`,
  'translater': `@misc{angkoh2026translater,
  author = {Angkoh, Sarayut},
  title = {Translater and Developer Toolkit},
  year = {2026},
  howpublished = {\\url{https://tonkl7.github.io/webpt/tools/translater.html}}
}`,
  'ballfight': `@misc{angkoh2026ballfight,
  author = {Angkoh, Sarayut},
  title = {Ball Fight},
  year = {2026},
  howpublished = {\\url{https://tonkl7.github.io/games/ballfightBETA6O.html}}
}`,
  'stickroute': `@misc{angkoh2026stickroute,
  author = {Angkoh, Sarayut},
  title = {StickRoute: Bookmark Manager},
  year = {2026},
  howpublished = {\\url{https://tonkl7.github.io/sroute/web.html}}
}`,
  'branchstorage': `@misc{angkoh2026branchstorage,
  author = {Angkoh, Sarayut},
  title = {BranchStorage},
  year = {2026}
}`
};

/* ---------- BibTeX modal ---------- */
function toggleBibTeXModal(key = 'cite-author') {
  const modal = document.getElementById('bibtex-modal');
  const textarea = document.getElementById('bibtex-text');
  document.getElementById('modal-toast').classList.add('hidden');

  if (modal.classList.contains('hidden')) {
    textarea.value = bibtexEntries[key] || bibtexEntries['cite-author'];
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
}

function copyModalBibTeX() {
  copyToClipboard(document.getElementById('bibtex-text').value);
  const toast = document.getElementById('modal-toast');
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2500);
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const tmp = document.createElement('textarea');
  tmp.value = text;
  document.body.appendChild(tmp);
  tmp.select();
  document.execCommand('copy');
  document.body.removeChild(tmp);
}

/* ---------- Archives lightbox ---------- */
function openLightbox(src, caption) {
  const box = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = caption || '';
  box.classList.remove('hidden');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
}

/* ---------- Close overlays with Esc ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const modal = document.getElementById('bibtex-modal');
  if (!modal.classList.contains('hidden')) modal.classList.add('hidden');
  closeLightbox();
});

/* ---------- Highlight current section in the outline ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('#outline a[href^="#"]');
  const map = new Map();
  links.forEach((a) => {
    const el = document.querySelector(a.getAttribute('href'));
    if (el) map.set(el, a);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.remove('is-active'));
        map.get(entry.target).classList.add('is-active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  map.forEach((_, el) => observer.observe(el));
});
