# Week 2 Day 4 — Events Deep Dive

Three interactive browser features built with event handling,
event delegation patterns, and the HTML5 Drag and Drop API.

## Files

| File | Purpose |
|---|---|
| `modal.html` / `modal.js` | Modal system with overlay, Escape key, and scroll lock |
| `form.html` / `form.js` | Real-time form validation with specific error messages |
| `drag.html` / `drag.js` | Drag-and-drop reorderable priority list |
| `styles.css` | Shared stylesheet with CSS custom properties for dark mode |

## Live Demo (GitHub Pages)

- Modal: https://OtienoMartha.github.io/week-2-day-4-assignment/modal.html
- Form: https://OtienoMartha.github.io/week-2-day-4-assignment/form.html
- Drag list: https://OtienoMartha.github.io/week-2-day-4-assignment/drag.html

## Screenshots

### Task 1 — Modal (with bonus dark mode)
![Modal](screenshots/modal.png)

### Task 2 — Form Validation
![Form](screenshots/form.png)

### Task 3 — Drag and Drop
![Drag](screenshots/drag.png)

## What I Built

### Task 1 — Modal System
Three "Learn More" buttons, each opening a different modal. Closes on
button click, overlay click, or Escape key. Locks page scroll while open.
Fade-in transition on the overlay.

### Task 2 — Real-Time Form Validation
Validates name, email, Kenyan phone number, and password on every keystroke.
Green border and ✓ for valid, red border and ✗ for invalid with a specific
error message. Submit button is disabled until every field passes.

### Task 3 — Drag and Drop Priority List
Five tasks reorderable by drag and drop using the native HTML5 API. Priority
numbers update automatically. The dragged item becomes semi-transparent and
moves live into position as you drag.

### Bonus — Dark Mode with localStorage
Toggle in the top-right switches between light and dark themes. All colours
come from CSS custom properties, and the choice is saved in localStorage so
it persists across page refreshes.

## What I Practiced

- Event listeners: `click`, `input`, `keydown`, `dragstart`, `dragover`, `drop`, `dragend`
- The `event.target === overlay` pattern for outside-click detection
- `document.body.style.overflow` for scroll locking
- Real-time validation with regex (`/^0[17]\d{8}$/`, email pattern)
- HTML5 Drag and Drop with `dataTransfer` and `insertBefore`
- CSS custom properties and theme switching
- `localStorage` for persistence