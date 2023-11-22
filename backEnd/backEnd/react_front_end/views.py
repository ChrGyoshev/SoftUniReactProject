
import firebase_admin
from rest_framework import status, generics, request
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from backEnd.react_front_end.models import Profile, BookReadingList, BookStore
from backEnd.react_front_end.serializers import ProfileSerializer, ProfileEditSerializer, \
    BookReadingListCreateSerializer, BookStoreSerializer
from firebase_admin import credentials
from firebase_admin import auth
from django.conf import settings
from backEnd.react_front_end.utilis import get_token_from_request

firebase_credentials = credentials.Certificate(settings.FIREBASE_CONFIG)
firebase_app = firebase_admin.initialize_app(firebase_credentials)


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

    def destroy(self, request, *args, **kwargs):
        token = get_token_from_request(self.request)

        try:
            decoded_token = auth.verify_id_token(token)
            return super().destroy(request, *args, **kwargs)
        except:
            return Response({"error": "Invalid token"}, status=400)






class ProfileEdit(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileEditSerializer

    def patch(self, request, *args, **kwargs):
        token = get_token_from_request(self.request)
        try:
            decoded_token = auth.verify_id_token(token)
            return super().patch(request, *args, **kwargs)
        except:
            return Response({"error": "Invalid token"}, status=400)



# BOOK READING LIST VIEWS


# CREATING BOOK
class BookCreateListView(generics.ListCreateAPIView):
    queryset = BookReadingList.objects.all()
    serializer_class = BookReadingListCreateSerializer



    def perform_create(self, serializer):
        token = get_token_from_request(self.request)
        user_id = self.request.data['profile']

        try:
            profile = Profile.objects.get(id=user_id)
            decoded_token = auth.verify_id_token(token)
            return serializer.save(profile=profile)
        except:
            raise Exception('not valid token')




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

    def delete(self, request, *args, **kwargs):
        token = get_token_from_request(self.request)
        try:
            decoded_token = auth.verify_id_token(token)
            return super().delete(request,*args, **kwargs)
        except:
            return Response({"error": "Invalid token"}, status=400)




class BookEdit(generics.RetrieveUpdateAPIView):
    queryset = BookReadingList.objects.all()
    serializer_class = BookReadingListCreateSerializer

    def patch(self, request, *args, **kwargs):
        token = get_token_from_request(self.request)
        try:
            decoded_token = auth.verify_id_token(token)
            return super().patch(request, *args, **kwargs)
        except:
            return Response({'error': 'Invalid Token'})


# BOOK STORE

class SingleElementPagination(PageNumberPagination):
    page_size = 6
class BookStoreAdd(generics.ListCreateAPIView):
    queryset = BookStore.objects.all()
    serializer_class = BookStoreSerializer
    pagination_class =SingleElementPagination

    def perform_create(self, serializer):
        user_id = self.request.data['owner']
        token = get_token_from_request(self.request)

        try:
            profile = Profile.objects.get(id=user_id)
            auth.verify_id_token(token)
        except:
            raise Exception('Profile not found')

        serializer.save(owner=profile)
