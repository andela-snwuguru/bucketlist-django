from django.contrib.auth import authenticate, login
from django.shortcuts import get_object_or_404
from rest_framework_jwt.settings import api_settings

from bucketlists.models import *
from .serializers import UserSerializer


def get_bucketlist_by_api_view(obj):
    bucketlist_id = obj.kwargs.get('id',0)
    return get_object_or_404(
        BucketList,
        id=int(bucketlist_id),
        user=obj.request.user
    )


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'login': login_user(request)
    }


def login_user(request):
    user = authenticate(
        username=request.data.get('username'),
        password=request.data.get('password')
    )
    if user is not None:
        if user.is_active:
            login(request, user)
            return True
    return False
