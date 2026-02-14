# CLAUDE.md

## Repository Overview

**PrintPro** is a customer service web application for a document printing business. It provides a public-facing site where customers can browse services, read FAQs, submit inquiries, track orders, and chat with a support agent — plus an admin dashboard for managing orders, messages, and support tickets.

The app is built entirely with **plain HTML, CSS, and vanilla JavaScript** with no frameworks, build tools, or backend. Data is persisted in the browser via `localStorage`.

## Project Structure

```
/
├── index.html              # Landing page — service overview, pricing highlights
├── faq.html                # FAQ page with accordion
├── contact.html            # Contact form (saves messages to localStorage)
├── track.html              # Order lookup by ID + support ticket submission
├── admin/
│   ├── dashboard.html      # Admin overview — stats, recent orders/messages/tickets
│   ├── orders.html         # Order management — create, update status, filter
│   ├── messages.html       # View & manage contact form submissions
│   └── tickets.html        # Support ticket management — resolve/reopen
├── css/
│   └── style.css           # Shared stylesheet (CSS custom properties, responsive)
├── js/
│   ├── store.js            # LocalStorage data layer (orders, messages, tickets, chat)
│   └── chat.js             # Floating live-chat widget (keyword-based auto-replies)
├── README.md               # GitHub profile README
└── CLAUDE.md               # This file — AI assistant guidance
```

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Markup      | HTML5                               |
| Styling     | CSS3 (custom properties, grid, flexbox) |
| Logic       | Vanilla JavaScript (ES6+, IIFE module pattern) |
| Persistence | `localStorage` (JSON serialization) |
| Backend     | None — fully client-side            |

## Key Conventions

- **No build step.** Open any `.html` file directly in a browser.
- **No dependencies.** No `package.json`, npm, or CDN imports.
- **Data store pattern.** All data access goes through `js/store.js` via the `Store` global object. Never read/write `localStorage` directly elsewhere.
- **HTML escaping.** User-supplied strings are escaped via a `escapeHtml()` helper defined in each page's inline script to prevent XSS.
- **CSS custom properties.** Colors, spacing, and shadows are defined as CSS variables in `:root` in `css/style.css`. Use these instead of hard-coded values.
- **Responsive.** The layout adapts via CSS grid `auto-fit` and a `@media (max-width: 768px)` breakpoint.

## Data Model (localStorage keys)

| Key            | Type     | Description                         |
|----------------|----------|-------------------------------------|
| `ps_orders`    | Array    | Print orders with status tracking   |
| `ps_messages`  | Array    | Contact form submissions            |
| `ps_tickets`   | Array    | Support tickets linked to orders    |
| `ps_chat`      | Array    | Chat widget message history         |

Demo data is seeded automatically on first load via `Store.seedIfEmpty()`.

## How to Run

1. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).
2. Navigate using the top navbar.
3. Access the admin panel via the "Admin" button in the top-right corner.

No server, no install, no build required.

## How to Make Changes

- **Styling:** Edit `css/style.css`. Use existing CSS variables.
- **Data logic:** Edit `js/store.js`. Keep the `Store` IIFE pattern.
- **Chat responses:** Edit the `getAgentReply()` function in `js/chat.js`.
- **Pages:** Edit the corresponding `.html` file. Each page is self-contained with inline `<script>` for page-specific logic.
- **Admin pages:** All under `admin/`. They reference `../css/style.css` and `../js/store.js`.

## For AI Assistants

- Always use the `Store` API for data operations. Do not access `localStorage` directly.
- Escape user input before inserting into the DOM (use `escapeHtml()`).
- Keep pages self-contained — each HTML file includes its own inline script.
- The chat widget (`js/chat.js`) is injected into every customer-facing page. Admin pages do not include it.
- There are no tests, linters, or CI. Validate changes by opening pages in the browser.
- The default branch is `master`.
