from django.shortcuts import render
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import urllib.parse


def decode_query_string(query_string):
    query_params = urllib.parse.parse_qs(query_string)

    decoded_params = {}
    for key, value in query_params.items():
        # Decode the key
        decoded_key = urllib.parse.unquote(key)
        # Split the key into parts
        parts = decoded_key.split('[')
        # Traverse the decoded_params dictionary and create nested dictionaries as necessary
        current_dict = decoded_params
        for part in parts[:-1]:
            if part not in current_dict:
                current_dict[part] = {}
            current_dict = current_dict[part]
        # Set the value in the nested dictionary
        current_dict[parts[-1].rstrip(']')] = value[0] if len(value) == 1 else value

    return decoded_params
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

    query_string = request.META['QUERY_STRING']
    decoded_query = decode_query_string(query_string)
    print(decoded_query)
    sort_options = decoded_query.get('sortBy')
    if sort_options:
        for sort_option in sort_options:
            option = int(sort_options[sort_option])
            if option == 0: continue
            order_prefix = "" if option == 1 else "-"
            items = items.order_by(order_prefix + sort_option)
            print(order_prefix + sort_option)

    search_query = decoded_query.get('search')
    if search_query:
        items = items.filter(name__icontains=search_query)
    serializer = ProductSerializer(items, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def get_all_product(request):
    products = Product.objects.all()
    if not products:
        return Response({})
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_product_by_id(request, product_id):
    product = Product.objects.get(id=product_id)
    if not product:
        return Response({})
    serializer = ProductSerializer(product, many=False)

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

@api_view(['GET'])
def get_favorite_item(request):
    if request.method == 'GET':
        print(request)
        uid = request.GET.get('uid')
        print(uid)
        user = Account.objects.get(uid=uid)
        favorite_items = user.favorites.all()

        serializer = ProductSerializer(favorite_items, many=True)

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


@api_view(['POST'])
def add_to_favorite(request):
    if request.method == 'POST':
        uid = request.data.get('uid')
        product_id = request.data.get('product_id')
        
        print(uid)

        user = Account.objects.get(uid=uid)
        user.favorites.add(Product.objects.get(id=product_id))

        user.save()

        return Response({"Add item successfully"},
                        status=status.HTTP_200_OK)


@api_view(['GET'])
def search(request):
    search_query = request.GET.get('search', None)
    if search_query:
        products = Product.objects.filter(name__icontains=search_query)
    else:
        products = Product.objects.all()

    if not products:
        return Response({})
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(['DELETE'])
def delete_all(request):
    Account.objects.all().delete()
    Order.objects.all().delete()
    Product.objects.all().delete()
    return Response({'message': 'Tables are successfully reset'})