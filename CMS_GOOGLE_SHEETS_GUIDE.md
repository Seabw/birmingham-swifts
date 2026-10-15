# 📊 Birmingham Swifts — Google Sheets CMS Guide

This guide explains how the **Birmingham Swifts Running Club committee** can edit and update the live website directly from a shared Google Spreadsheet without writing any code.

---

## ⚡️ Quick Overview: How It Works

```
[ Google Spreadsheet ] ---> (Live Google Visualization API) ---> [ Swifts Website ]
(Committee edits rows)                                           (Updates in real-time)
```

* **Live Connected Sheet**: [Birmingham Swifts Website CMS](https://docs.google.com/spreadsheets/d/1tNdQuPdBsQifwQJttXNJwoZzH9H3bg5eKp2gaA0ajbw/edit)
* **Sheet ID**: `1tNdQuPdBsQifwQJttXNJwoZzH9H3bg5eKp2gaA0ajbw` (configured in `script.js`).
* **Format**: Anyone with the link can view. The website queries each tab directly via the Google Visualization API with `headers=1`.

---

## 📑 Spreadsheet Tabs & Column Specifications

The CMS synchronizes the following **8 tabs** in real time:

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
| `thursday` | `Thursday Evening • Main Run` | `⏰ 6:30 PM Bag Drop • 6:50 PM Meet (7:00 PM Start)` | `Main Club Social Run (5k/7k/10k)` | `Meet: Pagoda Island • Bag Drop & Social: The Fox, Gay Village` | `Our official flagship weekly club run along Birmingham canals welcoming all abilities.` | `🎒 Bag Drop 6:30 PM @ The Fox, 5k & 7k Routes, All Abilities, Tail Runners` | `TRUE` |
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
| `Club Runner & Tasters` | `£0` | `open to all` | `Join Thursday social runs & weekend meetups, Bag drop 6:30 PM at The Fox (Gay Village), 5k 7k & 10k friendly group runs, Friendly run leaders & tail runners, Post-run social drinks at The Fox` | `FALSE` |
| `Club Supporter Member` | `£15` | `year` | `Official Birmingham Swifts membership, Club kit discounts, Swiftember challenge entry & awards, Private club WhatsApp & community, Supports club equipment & run leader training` | `TRUE` |
| `England Athletics Affiliated` | `£35` | `year` | `All Club Supporter benefits included, Official EA registration, £2+ discount on UK road & trail races, London Marathon club ballot entry, Personal race insurance` | `FALSE` |

---

### Tab 5: `Coaches`
Controls the coaches directory on the Coaches & Leaders page.

| name | role | qualification | bio | image | specialties |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Alice Smith` | `Head Coach` | `CiRF / EA Level 2` | `Coaching endurance and marathon pacing since 2018.` | `assets/portrait_coach_alice.jpg` | `Marathon, Technique, Strength` |

---

### Tab 6: `Run_Leaders`
Controls the run leaders directory on the Coaches & Leaders page.

| name | role | qualification | bio | image | pace_groups |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Christopher Lee` | `Run Leader` | `LiRF Qualified` | `Leads Group 3 and Thursday canal social runs.` | `assets/portrait_coach_christopher.jpg` | `Group 3 (6:00-6:45), 5k-10k` |

---

### Tab 7: `Committee`
Controls the committee directory on the Committee page.

| name | role | email | bio | image |
| :--- | :--- | :--- | :--- | :--- |
| `Gabriel Stirling` | `Club Chair` | `chair@birminghamswifts.co.uk` | `Guiding club strategy, welfare, and inclusive community outreach.` | `assets/portrait_gabriel_stirling.jpg` |

---

### Tab 8: `Club_News`
Controls news stories, race reports, and announcements on the News page.

| title | date | category | summary | image | link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Swifts Take Over Cannon Hill Parkrun!` | `October 2026` | `Community` | `Over 45 Swifts runners and volunteers took over Cannon Hill parkrun.` | `assets/swifts_cannon_hill_parkrun_takeover.jpg` | `#` |

---

### Tab 9: `FAQs`
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
