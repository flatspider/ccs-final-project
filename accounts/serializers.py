from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import Profile
User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source="user.email")
    user_name = serializers.ReadOnlyField(source="user.username")
    first_name = serializers.CharField(
        source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")

    class Meta:
        model = Profile
        fields = '__all__'


class CustomRegisterSerializer(RegisterSerializer):
    display_name = serializers.CharField()
    # avatar = serializers.ImageField()

    # Does this function need to be placed in a class CustomRegisterSerializer?
    def custom_signup(self, request, user):
        display_name = self.validated_data.get('display_name')
        avatar = self.validated_data.get('avatar')

        # Create the user's profile
        Profile.objects.create(
            user=user,
            display_name=display_name,
            avatar=avatar,
            # Add any additional fields you want to include in the profile here
        )
