// script.js - Modern JavaScript for animations and interactivity

// Check if we're on an auth page
const isAuthPage = window.location.pathname.includes('/auth/');

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe all sections and cards for animations
document.addEventListener('DOMContentLoaded', () => {
  // Only apply animations and fade-in on non-auth pages
  if (!isAuthPage) {
    // Observe sections
    const sections = document.querySelectorAll('.section, .card, .project-card');
    sections.forEach(section => {
      observer.observe(section);
    });

    // Add loading animation to page
    document.body.classList.add('loaded');
  }

  // Initialize tooltips (only on non-auth pages for now)
  if (!isAuthPage) {
    initTooltips();
  }

  // Smooth scrolling for navigation links
  initSmoothScrolling();
});

// Tooltip functionality
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  let currentTooltip = null;

  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
    element.addEventListener('mousemove', updateTooltipPosition);
  });

  function showTooltip(e) {
    hideTooltip(); // Hide any existing tooltip

    const tooltipText = e.target.getAttribute('data-tooltip');
    if (!tooltipText) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;

    document.body.appendChild(tooltip);
    currentTooltip = tooltip;

    // Position tooltip
    updateTooltipPosition(e);

    // Show tooltip with animation
    setTimeout(() => {
      tooltip.classList.add('show');
    }, 10);
  }

  function hideTooltip() {
    if (currentTooltip) {
      currentTooltip.classList.remove('show');
      setTimeout(() => {
        if (currentTooltip && currentTooltip.parentNode) {
          currentTooltip.parentNode.removeChild(currentTooltip);
        }
        currentTooltip = null;
      }, 300);
    }
  }

  function updateTooltipPosition(e) {
    if (!currentTooltip) return;

    const tooltipRect = currentTooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = e.clientX + 10;
    let y = e.clientY - 10 - tooltipRect.height;

    // Adjust if tooltip goes off screen
    if (x + tooltipRect.width > viewportWidth) {
      x = e.clientX - tooltipRect.width - 10;
    }

    if (y < 0) {
      y = e.clientY + 10;
    }

    currentTooltip.style.left = x + 'px';
    currentTooltip.style.top = y + 'px';
  }
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add CSS for animation trigger
const style = document.createElement('style');
style.textContent = `
  .section, .card, .project-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .section.animate, .card.animate, .project-card.animate {
    opacity: 1;
    transform: translateY(0);
  }

  ${!isAuthPage ? `
  body {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  body.loaded {
    opacity: 1;
  }
  ` : ''}
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
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

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
  const handleScroll = debounce(() => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  }, 10);

  window.addEventListener('scroll', handleScroll);
}

// Button ripple effect
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    const button = e.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);