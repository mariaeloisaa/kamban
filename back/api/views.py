from django.shortcuts import render
from .models import *
from .serializer import *
from django.contrib.auth.models import User
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView


class TarefaView(ListCreateAPIView):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

class TarefaDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer


class UsuarioView(ListCreateAPIView): 
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer
