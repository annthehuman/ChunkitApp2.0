from django.urls import path
from . import views
from django.conf import settings
from django.views.generic import TemplateView

urlpatterns = [
    path('', views.index, name='frontend'),
]
print(urlpatterns)

react_routes = getattr(settings, 'REACT_ROUTES', [])

for route in react_routes:
    urlpatterns += [
        path('{}'.format(route), TemplateView.as_view(template_name='frontend/index.html'))
    ]
print(urlpatterns)