from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render
from django.views.decorators.http import require_http_methods


def index(request):
    return render(request, 'home.html', {})


def dashboard(request):
    return render(request, 'dashboard.html', {})
