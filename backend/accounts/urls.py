from django.urls import path
from .views import SignupView, LoginView, UserDetailView, LogoutView, PostListCreateView, PostDetailView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserDetailView.as_view(), name='user-detail'),
    path('posts/', PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),

    path('logout/', LogoutView.as_view(), name='logout'),

]
