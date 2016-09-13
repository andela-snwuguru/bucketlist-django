from django.shortcuts import get_object_or_404

from bucketlists.models import BucketList


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
        'user': user.username
    }
