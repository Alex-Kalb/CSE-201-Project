from rest_framework import serializers
from .models import Order, Account, Product

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'order_type', 'order_status', 'date_created', 'order_owner']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'condition', 'price', 'order_sell', 'order_buy', 'img_link', 'category']

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'uid', 'name', 'email', 'address', 'cart']
