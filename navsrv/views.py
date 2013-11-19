# Create your views here.
from django.http import HttpResponse,Http404
#from django.template.loader import get_template
#from django.template import Context
from django.shortcuts import render_to_response

def home(request):
	return HttpResponse("NAVSRV HOME")
