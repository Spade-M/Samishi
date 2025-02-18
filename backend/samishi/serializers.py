from rest_framework import serializers
from .models import Samishi
class SamishiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Samishi
        fields = ('id', 'title', 'description', 'completed')
        
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)  # Don't send password back in response