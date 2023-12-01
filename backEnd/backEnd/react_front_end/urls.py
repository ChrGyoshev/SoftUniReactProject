from django.urls import path

from backEnd.react_front_end.views import ProfileApiView, ProfileDetail, ProfileDelete, ProfileEdit, BookCreateListView, \
 BookReadingByUserList, BookReadingDelete, BookEdit, BookStoreAdd, BookStoreDeleteBook, BookStoreEditBook, \
 SingleBookDetails, BookStoreCatalogue, BookStoreBuyBook

urlpatterns = [
 path('api',ProfileApiView.as_view()),
 path('api/<str:pk>/', ProfileDetail.as_view(), name='profile detail'),
 path('api/delete/<str:pk>/', ProfileDelete.as_view(), name='delete profile'),
 path('api/edit/<str:pk>/', ProfileEdit.as_view(), name='edit profile'),

 path('api/books-reading-list', BookCreateListView.as_view(), name='book reading list'),
 path('api/books-by-user', BookReadingByUserList.as_view(), name='books by user'),
 path("api/books-reading-list/delete/<str:pk>/", BookReadingDelete.as_view(), name='delete reading book'),
 path("api/book-reading-list/edit/<str:pk>/", BookEdit.as_view(), name='edit reading book'),

 path('api/book-store/catalogue/', BookStoreCatalogue.as_view(), name='book store catalogue'),
 path('api/book-store/list/', BookStoreAdd.as_view(), name='add book store '),
 path('api/book-store/delete/<int:pk>/', BookStoreDeleteBook.as_view(), name= 'delete book store'),
 path('api/book-store/edit/<int:pk>/', BookStoreEditBook.as_view(), name='edit book store'),
 path('api/book-store/<int:pk>/', SingleBookDetails.as_view(), name='retrieve single book'),
 path('api/book-store/buy/<int:pk>/', BookStoreBuyBook.as_view(), name='buy book'),


]