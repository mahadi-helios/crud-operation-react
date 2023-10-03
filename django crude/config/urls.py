from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('curd.urls')),
    path('',include('rest_framework.urls'))
]
