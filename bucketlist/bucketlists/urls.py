from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth.views import logout
from bucketlists import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^dashboard/$', views.dashboard),
    url(r'^logout/$', logout, {'next_page': '/'}),
]
