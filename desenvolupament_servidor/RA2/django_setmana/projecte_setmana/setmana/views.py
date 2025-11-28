from django.shortcuts import render, redirect
from django.http import HttpResponse

# Create your views here.

# Mapa de números a noms dels dies (posem noms en català per coherència amb l'enunciat;
# pots canviar-ho a castellà si prefereixes).
DIES_SETMANA = {
    1: 'Dilluns',
    2: 'Dimarts',
    3: 'Dimecres',
    4: 'Dijous',
    5: 'Divendres',
    6: 'Dissabte',
    7: 'Diumenge',
}

def home(request):
    """
    Página principal que explica cómo funciona la app.
    """
    # Renderizamos la plantilla home.html con el título y la explicación.
    return render(request, 'setmana/home.html', context={'titol': 'Dies de la Setmana'})

def dia_view(request, valor):
    """
    Vista que recibe cualquier string 'valor' desde la URL y lo procesa.
    Comentarios paso a paso:
    1. Intentamos convertir 'valor' a entero.
       - Si falla (ValueError): significa que el usuario puso texto no numérico -> error controlado.
    2. Si la conversión tiene éxito:
       - Si el número <= 0: redirigimos al home.
       - Si 1 <= número <= 7: mostramos el día y la imagen correspondiente.
       - Si número > 7: devolvemos mensaje "valor numérico no permès".
    """
    # Paso 1: intentar convertir a entero
    try:
        numero = int(valor)
    except ValueError:
        # Valor no numérico: devolvemos una página de error.
        # No dejamos que la app caiga; informamos al usuario que el valor no es numérico.
        contexto = {
            'titol': 'Error: valor no numèric',
            'missatge': f"Has introduït '{valor}', que no és un valor numèric vàlid. Introdueix un número entre 1 i 7, o 0/negatiu per tornar al home."
        }
        return render(request, 'setmana/error.html', contexto)

    # Paso 2: gestionamos valores numéricos
    if numero <= 0:
        # Si el número es 0 o negativo, redirigimos al home (según el enunciado).
        return redirect('setmana:home')

    if numero > 7:
        # Número mayor que 7 -> mensaje de valor no permitido
        contexto = {
            'titol': 'Valor numèric no permès',
            'missatge': f"Has introduït el número {numero}. Valor numèric no permès. Introdueix un número entre 1 i 7."
        }
        return render(request, 'setmana/error.html', contexto)

    # Si hemos llegado aquí, el número está en 1..7 -> mostramos día + imagen.
    nom_dia = DIES_SETMANA.get(numero, 'Desconegut')  # fallback, encara que no cal
    # Construimos el path de la imagen (assumim que tens les imatges a static/setmana/images/dia{n}.png)
    ruta_imatge = f'setmana/images/dia{numero}.png'

    contexto = {
        'titol': f'Dia {numero}: {nom_dia}',
        'nom_dia': nom_dia,
        'numero': numero,
        'ruta_imatge': ruta_imatge,
    }
    return render(request, 'setmana/dia.html', contexto)
