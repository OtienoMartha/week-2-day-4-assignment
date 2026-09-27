// Task 3 — Drag and Drop Priority List
// Uses the native HTML5 Drag and Drop API. The dragged item
// moves live into the position under the cursor, so the user
// sees exactly where it will land.

const list = document.querySelector("#priority-list");

// Track the element currently being dragged
let draggedItem = null;

/**
 * updatePriorities()
 * Renumbers the "1.", "2.", "3." labels after every reorder.
 */
function updatePriorities() {
    const items = list.querySelectorAll("li");

    items.forEach((item, index) => {
        const label = item.querySelector(".priority");
        label.textContent = `${index + 1}.`;
    });
}

/**
 * getDragAfterElement(container, y)
 * Given a vertical mouse position, returns the element that
 * the dragged item should be inserted BEFORE.
 * Returns null if the dragged item should go to the end.
 *
 * This is the standard pattern for drag-and-drop reordering.
 */
function getDragAfterElement(container, y) {
    // All items except the one currently being dragged
    const items = [...container.querySelectorAll("li:not(.dragging)")];

    // Find the item whose vertical centre is closest to the
    // cursor, but still below it (offset is negative).
    return items.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// --- dragstart: remember the item, add visual class ---
list.addEventListener("dragstart", event => {
    const li = event.target.closest("li");
    if (!li) return;

    draggedItem = li;
    li.classList.add("dragging");

    // Required for Firefox to actually start a drag
    event.dataTransfer.setData("text/plain", "");
    event.dataTransfer.effectAllowed = "move";
});

// --- dragover: move the dragged item live into position ---
list.addEventListener("dragover", event => {
    event.preventDefault(); // Required to allow dropping

    if (!draggedItem) return;

    const afterElement = getDragAfterElement(list, event.clientY);

    if (afterElement == null) {
        list.appendChild(draggedItem);
    } else {
        list.insertBefore(draggedItem, afterElement);
    }
});

// --- drop: finalise the reorder ---
list.addEventListener("drop", event => {
    event.preventDefault();
    updatePriorities();
});

// --- dragend: clean up the visual state ---
list.addEventListener("dragend", () => {
    if (draggedItem) {
        draggedItem.classList.remove("dragging");
    }
    draggedItem = null;
    updatePriorities();
});

// --- Run once on load to normalise any pre-existing numbers ---
updatePriorities();