# Create your views here.
from django.views.generic import TemplateView
#from django.views.generic import DetailView

class HomeView(TemplateView):
    template_name = "home/home.vm"
    def render_to_response(self, context):
        context = { 
                'version' : '20131215',
                'uskin'   : 'skin',
                'resource_path' : '/static',
                'floder_ver': '.',
                'home_bottom_category1' : "hao_qq_home_bottom_category1_v1",
                'home_bottom_category2':'hao_qq_home_bottom_category2_v1',
                'videos' :'videov1',
                'news' :'newsv1',
                'home_kz':'hao_qq_home_kz_v1',
                'home_mingzhan':'hao_qq_home_mingzhan_v1',
                'home_tencent' :'hao_qq_home_tencent_v1',
                'home_game'    :'hao_qq_home_game_v1',
                'pic': { 
                    'href':'http://p5.123.sogou.com/imgu/2013/12/20131209174757_334.jpg',
                    'img_src':'http://p5.123.sogou.com/imgu/2013/12/20131209174757_334.jpg'
                },
                'experiment_hide_map':{
                    "key1":"fff",
                    "key2":"fff",
                    "key3":"fff"
                },
                'home_ad':'hao_qq_home_ad_v1'
            }
        return TemplateView.render_to_response(self,context)
