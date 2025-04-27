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
        code: 'en',
        url: '/index.html'
    },
    'de': {
        name: 'Deutsch',
        code: 'de',
        url: '/de/index.html'
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
    const languageSwitchers = document.querySelectorAll('.language-toggle');
    
    if (languageSwitchers.length === 0) return;
    
    languageSwitchers.forEach(languageSwitcher => {
        const buttons = languageSwitcher.querySelectorAll('button, a[data-language]');
        
        // Set active state based on current language
        buttons.forEach(button => {
            const buttonLang = button.getAttribute('data-language');
            
            if (buttonLang === currentLanguage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    });
}

/**
 * Switch to another language
 * @param {string} lang - Language code to switch to
 */
function switchLanguage(lang) {
    if (!languages[lang] || lang === currentLanguage) return;
    
    // Get current path and determine target URL
    const currentPath = window.location.pathname;
    let newUrl = '';
    
    // Simple mapping for common pages
    if (lang === 'en') {
        // Switch to English
        newUrl = currentPath.replace('/de/', '/').replace('_de.html', '.html');
    } else if (lang === 'de') {
        // Switch to German
        if (currentPath === '/' || currentPath.endsWith('/index.html')) {
            newUrl = '/de/index.html';
        } else {
            const pathParts = currentPath.split('/');
            const fileName = pathParts.pop() || 'index.html';
            const baseName = fileName.replace('.html', '');
            
            // Handle potential subdirectories
            const pathPrefix = pathParts.length > 0 ? '/de' : 'de';
            newUrl = `${pathPrefix}/${baseName}_de.html`;
        }
    }
    
    // Redirect to new URL
    if (newUrl) {
        window.location.href = newUrl;
    }
}