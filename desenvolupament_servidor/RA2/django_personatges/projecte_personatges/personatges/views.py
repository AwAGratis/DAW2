from django.shortcuts import render, redirect
from django.http import HttpResponse

# Create your views here.

# Diccionari de personatges de The Binding of Isaac
PERSONATGES = {
    'isaac': {
        'nom': 'Isaac',
        'frase': 'Un niño destrozado por la fe...',
        'imatge': 'personatges/images/isaac.png',
    },
    'magdalene': {
        'nom': 'Magdalene',
        'frase': 'La devoción es su fortaleza.',
        'imatge': 'personatges/images/magdalene.png',
    },
    'cain': {
        'nom': 'Cain',
        'frase': 'El cazador maldito busca venganza.',
        'imatge': 'personatges/images/cain.png',
    },
    'judas': {
        'nom': 'Judas',
        'frase': 'El traidor que busca redención.',
        'imatge': 'personatges/images/judas.png',
    },
    'bluebaby': {
        'nom': 'Blue Baby',
        'frase': 'Un bebé atrapado entre dos mundos.',
        'imatge': 'personatges/images/bluebaby.png',
    },
}

def home(request):
    """
    Página principal que muestra los 5 personajes disponibles.
    """
    personatges_list = [
        {'key': 'isaac', 'nom': 'Isaac'},
        {'key': 'magdalene', 'nom': 'Magdalene'},
        {'key': 'cain', 'nom': 'Cain'},
        {'key': 'judas', 'nom': 'Judas'},
        {'key': 'bluebaby', 'nom': 'Blue Baby'},
    ]
    
    return render(request, 'personatges/personatge.html', context={
        'titol': 'Personatges de The Binding of Isaac',
        'pagina': 'home',
        'personatges': personatges_list
    })

def personatge_view(request, valor):
    """
    Vista que recibe el nombre del personaje desde la URL y lo procesa.
    1. Si valor es 'home', redirige al home.
    2. Si valor coincide con un personaje, muestra su información.
    3. Si no coincide, muestra página de error.
    """
    
    # Si el usuario pone 'home' en la URL
    if valor.lower() == 'home':
        return redirect('personatges:home')
    
    # Buscamos el personaje (insensible a mayúsculas)
    personatge = PERSONATGES.get(valor.lower())
    
    if personatge is None:
        # Personaje no encontrado -> error
        contexto = {
            'titol': 'Error: Personatge no trobàt',
            'pagina': 'error',
            'missatge': f"El personatge '{valor}' no existeix. Els personatges disponibles són: isaac, magdalene, cain, judas, bluebaby.",
            'meme_url': 'personatges/images/meme.jpg',
        }
        return render(request, 'personatges/personatge.html', contexto)
    
    # Mostrar información del personaje
    contexto = {
        'titol': f'Personatge: {personatge["nom"]}',
        'pagina': 'personatge',
        'nom': personatge['nom'],
        'frase': personatge['frase'],
        'imatge': personatge['imatge'],
    }
    return render(request, 'personatges/personatge.html', contexto)
