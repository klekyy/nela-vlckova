document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    const gdpr = form.querySelector('input[name="gdpr_consent"]');
    if (!gdpr) return;

    function ensureErrorContainer(el) {
      let container = el.closest ? el.closest('.gdpr-checkbox') : el.parentElement;
      if (!container) container = form;
      let msg = container.querySelector(':scope > .error-msg');
      if (!msg) {
        msg = document.createElement('div');
        msg.className = 'error-msg';
        container.appendChild(msg);
      }
      return msg;
    }

    function validateGdpr() {
      if (gdpr.checked) {
        const container = gdpr.closest ? gdpr.closest('.gdpr-checkbox') : gdpr.parentElement;
        const msg = container && container.querySelector(':scope > .error-msg');
        if (msg) msg.remove();
        gdpr.classList.remove('invalid');
        return true;
      } else {
        const msg = ensureErrorContainer(gdpr);
        msg.textContent = 'Zaškrtněte prosím souhlas se zpracováním osobních údajů.';
        gdpr.classList.add('invalid');
        return false;
      }
    }

    gdpr.addEventListener('change', validateGdpr);
    form.addEventListener('submit', (e) => {
      const ok = validateGdpr();
      if (!ok) e.preventDefault();
    });
  });
});

