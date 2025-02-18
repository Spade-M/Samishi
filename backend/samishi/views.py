from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from .serializers import LoginSerializer
from rest_framework.authtoken.models import Token # For Token authentication
from rest_framework.permissions import AllowAny # Allow anyone to access the login
from .serializers import UserSerializer  # Create this serializer (see below)


class LoginView(APIView):
    permission_classes = [AllowAny] # Allow anyone to access the login
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = authenticate(request, username=username, password=password) # Django authentication

            if user:
                login(request, user) # Django session login (if you want this)
                token, created = Token.objects.get_or_create(user=user) # Get or create a token
                return Response({'token': token.key}, status=status.HTTP_200_OK) # Send the token back
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SignupView(APIView):
    permission_classes = [AllowAny] # Allow anyone to access the signup
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Create the user
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

