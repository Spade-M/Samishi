from django.urls import path
from .views import (
    SignupView, 
    LoginView, 
    UserDetailView, 
    LogoutView, 
    PostListCreateView, 
    PostDetailView,
    PostLikeView,
    PostCommentView,
    CommentDeleteView
)

urlpatterns = [
    # Auth and user
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserDetailView.as_view(), name='user-detail'),

    # Posts
    path('posts/', PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('posts/<int:pk>/like/', PostLikeView.as_view(), name='post-like'),
    path('posts/<int:pk>/comments/', PostCommentView.as_view(), name='post-comment'),
    path('posts/<int:post_id>/comments/<int:comment_id>/', CommentDeleteView.as_view(), name='comment-delete'),
]
