// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all interactive elements
  initTabs();
  initSmoothScrolling();
  initAnimations();
  ensureHeroVideoAutoplay();
  initDropdowns();
  initScrollEffects();
  initIndustryFilters();
  initCustomerStoriesImageFade();
  initDynamicBorderRadius();
  initMobileMenu();
  // initMobileCarousel();
});

// Hide loading screen after all page content (images, scripts, etc.) has loaded
window.addEventListener('load', function () {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  // Check if first visit in sessionStorage
  const isFirstVisit = sessionStorage.getItem('firstVisitDone') !== 'true';

  if (isFirstVisit) {
    // Delay for 5000ms only for first-time visits
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      sessionStorage.setItem('firstVisitDone', 'true');
    }, 10000);
  } else {
    // Hide immediately for other pages
    loadingScreen.style.display = 'none';
  }
});

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
  const showMoreBtn = document.getElementById("showMoreBtn");

  if (!filterButtons.length || !storyCards.length) return;

  const isMobile = () => window.matchMedia("(max-width: 1024px)").matches;

  let currentFilter = "all";
  let currentPage = 1;
  let cardsPerPage = isMobile() ? 3 : 6;

  // Initialize pagination
  function initPagination() {
    currentPage = 1;
    showCardsForCurrentFilter();
    updateShowMoreButton();
  }

  // Show cards for current filter and page
  function showCardsForCurrentFilter() {
    const filteredCards = Array.from(storyCards).filter(card => {
      const cardIndustry = card.getAttribute("data-industry");
      return currentFilter === "all" || cardIndustry === currentFilter;
    });

    // Hide all cards first
    storyCards.forEach(card => {
      card.classList.remove("show");
    });

    // Show cards for current page
    const startIndex = 0;
    const endIndex = currentPage * cardsPerPage;
    const cardsToShow = filteredCards.slice(startIndex, endIndex);

    cardsToShow.forEach(card => {
      card.classList.add("show");
    });
  }

  // Update show more button state
  function updateShowMoreButton() {
    if (!showMoreBtn) return;

    const filteredCards = Array.from(storyCards).filter(card => {
      const cardIndustry = card.getAttribute("data-industry");
      return currentFilter === "all" || cardIndustry === currentFilter;
    });

    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    showMoreBtn.style.display = currentPage >= totalPages ? "none" : "inline-block";
  }

  // Show more button functionality
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      currentPage++;
      showCardsForCurrentFilter();
      updateShowMoreButton();
    });
  }

  // Filter button functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.getAttribute("data-industry");

      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("cs-active"));

      // Add active class to clicked button
      button.classList.add("cs-active");

      // Reset pagination and show cards
      initPagination();
    });
  });

  window.addEventListener("resize", () => {
    const next = isMobile() ? 3 : 6;
    if (next !== cardsPerPage) {
      cardsPerPage = next;
      initPagination();
    }
  });

  // Initialize on page load
  initPagination();
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

// Mobile menu toggle (removed duplicate - using the correct one below)

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

// Counter animation for presence numbers
function initPresenceCounters() {
  const presenceNumbers = document.querySelectorAll(".presence-number");

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animatePresenceCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  presenceNumbers.forEach((counter) => {
    observer.observe(counter);
  });
}

function animatePresenceCounter(element) {
  const target = element.textContent.trim();

  // Parse the number format
  let numericValue = 0;
  let isPercentage = target.includes("%");
  let isMillion = target.includes("M");
  let isPlus = target.includes("+");
  let hasDecimals = target.includes(".");

  if (hasDecimals) {
    // For decimals like 99.999%
    numericValue = parseFloat(target.replace(/[^\d.]/g, ""));
  } else {
    // For regular numbers like 500M+, 47+, 135+
    numericValue = parseInt(target.replace(/[^\d]/g, ""));
  }

  let current = 0;
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = numericValue / steps;
  const stepDuration = duration / steps;

  const timer = setInterval(() => {
    current += increment;

    if (current >= numericValue) {
      current = numericValue;
      clearInterval(timer);
    }

    let displayValue;

    if (hasDecimals) {
      displayValue = current.toFixed(3);
    } else {
      displayValue = Math.floor(current);
    }

    // Add suffixes back
    let finalDisplay = displayValue;
    if (isMillion) {
      finalDisplay = displayValue + "M";
    }
    if (isPercentage) {
      finalDisplay = displayValue + "%";
    }
    if (isPlus) {
      finalDisplay = displayValue + "+";
    }

    element.textContent = finalDisplay;
  }, stepDuration);
}

// Initialize presence counters when DOM is loaded
document.addEventListener("DOMContentLoaded", initPresenceCounters);

// Counter animation for about page numbers
function initAboutPageCounters() {
  const aboutNumbers = document.querySelectorAll(".number-part-number");

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateAboutCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  aboutNumbers.forEach((counter) => {
    observer.observe(counter);
  });
}

function animateAboutCounter(element) {
  const target = element.textContent.trim();

  // Parse the number format
  let numericValue = 0;
  let isPlus = target.includes("+");

  // For numbers like 1000+, 500+, 700+, 90+
  numericValue = parseInt(target.replace(/[^\d]/g, ""));

  let current = 0;
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = numericValue / steps;
  const stepDuration = duration / steps;

  const timer = setInterval(() => {
    current += increment;

    if (current >= numericValue) {
      current = numericValue;
      clearInterval(timer);
    }

    let displayValue = Math.floor(current);

    // Add plus sign back if needed
    let finalDisplay = displayValue;
    if (isPlus) {
      finalDisplay = displayValue + "+";
    }

    element.textContent = finalDisplay;
  }, stepDuration);
}

// Initialize about page counters when DOM is loaded
document.addEventListener("DOMContentLoaded", initAboutPageCounters);

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

  // Set default styles
  scrollButton.style.position = "fixed";
  scrollButton.style.bottom = "30px";
  scrollButton.style.right = "30px";
  scrollButton.style.borderRadius = "50%";
  scrollButton.style.border = "none";
  scrollButton.style.padding = "0";
  scrollButton.style.cursor = "pointer";
  scrollButton.style.opacity = "0";
  scrollButton.style.visibility = "hidden";
  scrollButton.style.transition = "all 0.3s ease";
  scrollButton.style.zIndex = "1000";
  scrollButton.style.background = "transparent url('assets/images/foot-arrow.svg') center / cover no-repeat";

  // Set width and height based on screen width
  function setButtonSize() {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      scrollButton.style.width = "30px";
      scrollButton.style.height = "30px";
    } else {
      scrollButton.style.width = "50px";
      scrollButton.style.height = "50px";
    }
  }

  // Set initial size
  setButtonSize();

  // Update size on resize
  window.addEventListener('resize', setButtonSize);

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

// ============================================
// FAQ ACCORDION FUNCTIONALITY
// ============================================
function initFAQAccordion() {
  const faqCards = document.querySelectorAll('.faq-card');

  if (faqCards.length === 0) return;

  faqCards.forEach(card => {
    const answer = card.querySelector('.faq-answer');
    const chevron = card.querySelector('.faq-chevron');

    // Set initial state
    answer.style.maxHeight = '0';
    chevron.style.transform = 'rotate(0deg)';

    // Add click functionality for mobile/touch devices
    card.addEventListener('click', () => {
      const isOpen = answer.style.maxHeight !== '0px';

      // Toggle current card only (no closing other cards)
      if (isOpen) {
        answer.style.maxHeight = '0';
        chevron.style.transform = 'rotate(0deg)';
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        chevron.style.transform = 'rotate(180deg)';
      }
    });

    // Add hover functionality for desktop
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        chevron.style.transform = 'rotate(180deg)';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        answer.style.maxHeight = '0';
        chevron.style.transform = 'rotate(0deg)';
      }
    });
  });
}

// Initialize FAQ accordion
document.addEventListener("DOMContentLoaded", initFAQAccordion);

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
      p.catch(() => { });
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

// Folder dots visibility control
document.addEventListener("DOMContentLoaded", () => {
  const folderSection = document.querySelector(".folder-text-section");
  const folderDots = document.getElementById("folder-dots");
  const nextSection = folderSection?.nextElementSibling; // Get the next section (Global Presence)

  if (!folderSection || !folderDots) return;

  function updateDotsVisibility() {
    const sectionRect = folderSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const sectionTop = sectionRect.top;
    const sectionBottom = sectionRect.bottom;

    // Define fade-in distance (when section is this many pixels from top, start fading in)
    const fadeStartDistance = windowHeight * 0.3; // Start fading when 30% from top
    const fadeEndDistance = 100; // Fully visible when 100px from top

    // Check if next section is approaching
    let nextSectionOpacity = 1;
    if (nextSection) {
      const nextSectionRect = nextSection.getBoundingClientRect();
      const nextSectionTop = nextSectionRect.top;
      const fadeOutStartDistance = windowHeight * 0.8; // Start fading out when next section is 80% down

      if (nextSectionTop < fadeOutStartDistance) {
        // Next section is approaching - fade out
        const fadeOutProgress = (fadeOutStartDistance - nextSectionTop) / (fadeOutStartDistance - 0);
        nextSectionOpacity = 1 - Math.min(Math.max(fadeOutProgress, 0), 1);
      }
    }

    // Check if section is in viewport
    if (sectionBottom > 0) {
      if (sectionTop <= fadeEndDistance) {
        // Section has reached the top - visible (but may fade out if next section approaches)
        folderDots.style.opacity = nextSectionOpacity;
      } else if (sectionTop <= fadeStartDistance) {
        // Section is approaching the top - fade in gradually
        const fadeProgress = (fadeStartDistance - sectionTop) / (fadeStartDistance - fadeEndDistance);
        const opacity = Math.min(Math.max(fadeProgress, 0), 1) * nextSectionOpacity;
        folderDots.style.opacity = opacity;
      } else {
        // Section is still below the fade start point - hidden
        folderDots.style.opacity = "0";
      }
    } else {
      // Section is completely above viewport - hidden
      folderDots.style.opacity = "0";
    }
  }

  // Use scroll event with throttling
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateDotsVisibility();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  updateDotsVisibility();
});

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
  if (!header || !sections.length) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = scrollY;

    // Determine current section
    let currentSectionIndex = 0;
    sections.forEach((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 0 + header.offsetHeight / 2) {
        currentSectionIndex = idx;
      }
    });

    // Apply styles based on section
    if (currentSectionIndex === 0) {
      header.classList.add('glass');
      header.classList.remove('solid');
    } else {
      header.classList.add('solid');
      header.classList.remove('glass');
    }

    // Show/hide header based on scroll direction
    if (scrollDirection === 'down' && currentSectionIndex > 0) {
      header.classList.add('hidden');
    } else if (scrollDirection === 'up') {
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

  // Check if screen width is 1024px or less - disable carousel functionality
  const isMobileOrTablet = window.innerWidth <= 1024;
  if (isMobileOrTablet) {
    // For mobile/tablet, just show all cards statically
    cards.forEach((card, index) => {
      card.style.position = 'static';
      card.style.transform = 'none';
      card.style.opacity = '1';
      card.style.zIndex = 'auto';
      card.style.margin = '0 auto 30px auto';
      card.style.width = '100%';
      card.style.maxWidth = '800px';
      card.style.height = 'auto';
      card.style.minHeight = '300px';
    });
    return; // Exit early, no carousel functionality needed
  }

  const order = [3, 4, 0, 1, 2];
  let currentIndex = 0;
  let scrollLocked = false;
  let rotationsDone = 0;
  const totalRotations = 4; // 4 rotations to go from QA to Bominso
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
      if (pos === 2) {
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
        if (cls.startsWith("active-")) tab.classList.remove(cls);
      });
      // Add the new active class for this tab
      if (i === activeIndex) tab.classList.add(`active-${i}`);
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
      } else if (e.deltaY > 0 && rotationsDone >= totalRotations) {
        // Scrolling down at the end - unlock scroll and allow scrolling past
        scrollLocked = false;
        document.body.style.overflow = "";
        carouselUsed = true; // Prevent re-locking when scrolling back down
      } else if (e.deltaY < 0 && rotationsDone > 0) {
        // Scrolling up - rotate backward
        rotateOnce(false);
      } else if (e.deltaY < 0 && rotationsDone === 0) {
        // Scrolling up at the beginning - unlock scroll and allow scrolling past
        scrollLocked = false;
        document.body.style.overflow = "";
        carouselUsed = true; // Prevent re-locking when scrolling back down
      }
    },
    { passive: false }
  );

  // Initial render
  updateCards();
  updateTabs(currentIndex);

  // Handle window resize to toggle carousel functionality
  window.addEventListener('resize', () => {
    const isMobileOrTablet = window.innerWidth <= 1024;
    if (isMobileOrTablet) {
      // Disable carousel functionality on resize to mobile/tablet
      cards.forEach((card, index) => {
        card.style.position = 'static';
        card.style.transform = 'none';
        card.style.opacity = '1';
        card.style.zIndex = 'auto';
        card.style.margin = '0 auto 30px auto';
        card.style.width = '100%';
        card.style.maxWidth = '800px';
        card.style.height = 'auto';
        card.style.minHeight = '300px';
      });
      // Reset scroll lock
      scrollLocked = false;
      document.body.style.overflow = '';
    } else {
      // Re-enable carousel functionality on resize to desktop
      updateCards();
      updateTabs(currentIndex);
    }
  });
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
(function () {
  const textBlocks = document.querySelectorAll('.text-block');
  const desktopFolder = document.querySelector('#desktop-scroll-folder');
  const mobileFolders = document.querySelectorAll('[id^="mobile-scroll-folder-"]');
  const folderSection = document.querySelector('.folder-text-section');

  if (!textBlocks.length || !folderSection) return;

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
  // const folderColor = '#FF6B35';
  // const folderBackColor = darkenColor(folderColor, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  // Initialize folder function
  function initializeFolder(folder) {
    if (!folder) return;

    // const folderBack = folder.querySelector('.folder__back');
    // if (folderBack) {
    //   folderBack.style.setProperty('--folder-color', folderColor);
    //   folderBack.style.setProperty('--folder-back-color', folderBackColor);
    //   folderBack.style.background = folderBackColor;
    // }

    // folder.querySelectorAll('.folder__front').forEach(front => {
    //   front.style.background = folderColor;
    // });

    const papers = folder.querySelectorAll('.paper');
    papers.forEach((paper, index) => {
      if (index === 0) paper.style.background = paper1;
      if (index === 1) paper.style.background = paper2;
      if (index === 2) paper.style.background = paper3;
    });

    // Set initial closed state
    folder.classList.add('closed');
  }

  // Initialize all folders
  if (desktopFolder) initializeFolder(desktopFolder);
  mobileFolders.forEach(folder => initializeFolder(folder));

  // Update folder animation function
  function updateFolderAnimation(folder, textBlock, progress) {
    if (!folder || !textBlock) return;

    const paperCount = parseInt(textBlock.dataset.papers);
    const paperType = textBlock.dataset.paperType;

    // Add data attribute to folder for CSS targeting
    folder.setAttribute('data-paper-count', paperCount);
    folder.setAttribute('data-paper-type', paperType || 'multiple');

    const papers = folder.querySelectorAll('.paper');
    const insidePapers = folder.querySelectorAll('.inside-paper');

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
    // Check if this is a mobile folder (has mobile-scroll-folder in ID)
    const isMobileFolder = folder.id && folder.id.includes('mobile-scroll-folder');

    if (isMobileFolder) {
      // Mobile folder thresholds: 0-70% closed, 70-90% peek, 90-100% open
      if (progress < 0.7) {
        // Closed state (0-70%)
        folder.classList.remove('peek', 'open');
        folder.classList.add('closed');
      } else if (progress < 0.9) {
        // Peek state (70-90%)
        folder.classList.remove('closed', 'open');
        folder.classList.add('peek');
      } else {
        // Open/Fan state (90-100%)
        folder.classList.remove('closed', 'peek');
        folder.classList.add('open');
      }
    } else {
      // Desktop folder thresholds: 0-20% closed, 20-30% peek, 30-100% open
      if (progress < 0.2) {
        // Closed state
        folder.classList.remove('peek', 'open');
        folder.classList.add('closed');
      } else if (progress < 0.3) {
        // Peek state
        folder.classList.remove('closed', 'open');
        folder.classList.add('peek');
      } else {
        // Open/Fan state
        folder.classList.remove('closed', 'peek');
        folder.classList.add('open');
      }
    }
  }

  // Desktop folder animation
  function updateDesktopFolderAnimation() {
    if (!desktopFolder) return;

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

    // Update desktop folder
    if (activeIndex >= 0) {
      updateFolderAnimation(desktopFolder, textBlocks[activeIndex], progress);
    } else {
      // No active block - default to closed
      desktopFolder.classList.remove('peek', 'open');
      desktopFolder.classList.add('closed');
    }
  }

  // Mobile folder animation
  function updateMobileFolderAnimation() {
    mobileFolders.forEach((folder, index) => {
      if (!folder || !textBlocks[index]) return;

      const textBlock = textBlocks[index];
      const rect = textBlock.getBoundingClientRect();
      const blockTop = rect.top + window.scrollY;
      const blockBottom = blockTop + rect.height;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let progress = 0;
      let isActive = false;
      let isInViewport = false;

      // Check if this text block is in viewport
      if (scrollPosition >= blockTop && scrollPosition <= blockBottom) {
        isActive = true;
        progress = (scrollPosition - blockTop) / (blockBottom - blockTop);
        textBlock.classList.add('active');
      } else {
        textBlock.classList.remove('active');
      }

      // Check if text block is still visible in viewport (even if not active)
      const viewportTop = window.scrollY;
      const viewportBottom = window.scrollY + window.innerHeight;
      isInViewport = (blockBottom > viewportTop && blockTop < viewportBottom);

      // Update this specific mobile folder
      if (isActive) {
        updateFolderAnimation(folder, textBlock, progress);
      } else if (isInViewport && folder.classList.contains('open')) {
        // Text block is in viewport and folder is already open - keep it open
        folder.classList.remove('closed', 'peek');
        folder.classList.add('open');
      } else {
        // Not in viewport or not open - default to closed
        folder.classList.remove('peek', 'open');
        folder.classList.add('closed');
      }
    });
  }

  // Main update function
  function updateAllFolders() {
    // Check if we're on desktop or mobile
    if (window.innerWidth > 1024) {
      updateDesktopFolderAnimation();
    } else {
      updateMobileFolderAnimation();
    }
  }

  // Throttled scroll handler
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateAllFolders();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Handle window resize
  function handleResize() {
    // Reset all folders to closed state on resize
    if (desktopFolder) {
      desktopFolder.classList.remove('peek', 'open');
      desktopFolder.classList.add('closed');
    }
    mobileFolders.forEach(folder => {
      folder.classList.remove('peek', 'open');
      folder.classList.add('closed');
    });

    // Update after resize
    setTimeout(updateAllFolders, 100);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });

  // Initial update
  updateAllFolders();
})();

// ============================================
// FOLDER ANIMATION
// ============================================
(function () {
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
    // const container = folder.closest('.folder-container');
    const color = container?.dataset.color || '#fb6630';
    // const folderBackColor = darkenColor(color, 0.1);
    const paper1 = darkenColor('#fcfcfc', 0.01);
    const paper2 = darkenColor('#fcfcfc', 0.01);
    const paper3 = '#ffffff';

    // Set CSS variables
    // const folderBack = folder.querySelector('.folder__back');
    // folderBack.style.setProperty('--folder-color', color);
    // folderBack.style.setProperty('--folder-back-color', folderBackColor);
    folderBack.style.setProperty('--paper-1', paper1);
    folderBack.style.setProperty('--paper-2', paper2);
    folderBack.style.setProperty('--paper-3', paper3);

    // Apply colors to elements
    // folderBack.style.background = folderBackColor;
    // const afterElement = folderBack;
    // afterElement.style.setProperty('--folder-back-color', folderBackColor);

    // folder.querySelectorAll('.folder__front').forEach(front => {
    //   front.style.background = color;
    // });

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

// Mobile menu functionality
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const headerActions = document.querySelector('.header-actions');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const body = document.body;
  const html = document.documentElement;
  let lockedScrollY = 0;

  if (!mobileToggle || !headerActions) return;

  function closeMenu() {
    mobileToggle.classList.remove('active');
    headerActions.classList.remove('active');
    // 🔓 Unlock scroll and restore position exactly
    html.classList.remove('menu-open');
    body.classList.remove('menu-open');
    const scrollY = lockedScrollY;
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    body.style.overflow = '';
    // restore scroll position
    window.scrollTo({ top: scrollY, behavior: 'instant' });
  }

  function openMenu() {
    mobileToggle.classList.add('active');
    headerActions.classList.add('active');
    // 🔒 Lock scroll properly for mobile
    lockedScrollY = window.scrollY;
    html.classList.add('menu-open');
    body.classList.add('menu-open');
    body.style.position = 'fixed';
    body.style.top = `-${lockedScrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
  }

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (headerActions.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close button handler
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (headerActions.classList.contains('active') &&
      !headerActions.contains(e.target) &&
      !mobileToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && headerActions.classList.contains('active')) {
      closeMenu();
    }
  });
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Mobile carousel (autoplay + dots + swipe)
function initMobileCarousel() {
  if (window.innerWidth > 1024) return; // mobile only
  const carousel = document.querySelector('.mob-carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.mob-carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.mob-slide'));
  const dotsContainer = carousel.querySelector('.mob-carousel-dots');
  if (!track || slides.length === 0 || !dotsContainer) return;

  let current = 0;
  let autoTimer = null;
  const AUTO_MS = 1000;
  let startX = 0;
  let deltaX = 0;
  let isDragging = false;

  // Build dots if empty
  if (dotsContainer.children.length === 0) {
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
      btn.addEventListener('click', () => goTo(i, true));
      dotsContainer.appendChild(btn);
    });
  }
  const dots = Array.from(dotsContainer.children);

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(index, pause) {
    current = (index + slides.length) % slides.length;
    update();
    if (pause) restartAutoplay();
  }

  function next() { goTo(current + 1); }

  function startAutoplay() {
    stopAutoplay();
    autoTimer = setInterval(next, AUTO_MS);
  }

  function stopAutoplay() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

  function restartAutoplay() { stopAutoplay(); startAutoplay(); }

  // Touch/drag swipe
  function onStart(e) {
    isDragging = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    deltaX = 0;
    track.style.transition = 'none';
    stopAutoplay();
  }
  function onMove(e) {
    if (!isDragging) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    deltaX = x - startX;
    const percent = (deltaX / track.offsetWidth) * 100;
    track.style.transform = `translateX(calc(-${current * 100}% + ${percent}%))`;
  }
  function onEnd() {
    if (!isDragging) return;
    track.style.transition = '';
    const threshold = track.offsetWidth * 0.15; // 15% swipe
    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) next(); else goTo(current - 1);
    } else {
      update();
    }
    isDragging = false;
    startAutoplay();
  }

  track.addEventListener('touchstart', onStart, { passive: true });
  track.addEventListener('touchmove', onMove, { passive: true });
  track.addEventListener('touchend', onEnd);
  track.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);

  // Pause on visibility change to save battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay(); else startAutoplay();
  });

  // Init
  update();
  startAutoplay();
}

// About page: team-section mobile modal (<=1024px)
document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth > 1024) return;
  const grid = document.querySelector('.team-section .team-grid');
  if (!grid) return;
  const modal = document.getElementById('teamModal');
  const tmName = document.getElementById('tmName');
  const tmRole = document.getElementById('tmRole');
  const tmDesc = document.getElementById('tmDesc');
  const tmClose = document.getElementById('tmClose');
  let lockedScrollY = 0;

  function openModal(data) {
    if (!modal) return;
    tmName.textContent = data.name || '';
    tmRole.textContent = data.role || '';
    tmDesc.textContent = data.desc || '';
    modal.classList.add('open');
    // Lock background scroll (mobile friendly)
    // 🔒 Lock scroll properly
    lockedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');

    // 🔓 Unlock scroll and restore position exactly
    const scrollY = lockedScrollY;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';

    // ✅ Use this to prevent "jumping up"
    window.scrollTo({ top: scrollY, behavior: 'instant' });
  }

  grid.querySelectorAll('.team-card').forEach(card => {
    const img = card.querySelector('.team-card-front img');
    const name = card.querySelector('.team-card-info h3')?.textContent?.trim();
    const role = card.querySelector('.team-card-info p')?.textContent?.trim();
    const desc = card.querySelector('.team-card-back .team-description')?.textContent?.trim();

    card.addEventListener('click', () => {
      openModal({
        img: img?.getAttribute('src') || '',
        name,
        role,
        desc,
      });
    });
  });

  tmClose?.addEventListener('click', closeModal);
  modal?.querySelector('.team-modal-backdrop')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 1024) closeModal(); });
});

