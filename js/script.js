// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initTabs();
    initSmoothScrolling();
    // initHeaderScroll();
    initAnimations();
    ensureHeroVideoAutoplay();
    initDropdowns();
    initScrollEffects();
    initIndustryFilters();
});

// (Globe code removed by request)

// Tab functionality for work process section
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Industry filter functionality for customer stories page
function initIndustryFilters() {
    const filterButtons = document.querySelectorAll('.cs-filter-btn');
    const storyCards = document.querySelectorAll('.cs-story-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetIndustry = button.getAttribute('data-industry');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('cs-active'));
            
            // Add active class to clicked button
            button.classList.add('cs-active');
            
            // Filter story cards
            storyCards.forEach(card => {
                const cardIndustry = card.getAttribute('data-industry');
                
                if (targetIndustry === 'all' || cardIndustry === targetIndustry) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
// function initHeaderScroll() {
//     const header = document.querySelector('.header');
//     let lastScrollTop = 0;
    
//     window.addEventListener('scroll', () => {
//         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
//         if (scrollTop > 100) {
//             header.style.background = 'rgba(255, 255, 255, 0.98)';
//             header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
//         } else {
//             header.style.background = 'rgba(255, 255, 255, 0.95)';
//             header.style.boxShadow = 'none';
//         }
        
//         lastScrollTop = scrollTop;
//     });
// }

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(' .case-study-card, .blog-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate successful subscription
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #4CAF50;' : 'background: #f44336;'}
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mobile menu toggle (if needed)
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuButton && nav) {
        mobileMenuButton.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            mobileMenuButton.classList.toggle('menu-open');
        });
    }
}

// Counter animation for stats
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isDollar = target.includes('$');
    const isPlus = target.includes('+');
    
    let numericValue = parseInt(target.replace(/[^\d]/g, ''));
    let current = 0;
    const increment = numericValue / 50; // 50 steps
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        
        if (isDollar) {
            displayValue = '$' + displayValue + 'M';
        } else if (isPercentage) {
            displayValue = displayValue + '%';
        } else if (isPlus) {
            displayValue = displayValue + '+';
        }
        
        element.textContent = displayValue;
    }, 20);
}

// Initialize counters when DOM is loaded
document.addEventListener('DOMContentLoaded', initCounters);

// Parallax effect for hero section
function initParallax() {
    const heroSection = document.querySelector('.hero');
    const heroVideo = document.querySelector('.hero-video');

    // Ensure the container itself doesn't move (avoids gaps between sections)
    if (heroSection) {
        heroSection.style.transform = '';
    }

    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset || document.documentElement.scrollTop;
            const offset = scrolled * 0.15; // subtle parallax on background video only
            heroVideo.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
    }
}

// Initialize parallax
document.addEventListener('DOMContentLoaded', initParallax);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Button hover effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize button effects
document.addEventListener('DOMContentLoaded', initButtonEffects);

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    // Ensure no text content remains
    scrollButton.textContent = '';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.setAttribute('title', 'Scroll to top');
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: transparent url('assets/images/scroll.svg') center / cover no-repeat;
        border: none;
        padding: 0;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', initScrollToTop);

// Ensure hero background video reliably autoplays
function ensureHeroVideoAutoplay() {
    const video = document.querySelector('.hero-video');
    if (!video) return;

    // Make sure the browser treats it as muted/inline before play()
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const tryPlay = () => {
        const p = video.play();
        if (p && typeof p.then === 'function') {
            p.catch(() => {});
        }
    };

    if (video.readyState >= 2) {
        tryPlay();
    } else {
        video.addEventListener('loadeddata', tryPlay, { once: true });
        video.addEventListener('canplay', tryPlay, { once: true });
    }

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && video.paused) tryPlay();
    });
}

// Header dropdowns
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    if (!dropdowns.length) return;

    // click to toggle (useful for touch devices)
    dropdowns.forEach(drop => {
        const toggle = drop.querySelector('.dropdown-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            // close others
            dropdowns.forEach(d => { if (d !== drop) d.classList.remove('open'); });
            drop.classList.toggle('open');
        });
    });

    // close on outside click
    document.addEventListener('click', (e) => {
        const target = e.target;
        dropdowns.forEach(d => {
            if (!d.contains(target)) d.classList.remove('open');
        });
    });

    // close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdowns.forEach(d => d.classList.remove('open'));
        }
    });
}

// Create black overlay for fade effect
function createBlackOverlay(heroSection) {
    const overlay = document.createElement('div');
    overlay.className = 'black-overlay';
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        z-index: 10;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.1s ease-out;
    `;
    heroSection.appendChild(overlay);
    return overlay;
}

// Scroll effects for hero section opacity transition
function initScrollEffects() {
    const heroSection = document.querySelector('.hero');
    const heroVideo2 = document.querySelector('.hero-video-2');
    const clientsSection = document.querySelector('.clients');
    
    if (!heroSection || !heroVideo2) {
        console.warn('Required elements not found for scroll effects');
        return;
    }

    function handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress for clients section (fades over 30% of viewport height)
        const clientsScrollProgress = Math.min(scrollY / (windowHeight * 0.3), 1);
        
        // Calculate scroll progress for hero section (fades over 30% of viewport height to match clients)
        const heroScrollProgress = Math.min(scrollY / (windowHeight * 0.4), 1);
        
        // Opacity for the hero content (fades out over 30% of viewport height)
        const heroContentOpacity = 1 - heroScrollProgress; 
        // Opacity for the black overlay (fades in over 30% of viewport height)
        const blackOverlayOpacity = heroScrollProgress;

        // Get the hero content element and fade it out
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = heroContentOpacity;
        }
        
        // Get or create the black overlay and fade it in
        const blackOverlay = heroSection.querySelector('.black-overlay') || createBlackOverlay(heroSection);
        blackOverlay.style.opacity = blackOverlayOpacity;

        // Fade out clients section as soon as scrolling starts (same timing as hero)
        if (clientsSection) {
            const clientsOpacity = 1 - clientsScrollProgress;
            clientsSection.style.opacity = clientsOpacity;
        }
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial call
    handleScroll();
}

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("lets-talk");
    const section4 = document.querySelector(".show-talk-box");
    const footer = document.querySelector("footer"); // footer section
    const closeBtn = popup.querySelector(".talk-close"); // cross button inside popup
  
    if (!popup || !section4 || !footer) return;
  
    let manuallyClosed = false; // track if user closed popup
  
    function togglePopup() {
      if (manuallyClosed) return; // don't show again if user closed
  
      const rect4 = section4.getBoundingClientRect();
      const rectFooter = footer.getBoundingClientRect();
      const middle = window.innerHeight / 2;
  
      // check if middle of screen is inside section4 OR footer
      const inSection4 = rect4.top <= middle && rect4.bottom >= middle;
      const inFooter = rectFooter.top <= window.innerHeight && rectFooter.bottom >= 0;
  
      if (inSection4 || inFooter) {
        popup.classList.add("visible");
      } else {
        popup.classList.remove("visible");
      }
    }
  
    // run initially + on scroll/resize/load
    window.addEventListener("scroll", togglePopup);
    window.addEventListener("resize", togglePopup);
    window.addEventListener("load", togglePopup);
    togglePopup();
  
    // close button handler
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        popup.classList.remove("visible");
        manuallyClosed = true; // prevent reappearing
      });
    }
  });
  
  