# Using a custom user model when starting a project
# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.

# Inheriting from the Abstract User
class CustomUser(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    avatar = models.ImageField(
        upload_to="profiles/", default="defaultAvatar.jpeg")
    display_name = models.CharField(max_length=255)

    # Self.user will return the entire user structure. Drill down to self.user.username

    def __str__(self):
        return self.user.username
