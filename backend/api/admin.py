from django.contrib import admin
from .models import Order, Account, Product

# Register your models here.
admin.site.register(Order)
admin.site.register(Account)
admin.site.register(Product)
