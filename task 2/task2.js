document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('interactiveForm');
  const successAlert = document.getElementById('successAlert');

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      validate: (val) => val.trim().length >= 3
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
    },
    phone: {
      input: document.getElementById('phone'),
      error: document.getElementById('phoneError'),
      validate: (val) => /^\+?[0-9]{9,15}$/.test(val.trim())
    },
    password: {
      input: document.getElementById('password'),
      error: document.getElementById('passwordError'),
      validate: (val) => checkPasswordStrength(val.trim()).isStrongEnough
    }
  };

  
  function checkPasswordStrength(pass) {
    const strengthBar = document.getElementById('strengthIndicator');
    const strengthText = document.getElementById('strengthText');
    let score = 0;

    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    let width = '0%';
    let color = '#dc3545';
    let text = 'Very weak';

    if (pass.length === 0) {
      width = '0%';
      text = 'Very weak';
    } else if (score <= 2) {
      width = '33%';
      color = '#dc3545';
      text = 'Weak';
    } else if (score === 3 || score === 4) {
      width = '66%';
      color = '#ffc107';
      text = 'Medium';
    } else if (score >= 5) {
      width = '100%';
      color = '#198754';
      text = 'Strong';
    }

    strengthBar.style.width = width;
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = `Password strength: ${text}`;

    return {
      score,
      isStrongEnough: pass.length >= 8 && /[A-Z]/.test(pass) && /[a-z]/.test(pass) && /[0-9]/.test(pass)
    };
  }

 
  function validateField(key) {
    const field = fields[key];
    const isValid = field.validate(field.input.value);

    if (!isValid) {
      field.input.classList.add('is-invalid');
      field.input.classList.remove('is-valid');
      field.error.style.display = 'block';
    } else {
      field.input.classList.remove('is-invalid');
      field.input.classList.add('is-valid');
      field.error.style.display = 'none';
    }
    return isValid;
  }

 
  Object.keys(fields).forEach(key => {
    const field = fields[key];

    field.input.addEventListener('input', () => {
      if (key === 'password') {
        checkPasswordStrength(field.input.value);
      }
      validateField(key);
    });


    field.input.addEventListener('focus', () => {
      field.input.classList.add('shadow-sm');
    });

  
    field.input.addEventListener('blur', () => {
      field.input.classList.remove('shadow-sm');
      validateField(key);
    });
  });

 
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    Object.keys(fields).forEach(key => {
      const isValid = validateField(key);
      if (!isValid) isFormValid = false;
    });

    if (isFormValid) {
      successAlert.classList.remove('d-none');
      form.reset();

      
      document.getElementById('strengthIndicator').style.width = '0%';
      document.getElementById('strengthText').textContent = 'Password strength: Very weak';

      Object.keys(fields).forEach(key => {
        fields[key].input.classList.remove('is-valid');
      });

      setTimeout(() => {
        successAlert.classList.add('d-none');
      }, 4000);
    }
  });
});