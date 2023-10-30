import uuid

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from backEnd.react_front_end.models import Profile
from backEnd.react_front_end.serializers import ProfileSerializer


class ProfileApiView(APIView):
    def get(self, request, *args, **kwargs):
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        id = request.data.get('uid')
        data = {
            'id': id,
            'username': request.data.get('username'),
            'phone_number': request.data.get('phone_number'),
            'profile_picture': request.data.get('profile_picture'),

        }

        serializer = ProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileDetail(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

