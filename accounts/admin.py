from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Profile

# Using a custom user model when starting a project
# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/

# Register your models here.

admin.site.register(CustomUser, UserAdmin)
admin.site.register(Profile)
