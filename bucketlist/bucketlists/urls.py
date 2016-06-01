from django.conf.urls import url
from django.contrib import admin
from bucketlists import views
from django.contrib.auth.views import logout

urlpatterns = [
    url(r'^$', views.index),
    url(r'^logout/$', logout, {'next_page': '/'}),
]
