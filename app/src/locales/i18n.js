import en from './en.js';
import fr from './fr.js';

const translations = { en, fr };

// Determine initial language
let currentLang = localStorage.getItem('lang');
if (!currentLang) {
    currentLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
    localStorage.setItem('lang', currentLang);
}

// Global translation function: key is the English text
export function t(key) {
    return translations[currentLang]?.[key] || key;
}

// Function to translate the DOM
export function translateDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[currentLang]?.[key] || key;
        if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'search')) {
            el.placeholder = translation;
        } else {
            el.innerHTML = translation;
        }
    });
}

// Expose globally
window.t = t;
window.setLang = function (lang) {
    localStorage.setItem('lang', lang);
    location.reload();
};

