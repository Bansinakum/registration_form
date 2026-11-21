const form = document.getElementById('registrationForm');
const $ = id => document.getElementById(id);
const errorIds = ['nameError','emailError','phoneError','bloodError','passwordError','confirmError','consentError'];
const setError = (id, message) => { $(id).textContent = message; };

// Show / hide password controls
document.querySelectorAll('[data-toggle]').forEach(button => {
  button.addEventListener('click', () => {
    const input = $(button.dataset.toggle);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    button.textContent = show ? 'Hide' : 'Show';
    button.setAttribute('aria-label', `${show ? 'Hide' : 'Show'} ${button.dataset.toggle}`);
  });
});

// Keep the mobile number limited to digits.
$('phone').addEventListener('input', event => {
  event.target.value = event.target.value.replace(/\D/g, '').slice(0, 10);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  errorIds.forEach(id => setError(id, ''));
  $('successMessage').textContent = '';

  const name = $('fullName').value.trim();
  const email = $('email').value.trim();
  const phone = $('phone').value.trim();
  const blood = $('bloodGroup').value;
  const password = $('password').value;
  const confirm = $('confirmPassword').value;
  let valid = true;

  if (name.length < 2) { setError('nameError', 'Please enter your full name.'); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('emailError', 'Enter a valid email address.'); valid = false; }
  if (!/^\d{10}$/.test(phone)) { setError('phoneError', 'Enter a valid 10-digit mobile number.'); valid = false; }
  if (!blood) { setError('bloodError', 'Please select your blood group.'); valid = false; }
  if (password.length < 8) { setError('passwordError', 'Password must contain at least 8 characters.'); valid = false; }
  if (confirm !== password || !confirm) { setError('confirmError', 'Passwords do not match.'); valid = false; }
  if (!$('consent').checked) { setError('consentError', 'Please confirm your information.'); valid = false; }

  if (valid) {
    $('successMessage').textContent = 'Registration form validated successfully!';
    form.reset();
    document.querySelectorAll('[data-toggle]').forEach(button => {
      $(button.dataset.toggle).type = 'password';
      button.textContent = 'Show';
    });
  } else {
    const firstError = document.querySelector('.error:not(:empty)');
    if (firstError) firstError.closest('.field')?.querySelector('input,select')?.focus();
  }
});
