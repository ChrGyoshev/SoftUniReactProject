from django.urls import path

from backEnd.react_front_end.views import ProfileApiView, ProfileDetail, ProfileDelete, ProfileEdit, BookCreateListView, \
 BookReadingByUserList, BookReadingDelete, BookEdit

urlpatterns = [
 path('api',ProfileApiView.as_view()),
 path('api/<str:pk>/', ProfileDetail.as_view(), name='profile-detail'),
 path('api/delete/<str:pk>/', ProfileDelete.as_view(), name='delete-profile'),
 path('api/edit/<str:pk>/', ProfileEdit.as_view(), name='edit-profile'),

 path('api/books-reading-list', BookCreateListView.as_view(), name='book reading list'),
 path('api/books-by-user', BookReadingByUserList.as_view(), name='books by user'),
 path("api/books-reading-list/delete/<str:pk>/", BookReadingDelete.as_view(), name='delete reading book'),
 path("api/book-reading-list/edit/<str:pk>/", BookEdit.as_view(), name='edit reading book'),


]