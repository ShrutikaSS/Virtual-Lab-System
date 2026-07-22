/* ============================================================
   ANIMATION-ONLY LOGIC (animations.js)
   ============================================================ */

(function () {
  'use strict';

  // 1. Scroll Reveal: IntersectionObserver for elements with class "on-scroll"
  const onScrollElements = document.querySelectorAll('.on-scroll');
  if (onScrollElements.length > 0) {
    const scrollRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          scrollRevealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    onScrollElements.forEach(el => scrollRevealObserver.observe(el));
  }

  // 2. Shrinking sticky nav: Add "is-scrolled" when scrolled > 50px
  const siteNav = document.getElementById('site-nav');
  if (siteNav) {
    const handleNavScroll = () => {
      if (window.scrollY > 50) {
        siteNav.classList.add('is-scrolled');
      } else {
        siteNav.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // Run once initially
  }

  // 3. Count-up numbers: IntersectionObserver for elements with class "count-num"
  const counters = document.querySelectorAll('.count-num');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          if (isNaN(target)) return;
          
          const duration = 1500;
          const start = performance.now();

          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(easeProgress * target);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = target;
            }
          };

          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

  // 4. Back-to-top button: show/hide on scroll, scroll smoothly on click
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Testimonial Carousel: Automatic fade transitions and dot navigation
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.slide');
    const dotsContainer = carousel.querySelector('.dots');
    if (slides.length <= 1) return;

    let currentIdx = 0;
    let intervalId;

    // Clear existing dots and generate dynamically
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
          showSlide(i);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function showSlide(index) {
      slides[currentIdx].classList.remove('active');
      if (dotsContainer && dotsContainer.children[currentIdx]) {
        dotsContainer.children[currentIdx].classList.remove('active');
      }
      
      currentIdx = index;
      
      slides[currentIdx].classList.add('active');
      if (dotsContainer && dotsContainer.children[currentIdx]) {
        dotsContainer.children[currentIdx].classList.add('active');
      }
    }

    function startAutoplay() {
      intervalId = setInterval(() => {
        const nextIdx = (currentIdx + 1) % slides.length;
        showSlide(nextIdx);
      }, 5000);
    }

    function resetAutoplay() {
      clearInterval(intervalId);
      startAutoplay();
    }

    startAutoplay();
  });

  // 6. Custom trailing cursor (for desktop pointer devices)
  if (window.matchMedia('(pointer: fine)').matches) {
    // Progressive enhancement: Add class indicating custom cursor active
    document.documentElement.classList.add('custom-cursor-enabled');

    // Dynamically inject custom cursor elements
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let hasMoved = false;

    // Mousemove tracking
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instantly position the inner dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      
      if (!hasMoved) {
        hasMoved = true;
        // Fade elements in on first motion
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        // Initialize ring position to match mouse instantly
        ringX = mouseX;
        ringY = mouseY;
      }
    }, { passive: true });

    // Handle mouse leaving and re-entering window
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      if (hasMoved) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    });

    // Smooth inertia loop using requestAnimationFrame (linear interpolation / lerp)
    const render = () => {
      if (hasMoved) {
        // Trailing speed factor: 0.15 (15% interpolation per frame)
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // Hover state toggles for interactive target selectors and text input targets
    const interactiveTargets = 'a, button, .hover-lift, [role="button"], input[type="submit"], .help-row';
    const textInputTargets = 'input, textarea, select, option, iframe';

    document.addEventListener('mouseover', (e) => {
      // Hide custom cursor elements over form inputs to avoid visual obstruction
      if (e.target.closest(textInputTargets)) {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      } else {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        if (e.target.closest(interactiveTargets)) {
          document.body.classList.add('cursor-hover');
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(textInputTargets)) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      if (!e.relatedTarget || !e.relatedTarget.closest(interactiveTargets)) {
        document.body.classList.remove('cursor-hover');
      }
    });
  }
})();
