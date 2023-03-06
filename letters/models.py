from django.conf import settings
from django.db import models


# Create your models here.

class Article(models.Model):
    publication_date = models.DateField()
    lead_paragraph = models.TextField()

    def __str__(self):
        return self.lead_paragraph


class Letter(models.Model):
    text = models.TextField()
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    published = models.BooleanField(default=False)
    # about_article = models.ForeignKey(
    #    Article, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.text
