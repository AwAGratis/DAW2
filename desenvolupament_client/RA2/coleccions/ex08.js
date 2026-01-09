class Producte {
    constructor(nom, stock, venuts = 0, categoria = "Altres") {
        this.nom = nom;
        this.stock = stock;
        this.venuts = venuts;
        this.categoria = categoria;
    }
}

// Map per sincronitzar estoc (clau: nom del producte, valor: estoc)
const estocMap = new Map();

// Array inicial amb 5 productes
const inventari = [
    new Producte("Laptop", 10, 2, "Ordinadors"),
    new Producte("Ratolí", 50, 15, "Perifèrics"),
    new Producte("Teclat", 30, 8, "Perifèrics"),
    new Producte("Monitor", 5, 1, "Monitors"),
    new Producte("Auriculars", 25, 10, "Àudio")
];

// Set per emmagatzemar categories úniques
const categoriesSet = new Set();

// FUNCIONS DE SINCRONITZACIÓ
// Actualitzar Map des de l'array
function actualitzarMapDesDeArray() {
    estocMap.clear();
    inventari.forEach(producte => {
        estocMap.set(producte.nom, producte.stock);
    });
    console.log("✓ Map actualitzat des de l'array");
}

// Actualitzar array des del Map
function actualitzarArrayDesDeMap() {
    inventari.forEach(producte => {
        if (estocMap.has(producte.nom)) {
            producte.stock = estocMap.get(producte.nom);
        }
    });
    console.log("✓ Array actualitzat des del Map");
}

// Llistar tots els productes
function llistarProductes() {
    console.log("INVENTARI DE PRODUCTES");
    inventari.forEach((producte, index) => {
        console.log(`${index + 1}. ${producte.nom} - Stock: ${producte.stock} - Venuts: ${producte.venuts} - Categoria: ${producte.categoria}`);
    });
}

// Cercar un producte per nom
function cercarProducte(nom) {
    const producte = inventari.find(p => p.nom.toLowerCase() === nom.toLowerCase());
    if (producte) {
        console.log(`✓ Producte trobat: ${producte.nom} (Stock: ${producte.stock})`);
        return producte;
    } else {
        console.log(`✗ Producte "${nom}" no trobat.`);
        return null;
    }
}

// Comprar producte amb validació d'estoc
function comprar(nom, unitats) {
    const producte = cercarProducte(nom);
    
    if (!producte) return false;
    
    if (unitats <= 0) {
        console.log("✗ Error: Les unitats han de ser positives.");
        return false;
    }
    
    if (unitats > producte.stock) {
        console.log(`✗ Error: No hi ha suficient estoc. Disponible: ${producte.stock}`);
        return false;
    }
    
    producte.stock -= unitats;
    producte.venuts += unitats;
    estocMap.set(nom, producte.stock);
    console.log(`✓ Compra realitzada: ${unitats} unitat(s) de ${producte.nom}`);
    return true;
}

// Alta de producte (afegir nou producte)
function altaProducte(nom, stock, categoria = "Altres") {
    if (stock <= 0) {
        console.log("✗ Error: El stock ha de ser positiu.");
        return false;
    }
    
    const index = inventari.findIndex(p => p.nom.toLowerCase() === nom.toLowerCase());
    
    if (index !== -1) {
        console.log(`✗ Error: El producte "${nom}" ja existeix en l'inventari.`);
        return false;
    }
    
    const nouProducte = new Producte(nom, stock, 0, categoria);
    inventari.push(nouProducte);
    estocMap.set(nom, stock);
    categoriesSet.add(categoria);
    console.log(`✓ Producte "${nom}" afegit correctament amb ${stock} unitats de stock (Categoria: ${categoria}).`);
    return true;
}

// Baixa de producte (eliminar producte)
function baixaProducte(nom) {
    const index = inventari.findIndex(p => p.nom.toLowerCase() === nom.toLowerCase());
    
    if (index === -1) {
        console.log(`✗ Error: El producte "${nom}" no existeix en l'inventari.`);
        return false;
    }
    
    const producteEliminat = inventari.splice(index, 1)[0];
    estocMap.delete(nom);
    console.log(`✓ Producte "${producteEliminat.nom}" eliminat correctament de l'inventari.`);
    return true;
}

// Rànquing dels productes més venuts
function rànquingProductes() {
    const copia = inventari.slice();
    copia.sort((a, b) => b.venuts - a.venuts);
    
    console.log("RÀNQUING DELS PRODUCTES MÉS VENUTS");
    copia.slice(0, 3).forEach((producte, index) => {
        console.log(`${index + 1}) ${producte.nom} - ${producte.venuts} venuts`);
    });
}

// Productes sense estoc
function senseEstoc() {
    return inventari.filter(p => p.stock === 0);
}

// Verificar si hi ha productes sense estoc
function hiHaSenseEstoc() {
    return inventari.some(p => p.stock === 0);
}

// Actualitzar Set de categories
function actualitzarCategories() {
    categoriesSet.clear();
    inventari.forEach(producte => {
        categoriesSet.add(producte.categoria);
    });
}

// Mostrar categories ordenades
function mostrarCategoriesOrdentades() {
    actualitzarCategories();
    const categoriesArray = Array.from(categoriesSet).sort();
    console.log("CATEGORIES ÚNIQUES (ORDENADES)");
    categoriesArray.forEach((categoria, index) => {
        console.log(`${index + 1}. ${categoria}`);
    });
    return categoriesArray;
}

// Funcions auxiliars que faltaven
function totalUnitats() {
    return inventari.reduce((suma, p) => suma + p.stock, 0);
}

function totalVenuts() {
    return inventari.reduce((suma, p) => suma + p.venuts, 0);
}

function producteAmbMésEstoc() {
    return inventari.reduce((max, p) => p.stock > max.stock ? p : max);
}

function producteAmbMenyEstoc() {
    return inventari.reduce((min, p) => p.stock < min.stock ? p : min);
}

function mostrarCategories() {
    const categoriesArray = Array.from(categoriesSet).sort();
    console.log("CATEGORIES DELS PRODUCTES:");
    categoriesArray.forEach((categoria, index) => {
        console.log(`${index + 1}. ${categoria}`);
    });
}

// SISTEMA DE MENÚ
function mostrarMenu() {
    console.log("SISTEMA DE GESTIÓ D'INVENTARI");
    console.log("1. Llistar productes");
    console.log("2. Comprar producte");
    console.log("3. Alta producte (afegir)");
    console.log("4. Baixa producte (eliminar)");
    console.log("5. Rànquing de més venuts");
    console.log("6. Estadístiques generals");
    console.log("0. Sortir");
}

function llistarProductesInteractiu() {
    console.log("\n═══════════════════════════════════════════════════════════");
    console.log("INVENTARI DE PRODUCTES");
    console.log("═══════════════════════════════════════════════════════════");
    
    if (inventari.length === 0) {
        console.log("No hi ha productes en l'inventari.");
        return;
    }
    
    inventari.forEach((producte, index) => {
        const estoc = producte.stock > 0 ? `✓ ${producte.stock}` : "✗ 0 (Sense estoc)";
        console.log(`${index + 1}. ${producte.nom.padEnd(20)} | Stock: ${estoc.padEnd(15)} | Venuts: ${producte.venuts} | Categoria: ${producte.categoria}`);
    });
    console.log("═══════════════════════════════════════════════════════════\n");
}

function comprarInteractiu() {
    console.log("\n--- COMPRA DE PRODUCTE ---");
    const nom = prompt("Introdueix el nom del producte a comprar: ");
    
    if (!nom || nom.trim() === "") {
        console.log("✗ Nom de producte invàlid.");
        return;
    }
    
    const unitatsStr = prompt("Introdueix el nombre d'unitats a comprar: ");
    const unitats = parseInt(unitatsStr);
    
    if (isNaN(unitats)) {
        console.log("✗ Error: Has d'introduir un nombre.");
        return;
    }
    
    comprar(nom, unitats);
}

function altaProducteInteractiu() {
    console.log("\n--- ALTA DE PRODUCTE ---");
    const nom = prompt("Introdueix el nom del nou producte: ");
    
    if (!nom || nom.trim() === "") {
        console.log("✗ Nom de producte invàlid.");
        return;
    }
    
    const stockStr = prompt("Introdueix el stock inicial: ");
    const stock = parseInt(stockStr);
    
    if (isNaN(stock)) {
        console.log("✗ Error: Has d'introduir un nombre.");
        return;
    }
    
    const categoria = prompt("Introdueix la categoria (per defecte 'Altres'): ") || "Altres";
    
    altaProducte(nom, stock, categoria);
}

function baixaProducteInteractiu() {
    console.log("\n--- BAIXA DE PRODUCTE ---");
    const nom = prompt("Introdueix el nom del producte a eliminar: ");
    
    if (!nom || nom.trim() === "") {
        console.log("✗ Nom de producte invàlid.");
        return;
    }
    
    baixaProducte(nom);
}

function rànquingInteractiu() {
    console.log("\n");
    rànquingProductes();
}

function estadístiquesInteractiu() {
    console.log("\n═══════════════════════════════════════════════════════════");
    console.log("ESTADÍSTIQUES GENERALS");
    console.log("═══════════════════════════════════════════════════════════");
    console.log(`✓ Total d'unitats en estoc: ${totalUnitats()}`);
    console.log(`✓ Total d'unitats venudes: ${totalVenuts()}`);
    
    if (inventari.length > 0) {
        const maxStock = producteAmbMésEstoc();
        console.log(`✓ Producte amb més estoc: ${maxStock.nom} (${maxStock.stock} unitats)`);
        const minStock = producteAmbMenyEstoc();
        console.log(`✓ Producte amb menys estoc: ${minStock.nom} (${minStock.stock} unitats)`);
    }
    
    console.log("═══════════════════════════════════════════════════════════\n");
}

function processarOpcio(opcio) {
    switch (opcio) {
        case "1":
            llistarProductesInteractiu();
            break;
        case "2":
            llistarProductesInteractiu();
            comprarInteractiu();
            break;
        case "3":
            altaProducteInteractiu();
            break;
        case "4":
            llistarProductesInteractiu();
            baixaProducteInteractiu();
            break;
        case "5":
            rànquingInteractiu();
            break;
        case "6":
            estadístiquesInteractiu();
            break;
        case "0":
            console.log("\n✓ Gràcies per utilitzar el sistema de gestió d'inventari. Fins aviat!\n");
            return false;
        default:
            console.log("\n✗ Opció no vàlida. Introdueix un número entre 0 i 6.\n");
    }
    return true;
}

function iniciarAplicacio() {
    actualitzarMapDesDeArray();
    actualitzarCategories();
    
    let continuarExecutant = true;
    
    while (continuarExecutant) {
        mostrarMenu();
        const opcio = prompt("Selecciona una opció (0-6): ");
        continuarExecutant = processarOpcio(opcio);
    }
}

// Iniciar l'aplicació
iniciarAplicacio();