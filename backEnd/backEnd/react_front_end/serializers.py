from rest_framework import serializers

from backEnd.react_front_end.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"