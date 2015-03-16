from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'picndo_sites.views.home', name='home'),
    # url(r'^picndo_sites/', include('picndo_sites.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),

    # url(r'^siteseditor/images', include('siteseditor.images')),
    url(r'^siteseditor/', include('siteseditor.urls')),

) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# if settings.DEBUG:
#   urlpatterns += url(
#     r'^$', 'django.contrib.staticfiles.views.serve', kwargs={
#       'path': 'index.html', 'document_root': settings.STATIC_ROOT}),