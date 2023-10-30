from django.urls import path

from backEnd.react_front_end.views import ProfileApiView, ProfileDetail

urlpatterns = [
 path('api',ProfileApiView.as_view()),
path('api/<str:pk>/', ProfileDetail.as_view(), name='profile-detail'),
]