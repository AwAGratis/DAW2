from django.shortcuts import render
from .models import Book, Author, BookInstance, Genre

# Create your views here.

def index(request):
    """Vista per a la pàgina inicial de la biblioteca."""
    
    # Comptar els llibres, autors i còpies
    num_books = Book.objects.all().count()
    num_authors = Author.objects.all().count()
    num_instances = BookInstance.objects.all().count()
    num_available = BookInstance.objects.filter(status='a').count()
    
    # Obtenir els últims 5 llibres afegits
    top_books = Book.objects.all()[:5]
    
    context = {
        'num_books': num_books,
        'num_authors': num_authors,
        'num_instances': num_instances,
        'num_available': num_available,
        'top_books': top_books,
    }
    
    return render(request, 'catalog/index.html', context)
