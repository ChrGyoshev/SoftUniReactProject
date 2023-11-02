from django.urls import path

from backEnd.react_front_end.views import ProfileApiView, ProfileDetail, ProfileDelete, ProfileEdit

urlpatterns = [
 path('api',ProfileApiView.as_view()),
 path('api/<str:pk>/', ProfileDetail.as_view(), name='profile-detail'),
 path('api/delete/<str:pk>/', ProfileDelete.as_view(), name='delete-profile'),
 path('api/edit/<str:pk>/', ProfileEdit.as_view(), name='edit-profile'),

]