from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics, permissions

# Create your views here.
@ensure_csrf_cookie
def index(request, **kwargs):
    return render(request, 'frontend/index.html')