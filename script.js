/* ==========================================================================
   BIRMINGHAM SWIFTS RUNNING CLUB - INTERACTIVE CMS & SCRIPT ENGINE
   ========================================================================== */

// Global Configuration for Committee Google Sheets CMS
window.SWIFTS_CONFIG = {
  // To connect your Google Sheet:
  // 1. Create a Google Sheet with the recommended tabs
  // 2. Click File -> Share -> Anyone with the link can view
  // 3. Paste the Sheet ID here (the long ID between /d/ and /edit in the URL)
  googleSheetId: '', 
  enableLiveSync: true,
  autoRefreshMinutes: 5,
};

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScheduleFilter();
  initPaceMatcher();
  initFaqAccordion();
  initTasterModal();
  initSmoothScroll();
  initMobileMenu();
  initLiveAlertBanner();
  
  // Initialize Google Sheets CMS Sync
  if (window.SWIFTS_CONFIG.enableLiveSync && window.SWIFTS_CONFIG.googleSheetId) {
    initGoogleSheetsCMS(window.SWIFTS_CONFIG.googleSheetId);
  }
});

/* --------------------------------------------------------------------------
   1. Live Announcement Banner (Supports Committee Customization)
   -------------------------------------------------------------------------- */
function initLiveAlertBanner() {
  const alertBar = document.getElementById('live-announcement-bar');
  const alertCloseBtn = document.getElementById('live-alert-close-btn');

  if (alertCloseBtn && alertBar) {
    alertCloseBtn.addEventListener('click', () => {
      alertBar.style.display = 'none';
      document.body.classList.remove('has-alert');
      sessionStorage.setItem('swifts-alert-dismissed', 'true');
    });
  }
}

function displayLiveAlert(message) {
  const alertBar = document.getElementById('live-announcement-bar');
  const alertText = document.getElementById('live-announcement-text');

  if (alertBar && alertText && message && message.trim() !== '') {
    if (sessionStorage.getItem('swifts-alert-dismissed') !== 'true') {
      alertText.textContent = message;
      alertBar.style.display = 'flex';
      document.body.classList.add('has-alert');
    }
  }
}

/* --------------------------------------------------------------------------
   2. Dark / Light Theme Toggle with LocalStorage (Defaults to Dark Mode)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Always default to 'dark' mode unless explicitly selected
  const savedTheme = localStorage.getItem('swifts-theme-v2') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(themeToggleBtn, savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('swifts-theme-v2', newTheme);
      updateThemeIcon(themeToggleBtn, newTheme);
    });
  }
}

function updateThemeIcon(btn, theme) {
  if (!btn) return;
  // In dark mode: show sun so user can click to switch to light mode
  // In light mode: show moon so user can click to switch to dark mode
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
}

/* --------------------------------------------------------------------------
   3. Weekly Schedule Day Filter (All / Thursday / Saturday / Sunday)
   -------------------------------------------------------------------------- */
function initScheduleFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const runCards = document.querySelectorAll('.run-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedDay = btn.getAttribute('data-day');

      const currentCards = document.querySelectorAll('.run-card');
      currentCards.forEach(card => {
        const cardDay = card.getAttribute('data-day');
        if (selectedDay === 'all' || cardDay === selectedDay) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Interactive Pace Matcher
   -------------------------------------------------------------------------- */
function initPaceMatcher() {
  const matcherBtns = document.querySelectorAll('.matcher-btn');
  const resultBox = document.getElementById('matcher-result');
  if (!resultBox || matcherBtns.length === 0) return;

  const paceRecommendations = {
    walk: {
      title: "🐣 Group 5 / Starting Out (Beginners)",
      desc: "Gentle intervals of walking and jogging with patient run leaders. Ideal if you're returning to running or starting fresh!",
      day: "Thursday Social Run (6:50 PM Meet, Pagoda Island)"
    },
    slow: {
      title: "🟢 Group 4 (7:00 – 8:00 min/km)",
      desc: "Super relaxed, chatty group covering ~5 km. Tail walker guaranteed with regular regroup stops.",
      day: "Thursday Social Run & Saturday Parkruns"
    },
    mid: {
      title: "🎯 Group 3 (6:00 – 6:45 min/km)",
      desc: "Our most popular social pace! Covers 6–7 km at a steady conversational pace along the Birmingham canals.",
      day: "Thursday Social Run (Main Run) & Saturday Parkruns"
    },
    fast: {
      title: "⚡️ Group 2 (5:00 – 5:45 min/km)",
      desc: "Brisk pace covering 8–10 km with continuous cadence. Great for half-marathon and 10k race training.",
      day: "Thursday Social Run & Sunday Long Run"
    },
    speed: {
      title: "🚀 Group 1 (< 4:45 min/km) & Long Distance",
      desc: "Fast pace covering 10–12 km on Thursdays, plus weekend half, marathon, and ultra-distance endurance training.",
      day: "Thursday Social Run (Group 1) & Sunday Long Run"
    }
  };

  matcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      matcherBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const paceKey = btn.getAttribute('data-pace');
      const rec = paceRecommendations[paceKey];

      if (rec && resultBox) {
        resultBox.innerHTML = `
          <strong>${rec.title}</strong><br>
          <span style="font-size: 0.92rem; font-weight: normal; color: var(--text-secondary); margin-top: 4px; display: block;">
            ${rec.desc}
          </span>
          <span style="font-size: 0.85rem; font-weight: 700; color: #38bdf8; margin-top: 6px; display: block;">
            📍 Best session: ${rec.day}
          </span>
        `;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   6. Taster Run Modal Booking Dialog
   -------------------------------------------------------------------------- */
function initTasterModal() {
  const modal = document.getElementById('taster-modal');
  const openBtns = document.querySelectorAll('#open-taster-modal-btn, #hero-join-run-btn, .open-taster-btn, .run-select-btn');
  const closeBtn = document.getElementById('modal-close-btn');
  const tasterForm = document.getElementById('taster-form');
  const sessionSelect = document.getElementById('taster-session');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const specificRun = btn.getAttribute('data-run');
      if (specificRun && sessionSelect) {
        if (specificRun.includes('Thursday')) sessionSelect.value = 'thursday';
        else if (specificRun.includes('Saturday')) sessionSelect.value = 'saturday';
        else if (specificRun.includes('Sunday')) sessionSelect.value = 'sunday';
      }
      if (modal) modal.classList.add('active');
    });
  });

  const closeModal = () => modal && modal.classList.remove('active');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeModal();
  });

  if (tasterForm) {
    tasterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('taster-name').value;
      const session = sessionSelect.options[sessionSelect.selectedIndex].text;

      tasterForm.innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
          <h4 style="font-size: 1.4rem; color: #10b981; margin-bottom: 8px;">You're All Set, ${name}!</h4>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">
            We've reserved your spot for: <strong>${session}</strong>.<br>
            A Run Leader will email you with meet point details. Welcome to Swifts!
          </p>
          <button class="btn btn-primary" onclick="document.getElementById('taster-modal').classList.remove('active')">
            Done & Close
          </button>
        </div>
      `;
    });
  }
}

/* --------------------------------------------------------------------------
   7. Smooth Scrolling & Active Nav Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Mark active link based on current page HTML file
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === 'index.html' && (href === '#hero' || href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // Only run in-page section spy on pages with multiple hash sections
  if (currentPath === 'index.html' || currentPath === '' || currentPath === '/') {
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPos = window.pageYOffset + 120;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          current = section.getAttribute('id');
        }
      });

      if (current) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href') || '';
          if (href.startsWith('#')) {
            link.classList.remove('active');
            if (href === `#${current}`) {
              link.classList.add('active');
            }
          }
        });
      }
    });
  }
}

/* --------------------------------------------------------------------------
   8. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('mobile-open');
      toggleBtn.textContent = isOpen ? '✕' : '☰';
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when any nav link or button inside is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link, a, button');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        toggleBtn.textContent = '☰';
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when tapping anywhere outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
        toggleBtn.textContent = '☰';
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
   GOOGLE SHEETS HEADLESS CMS SYNC ENGINE
   ========================================================================== */

/**
 * Fetches data from a published Google Sheet tab using Google Visualization API
 */
async function fetchGoogleSheetTab(sheetId, tabName) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}`;
  const response = await fetch(url);
  const text = await response.text();
  
  // Extract JSON payload from Google Visualization response wrapper
  const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
  if (!jsonMatch || !jsonMatch[1]) {
    throw new Error(`Failed to parse response for tab: ${tabName}`);
  }

  const data = JSON.parse(jsonMatch[1]);
  if (data.status === 'error') {
    throw new Error(data.errors?.[0]?.message || 'Google Sheet Query Error');
  }

  const cols = data.table.cols.map(c => (c.label || c.id || '').trim().toLowerCase().replace(/\s+/g, '_'));
  const rows = data.table.rows.map(r => {
    const rowObj = {};
    r.c.forEach((cell, idx) => {
      const colName = cols[idx];
      if (colName) {
        rowObj[colName] = cell ? (cell.v !== null ? cell.v : '') : '';
      }
    });
    return rowObj;
  });

  return rows;
}

/**
 * Main Google Sheets CMS Initializer
 */
async function initGoogleSheetsCMS(sheetId) {
  try {
    console.log(`[Swifts CMS] Connecting to Google Sheet: ${sheetId}...`);

    // 1. Fetch General Settings / Announcement
    try {
      const settingsRows = await fetchGoogleSheetTab(sheetId, 'General_Settings');
      applyGeneralSettings(settingsRows);
    } catch (e) {
      console.warn('[Swifts CMS] General_Settings tab not found or skipped:', e.message);
    }

    // 2. Fetch Weekly Runs Timetable
    try {
      const runsRows = await fetchGoogleSheetTab(sheetId, 'Weekly_Runs');
      renderDynamicRuns(runsRows);
    } catch (e) {
      console.warn('[Swifts CMS] Weekly_Runs tab skipped:', e.message);
    }

    // 3. Fetch Member Stories
    try {
      const storiesRows = await fetchGoogleSheetTab(sheetId, 'Member_Stories');
      renderDynamicStories(storiesRows);
    } catch (e) {
      console.warn('[Swifts CMS] Member_Stories tab skipped:', e.message);
    }

    // 4. Fetch FAQs
    try {
      const faqsRows = await fetchGoogleSheetTab(sheetId, 'FAQs');
      renderDynamicFaqs(faqsRows);
    } catch (e) {
      console.warn('[Swifts CMS] FAQs tab skipped:', e.message);
    }

    // 5. Fetch Membership Pricing
    try {
      const pricingRows = await fetchGoogleSheetTab(sheetId, 'Membership_Pricing');
      renderDynamicPricing(pricingRows);
    } catch (e) {
      console.warn('[Swifts CMS] Membership_Pricing tab skipped:', e.message);
    }

    console.log('[Swifts CMS] Live data synchronized successfully from Google Sheets! ✨');
  } catch (err) {
    console.error('[Swifts CMS] Error syncing from Google Sheets:', err);
  }
}

/**
 * Apply General Config (Announcement Banner, Hero Stats, Taglines)
 */
function applyGeneralSettings(rows) {
  const settings = {};
  rows.forEach(r => {
    const key = r.key || r.setting_name || r.name;
    const val = r.value || r.val;
    if (key) settings[key.trim()] = val;
  });

  if (settings.announcement_banner) {
    displayLiveAlert(settings.announcement_banner);
  }
  if (settings.stat_members) {
    const el = document.getElementById('hero-stat-members');
    if (el) el.textContent = settings.stat_members;
  }
  if (settings.stat_weekly_runs) {
    const el = document.getElementById('hero-stat-runs');
    if (el) el.textContent = settings.stat_weekly_runs;
  }
  if (settings.stat_run_leaders || settings.stat_leaders) {
    const el = document.getElementById('hero-stat-leaders');
    if (el) el.textContent = settings.stat_run_leaders || settings.stat_leaders;
  }
  if (settings.stat_coaches || settings.stat_ea_coaches) {
    const el = document.getElementById('hero-stat-coaches');
    if (el) el.textContent = settings.stat_coaches || settings.stat_ea_coaches;
  }
  if (settings.hero_title) {
    const el = document.getElementById('hero-title');
    if (el) el.innerHTML = settings.hero_title;
  }
  if (settings.hero_description) {
    const el = document.getElementById('hero-description');
    if (el) el.textContent = settings.hero_description;
  }
}

/**
 * Render Dynamic Runs from Google Sheets
 */
function renderDynamicRuns(runs) {
  const container = document.getElementById('runs-container');
  if (!container || !runs || runs.length === 0) return;

  const validRuns = runs.filter(r => (r.day || r.title) && (r.active !== false && String(r.active).toLowerCase() !== 'false'));
  if (validRuns.length === 0) return;

  container.innerHTML = validRuns.map(run => {
    const dayKey = (run.day || 'thursday').toLowerCase().trim();
    const paceTags = (run.paces || 'All Abilities').split(',').map(p => `<span class="pace-pill">${p.trim()}</span>`).join('');
    
    return `
      <article class="run-card" data-day="${dayKey}">
        <div class="run-card-header">
          <span class="run-day-badge">${run.day_label || run.day || 'Club Run'}</span>
          <span class="run-time">⏰ ${run.time || 'Meet 7:00 PM'}</span>
        </div>
        <h3 class="run-title">${run.title || 'Weekly Club Run'}</h3>
        <div class="run-location">
          📍 <span>${run.location || 'Birmingham'}</span>
        </div>
        <p class="run-description">
          ${run.description || ''}
        </p>
        <div class="run-paces-list">
          ${paceTags}
        </div>
        <button class="btn btn-secondary run-select-btn" data-run="${run.title || 'Club Run'}">
          Book ${run.day || 'Run'}
        </button>
      </article>
    `;
  }).join('');

  // Re-bind modal triggers
  initTasterModal();
}

/**
 * Render Dynamic Member Stories
 */
function renderDynamicStories(stories) {
  const container = document.getElementById('stories-container');
  if (!container || !stories || stories.length === 0) return;

  const validStories = stories.filter(s => s.quote && s.name);
  if (validStories.length === 0) return;

  container.innerHTML = validStories.map(story => {
    const initials = story.initials || story.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    return `
      <div class="story-card">
        <p class="story-quote">
          "${story.quote}"
        </p>
        <div class="story-author">
          <div class="author-avatar">${initials}</div>
          <div>
            <div class="author-name">${story.name}</div>
            <div class="author-detail">${story.role || story.detail || 'Swifts Member'}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render Dynamic FAQs
 */
function renderDynamicFaqs(faqs) {
  const container = document.getElementById('faqs-list');
  if (!container || !faqs || faqs.length === 0) return;

  const validFaqs = faqs.filter(f => f.question && f.answer);
  if (validFaqs.length === 0) return;

  container.innerHTML = validFaqs.map(faq => `
    <div class="faq-item">
      <button class="faq-question">
        <span>${faq.question}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('');

  initFaqAccordion();
}

/**
 * Render Dynamic Membership Pricing
 */
function renderDynamicPricing(pricing) {
  const container = document.getElementById('pricing-container');
  if (!container || !pricing || pricing.length === 0) return;

  const validTiers = pricing.filter(p => p.title && p.cost);
  if (validTiers.length === 0) return;

  container.innerHTML = validTiers.map(tier => {
    const isFeatured = String(tier.featured).toLowerCase() === 'true' || String(tier.is_popular).toLowerCase() === 'true';
    const features = (tier.features || '').split(',').map(f => `<li>${f.trim()}</li>`).join('');
    const btnClass = isFeatured ? 'btn btn-primary open-taster-btn' : 'btn btn-secondary open-taster-btn';

    return `
      <div class="pricing-card ${isFeatured ? 'featured' : ''}">
        <h3 class="pricing-title">${tier.title}</h3>
        <div class="pricing-cost">${tier.cost} <span>${tier.period ? '/ ' + tier.period : ''}</span></div>
        <ul class="pricing-features">
          ${features}
        </ul>
        <button class="${btnClass}">Join as ${tier.title}</button>
      </div>
    `;
  }).join('');

  initTasterModal();
}
