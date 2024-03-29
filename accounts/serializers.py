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

    def update(self, instance, validated_data):
        # Update the profile image if it is included in the validated data
        if 'avatar' in validated_data:
            instance.avatar = validated_data['avatar']
            instance.save()

        return super(ProfileSerializer, self).update(instance, validated_data)


class CustomRegisterSerializer(RegisterSerializer):
    display_name = serializers.CharField()

    # Creates the custom sign up flow. Allows the display name and avatar to be set simultaneously at registration
    def custom_signup(self, request, user):
        display_name = self.validated_data.get('display_name')
        avatar = self.validated_data.get('avatar')

        # Create the user's profile
        Profile.objects.create(
            user=user,
            display_name=display_name,
            avatar=avatar,
        )
