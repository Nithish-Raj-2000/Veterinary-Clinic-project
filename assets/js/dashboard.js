/* ==========================================================================
   STACKLY Veterinary Clinic — Dashboard Shell Behavior
   Sidebar tab switching, mobile sidebar, notifications, session, logout,
   animated bar charts. Shared across Admin / Doctor / Patient dashboards.
   ========================================================================== */

(function () {
  function getSession() {
    const raw = localStorage.getItem('stackly_session') || sessionStorage.getItem('stackly_session');
    try { return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }

  function initSession() {
    const session = getSession();
    const nameEl = document.getElementById('topbarUserName');
    const avatarEl = document.getElementById('topbarAvatar');
    const heroNameEl = document.getElementById('heroUserName');
    const heroEmailEl = document.getElementById('heroUserEmail');
    const heroDateEl = document.getElementById('heroDate');

    if (session) {
      const email = session.email || 'user@example.com';
      const emailUser = email.split('@')[0];
      const displayName = emailUser.charAt(0).toUpperCase() + emailUser.slice(1);

      if (nameEl) nameEl.textContent = email;
      if (avatarEl) avatarEl.textContent = email.charAt(0).toUpperCase();
      if (heroNameEl) heroNameEl.textContent = displayName;
      if (heroEmailEl) heroEmailEl.textContent = email;
    }

    if (heroDateEl) {
      const now = new Date();
      heroDateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
      });
    }

    const logoutBtns = document.querySelectorAll('[data-action="logout"]');
    logoutBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('stackly_session');
      sessionStorage.removeItem('stackly_session');
      window.location.href = 'login.html';
    }));
  }

  function initSidebarNav() {
    const navLinks = document.querySelectorAll('.dash-nav [data-target]');
    const sections = document.querySelectorAll('.dash-section');
    if (!navLinks.length) return;

    /* Activate a panel by its ID and optionally update the topbar title */
    function activatePanel(targetId) {
      const link = document.querySelector(`.dash-nav [data-target="${targetId}"]`);
      if (!link) return;
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      sections.forEach(s => s.classList.toggle('active', s.id === targetId));
      const titleEl = document.getElementById('dashTitle');
      if (titleEl) titleEl.textContent = link.textContent.trim();
    }

    /* On page load: restore the panel the user was on before navigating to 404.
       history.replaceState writes the panel ID into the URL hash on every
       sidebar click, so history.back() on the 404 page returns here with the
       correct hash still in the URL. */
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
      activatePanel(hash);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        /* replaceState updates the URL without adding a new history entry,
           so panel switches don't pollute the back-button stack. */
        history.replaceState(null, '', '#' + target);
        activatePanel(target);
        closeMobileSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function closeMobileSidebar() {
    document.querySelector('.dash-sidebar')?.classList.remove('is-open');
    document.getElementById('dashOverlay')?.classList.remove('is-open');
  }

  function initMobileSidebar() {
    const toggle   = document.getElementById('sidebarToggle');
    const closeBtn = document.getElementById('sidebarClose');
    const sidebar  = document.querySelector('.dash-sidebar');
    const overlay  = document.getElementById('dashOverlay');
    if (!toggle || !sidebar) return;
    toggle.addEventListener('click', () => {
      sidebar.classList.add('is-open');
      overlay?.classList.add('is-open');
    });
    closeBtn?.addEventListener('click', closeMobileSidebar);
    overlay?.addEventListener('click', closeMobileSidebar);
  }

  function initNotifications() {
    const btn = document.getElementById('notifBtn');
    const dropdown = document.getElementById('notifDropdown');
    if (!btn || !dropdown) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('is-open');
    });
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && e.target !== btn) dropdown.classList.remove('is-open');
    });
  }

  function initBarCharts() {
    document.querySelectorAll('.bar-chart .bar').forEach(bar => {
      const value = Number(bar.getAttribute('data-value'));
      const max = Number(bar.closest('.bar-chart').getAttribute('data-max')) || 100;
      requestAnimationFrame(() => {
        bar.style.height = Math.max(6, (value / max) * 100) + '%';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSession();
    initSidebarNav();
    initMobileSidebar();
    initNotifications();
    initBarCharts();
  });
})();
