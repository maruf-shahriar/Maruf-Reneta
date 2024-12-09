from django.shortcuts import render
from rest_framework import viewsets, mixins
from .models import Customer
from .serializers import CustomerSerializer

class CustomerViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

