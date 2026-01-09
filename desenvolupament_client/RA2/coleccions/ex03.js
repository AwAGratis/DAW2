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

// Alta de producte (afegir nou producte)
function altaProducte(nom, stock) {
    if (stock <= 0) {
        console.log("✗ Error: El stock ha de ser positiu.");
        return false;
    }
    
    const index = inventari.findIndex(p => p.nom.toLowerCase() === nom.toLowerCase());
    
    if (index !== -1) {
        console.log(`✗ Error: El producte "${nom}" ja existeix en l'inventari.`);
        return false;
    }
    
    const nouProducte = new Producte(nom, stock, 0);
    inventari.push(nouProducte);
    console.log(`✓ Producte "${nom}" afegit correctament amb ${stock} unitats de stock.`);
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

// Exemples d'ús
llistarProductes();
console.log("\n--- Compra de 3 Teclats ---");
comprar("Teclat", 3);
console.log("\n--- Intent de compra de 100 Ratolins ---");
comprar("Ratolí", 100);
console.log("\n--- Inventari actualitzat ---");
llistarProductes();

console.log("\n--- Alta de nous productes ---");
altaProducte("USB Hub", 20);
altaProducte("Webcam", 15);
console.log("\n--- Intent de duplicat ---");
altaProducte("Laptop", 5);
console.log("\n--- Inventari amb nous productes ---");
llistarProductes();

console.log("\n--- Baixa de producte ---");
baixaProducte("Monitor");
console.log("\n--- Intent de baixa de producte inexistent ---");
baixaProducte("Impressora");
console.log("\n--- Inventari final ---");
llistarProductes();

console.log("\n--- Rànquing dels més venuts ---");
rànquingProductes();