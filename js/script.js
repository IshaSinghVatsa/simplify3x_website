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
    initCustomerStoriesImageFade();
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

// Customer Stories Image Fade Effect
function initCustomerStoriesImageFade() {
    const pointerSections = document.querySelectorAll('.cs-pointer-section');
    const images = document.querySelectorAll('.cs-fade-image');
    
    if (pointerSections.length === 0 || images.length === 0) {
        return; // Exit if elements don't exist
    }
    
    function updateActiveImage() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let activeIndex = 0;
        
        // Find which section is currently in the center of the viewport
        pointerSections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                activeIndex = index;
            }
        });
        
        // Update active image
        images.forEach((image, index) => {
            if (index === activeIndex) {
                image.classList.add('cs-active');
            } else {
                image.classList.remove('cs-active');
            }
        });
    }
    
    // Initial call
    updateActiveImage();
    
    // Add scroll event listener with throttling
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveImage();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
}
  
  
// Products Carousel Functionality
function initProductsCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const tabs = document.querySelectorAll('.our-button');
    let currentSlide = 0;
    let autoSlideInterval;
    let isAutoSlideFrozen = false;
  
    // Function to show a specific slide
    function showSlide(slideIndex) {
      // Remove active class from all slides and tabs
      slides.forEach(slide => slide.classList.remove('active', 'prev'));
      tabs.forEach(tab => tab.classList.remove('active'));
    
      // Add active class to current slide and tab
      slides[slideIndex].classList.add('active');
      tabs[slideIndex].classList.add('active');
    
      // After a brief delay, add prev class to the previous slide
      setTimeout(() => {
        const prevSlideIndex = slideIndex === 0 ? slides.length - 1 : slideIndex - 1;
        slides[prevSlideIndex].classList.add('prev');
      }, 50);
    }
  
    // Function to go to next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  
    // Function to start auto-slide
    function startAutoSlide() {
      if (!isAutoSlideFrozen) {
        autoSlideInterval = setInterval(nextSlide, 10000); // 10 seconds
      }
    }
  
    // Function to stop auto-slide
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }
  
    // Function to freeze auto-slide
    function freezeAutoSlide() {
      isAutoSlideFrozen = true;
      stopAutoSlide();
    }
  
    // Add click event listeners to tabs
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent any default behavior
        console.log(`Tab ${index} clicked - freezing auto-slide`); // Debug log
        currentSlide = index;
        showSlide(currentSlide);
        freezeAutoSlide(); // Freeze auto-slide when user clicks
      });
    });
  
    // Pause auto-slide on hover (only if not frozen)
    const carousel = document.querySelector('.products-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoSlide);
      carousel.addEventListener('mouseleave', () => {
        if (!isAutoSlideFrozen) {
          startAutoSlide();
        }
      });
    }
  
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
        freezeAutoSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        freezeAutoSlide();
      }
    });
  
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
  
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
  
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
  
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          nextSlide();
        } else {
          // Swipe right - previous slide
          currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
          showSlide(currentSlide);
        }
        freezeAutoSlide();
      }
    };
  
    // Initialize the carousel
    showSlide(0);
    startAutoSlide();
  }
  
  // Dynamic Border Radius, Max-Width, and Opacity for Products Section
  function initDynamicBorderRadius() {
    const productsTabsSection = document.querySelector('.our-products-tabs-section');
    const ourContainer = document.querySelector('.our-container');
    const header = document.querySelector('.header');
    
    if (!productsTabsSection || !ourContainer || !header) {
      console.warn('Required elements not found for dynamic border radius and max-width');
      return;
    }
  
    function updateBorderRadiusAndMaxWidth() {
      const scrollY = window.scrollY;
      const headerHeight = header.offsetHeight;
      const productsSection = document.querySelector('.our-products');
      
      if (!productsSection) return;
      
      const productsSectionTop = productsSection.offsetTop;
      const productsSectionHeight = productsSection.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate when the products section starts coming into view
      const sectionStart = productsSectionTop - window.innerHeight;
      const sectionEnd = productsSectionTop + productsSectionHeight;
      
      // Calculate the distance from the header
      const distanceFromHeader = productsSectionTop - scrollY - headerHeight;
      
      // Define the transition range (when to start changing border radius and max-width)
      const transitionStart = 600; // Start transition when 600px away from header (much earlier)
      const transitionEnd = 0; // Complete transition when reaching header
      
      // Calculate border radius progress
      const radiusProgress = Math.max(0, Math.min(1, (distanceFromHeader - transitionEnd) / (transitionStart - transitionEnd)));
      const initialRadius = 80; // Start with larger radius
      const finalRadius = 40; // End with smaller radius
      const newRadius = initialRadius - (progress * (initialRadius - finalRadius));
      
      // Calculate opacity based on visibility (30% visible = 30% opacity, 100% visible = 100% opacity)
      const sectionBottom = productsSectionTop + productsSectionHeight;
      const viewportTop = scrollY;
      const viewportBottom = scrollY + windowHeight;
      
      // Calculate how much of the section is visible
      const visibleTop = Math.max(productsSectionTop, viewportTop);
      const visibleBottom = Math.min(sectionBottom, viewportBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibilityPercentage = (visibleHeight / productsSectionHeight) * 100;
      
      // Calculate opacity (30% when 30% visible, 100% when 50% visible)
      const minOpacity = 0.3; // 30% opacity
      const maxOpacity = 1.0; // 100% opacity
      const opacityThreshold = 50; // 50% visibility for full opacity
      
      let newOpacity;
      if (visibilityPercentage < 30) {
        newOpacity = minOpacity;
      } else if (visibilityPercentage >= 50) {
        newOpacity = maxOpacity;
      } else {
        // Linear interpolation between 30% and 50% visibility
        const opacityProgress = (visibilityPercentage - 30) / (50 - 30);
        newOpacity = minOpacity + (opacityProgress * (maxOpacity - minOpacity));
      }
      
      // Calculate max-width animation (starts when container is 70% visible and is faster)
      const widthThreshold = 70; // Start width animation when 70% visible
      let newMaxWidth;
      
      if (visibilityPercentage < widthThreshold) {
        newMaxWidth = 1425; // Initial max-width
      } else {
        // Fast width animation when 70%+ visible
        const widthProgress = Math.min(1, (visibilityPercentage - widthThreshold) / (100 - widthThreshold));
        const initialMaxWidth = 1425;
        const finalMaxWidth = window.innerWidth - 200;
        const newMaxWidth = initialMaxWidth + (widthProgress * (finalMaxWidth - initialMaxWidth));
      }
      
      // Apply the new border radius, max-width, and opacity
      productsTabsSection.style.borderRadius = `${newRadius}px`;
      ourContainer.style.maxWidth = `${newMaxWidth}px`;
      ourContainer.style.opacity = newOpacity;
    }
  
    // Listen for scroll events
    window.addEventListener('scroll', updateBorderRadiusAndMaxWidth);
    window.addEventListener('resize', updateBorderRadiusAndMaxWidth);
    
    // Initial call
    updateBorderRadiusAndMaxWidth();
  }
  
  // Products tabs section margin animation
  function initProductsTabsMarginAnimation() {
    const tabsSection = document.querySelector('.our-products-tabs-section');
    const ourProductsSection = document.querySelector('.our-products');
    
    if (!tabsSection || !ourProductsSection) {
      console.log('Elements not found for margin animation');
      return;
    }
    
    console.log('Setting up margin animation...');
    
    // Create intersection observer for the our-products section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Our Products section is 50% visible, removing margin-top...');
          tabsSection.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.5, // Trigger when 50% of the our-products section is visible
      rootMargin: '0px 0px 0px 0px'
    });
    
    // Start observing the entire our-products section
    observer.observe(ourProductsSection);
    console.log('Margin animation observer set up');
  }
  
  // Initialize all functions when DOM is ready
  document.addEventListener("DOMContentLoaded", function() {
    initProductsCarousel();
    initDynamicBorderRadius();
    initProductsTabsMarginAnimation();
  });