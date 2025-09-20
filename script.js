document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements (safely after DOM loaded)
  const container = document.getElementById('container');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginError = document.getElementById('loginError');
  const registerError = document.getElementById('registerError');
  const loginPasswordToggle = document.getElementById('loginPasswordToggle');
  const registerPasswordToggle = document.getElementById('registerPasswordToggle');
  const loginPassword = document.getElementById('loginPassword');
  const registerPassword = document.getElementById('registerPassword');

  // Safe checks in case any element is missing
  function safeAddListener(el, evt, fn) {
    if (el) el.addEventListener(evt, fn);
  }

  // Switch Forms
  safeAddListener(showRegister, 'click', () => container && container.classList.add('active'));
  safeAddListener(showLogin, 'click', () => container && container.classList.remove('active'));

  // Toggle Login Password (if element exists)
  safeAddListener(loginPasswordToggle, 'click', () => {
    if (!loginPassword) return;
    if (loginPassword.type === 'password') {
      loginPassword.type = 'text';
      loginPasswordToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      loginPassword.type = 'password';
      loginPasswordToggle.innerHTML = '<i class="fas fa-eye"></i>';
    }
  });

  // Toggle Register Password (if element exists)
  safeAddListener(registerPasswordToggle, 'click', () => {
    if (!registerPassword) return;
    if (registerPassword.type === 'password') {
      registerPassword.type = 'text';
      registerPasswordToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      registerPassword.type = 'password';
      registerPasswordToggle.innerHTML = '<i class="fas fa-eye"></i>';
    }
  });

  // Login Validation
  safeAddListener(loginForm, 'submit', (e) => {
    e.preventDefault();
    if (!loginForm) return;

    const username = (document.getElementById('loginUsername') || {}).value || '';
    const password = (loginPassword || {}).value || '';

    // Basic checks first
    if (username.trim() === '' || password === '') {
      if (loginError) {
        loginError.textContent = 'Please fill in all fields';
        loginError.style.display = 'block';
      }
      return;
    }

    if (password.length < 6) {
      if (loginError) {
        loginError.textContent = 'Password must be at least 6 characters';
        loginError.style.display = 'block';
      }
      return;
    }

    // Example credential check (admin)
    if (username === "admin" && password === "123456",
        username === "lucas" && password === "123456"
    ) {
      // Save login state (optional)
      localStorage.setItem("isLoggedIn", "true");
      // Redirect to admin/test page
      window.location.href = "login.html";
      return; // stop further execution
    }

    // If passed all validation -> treat as successful login (demo)
    if (loginError) loginError.style.display = 'none';
    loginForm.reset();
    window.location.href = "test.html";
  });

  // Register Validation
  safeAddListener(registerForm, 'submit', (e) => {
    e.preventDefault();
    if (!registerForm) return;

    const name = (document.getElementById('registerName') || {}).value || '';
    const email = (document.getElementById('registerEmail') || {}).value || '';
    const password = (registerPassword || {}).value || '';
    const confirmPassword = (document.getElementById('registerConfirmPassword') || {}).value || '';
    const agreeTermsEl = document.getElementById('agreeTerms');
    const agreeTerms = agreeTermsEl ? agreeTermsEl.checked : false;

    // Basic validations
    if (name.trim() === '' || email.trim() === '' || password === '' || confirmPassword === '') {
      if (registerError) {
        registerError.textContent = 'Please fill in all fields';
        registerError.style.display = 'block';
      }
      return;
    }

    if (password.length < 6) {
      if (registerError) {
        registerError.textContent = 'Password must be at least 6 characters';
        registerError.style.display = 'block';
      }
      return;
    }

    if (password !== confirmPassword) {
      if (registerError) {
        registerError.textContent = 'Passwords do not match';
        registerError.style.display = 'block';
      }
      return;
    }

    if (!agreeTerms) {
      if (registerError) {
        registerError.textContent = 'You must agree to the terms and conditions';
        registerError.style.display = 'block';
      }
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (registerError) {
        registerError.textContent = 'Please enter a valid email address';
        registerError.style.display = 'block';
      }
      return;
    }

    // Success (demo) — in real app send to server
    if (registerError) registerError.style.display = 'none';
    alert('Registration successful! You can now login.');
    registerForm.reset();
    container && container.classList.remove('active');
  });

  // Clear errors on typing
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
      if (loginError) loginError.style.display = 'none';
      if (registerError) registerError.style.display = 'none';
    });
  });
});
