// Task 1 — Modal System
// Three buttons open three different modals. Closes on
// button click, overlay click, or Escape key. Locks body
// scroll while open.

// --- Element references ---
const overlay = document.querySelector("#overlay");
const allModals = document.querySelectorAll(".modal");
const openButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".modal-close");

/**
 * openModal(id)
 * Shows the overlay and the requested modal, and locks page scroll.
 */
function openModal(id) {
    // Hide any modals that happen to be visible
    allModals.forEach(m => m.classList.remove("active"));

    // Show the requested one
    const target = document.querySelector(`#${id}`);
    if (target) target.classList.add("active");

    // Show the overlay
    overlay.classList.add("open");

    // Lock scrolling on the body
    document.body.style.overflow = "hidden";
}

/**
 * closeModal()
 * Hides the overlay, removes the active state, and re-enables scrolling.
 */
function closeModal() {
    overlay.classList.remove("open");
    allModals.forEach(m => m.classList.remove("active"));
    document.body.style.overflow = "";
}

// --- Open buttons: read the data-modal target and open it ---
openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        openModal(btn.dataset.modal);
    });
});

// --- Close buttons inside each modal ---
closeButtons.forEach(btn => {
    btn.addEventListener("click", closeModal);
});

// --- Click on the overlay (outside the modal box) closes it.
//     The check for event.target === overlay ensures clicks
//     inside the modal itself don't close it. ---
overlay.addEventListener("click", event => {
    if (event.target === overlay) {
        closeModal();
    }
});

// --- Escape key closes any open modal ---
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && overlay.classList.contains("open")) {
        closeModal();
    }
});

//  Dark mode toggle with localStorage persistence


const themeToggle = document.querySelector("#theme-toggle");

/**
 * applyTheme(theme)
 * Adds or removes the .dark class on <body> and saves the choice.
 */
function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️ Light mode";
    } else {
        document.body.classList.remove("dark");
        themeToggle.textContent = "🌙 Dark mode";
    }
    localStorage.setItem("theme", theme);
}

// On page load, apply the saved theme (or default to light)
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

// Toggle on click
themeToggle.addEventListener("click", () => {
    const currentlyDark = document.body.classList.contains("dark");
    applyTheme(currentlyDark ? "light" : "dark");
});