document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario
    
    const nom = document.getElementById('nom').value;
    const edat = document.getElementById('edat').value;
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "usuari.php", true);
    
    // Establecer el tipo de contenido
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Mostrar la respuesta del servidor
                document.getElementById('response').innerHTML = xhr.responseText;
            } else {
                // Manejar error
                document.getElementById('response').innerHTML = "Error en la petició: " + xhr.status;
            }
        }
    };
    
    // Preparar les dades
    const data = `nom=${encodeURIComponent(nom)}&edat=${encodeURIComponent(edat)}`;
    
    // Enviar la petició
    xhr.send(data);
});