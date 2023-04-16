from django.db import models

# Create your models here.


class Account(models.Model):
    uid = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    cart = models.ManyToManyField('Product')

class Product(models.Model):
    
    name = models.CharField(max_length=200)
    condition = models.CharField(max_length=200)
    price = models.IntegerField()
    order_sell = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='order_sell', null=True)
    order_buy = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='order_buy', null=True)
    img_link = models.CharField(max_length=500)
    category = models.CharField(max_length=50)

class Order(models.Model):
    order_type = models.CharField(max_length=1, choices=(('s', 'sell'),
                                                         ('b', 'buy')
    ))
    order_status = models.CharField(max_length=1, choices=(('a', 'active'),
                                                           ('i', 'inactive'),
                                                           ('p', 'pending')))
    date_created = models.DateTimeField(auto_now_add=True)
    order_owner = models.ForeignKey('Account', on_delete=models.CASCADE)
    
    