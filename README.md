# Ctrl+Dev 🚀

**Tech Event Discovery Platform** — a fully client-side web app for discovering, registering for, and managing tech events, hackathons, and summits.

Built with vanilla HTML, CSS, and JavaScript — no frameworks, no backend, no build step. All data (users, sessions, registrations, wishlists, theme preference) is persisted entirely in the browser via `localStorage`.

---

## 🌐 Live Demo (GitHub Pages)
https://angiedmn.github.io/ctrl-dev/

---

## ✨ Features

### Event Discovery
- **Events grid** with live **search-by-name** and **category filtering** (AI/ML, Data, Blockchain, Security, Management, Web Dev)
- **Featured event spotlight** banner on the Events page
- **Dynamic event detail pages** — stats, "Why Attend" highlights, speaker cards, day-by-day schedule, sponsors, and testimonials, all rendered from a central events data array
- **Past events** showcase highlighting previous successful events
- **Interactive venue map** — embedded Google Maps view on the Events page so attendees can navigate to event locations (main stage, hackathon hub, etc.) directly

### Authentication (simulated, client-side)
- Modal-based **Sign Up / Sign In** flow with mode toggling
- Accounts stored in `localStorage` (`appUsers`); active session stored separately (`userSession`)
- Authenticated state swaps the navbar **Login** button for a **profile dropdown** with avatar, wishlist count, theme toggle, and sign-out
- Registration form **auto-fills** name, email, and college from the logged-in session

### Personalization
- **Wishlist system** — heart/save events, view them on a dedicated Wishlist page, with live count badge in the nav dropdown
- **My Registrations** page listing all events a user has signed up for
- **Light / Dark theme toggle**, persisted across sessions and applied instantly on page load (via an inline blocking script to avoid theme flash)

### UI/UX Details
- **Glassmorphism** design system (frosted-glass cards/nav) with a looping background video
- Custom **animated "spin-text"** hover effect that splits headings into individually spinning characters
- **Toast notification system** for success/error feedback (login, logout, registration, etc.)
- **Hero slider** with autoplay, dot navigation, and a live event **countdown**
- Custom cursor glow effect on the hero section
- Fully **responsive** layout with mobile breakpoints

---

## 🗂️ Project Structure

```
.
├── index.html            # Landing page (hero, stats, features, testimonials)
├── events.html            # Event listing with search & category filters
├── event-details.html     # Dynamic single-event detail page
├── register.html          # Registration form + pricing tiers + FAQ
├── registrations.html     # "My Registrations" dashboard (auth required)
├── wishlists.html          # "My Wishlist" dashboard (auth required)
├── style.css                # Global styles, theming, glassmorphism, responsive rules
└── script.js                 # All app logic (see below)
```

---

## 🧠 How It Works

Since there's no backend, `script.js` does all the heavy lifting on `DOMContentLoaded`:

| # | Responsibility |
|---|---|
| 1 | Rearranges navbar layout (profile slot ↔ logo) |
| 2 | Theme toggle + `localStorage` persistence |
| 3 | Toast notification system |
| 4 | "Spin-text" character hover animation |
| 5 | **`eventsData`** — the master in-memory array of all events (id, name, date, category, venue, stats, speakers, schedule, sponsors, testimonials, etc.) |
| 6 | Renders the event cards grid on `events.html`, with search + filter logic |
| 7 | Renders the full event detail page on `event-details.html` from a `?id=` query param |
| 8 | Renders the Wishlist page |
| 9 | Renders the Registrations page |
| 10 | Registration form handling and syncing to the logged-in user's session |
| 11 | Intercepts internal link clicks for page-transition effects |
| 12 | Hero countdown timer + auto-scrolling slider |
| 13 | Full auth system: sign up, sign in, sign out, session + dropdown management |

### Data model (all in `localStorage`)
- `appUsers` — array of registered accounts `{ name, email, college, password, wishlist }`
- `userSession` — the currently logged-in user's session snapshot
- `theme` — `"light"` or `"dark"`

> ⚠️ Passwords are stored in plain text in `localStorage` purely for demo purposes — **this is not a secure auth system** and should never be used as-is in production.

---

## 🎨 Design System

- CSS custom properties (`--primary-color`, `--secondary-color`, `--card-bg`, etc.) defined in `:root` and overridden under `[data-theme="dark"]`
- Primary accent color: `#8B5CF6` (violet), with a lighter hover shade in dark mode
- Reusable utility classes: `.glass`, `.cta-btn`, `.focus-target`, `.spin-text`, `.content-section`, `.events-grid`
- Background video (`assets.codepen.io`) with a dark overlay for readability on every page

---

## 🚀 Getting Started

No build tools or dependencies required.

1. Clone or download this repository
2. Open `index.html` directly in a browser, **or** serve the folder locally for the smoothest experience:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
3. Navigate to `http://localhost:8000` (or the port shown)

### Try it out
- Click **Login** → **Sign Up** to create an account
- Browse **Events**, search/filter, and click into an event's detail page, go to map navigation
- Wishlist an event and check it on the **Wishlist** page (from the profile dropdown)
- Register for an event and view it under **My Registrations**
- Toggle the 🌓 icon to switch between light and dark themes

---

## 🛠️ Tech Stack

- **HTML5** — semantic markup across 7 pages
- **CSS3** — custom properties, flexbox/grid, glassmorphism, responsive media queries
- **Vanilla JavaScript (ES6+)** — DOM rendering, `localStorage`-backed state, no frameworks or bundlers

---

## 📌 Known Limitations / Notes

- Client-side-only auth: data doesn't persist across browsers/devices and isn't secure — a real deployment would need a backend + hashed credentials
- Event data is hardcoded in `script.js` rather than fetched from an API
- Some images/videos are pulled from external CDNs (Unsplash, CodePen, etc.) and require an internet connection

---
