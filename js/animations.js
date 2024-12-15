// Animation Utility Class
class AnimationController {
  constructor() {
    this.initializeIntersectionObserver();
    this.initializeParallaxEffects();
    this.setupScrollAnimations();
  }

  initializeIntersectionObserver() {
    const options = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          if (entry.target.dataset.animation) {
            entry.target.classList.add(
              entry.target.dataset.animation
            );
          }
        }
      });
    }, options);

    // Observe all animatable elements
    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((element) => {
        this.observer.observe(element);
      });
  }

  initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll(".parallax");

    window.addEventListener("scroll", () => {
      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.5;
        const rect = element.getBoundingClientRect();
        const scrolled = window.pageYOffset;

        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          const yPos = -(scrolled * speed);
          element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });
    });
  }

  setupScrollAnimations() {
    // Progressive loading animation for sections
    document.querySelectorAll("section").forEach((section, index) => {
      section.style.setProperty(
        "--animation-delay",
        `${index * 0.2}s`
      );
      section.classList.add("animate-on-scroll");
    });

    // Smooth scroll implementation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          this.smoothScrollTo(targetElement);
        }
      });
    });
  }

  smoothScrollTo(element) {
    const startPosition = window.pageYOffset;
    const targetPosition =
      element.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);

      window.scrollTo(
        0,
        startPosition + distance * this.easeInOutCubic(percentage)
      );

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }
  }

  // Easing function for smooth scroll
  easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  // Add entrance animation to element
  addEntranceAnimation(element, animationClass) {
    element.classList.add("animate-on-scroll", animationClass);
    this.observer.observe(element);
  }

  // Add hover animation to element
  addHoverAnimation(element, animationClass) {
    element.addEventListener("mouseenter", () => {
      element.classList.add(animationClass);
    });

    element.addEventListener("mouseleave", () => {
      element.classList.remove(animationClass);
    });
  }

  // Create loading spinner
  createLoadingSpinner(parent) {
    const spinner = document.createElement("div");
    spinner.className = "loading-spinner";
    parent.appendChild(spinner);
    return spinner;
  }

  // Remove loading spinner
  removeLoadingSpinner(spinner) {
    spinner.addEventListener("animationend", () => {
      spinner.remove();
    });
    spinner.classList.add("fade-out");
  }
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.AnimationController = new AnimationController();
});
