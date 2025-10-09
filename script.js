// script.js
document.addEventListener('DOMContentLoaded', function () {
  // Enhanced Mobile Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {  // Added null check
    navToggle.addEventListener('click', function (e) {
      e.preventDefault();  // Prevent default
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Add touch support for mobile
    navToggle.addEventListener('touchstart', function(e) {
      e.preventDefault();
      navToggle.click();
    }, { passive: false });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu) {  // Added null check
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';  // Reset scroll
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu && navToggle && navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu && navToggle) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Remove previous manual contact form submission handling,
  // so the form submits naturally to Formspree and emails go through.
  // Validate inputs only via HTML `required` attributes.

  // Animated counter for stats
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    counters.forEach((counter) => {
      const updateCount = () => {
        const target = counter.getAttribute('data-count');
        const count = +counter.textContent || 0;

        const targetNum = parseFloat(target);
        const inc = targetNum / speed;

        if (count < targetNum) {
          const newCount = count + inc;
          if (target.includes('.')) {
            counter.textContent = newCount.toFixed(2);
          } else {
            counter.textContent = Math.ceil(newCount);
          }
          setTimeout(updateCount, 1);
        } else {
          counter.textContent = target;
        }
      };

      updateCount();
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');

        // Trigger counter animation for stats section
        if (entry.target.classList.contains('stats')) {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.timeline-item, .project-card, .stats, .certification-card');
  animateElements.forEach((el) => observer.observe(el));

  // Active navigation link highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // Preloader (optional)
  window.addEventListener('load', function () {
    document.body.classList.add('loaded');
  });

  // Lazy loading for images (if you add more images)
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  // Smooth reveal animations for elements
  const revealElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .certification-card');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });
});

// Utility function to copy email to clipboard
function copyEmail() {
  const email = 'kurlawaladharmik@gmail.com';
  navigator.clipboard
    .writeText(email)
    .then(() => {
      alert('Email copied to clipboard!');
    })
    .catch((err) => {
      console.error('Failed to copy email: ', err);
    });
}

// Easter egg - Konami code
(function () {
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let userInput = [];

  document.addEventListener('keydown', function (e) {
    userInput.push(e.keyCode);
    userInput = userInput.slice(-konamiCode.length);

    if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
      document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)';
      document.body.style.backgroundSize = '400% 400%';
      document.body.style.animation = 'gradientShift 3s ease infinite';

      setTimeout(() => {
        document.body.style.background = '';
        document.body.style.animation = '';
      }, 5000);
    }
  });
})();

// Add gradient animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .active {
    color: var(--primary-color) !important;
  }
  .active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(style);
