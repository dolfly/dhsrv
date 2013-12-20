/**
 * 视频模块
 * @author ronizhang
 */
(function(namespace){
	
	var Video = function(){
		
	};
	
	Video.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	Video.prototype.init = function(){
		var instance = this;
		//初始化tab
		var tabs = $("#module2 ul.chaoW-tab-list li");
		var config = {
				'container' : $("#module2"),
				'currentClassName' : 'select',
				'tabChangeType' : 'click',
				'syncChange':true,
	            'changeTimeout':30000,
				'currentIndex' : 0,
				'isAllowClickCurTab' : true,
				'tabs' : tabs,
				'tabPanels' : $("#module2 .rgt-pages-video"),
				'onMouseEnterTab' : function(index, e){
					if($(tabs[index]).hasClass('select')){//移动到当前元素
						$(tabs[index]).find('a').css('text-decoration', 'underline');
					}
				},
				'onMouseLeaveTab' : function(index, e){
					$(tabs[index]).find('a').css('text-decoration', 'none');
				},
	            'onTabAutoChange':function(index){
					haoqq.imgloadtrigger.getTriggerInstance().loadImg();
//	                var type = $(tabs[index]).attr('_hotype');
//	                requestHotNews(type, 1);
	            },
				'onClickTab' : function(index, e){
					var _a = $(tabs[index]).find("a");
					if($(tabs[index]).hasClass('select')){//点击当前元素
						//上报链接
						haoqq.getStatisInstance().reportClick(e, _a.attr("_tag"), {'href' : _a.attr("href")});
			    		haoqq.getDjlStatisInstance().reportClick(e, _a.attr("_tag"));
						return;
					}
					$(tabs[index]).find('a').css('text-decoration', 'underline');
//					var type = $(tabs[index]).attr('_hotype');
//					requestHotNews(type, 1);
					//上报
					haoqq.getStatisInstance().reportClick(e, _a.attr("_tag"), {'href' : ''});
		    		haoqq.getDjlStatisInstance().reportClick(e, _a.attr("_tag"));
				},
				'afterChangeTab' : function(index, e){
					haoqq.imgloadtrigger.getTriggerInstance().loadImg();
					return true;
				}
		};
		this.tabView = haoqq.tab.TabView(config);
	};
	/**
	 * 初始化事件
	 * @override
	 */
	Video.prototype.initEvent = function(){

	};
	/**
	 * do something
	 * @override
	 */
	Video.prototype.run = function(){
		
	};
	
	/**
	 * 隐藏
	 */
	Video.prototype.hide = function(){

	};
	/**
	 * 展示
	 */
	Video.prototype.show = function(){

	};
	
	namespace.getVideoInstance = haoqq.common.Singleton(function(){
		return new Video();
	});
	
	namespace.createVideo = function(){
		return new Video();
	};
	
}(haoqq.namespace('module')));