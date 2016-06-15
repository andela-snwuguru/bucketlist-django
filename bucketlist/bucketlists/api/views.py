from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    CreateAPIView,
)
from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from bucketlists.models import *
from .serializers import *

# customize pagination
from .pagination import CustomPageNumberPagination

from .permissions import IsOwner
from .helper import *


class RegistrationApiView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class BucketListApiView(ListCreateAPIView):

    """
    Returns bucket lists if you are doing a GET request.
    Creates new bucket list if you are doing a POST request.

    Method: GET
      Parameters:
          page  (optional)    default=1
      Header:
          AccessToken  (required)
      Response: JSON

    Method: POST
      Parameters:
          name  (required)
      Header:
          AccessToken  (required)
      Response: JSON
    """

    serializer_class = BucketListSerializer
    pagination_class = CustomPageNumberPagination
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name', 'user__first_name', 'user__last_name']

    # before create
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = BucketList.objects.filter(user=self.request.user)
        return queryset


class BucketListDetailAPIView(RetrieveUpdateDestroyAPIView):

    """
    Returns individual bucket lists detail if you are doing a GET request.
    Updates individual bucket lists detail if you are doing a PUT request.
    Deletes individual bucket lists detail if you are doing a DELETE request.

    Method: GET
      Header:
          AccessToken  (required)
      Response: JSON

    Method: PUT
      Parameters:
          name  (required)
      Header:
          AccessToken  (required)
      Response: JSON

    Method: DELETE
      Header:
          AccessToken  (required)
      Response: JSON

    """
    queryset = BucketList.objects.all()
    serializer_class = BucketListSerializer
    permission_classes = [IsOwner]
    lookup_field = 'id'


class BucketListItemApiView(ListCreateAPIView):

    """
    Returns bucket list items if you are doing a GET request.
    Creates new bucket list item if you are doing a POST request.

    Method: GET
      Parameters:
          page  (optional)    default=1
      Header:
          AccessToken  (required)
      Response: JSON

    Method: POST
      Parameters:
          task  (required)
      Header:
          AccessToken  (required)
      Response: JSON
    """
    #queryset = BucketListItem.objects.all()
    serializer_class = BucketListItemSerializer
    pagination_class = CustomPageNumberPagination
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['task']


       # before create
    def perform_create(self, serializer):
        bucketlist = get_bucketlist_by_api_view(self)
        serializer.save(bucketlist=bucketlist)

    def get_queryset(self):
        bucketlist = get_bucketlist_by_api_view(self)
        queryset = BucketListItem.objects.filter(bucketlist=bucketlist)
        return queryset


class BucketListItemDetailAPIView(RetrieveUpdateDestroyAPIView):

    """
    Returns individual bucket list item detail if you are doing a GET request.
    Updates individual bucket list item detail if you are doing a PUT request.
    Deletes individual bucket list item detail if you are doing a DELETE request.

    Method: GET
      Header:
          AccessToken  (required)
      Response: JSON

    Method: PUT
      Parameters:
          task  (optional)
          done  (optional)
      Header:
          AccessToken  (required)
      Response: JSON

    Method: DELETE
      Header:
          AccessToken  (required)
      Response: JSON

    """
    serializer_class = BucketListItemSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        bucketlist = get_bucketlist_by_api_view(self)
        queryset = BucketListItem.objects.filter(bucketlist=bucketlist)
        return queryset
