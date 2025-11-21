// Form Validation
const leadForm = document.getElementById('leadForm');
const formSuccess = document.getElementById('formSuccess');

// Validation rules
const validators = {
    fullName: (value) => {
        if (!value.trim()) return 'Please enter your full name';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return null;
    },

    businessType: (value) => {
        if (!value) return 'Please select a business type';
        return null;
    },

    whatsappNumber: (value) => {
        if (!value.trim()) return 'Please enter your WhatsApp number';
        // Basic phone validation (allows various formats)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
        if (value.replace(/\D/g, '').length < 10) return 'Phone number must be at least 10 digits';
        return null;
    },

    messageVolume: (value) => {
        if (!value) return 'Please select your message volume';
        return null;
    }
};

// Show error message
function showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    const inputElement = document.getElementById(fieldName);

    if (errorElement && inputElement) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
        inputElement.style.borderColor = 'var(--color-error)';
    }
}

// Clear error message
function clearError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    const inputElement = document.getElementById(fieldName);

    if (errorElement && inputElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('active');
        inputElement.style.borderColor = '';
    }
}

// Validate single field
function validateField(fieldName, value) {
    const validator = validators[fieldName];
    if (!validator) return true;

    const error = validator(value);
    if (error) {
        showError(fieldName, error);
        return false;
    } else {
        clearError(fieldName);
        return true;
    }
}

// Real-time validation on blur
if (leadForm) {
    const fields = ['fullName', 'businessType', 'whatsappNumber', 'messageVolume'];

    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => {
                validateField(fieldName, field.value);
            });

            field.addEventListener('input', () => {
                // Clear error on input
                const errorElement = document.getElementById(`${fieldName}Error`);
                if (errorElement && errorElement.classList.contains('active')) {
                    clearError(fieldName);
                }
            });
        }
    });

    // Form submission
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        const formData = new FormData(leadForm);

        fields.forEach(fieldName => {
            const value = formData.get(fieldName);
            if (!validateField(fieldName, value)) {
                isValid = false;
            }
        });

        if (!isValid) {
            // Scroll to first error
            const firstError = document.querySelector('.form-error.active');
            if (firstError) {
                firstError.parentElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
            return;
        }

        // Disable submit button
        const submitButton = leadForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        try {
            // ============================================
            // GOOGLE APPS SCRIPT CONFIGURATION
            // ============================================
            // TODO: Replace this URL with your deployed Google Apps Script URL
            // See GOOGLE_SCRIPT_SETUP.md for deployment instructions
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby8QtLSgu45KHTrJNnL0ucI4wXez376FQyXoCsdkf94JfGgYITP-EbGBzINzsIm75JJ_w/exec';

            // Check if script URL is configured
            if (SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
                throw new Error('Google Apps Script URL not configured. Please see GOOGLE_SCRIPT_SETUP.md');
            }

            // Prepare data for submission
            const submissionData = {
                fullName: formData.get('fullName'),
                businessType: formData.get('businessType'),
                whatsappNumber: formData.get('whatsappNumber'),
                messageVolume: formData.get('messageVolume')
            };

            // Send to Google Apps Script
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });

            // Note: With 'no-cors' mode, we can't read the response
            // But if no error is thrown, the request was sent successfully

            // Show success message
            leadForm.style.display = 'none';
            formSuccess.classList.add('active');

            // Log for debugging
            console.log('Form submitted successfully:', submissionData);

        } catch (error) {
            console.error('Form submission error:', error);

            // Show user-friendly error message
            let errorMessage = 'There was an error submitting the form. Please try again.';

            if (error.message.includes('not configured')) {
                errorMessage = 'Form is not yet configured. Please contact support.';
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage = 'Network error. Please check your connection and try again.';
            }

            alert(errorMessage);
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}
