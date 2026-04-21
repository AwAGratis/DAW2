from django.contrib import admin
from .models import Author, Book, BookInstance, Genre, Language

# Register your models here.

# Define the admin class for Language
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('name',)

# Define the admin class for Genre  
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)

# Define the admin class for Author
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('last_name', 'first_name', 'date_of_birth', 'date_of_death')
    fields = ['first_name', 'last_name', ('date_of_birth', 'date_of_death')]

# Define the admin class for Book
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'display_genre', 'language')
    list_filter = ('genre', 'language', 'author')

# Define the admin class for BookInstance
class BookInstanceAdmin(admin.ModelAdmin):
    list_display = ('book', 'status', 'due_back', 'id')
    list_filter = ('status', 'due_back')
    fieldsets = (
        ('Book', {'fields': ('book', 'imprint', 'id')}),
        ('Availability', {'fields': ('status', 'due_back')}),
    )

# Register models with their admin classes
admin.site.register(Language, LanguageAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(BookInstance, BookInstanceAdmin)
