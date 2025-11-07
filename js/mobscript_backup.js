document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".mob-carousel");
  
    carousels.forEach((carousel) => {
      const track = carousel.querySelector(".mob-carousel-track");
      const slides = Array.from(carousel.querySelectorAll(".mob-slide"));
      const dotsContainer = carousel.querySelector(".mob-carousel-dots");
      let currentIndex = 0;
  
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
  
      // Optional: Auto-slide per carousel
      setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
      }, 400000);
    });
  });
  