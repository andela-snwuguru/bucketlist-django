from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', BucketlistListCreateApiView.as_view(), name='list'),
    #url(r'^create/$',  BucketlistCreateApiView.as_view(), name='create'),
    url(r'^(?P<id>\d+)/$', BucketlistRetrieveUpdateDestroyAPIView.as_view(), name='detail'),
    url(r'^(?P<id>\d+)/items/(?P<pk>\d+)/$', BucketlistItemRetrieveUpdateDestroyAPIView.as_view(), name='itemDetail'),
    url(r'^(?P<id>\d+)/items/$', BucketlistItemListCreateApiView.as_view(), name='item-list'),
    #url(r'^(?P<id>\d+)/$', BucketlistRetrieveUpdateDestroyAPIView.as_view(), name='delete'),
    #url(r'^(?P<id>\d+)/$', BucketlistRetrieveUpdateDestroyAPIView.as_view(), name='detail'),
]
