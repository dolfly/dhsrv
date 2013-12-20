from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from navsrv.views.views import HomeView,AjaxJsonView


admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'navsrv.views.home', name='home'),
    # url(r'^navsrv/', include('navsrv.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    #url(r'^$', TemplateView.as_view(template_name="home/home.vm")),
    url(r'^$', HomeView.as_view()),

    url(r'htm$',AjaxJsonView.as_view()),

    # Apps Url
    url(r'^admin/', include(admin.site.urls)),
    url(r'^xyx/', include("navapp.xyx.urls")),
    # url(r'^image/', include('navapp.image.urls')),
)
