// Pregunta 1: Completa el codi per comprovar si la resposta és correcta utilitzant response.ok.
// Bueno, para ver si la respuesta está bien, usamos response.ok. Si no está ok, lanzamos un error.
// Si response.ok no es true, entonces throw new Error o algo así.

fetch("productes.json")
.then(response => {
  if (!response.ok) {
    throw new Error('La respuesta no está bien, status: ' + response.status);
  }
  return response.json(); // Esto es para la pregunta 2
})
.then(data => {
  console.log(data);
})
.catch(error => {
  console.log("Error:", error);
});

// Pregunta 2: Afegeix la instrucció necessària per convertir la resposta a JSON.
// Ya lo hice arriba, return response.json();

// Pregunta 3: Explica per què response.json() retorna una promesa.
// Porque parsear el JSON puede tardar tiempo si el archivo es grande, así que es asíncrono y devuelve una promesa para no bloquear el hilo principal.

// Pregunta 4: Reescriu el codi utilitzant async/await.
// async function getProductes() {
//   try {
//     const response = await fetch("productes.json");
//     if (!response.ok) {
//       throw new Error('La respuesta no está bien, status: ' + response.status);
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }
// getProductes();

// Pregunta 5: Indica un avantatge de fetch() respecte a XMLHttpRequest.
// Fetch es más moderno y fácil de usar, soporta promesas nativamente, no necesitas callbacks raros como en XMLHttpRequest.
