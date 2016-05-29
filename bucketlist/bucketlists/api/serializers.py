from rest_framework.serializers import (
    ModelSerializer,
    HyperlinkedIdentityField,
    SerializerMethodField,
  )
from bucketlists.models import *


class BucketListSerializer(ModelSerializer):
  url = HyperlinkedIdentityField(
    view_name='bucketlists-api:detail',
    lookup_field='id'
  )
  user = SerializerMethodField()
  class Meta:
    model = BucketList
    fields = [
      'url',
      'user',
      'name',
      'date_modified',
      'date_created',
    ]

  def get_user(self, obj):
    return obj.user.username


class BucketListItemSerializer(ModelSerializer):

  bucketlist = SerializerMethodField()
  class Meta:
    model = BucketListItem
    fields = [
     # 'url',
      'id',
      'bucketlist',
      'task',
      'date_modified',
      'date_created',
    ]

  def get_bucketlist(self, obj):
    return obj.bucketlist.name
