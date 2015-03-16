from django.conf.urls import patterns, url, include

from siteseditor import views

urlpatterns = patterns('',
    # url(r'^$', views.index, name='index'),
    url(r'^images', views.images),
    url(r'^image_upload', views.image_upload),
)