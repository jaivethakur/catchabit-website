/**
 * CATCHABIT SOLUTIONS — LUXURY WEBSITE JAVASCRIPT MOTION & INTERACTION ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Sticky Navigation Bar State
     ------------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('.hero');

  function handleNavbarScroll() {
    if (!navbar) return;
    const scrollThreshold = heroSection ? heroSection.offsetHeight - 120 : 100;
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ------------------------------------------------------------------------
     2. Mobile Navigation Toggle
     ------------------------------------------------------------------------ */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      const isActive = mobileOverlay.classList.toggle('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
      mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. Smooth Anchor Scroll with Header Offset
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. Scroll-Triggered Reveal Animations (Intersection Observer)
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal-up');
  const dividerElements = document.querySelectorAll('.section-divider');

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => revealObserver.observe(el));
  dividerElements.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------------------------------
     5. Stat Numbers Count-Up Animation
     ------------------------------------------------------------------------ */
  const statValues = document.querySelectorAll('.stat-value');
  let hasAnimatedStats = false;

  function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }

  function animateStatCount(element) {
    const rawTarget = element.getAttribute('data-target');
    if (!rawTarget) return;

    // Parse prefix, numeric target, suffix
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '';
    const targetNum = parseFloat(element.getAttribute('data-value'));
    const isDecimal = element.getAttribute('data-decimal') === 'true';
    const duration = 1800; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);

      const currentValue = targetNum * easedProgress;
      const formattedNum = isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue);

      element.textContent = `${prefix}${formattedNum}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = rawTarget; // Lock to exact string on completion
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const resultsSection = document.querySelector('.results-section');
  if (resultsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedStats) {
          hasAnimatedStats = true;
          statValues.forEach(animateStatCount);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(resultsSection);
  }

  /* ------------------------------------------------------------------------
     6. Subtle Magnetic Button Hover Effect
     ------------------------------------------------------------------------ */
  const buttons = document.querySelectorAll('.btn-primary');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0) scale(1.03)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ------------------------------------------------------------------------
     7. Contact Form Handling (Web3Forms AJAX Submission)
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('auditForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Request';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Submitting Request...</span>';
      }

      formStatus.className = 'form-status';
      formStatus.textContent = 'Transmitting request to CatchAbit team...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Audit Request Received. Our strategy team will reach out within 24 hours.';
          contactForm.reset();
        } else {
          formStatus.className = 'form-status error';
          formStatus.textContent = data.message || 'Unable to transmit request. Please email us directly.';
        }
      } catch (err) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Connection error. Please try submitting again or email contact@catchabit.in';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     8. Active Nav Link Tracking on Scroll
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightActiveNav() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });
});
