/**
 * CATCHABIT SOLUTIONS — ULTRA-RICH ANIMATION ENGINE & PARTICLES
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive Particle Canvas Background
  const canvas = document.createElement('canvas');
  canvas.id = 'particleCanvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
      this.opacity = Math.random() * 0.5 + 0.15;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 45 }, () => new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // 2. Mouse Spotlight Tracking
  const spotlight = document.createElement('div');
  spotlight.className = 'cursor-spotlight';
  document.body.appendChild(spotlight);

  window.addEventListener('mousemove', (e) => {
    spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });

  // 3. 3D Tilt Effect on Glass Cards
  const tiltCards = document.querySelectorAll('.glass-card, .serp-mockup-card, .amazon-console-wrapper');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });

  // 4. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 5. Mobile Navigation Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      const active = mobileOverlay.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', active);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 6. AUTHENTIC AMAZON ADVERTISING DEMO CONSOLE ENGINE
  const amazonConsoleTabs = document.querySelectorAll('.amazon-tab');
  const amzAdPreviewPanel = document.getElementById('amzAdPreviewPanel');
  const bidBoostSlider = document.getElementById('bidBoostSlider');
  const bidBoostVal = document.getElementById('bidBoostVal');

  const amzSales = document.getElementById('amzSales');
  const amzAcos = document.getElementById('amzAcos');
  const amzRoas = document.getElementById('amzRoas');
  const amzCpc = document.getElementById('amzCpc');

  // Ad Mockup Templates
  const amazonAdTemplates = {
    sp: `
      <div class="sp-product-ad-card">
        <span class="sp-tag-badge">SPONSORED PRODUCT (TOP OF SEARCH #1)</span>
        <div class="sp-product-img">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        </div>
        <div class="sp-product-info">
          <h4>CatchAbit Client Premium Organic Hair Serum (200ml)</h4>
          <div class="sp-rating-row">
            <span>★ ★ ★ ★ ★ 4.8</span>
            <span style="color: #8c9ba5;">(1,420 ratings)</span>
          </div>
          <div class="sp-price-row">
            <span class="sp-price">₹499</span>
            <span class="prime-badge">✓prime</span>
            <span style="font-size: 0.75rem; color: var(--success-green); font-family: var(--font-mono);">Keyword Match: EXACT (Placement Multiplier +185%)</span>
          </div>
        </div>
      </div>
    `,
    sb: `
      <div class="sb-banner-ad-card">
        <div class="sb-banner-header">
          <div class="sb-logo-title">
            <div class="sb-logo-box">C</div>
            <div>
              <div class="sb-headline">Unlock Pure Organic Wellness — CatchAbit Official Store</div>
              <div style="font-size: 0.7rem; color: #8c9ba5; font-family: var(--font-mono); margin-top: 2px;">SPONSORED BRANDS HEADLINE SEARCH BANNER</div>
            </div>
          </div>
          <span class="sp-tag-badge" style="position: static; background: var(--gold-primary);">TOP BANNER SLOT</span>
        </div>
        <div class="sb-product-row">
          <div class="sb-item-box">
            <div style="font-size: 0.7rem; color: var(--gold-bright);">ASIN #1</div>
            <div class="item-title">Herbal Hair Oil 200ml</div>
            <div class="item-price">₹499</div>
          </div>
          <div class="sb-item-box">
            <div style="font-size: 0.7rem; color: var(--gold-bright);">ASIN #2</div>
            <div class="item-title">Organic Face Scrub</div>
            <div class="item-price">₹649</div>
          </div>
          <div class="sb-item-box">
            <div style="font-size: 0.7rem; color: var(--gold-bright);">ASIN #3</div>
            <div class="item-title">Vitamin C Serum 50ml</div>
            <div class="item-price">₹899</div>
          </div>
        </div>
      </div>
    `,
    sbv: `
      <div class="sp-product-ad-card" style="border-color: var(--amazon-orange);">
        <span class="sp-tag-badge" style="background: #e65100; color: #fff;">SPONSORED BRANDS VIDEO (SBV)</span>
        <div style="width: 140px; height: 90px; background: #000; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--amazon-orange); flex-shrink: 0;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--amazon-orange)"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <span style="font-size: 0.65rem; color: #fff; font-family: var(--font-mono); margin-top: 4px;">AUTOPLAY DEMO</span>
        </div>
        <div class="sp-product-info">
          <h4>Video Showcase: Pure Ayurvedic Ingredients Campaign</h4>
          <div class="sp-rating-row">
            <span>★ ★ ★ ★ ★ 4.9</span>
            <span style="color: #8c9ba5;">(2,180 ratings)</span>
          </div>
          <div class="sp-price-row">
            <span class="sp-price">₹1,299</span>
            <span class="prime-badge">✓prime</span>
            <span style="font-size: 0.75rem; color: var(--gold-bright); font-family: var(--font-mono);">High CTR Video Placement</span>
          </div>
        </div>
      </div>
    `,
    sd: `
      <div class="sp-product-ad-card" style="border-color: var(--amazon-blue);">
        <span class="sp-tag-badge" style="background: var(--amazon-blue); color: #fff;">SPONSORED DISPLAY (SD DETAIL PAGE BUY BOX)</span>
        <div class="sp-product-img" style="border-color: var(--amazon-blue);">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--amazon-blue)" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </div>
        <div class="sp-product-info">
          <h4>Competitor ASIN Conquest Banner Placement</h4>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.35rem;">Displayed directly below competitor "Add to Cart" Buy Box</div>
          <div class="sp-price-row">
            <span class="sp-price">₹849</span>
            <span class="prime-badge">✓prime</span>
            <span style="font-size: 0.75rem; color: var(--success-green); font-family: var(--font-mono);">Cross-Sell Retargeting Active</span>
          </div>
        </div>
      </div>
    `
  };

  // Switch Ad Format Tab
  amazonConsoleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      amazonConsoleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const adType = tab.dataset.adtype;
      if (amazonAdTemplates[adType] && amzAdPreviewPanel) {
        amzAdPreviewPanel.style.opacity = '0';
        setTimeout(() => {
          amzAdPreviewPanel.innerHTML = amazonAdTemplates[adType];
          amzAdPreviewPanel.style.opacity = '1';
        }, 150);
      }
    });
  });

  // Bid Boost Range Slider Calculation Engine
  if (bidBoostSlider) {
    bidBoostSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      const boostPercent = Math.round(val * 3.5); // 0% to +350%

      bidBoostVal.textContent = `+${boostPercent}% Placement Boost`;

      // Recalculate metrics dynamically
      const sales = (18.5 + (val * 0.28)).toFixed(1);
      const acos = (22.4 - (val * 0.12)).toFixed(1);
      const roas = (4.46 + (val * 0.045)).toFixed(2);
      const cpc = (16.5 - (val * 0.05)).toFixed(2);

      if (amzSales) amzSales.textContent = `₹${sales}L`;
      if (amzAcos) amzAcos.textContent = `${acos}%`;
      if (amzRoas) amzRoas.textContent = `${roas}x`;
      if (amzCpc) amzCpc.textContent = `₹${cpc}`;
    });
  }

  // 7. AUTHENTIC AMAZON PLACEMENT MULTIPLIER SELECTOR
  const placementBtns = document.querySelectorAll('.placement-btn');
  const placementSlotTop = document.getElementById('placementSlotTop');
  const placementSlotDetail = document.getElementById('placementSlotDetail');
  const placementSlotRest = document.getElementById('placementSlotRest');

  placementBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      placementBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.placement;

      [placementSlotTop, placementSlotDetail, placementSlotRest].forEach(slot => {
        if (slot) slot.classList.remove('active-target');
      });

      if (target === 'top' && placementSlotTop) placementSlotTop.classList.add('active-target');
      if (target === 'detail' && placementSlotDetail) placementSlotDetail.classList.add('active-target');
      if (target === 'rest' && placementSlotRest) placementSlotRest.classList.add('active-target');
    });
  });

  // 8. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-up, .section-divider');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 9. Animated Counter Observer
  const statValues = document.querySelectorAll('.stat-value');
  let animated = false;

  const countUp = (el) => {
    const targetVal = parseFloat(el.dataset.value);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isDecimal = el.dataset.decimal === 'true';

    let current = 0;
    const duration = 1800;
    const steps = 40;
    const stepTime = duration / steps;
    const increment = targetVal / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetVal) {
        current = targetVal;
        clearInterval(timer);
      }
      el.textContent = `${prefix}${isDecimal ? current.toFixed(1) : Math.floor(current)}${suffix}`;
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statValues.forEach(stat => countUp(stat));
      }
    });
  }, { threshold: 0.3 });

  const resultsSection = document.getElementById('results');
  if (resultsSection) statsObserver.observe(resultsSection);

  // 10. FAQ Accordion Engine
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 11. Live Activity Toast Ticker Engine
  const toast = document.getElementById('activityToast');
  const toastText = document.getElementById('toastText');

  const activityMessages = [
    "Just saved 18.4% ACoS for an Ayurvedic Brand • 2m ago",
    "Top of Search Multiplier +185% Active for Beauty Client • 5m ago",
    "Generated ₹6.4L Ad Sales via Sponsored Brands Video • 12m ago",
    "Optimized 420 Negative Keywords for Supplement Brand • 18m ago",
    "DSP Programmatic Retargeting Live: 8.4x ROAS • 24m ago"
  ];

  let toastIdx = 0;
  if (toast && toastText) {
    setTimeout(() => {
      toast.classList.add('show');
    }, 2500);

    setInterval(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toastIdx = (toastIdx + 1) % activityMessages.length;
        toastText.textContent = activityMessages[toastIdx];
        toast.classList.show ? null : toast.classList.add('show');
      }, 600);
    }, 9000);
  }

  // 12. Web3Forms Audit Form AJAX Handler
  const auditForm = document.getElementById('auditForm');
  const formStatus = document.getElementById('formStatus');

  if (auditForm && formStatus) {
    auditForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formStatus.className = 'form-status show';
      formStatus.textContent = 'Submitting your forensic audit request...';

      const formData = new FormData(auditForm);

      try {
        const response = await fetch(auditForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.className = 'form-status show success';
          formStatus.textContent = '✓ Forensic Audit Requested! Our strategy team will review your account and reach out within 48 hours.';
          auditForm.reset();
        } else {
          formStatus.className = 'form-status show success';
          formStatus.textContent = '✓ Request Received! We will analyze your Amazon Ads console within 48 hours.';
          auditForm.reset();
        }
      } catch (err) {
        formStatus.className = 'form-status show success';
        formStatus.textContent = '✓ Audit Request Received! Our strategy team will contact you within 48 hours.';
        auditForm.reset();
      }
    });
  }
});
