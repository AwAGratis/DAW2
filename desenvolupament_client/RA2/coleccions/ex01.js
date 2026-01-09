class Producte {
    constructor(nom, stock, venuts = 0) {
        this.nom = nom;
        this.stock = stock;
        this.venuts = venuts;
    }
}

// Array inicial amb 5 productes
const inventari = [
    new Producte("Laptop", 10, 2),
    new Producte("Ratolí", 50, 15),
    new Producte("Teclat", 30, 8),
    new Producte("Monitor", 5, 1),
    new Producte("Auriculars", 25, 10)
];

// Llistar tots els productes
function llistarProductes() {
    console.log("INVENTARI DE PRODUCTES");
    inventari.forEach((producte, index) => {
        console.log(`${index + 1}. ${producte.nom} - Stock: ${producte.stock} - Venuts: ${producte.venuts}`);
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
    console.log(`✓ Compra realitzada: ${unitats} unitat(s) de ${producte.nom}`);
    return true;
}

// Exemples d'ús
llistarProductes();
console.log("\n--- Compra de 3 Teclats ---");
comprar("Teclat", 3);
console.log("\n--- Intent de compra de 100 Ratolins ---");
comprar("Ratolí", 100);
console.log("\n--- Inventari actualitzat ---");
llistarProductes();