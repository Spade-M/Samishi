from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.authentication import SessionAuthentication

# Custom authentication class to bypass CSRF for logout
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        # Do not perform the CSRF check.
        return

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
        User.objects.create_user(username=username, password=password, email=email)
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
    authentication_classes = (CsrfExemptSessionAuthentication,)
    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                "username": request.user.username,
                "email": request.user.email,
            })
        else:
            return Response({"error": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request):
        if request.user.is_authenticated:
            user = request.user
            user.username = request.data.get("username", user.username)
            user.email = request.data.get("email", user.email)
            new_password = request.data.get("password")
            if new_password:
                user.set_password(new_password)
            user.save()
            return Response({"message": "User updated successfully"})
        else:
            return Response({"error": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request):
        if request.user.is_authenticated:
            request.user.delete()
            return Response({"message": "User deleted successfully"})
        else:
            return Response({"error": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

# Logout Endpoint with CSRF bypass using custom authentication
@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication,)
    
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
