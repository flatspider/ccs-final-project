from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.authtoken.models import Token
# from dj_rest_auth.models import TokenModel
from dj_rest_auth.serializers import TokenSerializer


from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source="user.email")
    user_name = serializers.ReadOnlyField(source="user.username")
    first_name = serializers.ReadOnlyField(source="user.first_name")
    last_name = serializers.ReadOnlyField(source="user.last_name")

    class Meta:
        model = Profile
        fields = '__all__'
        # depth = 1
