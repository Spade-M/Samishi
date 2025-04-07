import os
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from .models import Post, PostImage, Like, Comment
from .serializers import PostSerializer

# Define a maximum file size (5 MB in this example)
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

# Sign Up Endpoint
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
        token = Token.objects.create(user=user)
        return Response({"message": "User created successfully", "token": token.key}, status=status.HTTP_201_CREATED)

# Login Endpoint
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "Logged in successfully", "token": token.key})
        else:
            return Response({"error": "Invalid credentials"},
                            status=status.HTTP_401_UNAUTHORIZED)

# Endpoint to Get Current User Details
class UserDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "username": request.user.username,
            "email": request.user.email,
        })

    def put(self, request):
        user = request.user
        user.username = request.data.get("username", user.username)
        user.email = request.data.get("email", user.email)
        new_password = request.data.get("password")
        if new_password:
            user.set_password(new_password)
        user.save()
        return Response({"message": "User updated successfully"})

    def delete(self, request):
        request.user.delete()
        return Response({"message": "User deleted successfully"})

# Logout Endpoint 
class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()  # Deletes the token
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

class PostListCreateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        try:
            page = int(request.query_params.get("page", 1))
            page_size = int(request.query_params.get("page_size", 10))
        except ValueError:
            page = 1
            page_size = 10

        all_posts = Post.objects.all().order_by('-created_at')
        total = all_posts.count()
        start = (page - 1) * page_size
        end = start + page_size
        posts = all_posts[start:end]
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response({
            "total": total,
            "page": page,
            "page_size": page_size,
            "results": serializer.data,
        })

    def post(self, request):
        caption = request.data.get('caption', '')
        post = Post.objects.create(user=request.user, caption=caption)
        files = request.FILES.getlist('images')
        for file in files:
            if not file.content_type.startswith("image/"):
                continue
            if file.size > MAX_FILE_SIZE:
                return Response({"error": f"File {file.name} exceeds maximum size of 5 MB."},
                                status=status.HTTP_400_BAD_REQUEST)
            PostImage.objects.create(post=post, image=file)
        serializer = PostSerializer(post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class PostDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            post = Post.objects.get(pk=pk, user=request.user)
        except Post.DoesNotExist:
            return Response({"error": "Post not found or not authorized"}, status=status.HTTP_404_NOT_FOUND)
        post.delete()
        return Response({"message": "Post deleted successfully"}, status=status.HTTP_200_OK)

class PostLikeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        like, created = Like.objects.get_or_create(user=request.user, post=post)
        if not created:
            like.delete()
        serializer = PostSerializer(post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class PostCommentView(APIView):
    authentication_classes = [TokenAuthentication]
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
        comment_data = {
            "id": comment.id,
            "user": comment.user.username,
            "text": comment.text,
            "created_at": comment.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
        return Response(comment_data, status=status.HTTP_201_CREATED)

class CommentDeleteView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id, post_id=post_id)
            if comment.user != request.user:
                return Response({"error": "You can only delete your own comment."}, status=status.HTTP_403_FORBIDDEN)
            comment.delete()
            return Response({"message": "Comment deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response({"error": "Comment not found."}, status=status.HTTP_404_NOT_FOUND)
