# 🤖 Birmingham Swifts — Agent & Developer Instructions

## 🔒 Mandatory Design & Architectural Directives

1. **Strict Design Preservation**:
   - The visual identity of Birmingham Swifts is defined in [`DESIGN_SYSTEM.md`](file:///Users/bo.wang/.gemini/antigravity-ide/scratch/birmingham-swifts/DESIGN_SYSTEM.md) and [`styles.css`](file:///Users/bo.wang/.gemini/antigravity-ide/scratch/birmingham-swifts/styles.css).
   - **Never rewrite or replace the design from scratch.**
   - All new features, pages, or components must use the existing CSS variables, pride gradients, glassmorphism tokens, and fonts (`Outfit` & `Plus Jakarta Sans`).

2. **Technology Stack**:
   - **HTML**: Semantic HTML5 with accessible attributes.
   - **CSS**: Vanilla CSS with CSS custom properties. Do not introduce TailwindCSS or heavy CSS frameworks unless explicitly asked.
   - **JavaScript**: Native Vanilla JS without unnecessary bulky dependencies.
   - **Content Management**: Powered by the **Google Sheets Headless CMS Engine** in `script.js` with local fallback defaults.

3. **Theme & Responsiveness**:
   - Maintain full support for both **Dark Mode** (default) and **Light Mode**.
   - Ensure all layouts remain fully responsive on mobile, tablet, and desktop viewports.
