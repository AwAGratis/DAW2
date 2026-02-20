// Validació del formulari de registre

const form = document.getElementById('registerForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const terms = document.getElementById('terms');

const errors = {
  username: document.getElementById('username-error'),
  email: document.getElementById('email-error'),
  password: document.getElementById('password-error'),
  confirmPassword: document.getElementById('confirmPassword-error'),
  terms: document.getElementById('terms-error')
};

function clearErrors() {
  Object.values(errors).forEach(el => el.textContent = '');
  [username, email, password, confirmPassword].forEach(i => i.classList.remove('invalid'));
}

function showError(inputEl, errorEl, message) {
  errorEl.textContent = message;
  inputEl.classList.add('invalid');
}

form.addEventListener('submit', function (e) {
  clearErrors();
  let valid = true;

  // nom d'usuari no buit
  if (!username.value.trim()) {
    showError(username, errors.username, "El nom d'usuari no pot estar buit.");
    valid = false;
  }

  // email vàlid (aprofitem la validació del tipus email)
  if (!email.value.trim()) {
    showError(email, errors.email, "Introdueix un correu electrònic.");
    valid = false;
  } else if (!email.checkValidity()) {
    showError(email, errors.email, "Format d'email invàlid.");
    valid = false;
  }

  // contrasenya mínim 8 caràcters
  if (!password.value) {
    showError(password, errors.password, "Introdueix una contrasenya.");
    valid = false;
  } else if (password.value.length < 8) {
    showError(password, errors.password, "La contrasenya ha de tenir almenys 8 caràcters.");
    valid = false;
  }

  // confirmació igual
  if (!confirmPassword.value) {
    showError(confirmPassword, errors.confirmPassword, "Confirma la contrasenya.");
    valid = false;
  } else if (password.value !== confirmPassword.value) {
    showError(confirmPassword, errors.confirmPassword, "Les contrasenyes no coincideixen.");
    valid = false;
  }

  // acceptar termes
  if (!terms.checked) {
    errors.terms.textContent = "Has d'acceptar els termes i condicions.";
    valid = false;
  }

  if (!valid) {
    e.preventDefault();
    // posar el focus al primer camp amb error
    const firstInvalid = document.querySelector('.invalid');
    if (firstInvalid) firstInvalid.focus();
  } else {
    e.preventDefault(); // evitar enviament real per demostració
    alert('Registre completat correctament!');
    form.reset();
    clearErrors();
  }
});
