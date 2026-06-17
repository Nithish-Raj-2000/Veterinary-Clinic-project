/* ==========================================================================
   STACKLY Veterinary Clinic — Header / Footer Injection
   Renders shared header & footer markup into #site-header / #site-footer
   so every page stays in sync without a build step.
   ========================================================================== */

(function () {
  const LOGO = 'Images/stackly-logo.webp';

  const ICONS = {
    facebook: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z"/></svg>',
    instagram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.22.41.56.21.96.47 1.38.89.42.42.68.82.89 1.38.17.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.41 2.22-.21.56-.47.96-.89 1.38-.42.42-.82.68-1.38.89-.42.17-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.41-.56-.21-.96-.47-1.38-.89-.42-.42-.68-.82-.89-1.38-.17-.42-.36-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.8.41-2.22.21-.56.47-.96.89-1.38.42-.42.82-.68 1.38-.89.42-.17 1.05-.36 2.22-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.8.31-1.48.72-2.15 1.39C1.32 2.69.91 3.37.6 4.17c-.3.76-.5 1.64-.56 2.91C0 8.36 0 8.77 0 12s.01 3.64.07 4.92c.06 1.27.26 2.15.56 2.91.31.8.72 1.48 1.39 2.15.67.67 1.35 1.08 2.15 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.64-.01 4.92-.07c1.27-.06 2.15-.26 2.91-.56.8-.31 1.48-.72 2.15-1.39.67-.67 1.08-1.35 1.39-2.15.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.92s-.01-3.64-.07-4.92c-.06-1.27-.26-2.15-.56-2.91-.31-.8-.72-1.48-1.39-2.15C21.31 1.32 20.63.91 19.83.6c-.76-.3-1.64-.5-2.91-.56C15.64 0 15.23 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.41-9.85a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>',
    whatsapp: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-1.75-.87-2.9-1.55-4.05-3.52-.31-.53.31-.49.88-1.64.1-.2.05-.37-.05-.52-.1-.15-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.54-.01-.2 0-.5.07-.77.37-.27.3-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.15.2 2.05 3.13 5.05 4.27 2.5.95 2.5.63 3 .58.5-.05 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.12-.27-.2-.57-.36zM12.04 22h-.01a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.77 1 1-3.66-.24-.38A9.94 9.94 0 0 1 2.04 12c0-5.5 4.48-9.98 10-9.98 2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.5-4.48 10-9.96 10zm8.49-18.49A11.9 11.9 0 0 0 12.04 0C5.5 0 .15 5.35.15 11.9c0 2.13.56 4.2 1.62 6.02L0 24l6.27-1.65a11.9 11.9 0 0 0 5.77 1.47h.01c6.53 0 11.88-5.35 11.88-11.9 0-3.18-1.24-6.17-3.4-8.41z"/></svg>',
    youtube: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2s-.23-1.64-.94-2.36c-.9-.95-1.91-.95-2.37-1C16.86 2.5 12 2.5 12 2.5h-.01s-4.85 0-8.18.34c-.46.05-1.47.05-2.37 1-.71.72-.94 2.36-.94 2.36S0 8.13 0 10.06v1.87c0 1.93.23 3.86.23 3.86s.23 1.64.94 2.36c.9.95 2.08.92 2.6 1.02 1.89.18 8.23.34 8.23.34s4.86-.01 8.19-.35c.46-.05 1.47-.05 2.37-1 .71-.72.94-2.36.94-2.36s.23-1.93.23-3.86v-1.87c0-1.93-.23-3.86-.23-3.86zM9.55 14.8V8.3l6.27 3.25-6.27 3.25z"/></svg>',
  };

  const NAV_LINKS = [
    { href: 'index.html', label: 'Home', page: 'home' },
    { href: 'about.html', label: 'About', page: 'about' },
    { href: 'services.html', label: 'Services', page: 'services' },
    { href: 'doctors.html', label: 'Doctors', page: 'doctors' },
    { href: 'pet-care.html', label: 'Pet Care', page: 'pet-care' },
    { href: 'contact.html', label: 'Contact', page: 'contact' },
  ];

  function renderMega(items) {
    return items.map(([icon, label, href]) =>
      `<a href="${href}"><span class="mega-icon">${icon}</span>${label}</a>`
    ).join('');
  }

  function renderHeader(currentPage) {
    const items = NAV_LINKS.map(link => {
      const active = link.page === currentPage ? ' active' : '';
      if (link.mega) {
        return `<li class="has-mega">
            <a href="${link.href}" class="${active.trim()}">${link.label}</a>
            <div class="mega-menu">${renderMega(link.mega)}</div>
          </li>`;
      }
      return `<li><a href="${link.href}" class="${active.trim()}">${link.label}</a></li>`;
    }).join('');

    return `
      <div class="nav-wrap">
        <a href="index.html" class="brand" aria-label="STACKLY Veterinary Clinic — Home">
          <div class="brand-text">
            <img src="${LOGO}" alt="STACKLY Veterinary Clinic logo" width="48" height="48">
            <span class="brand-tagline">VETERINARY CLINIC</span>
          </div>
        </a>
        <nav class="main-nav" id="mainNav" aria-label="Primary navigation">
          <ul class="nav-list">${items}</ul>
          <div class="nav-cta">
            <a href="login.html" class="btn btn-outline btn-sm">Login</a>
            <a href="appointments.html" class="btn btn-gold btn-sm">Book Appointment</a>
          </div>
        </nav>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>`;
  }

  function renderFooter() {
    return `
      <div class="container footer-grid">
        <div class="footer-col footer-brand">
          <a href="index.html" class="brand" aria-label="STACKLY Veterinary Clinic — Home">
            <img src="${LOGO}" alt="STACKLY Veterinary Clinic logo" width="48" height="48">
          </a>
          <p>Premium veterinary healthcare delivered with compassion, precision, and modern medicine for the pets you love.</p>
          <div class="social-row">
            <a href="404.html" aria-label="Facebook">${ICONS.facebook}</a>
            <a href="404.html" aria-label="Instagram">${ICONS.instagram}</a>
            <a href="404.html" aria-label="WhatsApp">${ICONS.whatsapp}</a>
            <a href="404.html" aria-label="YouTube">${ICONS.youtube}</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="doctors.html">Our Doctors</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="pet-care.html">Pet Care</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="services.html#vaccination">Vaccination</a></li>
            <li><a href="services.html#surgery">Surgery</a></li>
            <li><a href="services.html#grooming">Pet Grooming</a></li>
            <li><a href="services.html#emergency">Emergency Care</a></li>
            <li><a href="services.html#boarding">Pet Boarding</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Newsletter</h4>
          <p style="font-size:0.88rem;color:rgba(255,255,255,0.6);">Subscribe for pet health tips and clinic updates.</p>
          <form class="newsletter-form" id="newsletterForm">
            <label class="sr-only" for="newsletterEmail">Email address</label>
            <input type="email" id="newsletterEmail" placeholder="Your email" required>
            <button type="submit" aria-label="Subscribe">→</button>
          </form>
          <a href="404.html" class="footer-contact-link" style="margin-top:10px;">📞 +1 (800) 555-0199</a>
          <a href="404.html" class="footer-contact-link">✉️ care@stacklyvet.com</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; <span id="year"></span> STACKLY Veterinary Clinic. All rights reserved.</p>
        <p><a href="contact.html">Emergency: 24/7</a></p>
      </div>`;
  }

  function init() {
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    const currentPage = document.body.getAttribute('data-page') || '';

    if (headerEl) headerEl.innerHTML = renderHeader(currentPage);
    if (footerEl) footerEl.innerHTML = renderFooter();

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    setupHeaderBehavior();
  }

  function setupHeaderBehavior() {
    const header = document.querySelector('.site-header');
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('mainNav');
    if (!header) return;

    const page = document.body.getAttribute('data-page') || '';
    const forceScrolled = page !== 'home';

    const onScroll = () => {
      header.classList.toggle('is-scrolled', forceScrolled || window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        toggle.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
      });

      nav.querySelectorAll('.has-mega > a').forEach(link => {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 900) {
            e.preventDefault();
            link.closest('.has-mega').classList.toggle('is-expanded');
          }
        });
      });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('newsletterEmail');
        if (input.checkValidity()) {
          input.value = '';
          input.placeholder = 'Subscribed! 🎉';
        }
      });
    }

    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('is-visible', window.scrollY > 480);
      }, { passive: true });
      scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
