from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Letter


class LetterSerializer(serializers.ModelSerializer):
    # channel = ChannelSerializer(read_only=True)
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Letter
        fields = ('id', 'text', 'author', 'author_name',)
        read_only_fields = ('author',)
