import { createIcons, Shield, ShieldCheck, Box, Cpu, Lock, Globe, Server, Activity, Terminal, Zap, ArrowUpRight, CheckCircle2, AlertTriangle, Play, Sliders, BarChart3, Cloud, Layers, Database, Eye, ChevronDown, Brain, ShieldAlert, UserCheck, RefreshCw, Network, Sparkles, FileCode, ArrowRight } from 'lucide';
import confetti from 'canvas-confetti';

// Initialize Lucide Icons
createIcons({
  icons: {
    Shield, ShieldCheck, Box, Cpu, Lock, Globe, Server, Activity, Terminal, Zap, ArrowUpRight, CheckCircle2, AlertTriangle, Play, Sliders, BarChart3, Cloud, Layers, Database, Eye, ChevronDown, Brain, ShieldAlert, UserCheck, RefreshCw, Network, Sparkles, FileCode, ArrowRight
  }
});

// 1. Background Standard Enterprise Particle Node Network Canvas
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Track page scroll physics for dynamic background animation
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollVelocity = (currentScrollY - lastScrollY) * 0.25;
    lastScrollY = currentScrollY;
  }, { passive: true });

  // Press-and-hold sequence engine: holding connects lines one by one, releasing retracts them one by one back to nodes
  let clickNexus = { x: width / 2, y: height / 2, state: 'idle', pressTime: 0, releaseTime: 0 };

  window.addEventListener('mousedown', (e) => {
    const isInteractive = ['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.closest('a') || e.target.closest('button');
    if (isInteractive) return;

    clickNexus.x = e.clientX;
    clickNexus.y = e.clientY;
    clickNexus.state = 'holding';
    clickNexus.pressTime = performance.now();
  });

  window.addEventListener('mousemove', (e) => {
    if (clickNexus.state === 'holding') {
      clickNexus.x = e.clientX;
      clickNexus.y = e.clientY;
    }
  });

  window.addEventListener('mouseup', () => {
    if (clickNexus.state === 'holding') {
      const holdDuration = performance.now() - clickNexus.pressTime;
      if (holdDuration < 300) {
        clickNexus.state = 'idle';
      } else {
        clickNexus.state = 'retracting';
        clickNexus.releaseTime = performance.now();
      }
    }
  });

  const particles = [];
  const particleCount = Math.floor(width / 14);
  // Standard authoritative corporate cybersecurity tones (Royal Blue, Vibrant Cyan, Dark Slate)
  const colors = ['#1d4ed8', '#0284c7', '#2563eb', '#475569'];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.45,
      connectedProgress: 0
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Smoothly decay scroll velocity
    scrollVelocity *= 0.92;

    const now = performance.now();
    if (clickNexus.state === 'retracting' && (now - clickNexus.releaseTime > 1400)) {
      clickNexus.state = 'idle';
      for (let i = 0; i < particles.length; i++) particles[i].connectedProgress = 0;
    }

    // Dynamically expand connection radius and intensity during scrolling
    const dynamicConnDist = 155 + Math.min(Math.abs(scrollVelocity) * 10, 45);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.speedX;
      // 3D Parallax drift based on particle size (larger = foreground)
      p.y += p.speedY - scrollVelocity * (p.size * 0.55);

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      // Press & Retract sequence engine: holding connects one by one, releasing retracts ONLY those connected back to node
      if (clickNexus.state !== 'idle') {
        const distToHub = Math.hypot(p.x - clickNexus.x, p.y - clickNexus.y);
        if (distToHub < 1400 && distToHub > 10) {
          const baseAlpha = Math.max(0.12, (1 - distToHub / 1400) * 0.75);

          if (clickNexus.state === 'holding') {
            const pressElapsed = now - clickNexus.pressTime;
            if (pressElapsed >= 300) {
              const activeHoldTime = pressElapsed - 300;
              const delay = Math.min(2000, distToHub * 1.5);
              const connectElapsed = activeHoldTime - delay;

              if (connectElapsed > 0) {
                const connectProgress = Math.min(1, connectElapsed / 350);
                const easeProgress = 1 - Math.pow(1 - connectProgress, 3);
                p.connectedProgress = easeProgress;

                const currentTipX = p.x + (clickNexus.x - p.x) * easeProgress;
                const currentTipY = p.y + (clickNexus.y - p.y) * easeProgress;

                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(currentTipX, currentTipY);
                ctx.strokeStyle = p.color;
                ctx.globalAlpha = baseAlpha * 0.45;
                ctx.lineWidth = 1.3;
                ctx.stroke();
              } else {
                p.connectedProgress = 0;
              }
            } else {
              p.connectedProgress = 0;
            }
          } else if (clickNexus.state === 'retracting') {
            if (p.connectedProgress > 0) {
              const releaseElapsed = now - clickNexus.releaseTime;
              const retractDelay = Math.min(1000, distToHub * 1.1);
              const retractElapsed = releaseElapsed - retractDelay;

              if (retractElapsed > 0) {
                const retractRatio = Math.min(1, retractElapsed / 350);
                const retractEase = 1 - Math.pow(1 - retractRatio, 3);
                const currentEase = p.connectedProgress * (1 - retractEase);

                if (currentEase > 0.01) {
                  const currentTipX = p.x + (clickNexus.x - p.x) * currentEase;
                  const currentTipY = p.y + (clickNexus.y - p.y) * currentEase;

                  ctx.beginPath();
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(currentTipX, currentTipY);
                  ctx.strokeStyle = p.color;
                  ctx.globalAlpha = baseAlpha * 0.45 * (currentEase / p.connectedProgress);
                  ctx.lineWidth = 1.3;
                  ctx.stroke();
                } else {
                  p.connectedProgress = 0;
                }
              } else {
                // Before its staggered delay hits, keep it drawn at its connected state
                const currentTipX = p.x + (clickNexus.x - p.x) * p.connectedProgress;
                const currentTipY = p.y + (clickNexus.y - p.y) * p.connectedProgress;

                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(currentTipX, currentTipY);
                ctx.strokeStyle = p.color;
                ctx.globalAlpha = baseAlpha * 0.45;
                ctx.lineWidth = 1.3;
                ctx.stroke();
              }
            }
          }
        }
      } else {
        p.connectedProgress = 0;
      }

      // Connect near particles with high-contrast lines that react to scroll speed
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < dynamicConnDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - dist / dynamicConnDist) * 0.48;
          ctx.lineWidth = 1.35;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

// 2. Interactive Card Showcase (Normal Flow + Mouseover Wheel Scrolling)
function initStackEngine() {
  const showcaseFrame = document.querySelector('.stack-showcase-frame');
  const tabBtns = document.querySelectorAll('.stack-tab-btn');
  const cards = document.querySelectorAll('.stack-card');
  if (!showcaseFrame || !tabBtns.length || !cards.length) return;

  let currentIndex = 0;
  let isWheelLocked = false;

  const setActiveSlide = (index) => {
    currentIndex = index;
    tabBtns.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
    cards.forEach((card, i) => {
      card.classList.remove('active', 'slide-left', 'slide-right', 'stacked-prev');
      if (i === index) {
        card.classList.add('active');
        card.style.zIndex = '10';
      } else if (i < index) {
        card.classList.add('slide-left');
        card.style.zIndex = '1';
      } else {
        card.classList.add('slide-right');
        card.style.zIndex = '1';
      }
    });
  };

  setActiveSlide(0);

  // Tab click directly switches active card
  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      setActiveSlide(index);
    });
  });

  // Scroll through cards ONLY when mouse cursor is hovering over the cards / showcase
  showcaseFrame.addEventListener('wheel', (e) => {
    if (isWheelLocked) {
      e.preventDefault();
      return;
    }

    if (e.deltaY > 20 && currentIndex < cards.length - 1) {
      e.preventDefault();
      isWheelLocked = true;
      setActiveSlide(currentIndex + 1);
      setTimeout(() => { isWheelLocked = false; }, 550);
    } else if (e.deltaY < -20 && currentIndex > 0) {
      e.preventDefault();
      isWheelLocked = true;
      setActiveSlide(currentIndex - 1);
      setTimeout(() => { isWheelLocked = false; }, 550);
    }
  }, { passive: false });
}

// 3. Interactive Tabs
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      const container = btn.closest('.tabs-section');
      if (!container) return;

      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      container.querySelector(`#tab-${target}`)?.classList.add('active');
    });
  });
}

// 4. Interactive ROI Calculator
function initROICalculator() {
  const reqSlider = document.getElementById('slider-requests');
  const costSlider = document.getElementById('slider-cost');
  const savingsDisplay = document.getElementById('display-savings');
  const reqValueDisplay = document.getElementById('val-requests');
  const costValueDisplay = document.getElementById('val-cost');

  if (!reqSlider || !costSlider || !savingsDisplay) return;

  function calculate() {
    const reqs = parseInt(reqSlider.value);
    const cost = parseInt(costSlider.value);

    reqValueDisplay.textContent = `${reqs}M / month`;
    costValueDisplay.textContent = `$${cost.toLocaleString()} / mo`;

    const estimatedSavings = Math.round((cost * 0.62) + (reqs * 115));
    savingsDisplay.textContent = `$${estimatedSavings.toLocaleString()}`;
  }

  reqSlider.addEventListener('input', calculate);
  costSlider.addEventListener('input', calculate);
  calculate();
}

// 5. Live Threat Ticker Generator
function initThreatTicker() {
  const ticker = document.getElementById('live-ticker');
  if (!ticker) return;

  const locations = ["London, UK", "Tokyo, JP", "New York, US", "Frankfurt, DE", "Singapore, SG", "Sydney, AU", "Mumbai, IN", "Paris, FR"];
  const attacks = ["SQL Injection", "API BOLA Exploit", "Layer-7 Slowloris", "Scraper Botnet", "Zero-Day CVE-2026-8812", "DDoS Syn Flood"];
  const colors = ["ticker-badge", "ticker-badge success"];

  setInterval(() => {
    const loc = locations[Math.floor(Math.random() * locations.length)];
    const att = attacks[Math.floor(Math.random() * attacks.length)];
    const col = colors[Math.floor(Math.random() * colors.length)];
    const ip = `${Math.floor(Math.random() * 200) + 20}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

    const item = document.createElement('span');
    item.className = 'ticker-item';
    item.innerHTML = `<span class="${col}">BLOCKED</span> ${att} from ${ip} (${loc}) in 0.${Math.floor(Math.random()*4+1)}ms`;

    ticker.appendChild(item);
    if (ticker.children.length > 20) {
      ticker.removeChild(ticker.children[0]);
    }
  }, 3500);
}

// 6. Modal & Confetti
function initModal() {
  const modal = document.getElementById('demo-modal');
  const openBtns = document.querySelectorAll('.open-demo-modal');
  const closeBtn = document.querySelector('.close-modal');
  const form = document.getElementById('demo-form');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    modal.classList.remove('active');
    confetti({
      particleCount: 110,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#0ea5e9', '#3b82f6', '#10b981']
    });
    alert("🚀 Enterprise Evaluation Confirmed! A Zelophaze Security Architect will reach out shortly.");
  });
}

// 7. Scroll Reveal Animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('.section-title, .feature-card, .sim-container, .roi-card, .case-card, .cta-box');
  
  elements.forEach((el) => {
    el.classList.add('reveal-on-scroll');
    if (el.classList.contains('feature-card') || el.classList.contains('case-card')) {
      const parentGrid = el.parentElement;
      if (parentGrid) {
        const indexInParent = Array.from(parentGrid.children).indexOf(el);
        el.style.transitionDelay = `${indexInParent * 120}ms`;
      }
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// Dynamic Changing Words below Hero H1 - Optimized 60 FPS
function initChangingWords() {
  const target = document.getElementById('changing-word');
  if (!target) return;
  const words = [
    'Zero-Day API Defense',
    'Autonomous Bot Mitigation',
    'Multi-Cloud WAAP Infrastructure',
    'Layer-7 DDoS Scrubbing',
    'Sub-Millisecond Inspection'
  ];
  let idx = 0;

  setInterval(() => {
    target.style.opacity = '0';
    setTimeout(() => {
      idx = (idx + 1) % words.length;
      target.textContent = words[idx];
      target.style.opacity = '1';
    }, 300);
  }, 4000);
}

// Initialize everything on load
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initChangingWords();
  initStackEngine();
  initTabs();
  initROICalculator();
  initThreatTicker();
  initModal();
  initScrollAnimations();
});
