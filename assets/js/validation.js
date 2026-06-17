/* ==========================================================================
   STACKLY Veterinary Clinic — Form Validation Utilities
   Real-time validation with error/success states. No external deps.
   ========================================================================== */

const StacklyValidate = (function () {
  const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  const PHONE_RE = /^[+\d\s().\-]+$/;

  function sanitize(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .trim();
  }

  function setState(group, ok, message) {
    group.classList.remove('has-error', 'has-success');
    group.classList.add(ok ? 'has-success' : 'has-error');
    const msgEl = group.querySelector(ok ? '.success-message' : '.error-message');
    if (msgEl && message) msgEl.textContent = message;
  }

  function clearState(group) {
    group.classList.remove('has-error', 'has-success');
  }

  function passwordStrength(value) {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score;
  }

  function updateStrengthMeter(input, score) {
    const wrap = input.closest('.input-wrap') || input.closest('.form-group');
    const bar = wrap.querySelector('.password-strength-bar');
    const label = wrap.querySelector('.password-strength-label');
    if (!bar) return;
    const levels = [
      { width: '0%', color: 'var(--color-error)', text: 'Too short' },
      { width: '25%', color: 'var(--color-error)', text: 'Weak' },
      { width: '50%', color: 'var(--color-gold)', text: 'Fair' },
      { width: '75%', color: 'var(--color-teal)', text: 'Good' },
      { width: '100%', color: 'var(--color-success)', text: 'Strong' },
    ];
    const level = levels[Math.min(score, 4)];
    bar.style.width = input.value ? level.width : '0%';
    bar.style.background = level.color;
    if (label) label.textContent = input.value ? level.text : '';
  }

  function validateField(input) {
    const group = input.closest('.form-group');
    if (!group) return true;
    const value = sanitize(input.value);
    const rule = input.getAttribute('data-rule');

    if (input.hasAttribute('required') && value === '') {
      setState(group, false, 'This field is required.');
      return false;
    }
    if (value === '' && !input.hasAttribute('required')) {
      clearState(group);
      return true;
    }

    const minLen = parseInt(input.getAttribute('minlength'), 10);
    if (!isNaN(minLen) && value.length < minLen) {
      setState(group, false, `Please enter at least ${minLen} characters.`);
      return false;
    }

    switch (rule) {
      case 'email':
        if (!EMAIL_RE.test(value)) { setState(group, false, 'Enter a valid email address (e.g. you@example.com).'); return false; }
        break;
      case 'phone': {
        const digits = value.replace(/\D/g, '');
        if (!PHONE_RE.test(value) || digits.length < 7 || digits.length > 13) {
          setState(group, false, 'Enter a valid phone number (7–13 digits).');
          return false;
        }
        break;
      }
      case 'password': {
        const strength = passwordStrength(value);
        updateStrengthMeter(input, strength);
        if (value.length < 8) { setState(group, false, 'Password must be at least 8 characters.'); return false; }
        if (strength < 3) { setState(group, false, 'Use upper/lowercase letters, numbers & symbols.'); return false; }
        break;
      }
      case 'confirm-password': {
        const target = document.getElementById(input.getAttribute('data-match'));
        if (!target || target.value !== input.value) { setState(group, false, 'Passwords do not match.'); return false; }
        break;
      }
      case 'name': {
        const NAME_RE = /^[a-zA-ZÀ-ÿ'.\- ]+$/;
        const parts = value.trim().split(/\s+/);
        if (!NAME_RE.test(value) || parts.length < 2 || parts.some(p => p.replace(/['.\-]/g, '').length < 2)) {
          setState(group, false, 'Enter your full name (first and last name, letters only).');
          return false;
        }
        break;
      }
    }

    setState(group, true, 'Looks good.');
    return true;
  }

  function attachForm(form) {
    if (!form) return;
    const fields = form.querySelectorAll('.form-control');
    fields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.getAttribute('data-rule') === 'password') updateStrengthMeter(field, passwordStrength(field.value));
        if (field.closest('.form-group').classList.contains('has-error')) validateField(field);
      });
    });

    form.addEventListener('submit', (e) => {
      let valid = true;
      fields.forEach(field => { if (!validateField(field)) valid = false; });
      if (!valid) {
        e.preventDefault();
        const firstError = form.querySelector('.has-error .form-control');
        if (firstError) firstError.focus();
      }
    });
  }

  function togglePassword(button) {
    const input = button.closest('.input-wrap').querySelector('input');
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    button.textContent = show ? 'Hide' : 'Show';
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form[data-validate]').forEach(attachForm);
    document.querySelectorAll('.toggle-password').forEach(btn => {
      btn.addEventListener('click', () => togglePassword(btn));
    });
  });

  return { validateField, sanitize, passwordStrength };
})();
