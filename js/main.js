// Main Application Logic
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Components
  initializeNavigation();
  initializeSectionAnimations();
  initializeContactForm();
});

// Navigation Functionality
function initializeNavigation() {
  const navbar = document.querySelector(".navbar");
  const mobileMenuToggle = document.querySelector(
    ".mobile-menu-toggle"
  );
  const navLinks = document.querySelector(".nav-links");

  // Navbar Scroll Effect - Changes navbar style when scrolling
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle - Handles mobile menu interaction
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Smooth Scroll for Navigation Links - Provides smooth scrolling to sections
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(
        this.getAttribute("href")
      );
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu if open
        navLinks.classList.remove("active");
      }
    });
  });
}

// Section Animation on Scroll - Animates sections as they come into view
function initializeSectionAnimations() {
  const sections = document.querySelectorAll(".section-animate");

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px",
  };

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    observerOptions
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// Contact Form Handling - Manages contact form submission and feedback
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitButton = contactForm.querySelector(
        'button[type="submit"]'
      );
      const originalButtonText = submitButton.textContent;

      // Show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = "Envoie en cours";
      submitButton.innerHTML += '<span class="loading"></span>';

      try {
        // Simulate form submission (replace with actual API call)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Show success message
        showNotification("Message envoyé avec succès!", "success");
        contactForm.reset();
      } catch (error) {
        showNotification(
          "Une erreur est survenue. Veuillez réessayer.",
          "error"
        );
      } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }
}

// Notification System - Displays feedback messages to users
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Trigger entrance animation
  setTimeout(() => {
    notification.classList.add("visible");
  }, 100);

  // Remove notification after delay
  setTimeout(() => {
    notification.classList.remove("visible");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Date Formatting Utility
function formatDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// String Utility Functions
const stringUtils = {
  // Capitalizes first letter of each word
  capitalize: (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  },

  // Removes accents from text
  removeAccents: (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  },

  // Slugifies a string for URLs
  slugify: (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  },
};

// DOM Utility Functions
const domUtils = {
  // Creates an element with classes and attributes
  createElement: (tag, classes = [], attributes = {}) => {
    const element = document.createElement(tag);
    classes.forEach((className) => element.classList.add(className));
    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, value)
    );
    return element;
  },

  // Safely removes an element from DOM
  removeElement: (element) => {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  },

  // Adds event listener with automatic cleanup
  addEventListenerWithCleanup: (element, event, handler) => {
    element.addEventListener(event, handler);
    return () => element.removeEventListener(event, handler);
  },
};

// Viewport Utility Functions
const viewportUtils = {
  // Checks if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight ||
          document.documentElement.clientHeight) &&
      rect.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Gets viewport dimensions
  getViewportDimensions: () => {
    return {
      width:
        window.innerWidth || document.documentElement.clientWidth,
      height:
        window.innerHeight || document.documentElement.clientHeight,
    };
  },
};

// Export utilities for use in other modules
window.appUtils = {
  string: stringUtils,
  dom: domUtils,
  viewport: viewportUtils,
  debounce,
  formatDate,
};
