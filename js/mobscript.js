document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".mob-carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".mob-carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".mob-slide"));
    const dotsContainer = carousel.querySelector(".mob-carousel-dots");
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;
    const autoSlideInterval = 50000; // 2 seconds

    // Create dots dynamically
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
      dot.addEventListener("click", () => goToSlide(i));
    });

    const dots = dotsContainer.querySelectorAll("button");

    function goToSlide(index) {
      const offset = -index * 100;
      track.style.transform = `translateX(${offset}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
      currentIndex = index;
    }

    // Swipe (touch) handling
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });
    function handleSwipe() {
      const diff = endX - startX;
      const threshold = 50; // minimum distance to count as a swipe

      if (diff > threshold) {
        // Swipe right
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
      } else if (diff < -threshold) {
        // Swipe left
        currentIndex = (currentIndex + 1) % slides.length;
      }
      goToSlide(currentIndex);
    }

    // Auto-slide every 2 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    }, autoSlideInterval);
  });
});
