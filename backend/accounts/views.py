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
from django.db import IntegrityError

from .models import (
    Post, PostImage, Like, Comment, Profile, AdoptionPost,
    AdoptionLike, AdoptionComment  # New models for adoption posts likes and comments
)
from .serializers import (
    PostSerializer,
    AdoptionPostSerializer,
    AdoptionPostCreateSerializer,
    UserDetailSerializer  # Returns user details along with is_admin status
)

# Define a maximum file size (5 MB)
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

# -------------------- Adoption Posts Endpoints --------------------

# Create/List Adoption Posts
class AdoptionPostListCreateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        posts = AdoptionPost.objects.all().order_by('-created_at')
        serializer = AdoptionPostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        # Ensure only admin users can create an adoption post.
        if not request.user.is_staff:
            return Response({"error": "Only admin users can create adoption posts."},
                            status=status.HTTP_403_FORBIDDEN)
        serializer = AdoptionPostCreateSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save(admin=request.user)
            # Re-serialize the new post to include all fields (e.g., admin data)
            full_serializer = AdoptionPostSerializer(instance, context={'request': request})
            return Response(full_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Retrieve or Delete Individual Adoption Post
class AdoptionPostDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            post = AdoptionPost.objects.get(pk=pk)
        except AdoptionPost.DoesNotExist:
            return Response({"error": "Adoption post not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AdoptionPostSerializer(post, context={'request': request})
        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            post = AdoptionPost.objects.get(pk=pk)
            if post.admin != request.user:
                return Response({"error": "Only the admin can delete this post"}, status=status.HTTP_403_FORBIDDEN)
            post.delete()
            return Response({"message": "Adoption post deleted"}, status=status.HTTP_204_NO_CONTENT)
        except AdoptionPost.DoesNotExist:
            return Response({"error": "Adoption post not found"}, status=status.HTTP_404_NOT_FOUND)


# Like/Unlike an Adoption Post
class AdoptionPostLikeView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            post = AdoptionPost.objects.get(pk=pk)
        except AdoptionPost.DoesNotExist:
            return Response({"error": "Adoption post not found"}, status=status.HTTP_404_NOT_FOUND)
        like, created = AdoptionLike.objects.get_or_create(user=request.user, adoption_post=post)
        if not created:
            like.delete()
        serializer = AdoptionPostSerializer(post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


# Comment on an Adoption Post
class AdoptionPostCommentView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            post = AdoptionPost.objects.get(pk=pk)
        except AdoptionPost.DoesNotExist:
            return Response({"error": "Adoption post not found"}, status=status.HTTP_404_NOT_FOUND)

        text = request.data.get("text", "")
        if not text.strip():
            return Response({"error": "Comment text cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)

        comment = AdoptionComment.objects.create(user=request.user, adoption_post=post, text=text)
        serializer = AdoptionPostSerializer(post, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# Delete Comment on Adoption Post
class AdoptionCommentDeleteView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id, comment_id):
        try:
            comment = AdoptionComment.objects.get(id=comment_id, adoption_post_id=post_id)
            if comment.user != request.user:
                return Response({"error": "You can only delete your own comment."}, status=status.HTTP_403_FORBIDDEN)
            comment.delete()
            return Response({"message": "Comment deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except AdoptionComment.DoesNotExist:
            return Response({"error": "Comment not found."}, status=status.HTTP_404_NOT_FOUND)


# -------------------- User & Auth Endpoints --------------------

# Sign Up Endpoint with profile picture support
class SignupView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password or not email:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=username, password=password, email=email)
            profile, created = Profile.objects.get_or_create(user=user)
            
            profile_picture = request.FILES.get("profile_picture")
            if profile_picture:
                if not profile_picture.content_type.startswith("image/"):
                    return Response({"error": "Invalid image format."}, status=status.HTTP_400_BAD_REQUEST)
                if profile_picture.size > MAX_FILE_SIZE:
                    return Response({"error": "Profile picture exceeds max size (5 MB)."}, status=status.HTTP_400_BAD_REQUEST)
                profile.profile_picture = profile_picture
                profile.save()
            
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

        except IntegrityError:
            return Response({'error': 'A user with this info already exists'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Login Endpoint
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Logged in successfully",
                "token": token.key,
                "is_admin": user.is_staff
            })
        else:
            return Response({"error": "Invalid credentials"},
                            status=status.HTTP_401_UNAUTHORIZED)


# Endpoint to Get/Update/Delete Current User Details
class UserDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        serializer = UserDetailSerializer(request.user, context={'request': request})
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        user.username = request.data.get("username", user.username)
        user.email = request.data.get("email", user.email)
        new_password = request.data.get("password")
        if new_password:
            user.set_password(new_password)
        user.save()

        profile = user.profile
        profile_picture = request.FILES.get("profile_picture")
        if profile_picture:
            if not profile_picture.content_type.startswith("image/"):
                return Response({"error": "Invalid image format."}, status=status.HTTP_400_BAD_REQUEST)
            if profile_picture.size > MAX_FILE_SIZE:
                return Response({"error": "Profile picture exceeds max size (5 MB)."}, status=status.HTTP_400_BAD_REQUEST)
            profile.profile_picture = profile_picture
            profile.save()

        return Response({"message": "User updated successfully"})

    def delete(self, request):
        request.user.delete()
        return Response({"message": "User deleted successfully"})


# Logout Endpoint 
class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)


# -------------------- Regular Post Endpoints --------------------

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
        serializer = PostSerializer(post, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


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
