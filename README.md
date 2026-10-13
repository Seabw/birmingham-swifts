# 🏳️‍🌈 Birmingham Swifts Running Club — Official Website

Modern, accessible, and high-performance website for **Birmingham Swifts Running Club**, the premier inclusive LGBTQ+ & allies running club based in Birmingham, UK.

---

## 🌟 Features

* **🎨 Modern Visual Design**:
  * Curated pride color accents & dark/light theme switching with persistence.
  * Glassmorphism navigation and interactive card elevations.
  * Rich typography pairing: `Outfit` (Headings) & `Plus Jakarta Sans` (Body).
  * High-resolution atmospheric photography and official Swifts logo assets.

* **⚡️ Interactive Modules**:
  * **Weekly Run Timetable & Day Filter**: Filter by Thursday Social (Main Run), Saturday Parkruns (Unofficial), and Sunday Long Runs (Unofficial).
  * **Multi-Page Experience**: Dedicated pages for About Us, Weekly Runs, Club News, Members, and Join Us.
  * **Taster Booking Modal**: Interactive sign-up dialog with instant feedback toast.
  * **Initiatives Spotlight**: Dedicated highlights for Couch to 5k (C25K) and Social/Pride calendar.
  * **Community Voices**: Authentic testimonials from beginners, marathoners, and ultra runners.
  * **Collapsible FAQ Accordion**: Instant answers to common beginner and club questions.
  * **Full Mobile & Tablet Responsiveness**: Optimized navigation and layouts across all viewport sizes.

---

## 📁 File Structure

```
birmingham-swifts/
├── index.html         # Main semantic HTML5 web structure & SEO tags
├── styles.css         # Vanilla CSS design tokens, glassmorphism & layout
├── script.js          # Clientside interactions (theme, filters, modals, matcher)
├── assets/            # High-res club photography and official logos
│   ├── swifts_logo.jpg
│   ├── hero_running_crew.jpg
│   ├── c25k_graduates.jpg
│   └── track_intervals.jpg
└── README.md          # Project documentation
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or serve it using Python's built-in HTTP server:

```bash
cd birmingham-swifts
python3 -m http.server 8080
```
Then visit `http://localhost:8080` in your browser.
