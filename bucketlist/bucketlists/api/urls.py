from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from .views import *

urlpatterns = [
    url(r'^auth/register/$', RegistrationApiView.as_view(), name='register'),
    url(r'^auth/login/$', obtain_jwt_token, name='login'),
    url(r'^auth/token/refresh/', refresh_jwt_token),
    url(r'^bucketlists/$', BucketlistListCreateApiView.as_view(), name='list'),
    url(r'^bucketlists/(?P<id>\d+)/$',
        BucketlistRetrieveUpdateDestroyAPIView.as_view(), name='detail'),
    url(r'^bucketlists/(?P<id>\d+)/items/(?P<pk>\d+)/$',
        BucketlistItemRetrieveUpdateDestroyAPIView.as_view(), name='itemDetail'),
    url(r'^bucketlists/(?P<id>\d+)/items/$',
        BucketlistItemListCreateApiView.as_view(), name='item-list'),
]
