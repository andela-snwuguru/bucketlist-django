# Django Powered Bucketlist Application

[![Build Status](https://travis-ci.org/andela-snwuguru/bucketlist-django.svg?branch=master)](https://travis-ci.org/andela-snwuguru/bucketlist-django)  [![Coverage Status](https://coveralls.io/repos/github/andela-snwuguru/bucketlist-django/badge.svg?branch=master)](https://coveralls.io/github/andela-snwuguru/bucketlist-django?branch=master)

Nobody lives forever, it is what we do or archive that lives forever in the heart of men. This application gives you little hope to archive that. Pen it down, challenge yourself to do more.

### Technology used

- Django - Easy and faster way to build better web applications.
- Djangorestframework - Django REST framework is a powerful and flexible toolkit for building Web APIs in Django powered apps.
- AngularJS - AngularJS lets you extend HTML vocabulary for your application.
- AngularJS Material - Angular Material is both a UI Component framework and a reference implementation of Google's Material Design Specification.
- Django swagger - An API documentation generator for Swagger UI and Django REST Framework.

### API Documentation

The API documentation can be found <a href="https://littlehope.herokuapp.com/api/v1/docs">here</a>

### How to use

To install and run this application locally, you need to have python installed on your machine.

#### Installation

To install the build locally

- `` $ git clone https://github.com/andela-snwuguru/bucketlist-django.git ``
- `` $ cd bucketlist-django ``
- `` $ pip install -r requirements.txt ``

#### Set Up your environment key

- `` $ touch .env.yml ``
- `` $ echo 'SECRET_KEY="any-key-you-wish" ``

#### bucketlist-django/bucketlist/bucketlist/development.py

Development.py file is required to get the database configuration. See content below
```
import os, sys
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'testdb.sqlite3') if 'test' in sys.argv else os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

DEBUG = True

 ```

#### bucketlist-django/.env.py
.env.py file is also required to configure secured information. See content below.

```
SECRET_KEY = "your-secret-code"
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = 'oauth2 key from google'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'oauth2 secret from google'
SOCIAL_AUTH_FACEBOOK_KEY = 'app id'
SOCIAL_AUTH_FACEBOOK_SECRET = 'app secret'
SOCIAL_AUTH_TWITTER_KEY = 'customer key'
SOCIAL_AUTH_TWITTER_SECRET = 'customer secret'


```


#### Run your build

`` $ python bucketlist/manage.py runserver ``

#### Running the test

`` $ cd bucketlist && python manage.py test ``

### How to Contribute

This is an open source project, feel free to fork the repo, add functionality to the project and raise a pull request.