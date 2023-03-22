from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Letter, Article


class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ('id', 'publication_date', 'lead_paragraph', 'web_url',
                  'search_term')
        read_only_fields = ('author',)


class LetterSerializer(serializers.ModelSerializer):
    article = ArticleSerializer(read_only=True)
    author_name = serializers.ReadOnlyField(source='author.username')
    search_term = serializers.ReadOnlyField(source='about_article.search_term')

    class Meta:
        model = Letter
        fields = ('id', 'text', 'author', 'author_name', 'article',
                  'about_article', 'published', 'votes', 'search_term')
        read_only_fields = ('author',)
