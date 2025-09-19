from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *


class TarefaSerializer(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    usuario_nome = serializers.CharField(source='usuario.username', read_only=True)
    class Meta:
        model = Tarefa
        fields = '__all__'


class UsuarioSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=150) 

    class Meta:
        model = User
        fields = ['id', 'username', 'email']

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],  
            email=validated_data['email'],
        )
        user.set_unusable_password()
        user.save()
        return user
