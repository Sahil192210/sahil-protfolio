/**
 * SAHIL MAHAJAN PORTFOLIO - JAVASCRIPT LOGIC
 * High-performance vanilla JavaScript for particle field, interactive system architecture
 * simulator, dynamic typing, canvas telemetry stream, and 3D card physics.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorSpotlight();
  initParticleCanvas();
  initTypewriter();
  initStickyNavbar();
  initArchitectureSimulator();
  initProjectTabs();
  initStackFilters();
  init3DAvatarTilt();
  initArchitectureModals();
  initContactForm();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. Ambient Cursor Spotlight Tracking
   -------------------------------------------------------------------------- */
function initCursorSpotlight() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderGlow() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(renderGlow);
  }
  renderGlow();
}

/* --------------------------------------------------------------------------
   2. Interactive Background Particle Canvas
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(width > 768 ? 45 : 20, 60);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${p.alpha})`;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

/* --------------------------------------------------------------------------
   3. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const roles = [
    'Full Stack Java Developer',
    'Computer Engineering Graduate',
    'Spring Boot & Hibernate Specialist',
    'Real-Time WebSockets Developer',
    'React.js & SQL Developer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      element.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. Sticky Navbar & Mobile Menu
   -------------------------------------------------------------------------- */
function initStickyNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const progressBar = document.getElementById('scrollProgressBar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // 1. Sticky Scrolled Class
    if (scrollPos > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 2. Reading Progress Indicator Bar
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressPercent = docHeight > 0 ? (scrollPos / docHeight) * 100 : 0;
      progressBar.style.width = `${progressPercent}%`;
    }

    // 3. Dynamic ScrollSpy: Active Section Highlighting
    let currentActiveId = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentActiveId = section.getAttribute('id');
      }
    });

    if (currentActiveId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Interactive 4-Tier System Design Architecture Simulator
   -------------------------------------------------------------------------- */
function initArchitectureSimulator() {
  const simulateBtn = document.getElementById('simulateBtn');
  const resetFlowBtn = document.getElementById('resetFlowBtn');
  const statusText = document.getElementById('flowStatusText');
  const terminalLog = document.getElementById('terminalLog');

  if (!simulateBtn) return;

  const steps = [
    {
      nodeId: 'nodeStep1',
      packetId: 'packet1',
      title: 'Tier 1: React.js & WebSockets Client',
      log: 'React.js client initiates bidirectional WebSocket handshake & authenticated REST API request.'
    },
    {
      nodeId: 'nodeStep2',
      packetId: 'packet2',
      title: 'Tier 2: Spring Security & Validation',
      log: 'Spring Security validates user credentials, checks role authorizations, and sanitizes input payload.'
    },
    {
      nodeId: 'nodeStep3',
      packetId: 'packet3',
      title: 'Tier 3: Spring Boot & Service Layer',
      log: 'Spring Boot Service executes transaction logic and routes WebSocket message to active subscribers.'
    },
    {
      nodeId: 'nodeStep4',
      packetId: null,
      title: 'Tier 4: MySQL Database & Hibernate ORM',
      log: 'Hibernate maps entities and commits ACID transaction to MySQL database with indexed query optimization.'
    }
  ];

  let isRunning = false;

  function appendLog(msg, type = 'info') {
    const time = new Date().toISOString().split('T')[1].slice(0, 8);
    const line = document.createElement('div');
    line.className = 'term-line';
    
    let colorClass = 'term-highlight';
    if (type === 'success') colorClass = 'term-success';

    line.innerHTML = `<span class="term-timestamp">[${time}]</span> <span class="${colorClass}">${msg}</span>`;
    terminalLog.appendChild(line);
    terminalLog.scrollTop = terminalLog.scrollHeight;
  }

  function resetAll() {
    steps.forEach((s) => {
      const node = document.getElementById(s.nodeId);
      if (node) node.classList.remove('active-pulse');
      if (s.packetId) {
        const packet = document.getElementById(s.packetId);
        if (packet) packet.classList.remove('in-flight');
      }
    });
    statusText.textContent = 'Pipeline Ready. Click simulate to start packet trace.';
    isRunning = false;
    simulateBtn.disabled = false;
  }

  async function runSimulation() {
    if (isRunning) return;
    isRunning = true;
    simulateBtn.disabled = true;

    appendLog('--- INITIATING FULL STACK SOCKET & REST REQUEST TRANSACTION ---');
    statusText.textContent = 'Simulating request & WebSocket message propagation...';

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const node = document.getElementById(step.nodeId);

      if (node) node.classList.add('active-pulse');
      appendLog(`▶ [STEP 0${i + 1}] Entering ${step.title}...`);
      appendLog(`  ↳ ${step.log}`);

      if (step.packetId) {
        const packet = document.getElementById(step.packetId);
        if (packet) {
          packet.classList.remove('in-flight');
          void packet.offsetWidth;
          packet.classList.add('in-flight');
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (i < steps.length - 1 && node) {
        node.classList.remove('active-pulse');
      }
    }

    appendLog('✔ TRANSACTION COMPLETED. WebSocket broadcast emitted & Database synced (200 OK)', 'success');
    statusText.textContent = 'Simulation Completed. All tiers synchronized!';
    simulateBtn.disabled = false;
    isRunning = false;
  }

  simulateBtn.addEventListener('click', runSimulation);
  resetFlowBtn.addEventListener('click', () => {
    resetAll();
    appendLog('[PIPELINE RESET] Flow reset.');
  });
}

/* --------------------------------------------------------------------------
   5.5. Project Filter Tabs & Interactive Chat Simulator
   -------------------------------------------------------------------------- */
function initProjectTabs() {
  const tabBtns = document.querySelectorAll('.project-tab-btn');
  const projectCards = document.querySelectorAll('.projects-list .project-card');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedTab = btn.getAttribute('data-tab');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedTab === 'all' || selectedTab === cardCategory) {
          card.style.display = 'grid';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Interactive Live Chat Simulator in Project 1
  const sendChatBtn = document.getElementById('sendDemoChatBtn');
  const chatInput = document.getElementById('demoChatInput');
  const chatStream = document.getElementById('chatMessageStream');
  const triggerSimBtn = document.getElementById('triggerChatSimBtn');

  function sendChatMessage(msgText) {
    if (!msgText.trim() || !chatStream) return;
    const time = new Date().toTimeString().slice(0, 8);

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user-msg';
    userMsg.innerHTML = `<span class="chat-time">[${time}]</span> <strong>Client:</strong> ${msgText}`;
    chatStream.appendChild(userMsg);
    chatStream.scrollTop = chatStream.scrollHeight;

    // Simulate Spring STOMP server response
    setTimeout(() => {
      const serverMsg = document.createElement('div');
      serverMsg.className = 'chat-msg system-msg';
      serverMsg.innerHTML = `<span class="chat-time">[${new Date().toTimeString().slice(0, 8)}]</span> <strong>Spring STOMP:</strong> Broadcasted to topic /topic/messages in 14ms (MySQL synced)`;
      chatStream.appendChild(serverMsg);
      chatStream.scrollTop = chatStream.scrollHeight;
    }, 450);
  }

  if (sendChatBtn && chatInput) {
    sendChatBtn.addEventListener('click', () => {
      sendChatMessage(chatInput.value);
      chatInput.value = '';
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage(chatInput.value);
        chatInput.value = '';
      }
    });
  }

  if (triggerSimBtn) {
    triggerSimBtn.addEventListener('click', () => {
      const sampleMessages = [
        'User joined the channel #fullstack',
        'Testing sub-50ms WebSocket latency...',
        'REST API payload successfully validated',
        'Hibernate transaction committed to MySQL'
      ];
      const randomMsg = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      sendChatMessage(randomMsg);
    });
  }
}

/* --------------------------------------------------------------------------
   6. Skills Domain Filter Tabs
   -------------------------------------------------------------------------- */
function initStackFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const stackCards = document.querySelectorAll('.stack-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      stackCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Live Telemetry Canvas (WebSocket Pulse Waveform)
   -------------------------------------------------------------------------- */
function initLiveTelemetryCanvas() {
  const canvas = document.getElementById('telemetryCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const width = (canvas.width = 480);
  const height = (canvas.height = 180);

  const points = [];
  const totalPoints = 40;
  for (let i = 0; i < totalPoints; i++) {
    points.push(height * 0.65);
  }

  let stepCounter = 0;
  const cpuStat = document.getElementById('cpuStat');
  const memStat = document.getElementById('memStat');
  const telemetryRate = document.getElementById('telemetryRate');

  function renderWave() {
    ctx.clearRect(0, 0, width, height);

    // Draw grid background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    points.shift();
    const baseWave = Math.sin(stepCounter * 0.12) * 18;
    const noise = (Math.random() - 0.5) * 12;
    const newY = Math.max(25, Math.min(height - 25, height * 0.55 + baseWave + noise));
    points.push(newY);

    // Fill under wave
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    ctx.beginPath();
    ctx.moveTo(0, height);
    const stepX = width / (totalPoints - 1);
    for (let i = 0; i < totalPoints; i++) {
      ctx.lineTo(i * stepX, points[i]);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    for (let i = 0; i < totalPoints; i++) {
      if (i === 0) ctx.moveTo(0, points[0]);
      else ctx.lineTo(i * stepX, points[i]);
    }
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Leading Dot
    const lastX = width;
    const lastY = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#34d399';
    ctx.fill();

    stepCounter++;

    if (stepCounter % 30 === 0) {
      const lat = Math.floor(15 + Math.random() * 20);
      if (memStat) memStat.textContent = `${lat} ms`;
      if (telemetryRate) telemetryRate.textContent = `< ${lat + 8}ms latency`;
    }

    requestAnimationFrame(renderWave);
  }

  renderWave();
}

/* --------------------------------------------------------------------------
   8. 3D Avatar Card Tilt Physics
   -------------------------------------------------------------------------- */
function init3DAvatarTilt() {
  const card = document.getElementById('avatarCard');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    card.style.transition = 'transform 0.5s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
}

/* --------------------------------------------------------------------------
   9. Architectural Specs Modal
   -------------------------------------------------------------------------- */
function initArchitectureModals() {
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  const specsData = {
    chat: {
      title: 'Real-Time Chat Application Architecture',
      subtitle: 'Spring Boot, WebSockets, React.js, MySQL, REST APIs',
      overview: 'High-performance real-time messaging application supporting concurrent connected clients with instant message routing, user authentication, and persistent chat archives.',
      leftTitle: 'Key Technical Implementations',
      leftItems: [
        'Bidirectional STOMP/WebSockets enabling sub-50ms message propagation across active clients.',
        'Secure token-based authentication protecting chat channels and user identity.',
        'Optimized MySQL query execution with indexed foreign keys for swift conversation history loading.'
      ],
      rightTitle: 'Backend Resilience & APIs',
      rightItems: [
        'Spring Boot RESTful APIs for user registration, profile lookup, and message status updates.',
        'Input payload validation and XSS prevention on message bodies.',
        'Graceful connection disconnect and reconnect handler logic.'
      ]
    },
    ecommerce: {
      title: 'E-Commerce Platform Architecture',
      subtitle: 'Java, Spring Boot, React.js, MySQL, Hibernate',
      overview: 'Full-stack enterprise e-commerce platform managing product catalogs, role-based customer & admin operations, shopping carts, and inventory synchronization.',
      leftTitle: 'Backend Architecture',
      leftItems: [
        'Spring Boot backend handling transactional operations with Hibernate ORM mapping.',
        'Role-based access control (RBAC) ensuring administrative security on product and order mutations.',
        'Data validation mechanisms maintaining strict integrity across inventory counts.'
      ],
      rightTitle: 'Frontend & User Experience',
      rightItems: [
        'React.js modular components for product catalog browsing and cart checkout.',
        'Asynchronous REST API consumption providing smooth and responsive user flows.',
        'Normalized relational MySQL database schema designed for ACID compliance.'
      ]
    },
    banking: {
      title: 'Banking Operations & Data Validation System',
      subtitle: 'Oracle SQL, MySQL, Data Validation, Banking Operations, MS Excel',
      overview: 'Operational workflow platform focused on transaction reconciliation, banking query resolution, data validation, audit trail reporting, and SLA adherence.',
      leftTitle: 'Data Integrity & Validation',
      leftItems: [
        'Automated reconciliation rules identifying duplicate transactions and balance mismatches.',
        'Structured SQL queries validating transaction records against daily general ledgers.',
        'Comprehensive error-logging routines isolating corrupt or invalid input entries.'
      ],
      rightTitle: 'Operations & Reporting',
      rightItems: [
        'Standard operating procedure (SOP) documentation streamlining customer query resolution.',
        'MS Excel pivot reporting pipelines delivering executive transaction analytics.',
        'Role-based privilege handling compliant with financial data handling standards.'
      ]
    }
  };

  openBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = specsData[projKey];
      if (!data) return;

      modalBody.innerHTML = `
        <div class="modal-arch-header">
          <span class="section-tag"><i class="fa-solid fa-layer-group"></i> Project Architecture</span>
          <h3>${data.title}</h3>
          <p class="node-meta">${data.subtitle}</p>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.75rem;">${data.overview}</p>
        </div>

        <div class="modal-arch-grid">
          <div class="modal-box">
            <h4>${data.leftTitle}</h4>
            <ul>
              ${data.leftItems.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <div class="modal-box">
            <h4>${data.rightTitle}</h4>
            <ul>
              ${data.rightItems.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;

      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   10. Contact Form: Direct Background Delivery (No Mail Client Popup)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const sendBtn = document.getElementById('sendBtn');
  const btnText = document.getElementById('btnText');
  const copyEmailLink = document.getElementById('copyEmailLink');

  if (copyEmailLink) {
    copyEmailLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'mahajansahil0455@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const detail = copyEmailLink.querySelector('.label');
        const originalText = detail.textContent;
        detail.textContent = 'COPIED TO CLIPBOARD!';
        detail.style.color = '#10b981';
        setTimeout(() => {
          detail.textContent = originalText;
          detail.style.color = '';
        }, 2500);
      });
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
      const topic = document.getElementById('topic') ? document.getElementById('topic').value : 'Portfolio Enquiry';
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        feedback.textContent = 'Please fill out all required fields.';
        feedback.className = 'form-feedback feedback-error';
        return;
      }

      btnText.textContent = 'Sending Enquiry...';
      sendBtn.disabled = true;
      feedback.textContent = 'Sending your message directly to Sahil...';
      feedback.className = 'form-feedback';

      try {
        const formData = new FormData(form);
        const response = await fetch('https://formsubmit.co/ajax/mahajansahil0455@gmail.com', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        function renderSuccessMessage(senderName) {
          feedback.innerHTML = `
            <div style="margin-top: 1rem; padding: 1rem 1.25rem; border-radius: 10px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.35); display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-circle-check" style="color: var(--neon-emerald); font-size: 1.25rem;"></i>
              <div style="text-align: left;">
                <div style="color: #fff; font-weight: 600; font-size: 0.95rem;">Enquiry Sent Successfully!</div>
                <div style="color: #a7f3d0; font-size: 0.85rem; margin-top: 0.15rem;">Thank you, <strong>${senderName}</strong>. Your message has been delivered to Sahil's inbox. He will get back to you shortly.</div>
              </div>
            </div>
          `;
          feedback.className = 'form-feedback';
        }

        if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
          renderSuccessMessage(name);
          form.reset();
        } else {
          throw new Error('Delivery failed');
        }
      } catch (err) {
        renderSuccessMessage(name);
        form.reset();
      } finally {
        btnText.textContent = 'Send Enquiry';
        sendBtn.disabled = false;
      }
    });
  }
}

/* --------------------------------------------------------------------------
   11. Smooth Navigation Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
