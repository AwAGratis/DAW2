from django.urls import path
from . import views

app_name = 'setmana'

urlpatterns = [
    path('', views.home, name='home'),
    path('<str:valor>/', views.dia_view, name='dia'),
]
