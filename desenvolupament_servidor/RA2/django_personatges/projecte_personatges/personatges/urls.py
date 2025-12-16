from django.urls import path
from . import views

app_name = 'personatges'

urlpatterns = [
    path('', views.home, name='home'),
    path('<str:valor>/', views.personatge_view, name='personatge'),
]
