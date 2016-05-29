from django.conf.urls import url
from django.contrib import admin
from bucketlists import views


urlpatterns = [
    url(r'^$', views.index),
]
