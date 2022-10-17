// query selectors for all input and form elements
const firstname_El = document.querySelector('#fname');
const lastname_El = document.querySelector('#lname');
const email_El = document.querySelector('#email');
const age_El = document.querySelector('#age');
const phnumber_El = document.querySelector('#phnumber');
const password1_El = document.querySelector('#password1');
const password2_El = document.querySelector('#password2');
const form = document.querySelector('#registration');
const button = document.querySelector('#submit');

// utility function for checking empty input field
const isRequired = value => value === '' ? false : true;

// utility function for checking name length between given characters
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// utility function for checking range of given age numbers
const inRange = (value, min, max) => value < min || value > max ? false : true;

// utility function for checking length of phone number
const isValid = (length, range) => length != range ? false : true;

// utility function for checking email against regular expression
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// utility function for checking password against regualr expression
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
    return re.test(password);
};

// function for showing error message
const showError = (input, message) => {
    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

// function for showing error message
const showSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = 'Valid';
}


// function for validating first name of user
const checkFirstname = () => {
    let valid = false;
    const min = 3, max = 25;
    const name = firstname_El.value.trim();

    if (!isRequired(name)) {
        showError(firstname_El, 'Name cannot be blank.');
    } else if (!isBetween(name.length, min, max)) {
        showError(firstname_El, `Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(firstname_El);
        valid = true;
    }
    return valid;
}

// function for validating last name of user
const checkLastname = () => {
    let valid = false;
    const min = 3, max = 25;
    const name = lastname_El.value.trim();

    if (!isRequired(name)) {
        showError(lastname_El, 'Name cannot be blank.');
    } else if (!isBetween(name.length, min, max)) {
        showError(lastname_El, `Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lastname_El);
        valid = true;
    }
    return valid;
}

// function for validating email of user
const checkEmail = () => {
    let valid = false;
    const email = email_El.value.trim();

    if (!isRequired(email)) {
        showError(email_El, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(email_El, 'Email is not valid.')
    } else {
        showSuccess(email_El);
        valid = true;
    }
    return valid;
}

// function for validating age of user
const checkAge = () => {
    let valid = false;
    const min = 18, max = 60;
    const age = age_El.value.trim();

    if (!isRequired(age)) {
        showError(age_El, 'Age cannot be blank.');
    } else if (!inRange(age, min, max)) {
        showError(age_El, `Age must be between ${min} and ${max} years.`)
    } else {
        showSuccess(age_El);
        valid = true;
    }
    return valid;
}

// function for validating phone number of user
const checkPhnumber = () => {
    let valid = false;
    const range = 11;
    const phnumber = phnumber_El.value.trim();

    if (!isRequired(phnumber)) {
        showError(phnumber_El, 'Contact number cannot be blank.');
    } else if (!isValid(phnumber.length, range)) {
        showError(phnumber_El, `Contact number must be of ${range} digits`);
    } else {
        showSuccess(phnumber_El);
        valid = true;
    }
    return valid;
}

// function for validating password of user
const checkPassword = () => {
    let valid = false;
    const password = password1_El.value.trim();

    if (!isRequired(password)) {
        showError(password1_El, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(password1_El, 'Password must have at least 1 lowercase character, 1 uppercase characters, and 1 number.');
    } else {
        showSuccess(password1_El);
        valid = true;
    }
    return valid;
};

// function for validating re-entered password of user
const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassword = password2_El.value.trim();
    const password = password1_El.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(password2_El, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(password2_El, 'Passwords do not match');
    } else {
        showSuccess(password2_El);
        valid = true;
    }
    return valid;
};


// form event listener to call above validation functions
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isFirstNameValid = checkFirstname(),
        isLastNameValid = checkLastname(),
        isEmailValid = checkEmail(),
        isAgeValid = checkAge(),
        isPhNumberValid = checkPhnumber(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    
    let isFormValid = isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isAgeValid &&
        isPhNumberValid &&
        isPasswordValid &&
        isConfirmPasswordValid

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'fname':
            checkFirstname();
            break;
        case 'lname':
            checkLastname();
            break;
        case 'email':
            checkEmail();
            break;
        case 'age':
            checkAge();
            break;
        case 'phnumber':
            checkPhnumber();
            break;
        case 'password1':
            checkPassword();
            break;
        case 'password2':
            checkConfirmPassword();
            break;
    }
}));

