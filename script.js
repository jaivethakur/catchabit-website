/**
 * CATCHABIT SOLUTIONS — ULTRA-PROFESSIONAL JS ENGINE & FORM LEAD DELIVERY
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Particle Canvas Background
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
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = Math.random() * 0.3 - 0.15;
      this.speedY = Math.random() * 0.3 - 0.15;
      this.opacity = Math.random() * 0.4 + 0.1;
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

  const particles = Array.from({ length: 35 }, () => new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. AMAZON ADS CONSOLE TAB SWITCHER
  const consoleTabBtns = document.querySelectorAll('.console-tab-btn');
  const amzAdPreviewPanel = document.getElementById('amzAdPreviewPanel');
  const bidBoostSlider = document.getElementById('bidBoostSlider');
  const bidBoostVal = document.getElementById('bidBoostVal');

  const amzSales = document.getElementById('amzSales');
  const amzAcos = document.getElementById('amzAcos');
  const amzRoas = document.getElementById('amzRoas');
  const amzCpc = document.getElementById('amzCpc');

  const adTemplates = {
    sp: `
      <div class="ad-card-mock">
        <div class="ad-mock-img">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        </div>
        <div class="ad-mock-details">
          <div style="font-size: 0.65rem; color: #ff9900; font-family: var(--font-mono); font-weight: 700;">SPONSORED PRODUCT (TOP OF SEARCH #1)</div>
          <h4>CatchAbit Client Organic Hair Growth Serum (200ml)</h4>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.25rem;">
            <span style="font-size: 1.1rem; font-weight: 800; color: #fff;">₹499</span>
            <span class="prime-tag">✓prime</span>
            <span style="font-size: 0.72rem; color: var(--accent-green); font-family: var(--font-mono);">Exact Match (+185% Boost)</span>
          </div>
        </div>
      </div>
    `,
    sb: `
      <div class="ad-card-mock" style="border-color: var(--gold-primary);">
        <div class="ad-mock-details" style="width: 100%;">
          <div style="font-size: 0.65rem; color: var(--gold-bright); font-family: var(--font-mono); font-weight: 700;">SPONSORED BRANDS HEADLINE SEARCH BANNER (amazon.in)</div>
          <h4>Pure Organic Hair & Skin Care — Official CatchAbit Client Store</h4>
          <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
            <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.3rem 0.6rem; border-radius: 4px; color: var(--gold-bright);">Hair Serum ₹499</span>
            <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.3rem 0.6rem; border-radius: 4px; color: var(--gold-bright);">Face Scrub ₹649</span>
            <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); padding: 0.3rem 0.6rem; border-radius: 4px; color: var(--gold-bright);">Vitamin C ₹899</span>
          </div>
        </div>
      </div>
    `,
    sbv: `
      <div class="ad-card-mock" style="border-color: #e65100;">
        <div style="width: 80px; height: 50px; background: #000; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #ff9900; flex-shrink: 0;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>
        <div class="ad-mock-details">
          <div style="font-size: 0.65rem; color: #e65100; font-family: var(--font-mono); font-weight: 700;">SPONSORED BRANDS VIDEO (SBV)</div>
          <h4>Autoplay Video Showcase: Organic Ingredients & Results</h4>
          <div style="font-size: 0.75rem; color: var(--gold-bright); margin-top: 0.2rem;">High Click-Through Video Ad Placement</div>
        </div>
      </div>
    `,
    sd: `
      <div class="ad-card-mock" style="border-color: var(--accent-blue);">
        <div class="ad-mock-img" style="color: var(--accent-blue);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </div>
        <div class="ad-mock-details">
          <div style="font-size: 0.65rem; color: var(--accent-blue); font-family: var(--font-mono); font-weight: 700;">SPONSORED DISPLAY (SD DETAIL PAGE BUY BOX)</div>
          <h4>Competitor Detail Page Buy Box Conquest Placement</h4>
          <div style="font-size: 0.75rem; color: var(--accent-green); margin-top: 0.2rem;">ASIN Retargeting Active</div>
        </div>
      </div>
    `
  };

  consoleTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      consoleTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const adType = btn.dataset.adtype;
      if (adTemplates[adType] && amzAdPreviewPanel) {
        amzAdPreviewPanel.innerHTML = adTemplates[adType];
      }
    });
  });

  // Slider Calculation
  if (bidBoostSlider) {
    bidBoostSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      const boostPercent = Math.round(val * 3.5);

      if (bidBoostVal) bidBoostVal.textContent = `+${boostPercent}% Boost`;

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

  // 4. PLACEMENT NAV BUTTON ENGINE
  const placementBtns = document.querySelectorAll('.placement-nav-btn');
  const amzRowTop = document.getElementById('amzRowTop');
  const amzRowDetail = document.getElementById('amzRowDetail');

  placementBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      placementBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.placement;

      if (amzRowTop) amzRowTop.classList.remove('target-highlight');
      if (amzRowDetail) amzRowDetail.classList.remove('target-highlight');

      if (target === 'top' && amzRowTop) {
        amzRowTop.classList.add('target-highlight');
      } else if (target === 'detail' && amzRowDetail) {
        amzRowDetail.classList.add('target-highlight');
      }
    });
  });

  // 5. FAQ ACCORDION ENGINE
  const faqBoxes = document.querySelectorAll('.faq-box');
  faqBoxes.forEach(box => {
    const btn = box.querySelector('.faq-toggle-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const active = box.classList.contains('active');
        faqBoxes.forEach(b => b.classList.remove('active'));
        if (!active) box.classList.add('active');
      });
    }
  });

  // 6. FORM SUBMISSION AJAX HANDLER (DIRECT TO SUPPORT@CATCHABIT.IN)
  const auditForm = document.getElementById('auditForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (auditForm && formStatus) {
    auditForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      formStatus.style.display = 'block';
      formStatus.style.color = 'var(--gold-bright)';
      formStatus.textContent = '⏳ Submitting lead to support@catchabit.in...';
      if (submitBtn) submitBtn.disabled = true;

      const formData = new FormData(auditForm);

      try {
        const response = await fetch('https://formsubmit.co/ajax/support@catchabit.in', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.style.color = 'var(--accent-green)';
          formStatus.textContent = '✓ Forensic Audit Requested! Lead details sent directly to support@catchabit.in. Our strategy team will reach out within 48 hours.';
          auditForm.reset();
        } else {
          // Fallback direct submission
          auditForm.submit();
        }
      } catch (err) {
        // Fallback standard submission
        auditForm.submit();
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});
