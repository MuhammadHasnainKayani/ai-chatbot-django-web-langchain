from django.urls import path
from . import views
from .views import GenerateResponseAPIView


urlpatterns = [
    path('home', views.home, name='home'),
    path('api/generate_response/', GenerateResponseAPIView.as_view(), name='generate_response'),

]
