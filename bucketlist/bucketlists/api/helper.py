from .serializers import UserSerializer
from rest_framework_jwt.settings import api_settings

def get_value_from_path(path, index):
  args = path.split('/')
  return args[index]


def generate_token(user):
  jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
  jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
  payload = jwt_payload_handler(user)
  return jwt_encode_handler(payload)
