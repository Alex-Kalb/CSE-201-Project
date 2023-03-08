from django.db import models

# Create your models here.

class Listing(models.Model):
    # The name of the listing
    name = models.CharField(max_length=80)
    # The price of a listing
    price = models.IntegerField()
    # A customer description of an listing (max 500 chars)
    desc = models.CharField(max_length=500)
