// --- Helpers per mostrar resultats ---
function setOutput(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
	console.log(id + ':', text);
}

// --- Cadenes ---
function runStrings() {
	const frase = "Aprendre JavaScript és útil";
	const len = frase.length;
	const lower = frase.toLowerCase();
	const start = frase.indexOf('JavaScript');
	const java = start !== -1 ? frase.substring(start, start + 'JavaScript'.length) : '(no trobat)';
	const hasUtil = frase.includes('útil');

	const out = [
		`Frase: ${frase}`,
		`Longitud: ${len}`,
		`Minúscules: ${lower}`,
		`Substring JavaScript: ${java}`,
		`Inclou "útil"? ${hasUtil}`
	].join('\n');

	setOutput('strings-output', out);
}

function promptPhrase() {
	const frase = prompt('Introdueix una frase:');
	if (frase === null) {
		setOutput('prompt-output', 'Usuari ha cancel·lat el prompt.');
		return;
	}
	if (frase.length === 0) {
		setOutput('prompt-output', 'Frase buida.');
		return;
	}
	const firstChar = frase.charAt(0);
	const firstFive = frase.slice(0, 5);
	const startsHola = frase.startsWith('Hola');
	const out = [
		`Frase: ${frase}`,
		`Primer caràcter: ${firstChar}`,
		`5 primers caràcters: ${firstFive}`,
		`Comença per "Hola"? ${startsHola}`
	].join('\n');
	setOutput('prompt-output', out);
}

function splitProgramacio() {
	const frase = 'Programació Web';
	const arr = frase.split(' ');
	setOutput('split-output', `Array: [${arr.join(', ')}]`);
}

function repeatHola() {
	const r = 'Hola'.repeat(5);
	setOutput('repeat-output', r);
}

// --- Nombres ---
function dividePrompt() {
	const a = prompt('Introdueix el primer número:');
	if (a === null) { setOutput('div-output', 'Operació cancel·lada.'); return; }
	const b = prompt('Introdueix el segon número:');
	if (b === null) { setOutput('div-output', 'Operació cancel·lada.'); return; }

	const na = parseFloat(a.replace(',', '.'));
	const nb = parseFloat(b.replace(',', '.'));
	if (isNaN(na) || isNaN(nb)) {
		setOutput('div-output', `Error: cal introduir valors numèrics. (${a}, ${b})`);
		return;
	}
	let result;
	if (nb === 0) result = 'Divisió per zero → resultat: Infinity';
	else result = na / nb;
	setOutput('div-output', `Resultat: ${result}`);
}

function zeroDivision() {
	const p1 = 10 / 0;
	const p2 = -10 / 0;
	const out = [
		`10 / 0 = ${p1}`,
		`-10 / 0 = ${p2}`,
		`Explicació: en JavaScript la divisió per zero retorna Infinity (o -Infinity).`
	].join('\n');
	setOutput('zero-output', out);
}

function formatNumber() {
	const num = 1234.56789;
	const a = num.toFixed(1);
	const b = num.toFixed(0);
	const c = num.toFixed(3);
	setOutput('format-output', `Original: ${num}\nAmb 1 decimal: ${a}\nSense decimals: ${b}\nAmb 3 decimals: ${c}`);
}

function fixedPrompt() {
	const v = prompt('Introdueix un valor numèric:');
	if (v === null) { setOutput('fixed-output', 'Operació cancel·lada.'); return; }
	const n = parseFloat(v.replace(',', '.'));
	if (isNaN(n)) { setOutput('fixed-output', 'Error: no és un número.'); return; }
	setOutput('fixed-output', `Valor amb 2 decimals: ${n.toFixed(2)}`);
}

// --- Diàlegs i temporització ---
function doConfirm() {
	const r = confirm('Vols continuar?');
	if (r) {
		alert('Has acceptat');
		setOutput('confirm-output', 'Usuari: Has acceptat');
	} else {
		alert('Has cancel·lat');
		setOutput('confirm-output', 'Usuari: Has cancel·lat');
	}
}

function askName() {
	const name = prompt('Com et dius?');
	if (name === null) { setOutput('personal-output', 'Operació cancel·lada.'); return; }
	if (name.trim() === '') { setOutput('personal-output', 'No has introduït el nom.'); return; }
	const msg = `Hola, ${name}! Benvingut/da.`;
	alert(msg);
	setOutput('personal-output', msg);
}

// --- Inici automàtic al carregar la pàgina ---
window.addEventListener('load', () => {
	// 1) Missatge amb alert() quan carregui la pàgina
	alert('Benvingut! Aquesta pàgina mostra exercicis de JavaScript.');

	// 4) setTimeout -> mostra "Hola!" als 3 segons
	setTimeout(() => {
		document.getElementById('timeout-output').textContent = 'Hola!';
		// també fem un alert perquè la consigna diu "aparegui un missatge" (visual)
		alert('Hola!');
	}, 3000);

	// 5) setInterval -> mostra l'hora cada segon
	const timeEl = document.getElementById('time-output');
	setInterval(() => {
		if (timeEl) timeEl.textContent = new Date().toLocaleTimeString();
	}, 1000);
});

// --- Event listeners per als botons ---
document.getElementById('run-strings').addEventListener('click', runStrings);
document.getElementById('prompt-phrase').addEventListener('click', promptPhrase);
document.getElementById('split-btn').addEventListener('click', splitProgramacio);
document.getElementById('repeat-btn').addEventListener('click', repeatHola);

document.getElementById('div-btn').addEventListener('click', dividePrompt);
document.getElementById('zero-btn').addEventListener('click', zeroDivision);
document.getElementById('format-btn').addEventListener('click', formatNumber);
document.getElementById('fixed-btn').addEventListener('click', fixedPrompt);

document.getElementById('confirm-btn').addEventListener('click', doConfirm);
document.getElementById('personal-btn').addEventListener('click', askName);

// Fent una execució automàtica opcional per mostrar l'exemple de cadenes inicial
runStrings();

