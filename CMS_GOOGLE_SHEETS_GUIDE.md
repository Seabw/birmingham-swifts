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
| `stat_pace_groups` | `6` | Number of pace groups counter |
| `stat_inclusive` | `100%` | Inclusivity badge stat |
| `contact_email` | `info@birmingham-swifts.co.uk` | Committee contact email |

---

### Tab 2: `Weekly_Runs`
Controls the weekly run timetable cards and day filtering on the website.

| day | day_label | time | title | location | description | paces | active |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `tuesday` | `Tuesday Evening` | `⏰ 6:45 PM – 8:00 PM` | `Speed, Intervals & Track Training` | `University of Birmingham Track` | `Structured interval workout to build endurance.` | `All Abilities, Coached Intervals, Floodlit Track` | `TRUE` |
| `thursday` | `Thursday Evening` | `⏰ 7:00 PM Meet` | `Main Club Social Run (5k/7k/10k)` | `Nightingale Club, Gay Village` | `Our flagship club run along the canals. 5 pace groups.` | `Walk / Jog, 7:00-8:00, 6:00-7:00, 5:00-6:00, <5:00` | `TRUE` |
| `saturday` | `Saturday Morning` | `⏰ 8:45 AM Meet` | `Swifts Parkrun Tourism & Coffee` | `Cannon Hill / Edgbaston / Perry Hall` | `Join the Swifts team at local 5k parkruns followed by coffee.` | `Free 5km, Tourism, Coffee & Cake` | `TRUE` |
| `sunday` | `Sunday Morning` | `⏰ 9:30 AM Meet` | `Sunday Social Long Run (10k-21k)` | `Sutton Park / Lickey Hills` | `Longer scenic trail miles preparing for half marathons.` | `10k-15k, Half Marathon, Scenic Trails` | `TRUE` |

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
| `Free Taster` | `£0` | `first session` | `Join any Tuesday or Thursday run, Meet run leaders and members, No commitment required, Tail walker support guarantee` | `FALSE` |
| `Full Swifts Member` | `£15` | `year` | `Access to all 4 weekly runs, Official club kit discount, Entry to Swiftember leagues, Private WhatsApp & Strava club, Social nights & awards dinner` | `TRUE` |
| `England Athletics Affiliated` | `£35` | `year` | `All Full Swifts Member benefits, Official EA registration, £2 discount on UK road races, London Marathon club ballot, Personal race insurance` | `FALSE` |

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
