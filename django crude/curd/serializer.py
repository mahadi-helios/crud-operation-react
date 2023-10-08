from django.contrib.auth.models import User
from rest_framework import serializers
from curd.models import UserInfo
# from rest_framework.authtoken.models import Token


class UserSerializerForm(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'





class UserSerializerAuth(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')  # Include other fields as needed
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
