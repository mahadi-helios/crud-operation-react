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
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import permission_classes
from curd.serializer import UserSerializerAuth # Import the UserSerializer



# Create your views here.


#All Url show in this function 
@api_view(['GET'])
def AllDataOverview(request):
    api_urls={
        'singup'       : '/singup/',
        'singin'       : '/singin/',
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



#Authentication


class SignupUserView(APIView):
    def post(self, request):
        serializer = UserSerializerAuth(data=request.data)
        if serializer.is_valid():
            serializer.save()
            token, _ = Token.objects.get_or_create(user=serializer.instance)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SigninUserView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = User.objects.filter(username=username).first()

        if user is None or not user.check_password(password):
            return Response({'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)

        token, _ = Token.objects.get_or_create(user=user)

        return Response({'token': token.key}, status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
class LogoutUserView(APIView):
    def post(self, request):
        request.auth.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)






























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





