from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404

# Create your views here.
def index(request):
  context = {
  'title':'welcome'
  }
  return render(request, 'home.html', context)