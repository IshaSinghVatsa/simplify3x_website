// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
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
  initDynamicBorderRadius();
});

// (Globe code removed by request)

// Tab functionality for work process section
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      // Remove active class from all buttons and panels
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));

      // Add active class to clicked button and corresponding panel
      button.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });
}

// Industry filter functionality for customer stories page
function initIndustryFilters() {
  const filterButtons = document.querySelectorAll(".cs-filter-btn");
  const storyCards = document.querySelectorAll(".cs-story-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetIndustry = button.getAttribute("data-industry");

      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("cs-active"));

      // Add active class to clicked button
      button.classList.add("cs-active");

      // Filter story cards
      storyCards.forEach((card) => {
        const cardIndustry = card.getAttribute("data-industry");

        if (targetIndustry === "all" || cardIndustry === targetIndustry) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.5s ease-in-out";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
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
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    " .case-study-card, .blog-card, .stat-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Newsletter form submission
document.addEventListener("DOMContentLoaded", function () {
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector(".newsletter-input");
      const email = emailInput.value.trim();

      if (email && isValidEmail(email)) {
        // Simulate successful subscription
        showNotification("Thank you for subscribing!", "success");
        emailInput.value = "";
      } else {
        showNotification("Please enter a valid email address.", "error");
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
  const notification = document.createElement("div");
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
        ${type === "success" ? "background: #4CAF50;" : "background: #f44336;"}
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Mobile menu toggle (if needed)
function initMobileMenu() {
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const nav = document.querySelector(".nav");

  if (mobileMenuButton && nav) {
    mobileMenuButton.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
      mobileMenuButton.classList.toggle("menu-open");
    });
  }
}

// Counter animation for stats
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

function animateCounter(element) {
  const target = element.textContent;
  const isPercentage = target.includes("%");
  const isDollar = target.includes("$");
  const isPlus = target.includes("+");

  let numericValue = parseInt(target.replace(/[^\d]/g, ""));
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
      displayValue = "$" + displayValue + "M";
    } else if (isPercentage) {
      displayValue = displayValue + "%";
    } else if (isPlus) {
      displayValue = displayValue + "+";
    }

    element.textContent = displayValue;
  }, 20);
}

// Initialize counters when DOM is loaded
document.addEventListener("DOMContentLoaded", initCounters);

// Parallax effect for hero section
function initParallax() {
  const heroSection = document.querySelector(".hero");
  const heroVideo = document.querySelector(".hero-video");

  // Ensure the container itself doesn't move (avoids gaps between sections)
  if (heroSection) {
    heroSection.style.transform = "";
  }

  if (heroVideo) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      const offset = scrolled * 0.15; // subtle parallax on background video only
      heroVideo.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  }
}

// Initialize parallax
document.addEventListener("DOMContentLoaded", initParallax);

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Button hover effects
function initButtonEffects() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Initialize button effects
document.addEventListener("DOMContentLoaded", initButtonEffects);

// Scroll to top functionality
function initScrollToTop() {
  // Create scroll to top button
  const scrollButton = document.createElement("button");
  scrollButton.className = "scroll-to-top";
  // Ensure no text content remains
  scrollButton.textContent = "";
  scrollButton.setAttribute("aria-label", "Scroll to top");
  scrollButton.setAttribute("title", "Scroll to top");
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
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollButton.style.opacity = "1";
      scrollButton.style.visibility = "visible";
    } else {
      scrollButton.style.opacity = "0";
      scrollButton.style.visibility = "hidden";
    }
  });

  // Scroll to top when clicked
  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize scroll to top
document.addEventListener("DOMContentLoaded", initScrollToTop);

// Ensure hero background video reliably autoplays
function ensureHeroVideoAutoplay() {
  const video = document.querySelector(".hero-video");
  if (!video) return;

  // Make sure the browser treats it as muted/inline before play()
  video.muted = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  const tryPlay = () => {
    const p = video.play();
    if (p && typeof p.then === "function") {
      p.catch(() => {});
    }
  };

  if (video.readyState >= 2) {
    tryPlay();
  } else {
    video.addEventListener("loadeddata", tryPlay, { once: true });
    video.addEventListener("canplay", tryPlay, { once: true });
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && video.paused) tryPlay();
  });
}

// Header dropdowns
function initDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");
  if (!dropdowns.length) return;

  // click to toggle (useful for touch devices)
  dropdowns.forEach((drop) => {
    const toggle = drop.querySelector(".dropdown-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      // close others
      dropdowns.forEach((d) => {
        if (d !== drop) d.classList.remove("open");
      });
      drop.classList.toggle("open");
    });
  });

  // close on outside click
  document.addEventListener("click", (e) => {
    const target = e.target;
    dropdowns.forEach((d) => {
      if (!d.contains(target)) d.classList.remove("open");
    });
  });

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdowns.forEach((d) => d.classList.remove("open"));
    }
  });

  // close on scroll
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Set a small delay to avoid closing immediately on scroll start
    scrollTimeout = setTimeout(() => {
      dropdowns.forEach((d) => d.classList.remove("open"));
    }, 100);
  }, { passive: true });
}

// Create black overlay for fade effect
function createBlackOverlay(heroSection) {
  const overlay = document.createElement("div");
  overlay.className = "black-overlay";
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
  const heroSection = document.querySelector(".hero");
  const heroVideo2 = document.querySelector(".hero-video-2");
  const clientsSection = document.querySelector(".clients");

  if (!heroSection || !heroVideo2) {
    console.warn("Required elements not found for scroll effects");
    return;
  }

  // Helper to create black overlay if not present
  function createBlackOverlay(section) {
    const overlay = document.createElement("div");
    overlay.classList.add("black-overlay");
    Object.assign(overlay.style, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#000",
      opacity: 0,
      transition: "opacity 0.3s ease",
      zIndex: 1,
      pointerEvents: "none",
    });
    section.appendChild(overlay);
    return overlay;
  }

  function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // ===== HERO-VIDEO-2 SMOOTH SCROLL-BASED EXPANSION =====
    const maxHeight = 100; // %
    const minHeight = 95; // %
    const maxWidth = 100; // %
    const minWidth = 95; // %

    // INCREASE SCROLL DISTANCE FOR SLOWER ANIMATION
    const scrollDistance = windowHeight * 0.8; // Increased from 0.4 to 0.8
    const sizeProgress = Math.min(scrollY / scrollDistance, 1);

    // Rest of your calculations remain the same
    const newHeight = minHeight + sizeProgress * (maxHeight - minHeight);
    const newWidth = minWidth + sizeProgress * (maxWidth - minWidth);
    const newRadius = 24 - sizeProgress * 24;
    const newBottom = 155 - sizeProgress * 155;

     heroVideo2.style.borderRadius = `${newRadius}px`;
    heroVideo2.style.bottom = `${newBottom}px`;
    heroVideo2.style.height = `${newHeight}%`;
    heroVideo2.style.width = `${newWidth}%`;
   

    // Smooth video zoom
    const video = heroVideo2.querySelector("video");
    if (video) {
      const scale = 1 + sizeProgress * 0.02;
      video.style.transform = `scale(${scale})`;
    }

    // ===== KEEP YOUR EXISTING HERO & CLIENTS CODE =====
    const heroScrollProgress = Math.min(scrollY / (windowHeight * 0.4), 1);
    const heroContentOpacity = 1 - heroScrollProgress;
    const blackOverlayOpacity = heroScrollProgress;

    const heroContent = heroSection.querySelector(".hero-content");
    if (heroContent) heroContent.style.opacity = heroContentOpacity;

    const blackOverlay =
      heroSection.querySelector(".black-overlay") ||
      createBlackOverlay(heroSection);
    blackOverlay.style.opacity = blackOverlayOpacity;

    if (clientsSection) {
      const clientsScrollProgress = Math.min(scrollY / (windowHeight * 0.3), 1);
      const clientsOpacity = 1 - clientsScrollProgress;
      clientsSection.style.opacity = clientsOpacity;
    }
}
//   function handleScroll() {
//     const scrollY = window.scrollY;
//     const windowHeight = window.innerHeight;

//     // ===== HERO FADE =====
//     const heroScrollProgress = Math.min(scrollY / (windowHeight * 0.4), 1);
//     const heroContentOpacity = 1 - heroScrollProgress;
//     const blackOverlayOpacity = heroScrollProgress;

//     const heroContent = heroSection.querySelector(".hero-content");
//     if (heroContent) heroContent.style.opacity = heroContentOpacity;

//     const blackOverlay =
//       heroSection.querySelector(".black-overlay") ||
//       createBlackOverlay(heroSection);
//     blackOverlay.style.opacity = blackOverlayOpacity;

//     // ===== CLIENTS FADE =====
//     if (clientsSection) {
//       const clientsScrollProgress = Math.min(scrollY / (windowHeight * 0.3), 1);
//       const clientsOpacity = 1 - clientsScrollProgress;
//       clientsSection.style.opacity = clientsOpacity;
//     }

//     // ===== HERO-VIDEO-2 SMOOTH SCROLL-BASED EXPANSION =====
//     const maxHeight = 100; // %
//     const minHeight = 95; // %
//     const maxWidth = 100; // %
//     const minWidth = 95; // %

//     // Calculate progress (0 → 1)
//     const sizeProgress = Math.min(scrollY / (windowHeight * 0.4), 1);

//     // Interpolate height, width, and border-radius
//     const newHeight = minHeight + sizeProgress * (maxHeight - minHeight);
//     const newWidth = minWidth + sizeProgress * (maxWidth - minWidth);
//     const newRadius = 24 - sizeProgress * 24; // 24 → 0px

//     heroVideo2.style.height = `${newHeight}%`;
//     heroVideo2.style.width = `${newWidth}%`;
//     heroVideo2.style.borderRadius = `${newRadius}px`;

//     // Smoothly remove bottom offset as video expands
//     const newBottom = 155 - sizeProgress * 155; // 155px → 0px
//     heroVideo2.style.bottom = `${newBottom}px`;

//     // Smooth video zoom
//     const video = heroVideo2.querySelector("video");
//     if (video) {
//       const scale = 1 + sizeProgress * 0.02; // 1 → 1.05
//       video.style.transform = `scale(${scale})`;
//       video.style.transition = "transform 0.1s ease-out";
//     }
//   }

  // Smooth scroll listener using requestAnimationFrame
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  // Initial call
  handleScroll();
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initScrollEffects);

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initScrollEffects);

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("lets-talk");
  const showTalkBoxSections = document.querySelectorAll(".show-talk-box");
  const footer = document.querySelector("footer"); // footer section
  const closeBtn = popup.querySelector(".talk-close"); // cross button inside popup

  if (!popup || !showTalkBoxSections.length || !footer) return;

  let manuallyClosed = false; // track if user closed popup

  function togglePopup() {
    if (manuallyClosed) return; // don't show again if user closed

    const rectFooter = footer.getBoundingClientRect();
    const middle = window.innerHeight / 2;

    // check if middle of screen is inside any show-talk-box section OR footer
    let inAnyShowTalkBoxSection = false;
    
    showTalkBoxSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const inSection = rect.top <= middle && rect.bottom >= middle;
      if (inSection) {
        inAnyShowTalkBoxSection = true;
      }
    });
    
    const inFooter =
      rectFooter.top <= window.innerHeight && rectFooter.bottom >= 0;

    if (inAnyShowTalkBoxSection || inFooter) {
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
  const pointerSections = document.querySelectorAll(".cs-pointer-section");
  const images = document.querySelectorAll(".cs-fade-image");

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
        image.classList.add("cs-active");
      } else {
        image.classList.remove("cs-active");
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

  window.addEventListener("scroll", handleScroll);
}

// Products Carousel Functionality
function initProductsCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const tabs = document.querySelectorAll('.our-button');
  let currentSlide = 0;
  let autoSlideInterval;
  let isAutoSlideFrozen = false;
  const slideInterval = 10000; // 10 seconds

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
      const prevIndex = slideIndex === 0 ? slides.length - 1 : slideIndex - 1;
      slides[prevIndex].classList.add('prev');
    }, 50); // Small delay to ensure smooth transition
  
    currentSlide = slideIndex;
  }

  // Function to go to next slide
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  // Function to go to previous slide
  function prevSlide() {
    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    showSlide(prevIndex);
  }

  // Function to start auto-slide
  function startAutoSlide() {
    if (!isAutoSlideFrozen) {
      console.log('Starting auto-slide'); // Debug log
      autoSlideInterval = setInterval(nextSlide, slideInterval);
    } else {
      console.log('Auto-slide is frozen - not starting'); // Debug log
    }
  }

  // Function to stop auto-slide
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Function to freeze auto-slide permanently
  function freezeAutoSlide() {
    console.log('Auto-slide frozen permanently'); // Debug log
    isAutoSlideFrozen = true;
    stopAutoSlide();
  }

  // Add click event listeners to tabs
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent any default behavior
      console.log(`Tab ${index} clicked - freezing auto-slide`); // Debug log
      showSlide(index);
      freezeAutoSlide(); // Freeze auto-slide permanently when tab is clicked
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

  // Handle visibility change (pause when tab is not visible, only if not frozen)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoSlide();
      } else {
      if (!isAutoSlideFrozen) {
        startAutoSlide();
      }
    }
  });

  // Initialize the carousel
  showSlide(0);
  startAutoSlide();

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      freezeAutoSlide(); // Freeze auto-slide when using keyboard navigation
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      freezeAutoSlide(); // Freeze auto-slide when using keyboard navigation
    }
  });

  // Add touch/swipe support for mobile
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
        prevSlide();
      }
      freezeAutoSlide(); // Freeze auto-slide when using touch/swipe navigation
    }
  }

  // Cleanup function
  return () => {
    stopAutoSlide();
  };
}

// Initialize carousel when DOM is ready
document.addEventListener("DOMContentLoaded", initProductsCarousel);

// Dynamic Border Radius, Max-Width, and Opacity for Products Section
function initDynamicBorderRadius() {
  const productsTabsSection = document.querySelector('.our-products-tabs-section');
  const ourContainer = document.querySelector('.our-container');
  const header = document.querySelector('.header');
  
  if (!productsTabsSection || !ourContainer || !header) {
    console.warn('Required elements not found for dynamic border radius and max-width');
    return;
  }
  
  // Track if margin animation has been triggered
  let marginAnimationTriggered = false;

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
    const transitionEnd = 0; // Complete transition when touching header
    
    // Calculate the progress (0 to 1)
    let progress = 0;
    if (distanceFromHeader <= transitionStart && distanceFromHeader >= transitionEnd) {
      progress = (transitionStart - distanceFromHeader) / (transitionStart - transitionEnd);
    } else if (distanceFromHeader < transitionEnd) {
      progress = 1; // Fully transitioned
    }
    
    // Clamp progress between 0 and 1
    progress = Math.max(0, Math.min(1, progress));
    
    // Calculate new border radius (80px to 20px)
    const initialRadius = 80;
    const finalRadius = 40;
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
    const opacityProgress = Math.max(0, Math.min(1, (visibilityPercentage - 30) / (50 - 30)));
    const newOpacity = minOpacity + (opacityProgress * (maxOpacity - minOpacity));
    
    // Calculate new max-width (1425px to full width) - only start after opacity reaches 1
    const initialMaxWidth = 1425; // Current max-width from CSS
    const finalMaxWidth = (window.innerWidth - 100); // Full screen width minus 200px
    
    // Check if margin animation has been triggered (tabs section has animate-in class)
    const isMarginAnimationTriggered = productsTabsSection.classList.contains('animate-in');
    
    // Only start width expansion when container is 70% visible
    let widthProgress = 0;
    if (isMarginAnimationTriggered) {
      // If margin animation has been triggered, keep the width at full size
      widthProgress = 1;
    } else if (visibilityPercentage >= 70) {
      // Calculate width progress based on how much more visible the section becomes after 70%
      const widthStartVisibility = 70; // Start width expansion at 70% visibility
      const widthEndVisibility = 100; // Complete width expansion at 100% visibility
      const widthVisibilityProgress = Math.max(0, Math.min(1, (visibilityPercentage - widthStartVisibility) / (widthEndVisibility - widthStartVisibility)));
      // Make the animation faster by using a power function for more aggressive progression
      widthProgress = Math.pow(widthVisibilityProgress, 0.5); // Square root makes it faster
    }
    
    const newMaxWidth = initialMaxWidth + (widthProgress * (finalMaxWidth - initialMaxWidth));
    
    // Apply the new border radius, max-width, and opacity
    productsTabsSection.style.borderRadius = `${newRadius}px`;
    ourContainer.style.maxWidth = `${newMaxWidth}px`;
    ourContainer.style.opacity = newOpacity;
    
    // Optional: Add some debugging
    // console.log(`Distance from header: ${distanceFromHeader}px, Progress: ${progress.toFixed(2)}, Border radius: ${newRadius.toFixed(1)}px, Max-width: ${newMaxWidth.toFixed(1)}px, Visibility: ${visibilityPercentage.toFixed(1)}%, Opacity: ${newOpacity.toFixed(2)}`);
  }

  // Throttled scroll handler
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateBorderRadiusAndMaxWidth();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial call
  updateBorderRadiusAndMaxWidth();
}

// Initialize dynamic border radius when DOM is ready
document.addEventListener("DOMContentLoaded", initDynamicBorderRadius);

// Products tabs section margin and width animation
function initProductsTabsMarginAnimation() {
  const tabsSection = document.querySelector('.our-products-tabs-section');
  const ourContainer = document.querySelector('.our-container');
  const ourProductsSection = document.querySelector('.our-products');
  const innovationSection = document.querySelector('.services'); // Innovation at Core section
  
  if (!tabsSection || !ourContainer || !ourProductsSection || !innovationSection) {
    console.log('Elements not found for margin animation');
    return;
  }
  
  console.log('Setting up reversible margin and width animation...');
  
  // Create intersection observer for the Innovation at Core section
  const innovationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
        console.log('Innovation at Core section is in view, resetting animation...');
        
        // Reset the animation by removing animate-in class
        tabsSection.classList.remove('animate-in');
        
        // Reset width to initial size
        ourContainer.style.maxWidth = '1425px';
        ourContainer.style.transition = 'max-width 1s ease';
        
        // Reset opacity to initial value (let dynamic border radius function handle it)
        ourContainer.style.opacity = '';
        
        console.log('Animation reset - margin-top restored, width reset to 1425px, opacity reset');
      }
    });
  }, {
    threshold: 0.3, // Trigger when 30% of Innovation at Core section is visible
    rootMargin: '0px 0px 0px 0px'
  });
  
  // Create intersection observer for the our-products section
  const productsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
        console.log('Our Products section is 30% visible, removing margin-top and expanding width...');
        
        // Add animate-in class for margin-top removal
        tabsSection.classList.add('animate-in');
        
        // Set parent container opacity to 1
        ourContainer.style.opacity = '1';
        
        // Immediately expand width to full screen width
        const fullWidth = window.innerWidth - 200; // Same as final width from dynamic border radius
        ourContainer.style.maxWidth = `${fullWidth}px`;
        ourContainer.style.transition = 'max-width 1s ease'; // Smooth width transition
        
        console.log(`Width expanded to: ${fullWidth}px, opacity set to 1`);
      }
    });
  }, {
    threshold: 0.3, // Trigger when 30% of the our-products section is visible
    rootMargin: '0px 0px 0px 0px'
  });
  
  // Start observing both sections
  innovationObserver.observe(innovationSection);
  productsObserver.observe(ourProductsSection);
  console.log('Reversible margin and width animation observer set up');
}

// Initialize products tabs margin animation when DOM is ready
document.addEventListener("DOMContentLoaded", initProductsTabsMarginAnimation);

// Customer Stories Text Opacity Animation
function initCustomerStoriesTextOpacity() {
  const textSections = document.querySelectorAll('.cs-pointer-section');
  
  if (!textSections.length) {
    console.log('Customer stories text sections not found');
    return;
  }
  
  console.log('Setting up customer stories text opacity animation...');
  
  // Track scroll direction
  let lastScrollY = window.scrollY;
  let scrollDirection = 'down';
  
  // Update scroll direction
  function updateScrollDirection() {
    const currentScrollY = window.scrollY;
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = currentScrollY;
  }
  
  // Calculate opacity based on visibility and position
  function calculateOpacity(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;
    
    // Calculate how much of the element is visible
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    
    // Calculate visible height
    const visibleTop = Math.max(0, -elementTop);
    const visibleBottom = Math.min(elementHeight, windowHeight - elementTop);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    
    // Calculate visibility percentage
    const visibilityPercentage = (visibleHeight / elementHeight) * 100;
    
    // Calculate opacity based on visibility
    // Opacity 1 when 90%+ visible, gradually decrease below 90%
    let opacity;
    if (visibilityPercentage >= 90) {
      opacity = 1;
    } else {
      // Gradual decrease from 90% visibility to 0% visibility
      opacity = Math.max(0, visibilityPercentage / 90);
    }
    
    return {
      opacity: opacity,
      visibilityPercentage: visibilityPercentage
    };
  }
  
  // Update opacity for all text sections
  function updateAllTextSections() {
    updateScrollDirection();
    
    textSections.forEach((section, index) => {
      const result = calculateOpacity(section);
      
      // Apply different transition durations based on scroll direction
      const transitionDuration = scrollDirection === 'up' ? '1.5s' : '0.7s';
      section.style.transition = `opacity ${transitionDuration} ease`;
      section.style.opacity = result.opacity;
      
      console.log(`Text section ${index + 1} - visibility: ${result.visibilityPercentage.toFixed(1)}%, opacity: ${result.opacity.toFixed(2)}, scroll: ${scrollDirection}, transition: ${transitionDuration}`);
    });
  }
  
  // Use scroll event for real-time updates in both directions
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateAllTextSections();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Initial update
  updateAllTextSections();
  
  console.log('Customer stories text opacity animation set up with bidirectional scroll support');
}

// Initialize customer stories text opacity animation when DOM is ready
document.addEventListener("DOMContentLoaded", initCustomerStoriesTextOpacity);

// Our Service Section Text Opacity Animation
function initOurServiceTextOpacity() {
  const textSections = document.querySelectorAll('.os-pointer-section');
  const videos = document.querySelectorAll('.os-fade-video');
  
  if (!textSections.length || !videos.length) {
    console.log('Our service text sections or videos not found');
    return;
  }
  
  console.log('Setting up our service text opacity animation...');
  
  // Track scroll direction
  let lastScrollY = window.scrollY;
  let scrollDirection = 'down';
  
  // Update scroll direction
  function updateScrollDirection() {
    const currentScrollY = window.scrollY;
    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = currentScrollY;
  }
  
  // Calculate opacity based on visibility and position
  function calculateOpacity(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;
    
    // Calculate how much of the element is visible
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    
    // Calculate visible height
    const visibleTop = Math.max(0, -elementTop);
    const visibleBottom = Math.min(elementHeight, windowHeight - elementTop);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    
    // Calculate visibility percentage
    const visibilityPercentage = (visibleHeight / elementHeight) * 100;
    
    // Calculate opacity based on visibility
    // Opacity 1 when 90%+ visible, gradually decrease below 90%
    let opacity;
    if (visibilityPercentage >= 90) {
      opacity = 1;
    } else {
      // Gradual decrease from 90% visibility to 0% visibility
      opacity = Math.max(0, visibilityPercentage / 90);
    }
    
    return {
      opacity: opacity,
      visibilityPercentage: visibilityPercentage
    };
  }
  
  // Update video visibility based on text section visibility
  function updateVideoVisibility() {
    let mostVisibleIndex = 0;
    let maxVisibility = 0;
    
    textSections.forEach((section, index) => {
      const result = calculateOpacity(section);
      if (result.visibilityPercentage > maxVisibility) {
        maxVisibility = result.visibilityPercentage;
        mostVisibleIndex = index;
      }
    });
    
    // Update video visibility
    videos.forEach((video, index) => {
      if (index === mostVisibleIndex && maxVisibility > 30) {
        video.classList.add('os-active');
      } else {
        video.classList.remove('os-active');
      }
    });
  }
  
  // Update opacity for all text sections
  function updateAllTextSections() {
    updateScrollDirection();
    
    textSections.forEach((section, index) => {
      const result = calculateOpacity(section);
      
      // Apply different transition durations based on scroll direction
      const transitionDuration = scrollDirection === 'up' ? '1s' : '0.7s';
      section.style.transition = `opacity ${transitionDuration} ease`;
      section.style.opacity = result.opacity;
      
      console.log(`Our Service text section ${index + 1} - visibility: ${result.visibilityPercentage.toFixed(1)}%, opacity: ${result.opacity.toFixed(2)}, scroll: ${scrollDirection}, transition: ${transitionDuration}`);
    });
    
    // Update video visibility
    updateVideoVisibility();
  }
  
  // Use scroll event for real-time updates in both directions
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateAllTextSections();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Initial update
  updateAllTextSections();
  
  console.log('Our service text opacity animation set up with bidirectional scroll support and video switching');
}

// Initialize our service text opacity animation when DOM is ready
document.addEventListener("DOMContentLoaded", initOurServiceTextOpacity);

// Glass effect header scroll handler
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('.header');
  
  if (!header) return;
  
  function handleScroll() {
    const scrollY = window.scrollY;
    
    // Get the third section (services section)
    const servicesSection = document.querySelector('.services');
    
    if (servicesSection) {
      const servicesSectionTop = servicesSection.offsetTop;
      const headerHeight = header.offsetHeight;
      
      // Check if header bottom touches services section top
      // Header bottom position = scrollY + headerHeight
      const headerBottom = scrollY + headerHeight;
      
      if (headerBottom >= (servicesSectionTop - 50)) {
        header.classList.add('glass-effect');
      } else {
        header.classList.remove('glass-effect');
      }
    }
    
    // Enhanced glass effect when scrolled within glass sections
    if (header.classList.contains('glass-effect')) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial check
  handleScroll();
});

// Card Carousel Effect
(function() {
  const cards = document.querySelectorAll(".carousel .card");
  if (cards.length === 0) return;

  const positions = [
    {x:-320, scale:0.7, opacity:0.5, z:1},  // far left
    {x:-160, scale:0.85, opacity:0.7, z:2}, // left
    {x:0, scale:1, opacity:1, z:3},         // center
    {x:160, scale:0.85, opacity:0.7, z:2},  // right
    {x:320, scale:0.7, opacity:0.5, z:1}    // far right
  ];

  let order = [0,1,2,3,4]; // initial order

  function updateCards() {
    for(let i=0;i<cards.length;i++){
      const pos = positions[i];
      const card = cards[order[i]];
      gsap.to(card, {
        x: pos.x,
        scale: pos.scale,
        opacity: pos.opacity,
        zIndex: pos.z,
        duration:0.8,
        ease:"power2.out"
      });
    }
  }

  // Rotate clockwise
  function rotateClockwise() {
    order.unshift(order.pop()); // move last element to front
    updateCards();
  }

  // Initial layout
  updateCards();

  // Auto rotate every 3 seconds
  setInterval(rotateClockwise, 3000);
})();



