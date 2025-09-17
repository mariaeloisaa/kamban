from django.urls import path
from .views import *

urlpatterns = [
    path('tarefas/', TarefaView.as_view()),
    path('tarefa/<int:pk>/', TarefaDetailView.as_view()),
    path('usuario/', UsuarioView.as_view(), name='usuarios'),
    
]
