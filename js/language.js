/**
 * Language switching functionality for christopher-rauch.info
 * Author: Christopher Rauch
 * Created: April 2025
 * Updated: April 2025
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

// Language URL mappings
const languageUrls = {
    'en': {
        'index.html': '/index.html',
        'cv.html': '/cv.html'
    },
    'de': {
        'index.html': '/de/index.html',
        'cv.html': '/de/cv.html'
    }
};

// Initialize language functionality
document.addEventListener('DOMContentLoaded', function() {
    // Detect current language from URL
    detectLanguage();
    
    // Initialize language switcher
    initLanguageSwitcher();
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
    
    if (!languageSwitcher) {
        return;
    }
    
    const buttons = languageSwitcher.querySelectorAll('button, a');
    
    if (buttons.length === 0) {
        return;
    }
    
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
