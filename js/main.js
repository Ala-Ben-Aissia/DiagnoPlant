document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeSectionAnimations();
  initializeContactForm();
});

function initializeNavigation() {
  const navbar = document.querySelector(".navbar");
  const mobileMenuToggle = document.querySelector(
    ".mobile-menu-toggle"
  );
  const navLinks = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

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

        navLinks.classList.remove("active");
      }
    });
  });
}

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

function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitButton = contactForm.querySelector(
        'button[type="submit"]'
      );
      const originalButtonText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.innerHTML = "Envoie en cours";
      submitButton.innerHTML += '<span class="loading"></span>';

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        showNotification("Message envoyé avec succès!", "success");
        contactForm.reset();
      } catch (error) {
        showNotification(
          "Une erreur est survenue. Veuillez réessayer.",
          "error"
        );
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("visible");
  }, 100);

  setTimeout(() => {
    notification.classList.remove("visible");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

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

function formatDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

const stringUtils = {
  capitalize: (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  },

  removeAccents: (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  },

  slugify: (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  },
};

const domUtils = {
  createElement: (tag, classes = [], attributes = {}) => {
    const element = document.createElement(tag);
    classes.forEach((className) => element.classList.add(className));
    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, value)
    );
    return element;
  },

  removeElement: (element) => {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  },

  addEventListenerWithCleanup: (element, event, handler) => {
    element.addEventListener(event, handler);
    return () => element.removeEventListener(event, handler);
  },
};

const viewportUtils = {
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

  getViewportDimensions: () => {
    return {
      width:
        window.innerWidth || document.documentElement.clientWidth,
      height:
        window.innerHeight || document.documentElement.clientHeight,
    };
  },
};

window.appUtils = {
  string: stringUtils,
  dom: domUtils,
  viewport: viewportUtils,
  debounce,
  formatDate,
};
