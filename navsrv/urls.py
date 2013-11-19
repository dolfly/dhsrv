from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'navsrv.views.home', name='home'),
    # url(r'^navsrv/', include('navsrv.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^$', 'navsrv.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^xyx/', include('navsrv.xyx.urls')),
    #url(r'^image/', include('navsrv.image.urls')),
)
