/* ============================================================
   VINIT PATIL PORTFOLIO — SCRIPT.JS  (Multi-Page Edition)
   ============================================================ */

/* ================================================================
   1.  MULTI-PAGE NAVIGATION
   ================================================================ */

let currentPage = 'home';

/**
 * Show a named page and hide all others.
 * @param {string} pageId  - matches data-page attribute and id="page-{id}"
 */
function showPage(pageId) {
  if (pageId === currentPage) return;

  const targetPage = document.getElementById('page-' + pageId);
  if (!targetPage) return;

  // Hide current page
  const oldPage = document.getElementById('page-' + currentPage);
  if (oldPage) {
    oldPage.classList.remove('active', 'page-enter');
  }

  // Update tracked page
  currentPage = pageId;

  // Show new page with entrance animation
  targetPage.scrollTop = 0;
  targetPage.classList.add('active', 'page-enter');

  // Remove page-enter after animation completes
  setTimeout(() => {
    targetPage.classList.remove('page-enter');
  }, 500);

  // Trigger animate-in elements (wait a frame so display:block takes effect)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animatePageElements(targetPage);
    });
  });

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });

  // Close mobile menu if open
  hamburger.classList.remove('active');
  navLinks.classList.remove('open');

  // Scroll window to top
  window.scrollTo(0, 0);
}

/**
 * Trigger .animate-in elements to become visible with staggered delay.
 */
function animatePageElements(pageEl) {
  const els = pageEl.querySelectorAll('.animate-in');
  els.forEach(el => {
    // Reset first so re-visiting a page re-animates
    el.classList.remove('visible');
  });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      els.forEach(el => el.classList.add('visible'));
    });
  });
}

/* ================================================================
   2.  WIRE UP ALL NAV BUTTONS & DATA-PAGE BUTTONS
   ================================================================ */

// Nav bar buttons
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', (e) => {
    const page = el.dataset.page;
    if (page) showPage(page);
  });
});

/* ================================================================
   3.  NAVBAR (hamburger + scroll style)
   ================================================================ */

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Navbar shadow on page scroll (each page scrolls internally)
document.querySelectorAll('.page').forEach(page => {
  page.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', page.scrollTop > 40 || window.scrollY > 40);
  });
});
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

/* ================================================================
   4.  TYPING ANIMATION  (home page)
   ================================================================ */

const typedEl  = document.getElementById('typed-text');
const phrases  = [
  'Software Developer',
  'Java Programmer',
  'Python Enthusiast',
  'SQL Engineer',
  'Problem Solver',
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, --charIndex);
  } else {
    typedEl.textContent = current.substring(0, ++charIndex);
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeLoop, delay);
}
typeLoop();

/* ================================================================
   5.  PARTICLE BACKGROUND  (home page)
   ================================================================ */

const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 26;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size     = Math.random() * 4 + 2;
  const startX   = Math.random() * 100;
  const duration = Math.random() * 15 + 10;
  const delay    = Math.random() * 10;
  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${startX}%;
    top: ${Math.random() * 100 + 100}%;
    animation-duration: ${duration}s;
    animation-delay: -${delay}s;
  `;
  particlesContainer.appendChild(p);
}

/* ================================================================
   6.  MOUSE-GLOW ON HOME SECTION
   ================================================================ */

const homeSection = document.getElementById('page-home');
homeSection.addEventListener('mousemove', (e) => {
  const rect = homeSection.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width)  * 100;
  const y = ((e.clientY - rect.top)  / rect.height) * 100;
  homeSection.style.setProperty('--mouse-x', x + '%');
  homeSection.style.setProperty('--mouse-y', y + '%');
});

/* ================================================================
   7.  CERTIFICATE MODAL
   ================================================================ */

const certModal      = document.getElementById('certModal');
const certModalClose = document.getElementById('certModalClose');

function openCertModal(card) {
  const title       = card.dataset.title;
  const issuer      = card.dataset.issuer;
  const date        = card.dataset.date;
  const icon        = card.dataset.icon;
  const iconClass   = card.dataset.iconClass;
  const verifyLabel = card.dataset.verifyLabel;
  const verifyValue = card.dataset.verifyValue;
  const verifyUrl   = card.dataset.verifyUrl;

  document.getElementById('certModalTitle').textContent  = title;
  document.getElementById('certModalIssuer').textContent = issuer;
  document.getElementById('certModalDate').textContent   = date;

  const iconEl = document.getElementById('certModalIconI');
  iconEl.className = icon;
  const iconWrap = document.getElementById('certModalIcon');
  iconWrap.className = 'cert-modal-icon ' + iconClass;

  document.getElementById('certModalVerifyLabel').textContent = verifyLabel + ':';
  const linkEl = document.getElementById('certModalVerifyLink');
  const codeEl = document.getElementById('certModalVerifyCode');

  if (verifyUrl) {
    linkEl.href          = verifyUrl;
    linkEl.textContent   = verifyValue;
    linkEl.style.display = 'inline-flex';
    codeEl.style.display = 'none';
  } else {
    codeEl.textContent   = verifyValue;
    codeEl.style.display = 'block';
    linkEl.style.display = 'none';
  }

  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.cert-clickable').forEach(card => {
  card.addEventListener('click', () => openCertModal(card));
});
certModalClose.addEventListener('click', closeCertModal);
certModal.addEventListener('click', (e) => { if (e.target === certModal) closeCertModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCertModal(); });

/* ================================================================
   8.  PAGE LOAD — animate home page on first visit
   ================================================================ */

window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity   = '1';
    // Animate home page elements immediately
    const homePage = document.getElementById('page-home');
    animatePageElements(homePage);
  }, 60);
});
