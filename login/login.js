const errorMessages = {
    ar: {
        invalidEmail: 'الرجاء إدخال بريد إلكتروني صالح',
        invalidPassword: 'كلمة المرور يجب أن تحتوي على حروف وأرقام، وأن تكون بين 6 و 20 حرفًا',
        emailNotRegistered: 'هذا البريد الإلكتروني غير مسجل',
        incorrectPassword: 'كلمة المرور غير صحيحة',
    },
    en: {
        invalidEmail: 'Please enter a valid email address',
        invalidPassword: 'Password must contain letters and numbers, and be between 6 and 20 characters',
        emailNotRegistered: 'This email is not registered',
        incorrectPassword: 'Incorrect password',
    },
};

const validateLogin = (event) => {
    event.preventDefault();

    const loginEmail = document.getElementById('email').value.trim();
    const loginPassword = document.getElementById('pass').value.trim();

    // Clear previous error messages
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';

    let hasError = false;

    // Determine the current language
    const isEnglish = document.querySelector(".slider-cradle").classList.contains("is-transitioned");
    const messages = isEnglish ? errorMessages.en : errorMessages.ar;

    const loginEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const loginPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

    // Validate email
    if (!loginEmailRegex.test(loginEmail)) {
        document.getElementById('email-error').textContent = messages.invalidEmail;
        hasError = true;
    }

    // Validate password
    if (!loginPasswordRegex.test(loginPassword)) {
        document.getElementById('password-error').textContent = messages.invalidPassword;
        hasError = true;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.email === loginEmail);

    if (!user) {
        document.getElementById('email-error').textContent = messages.emailNotRegistered;
        hasError = true;
    } else if (user.password !== loginPassword) {
        document.getElementById('password-error').textContent = messages.incorrectPassword;
        hasError = true;
    }

    if (!hasError) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = `../homepage/homepage.html`;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const rmCheck = document.getElementById("check");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("pass");

    if (localStorage.getItem("checkbox") === "checked" && localStorage.getItem("savedEmail")) {
        rmCheck.checked = true;
        emailInput.value = localStorage.getItem("savedEmail");

        const savedPassword = localStorage.getItem("savedPassword");
        if (savedPassword) passwordInput.value = savedPassword;
    } else {
        rmCheck.checked = false;
        emailInput.value = "";
        passwordInput.value = "";
    }

    const lsRememberMe = () => {
        if (rmCheck.checked && emailInput.value !== "") {
            localStorage.setItem("savedEmail", emailInput.value);
            localStorage.setItem("checkbox", "checked");

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users.find(user => user.email === emailInput.value);

            if (user) localStorage.setItem("savedPassword", user.password);
        } else {
            localStorage.removeItem("savedEmail");
            localStorage.removeItem("savedPassword");
            localStorage.removeItem("checkbox");
        }
    };

    const autofillPassword = () => {
        const savedEmail = localStorage.getItem("savedEmail");
        const savedPassword = localStorage.getItem("savedPassword");

        passwordInput.value = (emailInput.value.trim() === savedEmail && savedPassword) ? savedPassword : "";
    };

    rmCheck.addEventListener("change", lsRememberMe);
    emailInput.addEventListener("input", () => {
        autofillPassword();
        lsRememberMe();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) window.location.href = `../homepage/homepage.html`;
});

const slider = document.querySelector(".slider-cradle");
const form = document.querySelector("form");

slider.addEventListener("click", () => {
    slider.classList.toggle("is-transitioned"); // Toggle class on the slider
    const isEnglish = slider.classList.contains("is-transitioned");
    if (isEnglish) {
        // Switch to English (LTR)
        form.setAttribute("dir", "ltr");
        document.querySelector("header").textContent = "Login";
        document.querySelector(".form-label[for='email']").textContent = "Email";
        document.querySelector(".form-label[for='pass']").textContent = "Password";
        document.querySelector(".rememberMe label").textContent = "Remember Me";
        document.querySelector(".submit").value = "Login";

        // Update the "Sign Up" link without using innerHTML
        const signinSpan = document.querySelector(".signin span");
        signinSpan.textContent = "Don't have an account? ";
        const signUpLink = document.createElement("a");
        signUpLink.href = "../signup/signup2.html";
        signUpLink.id = "back-to-signup";
        signUpLink.textContent = "Sign Up";
        signinSpan.appendChild(signUpLink);
    } else {
        // Switch to Arabic (RTL)
        form.setAttribute("dir", "rtl");
        document.querySelector("header").textContent = "تسجيل الدخول";
        document.querySelector(".form-label[for='email']").textContent = "البريد الإلكتروني";
        document.querySelector(".form-label[for='pass']").textContent = "كلمة المرور";
        document.querySelector(".rememberMe label").textContent = "تذكرني";
        document.querySelector(".submit").value = "تسجيل الدخول";

        // Update the "Sign Up" link without using innerHTML
        const signinSpan = document.querySelector(".signin span");
        signinSpan.textContent = "ليس لديك حساب؟ ";
        const signUpLink = document.createElement("a");
        signUpLink.href = "../signup/signup2.html";
        signUpLink.id = "back-to-signup";
        signUpLink.textContent = "تسجيل";
        signinSpan.appendChild(signUpLink);
    }

    // Update error messages when language is switched
    const emailError = document.getElementById('email-error').textContent;
    const passwordError = document.getElementById('password-error').textContent;

    if (emailError || passwordError) {
        validateLogin(event); // Re-validate to update error messages
    }
});

// Add blur event listeners to clear error messages when the field is empty
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pass');

emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() === '') {
        document.getElementById('email-error').textContent = ''; // Clear email error
    }
});

passwordInput.addEventListener('blur', () => {
    if (passwordInput.value.trim() === '') {
        document.getElementById('password-error').textContent = ''; // Clear password error
    }
});