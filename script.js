/* ==========================================================================
   BIRMINGHAM SWIFTS RUNNING CLUB - INTERACTIVE CMS & SCRIPT ENGINE
   ========================================================================== */

// Global Configuration for Committee Google Sheets CMS
window.SWIFTS_CONFIG = {
  // To connect your Google Sheet:
  // 1. Create a Google Sheet with the recommended tabs
  // 2. Click File -> Share -> Anyone with the link can view
  // 3. Paste the Sheet ID here (the long ID between /d/ and /edit in the URL)
  googleSheetId: '1tNdQuPdBsQifwQJttXNJwoZzH9H3bg5eKp2gaA0ajbw', 
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
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(tabName)}`;
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

  // Clean column names: extract first token before whitespace or newlines
  const cols = data.table.cols.map(c => {
    const raw = (c.label || c.id || '').trim().toLowerCase();
    const token = raw.split(/[\r\n\s]+/)[0];
    return token.replace(/[^a-z0-9_]/g, '');
  });

  const rows = data.table.rows.map(r => {
    const rowObj = {};
    if (r && r.c) {
      r.c.forEach((cell, idx) => {
        const colName = cols[idx];
        if (colName) {
          rowObj[colName] = cell ? (cell.v !== null ? cell.v : '') : '';
        }
      });
    }
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

    // 1. Fetch Site Content (Hero, Stats, Section Headings, Photos)
    try {
      let contentRows = [];
      try {
        contentRows = await fetchGoogleSheetTab(sheetId, 'Site_Content');
      } catch (e) {
        contentRows = await fetchGoogleSheetTab(sheetId, 'General_Settings');
      }
      applyGeneralSettings(contentRows);
    } catch (e) {
      console.warn('[Swifts CMS] Site_Content tab skipped:', e.message);
      applyGeneralSettings([]);
    }

    // 2. Fetch Weekly Runs Timetable
    try {
      const runsRows = await fetchGoogleSheetTab(sheetId, 'Weekly_Runs');
      renderDynamicRuns(runsRows);
    } catch (e) {
      console.warn('[Swifts CMS] Weekly_Runs tab skipped:', e.message);
    }

    // 3. Fetch Club News
    try {
      const newsRows = await fetchGoogleSheetTab(sheetId, 'Club_News');
      renderDynamicNews(newsRows);
    } catch (e) {
      console.warn('[Swifts CMS] Club_News tab skipped:', e.message);
    }

    // 4. Fetch Coaches
    try {
      const coachesRows = await fetchGoogleSheetTab(sheetId, 'Coaches');
      renderDynamicCoaches(coachesRows);
    } catch (e) {
      console.warn('[Swifts CMS] Coaches tab skipped:', e.message);
    }

    // 5. Fetch Run Leaders
    try {
      const leadersRows = await fetchGoogleSheetTab(sheetId, 'Run_Leaders');
      renderDynamicLeaders(leadersRows);
    } catch (e) {
      console.warn('[Swifts CMS] Run_Leaders tab skipped:', e.message);
    }

    // 6. Fetch Committee
    try {
      const committeeRows = await fetchGoogleSheetTab(sheetId, 'Committee');
      renderDynamicCommittee(committeeRows);
    } catch (e) {
      console.warn('[Swifts CMS] Committee tab skipped:', e.message);
    }

    // 7. Fetch Community Voices (Member Stories)
    try {
      let storiesRows = [];
      try {
        storiesRows = await fetchGoogleSheetTab(sheetId, 'Community_Voices');
      } catch (e) {
        storiesRows = await fetchGoogleSheetTab(sheetId, 'Member_Stories');
      }
      renderDynamicStories(storiesRows);
    } catch (e) {
      console.warn('[Swifts CMS] Community_Voices tab skipped:', e.message);
    }

    // 8. Fetch Membership Pricing
    try {
      let pricingRows = [];
      try {
        pricingRows = await fetchGoogleSheetTab(sheetId, 'Membership');
      } catch (e) {
        pricingRows = await fetchGoogleSheetTab(sheetId, 'Membership_Pricing');
      }
      renderDynamicPricing(pricingRows);
    } catch (e) {
      console.warn('[Swifts CMS] Membership tab skipped:', e.message);
    }

    console.log('[Swifts CMS] Live data synchronized successfully from Google Sheets! ✨');
  } catch (err) {
    console.error('[Swifts CMS] Error syncing from Google Sheets:', err);
  }
}

/**
 * Apply General Config (Announcement Banner, Hero Stats, Taglines, Photo Showcases)
 */
function applyGeneralSettings(rows) {
  // Built-in defaults matching current live site ensuring zero blank screen regression
  const settings = {
    hero_title: 'Run With <span class="hero-title-highlight">Birmingham Swifts.</span>',
    hero_description: "Birmingham's premier inclusive LGBTQ+ & allies running club. From absolute beginners tackling Couch to 5k to seasoned ultra-marathoners, nobody is ever left behind.",
    hero_photo_url: 'assets/swifts_village_inn_crew.jpg',
    hero_photo_badge: 'AJ Bell Great Birmingham Run 2026',
    stat_members: '100+',
    stat_runs: '3',
    stat_leaders: '15+',
    stat_coaches: '3',
    stat_inclusive: '100%',
    who_we_are_title: 'A Welcoming Community for Every Runner',
    who_we_are_subtitle: 'Established in Birmingham to create a safe, supportive, and social space where LGBTQ+ individuals and allies can discover the joy of running together.',
    who_we_are_photo_url: 'assets/swifts_black_country_half_marathon.jpg',
    who_we_are_photo_badge: 'Birmingham Black Country Half Marathon 2026',
    runs_section_title: 'Find Your Next Run',
    runs_section_subtitle: 'We organize 3 regular weekly sessions across Birmingham catering to all distances and paces.',
    runs_photo_url: 'assets/swifts_cannon_hill_parkrun_takeover.jpg',
    runs_photo_badge: 'Cannon Hill Parkrun Takeover 2026'
  };

  if (Array.isArray(rows)) {
    rows.forEach(r => {
      const key = (r.key || r.setting_name || r.name || '').trim();
      const val = r.value !== undefined && r.value !== null ? r.value : r.val;
      if (key && val !== undefined && val !== '') {
        settings[key] = val;
      }
    });
  }

  // 1. Live announcement
  if (settings.announcement_banner) {
    displayLiveAlert(settings.announcement_banner);
  }

  // 2. Hero stats
  const statMap = {
    'hero-stat-members': settings.stat_members,
    'hero-stat-runs': settings.stat_runs || settings.stat_weekly_runs,
    'hero-stat-leaders': settings.stat_leaders || settings.stat_run_leaders,
    'hero-stat-coaches': settings.stat_coaches || settings.stat_ea_coaches,
    'hero-stat-inclusive': settings.stat_inclusive,
  };
  Object.entries(statMap).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el && val) el.textContent = val;
  });

  // 3. Hero content & photos
  const heroTitleEl = document.getElementById('hero-title');
  if (heroTitleEl && settings.hero_title) {
    heroTitleEl.innerHTML = settings.hero_title;
  }
  const heroDescEl = document.getElementById('hero-description');
  if (heroDescEl && settings.hero_description) {
    heroDescEl.textContent = settings.hero_description;
  }
  const heroPhotoImg = document.getElementById('hero-photo-img');
  if (heroPhotoImg && settings.hero_photo_url) {
    heroPhotoImg.src = settings.hero_photo_url;
  }
  const heroPhotoBadge = document.getElementById('hero-photo-badge-text');
  if (heroPhotoBadge && settings.hero_photo_badge) {
    heroPhotoBadge.textContent = settings.hero_photo_badge;
  }

  // 4. Who We Are section & about page
  const whoTitleEl = document.getElementById('about-title');
  if (whoTitleEl && settings.who_we_are_title) whoTitleEl.textContent = settings.who_we_are_title;

  const whoSubEl = document.getElementById('about-subtitle');
  if (whoSubEl && settings.who_we_are_subtitle) whoSubEl.textContent = settings.who_we_are_subtitle;

  const whoImg = document.getElementById('who-we-are-img');
  if (whoImg && settings.who_we_are_photo_url) whoImg.src = settings.who_we_are_photo_url;

  const whoBadge = document.getElementById('who-we-are-badge-text');
  if (whoBadge && settings.who_we_are_photo_badge) whoBadge.textContent = settings.who_we_are_photo_badge;

  const aboutPageImg = document.getElementById('about-page-photo-img');
  if (aboutPageImg && settings.who_we_are_photo_url) aboutPageImg.src = settings.who_we_are_photo_url;

  const aboutPageBadge = document.getElementById('about-page-photo-badge-text');
  if (aboutPageBadge && settings.who_we_are_photo_badge) aboutPageBadge.textContent = settings.who_we_are_photo_badge;

  // 5. Weekly Runs section titles & photos
  const runsTitleEl = document.getElementById('runs-section-title');
  if (runsTitleEl && settings.runs_section_title) runsTitleEl.textContent = settings.runs_section_title;

  const runsSubEl = document.getElementById('runs-section-subtitle');
  if (runsSubEl && settings.runs_section_subtitle) runsSubEl.textContent = settings.runs_section_subtitle;

  const runsImg = document.getElementById('runs-photo-img');
  if (runsImg && settings.runs_photo_url) runsImg.src = settings.runs_photo_url;

  const runsBadge = document.getElementById('runs-photo-badge-text');
  if (runsBadge && settings.runs_photo_badge) runsBadge.textContent = settings.runs_photo_badge;

  const runsPageImg = document.getElementById('runs-page-photo-img');
  if (runsPageImg && settings.runs_photo_url) runsPageImg.src = settings.runs_photo_url;

  const runsPageBadge = document.getElementById('runs-page-photo-badge-text');
  if (runsPageBadge && settings.runs_photo_badge) runsPageBadge.textContent = settings.runs_photo_badge;
}

/**
 * Render Dynamic Runs from Google Sheets
 */
function renderDynamicRuns(runs) {
  const container = document.getElementById('runs-container');
  if (!container || !runs || runs.length === 0) return;

  const validRuns = runs.filter(r => (r.day_id || r.day || r.title));
  if (validRuns.length === 0) return;

  validRuns.sort((a, b) => (parseInt(a.order) || 99) - (parseInt(b.order) || 99));

  container.innerHTML = validRuns.map(run => {
    const dayKey = (run.day_id || run.day || 'thursday').toLowerCase().trim();
    const isOfficial = (run.badge || '').toLowerCase().includes('official') && !(run.badge || '').toLowerCase().includes('un-official') && !(run.badge || '').toLowerCase().includes('unofficial');
    const badgeClass = isOfficial ? 'official' : 'unofficial';
    const paceList = (run.paces || 'All Abilities').split(',').map(p => `<span class="pace-pill">${p.trim()}</span>`).join('');
    
    return `
      <article class="run-card" id="${dayKey}" data-day="${dayKey}">
        <div class="run-card-header">
          <span class="run-day-badge ${badgeClass}">${run.badge || 'Club Run'}</span>
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
          ${paceList}
        </div>
        <button class="btn btn-primary run-select-btn" data-run="${run.title || 'Club Run'}">
          Book Your First Run
        </button>
      </article>
    `;
  }).join('');

  // Re-bind modal triggers
  initTasterModal();
}

/**
 * Render Dynamic Member Stories (Community Voices)
 */
function renderDynamicStories(stories) {
  const container = document.getElementById('stories-container');
  if (!container || !stories || stories.length === 0) return;

  const validStories = stories.filter(s => s.quote && s.name);
  if (validStories.length === 0) return;

  validStories.sort((a, b) => (parseInt(a.order) || 99) - (parseInt(b.order) || 99));

  container.innerHTML = validStories.map(story => {
    const initials = story.initials || story.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    return `
      <div class="story-card">
        <p class="story-quote">
          "${story.quote.replace(/^["“”]|["“”]$/g, '').trim()}"
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

  validTiers.sort((a, b) => (parseInt(a.order) || 99) - (parseInt(b.order) || 99));

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

/**
 * Render Dynamic Coaches from Google Sheets
 */
function renderDynamicCoaches(coaches) {
  const container = document.getElementById('coaches-grid');
  if (!container || !coaches || coaches.length === 0) return;

  const validCoaches = coaches.filter(c => c.name && c.name.trim() !== '');
  if (validCoaches.length === 0) return;

  validCoaches.sort((a, b) => (parseInt(a.order) || 99) - (parseInt(b.order) || 99));

  container.innerHTML = validCoaches.map(coach => {
    const photoUrl = coach.photo_url || 'assets/portrait_coach.jpg';
    const objectPos = photoUrl.includes('christopher') ? 'style="object-position: center 20%;"' : '';
    const quoteHtml = coach.quote ? `<div class="coach-quote">"${coach.quote.replace(/^["“”]|["“”]$/g, '').trim()}"</div>` : '';

    return `
      <article class="coach-card">
        <div class="coach-img-wrap">
          <img src="${photoUrl}" alt="Coach ${coach.name}" class="coach-img" ${objectPos}>
        </div>
        <span class="coach-badge">${coach.badge || 'EA Coach in Running Fitness (CiRF)'}</span>
        <h3 class="coach-name">${coach.name}</h3>
        <div class="coach-specialty">${coach.specialty || 'Club Coach'}</div>
        <p class="coach-desc">
          ${coach.description || ''}
        </p>
        ${quoteHtml}
      </article>
    `;
  }).join('');
}

/**
 * Render Dynamic Run Leaders from Google Sheets
 */
function renderDynamicLeaders(leaders) {
  const container = document.getElementById('leaders-grid');
  if (!container || !leaders || leaders.length === 0) return;

  const validLeaders = leaders.filter(l => l.name && l.name.trim() !== '');
  if (validLeaders.length === 0) return;

  validLeaders.sort((a, b) => (parseInt(a.order) || 99) - (parseInt(b.order) || 99));

  container.innerHTML = validLeaders.map(leader => {
    const photoUrl = leader.photo_url || 'assets/portrait_leader.jpg';
    const objectPos = photoUrl.includes('christopher') ? 'style="object-position: center 20%;"' : '';
    return `
      <article class="leader-card">
        <div class="leader-header">
          <div class="leader-avatar-wrap">
            <img src="${photoUrl}" alt="${leader.name}" class="leader-avatar-img" ${objectPos}>
          </div>
          <div>
            <h3 class="leader-name">${leader.name}</h3>
            <span class="leader-badge">${leader.badge || 'LiRF Certified'}</span>
          </div>
        </div>
        <p class="leader-bio">
          ${leader.bio || ''}
        </p>
      </article>
    `;
  }).join('');
}

/**
 * Render Dynamic Committee from Google Sheets
 */
function renderDynamicCommittee(committee) {
  const container = document.getElementById('committee-grid');
  if (!container || !committee || committee.length === 0) return;

  // Safety check: ensure committee rows actually have a role
  const validMembers = committee.filter(m => m.name && m.name.trim() !== '' && (m.role || m.specialty?.includes('Secretary') || m.specialty?.includes('Chair') || m.specialty?.includes('Treasurer')));
  if (validMembers.length === 0) return;

  validMembers.sort((a, b) => (parseInt(a.order) || 99) - (parseInt(b.order) || 99));

  container.innerHTML = validMembers.map(member => {
    const photoUrl = member.photo_url || 'assets/portrait_coach.jpg';
    const objectPos = photoUrl.includes('bo_wang') ? 'style="object-position: center 15%;"' : '';
    const badgeText = member.badge || (member.role?.includes('Chair') || member.role?.includes('Secretary') ? 'Executive Role' : 'Committee Role');
    const badgeStyle = badgeText.toLowerCase().includes('safety') || badgeText.toLowerCase().includes('welfare') || badgeText.toLowerCase().includes('inclusion')
      ? 'style="background: rgba(236,72,153,0.15); color: #f472b6; border-color: rgba(236,72,153,0.35);"'
      : '';

    let respHtml = '';
    if (member.responsibilities) {
      const items = member.responsibilities.split(/[;\n]/).map(r => r.trim()).filter(Boolean);
      if (items.length > 0) {
        respHtml = `<ul class="committee-responsibilities">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
      }
    }

    return `
      <article class="coach-card">
        <div class="coach-img-wrap">
          <img src="${photoUrl}" alt="${member.name} - ${member.role || 'Committee'}" class="coach-img" ${objectPos}>
        </div>
        <span class="coach-badge" ${badgeStyle}>${badgeText}</span>
        <h3 class="coach-name">${member.name}</h3>
        <div class="coach-specialty">${member.specialty || member.role || 'Committee Member'}</div>
        <p class="coach-desc">
          ${member.description || ''}
        </p>
        ${respHtml}
      </article>
    `;
  }).join('');
}

/**
 * Render Dynamic Club News from Google Sheets
 */
function renderDynamicNews(news) {
  const container = document.getElementById('news-grid');
  if (!container || !news || news.length === 0) return;

  const validNews = news.filter(n => n.title && n.title.trim() !== '');
  if (validNews.length === 0) return;

  validNews.sort((a, b) => (parseInt(a.order) || 99) - (parseInt(b.order) || 99));

  container.innerHTML = validNews.map(item => {
    const photoUrl = item.photo_url || 'assets/hero_running_crew.jpg';
    const badgeText = item.tag ? item.tag : 'Swifts News';
    let actionHtml = '';
    const link = (item.link_url || '').toLowerCase().trim();
    if (link === 'register' || link === 'taster' || link === 'c25k') {
      actionHtml = `<button class="btn btn-primary open-taster-btn">Register for ${item.title}</button>`;
    } else if (link.startsWith('http') || link.endsWith('.html') || link.includes('#')) {
      actionHtml = `<a href="${item.link_url}" class="btn btn-secondary">Learn More</a>`;
    } else {
      actionHtml = `<button class="btn btn-secondary open-taster-btn">Learn More</button>`;
    }

    return `
      <article class="initiative-card">
        <div class="initiative-img-box">
          <img src="${photoUrl}" alt="${item.title}" class="initiative-img">
          <span class="initiative-badge">${badgeText}</span>
        </div>
        <div class="initiative-body">
          <h3 class="initiative-title">${item.title}</h3>
          <p class="initiative-text">
            ${item.summary || ''}
          </p>
          <div>
            ${actionHtml}
          </div>
        </div>
      </article>
    `;
  }).join('');

  initTasterModal();
}
