from rest_framework import serializers
from curd.models import UserInfo


class user_serializer_form(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'
