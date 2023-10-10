from django.http import HttpResponse
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView
from curd.serializer import UserSerializerForm
from curd.models import UserInfo
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from curd.serializer import UserSerializerAuth # Import the UserSerializer

# Create your views here.



#All Url show in this function 


@api_view(['GET'])
def AllDataOverview(request):
    api_urls={
        'singup'       : '/singup/',
        'contact_list' : '/list/',
        'create'       : '/create/',
        'update'       : '/update/<int:pk>/',
        'Delete'       : '/delete/<int:pk>/',
    }
    return Response(api_urls)


class ContactApiListView(ListAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserSerializerForm


class ContactApiCreateView(CreateAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserSerializerForm

class ContactApiUpdateView(UpdateAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserSerializerForm

class ContactApiDeleteView(DestroyAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserSerializerForm





# Authentication


class SignupUserView(CreateAPIView):
    serializer_class = UserSerializerAuth
    
    def post(self, request):
        serializer = UserSerializerAuth(data=request.data)
        if serializer.is_valid():
            serializer.save()
            token, _ = Token.objects.get_or_create(user=serializer.instance)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class LogoutUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            token = Token.objects.get(user=request.user)
            token.delete()
        except Token.DoesNotExist:
            return Response({'detail': 'Token does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        return Response("Logout Successfully",status=status.HTTP_204_NO_CONTENT)












































#'''Function based api codes '''


# from django.shortcuts import render
# from curd.forms import UserInfoForm
# from curd.models import UserInfo

# from curd.serializer import user_serializer_form
# from rest_framework.response import Response
# from rest_framework.decorators import api_view


# from django.http import Http404
  
# from rest_framework.views import APIView
# from rest_framework import status


# # Create your views here.


# @api_view(['GET'])
# def all_data_overview(request):
#     api_urls={
#         'contact_list' : '/contact-list/',
#         'detail_view'  : '/contact-detail/<str:pk>/',
#         'create'       : '/contact-create/',
#         'update'       : '/contact-update/<str:pk>/',
#         'Delete'       : '/contact-delete/<str:pk>/',
#     }
#     return Response(api_urls)


# @api_view(['GET'])
# def contact_list_view(request):
#     phn_list = user_info.objects.all() #fetch all data in database
#     serializer = user_serializer_form(phn_list, many=True)
#     return Response(serializer.data)



# @api_view(['GET'])
# def contact_detail_view(request, pk):
#     phn_list = user_info.objects.get(id=pk) #fetch all data in database
#     serializer = user_serializer_form(phn_list, many=False)
#     return Response(serializer.data)



# @api_view(['POST'])
# def user_information(request):
#     serializer = user_serializer_form(data=request.data)

#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)



# @api_view(['POST'])
# def update_contact_view(request, pk):
#     phone = user_info.objects.get(id=pk)
#     serializer = user_serializer_form(instance=phone,data=request.data)
    
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)


# @api_view(['DELETE'])
# def delete_contact_view(request, pk):
#     phone = user_info.objects.get(id=pk)
#     phone.delete()
#     return Response('Contact data successfully Deleted')





