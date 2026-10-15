# Rule: Google Sheets Headless CMS Integration

**Context**: Birmingham Swifts Running Club Website (`birmingham-swifts`).

## Core Principle
The Birmingham Swifts website does NOT use a SQL database or Node/Python backend. Instead, **the site loads dynamically from a shared Google Spreadsheet to populate its contents**.

## Live Connection Details
* **Google Sheet ID**: `1tNdQuPdBsQifwQJttXNJwoZzH9H3bg5eKp2gaA0ajbw`
* **Configuration Object**: `window.SWIFTS_CONFIG.googleSheetId` in `script.js`.
* **API Protocol**: Fetched in clientside JavaScript via the Google Visualization Query API (`https://docs.google.com/spreadsheets/d/{sheetId}/gviz/tq?tqx=out:json&headers=1&sheet={tabName}`).

## Synchronized Content Sections & Container IDs
Any agent or developer modifying the site must preserve the container element IDs used by `script.js` to hydrate content:
* `Weekly_Runs` $\to$ `#runs-container`
* `Coaches` $\to$ `#coaches-container`
* `Run_Leaders` $\to$ `#leaders-container`
* `Committee` $\to$ `#committee-container`
* `Club_News` $\to$ `#news-container`
* `Member_Stories` / `Community_Voices` $\to$ `#stories-container`
* `Membership_Pricing` / `Membership` $\to$ `#pricing-container`
* `General_Settings` / `Site_Content` $\to$ `#live-announcement-bar`, `#hero-stat-members`, etc.

## Agent Guidelines
1. **Never Remove Live Sync**: Do not replace `initGoogleSheetsCMS()` or delete the dynamic render functions in `script.js`.
2. **Progressive Enhancement**: Static HTML in `.html` files serves as the offline/SEO fallback skeleton. Ensure all static markup conforms to the schema expected by the Google Sheets tabs.
3. **No Breaking Changes to DOM IDs**: Keep target container IDs intact across all multi-page HTML documents.
4. **Cache Busting**: Always increment query parameters (e.g. `script.js?v=4.1`, `styles.css?v=4.1`) across all HTML files when making updates.
