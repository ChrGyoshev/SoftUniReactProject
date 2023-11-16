import uuid

from rest_framework import status, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from backEnd.react_front_end.models import Profile, BookReadingList, BookStore
from backEnd.react_front_end.serializers import ProfileSerializer, ProfileEditSerializer, \
    BookReadingListCreateSerializer, BookStoreSerializer


class ProfileApiView(APIView):
    def get(self, request, *args, **kwargs):
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        id = request.data.get('uid')
        data = {
            'id': id,
            'username': request.data.get('username'),
            'phone_number': request.data.get('phone_number'),
            'profile_picture': request.data.get('profile_picture'),
            'gender': request.data.get('gender'),

        }

        serializer = ProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileDetail(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDelete(generics.DestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileEdit(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileEditSerializer


# BOOK READING LIST VIEWS


# CREATING BOOK
class BookCreateListView(generics.ListCreateAPIView):
    queryset = BookReadingList.objects.all()
    serializer_class = BookReadingListCreateSerializer

    def perform_create(self, serializer):
        user_id = self.request.data['profile']

        try:
            profile = Profile.objects.get(id=user_id)
        except:
            raise Exception('profile not found')

        serializer.save(profile=profile)


# GET BOOKS
class BookReadingByUserList(generics.ListAPIView):
    serializer_class = BookReadingListCreateSerializer

    def get_queryset(self):
        item_id = self.request.query_params.get('profile')
        query = BookReadingList.objects.filter(profile__id=item_id)
        return query


class BookReadingDelete(generics.DestroyAPIView):
    queryset = BookReadingList.objects.all()
    serializer_class = BookReadingListCreateSerializer


class BookEdit(generics.RetrieveUpdateAPIView):
    queryset = BookReadingList.objects.all()
    serializer_class = BookReadingListCreateSerializer


# BOOK STORE

class SingleElementPagination(PageNumberPagination):
    page_size = 2
class BookStoreAdd(generics.ListCreateAPIView):
    queryset = BookStore.objects.all()
    serializer_class = BookStoreSerializer
    pagination_class =SingleElementPagination

    def perform_create(self, serializer):
        user_id = self.request.data['owner']

        try:
            profile = Profile.objects.get(id=user_id)
        except:
            raise Exception('Profile not found')

        serializer.save(owner=profile)
