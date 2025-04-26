/**
 * Main JavaScript for christopher-rauch.info
 * Author: Christopher Rauch
 * Created: April 2025
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
    
    if (mobileMenuToggle && mobileNav && mobileNavClose) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
        
        mobileNavClose.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
        
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
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
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
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
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
    
    if (languageToggle) {
        const toggleButtons = languageToggle.querySelectorAll('button');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const language = this.getAttribute('data-language');
                
                // Update button states
                toggleButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Redirect to the appropriate language version
                if (language === 'en') {
                    // Redirect to English version
                    window.location.href = window.location.pathname.replace('/de/', '/').replace('_de.html', '.html');
                } else if (language === 'de') {
                    // Redirect to German version
                    const currentPath = window.location.pathname;
                    const isRoot = currentPath === '/' || currentPath.endsWith('/index.html');
                    
                    if (isRoot) {
                        window.location.href = '/de/index.html';
                    } else {
                        const fileName = currentPath.split('/').pop();
                        const withoutExtension = fileName.replace('.html', '');
                        window.location.href = `/de/${withoutExtension}_de.html`;
                    }
                }
            });
        });
    }
}

/**
 * Handles the download tracking
 */
function trackDownload(cvType, language) {
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
