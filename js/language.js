/**
 * Language switching functionality for christopher-rauch.info
 * Author: Christopher Rauch
 * Created: April 2025
 */

// Default language
let currentLanguage = 'en';

// Available languages
const languages = {
    'en': {
        name: 'English',
        code: 'en'
    },
    'de': {
        name: 'Deutsch',
        code: 'de'
    }
};

// Initialize language functionality
document.addEventListener('DOMContentLoaded', function() {
    // Detect current language from URL
    detectLanguage();
    
    // Initialize language switcher
    initLanguageSwitcher();
    
    // Load language content
    loadLanguageContent();
});

/**
 * Detect current language from URL
 */
function detectLanguage() {
    // Check URL for language indicator
    const path = window.location.pathname;
    
    if (path.includes('/de/') || path.includes('_de.html')) {
        currentLanguage = 'de';
    } else {
        currentLanguage = 'en';
    }
    
    // Set HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

/**
 * Initialize language switcher UI
 */
function initLanguageSwitcher() {
    const languageSwitcher = document.querySelector('.language-toggle');
    
    if (languageSwitcher) {
        const buttons = languageSwitcher.querySelectorAll('button');
        
        // Set active state based on current language
        buttons.forEach(button => {
            const buttonLang = button.getAttribute('data-language');
            
            if (buttonLang === currentLanguage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}

/**
 * Load language-specific content
 */
function loadLanguageContent() {
    // This function loads content from language files if using JSON-based translations
    // For static sites, we use separate HTML files per language instead
    
    // Example implementation for dynamic content loading:
    /*
    fetch(`/locales/${currentLanguage}/translations.json`)
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (translations[key]) {
                    element.innerHTML = translations[key];
                }
            });
        })
        .catch(error => {
            console.error('Error loading translations:', error);
        });
    */
}

/**
 * Switch to another language
 * @param {string} lang - Language code to switch to
 */
function switchLanguage(lang) {
    if (languages[lang] && lang !== currentLanguage) {
        // Calculate new URL
        let newUrl;
        const currentPath = window.location.pathname;
        
        if (lang === 'en') {
            // Switch to English
            newUrl = currentPath.replace('/de/', '/').replace('_de.html', '.html');
        } else if (lang === 'de') {
            // Switch to German
            if (currentPath === '/' || currentPath.endsWith('/index.html')) {
                newUrl = '/de/index.html';
            } else {
                const fileName = currentPath.split('/').pop();
                const baseName = fileName.replace('.html', '');
                newUrl = `/de/${baseName}_de.html`;
            }
        }
        
        // Redirect to new URL
        if (newUrl) {
            window.location.href = newUrl;
        }
    }
}
