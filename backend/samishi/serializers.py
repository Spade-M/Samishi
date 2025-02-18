from rest_framework import serializers
from .models import Samishi
from django.contrib.auth.models import User

class SamishiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Samishi
        fields = ('id', 'title', 'description', 'completed')
        
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)  # Don't send password back in response

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password') # Include email
        extra_kwargs = {'password': {'write_only': True}}  # Password write-only

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) # Use create_user for password hashing
        return user
