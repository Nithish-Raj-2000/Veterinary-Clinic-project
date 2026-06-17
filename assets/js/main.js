/* ==========================================================================
   STACKLY Veterinary Clinic — Global Interactions
   Scroll reveal, counters, accordion, lightbox, lazy image fade-in.
   ========================================================================== */

(function () {
  /* Scroll reveal */
  function initReveal() {
    const els = document.querySelectorAll('[data-animate]');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(el => el.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => entry.target.classList.add('in-view'), Number(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(el => observer.observe(el));
  }

  /* Animated counters */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    const animate = (el) => {
      const target = Number(el.getAttribute('data-counter'));
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString() + (el.getAttribute('data-suffix') || '');
      }
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { animate(entry.target); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(c => obs.observe(c));
    } else {
      counters.forEach(animate);
    }
  }

  /* Accordion (FAQ) */
  function initAccordion() {
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const panel = item.querySelector('.accordion-panel');
        const isOpen = item.classList.contains('is-open');

        item.parentElement.querySelectorAll('.accordion-item.is-open').forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove('is-open');
            openItem.querySelector('.accordion-panel').style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('is-open');
          panel.style.maxHeight = null;
        } else {
          item.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  /* FAQ search */
  function initFaqSearch() {
    const input = document.getElementById('faqSearch');
    if (!input) return;
    input.addEventListener('input', () => {
      const term = input.value.trim().toLowerCase();
      document.querySelectorAll('.accordion-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? '' : 'none';
      });
    });
  }

  /* Lightbox gallery */
  function initLightbox() {
    const items = document.querySelectorAll('.masonry .g-item');
    const lightbox = document.getElementById('lightbox');
    if (!items.length || !lightbox) return;
    const lbImg = lightbox.querySelector('img');
    const images = Array.from(items).map(i => i.querySelector('img').src);
    let current = 0;

    function open(idx) {
      current = idx;
      lbImg.src = images[current];
      lightbox.classList.add('is-open');
    }
    function close() { lightbox.classList.remove('is-open'); }
    function nav(dir) {
      current = (current + dir + images.length) % images.length;
      lbImg.src = images[current];
    }

    items.forEach((item, idx) => item.addEventListener('click', () => open(idx)));
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-nav.prev').addEventListener('click', () => nav(-1));
    lightbox.querySelector('.lightbox-nav.next').addEventListener('click', () => nav(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') nav(-1);
      if (e.key === 'ArrowRight') nav(1);
    });
  }

  /* Hero parallax on scroll */
  function initParallax() {
    const heroImg = document.querySelector('.hero-img');
    if (!heroImg) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.35, 160);
        heroImg.style.transform = `translateY(${offset}px) scale(1.08)`;
        ticking = false;
      });
    }, { passive: true });
  }

  /* Button ripple effect on click */
  function initRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height) * 2;
        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.45)';
        ripple.style.transform = 'scale(0)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        btn.appendChild(ripple);
        requestAnimationFrame(() => { ripple.style.transform = 'scale(1)'; ripple.style.opacity = '0'; });
        setTimeout(() => ripple.remove(), 650);
      });
    });
  }

  /* Lazy image fade-in once loaded */
  function initLazyFade() {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (img.complete) img.classList.add('loaded');
      else img.addEventListener('load', () => img.classList.add('loaded'));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initCounters();
    initAccordion();
    initFaqSearch();
    initLightbox();
    initLazyFade();
    initParallax();
    initRipple();
  });
})();
