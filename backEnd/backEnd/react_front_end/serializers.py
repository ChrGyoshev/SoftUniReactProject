from rest_framework import serializers

from backEnd.react_front_end.models import Profile, BookReadingList


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class ProfileEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['username','profile_picture', 'phone_number','gender',]



#BOOK LIST SERIALIZERS

class BookReadingListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookReadingList
        fields = "__all__"
