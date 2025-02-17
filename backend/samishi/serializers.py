from rest_framework import serializers
from .models import Samishi
#Final test
class SamishiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Samishi
        fields = ('id', 'title', 'description', 'completed')