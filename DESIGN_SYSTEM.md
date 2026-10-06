# 🎨 Birmingham Swifts — Design System & Brand Guidelines

This document locks in the official visual identity, color tokens, typography, and component hierarchy for the **Birmingham Swifts Running Club** website. **All future development, features, and modifications MUST strictly adhere to this design specification.**

---

## 🔒 Core Brand Principles

1. **Inclusive & Vibrant Pride Aesthetics**:
   - Subtle, elegant dark mode base (`#0a0e1a`) with vibrant pride accents (rainbow strip, glow highlights, and gradient pill tags).
   - Avoid generic flat colors. Use curated gradients and glassmorphism.
2. **Modern Glassmorphism & Depth**:
   - Cards and navbars use `backdrop-filter: blur(16px)` with semi-transparent borders (`rgba(255, 255, 255, 0.1)`).
   - Subtle hover elevations (`translateY(-4px to -6px)`) with smooth cubic-bezier transitions.
3. **Typography Consistency**:
   - **Headings, Badges, Metrics & Buttons**: `Outfit` (Bold / 700 / 800 / 900).
   - **Body, Descriptions, Quotes, Forms**: `Plus Jakarta Sans` (400 / 500 / 600).
4. **Consistency Over Redesign**:
   - Never replace the core design with a different layout or alternative framework unless explicitly instructed.
   - Build new features by reusing the existing CSS variables, tokens, and component classes.

---

## 🎨 Color Palette & Design Tokens

```css
:root {
  /* Dark Mode (Default Theme) */
  --bg-primary: #0a0e1a;            /* Deep Midnight */
  --bg-secondary: #111827;          /* Slate Dark */
  --bg-card: rgba(17, 24, 39, 0.75);/* Glassmorphism Card */
  --bg-card-hover: rgba(30, 41, 59, 0.85);
  --border-glass: rgba(255, 255, 255, 0.1);
  --border-glass-hover: rgba(255, 255, 255, 0.25);

  --text-primary: #f8fafc;          /* High-contrast Crisp White */
  --text-secondary: #94a3b8;        /* Soft Slate */
  --text-muted: #64748b;

  /* Brand Accents */
  --swifts-blue: #0284c7;           /* Birmingham Swifts Electric Blue */
  --swifts-blue-glow: rgba(2, 132, 199, 0.35);
  --pride-purple: #8b5cf6;
  --pride-pink: #ec4899;
  --pride-cyan: #06b6d4;
  --pride-amber: #f59e0b;
  --pride-emerald: #10b981;
  --pride-red: #ef4444;

  /* Gradients */
  --gradient-pride: linear-gradient(135deg, #ef4444 0%, #f59e0b 20%, #10b981 40%, #06b6d4 60%, #8b5cf6 80%, #ec4899 100%);
  --gradient-swifts: linear-gradient(135deg, #0284c7 0%, #3b82f6 50%, #8b5cf6 100%);
}
```

---

## 📐 Layout & Component Standards

1. **Top Pride Strip**: 4px height fixed at `top: 0`, using `var(--gradient-pride)`.
2. **Navigation Bar**: Fixed glassmorphism bar (72px height) with club circular logo, uppercase brand title with Swifts gradient, and theme toggle.
3. **Hero Section**: High-resolution cinematic background with gradient overlay (`linear-gradient(180deg, rgba(10,14,26,0.7) 0%, rgba(10,14,26,0.95) 100%)`).
4. **Section Headers**:
   - `span.section-tag`: Uppercase 12px bold badge with letter-spacing `1.2px` in `#38bdf8`.
   - `h2.section-title`: 32px–42px bold heading with tight letter-spacing (`-0.8px`).
   - `p.section-subtitle`: 17px slate subtitle.
5. **Interactive Cards**:
   - Border radius `14px–20px`.
   - Gradient indicator strip on hover.
   - Semi-transparent glass background.
6. **Buttons**:
   - Pill-shaped (`border-radius: 9999px`).
   - `.btn-primary`: Swifts blue-to-violet gradient with glow shadow.
   - `.btn-rainbow`: Pride rainbow gradient for high-priority CTA actions.
   - `.btn-secondary`: Glass frosted background with white border.

---

## 🛡️ Rule for Future AI & Developer Sessions

* **DO NOT** rewrite or replace this design system.
* **DO NOT** convert Vanilla CSS to TailwindCSS or external frameworks without user request.
* **DO NOT** change the typography or remove the pride accents.
* Always preserve the dual **Dark / Light theme** mechanism and **Google Sheets CMS** data bindings.
