# 📊 Birmingham Swifts — Google Sheets CMS Guide

This guide explains how the **Birmingham Swifts Running Club committee** can edit and update the live website directly from a shared Google Spreadsheet without writing any code.

---

## ⚡️ Quick Overview: How It Works

```
[ Google Spreadsheet ] ---> (Live Google Query API) ---> [ Swifts Website ]
(Committee edits rows)                                  (Updates in real-time)
```

1. Create a Google Spreadsheet (e.g., named `Birmingham Swifts Website CMS`).
2. Add the **5 standard tabs** listed below.
3. Click **Share** $\to$ Change access to **"Anyone with the link can view"**.
4. Copy the Sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/`**`1AbCdEfGhIjKlMnOpQrStUvWxYz12345678`**`/edit`
5. Paste that ID into `script.js`:
   ```javascript
   window.SWIFTS_CONFIG = {
     googleSheetId: '1AbCdEfGhIjKlMnOpQrStUvWxYz12345678',
   };
   ```

---

## 📑 Spreadsheet Tabs & Column Specifications

Create the following **5 tabs** in your Google Spreadsheet:

---

### Tab 1: `General_Settings`
Used for urgent announcements, banner alerts, live stats, and club contact info.

| key | value | Description |
| :--- | :--- | :--- |
| `announcement_banner` | `✨ Next Couch to 5k cohort starts October 1st! Join our free taster run.` | Top banner alert (leave blank to hide) |
| `stat_members` | `250+` | Number shown on the hero stats bar |
| `stat_weekly_runs` | `4` | Number of weekly runs counter |
| `stat_run_leaders` | `15+` | Number of run leaders counter |
| `stat_inclusive` | `100%` | Inclusivity badge stat |
| `contact_email` | `info@birmingham-swifts.co.uk` | Committee contact email |

---

### Tab 2: `Weekly_Runs`
Controls the weekly run timetable cards and day filtering on the website.

| day | day_label | time | title | location | description | paces | active |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `thursday` | `Thursday Evening • Main Run` | `⏰ 6:50 PM Meet (7:00 PM Start)` | `Main Club Social Run (5k/7k/10k & Walk-to-Run)` | `Pagoda Island, Bath Row / Gay Village` | `Our official flagship weekly club run along Birmingham canals welcoming all abilities plus Walk-to-Run.` | `Walk-to-Run, 5k & 7k Routes, All Abilities, Tail Walkers` | `TRUE` |
| `saturday` | `Saturday Morning • Unofficial` | `⏰ 8:45 AM Meet (9:00 AM Start)` | `Swifts Parkrun Tour & Social Coffee` | `Cannon Hill / Edgbaston / Perry Hall` | `Unofficial weekly club meet-ups at local Birmingham 5k parkruns followed by coffee.` | `5k Community, Local Parkruns, All Paces, Coffee & Chat` | `TRUE` |
| `sunday` | `Sunday Morning • Unofficial` | `⏰ 9:00 AM / 9:30 AM Meet` | `Sunday Long Run (Half, Marathon & Ultra Training)` | `Sutton Park / Lickey Hills / Canals` | `Unofficial long distance runs for half marathons, full marathons, or ultras (10k to 30k+).` | `10k-30k+ Distance, Half & Full Marathon, Ultra Endurance, Scenic Trails` | `TRUE` |

*💡 Tip: Set `active` to `FALSE` to temporarily hide a run if cancelled for weather or bank holidays.*

---

### Tab 3: `Member_Stories`
Controls the member testimonial quotes shown on the website.

| name | role | quote | initials |
| :--- | :--- | :--- | :--- |
| `Jack Dean` | `Marathon Runner & Member since 2023` | `Joining Swifts was the best decision I made when moving to Birmingham. Started with C25K and now training for Chicago!` | `JD` |
| `Andrea Bohn` | `C25K Graduate & Swiftember Hero` | `I was nervous about joining a running club. The tail walkers and run leaders made me feel so welcome.` | `AB` |
| `Alice & Jake` | `Ultra Marathon Trail Runners` | `From Thursday canal runs to tackling 50-mile Ultras, Swifts provides the community that keeps you lacing up.` | `AW` |

---

### Tab 4: `Membership_Pricing`
Controls the membership cards, prices, and bullet point benefits.

| title | cost | period | features | featured |
| :--- | :--- | :--- | :--- | :--- |
| `Club Runner & Tasters` | `£0` | `open to all` | `Join Thursday social runs & weekend meetups, Walk-to-Run & friendly group runs, Friendly run leaders & tail walkers, Post-run social drinks at The Fox` | `FALSE` |
| `Club Supporter Member` | `£15` | `year` | `Official Birmingham Swifts membership, Club kit discounts, Swiftember challenge entry & awards, Private club WhatsApp & community, Supports club equipment & run leader training` | `TRUE` |
| `England Athletics Affiliated` | `£35` | `year` | `All Club Supporter benefits included, Official EA registration, £2+ discount on UK road & trail races, London Marathon club ballot entry, Personal race insurance` | `FALSE` |

---

### Tab 5: `FAQs`
Controls the expandable questions and answers accordion.

| question | answer |
| :--- | :--- |
| `Do I need to be fast to join Birmingham Swifts?` | `Not at all! We have runners of all abilities, from complete beginners doing our Walk-to-Run / C25K group to runners doing 4 min/km. Every run has tail runners.` |
| `Do I have to be LGBTQ+ to run with Swifts?` | `Everyone is welcome! We are an LGBTQ+ and Allies running club. Whether gay, bi, trans, non-binary, or a supportive ally, you will find a warm community.` |
| `Where can I leave my bag during Thursday runs?` | `On Thursday nights, we meet at our venue in the Gay Village where secure bag drop is available for members while we are out on the run.` |
| `What should I bring to my first run?` | `Just comfortable running shoes, weather-appropriate running kit, and a bottle of water. In winter, high-vis or bright gear is strongly encouraged!` |

---

## 🛡️ Built-in Failsafe Caching

* If the spreadsheet is ever unavailable or the user is offline, the website automatically falls back to its built-in default content.
* The website will **never show blank boxes or broken screens**.
