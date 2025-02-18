from django.urls import path
from samishi.views import LoginView

urlpatterns = [
    # ... other URLs
    path('api/login/', LoginView.as_view(), name='login'),
]