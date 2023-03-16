from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Letter


class LetterSerializer(serializers.ModelSerializer):
    # article = ArticleSerializer(read_only=True)
    author_name = serializers.ReadOnlyField(source='author.username')
    search_term = serializers.ReadOnlyField(source='about_article.search_term')

    class Meta:
        model = Letter
        fields = ('id', 'text', 'author', 'author_name',
                  'about_article', 'published', 'votes', 'search_term')
        read_only_fields = ('author',)
