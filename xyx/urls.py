from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'dhsrv.views.home', name='home'),
    # url(r'^dhsrv/', include('dhsrv.foo.urls')),

	url(r'^$', 'xyx.views.home', name='home'),
	url(r'^home/$', 'xyx.views.home', name='home'),
	url(r'^cate/(\d*)/?$', 'xyx.views.cate', name='cate'),
	url(r'^detail/(\d*)/?$','xyx.views.detail',name='detail'),

	url(r'^topic/(\d*)/?$','xyx.views.topic',name='topic'),

	url(r'^search/([^/]*)/?$','xyx.views.search',name='search'),
)
