from rest_framework import serializers
from .models import (
    Post, PostImage, Like, Comment, Profile, AdoptionPost, 
    AdoptionLike, AdoptionComment
)
from django.contrib.auth.models import User
import os  # In case you need it for path operations

# Serializer for simple user info (e.g., in comments, posts)
class UserProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['username', 'profile_picture']
        read_only_fields = fields

    def get_profile_picture(self, obj):
        try:
            if hasattr(obj, 'profile') and obj.profile.profile_picture:
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(obj.profile.profile_picture.url)
                return obj.profile.profile_picture.url
        except Profile.DoesNotExist:
            pass
        return None

# ✅ User Detail Serializer - Includes Admin Status
class UserDetailSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()
    is_admin = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile_picture', 'is_admin']
        read_only_fields = ['id', 'username', 'email', 'profile_picture', 'is_admin']

    def get_profile_picture(self, obj):
        try:
            if hasattr(obj, 'profile') and obj.profile.profile_picture:
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(obj.profile.profile_picture.url)
                return obj.profile.profile_picture.url
        except Profile.DoesNotExist:
            pass
        return None

    def get_is_admin(self, obj):
        return obj.is_staff

# --- Other Serializers for Posts --- 

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image']
        read_only_fields = ['id']

class CommentSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    can_delete = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'created_at', 'can_delete']
        read_only_fields = ['id', 'user', 'created_at', 'can_delete']

    def get_can_delete(self, obj):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            return obj.user == user or user.is_staff
        return False

class PostSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'user', 'caption', 'images', 'comments',
            'likes_count', 'is_liked', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'images', 'comments', 'likes_count', 'is_liked', 'created_at']

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if request and hasattr(request, "user") and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False

class PostCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )

    class Meta:
        model = Post
        fields = ['caption', 'images']

# --- Adoption Post Serializers --- 

# Serializer for comments on Adoption Posts
class AdoptionCommentSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    can_delete = serializers.SerializerMethodField()

    class Meta:
        model = AdoptionComment
        fields = ['id', 'user', 'text', 'created_at', 'can_delete']
        read_only_fields = ['id', 'user', 'created_at', 'can_delete']

    def get_can_delete(self, obj):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            return obj.user == user or user.is_staff
        return False

# Serializer for Adoption Posts (includes likes, comments, etc.)
class AdoptionPostSerializer(serializers.ModelSerializer):
    admin = UserProfileSerializer(read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    comments = AdoptionCommentSerializer(many=True, read_only=True)

    class Meta:
        model = AdoptionPost
        fields = ['id', 'admin', 'title', 'description', 'image', 'created_at',
                  'likes_count', 'is_liked', 'comments']
        read_only_fields = fields

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if request and hasattr(request, "user") and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False

class AdoptionPostCreateSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = AdoptionPost
        fields = ['title', 'description', 'image']
