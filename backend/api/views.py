from django.shortcuts import render
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


# Create your views here.
@api_view(['GET'])
def get_fields_content(request, field):
    field_content = Product.objects.values_list(field, flat=True).distinct()
    return Response(field_content)

@api_view(['GET'])
def get_product_category(request, category):
    items = Product.objects.filter(category=category)

    if not items:
        return Response({})
    serializer = ProductSerializer(items, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def get_all_product(request):
    products = Product.objects.all()
    if not products:
        return Response({})
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def add_account(request):
    if request.method == 'POST':
        uid = request.data.get('uid')
        name = request.data.get('name')
        email = request.data.get('email')
        address = request.data.get('address')

        print(f"uid: {uid}")
        print(f"name: {name}")
        print(f"email: {email}")

        account = Account()
        account.uid = uid
        account.name = name
        account.email = email
        account.address = address
        account.save()

        print(name)
        return Response({"Create user successfully"},
                        status=status.HTTP_200_OK)


@api_view(['GET'])
def get_all_account(request):
    if request.method == 'GET':
        accounts = Account.objects.all()
        if not accounts:
            return Response({})
        serializer = AccountSerializer(accounts, many=True)

        return Response(serializer.data)


@api_view(['POST'])
def add_order(request):
    if request.method == 'POST':
        uid = request.data.get('uid')
        product_name = request.data.get('product_name')
        condition = request.data.get('condition')
        img_link = request.data.get('img_link')
        category = request.data.get('category')
        price = request.data.get('price')
        print(f'uid: {uid}')
        order = Order(order_type='s', order_status='a',
                      order_owner=Account.objects.get(uid=uid))
        order.save()
        print("Save order")

        product = Product.objects.create(
            name=product_name, condition=condition, price=price, order_sell=order, img_link=img_link, category=category)

        product.save()

        return Response({'order_id': order.id},
                        status=status.HTTP_200_OK)
