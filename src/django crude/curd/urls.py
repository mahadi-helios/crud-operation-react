from django.urls import path
from curd import views

urlpatterns = [
    #''' ClassBased api'''
    path('',views.all_data_overview,name="api_urls"),
    path("list/",views.contact_api_list_view.as_view(),name="contact_list"),
    path("create/", views.contact_api_create_view.as_view(),name="contact_create"),
    path("update/<int:pk>/",views.contact_api_update_view.as_view(),name="update_contact"),
    path("delete/<int:pk>/",views.contact_api_delete_view.as_view(),name="delete_delete")


    #''' Function base api '''
    # path('',views.all_data_overview, name="api_urls"),
    # path('contact-list/', views.contact_list_view, name='contact_list'),
    # path('contact-detail/<str:pk>/', views.contact_detail_view, name='detail_list'),
    # path('contact-create/', views.user_information, name='user_information'),
    # path('contact-update/<str:pk>/', views.update_contact_view, name='update_contact'),
    # path('contact-delete/<str:pk>/', views.delete_contact_view, name='delete_contact'),
    
]
