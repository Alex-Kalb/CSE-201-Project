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
    path('product/all/', views.get_all_product),
    path('product/<int:product_id>', views.get_product_by_id),
    path('account/add/', views.add_account),
    path('account/all/', views.get_all_account),
    path('user/create_order/', views.add_order),
    path('user/add-to-favorite/', views.add_to_favorite),
    path('user/get-all-favorite/', views.get_favorite_item),
    path('product/list/<str:field>/', views.get_fields_content),
    path('product/category/<str:category>/', views.get_product_category),
    path('product/search/', views.search),
]
