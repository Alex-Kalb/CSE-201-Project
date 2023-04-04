rom django.shortcuts import render
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


# Create your views here.

@api_view(['GET'])
def get_all_product(request):
    if request.method == 'GET':
        products = Product.objects.all()
        if not products:    return Response({})
        serializer = ProductSerializer(products, many=True)
        
        return Response(serializer.data)
    
@api_view(['POST'])
def add_account(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')

        account = Account()
        account.name = name
        account.email = email
        account.phone = phone
        account.save()

        print(name)
        return Response({'user_id': account.id},
                        status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_all_account(request):
    if request.method == 'GET':
        accounts = Account.objects.all()
        if not accounts:    return Response({})
        serializer = AccountSerializer(accounts, many=True)
        
        return Response(serializer.data)
    
@api_view(['POST'])
def add_order(request):
    if request.method == 'POST':
        print("Start")
        user_id = request.POST.get('user_id')
        product_name = request.POST.get('product_name')
        condition = request.POST.get('condition')
        price = request.POST.get('price')
        print("Got data from request")
        order = Order(order_type='s', order_status='a', order_owner=Account.objects.get(id=user_id))
        order.save()
        print("Save order")


        product = Product.objects.create(name=product_name, condition=condition, price=price, order_sell=order)

        return Response({'order_id': order.id},
                        status=status.HTTP_201_CREATED)

@api_view(['GET'])
def sort_products_by_name(request):
    if request.method == 'GET':
        products = Product.objects.all().order_by('name')
        if not products:
            return Response({})
        serializer = ProductSerializer(products, many=True)
        
        return Response(serializer.data)

@api_view(['GET'])
def sort_products_by_price(request):
    if request.method == 'GET':
        products = Product.objects.all().order_by('price')
        if not products:
            return Response({})
        serializer = ProductSerializer(products, many=True)
        
        return Response(serializer.data)
