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

// Exemples d'ús
// Inicialitzar el Map des de l'array
actualitzarMapDesDeArray();

llistarProductes();
console.log("\n--- Compra de 3 Teclats ---");
comprar("Teclat", 3);
console.log("\n--- Intent de compra de 100 Ratolins ---");
comprar("Ratolí", 100);
console.log("\n--- Inventari actualitzat ---");
llistarProductes();

console.log("\n--- Sincronització: Array → Map ---");
actualitzarMapDesDeArray();
console.log("Contingut del Map:", Array.from(estocMap.entries()));

console.log("\n--- Alta de nous productes ---");
altaProducte("USB Hub", 20, "Perifèrics");
altaProducte("Webcam", 15, "Vídeo");
console.log("\n--- Intent de duplicat ---");
altaProducte("Laptop", 5);
console.log("\n--- Inventari amb nous productes ---");
llistarProductes();

console.log("\n--- CATEGORIES ÚNIQUES ---");
mostrarCategoriesOrdentades();

console.log("\n--- Sincronització: Array → Map ---");
actualitzarMapDesDeArray();
console.log("Contingut del Map:", Array.from(estocMap.entries()));

console.log("\n--- Baixa de producte ---");
baixaProducte("Monitor");
console.log("\n--- Intent de baixa de producte inexistent ---");
baixaProducte("Impressora");
console.log("\n--- Inventari final ---");
llistarProductes();

console.log("\n--- Sincronització: Array → Map ---");
actualitzarMapDesDeArray();
console.log("Contingut del Map:", Array.from(estocMap.entries()));

console.log("\n--- Rànquing dels més venuts ---");
rànquingProductes();

console.log("\n--- Productes sense estoc ---");
const productesSenseEstoc = senseEstoc();
if (hiHaSenseEstoc()) {
    console.log("Hi ha productes sense estoc:");
    productesSenseEstoc.forEach(p => console.log(`- ${p.nom}`));
} else {
    console.log("Tots els productes tenen estoc disponible.");
}

console.log("\n--- ESTADÍSTIQUES GENERALS ---");
console.log(`Total d'unitats en estoc: ${totalUnitats()}`);
console.log(`Total d'unitats venudes: ${totalVenuts()}`);
const maxStock = producteAmbMésEstoc();
console.log(`Producte amb més estoc: ${maxStock.nom} (${maxStock.stock} unitats)`);
const minStock = producteAmbMenyEstoc();
console.log(`Producte amb menys estoc: ${minStock.nom} (${minStock.stock} unitats)`);

console.log("\n--- CATEGORIES DELS PRODUCTES ---");
inventari.forEach(producte => categoriesSet.add(producte.categoria));
mostrarCategories();
mostrarCategoriesOrdentades();