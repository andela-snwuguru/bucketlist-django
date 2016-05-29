from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^auth/register/$', RegistrationApiView.as_view(), name='register'),
    url(r'^bucketlists/$', BucketlistListCreateApiView.as_view(), name='list'),
    url(r'^bucketlists/(?P<id>\d+)/$', BucketlistRetrieveUpdateDestroyAPIView.as_view(), name='detail'),
    url(r'^bucketlists/(?P<id>\d+)/items/(?P<pk>\d+)/$', BucketlistItemRetrieveUpdateDestroyAPIView.as_view(), name='itemDetail'),
    url(r'^bucketlists/(?P<id>\d+)/items/$', BucketlistItemListCreateApiView.as_view(), name='item-list'),
]
