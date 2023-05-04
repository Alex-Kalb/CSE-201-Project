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

@api_view(['GET'])
def find_account_uid(request, product_id):
    if request.method == 'GET':
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        order_sell = product.order_sell
        if order_sell is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        account = order_sell.order_owner
        serializer = AccountSerializer(account)

        return Response(serializer.data)

@api_view(['GET'])
def get_product_email(request, item_id):
    try:
        product = Product.objects.get(id=item_id)
        order_sell = product.order_sell
        if order_sell is None:
            return Response({'error': 'This product has not been sold yet'}, status=status.HTTP_404_NOT_FOUND)
        account = order_sell.order_owner
        email = account.email
        return Response({'email': email})
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_items(request, item_id):
    if request.method == 'GET':
        user_id = request.query_params.get('uid')
        user = Account.objects.get(uid=user_id)

        items = list(user.cart.filter(id=item_id))
        contains = len(items) > 0

        return Response({'contains': contains}, status=status.HTTP_200_OK)


        
@api_view(['GET'])
def get_cart_items(request, category):
    if request.method == 'GET':
        user_id = request.query_params.get('uid')
        try:
            user = Account.objects.get(uid=user_id)
        except Account.DoesNotExist:
            return Response({'error': 'Account does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        cart_items = user.cart.all()
        cart_items.filter(category=category)

        serializer = ProductSerializer(cart_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




@api_view(['POST'])
def add_to_cart(request, item_id):
    if request.method == 'POST':
        user_id = request.data.get('uid')
        item = Product.objects.get(id=item_id)
        user = Account.objects.get(uid=user_id)

        # Check if the item is already in the user's cart
        if user.cart.filter(id=item_id).exists():
            return Response({'message': 'Item is already in cart'}, status=status.HTTP_400_BAD_REQUEST)

        user.cart.add(item)

        return Response({'message': 'Item added to cart'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def remove_from_cart(request, item_id):
    if request.method == 'POST':
        user_id = request.data.get('uid')
        item = Product.objects.get(id=item_id)
        user = Account.objects.get(uid=user_id)

        # Check if the item is in the user's cart
        if not user.cart.filter(id=item_id).exists():
            return Response({'message': 'Item is not in cart'}, status=status.HTTP_400_BAD_REQUEST)

        user.cart.remove(item)

        return Response({'message': 'Item removed from cart'}, status=status.HTTP_200_OK)


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

@api_view(['GET'])
def sort_products_by_name(request):
    if request.method == 'GET':
        sortOrder = request.query_params.get('sortOrder')
        products = Product.objects.all()
        if sortOrder == "name":
            products = products.order_by('name')
        serializer = ProductSerializer(products, many=True)
        
        return Response(serializer.data)

@api_view(['GET'])
def sort_products_by_price(request):
    if request.method == 'GET':
        sortOrder = request.query_params.get('sortOrder')
        products = Product.objects.all()
        if sortOrder == "price":
            products = products.order_by('price')
        serializer = ProductSerializer(products, many=True)
        
        return Response(serializer.data)


@api_view(['GET'])
def search(request):
    search_query = request.GET.get('q', None)
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

@api_view(['DELETE'])
def delete_item(request, product_id):
    item_to_delete = Product.objects.get(id=product_id)
    item_to_delete.order_sell.delete()
    item_to_delete.delete()
    return Response({'message': 'Item deleted'})