from rest_framework import serializers

from backEnd.react_front_end.models import Profile, BookReadingList, BookStore, BookStoreLikes


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



# BOOK STORE SERIALIZERS

class BookStoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = BookStore
        fields = "__all__"


class BookStoreCatalogueSerializer(serializers.ModelSerializer):
    owner = ProfileSerializer()
    class Meta:
        model = BookStore
        fields = "__all__"


class BookStoreLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookStoreLikes
        fields = "__all__"
