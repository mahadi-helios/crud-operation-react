from rest_framework import serializers
from curd.models import user_info


class user_serializer_form(serializers.ModelSerializer):
    class Meta:
        model = user_info
        fields = '__all__'
