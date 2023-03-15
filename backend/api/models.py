from django.db import models

# Create your models here.


class Account(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    phone = models.CharField(max_length=10)
    cart = models.ManyToManyField('Product', null=True)

class Product(models.Model):
    
    name = models.CharField(max_length=200)
    condition = models.CharField(max_length=200)
    price = models.IntegerField()
    url = models.charField(max_length=500)
    category = models.charField(max_length=200)
    order_sell = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='order_sell', null=True)
    order_buy = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='order_buy', null=True)

class Order(models.Model):
    order_type = models.CharField(max_length=1, choices=(('s', 'sell'),
                                                         ('b', 'buy')
    ))
    order_status = models.CharField(max_length=1, choices=(('a', 'active'),
                                                           ('i', 'inactive'),
                                                           ('p', 'pending')))
    date_created = models.DateTimeField(auto_now_add=True)
    order_owner = models.ForeignKey('Account', on_delete=models.CASCADE)
    
