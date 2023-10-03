from rest_framework import serializers
from curd.models import UserInfo


class UserSerializerForm(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'
