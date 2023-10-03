from django.urls import path

from backEnd.react_front_end.views import ProfileApiView

urlpatterns = [
 path('api',ProfileApiView.as_view()),
]