/**
 * CATCHABIT SOLUTIONS — ULTRA-PREMIUM INTERACTIVE ENGINE & ANIMATIONS
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Cursor Follower Spotlight Effect
     ------------------------------------------------------------------------ */
  const cursorSpotlight = document.createElement('div');
  cursorSpotlight.className = 'cursor-spotlight';
  document.body.appendChild(cursorSpotlight);

  document.addEventListener('mousemove', (e) => {
    cursorSpotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });

  /* ------------------------------------------------------------------------
     2. Sticky Navigation Bar State
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
     3. Mobile Navigation Toggle
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
     4. Smooth Anchor Scroll with Header Offset
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 84;
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
     5. Scroll-Triggered Reveal Animations (Intersection Observer)
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal-up');
  const dividerElements = document.querySelectorAll('.section-divider');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));
  dividerElements.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------------------------------
     6. FUNCTIONAL INTERACTIVE DEMO CONSOLE ENGINE
     ------------------------------------------------------------------------ */
  const demoSlider = document.getElementById('bidSlider');
  const sliderValLabel = document.getElementById('sliderValLabel');
  const metricSales = document.getElementById('metricSales');
  const metricAcos = document.getElementById('metricAcos');
  const metricRoas = document.getElementById('metricRoas');
  const metricTacos = document.getElementById('metricTacos');
  const dynamicChartPath = document.getElementById('dynamicChartPath');
  const consoleTabs = document.querySelectorAll('.console-tab');

  // Base Data Model for Channels
  const channelData = {
    all: { baseSales: 28.5, maxSales: 54.2, startAcos: 29.8, minAcos: 13.4, startRoas: 3.35, maxRoas: 7.46, startTacos: 18.2, minTacos: 7.8 },
    sp:  { baseSales: 18.2, maxSales: 36.8, startAcos: 26.4, minAcos: 12.8, startRoas: 3.78, maxRoas: 7.81, startTacos: 14.2, minTacos: 6.2 },
    sb:  { baseSales: 8.4,  maxSales: 18.5, startAcos: 31.2, minAcos: 14.9, startRoas: 3.20, maxRoas: 6.71, startTacos: 16.5, minTacos: 7.4 },
    sd:  { baseSales: 4.2,  maxSales: 11.4, startAcos: 34.5, minAcos: 16.2, startRoas: 2.89, maxRoas: 6.17, startTacos: 19.1, minTacos: 8.9 },
    dsp: { baseSales: 6.8,  maxSales: 19.2, startAcos: 24.1, minAcos: 11.5, startRoas: 4.14, maxRoas: 8.69, startTacos: 12.4, minTacos: 5.1 }
  };

  let activeChannel = 'all';

  function updateConsoleMetrics() {
    if (!demoSlider) return;
    const factor = parseFloat(demoSlider.value) / 100; // 0 to 1
    const data = channelData[activeChannel];

    sliderValLabel.textContent = `+${demoSlider.value}% Optimization`;

    // Calculate Interpolated Metrics
    const currentSales = (data.baseSales + (data.maxSales - data.baseSales) * factor).toFixed(1);
    const currentAcos = (data.startAcos - (data.startAcos - data.minAcos) * factor).toFixed(1);
    const currentRoas = (data.startRoas + (data.maxRoas - data.startRoas) * factor).toFixed(2);
    const currentTacos = (data.startTacos - (data.startTacos - data.minTacos) * factor).toFixed(1);

    if (metricSales) metricSales.textContent = `₹${currentSales}L`;
    if (metricAcos) metricAcos.textContent = `${currentAcos}%`;
    if (metricRoas) metricRoas.textContent = `${currentRoas}x`;
    if (metricTacos) metricTacos.textContent = `${currentTacos}%`;

    // Dynamic Chart Path Morphing
    if (dynamicChartPath) {
      const p1 = Math.round(130 - factor * 40);
      const p2 = Math.round(110 - factor * 50);
      const p3 = Math.round(80 - factor * 55);
      const p4 = Math.round(45 - factor * 35);
      const p5 = Math.round(25 - factor * 15);

      const dPath = `M 20 140 Q 100 ${p1}, 180 ${p2} T 340 ${p3} T 480 ${p4} T 580 ${p5} L 580 160 L 20 160 Z`;
      dynamicChartPath.setAttribute('d', dPath);
    }
  }

  if (demoSlider) {
    demoSlider.addEventListener('input', updateConsoleMetrics);
  }

  consoleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      consoleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeChannel = tab.getAttribute('data-channel');
      updateConsoleMetrics();
    });
  });

  updateConsoleMetrics();

  /* ------------------------------------------------------------------------
     7. INTERACTIVE SERP PLACEMENT SIMULATOR
     ------------------------------------------------------------------------ */
  const placementBtns = document.querySelectorAll('.placement-btn');
  const serpSlots = document.querySelectorAll('.serp-ad-slot');

  placementBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSlot = btn.getAttribute('data-placement');

      placementBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      serpSlots.forEach(slot => {
        slot.classList.remove('active-target');
        if (slot.getAttribute('data-slot') === targetSlot) {
          slot.classList.add('active-target');
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     8. Stat Numbers Count-Up Animation
     ------------------------------------------------------------------------ */
  const statValues = document.querySelectorAll('.stat-value');
  let hasAnimatedStats = false;

  function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }

  function animateStatCount(element) {
    const rawTarget = element.getAttribute('data-target');
    if (!rawTarget) return;

    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '';
    const targetNum = parseFloat(element.getAttribute('data-value'));
    const isDecimal = element.getAttribute('data-decimal') === 'true';
    const duration = 2000;
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
        element.textContent = rawTarget;
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
    }, { threshold: 0.2 });

    statsObserver.observe(resultsSection);
  }

  /* ------------------------------------------------------------------------
     9. FAQ Accordion Logic
     ------------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(other => {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* ------------------------------------------------------------------------
     10. Live Optimization Toast Ticker Notification
     ------------------------------------------------------------------------ */
  const activityToast = document.getElementById('activityToast');
  const toastText = document.getElementById('toastText');

  const liveActivities = [
    "Just saved 18.4% ACoS for an Ayurvedic Brand • 2m ago",
    "Top of Search placement multiplier boosted ROAS to 7.2x • 8m ago",
    "Negative phrase harvesting saved ₹42,000 spend • 14m ago",
    "Sponsored Display retargeting campaign launched • 21m ago",
    "Amazon DSP programmatic audience synced for Q3 • 35m ago"
  ];

  let toastIndex = 0;

  function showNextToast() {
    if (!activityToast || !toastText) return;
    toastText.textContent = liveActivities[toastIndex];
    activityToast.classList.add('show');

    setTimeout(() => {
      activityToast.classList.remove('show');
    }, 5000);

    toastIndex = (toastIndex + 1) % liveActivities.length;
  }

  // Show first toast after 4s, repeat every 14s
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 14000);
  }, 4000);

  /* ------------------------------------------------------------------------
     11. Contact Form Web3Forms AJAX Handling
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('auditForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Audit Request';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Transmitting Request...</span>';
      }

      formStatus.className = 'form-status show';
      formStatus.textContent = 'Transmitting account audit request to CatchAbit strategy team...';

      const formData = new FormData(contactForm);
      const accessKey = formData.get('access_key');

      try {
        if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
          await new Promise(resolve => setTimeout(resolve, 800));
          formStatus.className = 'form-status show success';
          formStatus.innerHTML = '✓ <strong>Audit Request Received!</strong> Our Amazon PPC strategy team will analyze your account and contact you within 24 hours.';
          contactForm.reset();
        } else {
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          });

          const data = await response.json();

          if (data.success) {
            formStatus.className = 'form-status show success';
            formStatus.innerHTML = '✓ <strong>Audit Request Received!</strong> Our Amazon PPC strategy team will analyze your account and contact you within 24 hours.';
            contactForm.reset();
          } else {
            formStatus.className = 'form-status show error';
            formStatus.textContent = data.message || 'Unable to transmit request. Please email contact@catchabit.in directly.';
          }
        }
      } catch (err) {
        formStatus.className = 'form-status show error';
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
     12. Active Nav Link Scroll Tracker
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightActiveNav() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
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
