# 🤖 Birmingham Swifts — Agent & Developer Instructions

## 📊 Core Architecture: Google Sheets Headless CMS

> [!IMPORTANT]
> **The Birmingham Swifts website dynamically loads from a Google Sheet to populate its contents.**
>
> All club sections — including weekly runs, coaches, committee members, club news, member stories, and membership tiers — are maintained by the club committee via Google Sheets and fetched live at runtime.
>
> * **Active Google Sheet ID**: `1tNdQuPdBsQifwQJttXNJwoZzH9H3bg5eKp2gaA0ajbw` (configured in `window.SWIFTS_CONFIG.googleSheetId` inside [`script.js`](file:///Users/bo.wang/.gemini/antigravity-ide/scratch/birmingham-swifts/script.js)).
> * **API Endpoint**: Google Visualization API (`https://docs.google.com/spreadsheets/d/{sheetId}/gviz/tq?tqx=out:json&headers=1&sheet={tabName}`).
> * **Synchronized Tabs**:
>   1. `Weekly_Runs`: Thursday social main run, Saturday parkruns, Sunday marathon/ultra long runs.
>   2. `Coaches`: Qualified coaches with bios and portrait assets.
>   3. `Run_Leaders`: Certified run leaders and pacing specialties.
>   4. `Committee`: Club committee members, roles, and contacts.
>   5. `Club_News`: Articles, race reports, and announcements.
>   6. `Member_Stories` / `Community_Voices`: Member testimonial quotes.
>   7. `Membership_Pricing` / `Membership`: Club tiers (Free Runner £0, Club Supporter £15, England Athletics £35).
>   8. `General_Settings` / `Site_Content`: Announcement alert banner and hero statistics.
> * **Fallback Mechanism**: Static HTML markup in each `.html` file serves as a progressive enhancement fallback and SEO skeleton. When `script.js` initializes on `DOMContentLoaded`, it queries Google Sheets and dynamically hydrates the containers.
> * **Agent Directives**:
>   - **NEVER remove or break the Google Sheets CMS sync engine in `script.js`.**
>   - Keep container DOM IDs (`runs-container`, `news-container`, `coaches-container`, `leaders-container`, `committee-container`, `stories-container`, `pricing-container`) intact across all pages.
>   - When updating default content or layouts, ensure static HTML fallbacks match the schema expected by the Google Sheets tabs.
>   - Detailed spreadsheet guide and schemas: see [`CMS_GOOGLE_SHEETS_GUIDE.md`](file:///Users/bo.wang/.gemini/antigravity-ide/scratch/birmingham-swifts/CMS_GOOGLE_SHEETS_GUIDE.md).

---

## 🔒 Mandatory Design & Architectural Directives

1. **Strict Design Preservation**:
   - The visual identity of Birmingham Swifts is defined in [`DESIGN_SYSTEM.md`](file:///Users/bo.wang/.gemini/antigravity-ide/scratch/birmingham-swifts/DESIGN_SYSTEM.md) and [`styles.css`](file:///Users/bo.wang/.gemini/antigravity-ide/scratch/birmingham-swifts/styles.css).
   - **Never rewrite or replace the design from scratch.**
   - All new features, pages, or components must use the existing CSS variables, pride gradients, glassmorphism tokens, and typography (`Outfit` for headings & `Plus Jakarta Sans` for body).

2. **Technology Stack**:
   - **HTML**: Semantic HTML5 with accessible ARIA attributes.
   - **CSS**: Vanilla CSS with CSS custom properties. Do not introduce TailwindCSS or external CSS frameworks.
   - **JavaScript**: Native Vanilla JS without heavy external libraries.
   - **Content Management**: Powered by the clientside Google Sheets Headless CMS Engine with resilient static HTML fallbacks.

3. **Theme & Responsiveness**:
   - Maintain full support for both **Dark Mode** (default) and **Light Mode** using CSS variables.
   - Ensure all layouts remain fully responsive on mobile, tablet, and desktop viewports.

4. **Cache Busting**:
   - Safari and mobile browsers aggressively cache `styles.css` and `script.js`.
   - When modifying CSS or JS, bump the version query parameter (e.g. `styles.css?v=4.0`, `script.js?v=4.0`) across all HTML files.
