# Generated by Django 4.1.7 on 2023-03-15 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('letters', '0005_article_web_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='search_term',
            field=models.TextField(default='N/a'),
        ),
    ]
