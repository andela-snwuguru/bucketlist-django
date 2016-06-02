from django.contrib.auth import authenticate, login
from rest_framework_jwt.settings import api_settings

from .serializers import UserSerializer


def get_value_from_path(path, index):
    args = path.split('/')
    return args[index]


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


def generate_token(user):
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
    payload = jwt_payload_handler(user)
    return jwt_encode_handler(payload)
