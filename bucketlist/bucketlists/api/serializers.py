from django.contrib.auth.models import User
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
      'id',
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
      'id',
      'bucketlist',
      'task',
      'done',
      'date_modified',
      'date_created',
    ]

  def get_bucketlist(self, obj):
    return obj.bucketlist.name

class UserSerializer(ModelSerializer):

  class Meta:
    model = User
    fields = [
      'id',
      'username',
      'password',
      'email',
      'first_name',
      'last_name',
    ]
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User(
        username=validated_data.get('username'),
        email=validated_data.get('email'),
        first_name=validated_data.get('first_name',''),
        last_name=validated_data.get('last_name','')
      )
    user.set_password(validated_data.get('password'))
    user.save()
    return user