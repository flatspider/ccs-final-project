# Using a custom user model when starting a project
# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/
from django.contrib.auth.models import AbstractUser

from django.db import models

# Create your models here.

# Inheriting from the Abstract User


class CustomUser(AbstractUser):
    pass
