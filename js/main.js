/**
 * Terra Vita Massage & Spa — Main JavaScript
 * Навигация, анимации, общие функции
 */

document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initScrollAnimations();
  initBackToTop();
  initFaqAccordion();
  initSmoothScroll();
  highlightActiveNav();
});

/* ============================================
   1. Mobile Menu (Burger)
   ============================================ */
function initMobileMenu() {
  const burger = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const body = document.body;

  if (!burger || !menu) return;

  burger.addEventListener('click', function () {
    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open');
    burger.classList.toggle('open');
    body.style.overflow = isOpen ? '' : 'hidden';

    // Update aria
    burger.setAttribute('aria-expanded', !isOpen);
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      burger.classList.remove('open');
      body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      burger.classList.remove('open');
      body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ============================================
   2. Scroll Animations (Intersection Observer)
   ============================================ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale');

  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

/* ============================================
   3. Back to Top Button
   ============================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================
   4. FAQ Accordion
   ============================================ */
function initFaqAccordion() {
  const questions = document.querySelectorAll('.faq-question');
  if (questions.length === 0) return;

  questions.forEach(function (q) {
    q.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isOpen = answer.classList.contains('open');

      // Close all
      questions.forEach(function (other) {
        other.nextElementSibling.classList.remove('open');
        other.classList.remove('open');
      });

      // Open current if was closed
      if (!isOpen) {
        answer.classList.add('open');
        this.classList.add('open');
      }
    });
  });
}

/* ============================================
   5. Smooth Scroll for Anchor Links
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================
   6. Highlight Active Nav Link
   ============================================ */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('text-[#C9A96E]', 'font-semibold');
    }
  });
}

/* ============================================
   7. Toast Notification Helper
   ============================================ */
function showToast(message, type) {
  // Remove existing toast
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.className = 'toast toast-' + (type || 'success');
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(function () {
    toast.classList.add('show');
  });

  // Auto-hide after 5s
  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.remove(); }, 400);
  }, 5000);
}

/* ============================================
   8. Prefill Service in Booking Form
   ============================================ */
function prefillBooking(service) {
  // Store in sessionStorage for cross-page
  if (service) {
    sessionStorage.setItem('prefill_service', service);
    window.location.href = 'booking.html';
  }
}
