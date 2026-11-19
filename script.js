
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');

let current = 0;

const prev = document.getElementById('prevBtn');
const next = document.getElementById('nextBtn');
const progress = document.getElementById('progress');
const pageLabel = document.getElementById('pageLabel');

function showPage(index) {
  current = Math.max(0, Math.min(5, index));

  pages.forEach((page, i) => {
    page.classList.toggle('active', i === current);
  });

  navLinks.forEach((link, i) => {
    link.classList.toggle('active', i === current);
  });

  prev.disabled = current === 0;
  next.disabled = current === 5;

  progress.style.width = ((current + 1) / 6 * 100) + '%';
  pageLabel.textContent =
    String(current + 1).padStart(2, '0') + ' / 06';

  window.scrollTo({top: 0, behavior: 'smooth'});
  document.getElementById('nav').classList.remove('open');
}

navLinks.forEach((link, i) => {
  link.addEventListener('click', () => showPage(i));
});

document.querySelectorAll('[data-go]').forEach(button => {
  button.addEventListener('click', () => {
    showPage(Number(button.dataset.go));
  });
});

prev.addEventListener('click', () => showPage(current - 1));
next.addEventListener('click', () => showPage(current + 1));

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('open');
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') showPage(current + 1);
  if (e.key === 'ArrowLeft') showPage(current - 1);
});

// Pilihan kenangan
document.querySelectorAll('#memoryChoices button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('#memoryChoices button')
      .forEach(b => b.classList.remove('selected'));

    button.classList.add('selected');

    const messages = {
      'Senyumnya': 'Senyum sederhana yang entah kenapa masih teringat.',
      'Cara bicaranya': 'Hal sederhana dari suaranya pernah menjadi kenangan.',
      'Tatapan matanya': 'Ada tatapan singkat yang menetap lebih lama dari dugaan.'
    };

    document.getElementById('memoryFeedback').textContent =
      messages[button.textContent];
  });
});

// Pilihan kemungkinan
document.querySelectorAll('#wishChoices button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('#wishChoices button')
      .forEach(b => b.classList.remove('selected'));

    button.classList.add('selected');

    document.getElementById('wishFeedback').textContent =
      button.dataset.answer;
  });
});

// Surat tersembunyi
document.getElementById('revealBtn').addEventListener('click', () => {
  const note = document.getElementById('hiddenNote');
  const opened = note.classList.toggle('show');

  document.getElementById('revealBtn').textContent =
    opened ? 'Tutup catatan −' : 'Buka catatan tersembunyi ＋';
});

// Catatan pribadi
document.getElementById('saveNote').addEventListener('click', () => {
  const value = document.getElementById('ownNote').value.trim();

  document.getElementById('noteFeedback').textContent = value
    ? '“' + value + '” — simpan kalimat ini baik-baik.'
    : 'Tulis satu kalimat terlebih dahulu.';
});

showPage(0);
