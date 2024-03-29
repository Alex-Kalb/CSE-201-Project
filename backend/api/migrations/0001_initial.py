# Generated by Django 4.1.7 on 2023-04-10 20:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=200)),
                ('email', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_type', models.CharField(choices=[('s', 'sell'), ('b', 'buy')], max_length=1)),
                ('order_status', models.CharField(choices=[('a', 'active'), ('i', 'inactive'), ('p', 'pending')], max_length=1)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('order_owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.account')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('condition', models.CharField(max_length=200)),
                ('price', models.IntegerField()),
                ('img_link', models.CharField(max_length=500)),
                ('category', models.CharField(max_length=50)),
                ('order_buy', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='order_buy', to='api.order')),
                ('order_sell', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='order_sell', to='api.order')),
            ],
        ),
        migrations.AddField(
            model_name='account',
            name='cart',
            field=models.ManyToManyField(to='api.product'),
        ),
    ]
