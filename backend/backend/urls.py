from django.urls import path
from samishi.views import LoginView
from samishi.views import SignupView


urlpatterns = [
    # ... other URLs
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/signup/', SignupView.as_view(), name='signup'),

]