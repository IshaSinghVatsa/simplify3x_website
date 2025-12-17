document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".mob-carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".mob-carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".mob-slide"));
    const dotsContainer = carousel.querySelector(".mob-carousel-dots");
    let currentIndex = 0;
    let isDragging = false;
    let isMouseDown = false;
    let autoSlideInterval;
    const AUTO_SLIDE_DELAY = 2000; // 2 seconds
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let autoSlideEnabled = true;
    let trackWidth = 0;

    // Clear existing dots
    dotsContainer.innerHTML = '';

    // Create dots dynamically
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.classList.add("mob-dot");
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
      dot.addEventListener("click", () => {
        goToSlide(i);
        resetAutoSlide();
      });
    });

    const dots = dotsContainer.querySelectorAll("button");

    // Create navigation arrows for web
    createNavigationArrows();

    // Replace the arrow creation in createNavigationArrows() function:
function createNavigationArrows() {
  // SVG arrow icons
  const leftArrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
  const rightArrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`;
  
  // Create left arrow
  const leftArrow = document.createElement("button");
  leftArrow.className = "carousel-arrow carousel-arrow-left";
  leftArrow.innerHTML = leftArrowSVG;
  leftArrow.setAttribute("aria-label", "Previous slide");
  
  // Create right arrow
  const rightArrow = document.createElement("button");
  rightArrow.className = "carousel-arrow carousel-arrow-right";
  rightArrow.innerHTML = rightArrowSVG;
  rightArrow.setAttribute("aria-label", "Next slide");
  
  // Add arrows to carousel container
  carousel.appendChild(leftArrow);
  carousel.appendChild(rightArrow);
  
  // Add event listeners
  leftArrow.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });
  
  rightArrow.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });
  
  // Show/hide arrows based on screen size
  updateArrowVisibility();
  window.addEventListener('resize', updateArrowVisibility);
}
    
    function updateArrowVisibility() {
      const arrows = carousel.querySelectorAll('.carousel-arrow');
      if (window.innerWidth > 1028) {
        arrows.forEach(arrow => arrow.style.display = 'flex');
      } else {
        arrows.forEach(arrow => arrow.style.display = 'none');
      }
    }

    function goToSlide(index) {
      currentIndex = index;
      const offset = -index * 100;
      track.style.transform = `translateX(${offset}%)`;
      track.style.transition = 'transform 0.5s ease';
      
      // Update dots
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
      
      // Update slides
      slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
      
      currentTranslate = offset;
      prevTranslate = currentTranslate;
    }
    
    function prevSlide() {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
      goToSlide(currentIndex);
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    }

    // Update track width on resize
    function updateTrackWidth() {
      trackWidth = track.offsetWidth;
    }

    // Initialize track width
    updateTrackWidth();
    window.addEventListener('resize', updateTrackWidth);

    // Touch events for mobile
    track.addEventListener("touchstart", touchStart);
    track.addEventListener("touchmove", touchMove);
    track.addEventListener("touchend", touchEnd);

    // Mouse events for desktop
    track.addEventListener("mousedown", mouseDown);
    track.addEventListener("mousemove", mouseMove);
    track.addEventListener("mouseup", mouseUp);
    track.addEventListener("mouseleave", mouseLeave);

    // Pause auto-slide on hover (desktop)
    carousel.addEventListener("mouseenter", () => {
      pauseAutoSlide();
      autoSlideEnabled = false;
    });
    
    carousel.addEventListener("mouseleave", () => {
      if (!isMouseDown) {
        autoSlideEnabled = true;
        startAutoSlide();
      }
    });

    function touchStart(e) {
      startPos = getPositionX(e);
      isDragging = true;
      animationID = requestAnimationFrame(animation);
      track.style.transition = 'none';
      pauseAutoSlide();
    }

    function touchMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      const currentPos = getPositionX(e);
      const diff = currentPos - startPos;
      // Convert pixel movement to percentage
      currentTranslate = prevTranslate + (diff / trackWidth) * 100;
    }

    function touchEnd() {
      if (!isDragging) return;
      isDragging = false;
      cancelAnimationFrame(animationID);
      
      // Determine slide change based on drag distance
      const slideThreshold = 30; // percentage threshold to change slide
      
      if (currentTranslate < prevTranslate - slideThreshold && currentIndex < slides.length - 1) {
        // Swipe left
        currentIndex++;
      } else if (currentTranslate > prevTranslate + slideThreshold && currentIndex > 0) {
        // Swipe right
        currentIndex--;
      }
      
      goToSlide(currentIndex);
      
      // Restart auto-slide after 1 second delay
      setTimeout(() => {
        if (autoSlideEnabled) {
          startAutoSlide();
        }
      }, 1000);
    }

    function mouseDown(e) {
      isMouseDown = true;
      startPos = e.clientX;
      animationID = requestAnimationFrame(animation);
      track.style.transition = 'none';
      pauseAutoSlide();
      e.preventDefault(); // Prevent text selection
    }

    function mouseMove(e) {
      if (!isMouseDown) return;
      const currentPos = e.clientX;
      const diff = currentPos - startPos;
      // Convert pixel movement to percentage
      currentTranslate = prevTranslate + (diff / trackWidth) * 100;
    }

    function mouseUp() {
      if (!isMouseDown) return;
      isMouseDown = false;
      cancelAnimationFrame(animationID);
      
      // Determine slide change based on drag distance
      const slideThreshold = 30; // percentage threshold to change slide
      
      if (currentTranslate < prevTranslate - slideThreshold && currentIndex < slides.length - 1) {
        // Drag left
        currentIndex++;
      } else if (currentTranslate > prevTranslate + slideThreshold && currentIndex > 0) {
        // Drag right
        currentIndex--;
      }
      
      goToSlide(currentIndex);
      
      // Restart auto-slide after 1 second delay
      setTimeout(() => {
        if (autoSlideEnabled) {
          startAutoSlide();
        }
      }, 1000);
    }

    function mouseLeave() {
      if (isMouseDown) {
        isMouseDown = false;
        cancelAnimationFrame(animationID);
        goToSlide(currentIndex);
        
        setTimeout(() => {
          if (autoSlideEnabled) {
            startAutoSlide();
          }
        }, 1000);
      }
    }

    function getPositionX(e) {
      return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    }

    function animation() {
      setSliderPosition();
      if (isDragging || isMouseDown) {
        requestAnimationFrame(animation);
      }
    }

    function setSliderPosition() {
      // Limit translation to prevent going beyond boundaries
      const maxTranslate = 0;
      const minTranslate = -(slides.length - 1) * 100;
      const limitedTranslate = Math.max(minTranslate, Math.min(maxTranslate, currentTranslate));
      
      track.style.transform = `translateX(${limitedTranslate}%)`;
    }

    // Auto-slide functions
    function startAutoSlide() {
      if (!autoSlideEnabled) return;
      
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        nextSlide();
      }, AUTO_SLIDE_DELAY);
    }

    function pauseAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
      autoSlideEnabled = true;
      pauseAutoSlide();
      startAutoSlide();
    }

    // Initialize
    goToSlide(0);
    autoSlideEnabled = true;
    startAutoSlide();
    
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
      }
    });
  });
});