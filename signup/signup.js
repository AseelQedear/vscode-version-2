const errorMessages = {
    ar: {
        invalidFirstName: 'الرجاء إدخال اسم أول صالح',
        invalidLastName: 'الرجاء إدخال اسم عائلة صالح',
        invalidEmail: 'الرجاء إدخال بريد إلكتروني صالح',
        invalidPassword: 'كلمة المرور يجب أن تحتوي على حروف وأرقام، وأن تكون بين 6 و 20 حرفًا',
        passwordsDoNotMatch: 'كلمتا المرور غير متطابقتين',
        emailAlreadyRegistered: 'هذا البريد الإلكتروني مسجل بالفعل',
    },
    en: {
        invalidFirstName: 'Please enter a valid first name',
        invalidLastName: 'Please enter a valid last name',
        invalidEmail: 'Please enter a valid email address',
        invalidPassword: 'Password must contain letters and numbers, and be between 6 and 20 characters',
        passwordsDoNotMatch: 'Passwords do not match',
        emailAlreadyRegistered: 'This email is already registered',
    },
};

// Signup Validation
const validateSignup = (event) => {
    event.preventDefault();

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    let hasError = false;

    // Get form values
    const firstName = document.getElementById('firstname').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const userEmail = document.getElementById('useremail').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmpassword').value.trim();

    // Determine language
    const isEnglish = document.querySelector(".slider-cradle").classList.contains("is-transitioned");
    const messages = isEnglish ? errorMessages.en : errorMessages.ar;

    // First name validation
    const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(firstName)) {
        document.getElementById('firstname-error').textContent = messages.invalidFirstName;
        hasError = true;
    }
    if (!nameRegex.test(lastName)) {
        document.getElementById('lastname-error').textContent = messages.invalidLastName;
        hasError = true;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(userEmail)) {
        document.getElementById('useremail-error').textContent = messages.invalidEmail;
        hasError = true;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById('password-error').textContent = messages.invalidPassword;
        hasError = true;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        document.getElementById('confirmpassword-error').textContent = messages.passwordsDoNotMatch;
        hasError = true;
    }

    // Check if email is already registered
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === userEmail)) {
        document.getElementById('useremail-error').textContent = messages.emailAlreadyRegistered;
        hasError = true;
    }

    // If no errors, save user and log them in
    if (!hasError) {
        const newUser = { firstName, lastName, email: userEmail, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Store logged-in user
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));

        // Redirect to homepage
        window.location.href = `../homepage/homepage.html`;
    }
};

// Auto-redirect if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) window.location.href = `../homepage/homepage.html`;
});


// const errorMessages = {
//     ar: {
//         invalidFirstName: 'الاسم الأول يجب أن يحتوي فقط على حروف',
//         invalidLastName: 'الاسم الأخير يجب أن يحتوي فقط على حروف',
//         invalidEmail: 'الرجاء إدخال بريد إلكتروني صالح',
//         invalidPassword: 'كلمة المرور يجب أن تحتوي على حروف وأرقام، وأن تكون بين 6 و 20 حرفًا',
//         passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
//         emailAlreadyRegistered: 'هذا البريد الإلكتروني مسجل بالفعل',
//     },
//     en: {
//         invalidFirstName: 'First name must contain only letters',
//         invalidLastName: 'Last name must contain only letters',
//         invalidEmail: 'Please enter a valid email address',
//         invalidPassword: 'Password must contain letters and numbers, and be between 6 and 20 characters',
//         passwordsDoNotMatch: 'Passwords do not match',
//         emailAlreadyRegistered: 'This email is already registered',
//     },
// };

// const validateSignup = (event) => {
//     event.preventDefault();

//     // Clear previous error messages
//     document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

//     let hasError = false;

//     const firstName = document.getElementById('firstname').value.trim();
//     const lastName = document.getElementById('lastname').value.trim();
//     const userEmail = document.getElementById('useremail').value.trim();
//     const password = document.getElementById('password').value.trim();
//     const confirmPassword = document.getElementById('confirmpassword').value.trim();

//     // Determine the current language
//     const isEnglish = document.querySelector(".slider-cradle").classList.contains("is-transitioned");
//     const messages = isEnglish ? errorMessages.en : errorMessages.ar;

//     const nameRegex = /^[a-zA-Z ]+$/;
//     if (!nameRegex.test(firstName)) {
//         document.getElementById('firstname-error').textContent = messages.invalidFirstName;
//         hasError = true;
//     }
//     if (!nameRegex.test(lastName)) {
//         document.getElementById('lastname-error').textContent = messages.invalidLastName;
//         hasError = true;
//     }

//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailRegex.test(userEmail)) {
//         document.getElementById('useremail-error').textContent = messages.invalidEmail;
//         hasError = true;
//     }

//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
//     if (!passwordRegex.test(password)) {
//         document.getElementById('password-error').textContent = messages.invalidPassword;
//         hasError = true;
//     }
//     if (password !== confirmPassword) {
//         document.getElementById('confirmpassword-error').textContent = messages.passwordsDoNotMatch;
//         hasError = true;
//     }

//     let users = JSON.parse(localStorage.getItem('users')) || [];
//     if (users.some(user => user.email === userEmail)) {
//         document.getElementById('useremail-error').textContent = messages.emailAlreadyRegistered;
//         hasError = true;
//     }

//     if (!hasError) {
//         users.push({ firstName, lastName, email: userEmail, password });
//         localStorage.setItem('users', JSON.stringify(users));
//         window.location.href = `../homepage/homepage.html`;
//     }
// };

const slider = document.querySelector(".slider-cradle");
const form = document.querySelector("form");

slider.addEventListener("click", () => {
    slider.classList.toggle("is-transitioned"); // Toggle class on the slider
    const isEnglish = slider.classList.contains("is-transitioned");
    if (isEnglish) {
        // Switch to English (LTR)
        form.setAttribute("dir", "ltr");
        document.querySelector("header").textContent = "Sign Up";
        document.querySelector(".form-label[for='firstname']").textContent = "First Name";
        document.querySelector(".form-label[for='lastname']").textContent = "Last Name";
        document.querySelector(".form-label[for='useremail']").textContent = "Email";
        document.querySelector(".form-label[for='password']").textContent = "Password";
        document.querySelector(".form-label[for='confirmpassword']").textContent = "Confirm Password";
        document.querySelector(".submit").value = "Sign Up";

        // Update the "Login" link without using innerHTML
        const signinSpan = document.querySelector(".signin span");
        signinSpan.textContent = "Already have an account? ";
        const loginLink = document.createElement("a");
        loginLink.href = "../login/login2.html";
        loginLink.id = "login-link";
        loginLink.textContent = "Login";
        signinSpan.appendChild(loginLink);
    } else {
        // Switch to Arabic (RTL)
        form.setAttribute("dir", "rtl");
        document.querySelector("header").textContent = "تسجيل مستخدم جديد";
        document.querySelector(".form-label[for='firstname']").textContent = "الاسم الاول";
        document.querySelector(".form-label[for='lastname']").textContent = "الاسم الاخير";
        document.querySelector(".form-label[for='useremail']").textContent = "البريد الإلكتروني";
        document.querySelector(".form-label[for='password']").textContent = "كلمة المرور";
        document.querySelector(".form-label[for='confirmpassword']").textContent = "تأكيد كلمة المرور";
        document.querySelector(".submit").value = "تسجيل";

        // Update the "Login" link without using innerHTML
        const signinSpan = document.querySelector(".signin span");
        signinSpan.textContent = " لديك حساب؟ ";
        const loginLink = document.createElement("a");
        loginLink.href = "../login/login2.html";
        loginLink.id = "login-link";
        loginLink.textContent = "تسجيل الدخول";
        signinSpan.appendChild(loginLink);
    }

    // Update error messages when language is switched
    const errorFields = ['firstname', 'lastname', 'useremail', 'password', 'confirmpassword'];
    errorFields.forEach(field => {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement.textContent) {
            validateSignup(event); // Re-validate to update error messages
        }
    });
});

// Add blur event listeners to clear error messages when the field is empty
const inputFields = ['firstname', 'lastname', 'useremail', 'password', 'confirmpassword'];
inputFields.forEach(field => {
    const inputElement = document.getElementById(field);
    const errorElement = document.getElementById(`${field}-error`);

    inputElement.addEventListener('blur', () => {
        if (inputElement.value.trim() === '') {
            errorElement.textContent = ''; // Clear the error message
        }
    });
});