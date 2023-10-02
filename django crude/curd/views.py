from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView
from curd.serializer import user_serializer_form
from curd.models import user_info
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

@api_view(['GET'])
def all_data_overview(request):
    api_urls={
        'contact_list' : '/list/',
        'create'       : '/create/',
        'update'       : '/update/<int:pk>/',
        'Delete'       : '/delete/<int:pk>/',
    }
    return Response(api_urls)


class contact_api_list_view(ListAPIView):
    queryset = user_info.objects.all()
    serializer_class = user_serializer_form


class contact_api_create_view(CreateAPIView):
    queryset = user_info.objects.all()
    serializer_class = user_serializer_form

class contact_api_update_view(UpdateAPIView):
    queryset = user_info.objects.all()
    serializer_class = user_serializer_form

class contact_api_delete_view(DestroyAPIView):
    queryset = user_info.objects.all()
    serializer_class = user_serializer_form



















#'''Function based api codes '''


# from django.shortcuts import render
# from curd.forms import UserInfoForm
# from curd.models import user_info

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





