# Generated by Django 4.1.7 on 2023-03-07 01:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('letters', '0002_article_letter_published'),
    ]

    operations = [
        migrations.AddField(
            model_name='letter',
            name='about_article',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='letters.article'),
        ),
    ]
