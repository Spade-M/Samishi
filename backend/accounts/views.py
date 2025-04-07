from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.authentication import SessionAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from .models import Post, PostImage, Like, Comment
from .serializers import PostSerializer  # We'll use this for posts (which now includes likes and comments)

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

@method_decorator(csrf_exempt, name='dispatch')
class PostListCreateView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication,)
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        posts = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        caption = request.data.get('caption', '')
        post = Post.objects.create(user=request.user, caption=caption)
        files = request.FILES.getlist('images')
        for file in files:
            PostImage.objects.create(post=post, image=file)
        serializer = PostSerializer(post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@method_decorator(csrf_exempt, name='dispatch')
class PostDetailView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication,)
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            # Only allow deletion if the logged in user is the owner of the post.
            post = Post.objects.get(pk=pk, user=request.user)
        except Post.DoesNotExist:
            return Response({"error": "Post not found or not authorized"}, status=status.HTTP_404_NOT_FOUND)
        post.delete()
        return Response({"message": "Post deleted successfully"}, status=status.HTTP_200_OK)

# New endpoint: Toggle like/unlike on a post
@method_decorator(csrf_exempt, name='dispatch')
class PostLikeView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        # Toggle like: if a like exists, remove it; otherwise create one.
        like, created = Like.objects.get_or_create(user=request.user, post=post)
        if not created:
            like.delete()
        # Return updated post data including like count
        serializer = PostSerializer(post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

# New endpoint: Add a comment to a post
@method_decorator(csrf_exempt, name='dispatch')
class PostCommentView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication,)
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        text = request.data.get("text", "")
        if not text.strip():
            return Response({"error": "Comment text cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
        comment = Comment.objects.create(user=request.user, post=post, text=text)
        # Return the new comment data
        comment_data = {
            "id": comment.id,
            "user": comment.user.username,
            "text": comment.text,
            "created_at": comment.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
        return Response(comment_data, status=status.HTTP_201_CREATED)
