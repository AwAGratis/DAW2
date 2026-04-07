// Exercici 1
function carregarMissatge() {
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "missatge.txt", true);
    xhr1.onreadystatechange = function() {
        if (xhr1.readyState === 4 && xhr1.status === 200) {
            document.getElementById("resultat1").textContent = xhr1.responseText;
        }
    };
    xhr1.send();
}

// Exercici 2
var xhr2 = new XMLHttpRequest();
xhr2.open("GET", "missatge.txt", true);
xhr2.onreadystatechange = function() {
    document.getElementById("estat2").textContent = "readyState: " + xhr2.readyState;
};
xhr2.send();

// Exercici 3
var xhr3 = new XMLHttpRequest();
xhr3.open("GET", "alumnes.json", true);
xhr3.onreadystatechange = function() {
    if (xhr3.readyState === 4 && xhr3.status === 200) {
        var alumnes = JSON.parse(xhr3.responseText);
        var ul = document.getElementById("llista3");
        alumnes.forEach(function(alumne) {
            var li = document.createElement("li");
            li.textContent = alumne.nom;
            ul.appendChild(li);
        });
    }
};
xhr3.send();

// Exercici 4
var xhr4 = new XMLHttpRequest();
xhr4.open("GET", "productes.json", true);
xhr4.onreadystatechange = function() {
    if (xhr4.readyState === 4 && xhr4.status === 200) {
        var productes = JSON.parse(xhr4.responseText);
        var ul = document.getElementById("productes4");
        productes.forEach(function(producte) {
            var li = document.createElement("li");
            li.textContent = producte.nom + " - " + producte.preu + "€";
            ul.appendChild(li);
        });
    }
};
xhr4.send();

// Exercici 5
var xhr5 = new XMLHttpRequest();
xhr5.open("GET", "inexistent.txt", true);
xhr5.onreadystatechange = function() {
    if (xhr5.readyState === 4) {
        if (xhr5.status === 200) {
            document.getElementById("missatge5").textContent = "Fitxer carregat correctament";
        } else if (xhr5.status === 404) {
            document.getElementById("missatge5").textContent = "Error 404: fitxer no trobat";
        }
    }
};
xhr5.send();