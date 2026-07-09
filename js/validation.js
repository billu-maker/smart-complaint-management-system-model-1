/**
 * Kanyakumari Municipality Smart Complaint Management System
 * Form Validation and Real-time Helpers
 */

const Validation = {
  /**
   * Validates standard 10-digit mobile numbers (Indian format)
   * @param {string} phone 
   * @returns {boolean}
   */
  isValidPhone(phone) {
    const cleanPhone = phone.trim().replace(/[\s-+]/g, '');
    const phoneRegex = /^[6-9]\d{9}$/; // Starts with 6,7,8,9 followed by 9 digits
    return phoneRegex.test(cleanPhone);
  },

  /**
   * Validates email address format
   * @param {string} email 
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  /**
   * Marks a form group as erroneous and displays message
   * @param {HTMLElement} inputEl 
   * @param {string} message 
   */
  setError(inputEl, message) {
    const group = inputEl.closest(".form-group");
    if (!group) return;
    
    group.classList.add("error");
    
    // Check if error message element already exists
    let errorMsg = group.querySelector(".error-text");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.className = "error-text";
      group.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
  },

  /**
   * Clears error indicator on a form group
   * @param {HTMLElement} inputEl 
   */
  clearError(inputEl) {
    const group = inputEl.closest(".form-group");
    if (!group) return;
    
    group.classList.remove("error");
    const errorMsg = group.querySelector(".error-text");
    if (errorMsg) {
      errorMsg.remove();
    }
  },

  /**
   * Sets up real-time feedback and validation listeners on a form
   * @param {HTMLFormElement} form 
   */
  setupRealtimeValidation(form) {
    const fields = form.querySelectorAll("input, select, textarea");
    
    fields.forEach(field => {
      // Validate on blur or input depending on field type
      field.addEventListener("blur", () => this.validateField(field));
      field.addEventListener("input", () => {
        // If there is an existing error, validate as they type to clear it quickly
        const group = field.closest(".form-group");
        if (group && group.classList.contains("error")) {
          this.validateField(field);
        }
      });
    });

    // Special listener for character counter on Description
    const descField = form.querySelector("#complaintDescription");
    const descCounter = form.querySelector("#descCounter");
    if (descField && descCounter) {
      const maxLength = descField.getAttribute("maxlength") || 500;
      descField.addEventListener("input", () => {
        const remaining = descField.value.length;
        descCounter.textContent = `${remaining} / ${maxLength} characters`;
      });
    }
  },

  /**
   * Validates a single input element
   * @param {HTMLElement} field 
   * @returns {boolean}
   */
  validateField(field) {
    const val = field.value.trim();
    const isRequired = field.hasAttribute("required");
    const id = field.id;

    // 1. Required Check
    if (isRequired && !val) {
      this.setError(field, `${field.previousElementSibling?.textContent.replace('*', '').trim() || 'This field'} is required.`);
      return false;
    }

    // 2. Format Checks
    if (val) {
      if (id === "phone") {
        if (!this.isValidPhone(val)) {
          this.setError(field, "Please enter a valid 10-digit mobile number (e.g., 9876543210).");
          return false;
        }
      }
      
      if (id === "email") {
        if (!this.isValidEmail(val)) {
          this.setError(field, "Please enter a valid email address (e.g., citizen@example.com).");
          return false;
        }
      }

      if (id === "complaintTitle") {
        if (val.length < 10) {
          this.setError(field, "Title must be at least 10 characters long.");
          return false;
        }
      }

      if (id === "complaintDescription") {
        if (val.length < 30) {
          this.setError(field, "Please describe your complaint in more detail (at least 30 characters).");
          return false;
        }
      }
    }

    this.clearError(field);
    return true;
  },

  /**
   * Validates the entire form before submission
   * @param {HTMLFormElement} form 
   * @returns {boolean}
   */
  validateForm(form) {
    const fields = form.querySelectorAll("input, select, textarea");
    let isValid = true;

    fields.forEach(field => {
      const isFieldValid = this.validateField(field);
      if (!isFieldValid) {
        isValid = false;
      }
    });

    return isValid;
  }
};

// Export to window
window.Validation = Validation;
