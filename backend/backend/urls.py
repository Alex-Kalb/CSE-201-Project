"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('clear/', views.delete_all),
    path('product/all/', views.get_all_product),
    path('account/add/', views.add_account),
    path('user/create_order/', views.add_order),
    path('account/all/', views.get_all_account),

    path('product/<int:item_id>/email/', views.get_product_email),
    path('cart/add/<int:item_id>/', views.add_to_cart),
    path('cart/remove/<int:item_id>/', views.remove_from_cart),
    path('cart/contains/<int:item_id>/', views.get_items),
    path('cart/items/<str:category>/', views.get_cart_items),
    path('product/<int:product_id>/account/', views.find_account_uid),
    path('product/<int:product_id>/remove/', views.delete_item),

    path('product/list/<str:field>/', views.get_fields_content),
    path('product/category/<str:category>/', views.get_product_category),
    path('product/sort-name', views.sort_products_by_name),
    path('product/sort-price', views.sort_products_by_price),
    path('product/search', views.search)
]
