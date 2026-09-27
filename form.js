// Task 2 — Real-time Form Validation
// Each field validates on every keystroke. The submit button
// stays disabled until every field passes.

// --- Field references ---
const form = document.querySelector("#register-form");
const submitBtn = document.querySelector("#submit-btn");

const fields = {
    name: {
        input: document.querySelector("#name"),
        icon: document.querySelector("#name-icon"),
        error: document.querySelector("#name-error"),
        validate: validateName
    },
    email: {
        input: document.querySelector("#email"),
        icon: document.querySelector("#email-icon"),
        error: document.querySelector("#email-error"),
        validate: validateEmail
    },
    phone: {
        input: document.querySelector("#phone"),
        icon: document.querySelector("#phone-icon"),
        error: document.querySelector("#phone-error"),
        validate: validatePhone
    },
    password: {
        input: document.querySelector("#password"),
        icon: document.querySelector("#password-icon"),
        error: document.querySelector("#password-error"),
        validate: validatePassword
    }
};

// --- Validation rules ---

/**
 * validateName(value)
 * At least 2 characters.
 */
function validateName(value) {
    if (value.trim().length < 2) {
        return { valid: false, message: "Name must be at least 2 characters." };
    }
    return { valid: true, message: "" };
}

/**
 * validateEmail(value)
 * Must contain @ and at least one . after the @.
 */
function validateEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
        return { valid: false, message: "Email must contain @ and a dot after it (e.g., name@example.com)." };
    }
    return { valid: true, message: "" };
}

/**
 * validatePhone(value)
 * Exactly 10 digits, starting with 07 or 01 (Kenyan format).
 */
function validatePhone(value) {
    const regex = /^0[17]\d{8}$/;
    if (!regex.test(value)) {
        return { valid: false, message: "Phone must be 10 digits starting with 07 or 01." };
    }
    return { valid: true, message: "" };
}

/**
 * validatePassword(value)
 * At least 8 characters, at least 1 uppercase, at least 1 number.
 */
function validatePassword(value) {
    if (value.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters." };
    }
    if (!/[A-Z]/.test(value)) {
        return { valid: false, message: "Password must include at least one uppercase letter." };
    }
    if (!/[0-9]/.test(value)) {
        return { valid: false, message: "Password must include at least one number." };
    }
    return { valid: true, message: "" };
}

// --- Applying the validation result to the DOM ---

/**
 * updateField(field)
 * Runs the field's validator, then updates the input border,
 * the icon, and the error message.
 */
function updateField(field) {
    const value = field.input.value;
    const result = field.validate(value);

    // Clear previous state
    field.input.classList.remove("valid", "invalid");
    field.icon.classList.remove("valid", "invalid");

    // Only show validation feedback once the user has typed something.
    // Empty fields stay neutral until then.
    if (value === "") {
        field.icon.textContent = "";
        field.error.textContent = "";
        return false;
    }

    if (result.valid) {
        field.input.classList.add("valid");
        field.icon.classList.add("valid");
        field.icon.textContent = "✓";
        field.error.textContent = "";
    } else {
        field.input.classList.add("invalid");
        field.icon.classList.add("invalid");
        field.icon.textContent = "✗";
        field.error.textContent = result.message;
    }

    return result.valid;
}

/**
 * allValid()
 * Returns true only if every field passes validation and
 * every field has a value.
 */
function allValid() {
    let valid = true;

    for (const key in fields) {
        const field = fields[key];
        const value = field.input.value;

        if (value === "") {
            valid = false;
            continue;
        }

        const result = field.validate(value);
        if (!result.valid) valid = false;
    }

    return valid;
}

// --- Wire up input listeners ---
for (const key in fields) {
    const field = fields[key];

    field.input.addEventListener("input", () => {
        updateField(field);
        submitBtn.disabled = !allValid();
    });
}

// --- Submit handling ---
form.addEventListener("submit", event => {
    event.preventDefault();

    // Build a plain object from the form values
    const data = {
        name: fields.name.input.value.trim(),
        email: fields.email.input.value.trim(),
        phone: fields.phone.input.value.trim(),
        password: fields.password.input.value
    };

    console.log("Form submitted:", data);
    alert(`Welcome, ${data.name}! Check the console for the submitted data.`);
});