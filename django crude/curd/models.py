from django.db import models
# Create your models here.


class UserInfo(models.Model):
    name = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=15)

    
    def __str__(self):
        return self.name
    


