<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = isset($_POST['nom']) ? htmlspecialchars($_POST['nom']) : '';
    $edat = isset($_POST['edat']) ? htmlspecialchars($_POST['edat']) : '';
    
    if (!empty($nom) && !empty($edat)) {
        echo "Dades rebudes: Nom: $nom, Edat: $edat";
    } else {
        echo "Error: Falten dades.";
    }
} else {
    echo "Mètode no permès.";
}
?>