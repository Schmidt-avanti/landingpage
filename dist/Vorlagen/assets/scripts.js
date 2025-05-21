// Toggle Menu
function toggleMenu() {
  const navButton = document.querySelector(".hamburger");
  const mobileNavMenu = document.querySelector(".mobileNav");
  const mobileNavClose = document.getElementById("closeNav");

  navButton.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileNavMenu.classList.add("navActive");
  });

  mobileNavClose.addEventListener("click", () => {
    mobileNavMenu.classList.remove("navActive");
  });

  mobileNavMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    mobileNavMenu.classList.remove("navActive");
  });
}

toggleMenu();

// Intersection Observer

const heroSection = document.querySelector(".o-Container");
const navContainer = document.querySelector(".navContainer");
const toTopBtn = document.querySelector(".toTop");
toTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        navContainer.classList.add("bg-main");
        toTopBtn.classList.remove("d-none");
      } else {
        navContainer.classList.remove("bg-main");
        toTopBtn.classList.add("d-none");
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.95,
  }
);
navObserver.observe(heroSection);

// Video Player
document.querySelectorAll(".videoContainer").forEach((container) => {
  const video = container.querySelector(".otherVideo");
  const playBtn = container.querySelector(".playBtn");

  const videoControl = () => {
    if (video.paused) {
      video
        .play()
        .catch((error) => console.error("Error playing video:", error));
      playBtn.classList.add("d-none");
    } else {
      video.pause();
      playBtn.classList.remove("d-none");
    }
  };

  playBtn.addEventListener("click", videoControl);
  video.addEventListener("click", videoControl);
});

new Splide("#logo-carousel", {
  type: "loop",
  drag: "free",
  focus: "center",
  perPage: 3,
  autoScroll: {
    speed: 1,
  },
  pagination: false,
  arrows: false,
  autoWidth: true,
}).mount(window.splide.Extensions);

 function animateCountUp(el, target) {
    const duration = 1000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * (target - start) + start);

      el.textContent = current.toLocaleString(); // Format with commas
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString(); // Final value
      }
    }

    requestAnimationFrame(update);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".countup-number");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target"));
          animateCountUp(el, target);
          el.classList.add("counted"); // Prevent re-trigger
        }
      });
    }, {
      threshold: 0.6 // Adjust if needed: how much of element is visible to trigger
    });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  });