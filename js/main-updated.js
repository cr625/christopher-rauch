/**
 * Main JavaScript for christopher-rauch.info
 * Author: Christopher Rauch
 * Created: April 2025
 * Updated: April 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize active navigation highlighting
    initActiveNavHighlighting();
    
    // Initialize language toggler if present
    initLanguageToggle();
});

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
        
        // Handle close button if it exists
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            });
        }
        
        // Close menu when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80; // Offset for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize active navigation highlighting
 */
function initActiveNavHighlighting() {
    const navLinks = document.querySelectorAll('nav a');
    
    if (!navLinks || navLinks.length === 0) return;
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (!linkPage) return;
        
        if (linkPage === currentPage || 
            (currentPage === 'index.html' && linkPage === '/') ||
            (linkPage !== '/' && currentPage.includes(linkPage))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize language toggle functionality
 */
function initLanguageToggle() {
    const languageToggle = document.querySelector('.language-toggle');
    
    if (!languageToggle) return;
    
    const toggleButtons = languageToggle.querySelectorAll('button, a[data-language]');
    
    if (!toggleButtons || toggleButtons.length === 0) return;
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.tagName.toLowerCase() === 'a' && this.hasAttribute('href')) {
                // For link elements, let the default link behavior work
                return;
            }
            
            // For button elements, handle language switching
            e.preventDefault();
            const language = this.getAttribute('data-language');
            
            // Update button states
            toggleButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Switch language using the dedicated function from language.js
            if (typeof switchLanguage === 'function') {
                switchLanguage(language);
            }
        });
    });
}

/**
 * Handles the download tracking
 * @param {string} cvType - Type of CV downloaded
 * @param {string} language - Language of CV downloaded
 */
function trackDownload(cvType, language) {
    if (!cvType || !language) return;
    
    // If analytics is implemented, track download event
    console.log(`CV downloaded: ${cvType} (${language})`);
    
    // Could send to analytics service if implemented
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cv_download', {
            'cv_type': cvType,
            'language': language
        });
    }
    */
}