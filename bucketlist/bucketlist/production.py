import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
import dj_database_url

DATABASES = {
    'default': dj_database_url.config()
}
DEBUG = False
