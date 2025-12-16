function setOutput(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
  console.log(id + ':', text);
}

// 1. Declaració de funcions
function saludar() {
  return 'Hola, món!';
}

function producte(a, b) {
  return a * b;
}

const assignacioExplicacio = `Assignar una funció a una variable vol dir que la variable apunta a l'objecte 'Function'. Així podem cridar-la mitjançant la variable, passar-la com a argument o retornar-la.`;

function ex1() {
  const out = [];
  out.push(`saludar() -> ${saludar()}`);
  out.push(`producte(3,4) -> ${producte(3,4)}`);
  out.push(assignacioExplicacio);
  setOutput('ex1-out', out.join('\n'));
}

// 2. Àmbit: var, let, const
const scopeExplanation = `var: àmbit global o de funció i es pot redeclarar; let: àmbit de bloc; const: com let però no permet reassignació.`;

function scopeExamples() {
  const out = [];
  // var hoisting example
  try {
    function testVar() {
      out.push('testVar: x abans de declaració = ' + x); // undefined (hoisting)
      var x = 5;
      out.push('testVar: x després = ' + x);
    }
    testVar();
  } catch (e) { out.push('testVar error: ' + e); }

  // let block scope
  try {
    function testLet() {
      let y = 1;
      {
        let y = 2; // diferente variable de bloc
        out.push('testLet (bloc intern) y = 2');
      }
      out.push('testLet (fora bloc) y = ' + y);
    }
    testLet();
  } catch (e) { out.push('testLet error: ' + e); }

  // var vs let in loops with setTimeout
  function varLetLoop() {
    var results = [];
    for (var i = 0; i < 3; i++) {
      (function (iCopy) { results.push('var loop iCopy=' + iCopy); })(i);
    }
    for (let j = 0; j < 3; j++) {
      results.push('let loop j=' + j);
    }
    return results;
  }
  out.push(...varLetLoop());

  setOutput('ex2-out', [scopeExplanation, '---', ...out].join('\n'));
}

// 3. Invocacions
function invocations() {
  function f(a, b) { return (this && this.name ? this.name + ':' : '') + (a + b); }
  const obj = { name: 'OBJ', show: f };
  const normal = f(1, 2);
  const method = obj.show(3, 4);
  const callExample = f.call({ name: 'CALL' }, 5, 6);
  const applyExample = f.apply({ name: 'APPLY' }, [7, 8]);

  const out = [
    `normal invocation f(1,2) -> ${normal}`,
    `method invocation obj.show(3,4) -> ${method}`,
    `call -> ${callExample}`,
    `apply -> ${applyExample}`
  ];
  setOutput('ex3-out', out.join('\n'));
}

// 4. Memorització (memorization) — esPrimer
function makeIsPrime() {
  const cache = {};
  return function esPrimer(n) {
    if (n in cache) return cache[n];
    if (n < 2) return cache[n] = false;
    for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return cache[n] = false;
    return cache[n] = true;
  };
}

const esPrimer = makeIsPrime();

function memoExamples() {
  const out = [];
  out.push(`11 és primer? ${esPrimer(11)}`);
  out.push(`12 és primer? ${esPrimer(12)}`);
  out.push('Explicació: la memorització guarda resultats per evitar recàlculs costosos.');
  setOutput('ex4-out', out.join('\n'));
}

// 5. Sobrecàrrega — comportament segons arguments.length
function calcul() {
  if (arguments.length === 0) return 0;
  if (arguments.length === 1) return arguments[0] * arguments[0];
  if (arguments.length === 2) return arguments[0] + arguments[1];
  // comportament per defecte: sumar tots
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}

function afegirMetode(obj, name, fn) {
  const prev = obj[name];
  obj[name] = function () {
    if (fn.length === arguments.length) {
      return fn.apply(this, arguments);
    } else if (typeof prev === 'function') {
      return prev.apply(this, arguments);
    }
  };
}

function overloadExamples() {
  const out = [];
  out.push(`calcul() -> ${calcul()}`);
  out.push(`calcul(4) -> ${calcul(4)}`);
  out.push(`calcul(3,5) -> ${calcul(3,5)}`);
  out.push(`calcul(1,2,3) -> ${calcul(1,2,3)}`);

  const obj = {};
  afegirMetode(obj, 'hola', function () { return 'hola sense args'; });
  afegirMetode(obj, 'hola', function (name) { return `hola ${name}`; });
  out.push(`obj.hola() -> ${obj.hola()}`);
  out.push(`obj.hola('Joan') -> ${obj.hola('Joan')}`);

  setOutput('ex5-out', out.join('\n'));
}

// 6. Clausures
function contador() {
  let n = 0;
  return function () {
    n += 1;
    return n;
  };
}

function closureExamples() {
  const c = contador();
  const out = [];
  out.push(`c() -> ${c()}`);
  out.push(`c() -> ${c()}`);
  out.push('Explicació: la funció retornada manté referència a l`entorn on ' +
    'es va crear (variable n), per això recorda l`estat).');
  setOutput('ex6-out', out.join('\n'));
}

// 7. Funcions sense nom — exemples i anàlisi
function anonymousExamples() {
  const out = [];
  // 1: assignació d'expressió de funció
  const f1 = function (a) { return a * 2; };
  out.push(`f1(3) -> ${f1(3)} (válid)`);
  // 2: IIFE
  const iife = (function (x) { return x + 1; })(4);
  out.push(`IIFE -> ${iife} (válid)`);
  // 3: funció anònima en setTimeout
  setTimeout(function () { console.log('Timeout anonymous fired'); }, 10);
  out.push('Funció anònima en setTimeout — també vàlida');
  setOutput('ex7-out', out.join('\n'));
}

// 8. Funcions de fletxa
function arrowExamples() {
  const add = (a, b) => a + b;
  const square = x => x * x;
  const obj = {
    v: 10,
    fn: function () { return (() => this.v)(); }
  };
  const out = [];
  out.push(`add(2,3) -> ${add(2,3)}`);
  out.push(`square(4) -> ${square(4)}`);
  out.push(`this en funció de fletxa (lexical) -> ${obj.fn()}`);
  setOutput('ex8-out', out.join('\n'));
}

// 9. IIFE
function iifeExamples() {
  const out = [];
  out.push('IIFE (Immediately Invoked Function Expression) s\'executa immediatament i crea un àmbit privat.');
  const result = (function () {
    const n = 7;
    return n * 2;
  })();
  out.push(`IIFE resultat -> ${result}`);

  // IIFE amb variable privada
  const module = (function () {
    let n = 0;
    return { inc() { n++; return n; }, get() { return n; } };
  })();
  out.push(`module.get() -> ${module.get()}`);
  out.push(`module.inc() -> ${module.inc()}`);
  setOutput('ex9-out', out.join('\n'));
}

// 10. Altres formes
function otherFuncs() {
  const out = [];
  const obj = {
    greet(name) { return `Hola, ${name}!`; }
  };
  out.push(`obj.greet('Anna') -> ${obj.greet('Anna')}`);

  function makeAdder(x) { return function (y) { return x + y; }; }
  const add5 = makeAdder(5);
  out.push(`add5(3) -> ${add5(3)}`);
  setOutput('ex10-out', out.join('\n'));
}

// 11. Desestructuració
function destructuringExamples() {
  const out = [];
  const person = { name: 'Joan', age: 30, city: 'Barcelona' };
  const { name, age } = person;
  out.push(`name: ${name}, age: ${age}`);

  const arr = [1, 2, 3];
  const [a, b, c] = arr;
  out.push(`a=${a}, b=${b}, c=${c}`);
  setOutput('ex11-out', out.join('\n'));
}

// 12. Spread/Rest i retorn múltiple
function multipleReturn() {
  return [1, 2, 3];
}

const spreadRestExplanation = `Spread (...) expande elements; rest (...) recol·lecta arguments restants en un array.`;

function sumAll(...nums) {
  return nums.reduce((s, n) => s + n, 0);
}

function spreadRestExamples() {
  const out = [];
  const [x, y, z] = multipleReturn();
  out.push(`desestructurat: x=${x}, y=${y}, z=${z}`);
  out.push(spreadRestExplanation);
  out.push(`sumAll(1,2,3,4) -> ${sumAll(1,2,3,4)}`);
  setOutput('ex12-out', out.join('\n'));
}

// Wire up buttons
document.getElementById('ex1-run').addEventListener('click', ex1);
document.getElementById('ex2-run').addEventListener('click', scopeExamples);
document.getElementById('ex3-run').addEventListener('click', invocations);
document.getElementById('ex4-run').addEventListener('click', memoExamples);
document.getElementById('ex5-run').addEventListener('click', overloadExamples);
document.getElementById('ex6-run').addEventListener('click', closureExamples);
document.getElementById('ex7-run').addEventListener('click', anonymousExamples);
document.getElementById('ex8-run').addEventListener('click', arrowExamples);
document.getElementById('ex9-run').addEventListener('click', iifeExamples);
document.getElementById('ex10-run').addEventListener('click', otherFuncs);
document.getElementById('ex11-run').addEventListener('click', destructuringExamples);
document.getElementById('ex12-run').addEventListener('click', spreadRestExamples);

// Part opcional
ex1();
scopeExamples();
invocations();
