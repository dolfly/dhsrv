# Create your views here.
from django.views.generic import TemplateView
from django.views.generic import DetailView
from django.views.generic import ListView
class HomeView(TemplateView):
    template_name = "xyx/home.vm"
    def render_to_response(self, context):
        context = {}
        return TemplateView.render_to_response(self,context)

class MDetailView(DetailView):
    pass

class SearchView(DetailView):
    pass

class CateDetailView(DetailView):
    pass
class GameDetailView(DetailView):
    pass
class TopicDetailView(DetailView):
    pass

class CateListView(ListView):
    pass

class GameListView(ListView):
    pass

class TopicListView(ListView):
    pass

from django.http import HttpResponse,Http404
#from django.template.loader import get_template
#from django.template import Context
from django.shortcuts import render_to_response
def home(request):
	return HttpResponse("XYX HOME")

def cate(request,cid):
	try:
		cid = int(cid)
	except ValueError:
		raise Http404()

	return HttpResponse("XYX Cate %s " % cid )

def detail(request,gid):
	try:
		cid = int(gid)
	except ValueError:
		raise Http404()
	return HttpResponse("XYX Detail %s " % gid )

def topic(request,tid):
	try:
		cid = int(tid)
	except ValueError:
		raise Http404()
	return HttpResponse("XYX Topic %s " % tid )

def search(request,keyword):
	'''
	try:
		keyword = str(keyword)
	except ValueError:
		raise Http404()
	'''
	#t = get_template('xyx_search.html');
	#html = t.render(Context({'keywork':keyword}));

	#return HttpResponse(html)
	return render_to_response('xyx_search.html',{'keyword':keyword});
