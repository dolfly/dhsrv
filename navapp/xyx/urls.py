from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from navapp.xyx.views import HomeView,CateDetailView,CateListView,GameDetailView,GameListView,TopicDetailView,TopicListView,SearchView
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
	url(r'^$', HomeView.as_view()),
	url(r'^home/$', HomeView.as_view()),
	url(r'^search/([^/]*)/?$',SearchView.as_view()),

    # List
	url(r'^cate/(\d*)/?$', CateListView.as_view()),
	url(r'^topic/(\d*)/?$', TopicListView.as_view()),
    url(r'^game/(\d*)/?$', GameListView.as_view()),

    # Detail
    url(r'^cate/detail/(\d*)/?$', CateDetailView.as_view()),
    url(r'^topic/detail/(\d*)?', TopicDetailView.as_view()),
	url(r'^game/detail/(\d*)/?$',GameDetailView.as_view()),
)
