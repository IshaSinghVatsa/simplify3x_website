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
  const sections = document.querySelectorAll('section');
  if(!header || !sections.length) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = scrollY;

    // Determine current section
    let currentSectionIndex = 0;
    sections.forEach((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      if(rect.top <= 0 + header.offsetHeight/2){
        currentSectionIndex = idx;
      }
    });

    // Apply styles based on section
    if(currentSectionIndex === 0){
      header.classList.add('glass');
      header.classList.remove('solid');
    } else {
      header.classList.add('solid');
      header.classList.remove('glass');
    }

    // Show/hide header based on scroll direction
    if(scrollDirection === 'down' && currentSectionIndex > 0){
      header.classList.add('hidden');
    } else if(scrollDirection === 'up'){
      header.classList.remove('hidden');
    }

  }, { passive: true });
});
  


// Card Carousel + Sticky Scroll Rotation
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".carousel .card");
  const tabs = document.querySelectorAll(".carousel-tab");
  const section = document.querySelector(".carousel-section");
  if (!cards.length || !section) return;

  const order = [3, 4, 0, 1, 2];
  let currentIndex = 0;
  let scrollLocked = false;
  let rotationsDone = 0;
  const totalRotations = 5;
  let isAnimating = false;
  let carouselUsed = false;

  const positions = [
    { x: -320, scale: 0.7, opacity: 0.4, z: 1 },
    { x: -160, scale: 0.85, opacity: 0.7, z: 2 },
    { x: 0, scale: 1, opacity: 1, z: 3 },
    { x: 160, scale: 0.85, opacity: 0.7, z: 2 },
    { x: 320, scale: 0.7, opacity: 0.4, z: 1 },
  ];

  function updateCards() {
    cards.forEach((card, i) => {
      const pos = order.indexOf(i);
      const p = positions[pos];
  
      // Animate position, scale, opacity, zIndex
      gsap.to(card, {
        x: p.x,
        scale: p.scale,
        opacity: p.opacity,
        zIndex: p.z,
        duration: 0.6,
        ease: "power2.out",
      });
  
      // Blur logic: only center card is sharp
      if(pos === 2){
        card.classList.remove('blur');
      } else {
        card.classList.add('blur');
      }
    });
  }

  function updateTabs(activeIndex) {
    tabs.forEach((tab, i) => {
      // Remove any previous active-* classes
      tab.classList.forEach(cls => {
        if(cls.startsWith("active-")) tab.classList.remove(cls);
      });
      // Add the new active class for this tab
      if(i === activeIndex) tab.classList.add(`active-${i}`);
    });
  }

// --- Improved Scroll Lock ---
function lockScrollAtSection(section) {
  scrollLocked = true;
  document.body.style.overflow = "hidden";

  const targetTop = window.scrollY + section.getBoundingClientRect().top;

  // Smoothly align section to exact top
  gsap.to(window, {
    scrollTo: { y: targetTop },
    duration: 0.4,
    ease: "power2.out",
    onComplete: () => {
      // Ensure it's exactly locked
      window.scrollTo({ top: targetTop });
    }
  });
}

  function rotateOnce(forward = true) {
    if (isAnimating) return;
    isAnimating = true;

    if (forward) {
      order.push(order.shift());
      rotationsDone++;
    } else {
      order.unshift(order.pop());
      rotationsDone = Math.max(0, rotationsDone - 1);
    }

    updateCards();
    currentIndex = order[2];
    updateTabs(currentIndex);

    gsap.delayedCall(0.7, () => {
      isAnimating = false;
      // Unlock scroll if done
      if (rotationsDone >= totalRotations && scrollLocked) {
        scrollLocked = false;
        document.body.style.overflow = "";
        carouselUsed = true;
      }
    });
  }

  // Tab click
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      while (currentIndex !== i) {
        order.push(order.shift());
        currentIndex = order[2];
      }
      updateCards();
      updateTabs(i);
      rotationsDone = 0;
      
      // Unlock scroll when tab is clicked
      if (scrollLocked) {
        scrollLocked = false;
        document.body.style.overflow = "";
        carouselUsed = true; // Prevent re-locking
      }
    });
  });

// Scroll detect for locking carousel at exact top
window.addEventListener("scroll", () => {
  if (carouselUsed || scrollLocked) return;

  const sectionRect = section.getBoundingClientRect();
  const sectionTop = sectionRect.top;

  // Trigger lock *as soon as* the section enters the top 15% of the viewport
  if (sectionTop <= window.innerHeight * 0.15 && sectionTop > -50) {
    lockScrollAtSection(section);
  }
});

  // Wheel control while locked
  let lastWheelTime = 0;
  const wheelCooldown = 200; // milliseconds
  
  window.addEventListener(
    "wheel",
    (e) => {
      if (!scrollLocked) return;
      e.preventDefault();
  
      const now = Date.now();
      if (now - lastWheelTime < wheelCooldown) return; // skip if too soon
      lastWheelTime = now;
  
      if (e.deltaY > 0 && rotationsDone < totalRotations) {
        // Scrolling down - rotate forward
        rotateOnce(true);
      } else if (e.deltaY < 0 && rotationsDone > 0) {
        // Scrolling up - rotate backward
        rotateOnce(false);
      } else if (e.deltaY < 0 && rotationsDone === 0) {
        // Scrolling up at the beginning - unlock scroll
        scrollLocked = false;
        document.body.style.overflow = "";
      }
    },
    { passive: false }
  );

  // Initial render
  updateCards();
  updateTabs(currentIndex);
});

const folder = document.getElementById("folder");

if (folder) {
  folder.addEventListener("click", () => {
    folder.classList.toggle("open");
  });
}

// ============================================
// SCROLL-SYNCED FOLDER TEXT SECTION
// ============================================
(function() {
  const textBlocks = document.querySelectorAll('.text-block');
  const scrollFolder = document.querySelector('.scroll-folder');
  const folderSection = document.querySelector('.folder-text-section');
  
  if (!textBlocks.length || !scrollFolder || !folderSection) return;

  // Helper function to darken color
  function darkenColor(hex, percent) {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;
    if (color.length === 3) {
      color = color.split('').map(c => c + c).join('');
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  // Set folder colors
  const folderColor = '#FF6B35';
  const folderBackColor = darkenColor(folderColor, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const folderBack = scrollFolder.querySelector('.folder__back');
  folderBack.style.setProperty('--folder-color', folderColor);
  folderBack.style.setProperty('--folder-back-color', folderBackColor);
  folderBack.style.background = folderBackColor;
  
  scrollFolder.querySelectorAll('.folder__front').forEach(front => {
    front.style.background = folderColor;
  });

  const papers = scrollFolder.querySelectorAll('.paper');
  const insidePapers = scrollFolder.querySelectorAll('.inside-paper');
  
  papers.forEach((paper, index) => {
    if (index === 0) paper.style.background = paper1;
    if (index === 1) paper.style.background = paper2;
    if (index === 2) paper.style.background = paper3;
  });

  // Set initial closed state
  scrollFolder.classList.add('closed');

  function updateFolderAnimation() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let activeIndex = -1;
    let progress = 0;

    // Find which text block is active
    textBlocks.forEach((block, index) => {
      const rect = block.getBoundingClientRect();
      const blockTop = rect.top + window.scrollY;
      const blockBottom = blockTop + rect.height;

      if (scrollPosition >= blockTop && scrollPosition <= blockBottom) {
        activeIndex = index;
        // Calculate progress within this block (0 to 1)
        progress = (scrollPosition - blockTop) / (blockBottom - blockTop);
        
        // Add active class to text
        block.classList.add('active');
      } else {
        block.classList.remove('active');
      }
    });

    // Update folder state based on active block and progress
    if (activeIndex >= 0) {
      const paperCount = parseInt(textBlocks[activeIndex].dataset.papers);
      const paperType = textBlocks[activeIndex].dataset.paperType;
      
      // Add data attribute to folder for CSS targeting
      scrollFolder.setAttribute('data-paper-count', paperCount);
      scrollFolder.setAttribute('data-paper-type', paperType || 'multiple');
      
      // Control paper visibility based on paper type
      if (paperType === 'hire') {
        // Show only hire paper (paper-4) and inside papers
        papers.forEach((paper, index) => {
          if (paper.classList.contains('paper-hire')) {
            paper.classList.remove('hidden');
          } else {
            paper.classList.add('hidden');
          }
        });
        // Show inside papers
        insidePapers.forEach(p => p.classList.remove('hidden'));
      } else if (paperType === 'qa') {
        // Show only QA paper (paper-1) and inside papers
        papers.forEach((paper, index) => {
          if (index === 0) {
            paper.classList.remove('hidden');
          } else {
            paper.classList.add('hidden');
          }
        });
        // Show inside papers
        insidePapers.forEach(p => p.classList.remove('hidden'));
      } else {
        // Show first 3 papers (default multiple cards)
        papers.forEach((paper, index) => {
          if (index < 3) {
            paper.classList.remove('hidden');
          } else {
            paper.classList.add('hidden');
          }
        });
        // Hide inside papers
        insidePapers.forEach(p => p.classList.add('hidden'));
      }

      // Folder animation states based on scroll progress
      if (progress < 0.2) {
        // Closed state
        scrollFolder.classList.remove('peek', 'open');
        scrollFolder.classList.add('closed');
      } else if (progress < 0.3) {
        // Peek state
        scrollFolder.classList.remove('closed', 'open');
        scrollFolder.classList.add('peek');
      } else {
        // Open/Fan state
        scrollFolder.classList.remove('closed', 'peek');
        scrollFolder.classList.add('open');
      }
    } else {
      // No active block - default to closed
      scrollFolder.classList.remove('peek', 'open');
      scrollFolder.classList.add('closed');
    }
  }

  // Throttled scroll handler
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateFolderAnimation();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial update
  updateFolderAnimation();
})();

// ============================================
// FOLDER ANIMATION
// ============================================
(function() {
  const folders = document.querySelectorAll('.folder');
  
  if (folders.length === 0) return;

  // Helper function to darken color
  function darkenColor(hex, percent) {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;
    if (color.length === 3) {
      color = color.split('').map(c => c + c).join('');
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  // Initialize each folder
  folders.forEach((folder) => {
    const container = folder.closest('.folder-container');
    const color = container?.dataset.color || '#fb6630';
    const folderBackColor = darkenColor(color, 0.1);
    const paper1 = darkenColor('#fcfcfc', 0.01);
    const paper2 = darkenColor('#fcfcfc', 0.01);
    const paper3 = '#ffffff';

    // Set CSS variables
    const folderBack = folder.querySelector('.folder__back');
    folderBack.style.setProperty('--folder-color', color);
    folderBack.style.setProperty('--folder-back-color', folderBackColor);
    folderBack.style.setProperty('--paper-1', paper1);
    folderBack.style.setProperty('--paper-2', paper2);
    folderBack.style.setProperty('--paper-3', paper3);

    // Apply colors to elements
    folderBack.style.background = folderBackColor;
    const afterElement = folderBack;
    afterElement.style.setProperty('--folder-back-color', folderBackColor);
    
    folder.querySelectorAll('.folder__front').forEach(front => {
      front.style.background = color;
    });

    const papers = folder.querySelectorAll('.paper');
    papers.forEach((paper, index) => {
      if (index === 0) paper.style.background = paper1;
      if (index === 1) paper.style.background = paper2;
      if (index === 2) paper.style.background = paper3;
    });

    // Toggle open/close on click
    folder.addEventListener('click', () => {
      folder.classList.toggle('open');
    });

    // Magnetic effect on papers when open
    papers.forEach((paper, index) => {
      paper.addEventListener('mousemove', (e) => {
        if (!folder.classList.contains('open')) return;
        
        const rect = paper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (e.clientX - centerX) * 0.15;
        const offsetY = (e.clientY - centerY) * 0.15;
        
        paper.style.setProperty('--magnet-x', `${offsetX}px`);
        paper.style.setProperty('--magnet-y', `${offsetY}px`);
      });

      paper.addEventListener('mouseleave', () => {
        paper.style.setProperty('--magnet-x', '0px');
        paper.style.setProperty('--magnet-y', '0px');
      });
    });
  });
})();