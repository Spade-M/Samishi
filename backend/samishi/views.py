from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SamishiSerializer
from .models import Samishi

# Create your views here.

class SamishiView(viewsets.ModelViewSet):
    serializer_class = SamishiSerializer
    queryset = Samishi.objects.all()