// DOM Elements Retrieval
const nameInput = document.getElementById('name');
const nameErrorEl = document.getElementById('nameError');
const surnameInput = document.getElementById('surname');
const surnameErrorEl = document.getElementById('surnameError');
const emailInput = document.getElementById('email');
const queryErrorEl = document.getElementById('queryError');
const emailErrorEl = document.getElementById('emailError');
const messageText = document.getElementById('message');
const messageErrorEl = document.getElementById('messageError');
const consentErrorEl = document.getElementById('consentError');
const successPop = document.getElementById('popup');
const form = document.getElementById('form');

// ==== EVENT LISTENERS ==== //
form.addEventListener('submit', handleSubmit);

// ==== FUNCTIONS ==== //

function validateName(input, errorEl) {
    const value = input.value.trim();

    if (value.length === 0) {
        showError(input, "This field is required", errorEl);
        return false;
    } else if (value.length < 2) {
        showError(input, "Must be at least 2 characters", errorEl);
        return false;
    } else {
        clearError(input, errorEl);
        return true;
    }  
}

function validateEmail(input, errorEl) {

    const email = input.value.trim();

    if (!email) {
        showError(input, 'This field is required', errorEl);
        return false;
    } else if (!isValidEmail(email)) {
        showError (input, 'Please enter a valid email address', errorEl);
        return false;
    } else {
        clearError(input, errorEl);
        return true;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateQuery(errorEl) {
    const queryType = document.querySelector('input[name="queryType"]:checked');
    if(!queryType) {
        showError(null, "Please select a query type", errorEl);
        return false;
    } else {
        clearError(null, errorEl);
        return true;
    }
}

function validateMessage(input, errorEl) {
    const value = input.value.trim();
    if (value.length === 0) {
        showError(input, "This field is required", errorEl);
        return false;
    } else if (value.length < 50) {
        showError(input, "Must be at least 50 characters", errorEl);
        return false;
    } else {
        clearError(input, errorEl);
        return true;
    }  
}  

function validateConsent(errorEl) {
    const consent = document.querySelector('input[name="consent"]:checked');
    if(!consent) {
        showError(null, "To submit this form, please consent to being contacted", errorEl);
        return false;
    } else {
        clearError(null, errorEl);
        return true;
    }
}

function showError(inputEl, message = '', errorEl = null) {
    if (inputEl) {
        inputEl.classList.add('invalid');
        inputEl.setAttribute('aria-invalid', 'true');
    }
    if (errorEl) {
        errorEl.textContent = message;
    }
}

function clearError(inputEl, errorEl = null) {
    if (inputEl)  {
        inputEl.classList.remove('invalid');
        inputEl.setAttribute('aria-invalid', 'false');
    }
    if (errorEl) {
        errorEl.textContent = '';
    }
}

function handleSubmit(e) {
    e.preventDefault();

    const nameValid = validateName(nameInput, nameErrorEl);
    const surnameValid = validateName(surnameInput, surnameErrorEl);
    const emailValid = validateEmail(emailInput, emailErrorEl);
    const queryValid = validateQuery(queryErrorEl);
    const messageValid = validateMessage(messageText, messageErrorEl);
    const consentValid = validateConsent(consentErrorEl);

    if (nameValid && surnameValid && emailValid && queryValid && messageValid && consentValid) {
        showSuccess();
        successPop.scrollIntoView({ behavior: 'smooth' });
    } else {
        if (!nameValid) {
            nameInput.focus();
        } else if (!surnameValid) {
           surnameInput.focus(); 
        } else if (!emailValid) {
            emailInput.focus();
        } else if (!queryValid) {
           document.getElementById('queryGeneral').focus();
        } else if (!messageValid) {
            messageText.focus();
        } else if (!consentValid) {
            document.getElementById('consent').focus();
        } 
    }
}

function showSuccess() {
    successPop.classList.remove('hidden');
    form.reset();
}
