// Esperem a que el DOM estigui carregat per poder accedir als elements
document.addEventListener('DOMContentLoaded', function () {
	// Element del formulari
	const form = document.getElementById('registrationForm');

	// Objecte amb referències a tots els camps que ens interessen
	const fields = {
		username: document.getElementById('username'),         // nom d'usuari (text)
		firstName: document.getElementById('firstName'),       // nom (ha de començar amb majúscula)
		lastName1: document.getElementById('lastName1'),       // primer cognom (majus.)
		lastName2: document.getElementById('lastName2'),       // segon cognom (opcional, si s'omple ha de ser majús.)
		email: document.getElementById('email'),               // correu electrònic
		phone: document.getElementById('phone'),               // telèfon (9 dígits, pot tenir espais o guions)
		dob: document.getElementById('dob'),                   // data de naixement (dd/mm/aaaa)
		cc: document.getElementById('cc'),                     // targeta de crèdit (XXXX-XXXX-... o amb espais)
		password: document.getElementById('password'),         // contrasenya
		confirmPassword: document.getElementById('confirmPassword') // confirmació de contrasenya
	};

	/*
	  setError(field, message)
	  - Mostra el missatge d'error associat a `field` (s'utilitza un <div> amb id `${field.id}-error`).
	  - També afegeix o treu la classe `input-error` per marcar visualment l'input.
	  - Si `message` és fals ('' o null) es neteja l'error.
	*/
	function setError(field, message) {
		const err = document.getElementById(field.id + '-error');
		err.textContent = message || '';
		if (message) field.classList.add('input-error'); else field.classList.remove('input-error');
	}

	/*
	  Validacions simples per cada tipus de camp:
	  Cada funció rep l'element `field` i retorna una cadena amb el missatge
	  d'error o una cadena buida si està tot correcte.
	*/

	// Nom i cognoms: comprovar que el camp no és buit i que la primera lletra és majúscula
	function validateCapitalized(field) {
		if (!field.value) return 'Camp obligatori.';
		const first = field.value.trim().charAt(0);
		if (first !== first.toUpperCase()) return 'La primera lletra ha de ser majúscula.';
		return '';
	}

	// Correu: validar format nom@domini.ext amb domini i extensió només amb lletres
	// La part local (abans de @) accepta lletres, números i alguns caràcters habituals.
	function validateEmail(field) {
		if (!field.value) return 'Camp obligatori.';
		const re = /^[A-Za-z0-9._%+-]+@([A-Za-z]+)\.([A-Za-z]{2,})$/;
		if (!re.test(field.value.trim())) return 'Correu invàlid. Format: nom@domini.ext amb domini i extensió només de lletres.';
		return '';
	}

	// Telèfon: netegem espais/guions i comprovem 9 dígits començant per 6-9
	function validatePhone(field) {
		if (!field.value) return 'Camp obligatori.';
		const cleaned = field.value.replace(/[\s-]/g, '');
		if (!/^[6-9]\d{8}$/.test(cleaned)) return 'Telèfon invàlid. Ha de ser 9 dígits i començar per 6,7,8 o 9. Pots usar espais o guions cada 3 dígits.';
		return '';
	}

	// Data de naixement: format dd/mm/aaaa (comprovació bàsica del format)
	// NOTA: no comprova dies segons el mes (p.ex. febrer/any de traspàs) — es pot ampliar si cal.
	function validateDOB(field) {
		if (!field.value) return 'Camp obligatori.';
		const re = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
		if (!re.test(field.value.trim())) return 'Data invàlida. Format dd/mm/aaaa.';
		return '';
	}

	// Targeta de crèdit: accepta grups de 4 separats per guió o espai
	function validateCC(field) {
		if (!field.value) return 'Camp obligatori.';
		if (!/^(\d{4}[- ]\d{4}[- ]\d{4}[- ]\d{4})$/.test(field.value.trim())) return 'Targeta invàlida. Format: XXXX-XXXX-XXXX-XXXX o XXXX XXXX XXXX XXXX.';
		return '';
	}

	// Contrasenya: regla d'un mínim de 8 caràcters, amb majúscula, minúscula, número i caràcter especial
	function validatePassword(field) {
		if (!field.value) return 'Camp obligatori.';
		const v = field.value;
		if (v.length < 8) return 'La contrasenya ha de tenir almenys 8 caràcters.';
		if (!/[A-Z]/.test(v)) return 'Cal almenys una majúscula.';
		if (!/[a-z]/.test(v)) return 'Cal almenys una minúscula.';
		if (!/[0-9]/.test(v)) return 'Cal almenys un número.';
		// Caràcters especials: comprovem una selecció habitual
		if (!/[!@#$%^&*()_+\-=[\]{};:\"\\|,.<>/?]/.test(v)) return 'Cal almenys un caràcter especial.';
		return '';
	}

	// Confirmació: la segona contrasenya ha de coincidir amb la primera
	function validateConfirmPassword(field, passwordField) {
		if (!field.value) return 'Camp obligatori.';
		if (field.value !== passwordField.value) return 'Les contrasenyes no coincideixen.';
		return '';
	}

	/*
	  Event listeners per validar mentre l'usuari treballa:
	  - `blur` (per convertir la validació en reactiva quan l'usuari surt del camp)
	  - Aquestes comprovacions posen els missatges d'error en línia usant `setError`.
	*/
	fields.firstName.addEventListener('blur', () => setError(fields.firstName, validateCapitalized(fields.firstName)));
	fields.lastName1.addEventListener('blur', () => setError(fields.lastName1, validateCapitalized(fields.lastName1)));
	fields.lastName2.addEventListener('blur', () => {
		// El segon cognom és opcional: si s'omple ha de començar amb majúscula
		if (fields.lastName2.value.trim()) setError(fields.lastName2, validateCapitalized(fields.lastName2)); else setError(fields.lastName2, '');
	});
	fields.email.addEventListener('blur', () => setError(fields.email, validateEmail(fields.email)));
	fields.phone.addEventListener('blur', () => setError(fields.phone, validatePhone(fields.phone)));
	fields.dob.addEventListener('blur', () => setError(fields.dob, validateDOB(fields.dob)));
	fields.cc.addEventListener('blur', () => setError(fields.cc, validateCC(fields.cc)));
	fields.password.addEventListener('blur', () => setError(fields.password, validatePassword(fields.password)));
	fields.confirmPassword.addEventListener('blur', () => setError(fields.confirmPassword, validateConfirmPassword(fields.confirmPassword, fields.password)));

	/*
	  Handler del submit: valida tots els camps, mostra errors i evita l'enviament
	  si hi ha errors. Si tot és correcte es mostra un missatge d'èxit.
	*/
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		let hasError = false;

		// Llista de validadors que recorrem per verificar tot el formulari
		const validators = [
			{ field: fields.username, fn: (f) => f.value ? '' : 'Camp obligatori.' },
			{ field: fields.firstName, fn: validateCapitalized },
			{ field: fields.lastName1, fn: validateCapitalized },
			{ field: fields.lastName2, fn: (f) => f.value.trim() ? validateCapitalized(f) : '' },
			{ field: fields.email, fn: validateEmail },
			{ field: fields.phone, fn: validatePhone },
			{ field: fields.dob, fn: validateDOB },
			{ field: fields.cc, fn: validateCC },
			{ field: fields.password, fn: validatePassword },
			{ field: fields.confirmPassword, fn: (f) => validateConfirmPassword(f, fields.password) }
		];

		// Executem cada validador i marquem si hi ha algun error
		validators.forEach(v => {
			const msg = v.fn(v.field);
			setError(v.field, msg);
			if (msg) hasError = true;
		});

		const successEl = document.getElementById('form-success');
		if (hasError) {
			// Netejem el missatge d'èxit i posem focus al primer camp amb error
			successEl.textContent = '';
			const firstErr = validators.find(v => v.fn(v.field));
			if (firstErr) firstErr.field.focus();
			return;
		}

		// Si arribem aquí, la validació client ha passat
		successEl.textContent = 'Formulari enviat correctament (validació client).' ;
		// NOTA: aquí podríem fer un fetch() per enviar les dades al servidor
		// o cridar form.reset() per esborrar el formulari després de l'enviament.
	});
});
