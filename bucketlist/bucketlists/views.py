from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.views.decorators.http import require_http_methods


def index(request):
  if request.user.is_authenticated():
    return render(request, 'dashboard.html', {'user':request.user})
  else:
    return render(request, 'home.html', {})
