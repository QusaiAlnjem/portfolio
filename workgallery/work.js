// Helper: Get URL parameter
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

let lang = getQueryParam('lang') || localStorage.getItem('selectedLang') || 'en';
setLanguage(lang);
localStorage.setItem('selectedLang', lang); // Save for persistence

function setLanguage(lang) {
  fetch(`languages/${lang}.json`)
  .then(response => response.json())
  .then(translations => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translations[key];
        } else {
          el.textContent = translations[key];
        }
      }
    });

    // Set direction and language attributes for Arabic
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  });
}