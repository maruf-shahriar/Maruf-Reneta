from django.db import models

class Customer(models.Model):
    customer_id = models.CharField(max_length=100, primary_key=True)
    customer_name = models.CharField(max_length=100)
    division = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    marital_status = models.CharField(max_length=10)
    age = models.CharField(max_length=10)
    income = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.customer_name
