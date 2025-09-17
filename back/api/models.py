from django.db import models
from django.contrib.auth.models import User

class Tarefa(models.Model):

    PRIORIDADE = [
        ('Alta', 'Alta'),
        ('Média', 'Média'),
        ('Baixa', 'Baixa'),
    ]

    STATUS = [
        ('a_fazer', 'A Fazer'),
        ('fazendo', 'Fazendo'),
        ('pronto', 'Pronto'),
    ]

    descricao = models.CharField(max_length=255)
    setor = models.CharField(max_length=255)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    prioridade = models.CharField(max_length=10, choices=PRIORIDADE)
    status = models.CharField(max_length=20, choices=STATUS, default="a_fazer")


