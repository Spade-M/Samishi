from rest_framework import serializers
from .models import Samishi
#A test commit to check why branch is created
class SamishiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Samishi
        fields = ('id', 'title', 'description', 'completed')