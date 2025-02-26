from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Sign Up Endpoint
@method_decorator(csrf_exempt, name='dispatch')
class SignupView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")
        if not username or not password:
            return Response({"error": "Please provide both username and password"},
                            status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"},
                            status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=username, password=password, email=email)
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

# Login Endpoint
@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  # Django creates a session
            return Response({"message": "Logged in successfully"})
        else:
            return Response({"error": "Invalid credentials"},
                            status=status.HTTP_401_UNAUTHORIZED)

# Endpoint to Get Current User Details
@method_decorator(csrf_exempt, name='dispatch')
class UserDetailView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                "username": request.user.username,
                "email": request.user.email,
                # add other fields as needed
            })
        else:
            return Response({"error": "Not authenticated"},
                            status=status.HTTP_401_UNAUTHORIZED)
            
@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                "username": request.user.username,
                "email": request.user.email,
                # add other fields as needed
            })
        else:
            return Response({"error": "Not authenticated"},
                            status=status.HTTP_401_UNAUTHORIZED)
